### 项目介绍

1. 此文件主要内容为学习内容

2. 使用 express 和 连接 mysql 数据库使用

3. 进入对应的文件夹后，启动服务器即可，命令为`node server.js`,即可运行相关 demo

### middleware

- 此 demo 文件用于 express 创建的后台，与前台的 js/index.js/ & /public/index.html 文件进行 ajax 操作实验。
- express 作用为创建一个服务器，生成后台接口，通过 ajax 进行数据交互。

1. 安装 express
2. 引入 express
   `var express = require("express");`
3. 创建端口应用对象
   `var app = express();`
4. 引入 mysql
   `var mysql = require("mysql");`
5. 链接 mysql

```
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dormProject",
});

```

3. 创建路由规则

```
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/', (request, response)=>{
    //设置响应
    response.send('HELLO EXPRESS');
});

```

### ajaxDemo

1. 原生 ajax 请求，jquery-ajax 请求，axios-ajax 请求，fetch-ajax 请求的 demo 和笔记
