
import {reflector} from '@app/constants/reflector.constant'
import { SetMetadata,HttpStatus } from '@nestjs/common'
import * as TEXT from '@app/constants/text.constant'
import { UNDEFINED } from '@app/constants/value.constant'
import lodash from 'lodash';
import {
    META_ERROR_CODE,
    META_SUCCESS_CODE,
    META_ERROR_MSG,
    META_SUCCESS_MSG
} from '@app/constants/meta.constant'

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
        errorCode:reflector.get(META_ERROR_CODE,target),
        successCode:reflector.get(META_SUCCESS_CODE,target),
        errorMsg:reflector.get(META_ERROR_MSG,target),
        successMsg:reflector.get(META_SUCCESS_MSG,target),
        transform:reflector.get('transform',target)
    }
};

const createDecorator = (params:any)=>{
    const {errorCode,successCode,errorMsg,successMsg} = params;
    return (_,__,decorator:PropertyDescriptor)=>{

        SetMetadata('transform',true)(decorator.value);
        if(errorCode){
            SetMetadata(META_ERROR_CODE,errorCode)(decorator.value)
        }
        if(successCode){
            SetMetadata(META_SUCCESS_CODE,successCode)(decorator.value)
        }
        if(errorMsg){
            SetMetadata(META_ERROR_MSG,errorMsg)(decorator.value)
        }
        if(successMsg){
            SetMetadata(META_SUCCESS_MSG,successMsg)(decorator.value)
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
    const successMsg = isOption(option) ? option.message + TEXT.HTTP_SUCCESS_SUFFIX : option + TEXT.HTTP_SUCCESS_SUFFIX;
    return createDecorator({
        errorCode,
        successCode,
        errorMsg,
        successMsg
    })

}
// 接口响应值装饰器
export const Responser = { handle };