# SQL
```sql
IF NOT EXISTS 如果数据库存在则不执行 否则执行后
面的语句
DEFAULT CHARSET 指定当前所使用的字符集
COLLATE 排序规则
```


## 查询所有数据库
```sql
SHOW DATABASES
```

## 查询当前数据库
```sql
SELECT DATABASE()
```

## 创建
```sql
-- 中括号括起来都是可选的
-- CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFAULT CHARSET 字符集]  [COLLATE 排序规则] 
CREATE DATABASE test
```

## 删除
```sql
-- DROP DATABASE 数据库名
DROP DATABASE test
```

## 使用 
```sql
-- USE 数据库名
USE test
```

## DDL表操作
查询当前数据库所有表
```sql
SHOW TABLES
```

查询表结构
```sql
DESC  表名
DESC user
```

创建表

```sql
CREATE TABLE tb_user(
    id int comment `编号`,
    name varchar(50) comment `姓名`,
    age int comment `年龄`,
    gender varchar(1) comment `性别`
) comment `用户表`;
-- 显示创建表的sql
-- SHOW CREATE tb_user
```