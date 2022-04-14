## 声明式编程
声明式编程是一种编程范式，它关注的是你要做什么，而不是如何做。它表达逻辑而不显式地定义步骤。这意味着我们需要根据逻辑的计算来声明要显示的组件。它没有描述控制流步骤。声明式编程的例子有HTML、SQL等
```js
<div>
    <p>这是一个P</p>
</div>
```

## 命令式编程
命令式编程描述了如何去做
<div>下面是一个例子，数组中的每个元素都乘以 2，我们使用声明式map函数，让编译器来完成其余的工作，而使用命令式，需要编写所有的流程步骤。</div>

```js
const numbers = [1,2,3,4,5];

// 声明式
const doubleWithDec = numbers.map(number => number * 2);

console.log(doubleWithDec)

// 命令式
const doubleWithImp = [];
for(let i=0; i<numbers.length; i++) {
    const numberdouble = numbers[i] * 2;
    doubleWithImp.push(numberdouble)
}

console.log(doubleWithImp)

```

## 什么是函数式编程
函数式编程是声明式编程的一部分。javascript中的函数是第一类公民，这意味着函数是数据，你可以像保存变量一样在应用程序中保存、检索和传递这些函数。
<div>函数式编程有些核心的概念，如下：</div>

<h4>
1. 不可变性(Immutability)
</h4>

<p>
不可变性意味着不可改变。在函数式编程中。你无法更改数据，也不能更改。如果要改变或更改数据，则必须复制数据副本来更改
例如</p>

```js
// 这是一个student对象和changeName函数，如果要更改学生的名称，则需要先复制student对象，然后返回新对象
// 在javascript中，函数参数是对实际数据的引用，你不应该使用 student.firstName = 'testing11',这会改变实际的student对象，应该使用Object.assign复制对象并返回新对象。
let student = {
    firstName:'testing',
    lastName:'testing',
    mark:500
}

function changeName(student){
    // student.firstName = 'testing11' // 不能这样做
    let copiedStudent = Object.assign({},student);
    copiedStudent.firstName = 'testing11';
    return copiedStudent
}
console.log(changeName(student));

console.log(student);
```

<h4>2. 纯函数(Pure Functions)</h4>
<p>纯函数是始终接受一个或多个参数并计算参数并返回数据或函数的函数。它没有副作用，例如设置全局状态，更改应该程序状态，它总是将参数视为不可变数据</p>
使用纯函数，它接受参数，基于参数计算，返回一个新对象而不修改参数。

```js
let student = {
    firstName: "testing",
    lastName: "testing",
    marks: 500
}

// 非纯函数
function appendAddress() {
    student.address = {streetNumber:"0000", streetName: "first", city:"somecity"};
}

console.log(appendAddress());

// 纯函数
function appendAddress(student) {
    let copystudent = Object.assign({}, student);
    copystudent.address = {streetNumber:"0000", streetName: "first", city:"somecity"};
    return copystudent;
}

console.log(appendAddress(student));

console.log(student);

```
<h4>3. 数据转换(Data Transformations)</h4>
<p>我们讲了很多关于不可变性的内容，如果数据是不可变的，我们如何改变数据。如上所述，我们总是生成原始数据的转换副本，而不是直接更改原始数据。</p>
生成新数据而不是改变源数据 javascript 内置的函数例子

```js
let cities = ["irving", "lowell", "houston"];
//我们可以得到逗号分隔的列表
console.log(cities.join(',')) // irving,lowell,houston

// 筛选出想要的数据
const citiesI = cities.filter(city => city[0] === "i");
console.log(citiesI) // [ 'irving' ]

// map 转大写返回新数组
const citiesC = cities.map(city => city.toUpperCase());
console.log(citiesC) // [ 'IRVING', 'LOWELL', 'HOUSTON' ]
```
<h4>4. 高阶函数 (Higher-Order Functions)</h4>
<p>高阶函数是将函数作为参数或返回函数的函数，或者有时它们都有。 这些高阶函数可以操纵其他函数。</p>
Array.map，Array.filter和Array.reduce是高阶函数，因为它们将函数作为参数。

```js
const numbers = [10,20,40,50,60,70,80]

const out1 = numbers.map(num => num * 100);
console.log(out1);
// [ 1000, 2000, 4000, 5000, 6000, 7000, 8000 ]

const out2 = numbers.filter(num => num > 50);
console.log(out2);
// [ 60, 70, 80 ]

const out3 = numbers.reduce((out,num) => out + num);
console.log(out3);
// 330

```
<h4>5. 递归</h4>
<h4>6. 组合 </h4>
<p>在React中，我们将功能划分为小型可重用的纯函数，我们必须将所有这些可重用的函数放在一起，最终使其成为产品。 将所有较小的函数组合成更大的函数，最终，得到一个应用程序，这称为组合。</p>
<p>实现组合有许多不同方法。 我们从Javascript中了解到的一种常见方法是链接。 链接是一种使用点表示法调用前一个函数的返回值的函数的方法。</p>
<p>这是一个例子。 我们有一个name，如果firstName和lastName大于5个单词的大写字母，刚返回，并且打印名称的名称和长度。</p>

```js
const name = "Bhargav Bachina";

const output = name.split(" ")
    .filter(name => name.length > 5)
    .map(val => {
    val = val.toUpperCase();
    console.log("Name:::::"+val);
    console.log("Count::::"+val.length);
    return val;
});

console.log(output)
/*
Name:::::BHARGAV
Count::::7
Name:::::BACHINA
Count::::7
[ 'BHARGAV', 'BACHINA' ]
*/

```
<p>在React中，我们使用了不同于链接的方法，因为如果有30个这样的函数，就很难进行链接。这里的目的是将所有更简单的函数组合起来生成一个更高阶的函数。</p>

```js
// redux compose 
const name = compose(
    splitmyName,
    countEachName,
    comvertUpperCase,
    returnName
)

console.log(name);

```