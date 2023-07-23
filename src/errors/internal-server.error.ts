
import { HttpException, HttpStatus } from '@nestjs/common';
import * as TEXT from '@app/constants/text.constant';

/**
 * @class HttpInternalServerError 网络错误异常
 * @classdesc default 500 -> server error
 * @example new CustomError({ message: 'error message' }, 400)
 * @example new CustomError({ message: 'error message', error: new Error(xxx) })
 */
export class HttpInternalServerError extends HttpException {
    constructor(error?:any) {
      super(error || TEXT.HTTP_INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}