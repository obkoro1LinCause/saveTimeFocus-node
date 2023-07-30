
import { IntersectionType } from '@nestjs/mapped-types'
import { IsInt, IsString,IsNotEmpty,IsEmail} from 'class-validator'
import { useApiProperty } from '@app/transformers/swagger.transformer'


// IntersectionType() 函数将两个类型合并成一个类型。
// OmitType() 函数通过挑出输入类型中的全部属性，然后移除一组特定的属性构造一个类型
// PickType() 函数通过挑出输入类型的一组属性构造一个新的类型（类）
// export class UserCreateDto {

//     @useApiProperty({
//         name:'email',
//         description: '邮箱',
//         required:true,
//         type:'string'
//     })
//     @IsEmail()
//     @IsNotEmpty()
//     email:string;
    
//     @useApiProperty({
//         name:'password',
//         description: '密码',
//         type:'string',
//         required:true,
//     })
//     @IsString()
//     @IsNotEmpty()
//     password:string;

//     @useApiProperty({
//         name:'invite_code',
//         description: '邀请码',
//         required:false,
//         type:'string'
//     })
//     @IsString()
//     invite_code:string;
// }

export class BaseDto{
    @useApiProperty({
        name:'email',
        description: '邮箱',
        required:true,
        type:'string'
    })
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @useApiProperty({
        name:'password',
        description: '密码',
        type:'string',
        required:true,
    })
    @IsString()
    @IsNotEmpty()
    password:string;
}



export class RegisterDto extends BaseDto{
    
    @useApiProperty({
        name:'emial_auth_code',
        description: '邮箱验证码',
        required:true,
    })
    @IsNotEmpty()
    emial_auth_code:string;


    @useApiProperty({
        name:'invite_code',
        description: '邀请码',
        required:false,
    })
    invite_code:string;
}


export class EmailDto {
    @useApiProperty({
        name:'email',
        description: '邮箱',
        required:true,
        type:'string'
    })
    @IsEmail()
    @IsNotEmpty()
    email:string;
}

