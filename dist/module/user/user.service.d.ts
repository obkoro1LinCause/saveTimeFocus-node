import { Repository } from "typeorm";
import { User } from "@app/module";
import { AuthService } from "@app/module/auth/auth.service";
import { CacheService } from "@app/processors/cache/cache.service";
import { EmailService } from "@app/processors/helper/helper.service.email";
import { SocketGateway } from "@app/module/socket/socket.gateway";
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    private readonly cacheService;
    private readonly emailService;
    private readonly socketGateway;
    constructor(userRepository: Repository<User>, authService: AuthService, cacheService: CacheService, emailService: EmailService, socketGateway: SocketGateway);
    createUser(user: any): Promise<User>;
    loginUser(user: any, id: any): Promise<{
        token: unknown;
        email: any;
        id: any;
    }>;
    logoutUser(id: any): Promise<any>;
    changePassword(user: any): Promise<{
        email: any;
    }>;
    findAllUsers(): Promise<User[]>;
    findUserByField(value: any, field: any): Promise<User>;
    sendEmailCode(email: any): Promise<void>;
}
