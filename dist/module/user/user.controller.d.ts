import { UserInfoDTO, RegisterDTO, EmailDTO } from '@app/module/user/user.dto';
import { UserService } from '@app/module/user/user.service';
import { User } from '@app/decorators/queryparams.decorator';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(user: RegisterDTO): Promise<import("..").User>;
    change(user: UserInfoDTO): Promise<{
        email: string;
    }>;
    login(user: UserInfoDTO, { id }: User): Promise<{
        token: unknown;
        email: any;
        id: any;
    }>;
    sendEmailCode({ email }: EmailDTO): Promise<void>;
    findUsers(): Promise<import("..").User[]>;
    getCurrentUser(user: User): User;
    logout(user: User): Promise<any>;
}
