# js 
### new 操作符的执行过程
1. 首先创建一个新的空对象
2. 设置原型，将对象的原型实则为函数的prototype对象
3. 让函数的this指向这个对象,执行构造函数的代码（为这个新对象添加属性）
4. 判断函数的返回值类型,如果是值类型,返回创建的对象.如果是引用类型,就返回这个引用类型的对象
```js
function objectFactory(){
    let newObject = null;
    let constructor = Array.prototype.shift.call(arguments);
    let result = null;
    // 判断参数是否是一个函数
    if(typeof constructor !== 'function'){
        console.error('type error');
        return 
    }
    // 新建一个空对象, 对象的原型为构造函数的prototype对象
    newObject = Object.create(constructor.prototype);
    // 将this 指向新建对象, 并执行
    result = constructor.apply(newObject, arguments);
    // 判断返回对象
    let flag = result && (typeof result === 'object' || typeof result === 'function');
    // 判断返回结果
    return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数,初始化参数)

```
### call 函数的实现
1. 判断调用对象是否为函数，即使是定义在函数的原型上的 但是可以出现使用call等调用的情况.
2. 判断传入上下文对象是否存在 如果不存在 则设置为window
3. 处理传入的参数 截取第一个参数后的所有参数
4. 将函数作为上下文对象的一个属性
5. 使用上下文对象来调用这个方法 并保存返回结果
6. 删除刚才新增的属性
7. 返回结果
```js
Function.prototype.myCall = function(context) {
    // 判断调用对象
    if(typeof this !== 'function'){
        console.error('type error')
    }
    // 获取参数
    let args = [...arguments].slice(1),
        result = null;
    // 判断context是否传入，如果未传入则设置为window
    context = context||window;
    // 将调用函数设置为对象的方法
    context.fn = this;
    // 调用函数
    result = context.fn(...args);
    // 将属性删除
    delete context.fn
    return result
}
```
### apply 函数的实现
1. 判断调用对象是否为函数,即使是定义在函数的原型上的，但是也可能出现使用call等方式调用的情况
2. 判断传入上下文对象是否存在,如果不存在，则设置为window
3. 将函数作为上下文对象的一个属性
4. 判断参数是否传入
5. 使用上下文对象来调用这个方法 并保存返回结果
6. 删除刚才新增的属性
7. 返回结果
```js
Function.prototype.myApply = function(context){
    // 判断调用对象是否为函数
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }
    let result = null;
    // 判断context 是否存在 如果未传入则为window
    context = context || window;
    // 将函数设置为该对象的方法
    context = context.fn = this;
    // 调用方法
    if(arguments[1]){
        result = context.fn(...arguments[1]);
    }else{
        result = context.fn()
    }
    delete context.fn;
    return result
}
```
### bind 函数的实现
1. 判断调用对象是否为函数，即使是定义在函数的原型上的，但是也可能出现使用call等方式调用的情况
2. 保存当前函数的调用，获取其余传入参数值
3. 创建一个函数返回
4. 函数内部使用apply 
```js
Function.prototype.myBind = function(context){
    // 判断调用对象是否为函数
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }
    // 获取参数
    var args = [...arguments].slice(1);
    var fn = this;
    return function Fn(){
        // 根据调用方式 传入不同绑定值
        return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments))
    }
}
```
### 异步编程的实现方式
1. 回调函数 但是有缺点 回调函数嵌套的时候会造成回调函数地狱 上下两层的回调函数区间耦合度太高了 不利于代码的维护
2. promise 的方式 使用promose的方式可以将嵌套的回调函数作为链式调用 但是使用这种方式 有时会造成多个then的链式调用可能会造成代码的语义不够明确
3. generator 的方式它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。
4. async 函数的方式,async函数是generator和promise实现的一个自动执行的语法糖 她内部自带执行器 当函数内部执行到一个await语句的时候 如果语句返回一个promise对象 那么函数将会等待promise 对象的状态变为resolve后在继续向下执行 因此可以将异步逻辑 转为为同步的顺序来书写 并且这个函数可以自动执行
### Map 和 Object 的区别
```sh
意外的键
Map默认情况下不暴红任意键,只包含显示插入的键
Object有一个原型,原型链上的键名有可能和自己在对象上的设置的键名产生冲突
键的类型
Map的键可以是任意值,包含函数,对象或者任意基本类型
Object的键必须是String或是Symbol.
键的顺序
Map中的key是有序的。因此当迭代的时候,Map对象以插入的顺序返回键值
Ojbect的键是无序的
Size
Map的键值对个数可以轻易的通过size属性获取
Object的键值对个数只能手动计算
迭代
Map是iterable的,所以可以直接被迭代.
Object需要以某种方式获取它的键然后才能迭代
性能
Map在频繁增删键值对的场景下表现好
Object在频繁添加删除键值对的场景下未作出优化
```
### 实现一个ajax请求
```js
const SERVER_URL = '/server';
let xhr = new XMLHttpRequest();
// 创建 http 请求
xhr.open('GET', url, true);
// 设置状态监听函数
xhr.onreadystatechange = function(){
    if(this.readyState !== 4) return;
    // 当请求成功时
    if(this.status === 200){
        handle(this.response);
    }else{
        console.error(this.statusText)
    }
}
// 设置请求失败时的监听函数
xhr.onerror = function(){
    console.error(this.statysText)
}
// 设置请求头信息
xhr.responseType = 'json';
xhr.setRequestHeader('Accept','application/json');
// 发送Http请求
xhr.send(null)
```

### 并发与并行的区别
1. 并发是宏观概念 我分别有任务A 和 任务B 在一段时间内通过任务间的切换完成了这两个任务 这种情况可以称之为并发
2. 并行是微观概念 假设cpu

### 寄生式组合继承的实现
```js
// 创建父类
function Person(name){
    this.name = name;
}
// 给父类添加方法
Person.prototype.sayName = function() {
    console.log('my name is' + this.name)
}
// 创建子类
function Student(name, grade){
    // 调用父类 通过 改变this 指向 给 子类添加方法属性
    Person.call(this,name);
    // 给自己添加属性
    this.grade = grade;
}
// 继承父类原型上的方法  ---- 现在原型指向父类构建函数
Student.prototype = Object.create(Person.prototype);
// 将原型构造器 指回自己 
Student.prototype.constructor = Student;
// 给自己添加方法
Student.prototype.sayMyGrade = function(){
    console.log('My grade is ' + this.grade)
}
```
### js 的几种模块规范
<div>第一种是 commonJs 它通过require来引入模块 通过 module.exports 定义模块的输出接口，这种模块加载方案是服务端的解决方案
它是以同步的方式来引入模块的，因为在服务端文件都储存在本地磁盘 所以读取非常块 所以以同步的方式加载没有问题 
但如果是在浏览器端 由于模块加载是使用网络请求 因此使用异步加载的方式更加合适</div>
<div>
第二种是AMD方案。这种方案采取异步加载的方式来加载模块 模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后在执行回调函数
require.js实现了AMD规范
</div>

<div>
第三种是CMD方案，这种方案和AMD方案都是为了解决异步模块加载的问题，sea.js实现了CMD规范，它和require.js的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同
</div>
<div>
第四种方案是ES6提出的方案，使用Import 和 export 的形式来导入导出模块
</div>