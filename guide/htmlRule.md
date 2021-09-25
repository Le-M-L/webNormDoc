# HTML 规范 
## Vue Template 同样适用
## 1.分块注释
在代码很长或特殊功能的组件 需要加上一对 HTML 注释。

当个引入内容很少的组件 调用需打上单行注释
```vue
<template>
    <div>
        <!-- 头部 begin -->
        <Header />
        <!-- 头部 end -->

        <!-- 内容 begin -->
        <Content>
            ......省略若干内容
        </Content>
        <!-- 内容 end -->
         
        <!-- 尾部 begin -->
        <Footer />
        <!-- 尾部 end -->

        <!-- 表格组件 -->
        <Table />

     </div>
</template>
```

## 2.语义化标签
HTML5 中新增很多语义化标签，所以优先使用语义化标签，避免一个页面都是 div 或者 p 标签
