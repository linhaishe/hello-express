var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
//使用multer进行上传路径的指定，表示当前路径下的uploads这个目录
//上传之后才会创建这个uploads目录，并将上传的文件放到目录中


var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    console.dir(req.query);
    res.send("home page: " + req.query.find);
});

app.get('/form', function (req, res) {
    var form = fs.readFileSync('./form.html', { encoding: "utf8" });
    res.send(form);
});

app.post('/', urlencodedParser, function (req, res) {
    console.dir(req.body);
    res.send(req.body.name);
});

app.post('/upload', upload.single('logo'), function (req, res) {
    //logo是html文件的input的name,因为它要知道哪个文件的标签
    res.send({ 'ret_code': 0 });
});


app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.listen(3000);

console.log('You are listening to port 3000');
