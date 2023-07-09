import { Module, Global } from '@nestjs/common';
import { databaseProviders } from './mysql.provider';

@Global() // 将其变成全局模块
@Module({
  providers: databaseProviders,
  exports: databaseProviders,
})
export class DatabaseModule {}