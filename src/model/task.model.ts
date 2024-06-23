import { Entity, Column,BaseEntity,PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert,BeforeUpdate,UpdateDateColumn,OneToMany,ManyToOne, JoinColumn } from 'typeorm';
import { getDynamicModuleByModel } from '@app/transformers/model.transformer';


// 任务表
@Entity('task')
export class Task{
  @PrimaryGeneratedColumn({ type:'int',name:'id',unsigned:true})
  id: number

  @Column('int', {
    name: 'parentId',
    comment: '所在主任务的ID，为0 表示最顶层目录',
    unsigned: true,
  })
  parentId: number | null;

  @Column('int', {
    name: 'childId',
    comment: '第一个子任务的id，为0 表示自己就是叶子节点',
    unsigned: true,
  })
  childId: number | null;

  @Column('int', {
    name: 'nextId',
    comment: '下一个任务的id，为0表示最后一个叶子节点',
    unsigned: true,
  })
  nextId: number;

  @Column('int',{
    comment:'用户唯一标识符',
    name:'userId',
    unsigned:true
  })
  userId:number | null


  @Column('varchar',{
    comment:'任务的标题',
    name:'name',
    nullable: false,
    length:50
  })
  name: string;

  @Column('varchar',{
    comment:'任务的描述',
    name:'description',
    nullable: true,
  })
  description?: string | null;

  @Column('int',{
    comment:'主任务状态 1:投资中，2:规划中，3:已归档',
    name:'pStatus',
    nullable: true,
    unsigned:true
  })
  pStatus?:number | null
  
  @Column('int',{
    comment:'子任务状态 1:未归档，2:已归档',
    name:'status',
    nullable: true,
    unsigned:true,
  })
  status?:number | null

  // @Column('timestamp',{  
  //   name: 'startAt',
  //   comment: '任务开始投资时间'
  // })
  // startAt:Date

  // @Column('timestamp',{  
  //   name: 'endAt',
  //   comment: '任务结束投资时间'
  // })
  // endAt:Date


  // @Column({  
  //   type: 'timestamp',
  //   name: 'dueAt',
  //   comment: '任务的截止日期',
  //   precision:6,
  // })
  // dueAt:Date

  @Column('timestamp',{  
    name: 'createAt',
    precision:6,
    comment: '任务创建日期'
  })
  createAt:Date

  @Column('timestamp', {
    name: 'updateAt',
    comment: '最后更新时间',
    precision: 6,
  })
  updateAt: Date;

};


export const TaskDynamicModule = getDynamicModuleByModel(Task);