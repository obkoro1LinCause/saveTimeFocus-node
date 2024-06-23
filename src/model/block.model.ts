import { Entity, Column,PrimaryGeneratedColumn,ManyToMany,JoinTable } from 'typeorm';
import { getDynamicModuleByModel } from '@app/transformers/model.transformer';
import { User } from './user.model';

// 阻止网页表
@Entity('block')
export class Block{

  @PrimaryGeneratedColumn({ type:'int',name:'id',unsigned:true})
  id: number

  @Column('integer',{ 
    name:'type',
    comment: '类型,1:website 2:keyword'
  })
  type: number;

  @Column('varchar',{
    comment:'网站域名',
    name:'domain',
    nullable: true,  
  })
  domain: string;

  @Column('varchar',{ 
    comment:'网站名称',
    name:'domainName',
    nullable: true,  
  })
  domainName: string;

  @Column('varchar',{
    comment:'关键字',
    name:'keyword',
    nullable: true,  
  })
  keyword: string;

  @Column('varchar',{ 
    comment:'网站图片',
    name:'image',
    nullable: true,  
  })
  image: string;

  @Column('varchar',{ 
    comment:'简介描述',
    name:'desc',
    nullable: true,  
  })
  desc: string;

  @Column('integer',{ 
      comment:'排序值',
      name:'sort',
      nullable: true,  
  })
  sort: number;

  @Column('boolean',{ 
    comment:'是否是白名单',
    name:'isWhite',
    nullable: true,  
  })
  isWhite: boolean;

  // 无中间实体表的配置
  @ManyToMany(type => User, user => user.blocks, { createForeignKeyConstraints: false })
  @JoinTable({
    name:'block_user',
    joinColumns: [
      { name: 'blockId' }
    ],
    inverseJoinColumns: [
      { name: 'userId' }
    ]
  })
  users: User[];
};

export const BlockDynamicModule = getDynamicModuleByModel(Block);