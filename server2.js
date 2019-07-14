//导入模块
var express = require('express');
var todoController = require('./controllers/todoController');

//调用实例
var app = express();

//路由参数

app.get('/profile/:id/user/:name',function(req,res){
    //获取动态路由数据信息
    console.dir(req,params);
    //dir 是输出一个对象所包含的内容
    //输出动态参数
    //output {id:'1',name:'hd0300'}
    res.send("you requested to see a profile with the name of " + req.params.name);
    //请求name的参数
});
//output you requested to see a profile with the name of hd0300
//可以读取出ID的值，路由的参数是动态的，冒号的表示是动态的
//localhost:3000/profile/1/user/hd0300

//查询字符串，使用get请求时，它带有一个参数在地址栏当中，如何获取此参数
app.get('/',function(req,res){
    console.dir(req.query);
    res.send("home page: " + req.query.find );
});
//localhost:3000?find=hot （find(参数名)，hot(值)
//localhost的参数名find 要和 req.query.find 中的 find 参数名要对应即可

//post请求 表单的上传
//postman 对api模拟请求的工具
//app.use(bodyParser.urlencoded({extended:false})) //中间件
//app.use(bodyParser.json()) //处理json请求
app.post('/',function(req,res){
    console.dir(req.body);
    res.send(req.body.name);//表单提交时，key=name,所以填的name
})
//提交不同数据的处理方法是不一样的
//正常的表单提交，不带文件上传的，x-www-form-urlencoded

//文件的上传
app.get('/form',function(req,res){
});




app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);

//npm install -g nodemon
//nodemon app.js
app.listen(3000);

console.log('You are listening to port 3000');
