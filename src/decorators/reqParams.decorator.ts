
import { Request } from 'express'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface User {
 id?:number,
 email?:string,
 isVip?:boolean,
 nickname?:string,
 registerAt?:string,
 updateAt?:string
}
export interface ReqParamsResult {
  user:User
  request: Request
}

/**
 * @function QueryParams
 * @example `@ReqParams()`
 * @example `@ReqParams('user')`
 * 装饰器获取请求的数据
 */
export const ReqParams = createParamDecorator(
  (field: keyof ReqParamsResult, context: ExecutionContext): ReqParamsResult => {
    const request = context.switchToHttp().getRequest<Request>();
    const user: any= request?.user;
    
    const result = {
      user,
      request,
    }

    return field ? result[field] : result
  }
)
