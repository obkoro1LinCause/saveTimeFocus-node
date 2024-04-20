
import { IntersectionType } from '@nestjs/mapped-types'
import { IsOptional,IsNotEmpty,IsEmail } from 'class-validator'


// IntersectionType() 函数将两个类型合并成一个类型。
// OmitType() 函数通过挑出输入类型中的全部属性，然后移除一组特定的属性构造一个类型
// PickType() 函数通过挑出输入类型的一组属性构造一个新的类型（类）

export class UserInfoDTO{
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
}

export class EmailDTO {
    @IsEmail()
    @IsNotEmpty()
    email:string;
}

export class RegisterDTO extends UserInfoDTO{
    @IsNotEmpty()
    emailCode:string;

    @IsOptional()
    inviteCode:string;
}

