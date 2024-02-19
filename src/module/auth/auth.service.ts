import { Injectable,Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DB_USER_TOKEN } from '@app/constants/sys.constant';
import { Repository } from 'typeorm';
import { User } from '@app/module';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(DB_USER_TOKEN) private readonly userRepository:Repository<User>,
      ) {}

    createToken(user) {
        const payload = { ...user };
        return this.jwtService.sign(payload);
    }

    refreshTokenByOldToken(token:string){
        const user = this.jwtService.decode(token);
        return user;
    }
    
    async getUser(email: string){
        return await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email=:email', { email })
        .getOne();
    }
}