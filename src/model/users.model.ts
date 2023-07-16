import { Entity, Column,BaseEntity,PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { DB_USERS_TOKEN } from '@app/constants/sys.constant'


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

  @Column('int',{
    comment:'自己的邀请码',
    name:'self_invite_code',
    nullable: false,
  })
  self_invite_code: number;

  @Column('varchar',{
    comment:'邀请码',
    name:'invite_code',
    nullable: true,
  })
  invite_code:string

  //自动生成列
  @CreateDateColumn({  
    type: 'timestamp',
    nullable: false,
    name: 'register_at',
    comment: '注册时间'
  })
  register_at:Date
};


export const UserProvider = getProviderByModelClass(DB_USERS_TOKEN,User);