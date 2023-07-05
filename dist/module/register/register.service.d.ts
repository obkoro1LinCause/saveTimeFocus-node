import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
export declare class RegisterService {
    create(createRegisterDto: CreateRegisterDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRegisterDto: UpdateRegisterDto): string;
    remove(id: number): string;
}
