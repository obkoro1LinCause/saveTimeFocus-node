import { RegisterDto, BaseDto, EmailDto, UserDto, TokenDto } from './user.dto';
import { UserService } from './user.service';
import { ReqParamsResult } from '@app/decorators/reqParams.decorator';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<import("..").User | import("../../errors/custom.error").HttpCustomError>;
    login(loginDto: BaseDto, user: ReqParamsResult): Promise<import("../../errors/custom.error").HttpCustomError | {
        token: unknown;
        email: string;
        id: any;
    }>;
    change(userDto: BaseDto, user: ReqParamsResult): Promise<{
        token: string;
        email: any;
        id: any;
    }>;
    sendEmailCode(email: EmailDto): Promise<void>;
    findUsers(): Promise<import("..").User[]>;
    findUser(userDto: UserDto): Promise<import("..").User>;
    findUserByToken(token: TokenDto): Promise<import("..").User>;
}
