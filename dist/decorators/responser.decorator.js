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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responser = exports.handle = exports.getResponserOptions = void 0;
const reflector_constant_1 = require("../constants/reflector.constant");
const common_1 = require("@nestjs/common");
const TEXT = __importStar(require("../constants/text.constant"));
const value_constant_1 = require("../constants/value.constant");
const lodash_1 = __importDefault(require("lodash"));
const meta_constant_1 = require("../constants/meta.constant");
const getResponserOptions = (target) => {
    return {
        errorCode: reflector_constant_1.reflector.get(meta_constant_1.META_ERROR_CODE, target),
        successCode: reflector_constant_1.reflector.get(meta_constant_1.META_SUCCESS_CODE, target),
        errorMsg: reflector_constant_1.reflector.get(meta_constant_1.META_ERROR_MSG, target),
        successMsg: reflector_constant_1.reflector.get(meta_constant_1.META_SUCCESS_MSG, target),
        transform: reflector_constant_1.reflector.get('transform', target)
    };
};
exports.getResponserOptions = getResponserOptions;
const createDecorator = (params) => {
    const { errorCode, successCode, errorMsg, successMsg } = params;
    return (_, __, decorator) => {
        (0, common_1.SetMetadata)('transform', true)(decorator.value);
        if (errorCode) {
            (0, common_1.SetMetadata)(meta_constant_1.META_ERROR_CODE, errorCode)(decorator.value);
        }
        if (successCode) {
            (0, common_1.SetMetadata)(meta_constant_1.META_SUCCESS_CODE, successCode)(decorator.value);
        }
        if (errorMsg) {
            (0, common_1.SetMetadata)(meta_constant_1.META_ERROR_MSG, errorMsg)(decorator.value);
        }
        if (successMsg) {
            (0, common_1.SetMetadata)(meta_constant_1.META_SUCCESS_MSG, successMsg)(decorator.value);
        }
        return decorator;
    };
};
const handle = (...args) => {
    const option = args[0];
    const isOption = (value) => lodash_1.default.isObject(value);
    const errorCode = isOption(option) ? option.error : value_constant_1.UNDEFINED;
    const successCode = isOption(option) ? option.success : value_constant_1.UNDEFINED;
    const errorMsg = isOption(option) ? option.message + TEXT.HTTP_ERROR_SUFFIX : option + TEXT.HTTP_ERROR_SUFFIX;
    const successMsg = isOption(option) ? option.message + TEXT.HTTP_SUCCESS_SUFFIX : option + TEXT.HTTP_SUCCESS_SUFFIX;
    return createDecorator({
        errorCode,
        successCode,
        errorMsg,
        successMsg
    });
};
exports.handle = handle;
exports.Responser = { handle: exports.handle };
//# sourceMappingURL=responser.decorator.js.map