import { IsNumber, IsString, IsNotEmpty, IsOptional,IsNumberString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * class-validator: 提供验证规则
 */
export class TaskAddDTO {

  /**新的父节点id，为0表示自己是父节点 */
  @IsInt()
  newParentId:number;

  /** 新的下个节点id，为0表示自己是最后一个叶子节点 */
  @IsInt()
  newNextItemId:number

  @IsNotEmpty()
  @IsString()
  name:string

  @IsString()
  @IsOptional()
  description?:string

  @IsOptional()
  @IsInt()
  pStatus?:number
}


export class TaskQueryDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pStatus?:number

  @IsOptional()
  @IsString()
  name?: string;
}


export class TaskDelDTO {
  @IsInt()
  @Type(() => Number)
  taskId:number
}

export class TaskUpdateDTO{
  @IsNotEmpty()
  @IsInt()
  taskId:number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pStatus?:number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?:number

  @IsOptional()
  @IsString()
  description?:string

  @IsOptional()
  @IsString()
  name?:string

  @IsOptional()
  @IsInt()
  newParentId?:number;

  @IsOptional()
  @IsInt()
  newNextItemId?:number
}