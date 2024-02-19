import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionInfo } from '@app/interfaces/response.interface';
export declare class HttpCustomError extends HttpException {
    constructor(options: ExceptionInfo, code?: HttpStatus);
}
