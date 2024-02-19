import { RegisterDto, BaseDto, EmailDto } from './user.dto';
import { Repository } from 'typeorm';
import { User } from '@app/module';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '@app/processors/cache/cache.service';
import { EmailService } from '@app/processors/helper/helper.service.email';
import { SocketGateway } from '@app/module/socket/socket.gateway';
import { HttpCustomError } from '@app/errors/custom.error';
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    private readonly cacheService;
    private readonly emailService;
    private readonly socketGateway;
    constructor(userRepository: Repository<User>, authService: AuthService, cacheService: CacheService, emailService: EmailService, socketGateway: SocketGateway);
    createUser(userDto: RegisterDto): Promise<User | HttpCustomError>;
    loginUser(userDto: BaseDto, user: any): Promise<HttpCustomError | {
        token: unknown;
        email: string;
        id: any;
    }>;
    changePassword(userDto: any, user: any): Promise<{
        token: string;
        email: any;
        id: any;
    }>;
    findAllUsers(): Promise<User[]>;
    findUser(userDto: any): Promise<User>;
    findOneUserByEmail(email: any): Promise<User>;
    findOneUserById(id: any): Promise<User>;
    findOneUserByToken(token: any): Promise<User>;
    findOneUserByViteCode(code: any): Promise<User>;
    sendEmailCode(emailDto: EmailDto): Promise<void>;
}
