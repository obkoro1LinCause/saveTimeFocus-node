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
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_config_1 = require("./app.config");
const error_filter_1 = require("./filters/error.filter");
const error_interceptor_1 = require("./interceptors/error.interceptor");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const logging_interceptor_1 = require("./interceptors/logging.interceptor");
const logger_1 = __importDefault(require("./utils/logger"));
const APP_CONFIG = __importStar(require("./app.config"));
const app_environment_1 = require("./app.environment");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, app_environment_1.isProdEnv ? { logger: false } : {});
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use(body_parser_1.default.json({ limit: '1mb' }));
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        enableDebugMessages: true,
        transform: true
    }));
    app.useGlobalFilters(new error_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(), new error_interceptor_1.ErrorInterceptor(), new logging_interceptor_1.LoggingInterceptor());
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('save-time-focus-serve')
        .setDescription('接口文档')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger-doc', app, document);
    await app.listen(app_config_1.APP.PORT);
}
bootstrap().then(() => {
    logger_1.default.info(`NodePress is running at ${APP_CONFIG.APP.PORT}, env: ${app_environment_1.environment}.`);
});
//# sourceMappingURL=main.js.map