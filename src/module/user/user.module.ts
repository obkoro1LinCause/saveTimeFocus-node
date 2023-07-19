import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service'
// import { CacheModule } from '@app/processors/cache/cache.module';
import { UserProvider, UserAuthsProvider} from '@app/module';
// import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService,UserProvider,UserAuthsProvider],
  exports:[UserService],
  imports:[]
  
})
export class UserModule {}
