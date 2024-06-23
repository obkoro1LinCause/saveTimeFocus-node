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
const typeorm_2 = require("@nestjs/typeorm");
const module_1 = require("..");
const class_transformer_1 = require("class-transformer");
const auth_service_1 = require("../auth/auth.service");
const cache_service_1 = require("../../processors/cache/cache.service");
const helper_service_email_1 = require("../../processors/helper/helper.service.email");
const index_1 = require("../../utils/index");
const sys_constant_1 = require("../../constants/sys.constant");
const socket_gateway_1 = require("../socket/socket.gateway");
let UserService = exports.UserService = class UserService {
    constructor(authService, cacheService, emailService, socketGateway, userRepository) {
        this.authService = authService;
        this.cacheService = cacheService;
        this.emailService = emailService;
        this.socketGateway = socketGateway;
        this.userRepository = userRepository;
    }
    async createUser(user) {
        const { email, inviteCode } = user;
        const bool = await this.findUserByField(email, 'email');
        if (!!bool)
            return Promise.reject('createdERR');
        const cacheEmailCode = await this.cacheService.get(email);
        if (!cacheEmailCode || cacheEmailCode !== user.emailCode)
            return Promise.reject('emailCodeERR');
        const initUser = (0, class_transformer_1.plainToClass)(module_1.User, Object.assign(Object.assign({}, user), { password: (0, index_1.createHashStr)(user.password), selfInviteCode: (0, index_1.createRandomStr)() }));
        const inviteIns = await this.findUserByField(inviteCode, 'selfInviteCode');
        if (inviteCode && !!!inviteIns)
            return Promise.reject('inviteERR');
        return await this.userRepository.save(initUser);
    }
    async loginUser(user, id) {
        let token = await this.cacheService.get(`${id}`);
        if (!token) {
            token = this.authService.createToken(user);
            this.cacheService.set(`${id}`, token, { ttl: 60 * 60 * 24 });
        }
        return { token, email: user.email, id };
    }
    async logoutUser(id) {
        this.cacheService.delete(`${id}`);
        return null;
    }
    async changePassword(user) {
        const { email, password } = user;
        const userIns = await this.findUserByField(email, 'email');
        if (!userIns)
            return Promise.reject('emailERR');
        await this.userRepository.createQueryBuilder()
            .update(module_1.User).set({ password: (0, index_1.createHashStr)(user.password) })
            .where("email = :email", { email }).execute();
        return { email };
    }
    async findAllUsers() {
        return await this.userRepository.find();
    }
    async findUserByField(value, field) {
        if (!value)
            return null;
        return await this.userRepository.findOne({
            where: {
                [field]: value,
            },
        });
    }
    async sendEmailCode(email) {
        const code = (0, index_1.createRandomStr)();
        this.cacheService.set(email, code, { ttl: 60 * 30 });
        this.emailService.sendMailAs(sys_constant_1.SEND_EMAIL_CODE, {
            to: email,
            subject: "获取注册验证码",
            text: `验证码为${code}`,
            html: `<p>您好！</p>
                <p>您的验证码是：<strong style="color:orangered;">验证码为${code}</strong></p>
                <p>如果不是您本人操作，请无视此邮件</p>`,
        });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_2.InjectRepository)(module_1.User)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        cache_service_1.CacheService,
        helper_service_email_1.EmailService,
        socket_gateway_1.SocketGateway,
        typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map