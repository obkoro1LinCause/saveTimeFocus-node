import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { CacheModule } from '@app/processors/cache/cache.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports:[CacheModule]
})
export class LoginModule {}
