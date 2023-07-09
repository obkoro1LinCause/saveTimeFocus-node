import { Entity, Column,BaseEntity,PrimaryGeneratedColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';

@Entity()
export class Register  extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 40 })
  email: string;

  @Column('varchar')
  password: string;
};


export const RegisterProvider = getProviderByModelClass('Register',Register)