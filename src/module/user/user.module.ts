import { Module,forwardRef} from '@nestjs/common';
import { UserProvider} from '@app/module';
import { SocketModule } from '@app/module/socket/socket.module'
import { LocalStrategy } from '@app/module/auth/local.strategy';
import { JwtStrategy } from '@app/module/auth/jwt.strategy';
import { AuthService } from '@app/module/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from '@app/module/user/user.controller';
import { UserService } from '@app/module/user/user.service';
import { JWT_CONFIG } from '@app/app.config';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      // signOptions: { expiresIn: JWT_CONFIG.expiresIn },
    }),
    SocketModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserProvider,
    JwtStrategy,
    LocalStrategy,
    AuthService
  ],
  exports:[UserService],
})
export class UserModule {}
