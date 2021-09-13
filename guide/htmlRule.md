# HTML 规范 
## Vue Template 同样适用
### 1.HTML类型

推荐使用 HTML5 的文档类型申明： 

（建议使用 text/html 格式的 HTML。避免使用 XHTML。XHTML 以及它的属性，比如 application/xhtml+xml 在浏览器中的应用支持与优化空间都十分有限）。

1. 规定字符编码
2. IE 兼容模式
3. 规定字符编码
4. doctype 大写

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="UTF-8" />
    <title>Page title</title>
  </head>
  <body>
    <img src="images/company-logo.png" alt="Company" />
  </body>
</html>

```

### 2.缩进
缩进使用 2 个空格（一个 tab）

嵌套的节点应该缩进。

### 3.分块注释
在代码很长或特殊功能的组件 需要加上一对 HTML 注释。

当个引入内容很少的组件 调用需打上单行注释
```vue
<template>
    <div>
        <!-- 头部 begin -->
        <Header />
        <!-- 头部 end -->

        <!-- 内容 begin -->
        <Content>
            ......省略若干内容
        </Content>
        <!-- 内容 end -->
         
        <!-- 尾部 begin -->
        <Footer />
        <!-- 尾部 end -->

        <!-- 表格组件 -->
        <Table />

     </div>
</template>
```

### 4.语义化标签
HTML5 中新增很多语义化标签，所以优先使用语义化标签，避免一个页面都是 div 或者 p 标签

**正例**
```vue
<header>头部</header>
<footer>尾部</footer>
```

**反例**
```vue
<div>
    <p></p>
</div>
```
### 5.引号
使用双引号(" ") 或使用模板字符(``) 而不是单引号(’ ') 。
```js
正例： `` /  ""
反例： ''
```