# 泛型
函数类型声明
```ts
let myFun:(test:number,test1:string) => vido = (test:number,test1:string) => {};
```

interface 带括号的也是函数声明
```ts
interface {
    (test:number, test1:string): boolen
}
```

变量指定类型
```ts
let name:string = '';
```

# 基础类型
never 代表不会出现的类型

1.作为不会返回的函数的返回值 类型

void 代表没有任何类型
void 可以赋值为 null  undefined  never 不能包含任何类型
BigInt 最大数字 2**53 -1 
bigint 类型
