import { Entity, Column,BaseEntity,PrimaryGeneratedColumn,ManyToOne,UpdateDateColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { IsString, IsNotEmpty,  } from 'class-validator';
import { DB_USERS_EXTS_TOKEN } from '@app/constants/sys.constant'
import { User } from './users.model'

export enum EquipmentEnum{
    'ios',
    'pc', 
    'android'
}

@Entity()
export class UserExts{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.id)
  user:User

  @IsNotEmpty()
  @Column({ 
    comment: '设备', 
    type: 'enum',     //枚举
    enum: EquipmentEnum,    
    default: EquipmentEnum.pc 
  })
  equipment:string

  @IsNotEmpty()
  @Column('tinyint',{  
    nullable: false,
    default: () => 0,
    name: 'login_status',
    comment: '是否登录,1表示是,0表示否'
  })
  login_status:number

  @IsNotEmpty()
  @Column('tinyint',{  
    nullable: false,
    default: () => 0,
    name: 'has_evaluate',
    comment: '是否评价,1表示是,0表示否'
  })
  has_evaluate:number

  @UpdateDateColumn({ 
    type: 'timestamp',
    nullable: false,
    name: 'update_at',
    comment: '更新时间',
  })
  update_at: Date;

};


export const UserExtsProvider = getProviderByModelClass(DB_USERS_EXTS_TOKEN,UserExts);