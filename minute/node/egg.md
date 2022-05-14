## nunjucks 和 ejs 模版引擎

## Charles Fiddler 代理工具


## 目录结构
// 中间件 是在请求到来的时候 真正的处理之前执行 权限访问
// 插件 是扩展egg.js的功能

├── app         # 源代码
│   ├── router  # 路由配置文件
├── config      # 配置文件

## Controller 控制器
1. 接受参数
2. 校验参数是否合法
3. 向下调用服务处理业务
4. 响应客户端数据


## Service 服务
1. 处理业务逻辑
2. 进行业务计算
3. 调用模型层(数据层)进行处理

## model 模型层
1. 连接数据库
2. 对数据库进行操作 增删改查操

## config 配置

```js
// config.default.js
// cookie session 加密cookie 服务器把cookie 发送给客户端之后，为了防止客户端串改数据 就需要设置一个密码
exports.keys = '1111' 

exports.view = {
    // 默认的扩展名 当你渲染一个文件 但是没有扩展名时 默认使用.html 后缀来使用
    defaultExtension:'.html',
    // 如果某个扩展名的 模版文件没有在mapping里设置 则默认使用 nunjucks
    defaultViewEngine: 'nunjucks',
    // 如果要渲染.html 结尾的话 就会用nunjucks 模版引擎来进行渲染
    mapping:{
        '.html': 'nunjucks'
    }
}
```
<div>
plugin.js
插件
</div>

## 访问权限

Controller
Service

## 使用node 集群来提高性能 根据 核数 启动多个进程

## mysql
1. query 用来执行SQL 语句的意思 增删改查都可以
app.mysql.query()

## sequelize 建表
// --env=test 切换数据库
npx sequelize dn:migrate --env=test 执行命令

 // 插入数据
npx sequelize seed:create --name init-users
插入数据

执行所有命令 
npx sequelize db:seed:all

2. define 定义

OEM 工具去管理数据库 增删改查
指定不同类型的文件存放的位置
config 值的数据库连接
migrations 放建表语句
seeders 放种子数据存放位置
models 放定义模型的目录

修改数据库配置
