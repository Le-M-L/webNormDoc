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

```js
module.exports = (appInfo) => {
    const config = (exports = {});
    // 配置日志
    config.logger = {
        dir: '/home/admin/logs/demoapp',
    };
    config.keys = '123456';

    // 是否启用csrf 安全
    config.security = {
        csrf: {
            enable: false, // 这个是配置跨域的，取消csrf
        },
        domainWhiteList: [],
    };

    // 配置跨域信息
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true,
    };

    // 配置错误处理
    config.onerror = {
        appErrorFilter: (err) => {
            if (err.status && Math.floor(err.status / 100) === 4) {
                return false;
            }
            return true;
        },
    };
    // 中间件注册
    config.middleware = ['gzip'];
    // 全局配置jwt  token 加密
    config.jwt = {
        secret: '123456', // 自定义 token 的加密条件字符串
        getToken(ctx) { // 自定义获取 token 方法
            const parts = ctx.get('authorization').split(' '); // 获取token 也就是请求头里的 token
            if (parts.length === 2) {
                const scheme = parts[0];
                const credentials = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    return credentials;
                }
            }
            // 路径 token
            return ctx.request.query.session_token;
        },
    };
    // 数据库的使用
    exports.sequelize = {
        enable: true,
        package: 'egg-sequelize',
    };
};
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
// http://127.0.0.1:7001/api/home/1/2
// 获取参数的方式
// ctx.params.id 1
// ctx.params.name 2
router.get('/home/:id/:name', controller.home)
router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/,controller.home) // 可以通过正则获取想要的数据
// ctx.request.body  用于表单的请求数据获取
routet.post('/home', )
// 路由重定向
app.router.redirect('/', '/home/index', 302);
// 外部路由重定向
app.router.get('/search', app.controller.search.index);
// search
 ctx.redirect(`http://cn.bing.com/search?q=${q}`);


// 快速生成CRUD
router.resources('posts', '/api/posts', controller.posts);

HTTP方法         请求路径             路由名称      控制器函数
GET	            /posts	            posts	    app.controller.posts.index
GET	            /posts/new	        new_post	app.controller.posts.new
GET	            /posts/:id	        post	    app.controller.posts.show
GET	            /posts/:id/edit	    edit_post	app.controller.posts.edit
POST	          /posts	            posts	    app.controller.posts.create
PATCH	          /posts/:id	        post	    app.controller.posts.update
DELETE	        /posts/:id	        post	    app.controller.posts.destroy
```

## middleware 中间件
