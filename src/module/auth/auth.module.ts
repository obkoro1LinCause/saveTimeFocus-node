import { Module,Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserProvider } from '@app/module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '@app/app.config';

@Global()
@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      // signOptions: { expiresIn: JWT_CONFIG.expiresIn },
    })
  ],
  providers: [AuthService,UserProvider,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}





