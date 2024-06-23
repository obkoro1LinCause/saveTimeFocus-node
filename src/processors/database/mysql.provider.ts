// import { isDevEnv } from '@app/app.environment';
// import logger from '@app/utils/logger';
// import { TypeOrmModule } from '@nestjs/typeorm'

// const log = logger.scope('mysql');

// // export const databaseProviders = [
// //     {
// //       // 这里官方也建议使用 全局变量储存起来
// //       provide: DB_MODEL_CONNECTION_TOKEN, 
// //       useFactory:  async() => {
// //         const dataSource = new DataSource({
//           // type: 'mysql',
//           // host: 'localhost',
//           // port: isDevEnv  ? 3306:0,
//           // username: 'root',
//           // password: isDevEnv  ? 'HHl070300001111':'root',
//           // database: 'focus_sys',
//           // entities: [__dirname + '/../../model/*.model{.ts,.js}'],
//           // synchronize: true,
//           // logging: isDevEnv ,
//           // maxQueryExecutionTime: 1000,
// //         });

// //         // const  dataSource = TypeOrmModule.forRoot({
// //         //   type: 'mysql',
// //         //   host: 'localhost',
// //         //   port: 3306,
// //         //   username: 'root',
// //         //   password: '123456',
// //         //   database: 'typeorm_test',
// //         //   synchronize: true,
// //         //   logging: true,
// //         //   entities: ['./**/entity/*.ts'],
// //         //   connectorPackage: 'mysql2'
// //         // });

// //         dataSource.initialize().then(async ()=>{
// //           isDevEnv && log.info('db inited')
// //         }).catch((error)=>{
// //           isDevEnv && log.error('db init error',error)
// //         })
          
// //         return dataSource;
// //       },
// //     },
// // ];

// // export const  databaseModule  = ()=>{
// //   return TypeOrmModule.forRoot({
// //     type: 'mysql',
// //     host: 'localhost',
// //     port: isDevEnv  ? 3306:0,
// //     username: 'root',
// //     password: isDevEnv  ? 'HHl070300001111':'root',
// //     database: 'focus_sys',
// //     entities: [__dirname + '/../../model/*.model{.ts,.js}'],
// //     synchronize: isDevEnv ? true:false,
// //     logging: isDevEnv ,
// //     maxQueryExecutionTime: 1000,
// //   });
// // }