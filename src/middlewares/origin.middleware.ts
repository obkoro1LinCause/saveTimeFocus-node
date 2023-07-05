import { Request, Response } from 'express'
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common'
import { HttpResponseError, ResponseStatus } from '@app/interfaces/response.interface'
import { isProdEnv } from '@app/app.environment'
import { CROSS_DOMAIN } from '@app/app.config'
import * as TEXT from '@app/constants/text.constant'

/** Origin middleware */
@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next) {
    // production only
    if (isProdEnv) {
      const { origin, referer } = request.headers
      const isAllowed = (field) => !field || field.includes(CROSS_DOMAIN.allowedReferer)
      const isAllowedOrigin = isAllowed(origin)
      const isAllowedReferer = isAllowed(referer)
      if (!isAllowedOrigin && !isAllowedReferer) {
        // 不经允许
        return response.status(HttpStatus.UNAUTHORIZED).jsonp({
          status: ResponseStatus.Error,
          message: TEXT.HTTP_ANONYMOUS_TEXT,
          error: null,
        } as HttpResponseError)
      }
    }
    return next()
  }
}
