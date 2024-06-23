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
const jwt_auth_guard_1 = require("../../guards/jwt.auth.guard");
const local_auth_guard_1 = require("../../guards/local.auth.guard");
const queryparams_decorator_1 = require("../../decorators/queryparams.decorator");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    ;
    register(user) {
        return this.userService.createUser(user);
    }
    change(user) {
        return this.userService.changePassword(user);
    }
    login(user, { id }) {
        return this.userService.loginUser(user, id);
    }
    sendEmailCode({ email }) {
        return this.userService.sendEmailCode(email);
    }
    findUsers() {
        return this.userService.findAllUsers();
    }
    getCurrentUser(user) {
        return user;
    }
    logout(user) {
        const { email, id } = user;
        return this.userService.logoutUser(id);
    }
    ;
};
__decorate([
    (0, common_1.Post)('/user_register'),
    responser_decorator_1.Responser.handle('post  register_user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/change_password'),
    responser_decorator_1.Responser.handle('post change_password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserInfoDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "change", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/user_login'),
    responser_decorator_1.Responser.handle('post login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, queryparams_decorator_1.QueryParams)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserInfoDTO, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/email_code'),
    responser_decorator_1.Responser.handle('get email_code'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.EmailDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sendEmailCode", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user_list'),
    responser_decorator_1.Responser.handle('get user_list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/current_user'),
    responser_decorator_1.Responser.handle('get current_user'),
    __param(0, (0, queryparams_decorator_1.QueryParams)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user_logout'),
    responser_decorator_1.Responser.handle('get user_logout'),
    __param(0, (0, queryparams_decorator_1.QueryParams)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map