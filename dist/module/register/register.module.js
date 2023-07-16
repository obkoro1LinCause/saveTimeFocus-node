"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterModule = void 0;
const common_1 = require("@nestjs/common");
const register_controller_1 = require("./register.controller");
const register_service_1 = require("./register.service");
const cache_module_1 = require("../../processors/cache/cache.module");
const module_1 = require("..");
let RegisterModule = exports.RegisterModule = class RegisterModule {
};
exports.RegisterModule = RegisterModule = __decorate([
    (0, common_1.Module)({
        controllers: [register_controller_1.RegisterController],
        providers: [module_1.UserProvider, module_1.UserAuthsProvider, register_service_1.RegisterService],
        exports: [register_service_1.RegisterService],
        imports: [cache_module_1.CacheModule]
    })
], RegisterModule);
//# sourceMappingURL=register.module.js.map