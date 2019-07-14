//导入模块
var express = require('express');

//调用实例
var app = express();

//路由参数

app.get('/profile/:id/user/:name', function (req, res) {
    //获取动态路由数据信息
    console.dir(req, params);
    //dir 是输出一个对象所包含的内容
    //输出动态参数
    //output {id:'1',name:'hd0300'}
    res.send("you requested to see a profile with the name of " + req.params.name);
    //请求name的参数
});
//output you requested to see a profile with the name of hd0300
//可以读取出ID的值，路由的参数是动态的，冒号的表示是动态的
//localhost:3000/profile/1/user/hd0300

//正则表达式
app.get('/ab?cd', function (req, res) {
    res.send('/ab?cd');
})
//问号前面的字符可以出现一次或者不出现，b出现0次或者1次
//localhost:3000/abbcd 则不能成功

//post get 参数请求获取
//查询字符串，使用get请求时，它带有一个参数在地址栏当中，如何获取此参数
app.get('/', function (req, res) {
    console.dir(req.query);
    res.send("home page: " + req.query.find);
});
//localhost:3000?find=hot （find(参数名)，hot(值)
//localhost的参数名find 要和 req.query.find 中的 find 参数名要对应即可

//post请求 表单的上传
//postman 对api模拟请求的工具
//http://localhost:3000
//用body parser处理post的请求
//npm install body-parser
//npm install body-parser --save //会保存到packagejson文件中
//app.use(bodyParser.urlencoded({extended:false})) //中间件
//app.use(bodyParser.json()) //处理json请求

var bodyParser = require('body-parser');
//使用中间件，urlencoded表示对urlencoded的文件的处理，因为我们post的是x-www-form-urlencoded格式，不同上传的方法用不同的方式进行解析
app.use(bodyParser.urlencoded({ extended: false }))
//定义post方法
app.post('/', function (req, res) {
    console.dir(req.body);
    res.send(req.body.name);//表单提交时，key=name,所以填的name
})
//提交不同数据的处理方法是不一样的
//正常的表单提交，不带文件上传的，用x-www-form-urlencoded格式
//from-data 是可以上传文件的方式

//处理json数据，postman 选择 raw， txt选择json
//post内容 {"name":"jjjj"}
//用下面的方法进行对json 的处理
//app.use(bodyParser.json())

//同时处理json和表单内容
// app.post('/', urlencodedParser, function (req, res) {
//     console.dir(req.body);
//     res.send(req.body.name);
// })

// app.post('/upload', jsonParser, function (req, res) {
//     console.dir(req.body);
//     res.send(req.body.name);
// })



//文件的上传
app.get('/form', function (req, res) {
});




app.set('view engine', 'ejs');

app.use(express.static('./public'));

//npm install -g nodemon
//nodemon app.js
app.listen(3000);

console.log('You are listening to port 3000');
