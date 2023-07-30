
import { Request } from 'express'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface User {
 email?:string,
 password?:string
 [key: string]: string
}


export interface ReqParamsResult {
  user:User
  request: Request
}

export const ReqParams = createParamDecorator(
  (field: keyof ReqParamsResult, context: ExecutionContext): ReqParamsResult => {
    const request = context.switchToHttp().getRequest<Request>();
    const user:any = request?.user;

    const result = {
      user,
      request,
    }

    return field ? result[field] : result
  }
)