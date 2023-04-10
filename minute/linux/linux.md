# linux

## linux 命令
zip 解压  需要先安装对应的依赖
```sh
yum install -y unzip zip   

unzip test.zip 				->将test.zip解压到当前文件下
unzip -n test.zip -d /tmp 	->将test.zip解压到/tmp目录下，并且不要覆盖已有文件
unzip -v test.zip			->查看test.zip内容，但不解压
unzip -o test.zip -d tmp/	->将test.zip解压到/tmp目录下，并且覆盖已有文件

unzip /data/nginx/www/dist.zip -d /data/nginx/www
```

## docker 安装配置
1. Docker 要求 CentOS 系统的内核版本高于 3.10 ，查看本页面的前提条件来验证你的CentOS 版本是否支持 Docker 。
通过 uname -r 命令查看你当前的内核版本
```sh
uname -r
```

2. 使用root 权限登录 Centos. 确保yum 包更新到最新
```sh
sudo yum update
```

3. 卸载旧版本（如果安装过就版本的话）
```sh
sudo yum remove docker  docker-common docker-selinux docker-engine
```

4. 安装需要的软件包，yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
```sh
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
5. 设置yum 源
```sh
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

6. 可以查看所有仓库中的docker版本 并选择特定版本安装
```sh
yum list docker-ce --showduplicates | sort -r
```

7. 安装docker
```sh
sudo yum install docker-ce  #由于repo中默认只开启stable仓库，故这里安装的是最新稳定版17.12.0
sudo yum install <FQPN>  # 例如：sudo yum install docker-ce-17.12.0.ce
```

8. 启动并加入开启启动
```sh
sudo systemctl start docker
sudo systemctl enable docker
```

9. 验证安装是否成功(有client和service两部分表示docker安装启动都成功了)
```sh
docker version
```

### 问题
1. 因为之前已经安装过旧版本的docker，在安装的时候报错如下：
```sh
Transaction check error:
  file /usr/bin/docker from install of docker-ce-17.12.0.ce-1.el7.centos.x86_64 conflicts with file from package docker-common-2:1.12.6-68.gitec8512b.el7.centos.x86_64
  file /usr/bin/docker-containerd from install of docker-ce-17.12.0.ce-1.el7.centos.x86_64 conflicts with file from package docker-common-2:1.12.6-68.gitec8512b.el7.centos.x86_64
  file /usr/bin/docker-containerd-shim from install of docker-ce-17.12.0.ce-1.el7.centos.x86_64 conflicts with file from package docker-common-2:1.12.6-68.gitec8512b.el7.centos.x86_64
  file /usr/bin/dockerd from install of docker-ce-17.12.0.ce-1.el7.centos.x86_64 conflicts with file from package docker-common-2:1.12.6-68.gitec8512b.el7.centos.x86_64
```

2. 卸载旧版本的包

```sh
sudo yum erase docker-common-2:1.12.6-68.gitec8512b.el7.centos.x86_64
```

3. 再次安装docker

```sh
sudo yum install docker-ce
```

### docker 命令
1. docker ps 查看当前正在运行的容器
2. docker ps -a 查看所有容器的状态
3. docker start/stop id/name 启动/停止某个容器
4. docker exec -ti id 启动一个伪终端以交互式的方式进入某个容器（使用exit退出后容器不停止运行）
5. docker images 查看本地镜像
6. docker rm id/name 删除某个容器
7. docker rmi id/name 删除某个镜像
8. docker run --name test -ti ubuntu /bin/bash  复制ubuntu容器并且重命名为test且运行，然后以伪终端交互式方式进入容器，运行bash
9.  docker build -t soar/centos:7.1 .  通过当前目录下的Dockerfile创建一个名为soar/centos:7.1的镜像
10. docker run -d -p 2222:22 --name test soar/centos:7.1  以镜像soar/centos:7.1创建名为test的容器，并以后台模式运行，并做端口映射到宿主机2222端口，P参数重启容器宿主机端口会发生改变
11. docker images 查看当前容器内容
12. systemctl restart docker    重启docker
13. yum remove -y 安装包名     删除安装包
14. systemctl stop docker 停止服务
15. systemctl start docker 开始服务
16. docker rmi 镜像名：tag   or  镜像id      移除已经安装镜像
17. docker stop 容器服务别名  or 容器id         停止容器服务
18. docker start 容器服务别名  or 容器id        启动容器服务
19. docker rm 容器服务别名  or 容器id           删除容器服务
20. exit;  退出docker 容器
21. docker attach 容器ID  / docker exec -it 容器ID /bin/bash      进入容器
 如：docker exec -it mysql8.0 /bin/bash
