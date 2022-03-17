# docker 安装配置
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

## 问题
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

## docker 命令
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


## 使用docker 安装mysql
1. 使用docker pull 拉取 docker hub(https://hub.docker.com/search?q=&type=image) 仓库中mysql镜像（注意备注）
```sh
docker pull mysql:8.0
```
2. 重启docker   重新进行1 安装速度变快
```sh
systemctl restart docker    重启docker
```
3. 启动docker中镜像
备注 ：--name 服务启动别名设置  -p端口映射 宿主机端口：镜像运行端口  -d 镜像名：tag 使用守护进程模式启动 -e：设置root帐号密码
```sh
docker run --name mysql8.0 -p 3307:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0
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