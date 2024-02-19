import { Module,Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserProvider } from '@app/module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '@app/app.config';

// 基于possport的本地策略和jwt策略
// 本地策略主要是验证账号和密码是否存在，如果存在就登陆，返回token
// jwt策略则是验证用户登陆时附带的token是否匹配和有效，如果不匹配和无效则返回401状态码
@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      // signOptions: { expiresIn: JWT_CONFIG.expiresIn },
    }),
  ],
  providers: [AuthService,UserProvider,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}





