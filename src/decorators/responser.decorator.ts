
import {reflector} from '@app/constants/reflector.constant'
import { SetMetadata,HttpStatus } from '@nestjs/common'
import * as TEXT from '@app/constants/text.constant'
import { UNDEFINED } from '@app/constants/value.constant'
import lodash from 'lodash';

import { ResponseMessage } from '@app/interfaces/response.interface'

interface HandleOption {
    error?: HttpStatus
    success?: HttpStatus
    message: ResponseMessage
    usePaginate?: boolean
  }
  
type HandleOptionConfig = ResponseMessage | HandleOption


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

        SetMetadata('transform',true)(decorator.value);
        if(errorCode){
            SetMetadata('errorCode',errorCode)(decorator.value)
        }
        if(successCode){
            SetMetadata('successCode',successCode)(decorator.value)
        }
        if(errorMsg){
            SetMetadata('errorMsg',errorMsg)(decorator.value)
        }
        if(successMsg){
            SetMetadata('successMsg',successMsg)(decorator.value)
        }
        return decorator;
    }
}


// 处理函数
export const handle = (...args)=>{
    const option = args[0];
    const isOption = (value: HandleOptionConfig): value is HandleOption => lodash.isObject(value)
    const errorCode = isOption(option) ? option.error : UNDEFINED;
    const successCode = isOption(option) ? option.success : UNDEFINED
    const errorMsg = isOption(option) ? option.message + TEXT.HTTP_ERROR_SUFFIX : option + TEXT.HTTP_ERROR_SUFFIX;
    const successMsg = isOption(option) ? option.message +TEXT.HTTP_SUCCESS_SUFFIX :option + TEXT.HTTP_SUCCESS_SUFFIX;
    return createDecorator({
        errorCode,
        successCode,
        errorMsg,
        successMsg
    })

}
// 接口响应值装饰器
export const Responser = { handle };