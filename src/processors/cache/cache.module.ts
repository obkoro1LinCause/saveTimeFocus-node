import { ClientsModule } from '@nestjs/microservices';
import { CacheService } from './cache.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}

