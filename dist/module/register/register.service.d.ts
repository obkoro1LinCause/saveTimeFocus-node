import { RegisterCreateDto } from './register.dto';
import { Repository } from 'typeorm';
import { RequestContext } from '@nestjs/microservices';
import { User, UserAuths } from '@app/module';
export declare class RegisterService {
    private readonly UserRepository;
    private readonly UserAuthsRepository;
    private ctx;
    constructor(UserRepository: Repository<User>, UserAuthsRepository: Repository<UserAuths>, ctx: RequestContext);
    create(createDto: RegisterCreateDto): Promise<"该邮箱已注册，请登录" | ({
        user: {
            email: string;
            password: any;
            invite_code: string;
            self_invite_code: number;
        } & User;
    } & UserAuths)>;
    findAll(): Promise<User[]>;
    findOneByEmail(email: any): Promise<User>;
}
