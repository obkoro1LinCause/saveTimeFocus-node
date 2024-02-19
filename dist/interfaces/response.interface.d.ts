export type ResponseMessage = string;
export declare enum ResponseStatus {
    Error = "error",
    Success = "success"
}
export interface HttpResponseBase {
    status: ResponseStatus;
    message: ResponseMessage;
}
export type ExceptionInfo = ResponseMessage | {
    message: ResponseMessage;
    error?: any;
};
export type HttpResponseError = HttpResponseBase & {
    error: any;
    debug?: string;
    code?: number;
};
export type HttpResponseSuccess<T> = HttpResponseBase & {
    params?: any;
    result: T;
    code?: number;
};
export type HttpResponse<T> = HttpResponseError | HttpResponseSuccess<T>;
