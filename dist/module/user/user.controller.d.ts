import { RegisterDto, BaseDto, EmailDto } from './user.dto';
import { UserService } from './user.service';
import { ReqParamsResult } from '@app/decorators/reqParams.decorator';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<"该邮箱已被注册，请前往登录页面" | "验证码有效期为三十分钟，请重新发送邮箱验证码" | "邮箱验证码错误，请确认" | "邀请码错误，请确认" | import("..").User>;
    login(loginDto: BaseDto): Promise<{
        token: unknown;
        email: string;
    }>;
    change(userDto: BaseDto, user: ReqParamsResult): Promise<"用户不存在，请先注册!" | {
        token: string;
        email: any;
    }>;
    sendEmailCode(email: EmailDto): void;
    find(): Promise<import("..").User[]>;
}
