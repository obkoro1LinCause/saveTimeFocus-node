import helmet from 'helmet';
import csurf from 'csurf';
import bodyParser from 'body-parser'
import compression from 'compression'
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './app.config' 
import { HttpExceptionFilter } from '@app/filters/error.filter'
import { ErrorInterceptor } from '@app/interceptors/error.interceptor'
import { TransformInterceptor } from '@app/interceptors/transform.interceptor'
import { LoggingInterceptor } from '@app/interceptors/logging.interceptor'
import logger from '@app/utils/logger'
import * as APP_CONFIG from '@app/app.config'
import { environment, isProdEnv } from '@app/app.environment'
// import { ValidationPipe } from '@nestjs/common';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, isProdEnv ? { logger: false } : {});

  //防止跨站脚本攻击
  app.use(helmet()) 
  //CSRF保护：跨站点请求伪造  这个要如何配置
  // app.use(csurf());
  app.use(compression())
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ extended: false }));
  // 应用全局前缀
  app.setGlobalPrefix('/focus_sys');

  // 静态目录配置
  // http://localhost:8010/en.json
  app.useStaticAssets('public');
  app.useStaticAssets(path.join(__dirname, '..', 'public'),{
    prefix: '/static/'
  });

  //开启一个全局验证管道
  // app.useGlobalPipes(new ValidationPipe({
  //   enableDebugMessages:true,
  //   transform:true
  // })) 
  
  // 全局未处理的异常捕获
  app.useGlobalFilters(new HttpExceptionFilter())
  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor(),new ErrorInterceptor(),new LoggingInterceptor());

  await app.listen(APP.PORT);
}

bootstrap().then(() => {
  logger.info(`NodePress is running at ${APP_CONFIG.APP.PORT}, env: ${environment}.`)
})

