import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service'
// import { CacheModule } from '@app/processors/cache/cache.module';
import { UserProvider, UserAuthsProvider} from '@app/module';
// import { AuthService } from '../auth/auth.service';
// import { JwtService } from '@nestjs/jwt';

import { AuthModule } from '@app/module/auth/auth.module';
@Module({
  controllers: [UserController],
  providers: [UserService,UserProvider,UserAuthsProvider,AuthModule],
  exports:[UserService],
  imports:[]
  
})
export class UserModule {}
