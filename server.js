//知识点：可以响应不同数据类型，JSON，数组，字符串等等

//导入模块函数
var express = require('express');

//形成实例，直接调用方法,给app赋值
var app = express();

// //定义路由，调用方法，方法不止get，还有post，delete等,get是中间件
// app.get('/',function(req,res){
//     //请求和响应根目录
//     //在响应中调用一个send方法，将数据信息响应给浏览器，匿名函数，中间件。
//     //express封装好了一些常用方法
//     //send浏览器发送一串字符串 this is the home page，也可以发送其他数据，json，对象等
//     //可以返回字符串数组等等，查看官方api文档
//     res.send('this is the home page');
// });

//路由参数
//返回json数据
app.get('/',function(req,res){
    //json
    var responseObject = {
        name: "xxxxx"
    };
    //数组
    var responseObject2 = [1,2];
    //数组里放对象
    var responseObject3 = [{ddd:"3333"},{eee:"444"}];
    // res.send(responseObject);
    // res.send(responseObject2);
    res.send(responseObject3);
    //同等于下面那个但不必要，因为express 封装好了功能，会自动执行
    //res.send(JSON.stringifyresponseObject)
    //res.json(responseObject);//调用只能处理json内容的方法
});
//一次只能处理一个数据，比如responseObject,不能同时处理多个数据，该如何解决？

app.listen(3000);
console.log('listening to port 3000');
//localhost:3000

