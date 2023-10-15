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
import { HttpCustomError } from '@app/errors/custom.error'
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
        
        if(!!bool) return new HttpCustomError({ message: '该邮箱已被注册，请前往登录页面！'})
        const emailCode = await this.cacheService.get(userDto.email);
        if(!emailCode) return new HttpCustomError({ message: '验证码错误，验证码有效期为三十分钟，请重新发送邮箱验证码'});
        if(emailCode !== userDto.emailCode) return new HttpCustomError({ message: '邮箱验证码错误，请确认'});
        const initUser = plainToClass(User,userDto);
        const inviteUser = await this.findOneUserByViteCode(userDto.inviteCode);
        if(userDto.inviteCode && !!!inviteUser) return new HttpCustomError({ message:'邀请码错误，请确认'});
        let stepTs = 1;
        if(!!!userDto.inviteCode || !!!inviteUser){
            initUser.vipTime = createVipTimestamp({
                base:APP_CONFIG.VIPTIME.month_ts
            });
            if(!!!inviteUser) initUser.inviteCode = '';
            return await this.userRepository.save(initUser);
        }else{
            stepTs = 2;
        }
        
        const time = createVipTimestamp({
            timestamp:inviteUser.vipTime,
            base:APP_CONFIG.VIPTIME.month_ts * stepTs
        });

        initUser.vipTime = createVipTimestamp({
            base:APP_CONFIG.VIPTIME.month_ts * stepTs
        });
        await this.userRepository.update(inviteUser.id,{ vipTime:time });
        return await this.userRepository.save(initUser);
        
    }
    
    // 登录
    async loginUser(userDto:BaseDto,user:any){
        const { id } = user;
        if(!id) return  new HttpCustomError({ message:'登录失败，用户信息错误'});
        // password 不是加密之后的
        let token = await this.cacheService.get(`${id}`);
        if(!token){
            token = this.authService.createToken(userDto);
            this.cacheService.set(`${id}`,token,{ ttl:60 * 60 * 24});
        } 
        return { token,email:userDto.email,id};
    }

    // 修改密码
    async changePassword(userDto,user){
        const { email,password } = userDto;
        const { id } = user;

        await this.cacheService.delete(`${id}`);
        const entity = plainToClass(User, { ...user,password });
        const result = await this.userRepository.save(entity);

        // 修改完密码直接登录
        const token = this.authService.createToken(userDto);
        this.cacheService.set(`${id}`,token,{ ttl:60 * 60 * 24});
        // TODO:推送token
        console.log('-1-1-1-')
        // this.socketGateway.publicMessage('修改密码')
        return { token,email,id };
    }

    async findAllUsers(){
        return await this.userRepository.find()
    }

    async findOneUserByEmail(email){
        if(!email) return null;
        return await this.userRepository.findOne({
            where:{
                email
            }
        })
    }

    async findOneUserByViteCode(code){
        if(!code) return null;
        return await this.userRepository.findOne({
            where:{
                selfInviteCode:code
            }
        })
    }

    async sendEmailCode(emailDto:EmailDto){
        const code = createRandomStr();
        const email = emailDto.email;
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
