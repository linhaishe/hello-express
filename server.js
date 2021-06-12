//此文件主要内容讲述get,post请求的使用和动态路径值的获取

//导入模块
var express = require("express");

//调用实例
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//路由参数

//动态路由参数获取
app.get("/profile/:id/user/:name", function (req, res) {
  console.log("req.params", req.params);
  res.send(
    "you requested to see a profile with the name of " + req.params.name
  );
});

//路由可以使用正则表达式设置
app.get("/ab?cd", function (req, res) {
  res.send("/ab?cd");
});

//查询字符串，使用get请求时，它带有一个参数在地址栏当中，如何获取此参数
//localhost:3000?find=hot
app.get("/", function (req, res) {
  console.dir(req.query);
  res.send("home page: " + req.query.find);
});

//{ find: 'hot' }

app.get("/dynamicRoute", function (req, res) {
  console.dir(req.query);
  //localhost:3000/dynamicRoute?find=hot
  //{ find: 'hot' }
  res.send("dynamicRoute: " + req.query.find);
});

//定义post方法
app.post("/", function (req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

//get可以接收不同的数据类型返回给前端
app.get("/getData", function (req, res) {
  //json
  var responseObject = {
    name: "xxxxx",
  };
  //数组
  var responseObject2 = [1, 2];
  //数组对象
  var responseObject3 = [{ ddd: "3333" }, { eee: "444" }];
  //string
  var responseObject4 = "this is a string";
  //一次只能处理一个数据，比如responseObject,不能同时处理多个数据，该如何解决？

  res.send(responseObject4);

  //同等于下面那个但不必要，因为express 封装好了功能，会自动执行
  //res.send(JSON.stringifyresponseObject)
  //res.json(responseObject);//调用只能处理json内容的方法
});

//文件的上传
app.get("/form", function (req, res) {});

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.listen(3000);

console.log("You are listening to port 3000");
