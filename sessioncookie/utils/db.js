//引入mysql
var mysql = require('mysql');
//配置mysql
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'web258',
    port:'3306'
  });

module.exports=db;