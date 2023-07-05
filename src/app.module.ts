import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { CorsMiddleware } from '@app/middlewares/cors.middleware'
import { OriginMiddleware } from '@app/middlewares/origin.middleware'
import { LoginModule } from './module/login/login.module';
import { UserModule } from './module/user/user.module';
import { RegisterModule } from './module/register/register.module';

@Module({
  imports: [LoginModule, UserModule, RegisterModule],
  controllers: [AppController],
  providers: [],
})
// 安装应用类中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware,OriginMiddleware).forRoutes('*')
  }
}
