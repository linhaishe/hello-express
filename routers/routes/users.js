var express = require("express");

//router()方法
var router = express.Router();

router.get("/users", function (req, res, next) {
  res.send("users");
});

module.exports = router;
