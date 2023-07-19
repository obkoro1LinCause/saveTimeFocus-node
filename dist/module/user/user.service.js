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
let UserService = exports.UserService = class UserService {
    constructor(UserRepository, UserAuthsRepository, AuthService, CacheService) {
        this.UserRepository = UserRepository;
        this.UserAuthsRepository = UserAuthsRepository;
        this.AuthService = AuthService;
        this.CacheService = CacheService;
    }
    async createUser(createDto) {
        const bool = await this.findOneUserByEmail(createDto.email);
        if (!!bool)
            return '该邮箱已注册，请登录';
        const createUser = (0, class_transformer_1.plainToClass)(module_1.User, createDto);
        const user = await this.UserRepository.save(createUser);
        await this.UserAuthsRepository.save({ user });
        return user;
    }
    async loginUser(user) {
        const token = this.AuthService.createToken(user);
        await this.CacheService.set(`${user.email}&${user.password}`, token, { ttl: 60 * 60 * 24 });
        return Object.assign(Object.assign({}, user), { token });
    }
    async findAllUsers() {
        return await this.UserRepository.find();
    }
    async findOneUserByEmail(email) {
        return await this.UserRepository.findOne({
            where: {
                email
            }
        });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sys_constant_1.DB_USERS_TOKEN)),
    __param(1, (0, common_1.Inject)(sys_constant_1.DB_USERS_AUTHS_TOKEN)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        auth_service_1.AuthService,
        cache_service_1.CacheService])
], UserService);
//# sourceMappingURL=user.service.js.map