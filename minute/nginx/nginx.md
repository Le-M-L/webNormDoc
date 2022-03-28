# nagin
https://segmentfault.com/a/1190000015092063
# 开启gzip
    gzip on;
    # 开启gzip_static
    # gzip_static 开启后可能会报错，需要安装相应的模块, 具体安装方式可以自行查询
    # 只有这个开启，vue文件打包的.gz文件才会有效果，否则不需要开启gzip进行打包
    gzip_static on;
    gzip_proxied any;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    #如果nginx中使用了多层代理 必须设置这个才可以开启gzip。
    gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary off;
    gzip_disable "MSIE [1-6]\.";

    # 开启 brotli压缩
    # 需要安装对应的nginx模块,具体安装方式可以自行查询
    # 可以与gzip共存不会冲突
    brotli on;
    brotli_comp_level 6;
    brotli_buffers 16 8k;
    brotli_min_length 20;
    brotli_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript image/svg+xml;