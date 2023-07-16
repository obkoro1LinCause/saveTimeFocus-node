import { Entity, Column,PrimaryGeneratedColumn,OneToOne,JoinColumn,UpdateDateColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { IsString, IsNotEmpty,  } from 'class-validator';
import { DB_USERS_AUTHS_TOKEN } from '@app/constants/sys.constant'
import { User } from './users.model'

export type Status = 0 | 1;


@Entity()
export class UserAuths{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @OneToOne(() => User,(user)=>user.id)
  @JoinColumn()
  user:User

  @Column('varchar',{
    comment:'头像',
    name:'avatar',
    nullable: true,
    default:''
  })
  avatar:string

  @Column('int',{
    nullable: false,
    default: () => 0,
    name: 'vip_time',
    comment: 'vip时间戳'
  })
  vip_time:number

  @Column('tinyint', {  
    nullable: false,
    default: () => 0,
    name: 'is_vip',
    comment: '是否是vip,1表示是,0表示否'
  })
  is_vip:number

  //自动生成并自动更新列
  @UpdateDateColumn({ 
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updated_at: Date;
};


export const UserAuthsProvider = getProviderByModelClass(DB_USERS_AUTHS_TOKEN,UserAuths);