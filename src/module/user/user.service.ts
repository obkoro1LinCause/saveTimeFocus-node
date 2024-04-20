import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "@app/module";
import { DB_USER_TOKEN } from "@app/constants/sys.constant";
import { plainToClass } from "class-transformer";
import { AuthService } from "@app/module/auth/auth.service";
import { CacheService } from "@app/processors/cache/cache.service";
import { EmailService } from "@app/processors/helper/helper.service.email";
import * as APP_CONFIG from "@app/app.config";
import { createVipTimestamp, createRandomStr,createHashStr } from "@app/utils/index";
import { SEND_EMAIL_CODE } from "@app/constants/sys.constant";
import { SocketGateway } from "@app/module/socket/socket.gateway";

@Injectable()
export class UserService {
  constructor(
    @Inject(DB_USER_TOKEN) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
    private readonly emailService: EmailService,
    private readonly socketGateway: SocketGateway
  ) {}

  // 创建用户
  async createUser(user) {
    const  { email,inviteCode } = user;
    const bool = await this.findUserByField(email,'email');
    if (!!bool) return Promise.reject('createdERR');

    const cacheEmailCode = await this.cacheService.get(email);
    if (!cacheEmailCode || cacheEmailCode !== user.emailCode)
      return Promise.reject('emailCodeERR');

    const initUser = plainToClass(User, {...user, password: createHashStr(user.password),selfInviteCode:createRandomStr()});
    const inviteIns = await this.findUserByField(inviteCode,'selfInviteCode');
    if (inviteCode && !!!inviteIns) return Promise.reject('inviteERR');
    
    // TODO:vip的时间计算
    return await this.userRepository.save(initUser);
  }

  // 登录 
  async loginUser(user,id) {
    /** password 不是加密之后的 */
    let token = await this.cacheService.get(`${id}`);
    if (!token) {
      token = this.authService.createToken(user);
      this.cacheService.set(`${id}`, token, { ttl: 60 * 60 * 24 });
    }
    return { token, email: user.email, id };
  }

  // 登出
  async logoutUser(id) {
    this.cacheService.delete(`${id}`);
    return null;
  }

  // 修改密码
  async changePassword(user) {
    const { email, password } = user;
    const userIns = await this.findUserByField(email,'email');
    if (!userIns) return Promise.reject('emailERR');
    /** 更新数据 */
    await this.userRepository.createQueryBuilder()
          .update(User).set({ password: createHashStr(user.password) })
          .where("email = :email", { email }).execute();
    // TODO:需要自动登录?? 需要得返回token
    return { email };
  }

  async findAllUsers() {
    return await this.userRepository.find();
  }


  // 查询单个user
  async findUserByField(value,field){
    if (!value) return null;
    return await this.userRepository.findOne({
      where: {
        [field]:value,
      },
    });
  }

  async sendEmailCode(email) {
    const code = createRandomStr();
    this.cacheService.set(email, code, { ttl: 60 * 30 });
    this.emailService.sendMailAs(SEND_EMAIL_CODE, {
      to: email,
      subject: "获取注册验证码",
      text: `验证码为${code}`,
      html: `<p>您好！</p>
                <p>您的验证码是：<strong style="color:orangered;">验证码为${code}</strong></p>
                <p>如果不是您本人操作，请无视此邮件</p>`,
    });
  }
}
