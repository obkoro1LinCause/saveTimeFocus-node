import { ExtractJwt, Strategy,StrategyOptions } from 'passport-jwt';
import { PassportStrategy} from '@nestjs/passport';
import { Injectable,Inject } from '@nestjs/common';
import { CacheService } from '@app/processors/cache/cache.service';
import { HttpUnauthorizedError } from '@app/errors/unauthorized.error';
import { AuthService } from '@app/module/auth/auth.service';
import { JWT_CONFIG } from '@app/app.config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      private readonly cacheService: CacheService,
      private readonly authService: AuthService,
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


    // 该方法参数表示通过守卫后解析token得到的内容，返回值将传入控制器方法参数
    async validate(req:any,payload: any) {
       // token 解密来的字段
      const user = { ...payload };
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

      const existUser = await this.authService.getUser(user.email);
      if (!existUser) {
        throw  new HttpUnauthorizedError('用户不存在!');
      }
      
      const cacheToken = await this.cacheService.get(`${existUser.id}`);

      console.log('==cacheToken==',cacheToken,token)

      if(!cacheToken || cacheToken === token){
        this.cacheService.set(`${existUser.id}`,token,{ ttl:60 * 60 * 24});
        return existUser;
      }

      if(cacheToken !== token){
        throw new HttpUnauthorizedError('token不正确!');
      }
    }
}
