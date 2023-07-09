import { RegisterDto } from './register.dto';
import { Repository } from 'typeorm';
import { Register } from './register.model';
export declare class RegisterService {
    private readonly registerRepository;
    constructor(registerRepository: Repository<Register>);
    create(registerDto: RegisterDto): Promise<RegisterDto & Register>;
    findAll(): Promise<Register[]>;
}
