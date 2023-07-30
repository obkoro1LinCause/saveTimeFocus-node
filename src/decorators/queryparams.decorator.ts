
import { Request } from 'express'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface QueryVisitor {
  ip: string | null
  ua?: string
  origin?: string
  referer?: string
}

export interface QueryCookies {
  [key: string]: string
}

export interface QueryParamsResult {
  /** original route params */
  params: Record<string, string>
  /** original query params */
  query: Record<string, string>
  /** visitor cookies */
  cookies: QueryCookies
  /** visitor info */
  visitor: QueryVisitor
  /** original request */
  request: Request
}

/**
 * @function QueryParams
 * @example `@QueryParams()`
 * @example `@QueryParams('query')`
 */
export const QueryParams = createParamDecorator(
  (field: keyof QueryParamsResult, context: ExecutionContext): QueryParamsResult => {
    const request = context.switchToHttp().getRequest<Request>();

    const ip =
      (request.headers['x-forwarded-for'] as string) ||
      (request.headers['x-real-ip'] as string) ||
      request.socket.remoteAddress ||
      request.ip ||
      request.ips[0]

    const visitor: QueryVisitor = {
      ip: ip.replace('::ffff:', '').replace('::1', '') || null,
      ua: request.headers['user-agent'],
      origin: request.headers.origin,
      referer: request.headers.referer,
    }

    const result = {
      params: request.params,
      query: request.query as any,
      cookies: request.cookies,
      visitor,
      request,
    }

    return field ? result[field] : result
  }
)
