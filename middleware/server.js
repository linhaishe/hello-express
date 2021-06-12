var express = require("express");
const { response } = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

//安装favicon
//npm install serve-favicon
var favicon = require("serve-favicon");

//npm install --save path
// var path = require("path");

//网页图标使用
app.use(favicon("./public/favicon.ico"));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

//use是使用中间件的意思，最简单的用法是直接加一个函数
app.use(function (req, res, next) {
  console.log("first middleware");
  next();
  //用next()函数将结果传递给下一个中间件，若没有则直接结束，不会进行下一步操作，如果下一个中间件是get，且没有next，则会不响应okkkkkkkkkkkkkkrrrrrrrrrrrrrrr
  //next只是参数名，名字可以任意更改
  console.log("first middleware after");
});

//不加路由就表示路径后面随便写什么内容都能到这个页面里面去，这样不安全
app.use(function (req, res, next) {
  console.log("second middleware");
  res.send("okkkkkkkkkkkkkkrrrrrrrrrrrrrrr");
});

//可以加路由，也可以不加
// app.use("/home", function (req, res, next) {
//   console.log("second middleware");
//   res.send("ok");
// });

//会先输出first middleware -> second middleware -> first middleware after

// app.get('/',function(req,res,next){
//     res.send('ok');
// });
//function函数是一个中间件函数，只是运行完之后并没有用到next将结果传递给下一个中间件，所以会直接结束。

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dormProject",
});

// connection.connect();

// connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results[0].solution);
// });

// connection.end();

app.get("/login", function (req, res) {
  console.log("someone login", req.query);
  // if (req.query.username == "aaa" && req.query.password == "111") {
  //   res.json({ error: 0, msg: "登入成功" });
  // } else {
  //   res.json({ error: 1, msg: "登入失败" });
  // }
  var sql =
    "select * from admin where username='" +
    req.query.username +
    "' and pwd ='" +
    req.query.password +
    "'";
  console.log(sql);
  connection.query(sql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      if (data.length) {
        res.json({ error: 0, msg: "登入成功" });
      } else {
        res.json({ error: 1, msg: "登入失败" });
      }
    }
  });
});

app.post("/signin", function (req, res) {
  console.log("有人注册", req.body);
  // var sql =
  //   "select * from admin where username='" +
  //   req.body.username +
  //   "' and pwd ='" +
  //   req.body.password +
  //   "'";

  var insertSql =
    'insert into admin values (null,"' +
    req.body.account +
    '","' +
    req.body.password +
    '",1,"' +
    req.body.username +
    '")';
  console.log("insertSql", insertSql);
  //数据查询
  // connection.query(sql, function (err, data) {
  //   console.log(err, data);
  //   //数据库返回的数据在data里
  //   if (!err) {
  //     if (data.length) {
  //       res.json({ error: 0, msg: "查询成功" });
  //     } else {
  //       res.json({ error: 1, msg: "查询失败" });
  //     }
  //   }
  // });

  //用户数据添加
  connection.query(insertSql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      res.json({ error: 0, msg: "注册成功", data: { id: data.insertId } });
    } else {
      res.json({ error: 1, msg: err });
    }
  });
});

app.post("/signin1", function (req, res) {
  console.log("有人注册", req.body);
  // var sql =
  //   "select * from admin where username='" +
  //   req.body.username +
  //   "' and pwd ='" +
  //   req.body.password +
  //   "'";

  var insertSql =
    'insert into admin values (null,"' +
    req.body.account +
    '","' +
    req.body.password +
    '",1,"' +
    req.body.username +
    '")';
  console.log("insertSql", insertSql);
  //数据查询
  // connection.query(sql, function (err, data) {
  //   console.log(err, data);
  //   //数据库返回的数据在data里
  //   if (!err) {
  //     if (data.length) {
  //       res.json({ error: 0, msg: "查询成功" });
  //     } else {
  //       res.json({ error: 1, msg: "查询失败" });
  //     }
  //   }
  // });

  //用户数据添加
  connection.query(insertSql, function (err, data) {
    console.log(err, data);
    //数据库返回的数据在data里
    if (!err) {
      res.json({ error: 0, msg: "注册成功", data: { id: data.insertId } });
    } else {
      res.json({ error: 1, msg: err });
    }
  });
});

//查询
app.get("/get", function (req, res) {
  var sql = "select * from admin";
  connection.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err });
    } else {
      console.log("请求数据库用户");
      res.json({ error: 0, data: data });
    }
  });
});

app.get("/ajaxtest", function (req, res) {
  //传输数据给前端，使用res.json的方式
  res.json({ testConten: "小小" });
});

//删除
app.post("/del", function (req, res) {
  console.log("req.body", req.body);
  var sql = "delete from admin where adminId=" + req.body.id;

  connection.query(sql, function (err, data) {
    if (err) {
      res.json({ error: 1, msg: err });
    } else {
      res.json({ error: 0, msg: "删除成功" });
    }
  });
});

app.listen(3000);
console.log("listening to port 3000");
//localhost:3000
