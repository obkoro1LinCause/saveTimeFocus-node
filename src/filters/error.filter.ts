import { isString } from 'lodash'
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { ResponseStatus, HttpResponseError, ExceptionInfo } from '@app/interfaces/response.interface'
import { UNDEFINED } from '@app/constants/value.constant'
import { isDevEnv } from '@app/app.environment'


/**
 * 
 * @class HttpExceptionFilter
 * @classdesc 全局捕获每个未处理的异常, HttpErrorResponse
  error :  "1"
  message : "App_Info api failed"
  status: "error"
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const request = host.switchToHttp().getRequest()
    const response = host.switchToHttp().getResponse()
    const exceptionStatus = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR
    const errorResponse: any = exception.getResponse() as ExceptionInfo

    const errorMessage = isString(errorResponse) ? errorResponse : errorResponse.message
    const errorInfo = isString(errorResponse) ? null : errorResponse.error

    const data: HttpResponseError = {
      status: ResponseStatus.Error,
      message: errorMessage,
      error: isString(errorInfo) ? errorInfo : JSON.stringify(errorInfo),
      debug: isDevEnv ? errorInfo?.stack || exception.stack : UNDEFINED,
    }

    // default 404
    if (exceptionStatus === HttpStatus.NOT_FOUND) {
      data.error = data.error || `Not found`
      data.message = data.message || `Invalid API: ${request.method} > ${request.url}`
    }

    return response.status(errorInfo?.status || exceptionStatus).jsonp(data)
  }
}
