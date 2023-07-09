import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    create(registerDto: RegisterDto): Promise<RegisterDto & import("./register.model").Register>;
    find(): Promise<import("./register.model").Register[]>;
}
