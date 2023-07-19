import { UserCreateDto } from './user.dto';
import { Repository } from 'typeorm';
import { User, UserAuths } from '@app/module';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '@app/processors/cache/cache.service';
export declare class UserService {
    private readonly UserRepository;
    private readonly UserAuthsRepository;
    private readonly AuthService;
    private readonly CacheService;
    constructor(UserRepository: Repository<User>, UserAuthsRepository: Repository<UserAuths>, AuthService: AuthService, CacheService: CacheService);
    createUser(createDto: UserCreateDto): Promise<User | "该邮箱已注册，请登录">;
    loginUser(user: UserCreateDto): Promise<{
        token: string;
        email: string;
        password: string;
        invite_code: string;
    }>;
    findAllUsers(): Promise<User[]>;
    findOneUserByEmail(email: any): Promise<User>;
}
