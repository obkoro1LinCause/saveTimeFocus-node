import { UserCreateDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(registerDto: UserCreateDto): Promise<"该邮箱已注册，请登录" | import("..").User>;
    login(loginDto: UserCreateDto, req: any): Promise<{
        token: string;
        email: string;
        password: string;
        invite_code: string;
    }>;
    find(): Promise<import("..").User[]>;
}
