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
`pipe`: 管道（暂无）补充：参数格式化/校验器，参数字段权限/校验，参数挂载到`request`上下文
`controller`:  业务控制器
`service`：业务服务
`interceptor:after`:数据流拦截器（格式化数据、错误）
`filter`:捕获以上所有流程中出现的异常，如果任何一个环节抛出异常，则返回错误

**本地守卫流程**
1.`guard`：[守卫](/src/guards) 分析请求
2.`guard.canActivate`：继承处理
3.`LocalStrategy.validate`：调用 [鉴权服务](/src/modules/auth/local.strategy.ts)
  - 用户名
  - 密码
4.`guard.handleRequest`：[根据鉴权服务返回的结果作判断处理，通行或拦截](/src/guards/local.auth.guard.ts)

**鉴权处理流程**
1.`guard`：[守卫](/src/guards) 分析请求
2.`guard.canActivate`：继承处理(token不对直接拦截)
3.`JwtStrategy.validate`：调用 [鉴权服务](/src/modules/auth/jwt.strategy.ts)
  - token是否过期
  - token是否有效
  - 续签
4.`guard.handleRequest`：[根据鉴权服务返回的结果作判断处理，通行或拦截](/src/guards/jwt.auth.guard.ts)

**鉴权级别**

**参数检验逻辑**

**错误过滤器**

**拦截器**

**装饰器扩展**

**守卫**

**中间件**

**管道**

**业务模块**

**核心（全局）模块**

- `AuthModule`
- `CacheModule`