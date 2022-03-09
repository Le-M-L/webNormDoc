## 数据类型
```sh
number      数字
string      字符串
boolean     布尔
array       数组
object      对象
function    函数
void        空值    代表没有任何类型    函数没有返回值就是 void
null        空值    null 是任何类型的子类型  
undefined           undefined是任何类的子类型
never               
any         任意类型    不对类型进行检测
```

## 枚举
普通枚举 ——— 编译完之后 保留枚举变量
```ts
enum Gender {  GIRL, BOY, }
console.log(Gender["BOY"], Gender[1]); //  1 BOY
console.log(Gender["GIRL"], Gender[0]); // 0 GIRL
```
常量枚举 ——— 编译完之后 删除枚举变量
```ts
// var myColor = [0 /* RED */, 1 /* YELLOW */, 2 /* BLUE */]; // 编译之后的代码
const enum Colors{  RED, YELLOW, BLUE }
let myColor = [Colors.RED, Colors.YELLOW, Colors.BLUE];
```

interface 带括号的也是函数声明
```ts

```

变量指定类型
```ts
```

## 基础类型
never 代表不会出现的类型

1.作为不会返回的函数的返回值 类型

void 代表没有任何类型
void 可以赋值为 null  undefined  never 不能包含任何类型
BigInt 最大数字 2**53 -1 
bigint 类型
