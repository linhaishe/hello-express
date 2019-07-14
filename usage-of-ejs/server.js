var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
//var upload = multer({ dest: 'uploads/' });

var app = express();
app.set('view engine', 'ejs');



var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    console.dir(req.query);
    res.send("home page: " + req.query.find);
});

app.get('/form/:name', function (req, res) {
    var person = req.params.name;
    res.render('form',{person:person});
    //‘form是ejs文件名’，第一个person是自定义的，form中要使用到要传入的动态数据，第二个person是的上一行var person的person
});

app.post('/', urlencodedParser, function (req, res) {
    console.dir(req.body);
    res.send(req.body.name);
});

// app.post('/upload', upload.single('logo'), function (req, res) {
//     res.send({ 'ret_code': 0 });
// });



app.use(express.static('./public'));

app.listen(3000);

console.log('You are listening to port 3000');
