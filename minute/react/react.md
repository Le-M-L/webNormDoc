# React.useState
状态管理



# React.memo
用于解决子组件重复渲染问题

```js
import React, { memo } from 'react'
// React 中当组件的 props 或 state 变化时，会重新渲染视图，实际开发会遇到不必要的渲染场
// 包裹一层 memo 可以避免重复渲染
let ChildComp = function () {
  console.log('render child-comp ...')
  return <div>Child Comp ...</div>
}
ChildComp = memo(ChildComp)
function ParentComp () {
  const [ count, setCount ] = useState(0)
  const increment = () => setCount(count + 1)

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <ChildComp />
    </div>
  );
}
```

# React.useCallback()
有缓存作用 
1. 点击父组件按钮，改变了父组件中 count 变量值（父组件的 state 值），进而导致父组件重新渲染；
2. 父组件重新渲染时，会重新创建 changeName 函数，即传给子组件的 onClick 属性发生了变化，导致子组件渲染；
3. useCallback 可以起到缓存作用 避免子组件重复 生成方法 造成的重复渲染
```js
import React, { memo, useCallback } from 'react'

 

const ChildComp = memo(function ({ name, onClick }) {
  console.log('render child-comp ...')
  return <>
    <div>Child Comp ... {name}</div>
    <button onClick={() => onClick('hello')}>改变 name 值</button>
  </>
})

function ParentComp () {
  // ...
  const [ name, setName ] = useState('hi~')
  // 每次父组件渲染，返回的是同一个函数引用

  const changeName = useCallback((newName) => setName(newName), [])  

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <ChildComp name={name} onClick={changeName}/>
    </div>
  );
}
```
# React.useMemo() 
useMemo 有两个参数:
1. 第一个参数是个函数，返回的对象指向同一个引用，不会创建新对象
2. 第二个参数是个数组，只有数组中的变量改变时，第一个参数的函数才会返回新对象
```js
import React, { memo, useCallback, useMemo } from 'react'
// 子组件触发父组件 依旧会重复渲染  是由于
// 解决方法重复渲染问题
const ChildComp = memo(function ({ name, onClick }) {
  console.log('render child-comp ...')
  return <>
    <div>Child Comp ... {name}</div>
    <button onClick={() => onClick('hello')}>改变 name 值</button>
  </>
})

// 点击父组件按钮，触发父组件重新渲染；
// 父组件渲染，const info = { name, age } 一行会重新生成一个新对象，导致传递给子组件的 info 属性值变化，进而导致子组件重新渲染。
// 使用 useMemo 对对象属性包一层。 避免重复渲染

function ParentComp () {
  const [ count, setCount ] = useState(0)
  const increment = () => setCount(count + 1)
  const [ name, setName ] = useState('hi~')
  const [ age, setAge ] = useState(20)
  const changeName = useCallback((newName) => setName(newName), [])
  const info = useMemo(() => ({ name, age }), [name, age])   // 包一层

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <ChildComp info={info} onClick={changeName}/>
    </div>
  );
}
```


