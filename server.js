//倒入模块函数
var express = require('express');

//形成实例，直接调用方法
var app = express();


//调用方法，方法不止get，还有post
app.get('/',function(req,res){
    res.send('this is the home page');
});

app.listen(3000);