import { Entity, Column,BaseEntity,PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert,BeforeUpdate,UpdateDateColumn,OneToMany,ManyToOne, JoinColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { DB_TASK_TOKEN } from '@app/constants/sys.constant'
import { TaskList } from './todo.list.model'


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

  @IsNotEmpty()
  @Column('varchar',{
    comment:'任务的标题',
    name:'name',
    nullable: false,
    unique: true
  })
  name: string;

  @Column('varchar',{
    comment:'任务的描述',
    name:'description',
    nullable: true,
  })
  description: string | null;

  @Column({  
    type: 'timestamp',
    name: 'dueAt',
    comment: '任务的截止日期',
    nullable:true
  })
  dueAt:Date

  @Column('int',{
    comment:'任务的优先级（0-3）:0:无优先级,1:高优先级,2:中优先级,3:低优先级',
    name:'priority',
    unsigned:true
  })
  priority:number

  @Column('int',{
    comment:'0:待定，1:完成，2:已计划',
    name:'status',
  })
  status:number

  @CreateDateColumn({  
    type: 'timestamp',
    nullable: false,
    name: 'createAt',
    comment: '任务的创建日期'
  })
  createAt:Date

};


export const TaskProvider = getProviderByModelClass(DB_TASK_TOKEN,Task);

