
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
  /** user use lang */
  lang:'en' | 'cn'
}

/**
 * @function QueryParams
 * @example `@QueryParams()`
 * @example `@QueryParams('query')`
 * 获取接口 参数 ip ua信息
 */
export const QueryParams = createParamDecorator(
  (field: keyof QueryParamsResult, context: ExecutionContext): QueryParamsResult => {
    const request = context.switchToHttp().getRequest<Request>();

    /** 用户是否存在于session中 即是否已登录 */
    const isAuthenticated = request.isAuthenticated()
    const isUnauthenticated = request.isUnauthenticated();

    const lang = request.headers['x-lang-mark'] as string;
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
      isAuthenticated,
      isUnauthenticated,
      params: request.params,
      query: request.query as any,
      cookies: request.cookies,
      visitor,
      request,
      lang
    }

    return field ? result[field] : result
  }
)
