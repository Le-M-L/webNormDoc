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
# Controller 控制器负责处理传入的请求并将响应返回给客户端。

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