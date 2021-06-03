var express = require("express");
const { response } = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

//安装favicon
//npm install serve-favicon
var express = require("express");
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
//响应静态文件,静态文件放在public文件中
//相当于根目录是public,访问文件直接在路由中输入文件名和后缀
// app.use('/assets',express.static('public'));
//http://localhost:3000/test.png，则可打开图片
//http://localhost:3000/darktheme/dark.png

//use是使用中间件的意思，最简单的用法是直接加一个函数
// app.use(function (req, res, next) {
//   console.log("first middleware");
//   next();
//   //用next()函数将结果传递给下一个中间件，若没有则直接结束，不会进行下一步操作，如果下一个中间件是get，且没有next，则会不响应okkkkkkkkkkkkkkrrrrrrrrrrrrrrr
//   //next只是参数名，名字可以任意更改
//   console.log("first middleware after");
// });

// app.use(function (req, res, next) {
//   console.log("second middleware");
//   res.send("okkkkkkkkkkkkkkrrrrrrrrrrrrrrr");
// });

//可以加路由，也可以不加
// app.use('/home', function (req, res, next) {
//     console.log('second middleware');
//     res.send('ok');
// });
//会先输出first middleware -> second middleware -> irst middleware after

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

app.listen(3000);
console.log("listening to port 3000");
//localhost:3000
