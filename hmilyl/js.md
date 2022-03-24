# js 
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
### map和weakMap的区别

