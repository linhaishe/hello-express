//引入express
var express = require("express");

//引入post请求配置文件
var bodyParser = require("body-parser");

// 引入自带 路径模块
var path = require("path");
const { request } = require("express");

var app = express();

//设置post为from表单类型
app.use(bodyParser.urlencoded({ extended: false }));
//设置数据的格式是json格式
app.use(bodyParser.json());
//配置session

//配置端口号
app.listen(3000, function () {
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
//这个数组存储链接我的人
var arr = [];
//当有人和我建立关联的时候触发
//on方法,
//传入的参数，ws为当前链接的对象
server.on("connection", function (ws) {
  //ws当前链接的对象，一有人进入服务器后(ws://172.17.7.249:9999)就会到这步骤
  console.log("有人进来了");
  //将链接进来的人存储起来
  arr.push(ws);

  //当有人发送消息的时候，使用ws里的获取消息的方法

  ws.on("message", function (data) {
    //data就是发送过来的消息
    console.log("接收到的数据", data);
    for (var i = 0; i < arr.length; i++) {
      //接收到的信息发送给别人
      arr[i].send(data);
    }
  });

  //断开链接
  ws.on("close", function () {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == ws) {
        arr.splice(i, 1);
        break;
      }
    }
  });
});
