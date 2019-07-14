var express = require('express');

//router()方法
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('root');
});

module.exports = router;