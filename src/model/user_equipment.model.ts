import { Entity, Column,BaseEntity,PrimaryGeneratedColumn,ManyToOne,UpdateDateColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { IsString, IsNotEmpty,  } from 'class-validator';
import { DB_USERS_EXTS_TOKEN } from '@app/constants/sys.constant'
import { User } from './users.model'

export enum EquipmentEnum{
   'Firefox' ='Firefox',
   'Chrome' = 'Chrome',
   'IE' ='IE',
   'ios' = 'ios',
   'android' = 'android'
}

@Entity()
export class UserEquipment{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.id)
  user:User

  @IsNotEmpty()
  @Column("simple-json")
  equipment_info: { has_evaluate: number,type: string }

};


export const UserEquipmentProvider = getProviderByModelClass(DB_USERS_EXTS_TOKEN,UserEquipment);