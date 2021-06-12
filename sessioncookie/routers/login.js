var express = require("express");

var myRouter = express.Router();
//引入db
var db = require("../utils/db");

/*
//session 判断在数据库数据搜索后返回的区间进行判断
//登录
myRouter.get("/loginWithMysql", function (request, response) {
  //request 前端给后台发送的东西
  //response 后台给前端返回的东西
  console.log(1);
  console.log("有人登录了", request.query);
  // if(request.query.username=='aaa' && request.query.password=='111'){
  //     response.json({error:0,msg:'登录成功'})
  // }else{
  //     response.json({error:1,msg:'登录失败'})
  // }
  var sql =
    'select * from user where username="' +
    request.query.username +
    '" and password="' +
    request.query.password +
    '"';

  db.query(sql, function (err, data) {
    //console.log(err,data);
    if (!err) {
      if (data.length) {
        //request.session.user=request.query.username;
        //从数据库搜索数据，将用户数据返回，存入session中，并JSON.stringify
        request.session.user = JSON.stringify(data[0]);
        response.json({ error: 0, msg: "登录成功" });
      } else {
        response.json({ error: 1, msg: "登录失败" });
      }
    }
  });
});
//注册
myRouter.route("/register").post(function (request, response) {
  //console.log('有人注册了',req.query,req.body)
  if (request.body.username == "aaa" && request.body.password == "111") {
    response.json({ error: 0, msg: "注册成功" });
  } else {
    response.json({ error: 1, msg: "注册失败" });
  }
});
*/

var obj;

myRouter.get("/login", function (req, res) {
  //数据库内容
  var userInfo = {
    name: "heather",
    pwd: 123,
  };
  //直接获取数据存储在session中
  console.log("数据数据", req.session);
  obj = req.session;
  obj.user = userInfo;
  console.log("objobj", obj);

  if (obj.username == userInfo.name && obj.password == userInfo.pwd) {
    console.log("req.session", req.session);
    //   obj.user = JSON.stringify(userInfo);
    res.json({ error: 0, msg: "登录成功" });
  } else {
    res.json({ error: 1, msg: "注册失败" });
  }
});
module.exports = myRouter;
