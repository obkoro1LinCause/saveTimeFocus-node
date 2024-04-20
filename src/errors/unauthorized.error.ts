
import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import * as TEXT from '@app/constants/text.constant';
import { ResponseMessage } from '@app/interfaces/response.interface'

/**
 * @class HttpUnauthorizedError 无权限
 * @classdesc 401 -> unauthorized
 * @example new HttpUnauthorizedError('unauthorized')
 * @example new HttpUnauthorizedError('error message', new Error())
 */
export class HttpUnauthorizedError extends UnauthorizedException {
  constructor(message?: ResponseMessage, error?: ResponseMessage) {
    super(message || TEXT.HTTP_UNAUTHORIZED_TEXT_DEFAULT, error)
  }
}