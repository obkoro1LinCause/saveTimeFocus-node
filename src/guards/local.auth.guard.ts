
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { HttpUnauthorizedError } from '@app/errors/unauthorized.error'
import { UNDEFINED } from '@app/constants/value.constant'

/**
 * @class LocalGuard
 * @classdesc Token existed -> Token activated -> Token data validated
 * @example ```@UseGuards(LocalGuard)```
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(error, authInfo, errInfo) {
    if (authInfo && !error && !errInfo) {
      return authInfo
    } else {
      throw error || new HttpUnauthorizedError(UNDEFINED, 'unauthERR')
    }
  }
}
