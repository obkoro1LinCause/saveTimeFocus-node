import { RegisterService } from './register.service';
import { RegisterCreateDto } from './register.dto';
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    create(registerDto: RegisterCreateDto): Promise<"该邮箱已注册，请登录" | ({
        user: {
            email: string;
            password: any;
            invite_code: string;
            self_invite_code: number;
        } & import("..").User;
    } & import("..").UserAuths)>;
    find(): Promise<import("..").User[]>;
}
