"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const common_1 = require("@nestjs/common");
const APP_CONFIG = __importStar(require("../app.config"));
const app_environment_1 = require("../app.environment");
let CorsMiddleware = exports.CorsMiddleware = class CorsMiddleware {
    use(req, res, next) {
        const getMethod = (method) => common_1.RequestMethod[method];
        const origins = req.headers.origins;
        const origin = ((Array.isArray(origins)) ? origins[0] : origins) || '';
        const allowedOrigins = [...APP_CONFIG.CROSS_DOMAIN.allowedOrigins];
        const allowedMethods = [
            common_1.RequestMethod.GET,
            common_1.RequestMethod.HEAD,
            common_1.RequestMethod.PUT,
            common_1.RequestMethod.PATCH,
            common_1.RequestMethod.POST,
            common_1.RequestMethod.DELETE,
        ];
        const allowedHeaders = [
            'Authorization',
            'Origin',
            'No-Cache',
            'X-Requested-With',
            'If-Modified-Since',
            'Pragma',
            'Last-Modified',
            'Cache-Control',
            'Expires',
            'Content-Type',
            'X-E4M-With',
        ];
        if (!origin || allowedOrigins.includes(origin) || app_environment_1.isDevEnv) {
            res.setHeader('Access-Control-Allow-Origin', origin || '*');
        }
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
        res.header('Access-Control-Allow-Methods', allowedMethods.map(getMethod).join(','));
        res.header('Access-Control-Max-Age', '1728000');
        res.header('Content-Type', 'application/json; charset=utf-8');
        if (req.method === getMethod(common_1.RequestMethod.OPTIONS)) {
            return res.sendStatus(common_1.HttpStatus.NO_CONTENT);
        }
        else {
            return next();
        }
    }
};
exports.CorsMiddleware = CorsMiddleware = __decorate([
    (0, common_1.Injectable)()
], CorsMiddleware);
//# sourceMappingURL=cors.middleware.js.map