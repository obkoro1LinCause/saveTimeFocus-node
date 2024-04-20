## 架构文档

### 接口概述
**HTTP 状态码** [`errors`](src/errors)
- `400` 请求的业务被拒绝
- `401` 鉴权失败，无权限/验证异常
- `403` 权限不足/禁止/请求参数需要访客为管理员角色
- `404` 资源不存在
- `500` 服务器挂了/网络错误异常
- `200` 正常


**数据特征码**(src/interfaces/response.interface.ts)
- `status`：
  - `success`：正常
  - `error`：异常
- `message`：永远返回，由 [`responsor.decorator`](/src/decorators/responsor.decorator.ts) 装饰
- `error`：一般会返回错误发生节点的 error；在 `status` 为 `error` 的时候必须返回，方便调试
- `debug`：开发模式下为发生错误的堆栈，生产模式不返回
- `result`：在 `status` 为 `success` 的时候必须返回
- `params`：在`status` 为 `success` 的时候返回，接口信息


### 应用结构

**入口**
- `main.ts`：引入配置，启动主程序，引入各种全局服务
- `app.module.ts`：主程序根模块，负责各业务模块的聚合
- `app.controller.ts`：主程序根控制器
- `app.config.ts`：主程序配置，数据库、程序、第三方，一切可配置项
- `app.environment.ts`：全局环境变量

**请求处理流程**

`request`: 收到请求
`middleware`:中间件过滤（跨域、来源检测）
`guards`: 守卫过滤(鉴权)
`interceptor:before`:本应用暂无
`pipe`: 管道：参数格式化/校验器，参数字段权限/校验，参数挂载到`request`上下文
`controller`:  业务控制器
`service`：业务服务
`interceptor:after`: 数据流拦截器、格式化数据
`filter`:捕获以上所有流程中出现的异常，如果任何一个环节抛出异常，则返回错误

### 模块

**中间件** [`middlewares`](/src/middlewares)
- [`CORS` 中间件](/src/middlewares/cors.middleware.ts)，用于处理跨域访问
- [`Origin` 中间件](/src/middlewares/origin.middleware.ts)，用于拦截各路不明请求


**守卫** [`guards`](/src/guards)
- 默认所有请求会使用 [`JwtAuthGuard`](/src/guards/jwt.auth.guard.ts) 守卫鉴权(token是否过期、token是否有效、续签)
- 登录请求都会使用 [`LocalAuthGuard`](/src/guards/local.auth.guard.ts) (生成token,用户名/密码)

**本地守卫流程**
1.`guard`：[守卫](/src/guards) 分析请求
2.`guard.canActivate`：继承处理
3.`LocalStrategy.validate`：调用 [鉴权服务](/src/modules/auth/local.strategy.ts)
4.`guard.handleRequest`：[根据鉴权服务返回的结果作判断处理，通行或拦截](/src/guards/local.auth.guard.ts)

**鉴权处理流程**
1.`guard`：[守卫](/src/guards) 分析请求
2.`guard.canActivate`：继承处理(token不对直接拦截)
3.`JwtStrategy.validate`：调用 [鉴权服务](/src/modules/auth/jwt.strategy.ts)
4.`guard.handleRequest`：[根据鉴权服务返回的结果作判断处理，通行或拦截](/src/guards/jwt.auth.guard.ts)

**鉴权级别**
1. 所以接口的CRUD都需要鉴权，都需要判断是否有token


**管道**
**参数检验逻辑**




**拦截器**
- [数据流转换拦截器](/src/interceptors/transform.interceptor.ts)：当控制器所需的 Promise service 成功响应时，将在此被转换为标准的数据结构
- [数据流异常拦截器](/src/interceptors/error.interceptor.ts)：当控制器所需的 Promise service 发生错误时，错误将在此被捕获
- [日志拦截器](/src/interceptors/logging.interceptor.ts)：补充默认的全局日志

**装饰器扩展** [`decorators`](/src/decorators)
- [响应装饰器](/src/decorators/responser.decorator)：用于输出规范化的信息，如 `message` 和 翻页参数数据
- [请求参数装饰器](/src/decorators/queryparams.decorator.ts)：用户自动校验和格式化请求参数，包括 `query/params/ip` 等辅助信息


**错误过滤器** [`error.filter.ts`](/src/filters/error.filter.ts)


**业务模块**

- `AuthModule`全局鉴权、Token
- `UserModule`
- `SocketModule`


**核心（全局）模块**
- `CacheModule`
- `DatabaseModule`





## todo
- get接口缓存（redis）
- 有些接口开白名单 有些接口是黑明单（针对鉴权）