## 数据类型
```ts
string      字符串          // let str: string = '1';
number      数字            // let nbr: number = 1;
boolean     布尔            // let bln: boolean = true;
array       数组            // let arr: array = []
object      对象            // let obj: object = {}
function    函数            // let fn:(name:string) => vido = (name:string):void => {}
void        空值             代表没有任何类型    函数没有返回值就是 void
null        null            null 其他类型的子类型  
undefined   undefined       undefined 是其他类的子类型
never       不会出现的值      没有类型是never子类型 never只能赋给never 
any         任意类型         不对类型进行检测
bigint      最大值           Number.MAX_SAFE_INTEGER    //2**53-1

// never 示例
function error(message: string): never{
    throw new Error('报错了'); // 直接异常结束了
    console.log('ok')
}
// 死循环
function loop(): never{
    while(true){}
    console.log('ok')
}

function(x: number|string){
     if(typeof x === 'number'){
        console.log(x);
    } else if (typeof x === 'string'){
        console.log(x);
    }else{
        console.log(x);//never
    }
}

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
## 类型断言
```ts
// 元祖类型    数量和类型已知的数组为元祖
let tuple: [string, number] = ['tuple',10];

let data: any = 'data';
// 尖括号 语法断言
let str: number = (<string>data).length;
// as 语法断言
let str2: number = (data as string).length;
// ! 非空断言
let element: (HTMLElement | null) = document.getElementById('root');
element!.style.color = 'green';
```

## 联合类型
```ts
let name: string | number；
name = 3;
console.log(name.toFixed(2))
name = 'string';
console.log(name!.toString())
// 断言
let name1: string | number;
console.log((name1! as number).toFixed(2));
console.log((name1! as string).length);
// 双重断言
console.log(name1! as any as boolean);
```

## 字面量类型和类型字面量
```ts
const up:'Up'= 'Up';
const down: 'Down' = 'Down';
const left: 'Left' = 'Left';
const right: 'Right' = 'Right';
type Direction ='Up'|'Down'|'Left'|'Right';
// 可实现枚举的效果
function move(direction: Direction){};  move("Down");
// 类型字面量
type Person = { name:string, age:number };
let p: Person = { name:'name', age: 10 };
// 字面量字符串和联合类型
type T1 = '1'|'2'|'3';
type T2 = string|number|boolean;
let t1: T1 = '1';
let t2: T2 = true;
```

## 函数重载及类型
```ts
type GetName = (firstName:string, lastName:string) => string;
// 参数可选
let getName: GetName = function (firstName: string, lastName?:string) { return firstName+lastName;}
// 默认值
function ajax(url:string, method:string='GET'){};
// 数组
function sum(...numbers:number[]){return numbers.reduce((val,item) => val+item,0)};
console.log(sum(1,2,3));
// 函数重载
let obj:any = {};
// 如果传的val是一个字符串赋给Obj.name 数组赋给obj.age
function attr(val: string): void
function attr(val: number): void
function attr(val: any):void{
    if(typeof val === 'string'){
        obj.name = val;
    }else if(typeof val === 'number'){
        obj.age = val;
    }
}
attr('zhufeng');
attr(10);
//attr(true);  报错

function add(a: string,b:string): void
function add(a: number,b:number): void
function add(a: string|number,b:string|number): void {
   
}
add('a','b');
add(1,2);
//add(1,'b'); // 报错
```
