const express = require("express");
var session = require("express-session");

const app = express();

app.use(express.static("public"));

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("trust proxy", 1); // trust first proxy
//session的配置要放在接口前面，server内容真的很注意顺序！！！！！
app.use(
  session({
    //密钥保存是根据secret+userinfo
    secret: "keyboard cat",
    //是否重新保存
    resave: true,
    //更新过期时间
    rolling: true,
    saveUninitialized: true,
    //设置过期时间 maxAge
    cookie: { maxAge: 60000 },
  })
);

// console.log("sessionsession", session);
/*
//接口拦截
app.all("*", function (req, res, next) {
  console.log("session", req.session);
  console.log("url", req.url);
  if (req.session.user || req.url.split("?")[0] == "/login") {
    next();
  } else {
    res.json({ error: 2, msh: "请登录" }); //重定向到登录页面
  }
});
*/
var loginRouter = require("./routers/login");
app.use(loginRouter);

app.listen(3000);

console.log("You are listening to port 3000");
