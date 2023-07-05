import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    create(createRegisterDto: CreateRegisterDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRegisterDto: UpdateRegisterDto): string;
    remove(id: string): string;
}
