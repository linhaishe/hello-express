var express = require("express");
var bodyParser = require("body-parser");
var upload = require("./utils/multer");
var fs = require("fs"); // nodejs 自带的模块
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var myRouter = express.Router();

myRouter.post("/upload", upload.single("file"), function (req, res) {
  console.log(req);
  // if(req.files.length){
  //     res.json({error:0,files:req.files})
  // }
  if (req.file) {
    res.json({ error: 0, file: req.file.filename });
  }
});

myRouter.get("/download", function (req, res) {
  res.download("./uploads/" + req.query.file);
});

myRouter.post("/uploadimg", function (req, res) {
  console.log(req.body.img);
  //1、如果图片小直接放到数据库
  //2、图片大，保存成本地文件  返回前台文件的路径
  //imgData是一个base64文件
  var imgData = req.body.img;
  //把base64转成本地文件
  //base64转化成文件就是需要把base64的前缀去掉，这件事情，可以前台，可以后台
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  //把base64转化成二进制流文件
  var dataBuffer = Buffer.from(base64Data, "base64");
  //fs读取二进制流文件，保存为本地文件，二进制流文件没有文件名，需要自己设置
  //fs.writeFile(__dirname+'/http/uploads/'+Date.now()+'.jpg')
  var filename = Date.now() + ".jpg";
  fs.writeFile("./uploads/" + filename, dataBuffer, function (err) {
    console.log(err);
    if (err) {
      res.json({ error: 1, msg: "保存失败" });
    } else {
      res.json({ error: 0, msg: "保存成功", data: filename });
    }
  });
});

app.listen(3000, function () {
  console.log("项目启动了");
});
