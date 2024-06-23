import { Entity, Column,PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert,BeforeUpdate,UpdateDateColumn,ManyToMany,JoinTable,OneToMany
 } from 'typeorm';
import { getDynamicModuleByModel } from '@app/transformers/model.transformer';
import { Block } from './block.model';

// 用户表
@Entity('user')
export class User{

  @PrimaryGeneratedColumn({ type:'int',name:'id',unsigned:true})
  id: number

  @Column('varchar',{
    comment:'邮箱',
    name:'email',
    unique: true
  })
  email: string;

  @Column('varchar',{
    comment:'密码',
    name:'password',
  })
  password:string

  @Column({ length: 100, nullable: true,  comment:'昵称', })
  nickname: string;

  @Column('varchar',{
    comment:'自己的邀请码',
    name:'selfInviteCode',
    nullable: true,
  })
  selfInviteCode: string | null;

  @Column('varchar',{
    comment:'邀请码',
    name:'inviteCode',
    nullable: true,
  })
  inviteCode:string | null

  @Column('varchar',{
    comment:'邮箱验证码',
    nullable: false,
    name:'emailCode'
  })
  emailCode:string

  @Column('varchar',{
    name: 'vipTime',
    comment: 'vip时间戳',
    nullable: true,
  })
  vipTime:number | null

  @Column('boolean', {  
    default: true,
    name: 'isVip',
    comment: '是否是vip,1:是,0:否'
  })
  isVip:boolean

  // 无中间实体表的配置
  @OneToMany(type=>Block,block=>block.users,{ createForeignKeyConstraints: false })
  blocks: Block[];

  //自动生成列
  @CreateDateColumn({  
    type: 'timestamp',
    nullable: false,
    name: 'registerAt',
    comment: '注册时间'
  })
  registerAt:Date

  @UpdateDateColumn({ 
    type: 'timestamp',
    nullable: false,
    name: 'update_at',
    comment: '更新时间',
  })
  updateAt: Date;

};

export const UserDynamicModule = getDynamicModuleByModel(User);