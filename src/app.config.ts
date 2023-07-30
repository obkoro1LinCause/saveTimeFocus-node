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
    expiresIn: '',       // 过期时间24h，不过期不设置key
    ignoreExpiration:true,
    passReqToCallback:true
};

// redis配置
export const REDIS_OPTIONS = {
    host: isDevEnv ?  "localhost":'',
    port:isDevEnv ? "6379":'',
    username:'',
    password:''
}

// 邮箱配置
export const EMAIL = {
    port: 465,
    host: 'smtp.qq.com',
    account: 'savetimefocus@foxmail.com',
    password: 'oezichkwnqtjdbdc',
    from: 'koro<savetimefocus@foxmail.com>'
}

// vip 默认配置
export const VIPTIME = {
    hour_ts:3600000,
    day_ts:86400000,
    month_ts:2592000000,
    year_ts:31104000000
}