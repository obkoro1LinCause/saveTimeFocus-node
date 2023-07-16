import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service'
import { CacheModule } from '@app/processors/cache/cache.module';
import { UserProvider, UserAuthsProvider} from '@app/module'


@Module({
  controllers: [RegisterController],
  providers: [UserProvider,UserAuthsProvider,RegisterService],
  exports: [RegisterService],
  imports:[CacheModule]
})
export class RegisterModule {}
