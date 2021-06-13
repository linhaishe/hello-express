var express = require("express");
var app = express();

var myRouter = express.Router();

myRouter.get("/download", function (req, res) {
  res.download("./downloadfiles/upload/" + req.query.file);
});

app.listen(3000);

console.log("You are listening to port 3000");
