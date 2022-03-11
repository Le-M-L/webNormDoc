## 数据类型
```ts
string      字符串          // let str: string = '1';
number      数字            // let nbr: number = 1;
boolean     布尔            // let bln: boolean = true;
array       数组            // let arr: array = []
object      对象            // let obj: object = {}
Function    函数            // let fn:(name:string) => vido = (name:string):void => {}
void        空值             代表没有任何类型    函数没有返回值就是 void
null        null            null 其他类型的子类型  
undefined   undefined       undefined 是其他类的子类型
any         任意类型         不对类型进行检测
unknown     未知类型         unknown 是 any 的安全类型 不管和谁联合  最最后都是 unknown
never       不会出现的值      never是unknown子类型 没有类型是never子类型 never只能赋给never 
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

## 命名空间
通过 export 关键字导出属性 方便外面访问
```ts
// a 命名空间
namespace a{
   export let name:string = 1;
}
a.name // 1
// b 命名空间
namespace b {
    let name: string = 2;
}
b.name //报错

// 使用命名空间扩展枚举
enum Color{
    red=1,
    yellow=2,
    blue=3
}
namespace Color{
    export const green=4;
    export const purple=5;
}
Color.purple;
```

## 枚举
普通枚举 ——— 编译完之后 保留枚举变量
```ts
enum Gender {  GIRL, BOY, }
console.log(Gender["BOY"], Gender[1]); //  1 BOY
console.log(Gender["GIRL"], Gender[0]); // 0 GIRL
// 数字和枚举 是兼容的
enum Colors {Red, Yellow};
let c: Colors = Colors.Red;
c = 1
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
function attr(val: string): void; // 一层函数重载
function attr(val: number): void; // 二层函数重载
function attr(val: any):void{     // 函数方法
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

## 类声明&属性
```ts
class Father {
    static  fatherName: string = 'fatherName';  // 只有自己可以访问
    public name: string;                        // 自己  自己的子类  和其他类都能访问
    protected age: number;                      //  保护属性 自己和自己子类能访问    其他类不能访问
    private money:number;                       // 自己能访问 子类和其他类不能访问
    readonly a:string;                          //  只读
    toString(){console.log('Father');}
    constructor(name: string, age: number, money:number){
        //在构造函数上定义的属性和方法相当于定义在父类实例上的，而不是原型对象上
        this.name = name;
        this.age = age;
        this.money = money;
    }
}
// extends 继承 
class Child extends Father {
    static childName: string = 'childName';
    constructor(name: string, age: number, money: number){
        // super 是父类构造函数关键字 可以当作函数使用 也能当作对象使用
        // super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
        super(name, age, money)
    }
    public toString(){
        super.toString(); // 当前调用的是父类的方法
        super.name = '66'; // 当前赋值的是 自己的属性
        console.log('Child')
    }
    public desc(){
        console.log(this.name, this.age)
    }
}
let father = new Father('father',11,1)
let child = new Child('child',11,1)
child.toString()    // Father   Child
console.log(father.name); // father
```
## class 
当我们写一个类的时候,会得到2个类型
1. 构造函数类型的函数类型
2. 类的实例类型
```ts
class Component {
    static myName: string = '静态名称属性';
    myName: string = '实例名称属性';
}
let com = Component;
// Component 类名本身表示对生实例的类型
// ts 一个类类型 一个叫值
// 冒号后面的类型放在 = 后面的是值
let c: Component = new Component();
let f: typeof Component = com;

// 函数 不能直接使用 :Component1
function Component1() {
    this.myName = '实例名称属性';
}
let com = Component1;
Component1.myName = '静态名称属性';
//let c: Component = new Component();
let f: typeof Component1 = com;
```

## class super 关键字
1. super当做函数使用
<div>
super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super() 函数。
</div>
<div>注意：作为函数时，super() 只能用在子类的构造函数之中，用在其他地方就会报错。</div>
<div>super 作为函数调用时，内部的 this 指的是子类实例</div>

```ts
class A {
  constructor() {
    this.show();
  }
}
class B extends A {
  constructor() {
    super();
  }
  show(){
    console.log('实例');
  }
  static show(){
    console.log('子类');
  }
}
new B() 　
// 输出 '实例' ，new B 时触发了 B 的构造函数，所以触发了 super 方法，即触发了父类 A 的构造函数，
// 此时的 this.show 的 this 指的是子类
```

2. super 作为对象使用
<div>super在普通方法中（即非静态方法）及此时的 this 关键字指向</div>

```ts
class A {
  p() {
    return 2;
  }
}
class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2  此时的super指向父类原型对象，即 A.prototype
  }
}
let b = new B();　　//2
```
<div>由于在普通方法中的 super 指向父类的原型对象，所以如果父类上的方法或属性是定义在实例上的，就无法通过 super 调用的。如下所示：</div>

```ts 
class A {
  constructor() {  //在构造函数上定义的属性和方法相当于定义在父类实例上的，而不是原型对象上
    this.p = 2;
  }
}
class B extends A {
  get m() {
    return super.p;
  }
}
let b = new B();
console.log(b.m) // undefined
```

3. 在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向的是当前的子类实例
```ts
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
　　 super.y = 123;　　//如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
  }
  m() {
    super.print();
  }
}
let b = new B();
b.m() // 2
console.log(b.y);  //123
```

4. super在静态方法中及此时的 this 关键字指向
super作为对象，用在静态方法之中，这时 super 将直接指向父类，而不是父类的原型对象。
```ts
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }
  myMethod(msg) {
    console.log('instance', msg);
  }
}
class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }
  myMethod(msg) {
    super.myMethod(msg);
  }
}
Child.myMethod(1); // static 1
var child = new Child();
child.myMethod(2); // instance 2

```
在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。
```ts
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}
B.x = 3;
B.m() // 3
```
## 装饰器
执行顺序的规律
1. 类装饰器是最后执行的,后写的类装饰器先执行
2. 方法和就去参数中的装饰器先执行参数
3. 就去和属性装饰器,谁在前面先执行谁
```ts
// 函数装饰器 携带参数
function addNameEatFactory(name: string) {
    return function addNameEat(x: Function) {
        x.prototype.name = name;
        x.prototype.eat = function () { }
    }
}
@addNameEatFactory('name')
class Person {
    name: string;
    eat: Function;
    constructor() { }
}
let p: Person = new Person();
console.log(p.name); // name
p.eat(); 

// 返回的参数可以多 但不能少
// 类型安全 
function replaceClass(constructor: Function){ // 确保上一个构造函数
    return class {
        name: string;
        eat: Function;
        age: number;
        constructor() {}
    }
}
// 如果装饰的是实例属性的话 target是构造函数的原型
function upperCase(target: any, propertyKey: string){
    let value = target[propertyKey];
    const getter = () => value;
    const setter = (newVal: string) => {value = newVal.toUpperCase()};
    if(delete target[propertyKey]){
        Object.defineProperty(target,propertyKey,{
            get: getter,
            set: setter,
            enumerable: true,   // 是否可枚举
            configurable: true  // 是否可修改
        })
    }
}
// 如果装饰的是静态属性的话 target是构造函数本身
function staticPropertyDecorator(target: any, propertyKey: string){
    console.log(target, propertyKey)
}
function noEnumerable(target: any, propertyKey: string,descriptor:PropertyDescriptor) {
    console.log(target);
    console.log(propertyKey);
    descriptor.enumerable=false;
}
function toNumber(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let oldMethod = descriptor.value;
    descriptor.value = function (...args: any[]){
        args=args.map(item=>parseFloat(item));
        return oldMethod.apply(this, args);
    }
}
// 参数容器
// target 静态成员就是构造函数 非静态成员就是构造函数原型   methodName方法的名称  paramIndex参数是索引
function addSex(target: any, methodName, paramIndex: number){
    console.log(target, methodName, paramIndex);
    target.sex = 1;
}
class Person {
    @upperCase
    name: string = 'name'; // 实例属性
    @staticPropertyDecorator
    static age:number = 10; // 静态属性
    @noEnumerable
    getName() { console.log(this.name); }//实例方法
    @toNumber
    sum(...args:any[]){//实例方法
        return args.reduce((accu: number, item: number)=>accu+item,0);
    }
    sex: number
    login(username:string,@addSex password:string){
        console.log(this.sex,username,password);
     }
}
let p: Person = new Person();
 p.login('1','2');

//console.log(p.name);
//console.log(p.sum('1', '2', '3'));
```
## 抽象多态 abstract
<div>非abstract类中不可以有abstract方法</div>
<div>abstract 不能用于new运算符创建对象</div>
<div>若子类继承抽象类，并重写了所有的抽象方法，则此类是一个”实体类”,即可以实例化</div>
<div>若子类继承抽象类，没有重写所有的抽象方法，意味着此类中仍有抽象方法，则此类必须声明为抽象的！</div>

```ts
abstract class Animal {
    name: string;
    abstract  speak():void 
}
//let c = new Cat(); // 不能实例化
class Dog extends Animal {
    speak(): void {
        console.log('汪汪汪');
    }
}
```

## 接口 interface
```ts
// 接口的属性
interface Person {
    readonly id: number;  // 只读
    name: string;
    (price:number):number; // 函数类型
    [key: string]: any; // 任意属性
}
let p: Person = {
    id:1,
    name:'name',
    discount(price: number){return price*.8}
    age:10,
    home:'home',
    11:11
}

// 函数类型
interface Type1 {
    (name: string):any
    age: number  // 此时的age 为 函数上的属性
}
let t: any = (name: string) => { };
t.age = 10;

// 索引接口 对数组或对象约束
interface User {
    [xx:number]: string
}
let user: User={
    0:'0',1:'1',2:'2'
}
let arr: User=['1','2','3'];

// 构造函数类型
class Animal{
    constructor(public name:string){}
}
// 加上new之后就是用来描述类的构造函数
interface WithNameClass {
    new(name: string): any
}
let wc: WithNameClass = Animal

// 接口的继承
interface Speakable2{
    speak():void
}
interface SpeakChinese extends Speakable2 {
    speakChinese(): void
}
class ChineseMan implements SpeakChinese{
    speakChinese(): void {
        throw new Error("Method not implemented.")
    }
    speak() {
        throw new Error("Method not implemented.")
    }
}

// 同名的接口可以写多少,类型会自动合并  下面的重名属性会 覆盖上面的
interface Speakable {
    name: string;
    speak(): void
}
interface Speakable {
    speak(): number
}
interface Eatable{
    eat(): void
}

```
## 类声明 implements
```ts
// implements 声明自己使用一个或多个接口
class Person implements Speakable, Eatable {
    name: string
    speak() {
        throw new Error("Method not implemented.")
    }
    eat(): void {
        throw new Error("Method not implemented.")
    }
}
```
## type 定义类型
type 关键字用来定义一种类型
```ts
type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'
let method: Methods
method = 'PUT' // OK
method = 'aaa' // error
```
## 泛型

```ts
// 泛型类
class MyArray<T>{
    private list:T[] = [];
    add(value:T){
        this.list.push(value)
    }
    getMax():T{
        return this.list[0];
    }
}
let array = new MyArray<number>();
array.add(1);
array.add(2);
array.add(3);
console.log(array.getMax());
// 与new
function factory<T>(type:{new():T}):T{
    return new type()
}
class Person{};
let p = factory<Person>(Person);
console.log(p);
// 泛型接口
// 默认泛型
interface Calculate<T = number>{
  <U>(a:T,b:T):U
}
let sum3: Calculate<number> = function <U>(a: number, b: number): U {
  return a as any;
};
sum3<string>(1, 2);
// 泛型可以写多个
function swap<A,B>(tuple:[A,B]):[B,A]{
   return [tuple[1],tuple[0]];
}

// 泛型约束
interface LengthWise{
  length:number
}
function logger2<T extends LengthWise>(val: T){
    console.log(val.length)
}
let obj = {length: 10};
type Obj = typeof obj;
logger2<Obj>(obj);

//判断兼容不兼容跟extends继承没有一点关系 ,只看形状 有没有对应的属性
class GrandFather {
  grandFather:string
}
class Father extends GrandFather {
  father:string;
}
class Child extends Father{
  child:string
}
//约束  
//或说T能赋值给Father
//T是Father的子类型
function get<T extends Father>(){}; // Father Child 能通过
// 接口的兼容性--
//返回值类型是协变的，而参数类型是逆变的
//返回值类型可以传子类, 参数可以传父类;
//参数逆变父类 返回值协变子类 搀你父,返鞋子
// ts 参数是双向协变
```

## 类型保护 is
```ts
interface Bird {
  swing: number;//2
}
interface Dog {
  leg: number;//4
}
//  is Type 哪个参数是什么类型
function isBird(y:Bird|Dog): y is Bird {
    return (y as Bird).swing == 2;
}
function getAnimal(x: Bird | Dog) {
    if(isBird(x)){
        console.log(x);
    }else{
        console.log(x);
    }
}
```

## 联合和交叉类型
```ts
// 交叉类型
interface A{name:string, c:number};
interface B{age:number, c: number};
let a: A;
let b: B;
type C = A&B;
let c:C = {name:'name'm age:10, c: 10};
a = c;
b = c;
// 联合类型
type AA = string|number;
type BB = string|boolean;
```
## keyof 作用
```ts
// keyof 可以直接拿到 建名
interface data {
    id: number,
    name: string
}
// keyof data 等于 'id' | 'name'
function getData(d: keyof data){
    return d
}
getData('id')


type T1 = { delay: "One"; setMessage: "Two" };
type K1 = keyof T1;//T1的key组成的联合类型 delay|setMessage
type V1 = T1[K1];//V1=就是T1的值 的联合类型  "One" | "Two"

```

## declare 扩展全局变量
```ts
declare global{
    interface String {
       double(): string;
    }

    interface Window {
      myName: string;
    }
}

String.prototype.double = function(){
    return this+this;
}
let result = new String("hello").double();//hellohello
console.log(result);


console.log(window.myName);

```