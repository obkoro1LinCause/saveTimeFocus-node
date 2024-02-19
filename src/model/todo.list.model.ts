import { Entity, Column,BaseEntity,PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert,BeforeUpdate,UpdateDateColumn,OneToMany } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { DB_TASKLIST_TOKEN } from '@app/constants/sys.constant';
import { Task } from './todo.task.model';

// 初始化数据库表的时候初始化一条任务类型的数据
// 任务清单表
@Entity('task_list')
export class TaskList{
  @PrimaryGeneratedColumn({ type:'int',name:'id',unsigned:true})
  id: number;
  
  @Column('int',{
    name:'type',
    comment:'1:清单文件夹，2:自建清单，3:默认任务清单,4:归档',
    unsigned:true,
  })
  type:number;

  @Column('int',{
    name:'parentId',
    comment:'所在文件夹的ID，为0表示最顶层',
    unsigned:true,
  })
  parentId:number;

  @Column('int',{
    comment:'用户唯一标识符',
    name:'userId',
    unsigned:true
  })
  userId:number;

  @OneToMany(()=>Task,task=>task.taskList,{
    createForeignKeyConstraints: false,
  })
  task:Task[]

  @Column('varchar',{
    comment:'名称',
    name:'name',
    length:100
  })
  name: string;

  @Column('int',{
    comment:'排序值',
    name:'sortOrder',
    unsigned:true,
  })
  sortOrder: number;

  @Column('boolean',{
    comment:'是否已归档',
    name:'isArchived',
    nullable: true,
  })
  isArchived: boolean | null;

  @CreateDateColumn({  
    type: 'timestamp',
    name: 'createAt',
    comment: '创建日期'
  })
  createAt:Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updateAt',
    comment: '最后更新时间'
  })
  updateAt:Date
};



export const TaskListProvider = getProviderByModelClass(DB_TASKLIST_TOKEN,TaskList);

