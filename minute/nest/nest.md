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
创建module
```sh
nest g mo -p users users
```
创建controller
```sh
 nest g co -p users users
```