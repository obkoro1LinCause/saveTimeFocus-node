import { Injectable,Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DB_USERS_TOKEN } from '@app/constants/sys.constant';
import { Repository } from 'typeorm';
import { User } from '@app/module';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(DB_USERS_TOKEN) private readonly UserRepository:Repository<User>,
      ) {}

    createToken(user) {
        const payload = { ...user };
        return this.jwtService.sign(payload);
    }
    
    async getUser(email: string, password: string){
        return await this.UserRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email=:email', { email })
        .getOne();
    }
}