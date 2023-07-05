"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
let RegisterService = exports.RegisterService = class RegisterService {
    create(createRegisterDto) {
        return 'This action adds a new register';
    }
    findAll() {
        return `This action returns all register`;
    }
    findOne(id) {
        return `This action returns a #${id} register`;
    }
    update(id, updateRegisterDto) {
        return `This action updates a #${id} register`;
    }
    remove(id) {
        return `This action removes a #${id} register`;
    }
};
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)()
], RegisterService);
//# sourceMappingURL=register.service.js.map