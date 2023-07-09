
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Injectable, NestInterceptor, CallHandler, ExecutionContext, HttpStatus } from '@nestjs/common'
import { getResponserOptions } from '@app/decorators/responser.decorator'
import { HttpCustomError } from '@app/errors/custom.error'
import * as TEXT from '@app/constants/text.constant'

// 使用@Injectable来声明一个类
/**
 * @class ErrorInterceptor
 * @classdesc catch error when controller Promise rejected
 */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const target = context.getHandler();
    const { errorCode, errorMsg } = getResponserOptions(target);

    return next.handle().pipe(
      catchError((error) => {
        return throwError(
          () =>new HttpCustomError({ message:errorMsg || TEXT.HTTP_DEFAULT_ERROR_TEXT,error},errorCode)
        )
      })
    )
  }
}
