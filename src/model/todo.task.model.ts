import { Entity, JoinTable,Column,BaseEntity,PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert,BeforeUpdate,UpdateDateColumn,OneToMany,ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { DB_TASK_TOKEN } from '@app/constants/sys.constant'
import { TaskList } from './todo.list.model';
import { Tag } from './todo.tag.model';


/**
 * 将 @OneToMany 添加到photos属性中
 * 并将目标关系类型指定为Photo
 * 你可以在 @ManyToOne  @OneToMany 关系中省略@JoinColumn
 * 除非你需要自定义关联列在数据库中的名称，@ManyToOne 可以单独使用，但 @OneToMany 必须搭配 @ManyToOne 使用
 * 如果你想使用@OneToMany，则需要 @ManyToOne
 * 在你设置 @ManyToOne 的地方，相关实体将有"关联 id"和外键
 */

// 任务表
@Entity('task')
export class Task{
  @PrimaryGeneratedColumn({ type:'int',name:'id',unsigned:true})
  id: number

  @Column('int',{
    comment:'用户唯一标识符',
    name:'userId',
    unsigned:true
  })
  userId:number | null

  @ManyToOne(()=>TaskList,taskList => taskList.task,{
    createForeignKeyConstraints:false,
  })
  @JoinColumn({name:'taskListId'})
  taskList:TaskList

  @ManyToMany(()=>Tag,tag=>tag.tasks,{nullable:true,createForeignKeyConstraints: false})
  @JoinTable({name:'taskTag'})
  tags:Tag[]

  @Column('varchar',{
    comment:'任务的标题',
    name:'title',
    unique: true
  })
  title: string;

  @Column('longtext',{
    comment:'任务描述',
    name:'description',
    nullable: true,
  })
  description: string | null;

  @Column('int',{
    comment:'排序值',
    name:'sortOrder',
    unsigned:true,
  })
  sortOrder: number;

  @Column('varchar',{
    comment:'时区标识',
    name:'timeZone',
  })
  timeZone:string

  @Column('int',{
    comment:'任务的优先级:0:无优先级,1:高优先级,2:中优先级,3:低优先级',
    name:'priority',
    unsigned:true
  })
  priority:number | null;

  @Column('int',{
    comment:'1:完成，2:已计划,3:待定(2,3表示未完成)',
    name:'status',
  })
  status:number;

  @Column('boolean',{
    comment:'任务是否删除',
    name:'isDel',
    default:false
  })
  isDel:boolean;

  @Column('longtext',{
    comment:'番茄时间内容，json字符串',
    name:'tomatoContent',
    nullable:true
  })
  tomatoContent:string | null;

  @Column('longtext',{
    comment:'重复时间内容，json字符串',
    name:'repeatContent',
    nullable:true
  })
  repeatContent:string | null;

  @Column({
    type: 'timestamp',
    name: 'modifiedAt',
    comment: '任务更新日期',
    nullable:true
  })
  modifiedAt:Date | null

  @Column({
    type: 'timestamp',
    name: 'startAt',
    comment: '任务开始日期',
    nullable:true
  })
  startAt:Date | null

  @Column({  
    type: 'timestamp',
    name: 'dueAt',
    comment: '任务截止日期',
    nullable:true
  })
  dueAt:Date | null;

  @Column({  
    type: 'timestamp',
    name: 'completedAt',
    comment: '任务完成日期（有表示已完成）',
    nullable:true
  })
  completedAt:Date | null;

  @Column({  
    type: 'timestamp',
    name: 'delAt',
    comment: '任务删除日期',
    nullable:true
  })
  delAt:Date | null;

  @CreateDateColumn({  
    type: 'timestamp',
    nullable: false,
    name: 'createAt',
    comment: '任务的创建日期'
  })
  createAt:Date;

  @UpdateDateColumn({ 
    type: 'timestamp',
    nullable: false,
    name: 'updateAt',
    comment: '更新时间',
  })
  updateAt: Date;

};


export const TaskProvider = getProviderByModelClass(DB_TASK_TOKEN,Task);

