import { Repository } from "typeorm";
import { User } from "@app/module";
import { AuthService } from "@app/module/auth/auth.service";
import { CacheService } from "@app/processors/cache/cache.service";
import { EmailService } from "@app/processors/helper/helper.service.email";
import { SocketGateway } from "@app/module/socket/socket.gateway";
import { UserInfoDTO, RegisterDTO } from '@app/module/user/user.dto';
export declare class UserService {
    private readonly authService;
    private readonly cacheService;
    private readonly emailService;
    private readonly socketGateway;
    private userRepository;
    constructor(authService: AuthService, cacheService: CacheService, emailService: EmailService, socketGateway: SocketGateway, userRepository: Repository<User>);
    createUser(user: RegisterDTO): Promise<User>;
    loginUser(user: any, id: any): Promise<{
        token: unknown;
        email: any;
        id: any;
    }>;
    logoutUser(id: any): Promise<any>;
    changePassword(user: UserInfoDTO): Promise<{
        email: string;
    }>;
    findAllUsers(): Promise<User[]>;
    findUserByField(value: any, field: any): Promise<User>;
    sendEmailCode(email: string): Promise<void>;
}
