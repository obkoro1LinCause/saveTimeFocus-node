
import { IntersectionType } from '@nestjs/mapped-types'
import { IsInt, IsString,IsIn, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator'


// IntersectionType() 函数将两个类型合并成一个类型。
// OmitType() 函数通过挑出输入类型中的全部属性，然后移除一组特定的属性构造一个类型
// PickType() 函数通过挑出输入类型的一组属性构造一个新的类型（类）

export class RegisterDto {
    readonly id:number;
    readonly password: string;
    readonly email: string;

    // @IsString()
    // @IsNotEmpty()
    // email:string;
    
    // @IsString()
    // @IsNotEmpty()
    // password:string;

    // @IsString()
    // @IsNotEmpty()
    // @IsOptional()
    // invite_code:string
}


