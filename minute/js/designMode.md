## 设计模式
1. 发布订阅
```js
// 发布订阅 发布和订阅 两者无关
// 发布 订阅 [fn,fn]
function EventEmitter(){
    this._arr = []
}
// 订阅
EventEmitter.prototype.on = function(callback){
    this._arr.push(callback)
}

// 发布 发布时 需要让on 方法依次执行
EventEmitter.prototype.emit = function(){
    this._arr.forEach(fn => fn.apply(this,arguments))
}

let e = new EventEmitter()


```

2. 观察者模式
```js
// 观察者模式 基于发布订阅模式
// 观察者模式 观察者 和 被观察者
// 被观察者 应该存放在观察者
// 被观察者状态变化 要更新自己身上的所有的观察者
// 观察者
class Oberserver{
        update(newState){
            console.log(newState)
        }
}
// 被观察者
class Subserver{
    constructor(){
        this.state = '1';
        this.arr = []
    }   
    attach(oberserver){   // 装载观察者
        this.arr.push(oberserver)
    }
    setState(newState){ // 更新自己的状态
        this.state = newState;
        this.arr.forEach(observer => observer.update(newState)); // 通知 观察者

    }
}

let subServer = new Subserver();
let observer1 = new Oberserver();
let observer2 = new Oberserver();
subServer.attach(observer1)
subServer.attach(observer2)
subServer.setState('2')
```