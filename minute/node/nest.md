# nest下文件含义
```sh
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── lib 公共库文件 用来放mongose 数据库设计
```

# 构建方法
新建一个公共库文件，用来放mongose数据库的设计model
```sh
nest g lib db @libs
```
 安装nest 数据库依赖
 ```sh
npm i nestjs-typegoose @typegoose/typegoose mongoose @types/mongoose nestjs-mongoose-crud @nestjs/swagger swagger-ui-express
 ```
 创建user表的modules
 <div>在libs/src 目录下新建 models 文件夹,然后在models文件夹下新建 user.model.ts 的ts文件</div>

# nest 命令
 
创建module 后面的是文件夹名 
```sh
nest g mo -p users modules/users
```
创建controller
```sh
nest g co -p users modules/users
```
创建 serveice
```sh
nest g s -p src modules/users
```
创建异常过滤器
```sh
nest g filter common/filter/http-exception
```
创建拦截器
```sh
nest g interceptor interceptor/transform
```
创建中间件
```sh
nest g middleware common/middleware/logger
```
创建管道 用于校验
```sh
nest g pipe common/pipes/validation
```
创建守卫
```sh
nest g guard common/guards/auth
```
创建装饰器
```sh
nest g d common/decorators/roles
```
# 依赖库
使用swagger UI 接口文档
```sh
yarn add @nestjs/swagger swagger-ui-express
```
邮箱依赖库   依赖于node mail
```sh
yarn add @nestjs-modules/mailer nodemailer
yarn add -D @types/nodemailer
https://www.npmjs.com/package/@nestjs-modules/mailer
```
config 读取文件 依赖
```sh
yarn add nestjs-config
```
服务监控  内存信息等
```sh
yarn add nest-status-monitor
```
校验  权限校验  本地校验
```sh
yarn add @nestjs/passport passport passport-local
yarn add -D @types/passport-local
```
令牌到身份校验
```sh
yarn add 
```
数据库连接
```sh
yarn add typeorm mysql2
yarn add @nestjs/typeorm
```
定时任务
```sh
yarn add @nestjs/schedule
```
任务队列
```sh
yarn add @nestjs/bull bull
yarn add @types/bull -D
```
单文件 小文件 上传和下载  基于流下载
```sh 
yarn add compressing
```
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags,ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller()
@ApiTags('默认') // 接口的大类
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({summary:'首页'}) // 当前接口的说明
  @ApiResponse({ status: 200 , description:'成功'， }) // 描述返回值等 等信息
  @ApiQuery({name:'name' , required:false }) // 参数携带
  getHello(): string {
    return this.appService.getHello();
  }
}


