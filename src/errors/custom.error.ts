
import { HttpException, HttpStatus } from '@nestjs/common';
import * as TEXT from '@app/constants/text.constant';
import { ExceptionInfo } from '@app/interfaces/response.interface'

/**
 * @class HttpCustomError 
 * @classdesc default 500 -> server error
 * @example new HttpCustomError({ message: 'error message' }, 400)
 * @example new HttpCustomError({ message: 'error message', error: new Error(xxx) })
 */
export class HttpCustomError extends HttpException {
    constructor(options:ExceptionInfo,statusCode?: HttpStatus) {
      super(options, statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }