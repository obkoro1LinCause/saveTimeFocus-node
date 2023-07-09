import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { Repository } from 'typeorm';
import { Register } from './register.model';
@Injectable()
export class RegisterService {
  constructor(
    @Inject('Register') private readonly registerRepository:Repository<Register>
  ){}

  async create(registerDto:RegisterDto) {
    const user =  await this.registerRepository.save(registerDto);
    return user;
  }


  findAll(){
    return this.registerRepository.find()
  }

}
