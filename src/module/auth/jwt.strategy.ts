import { Injectable } from '@nestjs/common';
import { HttpUnauthorizedError } from '@app/errors/unauthorized.error';
import { JWT_CONFIG } from '@app/app.config';
import { UNDEFINED } from '@app/constants/value.constant';
import { UserService } from '@app/module/user/user.service';
import { CacheService } from '@app/processors/cache/cache.service';
import { ExtractJwt, Strategy,StrategyOptions } from 'passport-jwt';
import { PassportStrategy} from '@nestjs/passport';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      private readonly cacheService: CacheService,
      private readonly userService: UserService

    ) {
        super({
          	// 如何提取令牌
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
          	// 是否忽略令牌过期
            ignoreExpiration: JWT_CONFIG.ignoreExpiration,
          	// 解析令牌的密钥
            secretOrKey: JWT_CONFIG.secret,
            passReqToCallback: JWT_CONFIG.passReqToCallback,
        } as StrategyOptions);
    }

    // 授权 校验策略
    // 该方法参数表示通过守卫后解析 token 得到的内容，返回值将传入控制器方法参数
    async validate(req:any,payload: any) {
      const user = { ...payload };
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      const originalUrl = req.url;
      const existUser = await this.userService.findUserByField(user.email,'email');
      if (!existUser) {
          throw new HttpUnauthorizedError('noUserERR');
      }
      
      const cacheToken = await this.cacheService.get(`${existUser.id}`);

      console.log('==cacheToken==',cacheToken,token,req.url);
      if(originalUrl.includes('user_logout')){
        if(cacheToken !== token){
          throw new HttpUnauthorizedError('noTokenERR');
        }
        return existUser;
      }else{
        if(cacheToken === token){
          this.cacheService.set(`${existUser.id}`,token,{ ttl:60 * 60 * 24});
          return existUser;
        }
        // if(!cacheToken){
        //   // 无限登录态
        //   // this.cacheService.set(`${existUser.id}`,token,{ ttl:60 * 60 * 24});
        //   // return existUser;
        // }
        // 登录过期
        throw new HttpUnauthorizedError(UNDEFINED,'noTokenERR');
      }
    }
}
