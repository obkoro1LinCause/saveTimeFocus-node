import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { isDevEnv } from '@app/app.environment';
@Global() // 将其变成全局模块
@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: isDevEnv  ? 3306:0,
      username: 'root',
      password: isDevEnv  ? 'HHl070300001111':'root',
      database: 'focus_sys',
      entities: [__dirname + '/../../model/*.model{.ts,.js}'],
      synchronize: isDevEnv ? true:false,
      logging: isDevEnv ,
      maxQueryExecutionTime: 1000,
    })
  ]
})
export class DatabaseModule {}