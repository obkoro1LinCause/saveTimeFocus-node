"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_CONFIG = exports.CROSS_DOMAIN = exports.PROJECT = exports.APP = void 0;
const path_1 = require("path");
const ROOT_PATH = (0, path_1.join)(__dirname, '..');
const packageJSON = require((0, path_1.resolve)(ROOT_PATH, 'package.json'));
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
    expiresIn: '24h',
};
//# sourceMappingURL=app.config.js.map