22. docker restart 容器id 重启容器

### 使用docker 安装mysql
1. 使用docker pull 拉取 docker hub(https://hub.domcker.com/search?q=&type=image) 仓库中mysql镜像（注意备注）
```sh
docker pull mysql:8.0
```
2. 重启docker   重新进行1 安装速度变快
```sh
systemctl restart docker    重启docker
```
3. 启动docker中镜像
备注 ：--name 服务启动别名设置  -p端口映射 宿主机端口：镜像运行端口  -d 镜像名：tag 使用守护进程模式启动 -e：设置root帐号密码
数据库配置文件
my.cnf
```sh
[mysqld]
user=mysql
character-set-server=utf8
default_authentication_plugin=mysql_native_password
secure_file_priv=/var/lib/mysql
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
max_connections=1000
 
 
default-time-zone='+08:00'
innodb_buffer_pool_size = 128M
port = 3306
datadir=/var/lib/mysql
socket=/var/run/mysqld/mysqld.sock
pid-file=/var/run/mysqld/mysqld.pid
 
# 允许连接失败的次数。
max_connect_errors=10
 
#引擎
default-storage-engine=INNODB
 
log-bin = mysql-bin
# #设置保存时间
expire_logs_days=7
 
# #注意5.7以及更高版本需要配置本项：server-id=123454（自定义,保证唯一性）; server-id 一般去ip后三位
server-id=138
# #binlog格式，有3种statement,row,mixed
binlog-format=ROW
# #表示每1次执行写入就与硬盘同步，会影响性能，为0时表示，事务提交时mysql不做刷盘操作，由系统决定
sync-binlog=1
 
 
# ##开启慢sql
slow_query_log=on
slow_query_log_file=/var/lib/mysql/slow-query.log
long_query_time=1
 
 
[client]
default-character-set=utf8
 
[mysql]
default-character-set=utf8
```

```sh
docker run --name mysql8.0 -p 3307:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0

docker stop mysql && docker rm mysql
docker run  --restart=always --privileged=true \
-p 3307:3306 \
--name mysql \
-v /data/mysql/data:/var/lib/mysql \
-v /data/mysql/conf/my.cnf:/etc/mysql/my.cnf \
-v /data/mysql/conf/conf.d:/etc/mysql/conf.d \
-v /data/mysql/logs:/var/log/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-e TZ=Asia/Shanghai \
-d mysql:8.0

```
4. 查看运行的镜像
```sh
docker ps -a
```
5. 进入镜像 运行mysql
```sh
docker exec -it mysql8.0 /bin/bash
cd /usr/bin
mysql -u root -p
```
6. 数据库时区设置
```sh
select now();  // 查看数据库时间
show variables like '%time_zone%'; //查询当前时区
set global time_zOne='+8:00';  //在标准时区上加+8小时,即东8区时间
flush privileges; // 立即生效
```

### nginx 安装
1. pull ngxin
```sh
docker pull nginx
```
2. 启动nginx
```sh
docker run --name nginx -p 8080:80 -d nginx
```
3. 查看结果
```sh
docker ps
```
进入docker ngxin
```sh
docker exec -it nginx bash
```
#### 映射nginx 配置
配置得在容器中进行，这样的话太麻烦了，所以把配置文件给映射出来，方便配置与管理
1. 创建管理目录
```sh
mkdir -p /data/nginx
mkdir -p /data/nginx/www
mkdir -p /data/nginx/conf
mkdir -p /data/nginx/logs
```

2. 将容器中的相应文件copy到刚创建的管理目录中
```sh
docker cp c07:/etc/nginx/nginx.conf /data/nginx/
docker cp c07:/etc/nginx/conf.d /data/nginx/conf/
docker cp c07:/usr/share/nginx/html/ /data/nginx/www/
docker cp c07:/var/log/nginx/ /data/nginx/logs/
注：docker cp 67e 中的 "67e" 为容器ID前缀，只要唯一就好了
```

3. 停止并移除容器
```sh
docker stop 67e
docker rm 67e
```
4. 再次启动容器并作目录挂载(也相当于共享)
```sh
docker run --name nginx -p 8080:80 -v /data/nginx/nginx.conf:/etc/nginx/nginx.conf -v /data/nginx/www/:/usr/share/nginx/html/ -v /data/nginx/logs/:/var/log/nginx/ -v /data/nginx/conf/conf.d:/etc/nginx/conf.d --privileged=true -d nginx
注：为了好看所以做了换行，执行的时候还是需要改成一行，每行一个空格隔开就可以了

```
5. 修改配置后 重启容器
```sh
docker restart 容器id  
```

#### 配置相关
1. 在location 中 echo "hello Nginx！" 访问可以直接输出文字
```sh
例：
location / {
    echo "hello Nginx！"
}
```
2. location匹配规则：
```sh
1）最低级别匹配规则：
location / {
    echo "hello Nginx！"
}
2）最高级别匹配规则：
location /user {
    echo "hello user.hmtl"
}
3）其它级别匹配规则：
location ^~ /user {
    echo "hello user.hmtl"
}
location ~^ /user {
    echo "hello user.hmtl"
}
location ~ ^/[a-z] {
    echo "hello user.hmtl"
}
location ~ ^/\a {
    echo "hello user.hmtl"
}

```
3. 反向代理细节：
```sh
location /user {
    proxy_pass http://ip;
}
location /order/ {
    proxy_pass http://ip/;
}
访问结果：
http://ip/user/xx...
http://ip/xx...
```
4. 负载均衡配置
```sh
upstream order {
    server 192.168.5.18:8080 weight=1;
    server 192.168.5.18:8081 weight=1;
}
server{
    location /order/ {
        proxy_pass http://order/;
    }
}
注：weight=1，配置的为权重，值越高权重越高
```

## docker radis 
拉取最新版
```sh
docker pull redis:latest
```

1.  创建redis 关联文件

```sh
// 如果目录不存在则创建
mkdir -p /data/redis/myredis 
```
myredis.conf

2. 启动radis 容器
```sh
docker run --restart=always --log-opt max-size=100m --log-opt max-file=2 -p 6379:6379 --name redis -v /data/redis/myredis/redis.conf:/etc/redis/redis.conf -v /data/redis/myredis/data:/data -d redis redis-server /etc/redis/redis.conf  --appendonly yes  --requirepass redis1093185442

```

–restart=always 总是开机启动
–log是日志方面的
-p 6379:6379 将6379端口挂载出去
–name 给这个容器取一个名字
-v 数据卷挂载
/data/redis/myredis/redis.conf:/etc/redis/redis.conf 这里是将 liunx 路径下的myredis.conf 和redis下的redis.conf 挂载在一起。
/data/redis/myredis/data:/data 这个同上
-d redis 表示后台启动redis
redis-server /etc/redis/redis.conf 以配置文件启动redis，加载容器内的conf文件，最终找到的是挂载的目录 /etc/redis/redis.conf 也就是liunx下的/data/redis/myredis/redis.conf
–appendonly yes 开启redis 持久化
–requirepass redis1093185442 设置密码

3. 进入docker 容器

```sh
 docker exec -it 63d6056df6f3 /bin/bash
```

4. 通过 redis-cli 连接测试使用 redis 服务