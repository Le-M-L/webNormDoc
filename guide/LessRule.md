# LESS 规范

## 1.代码组织
 将公共less文件放置在style/less/common文件夹
```js
例:// color.less,common.less
```
按以下顺序组织
1. @import;
2. 变量声明;
3. 样式声明;

```less
@import "mixins/size.less";
 
@default-text-color: #333;
 
.page {
  width: 960px;
  margin: 0 auto;
}
```

## 2.避免嵌套层级过多
将嵌套深度限制在3级。对于超过4级的嵌套，给予重新评估。这可以避免出现过于详实的CSS选择器。

避免大量的嵌套规则。当可读性受到影响时，将之打断。推荐避免出现多于20行的嵌套规则出现

**不推荐**
```less
.main{
  .title{
    .name{
       color:#fff
    }
  }
}
```

**推荐**
```less
.main-title{
   .name{
      color:#fff
   }
}
```
