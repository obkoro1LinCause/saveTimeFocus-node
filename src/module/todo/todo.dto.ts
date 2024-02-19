import { IsInt, IsString,IsNotEmpty,IsIn, IsOptional,IsDate } from 'class-validator'
// DTO 主要定义如何通过网络发送数据的对象，通常会配合class-validator和class-transformer

// 添加清单夹 ｜ 清单
export class ListAddDTO{
    @IsIn([1,2,3])
    @IsInt()
    @IsNotEmpty()
    type:number

    @IsNotEmpty()
    @IsString()
    name:string

    @IsOptional()
    @IsInt()
    parentId:number
}

// 添加任务
export class TaskAddDTO{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsInt()
    taskListId:number

    @IsOptional()
    @IsDate()
    dueAt:Date

    @IsIn([0,1,2,3])
    @IsOptional()
    priority:number
}

// 清单列表
export class QueryDTO{

    @IsOptional()
    @IsString()
    name:string

    @IsOptional()
    @IsIn([1,2,3])
    @IsInt()
    type:number

    @IsOptional()
    @IsInt()
    parentId:number

    @IsOptional()
    @IsDate()
    dueAt:Date

    @IsIn([0,1,2,3])
    @IsOptional()
    priority:number
}