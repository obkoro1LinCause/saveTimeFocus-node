"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("..");
const socket_module_1 = require("../socket/socket.module");
const local_strategy_1 = require("../auth/local.strategy");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const auth_service_1 = require("../auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const app_config_1 = require("../../app.config");
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: app_config_1.JWT_CONFIG.secret,
            }),
            socket_module_1.SocketModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            module_1.UserProvider,
            jwt_strategy_1.JwtStrategy,
            local_strategy_1.LocalStrategy,
            auth_service_1.AuthService
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map