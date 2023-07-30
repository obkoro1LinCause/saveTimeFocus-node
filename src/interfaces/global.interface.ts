export interface APP_CONFIG{
  // 端口
  PORT: number,
  // 静态文件路径 localhost:3000/static/upload/xxx.jpg
  STATIC_URL: string,
}

// 数据库配置
export  interface DATABASE_CONFIG{
  type: string,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  entities: string[],
  synchronize: boolean,
  charset: string,
  logging: boolean,
}


export interface SOCKET_SYNC_MESSAGE{
    token?:string,
    data?:object
}
