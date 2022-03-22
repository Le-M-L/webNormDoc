# 逻辑操作符  

## 可选链接运算符 (?. )
 可选链 ?. 会先判断 ? 号前面的值是否存在 如果存在则调用 ? 后面的属性或方法
```js
// 静态属性 使用
object?.property
// 动态属性 使用
object?.[expression]
// 对象的链式调用
let data;
console.log(data?.children?.[0]?.title) // undefined

data = {children: [{title:'codercao'}]}
console.log(data?.children?.[0]?.title) // codercao

// 函数的调用
object.runsOnlyIfMethodExists?.()
```

## 空值合并操作符 (?? )
空值合并操作符 当左侧为（null 和 undefind） 时，才返回右边的值
```js
const foo = null ?? 'default string';
console.log(foo) // 'default string'

const baz = 0 ?? 42;
console.log(foo) // 0

let str = '' ?? 'default string';
console.log(str) // ''

```

## 逻辑空分配 (??= )
逻辑空值运算符仅在左侧为（ null 或者 undefined）时才将右侧值分配给左侧
```js
let x = null;
x ??= 'text';
console.log(x) // text
```

## 逻辑或分配（|| =）
此逻辑赋值运算符仅在左侧表达式为 falsy值时才赋值

Falsy值与null有所不同，因为falsy值可以是任何一种值：undefined，null，空字符串(双引号""、单引号’’、反引号``)，NaN，0。IE浏览器中的 document.all，也算是一个。
```js
x ||= y  等同于 x || (x = y)
```

## 逻辑与分配（&& =）
当 左侧 为真时 才进行赋值
```js
x &&= y  等同于 x && (x = y)
```

## js 并发实现 promise All
```js
let fn = function (times, cb){
    let result = [] 设计模式
    return function(data){
        result.push(data)
        if(--times === 0) cb(result)
    }
}
let newFn = fn(3,function(data){
    console.log(data)
})
newFn(11)
newFn(22)
newFn(33)
```
## 执行上下文

var a = 10;
var b = function(){}
会先声明 默认赋值为 undefind

function c(){}; // 函数声明  会赋值
this  // 作用域 会赋值

如果代码段是函数体  那么会在上面的基础上 附加
arguments            赋值
自由变量的取值作用域    赋值

// 函数作用域取值 是去找创建他的作用域取值 而不是 父作用域/
// 函数默认this是window