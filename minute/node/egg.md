## eggjs 个人目录结构

```sh
.
├── app.js # 实例
├── app 
│   ├── router.js  # 配置 URL 路由规则
│   ├── router     # 放置所有路由相关文件
│   ├── controller # 解析用户的输入，处理后返回相应的结果
│   ├── service    # 编写业务逻辑层 
│   ├── middleware # 中间件
│   ├── public     # 放置静态资源
│   ├── extend     # 框架的扩展 
│   │   ├── helper.js       # 用于编写核心公共方法扩展
│   │   ├── request.js      # 为请求对象扩展方法 ctx.request
│   │   ├── response.js     # 为响应扩展方法
│   │   ├── context.js      # 为ctx扩展方法 也就是上下文对象 middleware 中 this 就是 ctx
│   │   ├── application.js  # 为app扩展方法 也就是 this
│   │   └── agent.js        # 多线程 ......
│   ├── schedule   # 定时任务  
│   ├── view       # 放置模板文件  
│   └── model      # 数据库模型 --  表结构
├── config                # 配置相关
│   ├── config.default.js   # 默认配置
│   ├── config.local.js   # 开发配置
│   ├── config.prod.js   # 生成配置
│   ├── config.test.js   # 单元测试配置
│   ├── config.unittest.js   # 单元测试配置
│   └── plugin.js         # 配置需要加载的插件
├── logs    # 日志
├── test    # 单元测试
└── lib     # 自定义插件
```

## config 配置
1. 日志目录配置
```sh
config.logger = {
  dir: '/home/admin/logs/demoapp',
}
config.keys = '123456' 
```

## router 路由
Router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系
1. 定义路由
```js
// app/router.js
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/user/:id', controller.user.info);
};
// app/controller/user.js
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    ctx.body = {
      name: `hello ${ctx.params.id}`,
    };
  }
}
// 当用户执行 GET /user/123，user.js 这个里面的 info 方法就会执行。
```
<h4>router.resources 可以快速生成 CRUD 路由结构</h4>

```js

router.resources('posts', '/api/posts', controller.posts);

HTTP方法         请求路径             路由名称      控制器函数
GET	            /posts	            posts	    app.controller.posts.index
GET	            /posts/new	        new_post	app.controller.posts.new
GET	            /posts/:id	        post	    app.controller.posts.show
GET	            /posts/:id/edit	    edit_post	app.controller.posts.edit
POST	        /posts	            posts	    app.controller.posts.create
PATCH	        /posts/:id	        post	    app.controller.posts.update
DELETE	        /posts/:id	        post	    app.controller.posts.destroy
```