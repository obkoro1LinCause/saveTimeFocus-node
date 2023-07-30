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
const APP_CONFIG = __importStar(require("../../app.config"));
const index_1 = require("../../utils/index");
const sys_constant_2 = require("../../constants/sys.constant");
const socket_gateway_1 = require("../socket/socket.gateway");
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
            return '该邮箱已被注册，请前往登录页面';
        const emailCode = await this.cacheService.get(userDto.email);
        if (!emailCode)
            return '验证码有效期为三十分钟，请重新发送邮箱验证码';
        if (emailCode !== userDto.emial_auth_code)
            return '邮箱验证码错误，请确认';
        const initUser = (0, class_transformer_1.plainToClass)(module_1.User, userDto);
        const inviteUser = await this.findOneUserByViteCode(userDto.invite_code);
        if (userDto.invite_code && !!!inviteUser)
            return '邀请码错误，请确认';
        let stepTs = 1;
        if (!!!userDto.invite_code || !!!inviteUser) {
            initUser.vip_time = (0, index_1.createVipTimestamp)({
                base: APP_CONFIG.VIPTIME.month_ts
            });
            if (!!!inviteUser)
                initUser.invite_code = '';
            return await this.userRepository.save(initUser);
        }
        else {
            stepTs = 2;
        }
        const time = (0, index_1.createVipTimestamp)({
            timestamp: inviteUser.vip_time,
            base: APP_CONFIG.VIPTIME.month_ts * stepTs
        });
        initUser.vip_time = (0, index_1.createVipTimestamp)({
            base: APP_CONFIG.VIPTIME.month_ts * stepTs
        });
        await this.userRepository.update(inviteUser.id, { vip_time: time });
        return await this.userRepository.save(initUser);
    }
    async loginUser(userDto) {
        let token = await this.cacheService.get(`${userDto.email}&${userDto.password}`);
        if (!token) {
            token = this.authService.createToken(userDto);
            this.cacheService.set(`${userDto.email}&${userDto.password}`, token, { ttl: 60 * 60 * 24 });
        }
        return { token, email: userDto.email };
    }
    async changePassword(userDto, user) {
        const { email, password } = userDto;
        const existuser = await this.findOneUserByEmail(email);
        if (!existuser)
            return '用户不存在，请先注册!';
        await this.cacheService.delete(`${user === null || user === void 0 ? void 0 : user.email}&${user === null || user === void 0 ? void 0 : user.password}`);
        const entity = (0, class_transformer_1.plainToClass)(module_1.User, Object.assign(Object.assign({}, existuser), { password }));
        const result = await this.userRepository.save(entity);
        const token = this.authService.createToken(userDto);
        this.cacheService.set(`${email}&${password}`, token, { ttl: 60 * 60 * 24 });
        console.log('-1-1-1-');
        return { token, email };
    }
    async findAllUsers() {
        return await this.userRepository.find();
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
    async findOneUserByViteCode(code) {
        if (!code)
            return null;
        return await this.userRepository.findOne({
            where: {
                self_invite_code: code
            }
        });
    }
    async sendEmailCode(emailDto) {
        const code = (0, index_1.createRandomStr)();
        const email = emailDto.email;
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
    __param(0, (0, common_1.Inject)(sys_constant_1.DB_USERS_TOKEN)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        auth_service_1.AuthService,
        cache_service_1.CacheService,
        helper_service_email_1.EmailService,
        socket_gateway_1.SocketGateway])
], UserService);
//# sourceMappingURL=user.service.js.map