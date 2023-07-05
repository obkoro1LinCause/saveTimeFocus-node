import { Injectable, NestMiddleware,RequestMethod,HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as APP_CONFIG from '@app/app.config';
import { isDevEnv } from '@app/app.environment';

/**
 * COR 中间件
 */
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
   const getMethod = (method) => RequestMethod[method];
   const origins = req.headers.origins;
   const origin = ((Array.isArray(origins)) ? origins[0] : origins) || '';

   const allowedOrigins = [...APP_CONFIG.CROSS_DOMAIN.allowedOrigins]
   const allowedMethods = [
     RequestMethod.GET,
     RequestMethod.HEAD,
     RequestMethod.PUT,
     RequestMethod.PATCH,
     RequestMethod.POST,
     RequestMethod.DELETE,
   ]
   const allowedHeaders = [
    'Authorization',
    'Origin',
    'No-Cache',
    'X-Requested-With',
    'If-Modified-Since',
    'Pragma',
    'Last-Modified',
    'Cache-Control',
    'Expires',
    'Content-Type',
    'X-E4M-With',
  ]

    // Allow Origin
    if (!origin || allowedOrigins.includes(origin) || isDevEnv) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*')
    }
     // Headers
     res.header('Access-Control-Allow-Credentials', 'true')
     res.header('Access-Control-Allow-Headers', allowedHeaders.join(','))
     res.header('Access-Control-Allow-Methods', allowedMethods.map(getMethod).join(','))
     res.header('Access-Control-Max-Age', '1728000')
     res.header('Content-Type', 'application/json; charset=utf-8')
    //  res.header('X-Powered-By', `${APP_CONFIG.PROJECT.name} ${APP_CONFIG.PROJECT.version}`)
 
     // OPTIONS Request
     if (req.method === getMethod(RequestMethod.OPTIONS)) {
       return res.sendStatus(HttpStatus.NO_CONTENT)
     } else {
       return next()
     }
  }
}
