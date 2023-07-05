- nest 框架相关
nest g resource [xxx]
  - module 模块 (https://juejin.cn/post/7171621691271938062#heading-2)
    - x.controller.ts 
        - 控制器 === 路由：控制器负责处理传入请求并向客户端返回响应
        - nest g controller [xxx] 生成某个模块的控制器
    - x.module.ts
        - 模块:controllers 和 providers  一一对应关系
        - imports
        - exports
        - providers
    - x.service.ts
        -  创建服务类 === 和数据库打交道
        -  nest g service [xxx] 生成某个模块的服务类
  - 中间件 (https://juejin.cn/post/7171970153452666910#heading-5)
    - 需要使用@Injectable()装饰器，类需要实现NestMiddleware接口(里面实现use方法)
  - 过滤器
    - Nest带有一个内置的异常层，负责处理应用程序中所有未处理的异常。
      当应用程序代码未处理异常时，该层会捕获异常，然后自动发送适当的用户友好响应。
      @Catch()的参数列表为空时修饰的filter就是一个能捕获所有异常的filter
  - 守卫（(https://juejin.cn/post/7172716397259128868#heading-9)）
    - Guards的执行顺序在所有的中间件之后，但是在任何的interceptor和pipe之前
  - 拦截器 
    - 面向切面编程，实现某个方法特定的功能
  - 管道
  - 装饰器
  - ArgumentsHost
  - ExecutionContext
  - Reflection & SetMetadata
    - Nest提供了通过@SetMetadata(key, value)装饰器为route handler添加自定义元数据的方法
    - 通过Reflection获取
  