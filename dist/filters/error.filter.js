"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const lodash_1 = __importDefault(require("lodash"));
const common_1 = require("@nestjs/common");
const response_interface_1 = require("../interfaces/response.interface");
const value_constant_1 = require("../constants/value.constant");
const app_environment_1 = require("../app.environment");
const language_constant_1 = require("../constants/language.constant");
let HttpExceptionFilter = exports.HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        var _a, _b, _c;
        const request = host.switchToHttp().getRequest();
        const response = host.switchToHttp().getResponse();
        const exceptionStatus = exception.getStatus() || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const errRes = exception.getResponse();
        const lang = request.headers['x-lang-mark'];
        let errMsg;
        let errorInfo;
        if (lodash_1.default.isString(errRes) || lodash_1.default.isString(errRes === null || errRes === void 0 ? void 0 : errRes.error)) {
            const errKey = (errRes === null || errRes === void 0 ? void 0 : errRes.error) || errRes;
            errMsg = (errRes === null || errRes === void 0 ? void 0 : errRes.message) || 'API Error';
            errorInfo = lang == 'zh' ? language_constant_1.ZH_CN === null || language_constant_1.ZH_CN === void 0 ? void 0 : language_constant_1.ZH_CN[errKey] : language_constant_1.EN_US === null || language_constant_1.EN_US === void 0 ? void 0 : language_constant_1.EN_US[errKey];
        }
        else if (!lodash_1.default.isString(errRes === null || errRes === void 0 ? void 0 : errRes.error)) {
            errorInfo = (_a = errRes === null || errRes === void 0 ? void 0 : errRes.error) === null || _a === void 0 ? void 0 : _a.response;
            errMsg = errRes === null || errRes === void 0 ? void 0 : errRes.message;
        }
        const data = {
            status: response_interface_1.ResponseStatus.Error,
            message: errMsg,
            error: errorInfo,
            debug: app_environment_1.isDevEnv ? ((_b = errRes === null || errRes === void 0 ? void 0 : errRes.error) === null || _b === void 0 ? void 0 : _b.stack) || exception.stack : value_constant_1.UNDEFINED,
        };
        if (exceptionStatus === common_1.HttpStatus.NOT_FOUND) {
            data.error = data.error || `Not found`;
            data.message = data.message || `Invalid API: ${request.method} > ${request.url}`;
        }
        return response.status(((_c = errRes === null || errRes === void 0 ? void 0 : errRes.error) === null || _c === void 0 ? void 0 : _c.status) || exceptionStatus).jsonp(data);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=error.filter.js.map