import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service'
import { HelperModule } from '@app/processors/helper/helper.module';
import { AuthModule } from '@app/module/auth/auth.module';
import { UserProvider} from '@app/module';
import { SocketModule } from '@app/module/socket/socket.module'
@Module({
  controllers: [UserController],
  providers: [UserService,UserProvider],
  exports:[UserService],
  imports:[AuthModule,SocketModule]
})
export class UserModule {}
