import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller';
import { APP_PIPE,APP_GUARD } from '@nestjs/core'

// universal modules
import { DatabaseModule } from '@app/processors/database/mysql.module';
import { CacheModule } from '@app/processors/cache/cache.module';
import { HelperModule } from '@app/processors/helper/helper.module';
// framework
import { ValidationPipe } from '@app/pipes/validation.pipe';
import { ThrottlerModule, ThrottlerGuard,minutes } from '@nestjs/throttler';

// middleware
import { CorsMiddleware } from '@app/middlewares/cors.middleware'
import { OriginMiddleware } from '@app/middlewares/origin.middleware'

// biz modules
import { SocketModule } from '@app/module/socket/socket.module';
import { UserModule } from '@app/module/user/user.module';
import { BlockModule } from '@app/module/block/block.module';
import { TaskModule } from '@app/module/task/task.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: minutes(1),  //5 minutes = 300s
      limit: 40,   //请求300次
      ignoreUserAgents: []
    }]),
    DatabaseModule,
    CacheModule,
    HelperModule,
    SocketModule,
    UserModule, 
    BlockModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
// 安装应用类中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware,OriginMiddleware).forRoutes('*')
  }
}
