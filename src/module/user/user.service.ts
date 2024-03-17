import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto,BaseDto,EmailDto } from './user.dto';
import { Repository } from 'typeorm';
import { User } from '@app/module';
import { DB_USER_TOKEN } from '@app/constants/sys.constant';
import { plainToClass } from 'class-transformer';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '@app/processors/cache/cache.service';
import { EmailService } from '@app/processors/helper/helper.service.email';
import * as APP_CONFIG from '@app/app.config';
import { createVipTimestamp,createRandomStr} from '@app/utils/index';
import { SEND_EMAIL_CODE } from '@app/constants/sys.constant'
import { SocketGateway } from '@app/module/socket/socket.gateway';



@Injectable()
export class UserService {
    constructor(
        @Inject(DB_USER_TOKEN) private readonly userRepository:Repository<User>,
        private readonly authService: AuthService,
        private readonly cacheService: CacheService,
        private readonly emailService: EmailService,
        private readonly socketGateway: SocketGateway
    ){}
    
     // 创建用户
    async createUser(userDto:RegisterDto) {
        const bool =  await this.findOneUserByEmail(userDto.email);
        if(!!bool) return Promise.reject('该邮箱已被注册，请前往登录页面');

        const emailCode = await this.cacheService.get(userDto.email);
        if(!emailCode) return Promise.reject('验证码错误，验证码有效期为三十分钟，请重新发送邮箱验证码');
        if(emailCode !== userDto.emailCode)  return Promise.reject('邮箱验证码错误，请确认');

        const initUser = plainToClass(User,userDto);
        const inviteUser = await this.findOneUserByViteCode(userDto.inviteCode);
        if(userDto.inviteCode && !!!inviteUser) return Promise.reject('邀请码错误，请确认');
        
        // TODO:vip的时间计算
        // vip的计算规则待补充

        return await this.userRepository.save(initUser);
    }
    
    // 登录
    async loginUser(userDto:BaseDto,user:any){
        const { id } = user;
        if(!id) return Promise.reject('登录失败，用户信息错误');
        // password 不是加密之后的
        let token = await this.cacheService.get(`${id}`);
        if(!token){
            token = this.authService.createToken(userDto);
            this.cacheService.set(`${id}`,token,{ ttl:60 * 60 * 24});
        } 
        return { token,email:userDto.email,id };
    }

    // 登出
    async logoutUser(email){
        const {id} = await this.findOneUserByEmail(email);
        this.cacheService.delete(`${id}`);
        return { email };
    }

    // 修改密码
    async changePassword(userDto){
        const { email,password } = userDto;

        const user = await this.findOneUserByEmail(email);
        if(!user)  return Promise.reject('邮箱不存在，请注册');
        const { id } = user;
        await this.cacheService.delete(`${id}`);
        const entity = plainToClass(User, { ...user,password });
        const result = await this.userRepository.save(entity);

        // 修改完密码直接登录
        const token = this.authService.createToken(userDto);
        this.cacheService.set(`${id}`,token,{ ttl:60 * 60 * 24});
        return { token,email,id };
    }

    async findAllUsers(){
        return await this.userRepository.find();
    }

    async findUser(userDto){
        if(!userDto?.id && !userDto?.email) return null;
        if(userDto?.email){
            return await this.findOneUserByEmail(userDto?.email);
        }else{
            return await this.findOneUserById(userDto?.id)
        }
    }

    async findOneUserByEmail(email){
        if(!email) return null;
        return await this.userRepository.findOne({
            where:{
                email
            }
        })
    }
    async findOneUserById(id){
        if(!id) return null;
        return await this.userRepository.findOne({
            where:{
                id
            }
        })
    }

    async findOneUserByToken(token){
        const { email }:any = await this.authService.refreshTokenByOldToken(token);
        const user:any = await this.findOneUserByEmail(email);
        const hasToken = await this.cacheService.get(`${user?.id}`);
        if(!!hasToken) return user;
        return  Promise.reject('请登录');
    }

    async findOneUserByViteCode(code){
        if(!code) return null;
        return await this.userRepository.findOne({
            where:{
                selfInviteCode:code
            }
        })
    }

    async sendEmailCode(email){
        const code = createRandomStr();
        this.cacheService.set(email,code,{ ttl:60 * 30 });
        this.emailService.sendMailAs(SEND_EMAIL_CODE, {
            to:email,
            subject: '获取注册验证码',
            text:`验证码为${code}`,
            html:`<p>您好！</p>
                <p>您的验证码是：<strong style="color:orangered;">验证码为${code}</strong></p>
                <p>如果不是您本人操作，请无视此邮件</p>`
        })
    }
}
