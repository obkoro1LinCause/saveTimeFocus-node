import { Entity, Column,BaseEntity,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { getProviderByModelClass } from '@app/transformers/model.transformer';
import { IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { DB_TAG_TOKEN } from '@app/constants/sys.constant'

// 标签表
@Entity('tag')
export class Tag{
    @PrimaryGeneratedColumn({ type:'int',name:'id',unsigned:true})
    id: number

    @Column('int',{
      comment:'用户唯一标识符',
      name:'userId',
      nullable: false,
      unsigned:true
    })
    userId:number

    @Column('int',{
      comment:'与任务表的外键关联',
      name:'taskId',
      nullable: false,
      unsigned:true
    })
    taskId:string

    @IsNotEmpty()
    @Column('varchar',{
      comment:'标签名称',
      name:'name',
      nullable: false,
      unique: true,
      length:100
    })
    name: string;

    @Column('varchar',{
      comment:'标签的颜色',
      name:'color',
    })
    color: string;

    @CreateDateColumn({  
      type: 'timestamp',
      name: 'createAt',
      comment: '创建日期'
    })
    createAt:Date
  
    @UpdateDateColumn({
      type: 'timestamp',
      name: 'updateAt',
      comment: '最后更新时间'
    })
    updateAt:Date
}

export const TagProvider = getProviderByModelClass(DB_TAG_TOKEN,Tag);
