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

