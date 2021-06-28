//讲解如何处理多个路由
//有多个路由的话，最好分开为更多的文件，方便维护

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//import files
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use(indexRouter);
//http://localhost:3000/users 会返回users
app.use(usersRouter);

// app.get('/',function(req,res,next){
//     res.send('root');
// });

// app.get('/users',function(req,res,next){
//     res.send('users');
// });

app.listen(3000);
console.log("listening to port 3000");
//localhost:3000
