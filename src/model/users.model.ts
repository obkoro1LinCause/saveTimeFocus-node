import { Entity, Column,BaseEntity,PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert,BeforeUpdate,UpdateDateColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { DB_USERS_TOKEN } from '@app/constants/sys.constant'
import { createHashStr,createRandomStr } from '@app/utils';

@Entity()
export class User{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @IsEmail()
  @Column('varchar',{
    comment:'邮箱',
    name:'email',
    nullable: false,
    unique: true
  })
  email: string;

  @IsNotEmpty()
  @Column('varchar',{
    comment:'密码',
    name:'password',
    nullable: false,
    length: 100,
  })
  password:string

  @Column('varchar',{
    comment:'自己的邀请码',
    name:'self_invite_code',
    nullable: false,
    unique: true 
  })
  self_invite_code: string;

  @Column('varchar',{
    comment:'邀请码',
    name:'invite_code',
    nullable: true,
  })
  invite_code:string


  @Column('varchar',{
    comment:'邮箱验证码',
    name:'emial_code',
    nullable: true,
  })
  emial_auth_code:string

  @Column('varchar',{
    comment:'头像',
    name:'avatar',
    nullable: true,
    default:''
  })
  avatar:string

  @Column('varchar',{
    nullable: false,
    name: 'vip_time',
    comment: 'vip时间戳'
  })
  vip_time:number

  @Column('boolean', {  
    nullable: false,
    default: true,
    name: 'is_vip',
    comment: '是否是vip,1表示是,0表示否'
  })
  is_vip:boolean

  //自动生成列
  @CreateDateColumn({  
    type: 'timestamp',
    nullable: false,
    name: 'register_at',
    comment: '注册时间'
  })
  register_at:Date

  @UpdateDateColumn({ 
    type: 'timestamp',
    nullable: false,
    name: 'update_at',
    comment: '更新时间',
  })
  update_at: Date;

  // 密码加密入库；1.数据插入前, 2.数据库中无该数据 3.数据更新
  @BeforeInsert() 
  @BeforeUpdate()
  md5Pwd() { 
    this.password = createHashStr(this.password);
  } 

  // 注册自动生成随机邀请码；1.数据插入前, 2.数据库中无该数据
  @BeforeInsert()
  randSelfCode(){
    this.self_invite_code = createRandomStr();
  }
};


export const UserProvider = getProviderByModelClass(DB_USERS_TOKEN,User);