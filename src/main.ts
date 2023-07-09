import helmet from 'helmet'
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
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, isProdEnv ? { logger: false } : {})
  app.use(helmet())
  app.use(compression())
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))
  // 全局未处理的异常捕获
  app.useGlobalFilters(new HttpExceptionFilter())
  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor(),new ErrorInterceptor(),new LoggingInterceptor());

  const options = new DocumentBuilder()
    .setTitle('save-time-focus-serve')
    .setDescription('接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-doc', app, document);

  await app.listen(APP.PORT);
}

bootstrap().then(() => {
  logger.info(`NodePress is running at ${APP_CONFIG.APP.PORT}, env: ${environment}.`)
})

