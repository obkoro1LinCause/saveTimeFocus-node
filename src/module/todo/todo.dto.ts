import { IsInt, IsString,IsNotEmpty,IsIn, IsOptional,IsDate } from 'class-validator'


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