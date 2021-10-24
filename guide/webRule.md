# 钉铛科技前端开发规范
## 1.组件命名 和 目录文件命名
所有组件全部采用驼峰命名 并且首字母大写
代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。 
```js
正例：MallManagementSystem
反例：mall_management-system / mall-anagement-ystem
```

## 2.分块注释  和 组件使用
在代码很长或特殊功能的组件 需要加注释
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
        <!-- 组件必须驼峰写法 -->
        <MyComponent />
        <Row><table :column="data"/></Row>
     </div>
</template>
```

## 3.Css 规范
### 1. 类名使用小写字母，以中划线分隔
### 2. id 采用驼峰式命名
### 3. less,scss 中的变量、函数、混合、placeholder 采用驼峰式命名
### 4. ID 和 class 的名称总是使用可以反应元素目的和用途的名称，或其他通用的名称，代替表象和晦涩难懂的名称
### 5. CSS选择器链的使用 尽量直接子选择器 不要使用后代选择器

有时，这可能会导致设计问题并且有时候可能会很耗性能。然而，在任何情况下，这是一个非常不好的做法。如果你不写很通用的，需要匹配到 DOM 末端的选择器， 你应该总是考虑直接子选择器

**不推荐**
```css
.content .title {
  font-size: 2rem;
}
```

**推荐**
```css
.content > .title {
  font-size: 2rem;
}
```
### 6. 尽量使用缩写属性

**不推荐**
```css
.content{
    border-top-style: none;
    font-family: palatino, georgia, serif;
    font-size: 100%;
    line-height: 1.6;
    padding-bottom: 2em;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0;
}
```

**推荐**
```css
.content{
    border-top: 0;
    font: 100%/1.6 palatino, georgia, serif;
    padding: 0 1em 2em;
}
```

### 7. 避免使用ID选择器及全局标签选择器防止污染全局样式

**不推荐**
```css
#header{
  padding-bottom: 0px;
  margin: 0em;
}
```

**推荐**
```css
.header{
  padding-bottom: 0px;
  margin: 0em;
}
```
 
## 4.Javascript 规范
1. 采用小写驼峰命名 lowerCamelCase，代码中的命名均不能以下划线，也不能以下划线或美元符号结束
2. 方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格，必须遵从驼峰形式。
3. 其中 method 方法命名尽量是 动词 或者 动词+名词 形式
```js
正例：saveShopCarData /openShopCarInfoDialog
反例：save / open / show / go
```
4. 必须优先使用 ES6,7 中新增的语法糖和函数。这将简化你的程序，并让你的代码更加灵活和可复用。
::: warning
必须强制使用 ES6, ES7 的新语法，比如箭头函数、await/async ， 解构， let ， for…of 等等
:::
5. 括号
下列关键字后必须有大括号（即使代码块的内容只有一行）：if, else, for, while, do, switch, try, catch, finally, with。
```js
// 正例
if (condition) {
  doSomething();
}
// 反例
if (condition) doSomething();
```
6. this 的转换命名

对上下文 this 的引用只能使用’self’来命名

## 5.vue 规范
### 1. data 必须是一个函数

当在组件中使用 data 属性的时候 (除了 new Vue 外的任何地方)，它的值必须是返回一个对象的函数。 因为如果直接是一个对象的话，子组件之间的属性值会互相影响

**正例**
```js 
export default {
  data () {
    return {
      name: 'jack'
    }
  }
}
```
**反例**
```js
export default {
  data: {
    name: 'jack'
  }
}
```

### 2. Prop 定义应该尽量详细
1. 必须使用 camelCase 驼峰命名
2. 必须指定类型
3. 必须加上 required 或者 default，两者二选其一
4. 如果有业务需要，必须加上 validator 验证

### 3. 为组件样式设置作用域

**正例**
```vue
<!-- 使用 `scoped` 特性 -->
<style scoped>
  .btn-close {
    background-color: red;
  }
</style>
```
**反例**
```vue
<!-- 没有使用 `scoped` 特性 -->
<style>
  .btn-close {
    background-color: red;
  }
</style>
```
### 4. 必须为 v-for 设置键值 key
### 5. 项目中所有命名一定要与后端命名统一
### 6.注释说明
1.整理必须加注释的地方

1. 公共组件使用说明
2. api 目录的接口 js 文件必须加注释
3. store 中的 state, mutation, action 等必须加注释
4. vue 文件中的 template 必须加注释，若文件较大添加 start end 注释
5. vue 文件的 methods，每个 method 必须添加注释
6. vue 文件的 data, 非常见单词要加注释

### 7. 其他
1. 尽量不要手动操作 DOM
2. 因使用了 git/svn 等代码版本工具，对于无用代码必须及时删除，例如：一些调试的 console 语句、无用的弃用功能代码。
3. 删除无用的变量