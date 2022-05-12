# node

## path
1. resolve  获取文件路径    __dirname根路径 '../../'是文件路径
```js
const root = p => path.resolve(__dirname, `../../${p}`)
```

## fs
1. statSync 异步用于返回给定文件的信息 
2. accessSync 用来测试给定目录的权限
3. writeFile    文件内容写入
4. writeFileSync    创建文件
## inquirer
npm 选项之后的回调
