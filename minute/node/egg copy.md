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

## sequelize
ORM 数据库 操作管理
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

### create 和 build 新增数据

```js
// 通过 build() 办法须要通过调用 save() 进行保留
let user = User.build({
  name: "test",
  password: "123456",
});
let rs = await user.save();
// 通过 create() 进行创立
let rs = await User.create({
  name: "test",
  password: "123456",
});
```

### update 修改数据

```js
// 留神：更新失败返回值到第0个值是0，更新胜利则是1
// 第一个参数为更新值
// 第二个参数为更新查问条件
let rs = await User.update(
  { name: "test2" },
  {
    where: { id: 1 },
  }
);
```
### destroy 删除数据

```js
let rs = await User.destroy({
  where: { id: 1 },
});
```

### findAll 和 findOne 查询数据

```js
let Op = Sequelize.Op;

// 查问所有
let rs = await User.findAll({
  limit: 10, // 当页条数
  offset: 0, // 开始下标
  order: [["create_time", "desc"]], // 排序规定
  where: {
    // 查问条件
    type: "vip", // 指定值
    [Op.or]: {
      // 应用非凡操作符
      id: [1, 2, 3, 4, 5], // id 蕴含这些数据
      [Op.like]: { name: "super_" }, // 用户名蕴含 super_
    },
  },
  attributes: [
    // 指定返回的属性
    "id",
    ["name", "userName"], // 第一个参数为属性，第二个参数为别名，返回数据以别名返回
  ],
});
// 查问一条数据
let rs = await User.findOne({
  where: { id: "123456" },
});
```

## findByPk 通过主键查询

```js
// findByPk - 通过主键查问
let res = await User.findByPk(123);

// findOne - 查问满足条件的第一条数据
let res = await User.findOne({
  where: {
    type: "user",
  },
});

// findOrCreate - 查问，如果不存在将创立数据
const [user, created] = await User.findOrCreate({
  where: { username: "test" },
  // 如果不存在，将会按 defaults 创立值
  defaults: {
    job: "JavaScript",
  },
});
console.log(user.username); // 'test'
console.log(user.job); // 这里可能为 JavaScript 也可能为其余的
console.log(created); // 是否有创立实例
if (created) {
  console.log(user.job); // 创立实例，该值必然为 JavaScript
}

// findAndCountAll - 查问并返回总数
// count - 该查问条件下的总条数
// rows - 查问的所有数据
const { count, rows } = await User.findAndCountAll({
  where: {
    type: "vip",
  },
});
```

### bulkCreate 批量新增

```js
let re = await User.bulkCreate({ name: "test_1" }, { name: "test_2" });
```