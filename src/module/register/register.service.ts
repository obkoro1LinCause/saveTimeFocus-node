import { Inject, Injectable } from '@nestjs/common';
import { RegisterCreateDto } from './register.dto';
import { Repository } from 'typeorm';
import { CONTEXT, RequestContext } from '@nestjs/microservices';
import { User,UserAuths } from '@app/module';
import { DB_USERS_TOKEN, DB_USERS_AUTHS_TOKEN } from '@app/constants/sys.constant'
import { randHandle,md5Handle } from '@app/utils';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(DB_USERS_TOKEN) private readonly UserRepository:Repository<User>,
    @Inject(DB_USERS_AUTHS_TOKEN) private readonly UserAuthsRepository:Repository<UserAuths>,
    @Inject(CONTEXT) private ctx: RequestContext,
    // private readonly cacheService: CacheService,
  ){}

  async create(createDto:RegisterCreateDto) {
    const bool =  await this.findOneByEmail(createDto.email);
    if(!!bool) return '该邮箱已注册，请登录';
    const user = await this.UserRepository.save({
        email:createDto.email,
        password:md5Handle(createDto.password),
        invite_code:createDto.invite_code,
        self_invite_code:randHandle()
    });
    return await this.UserAuthsRepository.save({user})
  }


  async findAll(){
    return await this.UserRepository.find()
  }

  async findOneByEmail(email){
    return await this.UserRepository.findOne({
      where:{
        email
      }
    })
  }
}