```
## Controller 
控制器负责处理传入的请求并将响应返回给客户端。

```sh
nest g co cats modules
```

```ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats') // 路由前缀
// @Controller({ host: 'admin.example.com' }) // 装饰器@Controller可以host选择要求传入请求的 HTTP 主机匹配某个特定值。
export class CatsController {
  @Get('ab*cd') // get 请求  * 表示通配符  'ab*cd'路由路径将匹配、abcd、ab_cd等abecd。
  @HttpCode(204) // 状态吗  默认始终返回200 
  @Header('Cache-Control', 'none') // 设置响应头
  @Redirect('https://nestjs.com', 301) // 进行路由
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
// 用来定义数据类型的
export class CreateCatDto{
  readonly name: string;
  readonly age: string;
  readonly breed: string;
}

import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id') // 动态请求参数  /cats/1
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id') // post 的请求需要 @Body()  接受参数
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

## service 
负责数据储存和检索 
```sh
nest g s cats modules
```
```ts
/**** service start ****/
export interface Cat {
  name: string;
  age: number;
  breed: string;
}

import { Injectable } from "@nestjs/common"
import { Cat } from "./interfaces/cat.interface"
// 依赖注入
@Injectable()
export class CatsService{
  private readonly cats: Cat[] = [];

  create(cat: Cat){
    this.cats.push(cat)
  }

  findAll(): Cat[]{
    return this.cats;
  }
}

/**** service end ****/

/**** controller start ****/
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from "./catsService"

@Controller('cats');
export class CatsController {
  constructor(private catsService: CatsService){}

  @Post()
  async create(@Body() createCatDto: CreateCatDto){
    this.catsService.create(createCatDto)
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }
}
// 可选的privider
import { Injectable, Optional, Inject } from "@nestjs/common";

//  可选的privider 需要在constructor中使用@Optional()
@Injectable()
export class HttpService<T> {
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient:T
  ){}
}


// 基于属性的注入
@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```

## module

```sh
nest g mo cats modules
```
@module 属性 
```sh
providers   由Nest注入器实例化的提供者，并且可以至少在整个模块中共享
controllers 必须创建的一组控制器
imports     导入模块的列表， 这些模块道出了此模块所需的  提供者 -- 也就是方法
exports     由本模块提供并应用在其他模块中 可用的提供者的 子集
```

```ts
// DynamicModule 动态模块
import { Module, Global, DynamicModule } from "@nestjs/common"
import { CatsController } from "./cats.controller"
import { CatsService } from "./cats.service"

@Global() // 将该模块设置为全局模块 其他无需在进行导入 可以直接使用
@module({
  imports: [CommonModule], // 模块的内部提供者 也是可以 再次导出
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService,CommonModule], // 每个导入CatsModule的模块都可以访问 CatsService  并且他们讲共享相同的CatsService实例
})

export class CatsModule{}
```

动态模块 通过forRoot 可以同步或异步返回动态模块

```ts
import { Module, DynamicModule } from "@nestjs/common";
import { createDatebaseProviders } from "./database.providers"
import { Connection } from "./connection.provider"

@Module({
  providers: [Connection]
})
// 动态导入的方法
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatebaseProviders(options, entities);
    return {
      global:true, // 设置为全局的动态模块
      module: DatabaseModule,
      providers: providers,
      exports: providers
    }
  }
}



import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule], // 导出的时候是可以省略 forRoot的
})
export class AppModule {}

```

## middleware
这个中间件等价于 [express](http://expressjs.com/en/guide/using-middleware.html) 中间件
```sh
nest g middleware common/middleware/logger
```
<div>中间件不能通过@module 装饰器列出， 只能通过模块类configure()方法来设置</div>
中间件是在路由处理程序之前调用的函数  中间件可以访问请求和响应对象 以及应用程序请求响应生命周期中的next()中间件函数。
1. 执行任何代码
2. 对请求和响应对象进行更改
3. 结束请求-响应周期
4. 调用堆栈中的下一个中间件函数
5. 如果当前的中间件函数没有结束请求-响应周期。它必须调用next()将控制传递给下一个中间件函数。否者请求将被挂起

```ts
// 类中间件
import { Injectable, NestMiddleware } from "@/nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // 支持依赖注入 通过constructor注入
  constructor(){}
  use(req: Request, res: Response, nest: NextFunction){
    console.log('Request...')
    next();
  }
}

// 函数中间件 当中间件没有依赖关系 可以考虑使用函数中间件
export function logger(req, res, next){
  console.log('Request...')
  next()
}

// 中间件注册
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from "@nestjs/common"
import { LoggerMiddleware } from "./common/middleware/logger.middleware"
import { CatsModule } from "./cats/cats.module"
import { CatsController } from "./cats/cats.controller"
@module({
  import: [CatsModule]
})
// forRoutes 可以接受 一个字符 多个字符串 对象 一个控制类甚至多个控制器类 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoggerMiddleware ) // 单个中间件使用 也可以使用多个中间件 逗号隔开
      // .apply(LoggerMiddleware, cors(), ) // 多个中间件
       .exclude(
        { path:'cats', method: RequestMethod.GET }
        { path:'cats', method: RequestMethod.POST },
        'cats/(.*)'
      ) // 排除特定路由使用中间件
      .forRoutes('cats') // 字符串方式  用来限制特定的 路由 使用中间件
      // .forRoutes({ path: 'cats', method: RequestMethod.GET}) // 对象方式
      // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL}) 通配符
      // .forRoutes(CatsController) // 控制器方式
     
  }
}

// 全局中间件
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);


```
## filter
异常处理 负责整个应用的所有异常抛出
<div> </div>

```ts
import { HttpException } from "@nestjs/common"
// HttpException  有两个必填参数 
// 1. response    定义json 响应体 
// 2. status      定义 http 状态
// 默认情况下JSON响应主体包含两个属性  
// 1. statusCode  默认为status参数重提供的http状态吗
// 2. message 基于状态的http 错误的简短描述 

@Get()
async findAll(){
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
}
// { 'statusCode': 403, 'message': 'Forbidden' }

@Get()
async findAll(){
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message'
  }, HttpStatus.FORBIDDEN)  // 第二个参数为有效的状态码
}
//  { 'status': 403, 'error': 'Forbidden' }

// 自定义异常  forbidden.exception.ts
export class ForbiddenException extends HttpException {
  constructor(){
    super('Forbidden', HttpStatus.FORBIDDEN)
  }
}
// 使用
@Get()
async findAll(){
  throw new ForbiddenException()
}

// 异常过滤器 ExceptionFilter
// http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
// 绑定过滤器
@Post()
@UseFilters(new HttpExceptionFilter()) // 多个可以逗号隔开
// @UseFilters(HttpExceptionFilter) // 直接传递类 通过框架实例化 开启依赖注入 也能调用   应该尽可能使用类
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
// 全局过滤器
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // useGlobalFilters 该方法不会为 网关和 混合应用程序设置过滤器  可以注册一个全局范围过滤器
  app.useGlobalFilters(new HttpExceptionFilter()); 
  await app.listen(3000);
}
bootstrap();
// 注册全局范围过滤器  app.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

```
## pipe
 管道有两种效果
 1. 转换 对输入的数据转换为所需的数据输出  比如拿到的是string 需要转换为 number
 2. 验证 如果验证成功则继续传递 否则 验证失败抛出异常

```ts
// validate.pipe.ts
// 每个管道必须提供一个 transform 方法 这个方法有两个参数 value metadata
// 1. value 是当前处理的参数
// 2. metadata 是其元数据 元数据包含  type, metatype, data


import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

// 绑定管道
@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

// 使用管道进行类型转换
@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
  return await this.catsService.findOne(id);
}


// 全局注册
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();


```
## guard
守卫  用来进行角色权限控制 token校验 等 

```ts
// roles.decorator.ts 
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);


// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  // 每个 守卫 都必须有一个 canActivate 函数  返回 true 或 false 判断是否 允许请求
  // canActivate 接收一个参数  这个参数继承 ArgumentsHost
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
// 通过UseGuards绑定守卫
@Controller('cats')
@UseGuards(RolesGuard)
@SetMetadata('roles', ['admin']) // 设置能访问的角色
export class CatsController {}

// 全局守卫设置
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());


```

## interceptor
拦截器 在执行之前或之前之后执行的逻辑

## class-validator 
类型校验 和转换


## typeOrm
find 查询