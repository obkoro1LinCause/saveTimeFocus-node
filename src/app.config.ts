import { resolve,join } from 'path';
const ROOT_PATH = join(__dirname, '..');
const packageJSON = require(resolve(ROOT_PATH, 'package.json'));
import { APP_CONFIG } from '@app/interfaces/global.interface';
import { isDevEnv,isProdEnv } from '@app/app.environment'

// app信息
export const APP:APP_CONFIG = {
    PORT:8010,
    STATIC_URL:''
}

// 项目信息
export const PROJECT = {
    name: packageJSON.name,
    version: packageJSON.version,
    author: packageJSON.author,
    description:packageJSON.description
}

// 自己网站域名可以访问
export const CROSS_DOMAIN = {
    allowedOrigins: ['', '', ''],
    allowedReferer: '',
}


export const JWT_CONFIG = {
    secret: 'secretKey', // 加密密钥
    expiresIn: '24h', // 24小时内过期
};
