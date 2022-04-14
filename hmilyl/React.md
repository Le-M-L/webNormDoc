# REACT
## 什么是React 
React是一个简单的javascript UI库，用于构建高效、快速的用户界面。它是一个轻量级库，因此很受欢迎。它遵循组件设计模式、声明式编程范式和函数式编程概念，以使前端应用程序更高效。它使用虚拟DOM来有效地操作DOM。它遵循从高阶组件到低阶组件的单向数据流。
## 什么是jsx
jsx是javascript的语法扩展。它就像拥有javascript全部功能的语言模板，它生成React元素，这些元素将在DOM中呈现。React建议在组件中使用JSX。在JSX中，我们结合了javascript和HTML,并生成了可以在DOM中呈现React元素

## 函数/无状态/展示组件
函数或无状态组件是一个纯函数，它可以接受参数，并返回react元素。这些都是没有任何副作用的纯函数。这些组件没有状态或声明周期方法，例如

```js
import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export const Header = () => {
    return(
        <Jumbotron style={{backgroundColor:'orange'}}>
            <h1>TODO App</h1>
        </Jumbotron>
    )
}
```

## 类/有状态组件
类或有状态组件具有状态和声明周期方可能通过setState()方法更改组件的状态。类组件是通过扩展React创建的。它在构造函数中初始化，也可以有子组件。例如：

```JS
import React from 'react';
import '../App.css';
import { ToDoForm } from './todoform';
import { ToDolist } from './todolist';

export class Dashboard extends React.Component {

  constructor(props){
    super(props);

    this.state = {

    }
  }
  
  render() {
    return (
      <div className="dashboard"> 
          <ToDoForm />
          <ToDolist />
      </div>
    );
  }
}

```
## 受控组件
受控组件是在React 中处理输入表单的一种技术，表单元素通常维护他们自己的状态，而React则在组件的状态属性中维护状态。我们可以将两者结合起来控制输入表单。这称之为受控组件。因此，在受控组件表单中。数据由React组件处理。一般通过事件处理函数触发 onChange
<p>每当表单的状态发生改变时，都会被写入到组件的state中，这种组件在React被称为受控组件。</p>

## 非受控组件
大多数情况下，建议使用受控组件。有一种称为非受控组件的方法可以通过使用Ref来处理表单数据。在非受控组件中。Ref用于直接从DOM访问表单值。而不是事件处理程序。一般通过ref取值
<p>一切逻辑与自身有关，与其他组件没有通信和交集</p>

## 容器组件
容器组件是处理获取数据、订阅 redux 存储等的组件。它们包含展示组件和其他容器组件，但是里面从来没有html。

## 高阶组件
高阶组件是将组件作为参数并生成另一个组件的组件。 Redux connect是高阶组件的示例。 这是一种用于生成可重用组件的强大技术。

## Props 和 State
Props 是只读属性，传递给组件以呈现UI和状态，我们可以随时间更改组件的输出。

## 什么是PropTypes
随着时间的推移，应用程序会变得越来越大，因此类型检查非常重要。PropTypes为组件提供类型检查，并为其他开发人员提供很好的文档。如果react项目不使用 Typescript，建议为组件添加 PropTypes。

## 组件生命周期方法
组件在键入和离开DOM时要经历一系列生命周期方法，下面是这些生命周期方法
### componentWillMount()
在渲染前调用，在客户端也在服务的 它只发生一次

### componentDidMount()
在第一次渲染后调用，只在可客户端，之后组件已经生成了对应的DOM结构。可以通过this.getDOMNode()来进行访问。如果你想和其他javascript框架一起使用，可以在这个方法中调用setTimeout,setInterval或者发送ajax请求等操作（防止异步操作阻塞UI）

### componentWillReceiveProps()
在组件接收到一个新的prop（更新后）时被调用。这个方法初始化render时不会被调用

### shouldComponentUpdate()
返回一个布尔值 在组件接收到新的props或者state时被调用。在初始化时或使用forceUpdate时不被调用。可以在你确定不需要更新组件时调用

### componentWillUpdate()
在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用

### componentDidUpdate()
在组件完成更新后立即调用。在初始化时不会被调用

### componentWillUnMount()
组件在从DOM中移除的时候立刻被调用

### getDerivedStateFromError()
这个生命周期方法在ErrorBoundary类中使用。实际上，如果使用这个生命周期方法，任何类都会变成ErrorBoundary。这用于在组件树中出现错误时呈现回退UI，而不是在屏幕上显示一些奇怪的错误。

### componentDidCatch()
这个生命周期方法在ErrorBoundary类中使用。实际上，如果使用这个生命周期方法，任何类都会变成ErrorBoundary。这用于在组件树中出现错误时记录错误。

## 超越继承的组合
在React中，我们总是使用组合而不是继承。我们已经在函数式编程部分讨论了什么是组合。这是一种结合简单的可重用函数来生成高阶组件的技术。下面是一个组合的例子，我们在 dashboard 组件中使用两个小组件todoForm和todoList。
```JS
import React from 'react';
import '../App.css';
import { ToDoForm } from './todoform';
import { ToDolist } from './todolist';

export class Dashboard extends React.Component {

  render() {
    return (
      <div className="dashboard"> 
          <ToDoForm />
          <ToDolist />
      </div>
    );
  }
}


```

## 什么是Redux及其工作原理
Redux是React的一个状态库 它基于flux，redux简化了React中的单向数据流，Redux将状态管理完全从react中抽象出来
### 它是如何工作的