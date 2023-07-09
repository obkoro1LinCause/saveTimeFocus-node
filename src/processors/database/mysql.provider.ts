import { DataSource } from 'typeorm';
import { isDevEnv } from '@app/app.environment';
import logger from '@app/utils/logger';
import { DB_MODEL_CONNECTION_TOKEN } from '@app/constants/sys.constant'

const log = logger.scope('mysql');

export const databaseProviders = [
    {
      // 这里官方也建议使用 全局变量储存起来
      provide: DB_MODEL_CONNECTION_TOKEN, 
      useFactory:  async() => {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: isDevEnv  ? 3306:0,
          username: 'root',
          password: isDevEnv  ? 'HHl070300001111':'root',
          database: 'focus_sys',
          entities: [__dirname + '/../../module/**/*.model{.ts,.js}'],
          synchronize: true,
          logging: isDevEnv ,
          maxQueryExecutionTime: 1000,
        });

        dataSource.initialize().then(async ()=>{
          isDevEnv && log.info('db inited')
        }).catch(()=>{})
          isDevEnv && log.error('db init error')
        return dataSource;
      },
    },
];