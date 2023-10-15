import { Entity, Column,PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert,BeforeUpdate,UpdateDateColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { DB_USER_TOKEN } from '@app/constants/sys.constant'
import { createHashStr,createRandomStr } from '@app/utils';

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

  @Column('varchar',{
    comment:'自己的邀请码',
    name:'selfInviteCode',
    unique: true
  })
  selfInviteCode: string | null;

  @Column('varchar',{
    comment:'邀请码',
    name:'inviteCode',
  })
  inviteCode:string | null

  @Column('varchar',{
    comment:'邮箱验证码',
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

  @Column("simple-json",{
    nullable: true,
  })
  equipmentInfo: { has_evaluate: number,type: string }

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

  // 密码加密入库；1.数据插入前, 2.数据库中无该数据 3.数据更新
  @BeforeInsert() 
  @BeforeUpdate()
  md5Pwd() { 
    this.password = createHashStr(this.password);
  } 

  // 注册自动生成随机邀请码；1.数据插入前, 2.数据库中无该数据
  @BeforeInsert()
  randSelfCode(){
    this.selfInviteCode = createRandomStr();
  }
};

export const UserProvider = getProviderByModelClass(DB_USER_TOKEN,User);