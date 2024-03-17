import { RegisterDto, BaseDto } from './user.dto';
import { Repository } from 'typeorm';
import { User } from '@app/module';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '@app/processors/cache/cache.service';
import { EmailService } from '@app/processors/helper/helper.service.email';
import { SocketGateway } from '@app/module/socket/socket.gateway';
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    private readonly cacheService;
    private readonly emailService;
    private readonly socketGateway;
    constructor(userRepository: Repository<User>, authService: AuthService, cacheService: CacheService, emailService: EmailService, socketGateway: SocketGateway);
    createUser(userDto: RegisterDto): Promise<User>;
    loginUser(userDto: BaseDto, user: any): Promise<{
        token: unknown;
        email: string;
        id: any;
    }>;
    logoutUser(email: any): Promise<{
        email: any;
    }>;
    changePassword(userDto: any): Promise<{
        token: string;
        email: any;
        id: number;
    }>;
    findAllUsers(): Promise<User[]>;
    findUser(userDto: any): Promise<User>;
    findOneUserByEmail(email: any): Promise<User>;
    findOneUserById(id: any): Promise<User>;
    findOneUserByToken(token: any): Promise<any>;
    findOneUserByViteCode(code: any): Promise<User>;
    sendEmailCode(email: any): Promise<void>;
}
