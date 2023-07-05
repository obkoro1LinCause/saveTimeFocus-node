
import { HttpException, HttpStatus } from '@nestjs/common';
import * as TEXT from '@app/constants/text.constant';

/**
 * @class HttpBadRequestError 请求错误异常
 * @classdesc 400 -> bad request
 * @example new HttpBadRequestError('error message')
 * @example new HttpBadRequestError(new Error())
 */
export class HttpBadRequestError extends HttpException {
    constructor(error?:any) {
      super(error || TEXT.HTTP_BAD_REQUEST_TEXT_DEFAULT, HttpStatus.BAD_REQUEST);
    }
  }
