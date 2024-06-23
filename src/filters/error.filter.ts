import lodash from 'lodash'
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { ResponseStatus, HttpResponseError, ExceptionInfo } from '@app/interfaces/response.interface'
import { UNDEFINED } from '@app/constants/value.constant'
import { isDevEnv } from '@app/app.environment';
import { EN_US,ZH_CN } from '@app/constants/language.constant';


/**
 * 
 * @class HttpExceptionFilter
 * @classdesc globally exceptions & formatting error message to <HttpErrorResponse>
 * {
 *  status: error 
 *  message:'接口错误返回原因',
 *  error:reject reason
 * }
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const exceptionStatus = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR
    const errRes:any = exception.getResponse() as ExceptionInfo;
    const lang = request.headers['x-lang-mark'] as string;

    let errMsg;
    let errorInfo;
    if(lodash.isString(errRes) || lodash.isString(errRes?.error)){
      const errKey = errRes?.error || errRes;
      errMsg = errRes?.message || 'API Error';
      errorInfo = (lang == 'zh' ? ZH_CN?.[errKey] : EN_US?.[errKey]) || errRes;
    } else if(!lodash.isString(errRes?.error)){
      errorInfo = errRes?.error?.response;
      errMsg = errRes?.message;
    }

    const data: HttpResponseError = {
      status: ResponseStatus.Error,
      message: errMsg,
      error: errorInfo,
      debug: isDevEnv ? errRes?.error?.stack || exception.stack : UNDEFINED,
    }

    // default 404
    if (exceptionStatus === HttpStatus.NOT_FOUND) {
      data.error = data.error || `Not found`
      data.message = data.message || `Invalid API: ${request.method} > ${request.url}`
    }

    return response.status(errRes?.error?.status || exceptionStatus).jsonp(data)
  }
}
