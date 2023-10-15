"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const mysql_module_1 = require("./processors/database/mysql.module");
const cache_module_1 = require("./processors/cache/cache.module");
const helper_module_1 = require("./processors/helper/helper.module");
const cors_middleware_1 = require("./middlewares/cors.middleware");
const origin_middleware_1 = require("./middlewares/origin.middleware");
const auth_module_1 = require("./module/auth/auth.module");
const user_module_1 = require("./module/user/user.module");
const socket_module_1 = require("./module/socket/socket.module");
const todo_module_1 = require("./module/todo/todo.module");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(cors_middleware_1.CorsMiddleware, origin_middleware_1.OriginMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mysql_module_1.DatabaseModule, cache_module_1.CacheModule, helper_module_1.HelperModule, auth_module_1.AuthModule, user_module_1.UserModule, socket_module_1.SocketModule, todo_module_1.TodoModule],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map