"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRegisterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_register_dto_1 = require("./create-register.dto");
class UpdateRegisterDto extends (0, mapped_types_1.PartialType)(create_register_dto_1.CreateRegisterDto) {
}
exports.UpdateRegisterDto = UpdateRegisterDto;
//# sourceMappingURL=update-register.dto.js.map