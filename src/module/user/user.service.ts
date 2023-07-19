import { Inject, Injectable } from '@nestjs/common';
import { UserCreateDto } from './user.dto';
import { Repository } from 'typeorm';
import { User,UserAuths } from '@app/module';
import { DB_USERS_TOKEN, DB_USERS_AUTHS_TOKEN } from '@app/constants/sys.constant';
import { plainToClass } from 'class-transformer';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '@app/processors/cache/cache.service';

@Injectable()
export class UserService {
    constructor(
        @Inject(DB_USERS_TOKEN) private readonly UserRepository:Repository<User>,
        @Inject(DB_USERS_AUTHS_TOKEN) private readonly UserAuthsRepository:Repository<UserAuths>,
        private readonly AuthService: AuthService,
        private readonly CacheService: CacheService
    ){}

     // 创建用户
    async createUser(createDto:UserCreateDto) {
        const bool =  await this.findOneUserByEmail(createDto.email);
        if(!!bool) return '该邮箱已注册，请登录';
        // TODO: 是否需要再次输入密码功能
        const createUser = plainToClass(User,createDto);
        const user = await this.UserRepository.save(createUser);
        await this.UserAuthsRepository.save({user});
        return user;
    }

    async loginUser(user:UserCreateDto){
        const token = this.AuthService.createToken(user);
        await this.CacheService.set(`${user.email}&${user.password}`,token,{ttl:60 * 60 *24});
        // TODO:插入ext表
        return {
            ...user,
            token
        };
    }

    async findAllUsers(){
        return await this.UserRepository.find()
    }

    async findOneUserByEmail(email){
        return await this.UserRepository.findOne({
        where:{
            email
        }
        })
    }
}
