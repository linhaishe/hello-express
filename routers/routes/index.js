var express = require("express");

//router()方法
var router = express.Router();

router.get("/login", function (req, res) {
  console.log("有人登入了", req.query);
  if (req.query.username == "aaa" && req.query.password == 111) {
    res.json({ error: 0, msg: "登录成功！" });
  } else {
    res.json({ error: 1, msg: "登录失败！" });
  }
});

router.post("/signUp", function (req, res) {
  console.log("有人登入了", req.body);
  if (req.body.username == "aaa" && req.body.password == 111) {
    res.json({ error: 0, msg: "登录成功！" });
  } else {
    res.json({ error: 1, msg: "登录失败！" });
  }
});

module.exports = router;
