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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const module_1 = require("..");
const sys_constant_1 = require("../../constants/sys.constant");
const class_transformer_1 = require("class-transformer");
const auth_service_1 = require("../auth/auth.service");
const cache_service_1 = require("../../processors/cache/cache.service");
const helper_service_email_1 = require("../../processors/helper/helper.service.email");
const index_1 = require("../../utils/index");
const sys_constant_2 = require("../../constants/sys.constant");
const socket_gateway_1 = require("../socket/socket.gateway");
const custom_error_1 = require("../../errors/custom.error");
let UserService = exports.UserService = class UserService {
    constructor(userRepository, authService, cacheService, emailService, socketGateway) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.cacheService = cacheService;
        this.emailService = emailService;
        this.socketGateway = socketGateway;
    }
    async createUser(userDto) {
        const bool = await this.findOneUserByEmail(userDto.email);
        if (!!bool)
            return new custom_error_1.HttpCustomError({ message: '该邮箱已被注册，请前往登录页面！' });
        const emailCode = await this.cacheService.get(userDto.email);
        if (!emailCode)
            return new custom_error_1.HttpCustomError({ message: '验证码错误，验证码有效期为三十分钟，请重新发送邮箱验证码' });
        if (emailCode !== userDto.emailCode)
            return new custom_error_1.HttpCustomError({ message: '邮箱验证码错误，请确认' });
        const initUser = (0, class_transformer_1.plainToClass)(module_1.User, userDto);
        const inviteUser = await this.findOneUserByViteCode(userDto.inviteCode);
        if (userDto.inviteCode && !!!inviteUser)
            return new custom_error_1.HttpCustomError({ message: '邀请码错误，请确认' });
        return await this.userRepository.save(initUser);
    }
    async loginUser(userDto, user) {
        const { id } = user;
        if (!id)
            return new custom_error_1.HttpCustomError({ message: '登录失败，用户信息错误' });
        let token = await this.cacheService.get(`${id}`);
        if (!token) {
            token = this.authService.createToken(userDto);
            this.cacheService.set(`${id}`, token, { ttl: 60 * 60 * 24 });
        }
        return { token, email: userDto.email, id };
    }
    async logoutUser(email) {
        const { id } = await this.findOneUserByEmail(email);
        this.cacheService.delete(`${id}`);
        return { email };
    }
    async changePassword(userDto) {
        const { email, password } = userDto;
        const user = await this.findOneUserByEmail(email);
        if (!user)
            return new custom_error_1.HttpCustomError({ message: '邮箱不存在，请注册！' });
        const { id } = user;
        await this.cacheService.delete(`${id}`);
        const entity = (0, class_transformer_1.plainToClass)(module_1.User, Object.assign(Object.assign({}, user), { password }));
        const result = await this.userRepository.save(entity);
        const token = this.authService.createToken(userDto);
        this.cacheService.set(`${id}`, token, { ttl: 60 * 60 * 24 });
        return { token, email, id };
    }
    async findAllUsers() {
        return await this.userRepository.find();
    }
    async findUser(userDto) {
        if (!(userDto === null || userDto === void 0 ? void 0 : userDto.id) && !(userDto === null || userDto === void 0 ? void 0 : userDto.email))
            return null;
        if (userDto === null || userDto === void 0 ? void 0 : userDto.email) {
            return await this.findOneUserByEmail(userDto === null || userDto === void 0 ? void 0 : userDto.email);
        }
        else {
            return await this.findOneUserById(userDto === null || userDto === void 0 ? void 0 : userDto.id);
        }
    }
    async findOneUserByEmail(email) {
        if (!email)
            return null;
        return await this.userRepository.findOne({
            where: {
                email
            }
        });
    }
    async findOneUserById(id) {
        if (!id)
            return null;
        return await this.userRepository.findOne({
            where: {
                id
            }
        });
    }
    async findOneUserByToken(token) {
        const { email } = await this.authService.refreshTokenByOldToken(token);
        const user = await this.findOneUserByEmail(email);
        const hasToken = await this.cacheService.get(`${user === null || user === void 0 ? void 0 : user.id}`);
        if (!!hasToken)
            return user;
        return new custom_error_1.HttpCustomError({ message: '请登录！' });
    }
    async findOneUserByViteCode(code) {
        if (!code)
            return null;
        return await this.userRepository.findOne({
            where: {
                selfInviteCode: code
            }
        });
    }
    async sendEmailCode(email) {
        const code = (0, index_1.createRandomStr)();
        this.cacheService.set(email, code, { ttl: 60 * 30 });
        this.emailService.sendMailAs(sys_constant_2.SEND_EMAIL_CODE, {
            to: email,
            subject: '获取注册验证码',
            text: `验证码为${code}`,
            html: `<p>您好！</p>
                <p>您的验证码是：<strong style="color:orangered;">验证码为${code}</strong></p>
                <p>如果不是您本人操作，请无视此邮件</p>`
        });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sys_constant_1.DB_USER_TOKEN)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService,
        cache_service_1.CacheService,
        helper_service_email_1.EmailService,
        socket_gateway_1.SocketGateway])
], UserService);
//# sourceMappingURL=user.service.js.map