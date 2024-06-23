import { Injectable,Inject } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,FindManyOptions,DataSource, Not } from "typeorm";
import { REQUEST } from '@nestjs/core';
import { Task, User } from '@app/module';
import { TaskAddDTO,TaskDelDTO,TaskQueryDTO,TaskUpdateDTO } from './task.dto';
import { TaskInfoMap } from '@app/types/index';
import { classToPlain } from "class-transformer";

@Injectable()
export class TaskService {
  constructor(
    private dataSource: DataSource,
    @Inject(REQUEST) private request:any,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  getQueryParams(nextId:number, parentId:number){
    const baseParams:FindManyOptions<Task>['where'] = [
      {
        parentId:parentId,
        nextId:nextId,
      }
    ];
    if(parentId !== 0){
      baseParams.push({
        id:parentId,
      })
    }
    if(nextId !== 0){
      baseParams.push({
        id:nextId,
      })
    }
    return baseParams;
  }
  async getTaskByParams(nextId:number, parentId:number){

    const conditions = this.getQueryParams(nextId,parentId);
    const tasks = await this.taskRepository.find({
      where:conditions
    });

    const taskInfoMap = tasks.reduce((result,item) => {
      if(parentId && item.id === parentId){
        result.parent = item
      } else if(nextId && item.nextId === nextId){
        result.prev = item
      } else if(nextId && item.id === nextId){
        result.next = item;
      }else if(parentId === item.parentId && item.nextId === 0){
        result.lastLeaf = item;
      }
      return result;
    }, {} as TaskInfoMap);

    if(parentId && !taskInfoMap.parent){
      return Promise.reject(`没有匹配 id 为 ${parentId} 的目录元素`);
    }

    if(nextId && !taskInfoMap.next){
      return Promise.reject(`没有匹配 id 为 ${nextId} 的目录元素`);
    }

    return taskInfoMap;
  }

  // 添加
  async addTask(newTaskInfo:TaskAddDTO) {
    const {
      name,
      description,
      newParentId = 0,
      newNextItemId = 0,
      pStatus,
    } = newTaskInfo;
    const task = new Task();
    task.name = name;
    task.description = description;
    task.parentId = newParentId;
    task.childId = 0;
    task.nextId = newNextItemId;
    task.pStatus = pStatus ?? null;
    task.status = pStatus ? null : 1;
    // todo:时间需要再看下
    task.createAt = new Date()
    task.updateAt = new Date();

    const user = classToPlain(this.request.user)
    task.userId = user.id;

    const  { parent,next,prev,lastLeaf } = await this.getTaskByParams(newNextItemId,newParentId);

    try {
      return await this.dataSource.transaction(async manager => {
        const result =  await manager.save(task);
        const saveTasks:Task[] = [];
   
        if(newParentId){
         if(parent.childId === 0 || next?.id === parent.childId){
           parent.childId = result.id;
           saveTasks.push(parent)
         }
        }
   
        if(prev){
         prev.nextId = result.id;
         saveTasks.push(prev)
        }
   
        if(newNextItemId === 0 && lastLeaf){
         lastLeaf.nextId = result.id;
         saveTasks.push(lastLeaf)
        }
   
        await manager.save(saveTasks);
        return result;
       });
    }catch(err){
      Promise.reject(err);
    }

  }

  // 删除
  async delTask(delTaskParams:TaskDelDTO){
    const { taskId } = delTaskParams;

    const willDelTask:Task = await this.taskRepository.findOne({
      where:{
        id:taskId
      }
    });

    if(!willDelTask){
      return Promise.reject(`未找到与 id = ${taskId}匹配的任务`);
    }
    willDelTask.status = 0;
    const { parentId, nextId } = willDelTask;
    if(!parentId && !nextId) {
      this.taskRepository.save(willDelTask);
      return willDelTask;
    }

    const preAndParentTasks = await this.taskRepository.find({
      where:[
        {
          nextId:taskId,
          status:Not(0)
        },
        {
          id:parentId,
          status:Not(0)
        }
      ]
    });

    const prevAndParentMap = preAndParentTasks.reduce((result,item)=>{
      if(item.id === parentId){
        result.parent = item
      }else if(item.nextId === taskId){
        result.prev = item
      }
      return result;
    },{} as TaskInfoMap);

    const { prev,parent } = prevAndParentMap;
    const saveTasks = [];
    if(prev){
      prev.nextId = nextId;
      saveTasks.push(prev)
    }3
    if(parent?.childId === taskId){
      parent.childId = nextId;
      saveTasks.push(parent)
    }

    try {
      return await this.dataSource.transaction(async manager =>{
        await manager.save(willDelTask);
        if(!!saveTasks.length)  await manager.save(saveTasks);
        return willDelTask;
      })
    }catch(err){
      Promise.reject('删除数据失败!');
    }
  }

  async getUpdateTaskParams(newParentId,newNextItemId,oldParentId,oldNextItemId,taskId){
    const conditions : FindManyOptions<Task>['where'] = [
      // 新父节点
      {
        id:newParentId,
        status:Not(0)
      },
      // 老父节点
      {
        id:oldParentId,
        status:Not(0)
      },
      // 新下一个节点
      {
        id:newNextItemId,
        status:Not(0)
      },
      // 老下一个节点
      {
        id:oldNextItemId,
        status:Not(0)
      }
    ];
    // 新的上个兄弟节点
    if(!newNextItemId){
      conditions.push({
        nextId:newNextItemId,
        status:Not(0)
      })
    }
    // 老的上个兄弟节点
    conditions.push({
      nextId:taskId,
      status:Not(0)
    });
    // 新子节点
    conditions.push({
      parentId:newParentId,
      nextId:0,
      status:Not(0)
    });

    const tasks = await this.taskRepository.find({
      where:conditions
    });
    console.log(tasks,'===tasks===');
    return tasks;
  }
  
  // 更新
  async updateTask(updateTaskParams: TaskUpdateDTO){
    const { taskId,name,description,pStatus,status,newParentId,newNextItemId }= updateTaskParams;
    const willUpdateTask = await this.taskRepository.findOne({
      where:{
        id:taskId
      }
    });

    if(!willUpdateTask){
      return Promise.reject('id不正确')
    };

    const user = classToPlain(this.request.user);
    willUpdateTask.userId = user?.id;
    willUpdateTask.name = name ?? willUpdateTask.name;
    willUpdateTask.description = description ?? willUpdateTask.description;
    willUpdateTask.pStatus = pStatus ?? willUpdateTask.pStatus;
    willUpdateTask.status = status ?? willUpdateTask.status;


    const { parentId,nextId } = willUpdateTask;
    const isMove = parentId !== newParentId || nextId !== newNextItemId;
    if(!newParentId || !newNextItemId || !isMove){
      return await this.taskRepository.save(willUpdateTask);
    }

    const [newParent,oldParent,newNextItem,oldNextItem,newPreItem,oldPreItem,newItem] = await this.getUpdateTaskParams(newParentId,newNextItemId,parentId,nextId,taskId);

    const saveTasks: Task[] = [];

    if(newNextItemId!== 0 && !newNextItem){
      return Promise.reject(`没匹配到 id=${newNextItemId}的兄弟节点`);
    }

    if(newNextItemId && newNextItem){
      if(newNextItem.parentId !== willUpdateTask.parentId){
        return Promise.reject(`父节点不一致`);
      }
    }

    if(oldParent?.childId === taskId){
      oldParent.childId = oldNextItem.id || 0;
      saveTasks.push(oldParent)
    }

    if(oldPreItem?.nextId === taskId){
      oldPreItem.nextId = oldNextItem.id || 0;
      saveTasks.push(oldPreItem)
    }

    if(newParentId){
      if(!newParent){
        return Promise.reject(`没匹配到 id=${newParentId}的父节点`);
      }
      if(newParent?.childId === 0 || newNextItem?.id === newParent.childId){
        newParent.childId = taskId;
        saveTasks.push(newParent)
      }
    }

    if(newPreItem){
      newPreItem.nextId = taskId;
      saveTasks.push(newPreItem);
    }

    if(newNextItemId === 0 && newItem){
      newItem.nextId = taskId;
      saveTasks.push(newItem);
    }

    try{
      return await this.dataSource.transaction(async manager =>{
        const [result] = await Promise.all([
          manager.save(willUpdateTask),
          manager.save(saveTasks)
        ]);
        return result;
      });
    }catch(err){
      return Promise.reject('修改失败')
    }

  }

  async getTaskList({ pStatus }:TaskQueryDTO){
    console.log(pStatus,'===pStatus==');
    const parentTaskList = await this.taskRepository.find({
      where:{
        pStatus
      }
    });
    const baseParams:FindManyOptions<Task>['where'] = [];
    parentTaskList.forEach(t=>{
      baseParams.push({
        parentId:t.id
      })
    });
    const childTaskList = await this.taskRepository.find({
      where:baseParams
    });
    console.log('===pTaskList==',parentTaskList,childTaskList)
  }

}
