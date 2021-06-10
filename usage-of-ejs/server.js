var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var multer = require("multer");
//var upload = multer({ dest: 'uploads/' });

var app = express();
//默认将ejs文件放在同级目录views下，你也可以改名字，但是一般不建议
//'ejs'指的是使用的模板模块名称，其他的还有'pug'等等，官方文档可查
app.set("view engine", "ejs");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function (req, res) {
  console.dir(req.query);
  res.send("home page: " + req.query.find);
});

//如何处理想要person，也想要data？处理失败
app.get("/form1/:name", function (req, res) {
  // var person = req.params.name;
  // res.render('form', { person: person });
  //‘form是ejs文件名’，第一个person是自定义的，form中要使用到要传入的动态数据，第二个person是的上一行var person的person
  var data = { age: 29, hobbie: ["eating", "fishing", "fighting"] };
  res.render("form", { data: data });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/", urlencodedParser, function (req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

// app.post('/upload', upload.single('logo'), function (req, res) {
//     res.send({ 'ret_code': 0 });
// });

app.use(express.static("./public"));

app.listen(3000);

console.log("listening to port 3000");
