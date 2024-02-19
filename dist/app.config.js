"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIPTIME = exports.EMAIL = exports.REDIS_OPTIONS = exports.JWT_CONFIG = exports.CROSS_DOMAIN = exports.PROJECT = exports.APP = void 0;
const path_1 = require("path");
const ROOT_PATH = (0, path_1.join)(__dirname, '..');
const packageJSON = require((0, path_1.resolve)(ROOT_PATH, 'package.json'));
const app_environment_1 = require("./app.environment");
exports.APP = {
    PORT: 8010,
    STATIC_URL: ''
};
exports.PROJECT = {
    name: packageJSON.name,
    version: packageJSON.version,
    author: packageJSON.author,
    description: packageJSON.description
};
exports.CROSS_DOMAIN = {
    allowedOrigins: ['', '', ''],
    allowedReferer: '',
};
exports.JWT_CONFIG = {
    secret: 'secretKey',
    ignoreExpiration: true,
    passReqToCallback: true
};
exports.REDIS_OPTIONS = {
    host: app_environment_1.isDevEnv ? "localhost" : '',
    port: app_environment_1.isDevEnv ? "6379" : '',
    username: '',
    password: ''
};
exports.EMAIL = {
    port: 465,
    host: 'smtp.qq.com',
    account: 'savetimefocus@foxmail.com',
    password: 'oezichkwnqtjdbdc',
    from: 'koro<savetimefocus@foxmail.com>'
};
exports.VIPTIME = {
    hour_ts: 3600000,
    day_ts: 86400000,
    month_ts: 2592000000,
    year_ts: 31104000000
};
//# sourceMappingURL=app.config.js.map