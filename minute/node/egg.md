## Nunjucks 模板引擎
```js
let nunjucks = require('nunjucks')
let path = require('path')
let express = require('express')
let app = express()
// view 设置的根目录
// 通过express:app 实现 nunjucks 和 express 的关联
nunjucks.configure(path.resolve('view'),{ autoescape: true, express:app }); // 自动转译

/**
 * 1. response.render 方法是 express 内部实现的
 * 2. 先读取模板文件，然后把模板文件和数据对象作为参数传递给 nunjucks 模板引擎
 * 3. 然后由nunjucks 模板引擎渲染出来个最终的字符串，再给response发送给客户端
 * */
app.get('/', function(req,res){
    res.render('index.html', {name: 'test'})
})


/******** 对文件进行输入替换 **********/
nunjucks.configure(path.resolve('view'),{ autoescape: true}); // 自动转译
nunjucks.render('index.html',{name: 'test'}) // index.html 是文件
/******** **********/
nunjucks.configure({ autoescape: true }); // 自动转译
let result = nunjucks.renderString(`hello {{name}}`, {name: 'test'})
console.log(result) // hello test
/*** 过滤器 ***/
let result = nunjucks.renderString(`hello {{name | join('-')}}`, {name: ['a','b','c']})
console.log(result) // hello a-b-c
```

