"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./user.dto");
const responser_decorator_1 = require("../../decorators/responser.decorator");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt.auth.guard");
const local_auth_guard_1 = require("../../guards/local.auth.guard");
const reqParams_decorator_1 = require("../../decorators/reqParams.decorator");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    ;
    register(registerDto) {
        return this.userService.createUser(registerDto);
    }
    login(loginDto, req) {
        return this.userService.loginUser(loginDto);
    }
    change(userDto, user) {
        return this.userService.changePassword(userDto, user);
    }
    sendEmailCode(email) {
        this.userService.sendEmailCode(email);
    }
    find() {
        return this.userService.findAllUsers();
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    responser_decorator_1.Responser.handle('post  register_user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    responser_decorator_1.Responser.handle('post login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.BaseDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/change_password'),
    responser_decorator_1.Responser.handle('post  change_password_user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, reqParams_decorator_1.ReqParams)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.BaseDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "change", null);
__decorate([
    (0, common_1.Get)('/send_email_code'),
    responser_decorator_1.Responser.handle('get send_email_code'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.EmailDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sendEmailCode", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/find_users'),
    responser_decorator_1.Responser.handle('get find_users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "find", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map