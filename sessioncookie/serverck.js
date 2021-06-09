const express = require("express");
const app = express();

var session = require("express-session");

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
    cookie: { secure: true },
  })
);

app.get("/login", function () {});
