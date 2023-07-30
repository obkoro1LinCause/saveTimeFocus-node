import { RegisterDto, BaseDto, EmailDto } from './user.dto';
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
    createUser(userDto: RegisterDto): Promise<User | "该邮箱已被注册，请前往登录页面" | "验证码有效期为三十分钟，请重新发送邮箱验证码" | "邮箱验证码错误，请确认" | "邀请码错误，请确认">;
    loginUser(userDto: BaseDto): Promise<{
        token: unknown;
        email: string;
    }>;
    changePassword(userDto: any, user: any): Promise<"用户不存在，请先注册!" | {
        token: string;
        email: any;
    }>;
    findAllUsers(): Promise<User[]>;
    findOneUserByEmail(email: any): Promise<User>;
    findOneUserByViteCode(code: any): Promise<User>;
    sendEmailCode(emailDto: EmailDto): Promise<void>;
}
