import {resolve,join} from 'path';
const ROOT_PATH = join(__dirname, '..');
const packageJSON = require(resolve(ROOT_PATH, 'package.json'))
// app信息
export const APP = {
    PORT:8010,
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