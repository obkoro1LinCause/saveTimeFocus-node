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
      private readonly CacheService: CacheService,
      private readonly AuthService: AuthService,
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

      const user = { ...payload };
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      const cacheToken = await this.CacheService.get(`${user.email}&${user.password}`);

      if (!cacheToken) {
        throw  new HttpUnauthorizedError('token已过期!');
      }
      if (token !== cacheToken) {
        throw new HttpUnauthorizedError('token不正确!');
      }

      const existUser = await this.AuthService.getUser(user.email,user.password);
      if (!existUser) {
        throw  new HttpUnauthorizedError('token不存在!');
      }

      // token续签 
      this.CacheService.set(`${user.email}&${user.password}`,token,{ ttl:60 * 60 * 24});
      
      return existUser;
    }
}
