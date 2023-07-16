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
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const microservices_1 = require("@nestjs/microservices");
const sys_constant_1 = require("../../constants/sys.constant");
const utils_1 = require("../../utils");
let RegisterService = exports.RegisterService = class RegisterService {
    constructor(UserRepository, UserAuthsRepository, ctx) {
        this.UserRepository = UserRepository;
        this.UserAuthsRepository = UserAuthsRepository;
        this.ctx = ctx;
    }
    async create(createDto) {
        const bool = await this.findOneByEmail(createDto.email);
        if (!!bool)
            return '该邮箱已注册，请登录';
        const user = await this.UserRepository.save({
            email: createDto.email,
            password: (0, utils_1.md5Handle)(createDto.password),
            invite_code: createDto.invite_code,
            self_invite_code: (0, utils_1.randHandle)()
        });
        return await this.UserAuthsRepository.save({ user });
    }
    async findAll() {
        return await this.UserRepository.find();
    }
    async findOneByEmail(email) {
        return await this.UserRepository.findOne({
            where: {
                email
            }
        });
    }
};
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sys_constant_1.DB_USERS_TOKEN)),
    __param(1, (0, common_1.Inject)(sys_constant_1.DB_USERS_AUTHS_TOKEN)),
    __param(2, (0, common_1.Inject)(microservices_1.CONTEXT)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository, Object])
], RegisterService);
//# sourceMappingURL=register.service.js.map