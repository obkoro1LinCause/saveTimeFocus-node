
import { IntersectionType } from '@nestjs/mapped-types'
import { IsInt, IsOptional, IsString,IsNotEmpty,IsEmail, isString } from 'class-validator'


// IntersectionType() 函数将两个类型合并成一个类型。
// OmitType() 函数通过挑出输入类型中的全部属性，然后移除一组特定的属性构造一个类型
// PickType() 函数通过挑出输入类型的一组属性构造一个新的类型（类）


export class BaseDto{
    @IsEmail()
    @IsNotEmpty({ message: '邮箱不能为空' })
    email:string;

    @IsString()
    @IsNotEmpty({ message: '密码不能为空' })
    password:string;
}

export class RegisterDto extends BaseDto{
    
    @IsNotEmpty({ message: '邮箱验证码不能为空' })
    @IsString()
    emailCode:string;

    @IsOptional()
    @IsString()
    inviteCode:string;
}

export class EmailDto {
    @IsEmail()
    @IsNotEmpty()
    email:string;
}

export class IdDto {
    @IsNotEmpty()
    id:number;
}

export class TokenDto {
    @IsNotEmpty()
    token:string;
}

export class UserDto{
    @IsOptional()
    @IsInt()
    id:number;

    @IsOptional()
    @IsString()
    email:string;
}

