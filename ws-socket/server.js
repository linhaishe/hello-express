//引入express
var express = require("express");
//引入图标
var favicon = require("serve-favicon");
//引入日志
var morgan = require("morgan");
//引入post请求配置文件
var bodyParser = require("body-parser");
//引入session
var session = require("express-session");
//引入路由
var loginRouter = require("./router/login");
var liuyanbanRouter = require("./router/liuyanban");
var dormRouter = require("./router/dorm");
var file = require("./router/file");
// 引入自带 路径模块
var path = require("path");
const { request } = require("express");
//console.log(__dirname)
//console.log(path.join(__dirname,'http',favicon.ico))
//利用express创建服务器 app就是服务器
var app = express();
//配置静态文件目录
app.use(express.static("http"));
//配置图标
app.use(favicon("./http/favicon.ico"));
//配置日志
app.use(morgan("dev"));
//配置post请求
//设置post为from表单类型
app.use(bodyParser.urlencoded({ extended: false }));
//设置数据的格式是json格式
app.use(bodyParser.json());
//配置session
app.use(
  session({
    secret: "web258", // session的签名
    name: "aaa",
    resave: true, //重新保存
    rolling: true, //更新过期时间
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, //设置过期时间  默认毫秒是单位
  })
);
//接口拦截
app.all("*", function (req, res, next) {
  console.log("session", req.session.user);
  console.log("url", req.url);
  if (req.session.user || req.url.split("?")[0] == "/login") {
    next();
  } else {
    res.json({ error: 2, msh: "请登录" }); //重定向到登录页面
  }
});

//接口配置
app.use(loginRouter);
app.use(liuyanbanRouter);
app.use(dormRouter);
app.use(file);

//配置端口号
app.listen(80, function () {
  console.log("项目启动了");
});
//-----------ws----------------------//
//引入
var ws = require("ws");
//创建ws的服务
var server = new ws.Server({
  host: "172.17.7.249",
  port: 9999,
});
var arr = [];
//当有人和我建立关联的时候触发
server.on("connection", function (ws) {
  //ws当前链接的对象
  console.log("有人进来了");
  arr.push(ws);

  //当有人发送消息的时候
  ws.on("message", function (data) {
    //data就是发送过来的消息
    console.log("接收到的数据", data);
    for (var i = 0; i < arr.length; i++) {
      //给别人发送消息
      arr[i].send(data);
    }
  });
  ////断开链接
  ws.on("close", function () {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == ws) {
        arr.splice(i, 1);
        break;
      }
    }
  });
});
