import { HttpException } from '@nestjs/common';
export declare class HttpInternalServerError extends HttpException {
    constructor(error?: any);
}
