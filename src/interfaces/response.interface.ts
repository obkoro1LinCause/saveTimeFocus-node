

// HTTP interface
export type ResponseMessage = string
export enum ResponseStatus {
  Error = 'error',
  Success = 'success',
}

export interface HttpResponseBase {
  status: ResponseStatus    
  message: ResponseMessage
}

export type ExceptionInfo =
  | ResponseMessage
  | {
      message: ResponseMessage
      error?: any
    }

// HTTP error
export type HttpResponseError = HttpResponseBase & {
  error: any  //错误的原因
  debug?: string,
  code?:number
}

// HTTP success
export type HttpResponseSuccess<T> = HttpResponseBase & {
  params?: any
  result: T,
  code?:number
}

// HTTP response
export type HttpResponse<T> = HttpResponseError | HttpResponseSuccess<T>
