var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var multer = require("multer");
// var upload = multer({ dest: "uploads/" });
//使用multer进行上传路径的指定，表示当前路径下的uploads这个目录
//上传之后才会创建这个uploads目录，并将上传的文件放到目录中

//创建保存的目录

var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = "./upload/";
createFolder(uploadFolder);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.fieldname + "-" + Date.now());
  },
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage });

var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function (req, res) {
  console.dir(req.query);
  res.send("home page:请进入 form路径中到达表单上传的页面 " + req.query.find);
});

app.get("/form", function (req, res) {
  //读取文件内容
  var form = fs.readFileSync("./form.html", { encoding: "utf8" });
  res.send(form);
  //以上等同于res.sendFile(__dirname+'/form.html');
  // var person = req.params.name;
  // res.sendFile(__dirname + "/form.html");
  //传递动态的数据，比如变量，比如将person传递到html文件中，则需要用到模版引擎，将变量数据通过模板引擎放入html文件中，可以嵌入动态的数据
  //ejs模板引擎
});

app.post("/", urlencodedParser, function (req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});
//upload.single("logo")
app.post("/upload", upload.array("logo", 2), function (req, res) {
  //logo是html文件的input的name,因为它要知道哪个文件的标签
  console.log(req.file);
  res.send({ ret_code: 0 });
});

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.listen(3000);
console.log("You are listening to port 3000");
