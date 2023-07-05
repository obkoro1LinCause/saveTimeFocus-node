
import {reflector} from '@app/constants/reflector.constant'
import { SetMetadata } from '@nestjs/common'
import * as TEXT from '@app/constants/text.constant'
import { UNDEFINED } from '@app/constants/value.constant'

// 获取元数据
export const getResponserOptions = (target:any)=>{
    return {
        errorCode:reflector.get('errorCode',target),
        successCode:reflector.get('successCode',target),
        errorMsg:reflector.get('errorMsg',target),
        successMsg:reflector.get('successMsg',target),
        transform:reflector.get('transform',target)
    }
};

const createDecorator = (params:any)=>{
    const {errorCode,successCode,errorMsg,successMsg} = params;

    return (_,__,decorator:PropertyDescriptor)=>{
        SetMetadata('transform',true)(decorator.value)
        SetMetadata('errorCode',errorCode)(decorator.value)
        SetMetadata('successCode',successCode)(decorator.value)
        SetMetadata('errorMsg',errorMsg)(decorator.value)
        SetMetadata('successMsg',successMsg)(decorator.value)
        return decorator;
    }
}


// 处理函数
export const handle = (apiMsg)=>{
    const errorCode = UNDEFINED;
    const successCode = UNDEFINED;
    const errorMsg = apiMsg + TEXT.HTTP_ERROR_SUFFIX;
    const successMsg = apiMsg + TEXT.HTTP_SUCCESS_SUFFIX;
    return createDecorator({
        errorCode,
        successCode,
        errorMsg,
        successMsg
    })

}
// 接口响应值装饰器
export const Responser = { handle };