"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCustomError = void 0;
const common_1 = require("@nestjs/common");
class HttpCustomError extends common_1.HttpException {
    constructor(options, code) {
        super(options, code || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.HttpCustomError = HttpCustomError;
//# sourceMappingURL=custom.error.js.map