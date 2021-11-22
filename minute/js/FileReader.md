# FileReader 对象 用于程序异步读取 储存在用户计算机上的文件内 （或原始数据缓冲区）, 使用file 或 blob 对象指定要读取的文件或数据
```js
// 创建fileReader 对象

const reader = new FileReader();
 // reader.readyState 状态的数字 
console.log(reader.readyState) //  0 还没加载任何数据   1 数据正在被加载  2  已完成全部的读取请求
// reader.result 文件读取的内容  只有文件读取完成之后才生效

// =============
// 事件处理
// =============
// 读取中断 触发
reader.onabort = () => {};

// 读取错误 触发
reader.onerror = () => {};

// 读取完成 触发
reader.onload = () => {};

// 读取开始时 触发
reader.onloadstart = () => {}

// 读取结束时 触发
reader.onloadend = () => {}

// 该事件在读取Blob时触发。
reader.onprogress = () => {}

// =============
// 方法
// =============

// 中止读取操作
reader.abort()
// 开始读取 指定的 Blob 的内容, result属性中将包含所读取文件的原始二进制数据。
reader.readAsArrayBuffer()
// 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容。
reader.readAsDataURL()
// 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
reader.readAsText()

```
