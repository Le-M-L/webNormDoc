# import 和 export
## export 命令
export的语法，对外导出接口,在接口名与模块内部变量之间，建立了一一对应的关系。
```js
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
// 可以使用 import 导入
import { n,m } from "./util"
```

## export default 命令

```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
import foo from 'modules';

// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

## module 对象
Node内部提供一个Module构建函数。所有模块都是Module的实例
```js
module.id 模块的识别符，通常是带有绝对路径的模块文件名。
module.filename 模块的文件名，带有绝对路径。
module.loaded 返回一个布尔值，表示模块是否已经完成加载。
module.parent 返回一个对象，表示调用该模块的模块。
module.children 返回一个数组，表示该模块要用到的其他模块。
module.exports 表示模块对外输出的值。
```
### module.exports属性
module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。