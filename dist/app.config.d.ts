import { APP_CONFIG } from '@app/interfaces/global.interface';
export declare const APP: APP_CONFIG;
export declare const PROJECT: {
    name: any;
    version: any;
    author: any;
    description: any;
};
export declare const CROSS_DOMAIN: {
    allowedOrigins: string[];
    allowedReferer: string;
};
export declare const JWT_CONFIG: {
    secret: string;
    expiresIn: string;
    ignoreExpiration: boolean;
    passReqToCallback: boolean;
};
export declare const REDIS_OPTIONS: {
    host: string;
    port: string;
    username: string;
    password: string;
};
