
import { IntersectionType } from '@nestjs/mapped-types'
import { IsInt, IsString,IsIn, IsNotEmpty, } from 'class-validator'
import { useApiProperty } from '@app/transformers/swagger.transformer'


// IntersectionType() 函数将两个类型合并成一个类型。
// OmitType() 函数通过挑出输入类型中的全部属性，然后移除一组特定的属性构造一个类型
// PickType() 函数通过挑出输入类型的一组属性构造一个新的类型（类）
export class RegisterDto {
    
    readonly id:number;

    @useApiProperty({
        name:'email',
        description: '邮箱',
        required:true,
        type:'string'
    })
    @IsString()
    @IsNotEmpty()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    @useApiProperty({
        name:'password',
        description: '密码',
        required:true,
        type:'string'
    })
    password:string;
}


