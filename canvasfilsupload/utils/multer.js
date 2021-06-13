var multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {//指定的硬盘路径
      cb(null,'./uploads')
    },
    filename: function (req, file, cb) { //修改文件名
        console.log('file',file); //新建文件-123123123.xls
        var file=file.originalname;
        var index=file.lastIndexOf('.');
        var res=file.substring(0,index)+'-'+Date.now()+file.substring(index);
      cb(null, res)
    }
})
  var upload = multer({ storage: storage })

  module.exports=upload;
