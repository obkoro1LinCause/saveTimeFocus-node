import { Injectable,Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task,TaskList,Tag } from '@app/module';
import { DB_TASK_TOKEN,DB_TASKLIST_TOKEN,DB_TAG_TOKEN } from '@app/constants/sys.constant';
import { plainToClass } from 'class-transformer';
import { HttpCustomError } from '@app/errors/custom.error';
import logger from '@app/utils/logger';
const log = logger.scope('Todo');

import { TaskPriorityEnum,TaskStatusEnum} from '@app/types';
import { ListAddDTO,QueryDTO,TaskAddDTO } from './todo.dto';
import { User } from '@app/decorators/reqParams.decorator'

@Injectable()
export class TodoService {
    constructor(
        @Inject(DB_TASK_TOKEN) private readonly taskRepository:Repository<Task>,
        @Inject(DB_TASKLIST_TOKEN) private readonly taskListRepository:Repository<TaskList>,
        @Inject(DB_TAG_TOKEN) private readonly labelRepository:Repository<Tag>,
    ){}

    // 根据清单名称查询
    async findOneTaskList(name){
        return this.taskListRepository.findOne({where:{name}});
    }

    // 查询todo list
    async todoQueryList(query:QueryDTO,user:User){
        const { id } = user;
        const taskList = await this.taskListRepository.createQueryBuilder('task_list').where("task_list.userId=:userId", { userId: id }).getMany();
        
        // 平铺数据转tree结构数据
        const map = taskList.reduce((pre:any,cur:any)=>{
            pre[cur.id] = cur;
            return pre;
        },{});
        
        // TODO:1.是否需要封装一个固定的list给前端 2.根据sort值返回有序数组
        return taskList.reduce((pre, cur) => {
            const parentId = cur.parentId;
            const parent = map[parentId];
            if (parent) {
                parent.children ? parent.children.push(cur) : parent.children = [cur];
            } else if (!parentId) {
                pre.push(cur);
            }
            return pre;
        }, []);
    }

    // 创建清单
    async creatList(list:ListAddDTO,user:User){
        try{
            const { name,type,parentId } = list;
            if(!name) return new HttpCustomError({ message: '名称不能为空'});
            if(!type) return new HttpCustomError({ message: '类型不能为空'});
            // name 不可重复，后端做判断
            const entity = await this.findOneTaskList(name);
            if(entity && !!entity?.id) return new HttpCustomError({ message: '名称不可重复创建'});
             // 用于将普通JavaScript对象转换为特定类的实例
            const initTaskList = plainToClass(TaskList,list);
            initTaskList.userId = user?.id || null;
            // 初始化清单都是最顶层
            initTaskList.parentId = parentId || 0;
            this.taskListRepository.save(initTaskList);
        }catch(err){
            return new HttpCustomError({ message: err });
        }
    }
    // 更新清单
    async updateTaskList(){}
    // 创建任务
    async createTask(task:TaskAddDTO,user:User){
       try{
            console.log(task,user);
            const { name,taskListId,dueAt,priority } = task;
            if(!name) return new HttpCustomError({ message: '任务名称不能为空'});
            const taskList = await this.taskListRepository.createQueryBuilder('task_list').where("task_list.id=:id", { id: taskListId }).getOne();
            const initTask = plainToClass(Task,task);
            initTask.taskList = taskList;
            initTask.priority = priority || 0;
            initTask.userId = user?.id || null;
            if(dueAt){
                initTask.status = TaskStatusEnum.planned;
            }else{
                initTask.status = TaskStatusEnum.complete;
            }
            this.taskRepository.save(initTask);
       }catch(err){
            return new HttpCustomError({ message: err });
       }
    }
    // 更新任务
    async updateTask(){}
    // 创建标签
    async createTag(){}
    // 更新任务
    async updateTag(){}

}
