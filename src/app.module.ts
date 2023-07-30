import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'

// universal modules
import { DatabaseModule } from '@app/processors/database/mysql.module';
import { CacheModule } from '@app/processors/cache/cache.module';
import { HelperModule } from '@app/processors/helper/helper.module'

// middleware
import { CorsMiddleware } from '@app/middlewares/cors.middleware'
import { OriginMiddleware } from '@app/middlewares/origin.middleware'

// biz modules
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { SocketModule } from './module/socket/socket.module';

@Module({
  imports: [DatabaseModule,CacheModule,HelperModule,AuthModule,UserModule, SocketModule],
  controllers: [AppController],
  providers: [],
})
// 安装应用类中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware,OriginMiddleware).forRoutes('*')
  }
}
