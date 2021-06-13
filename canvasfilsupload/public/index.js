//让用户点击图片上传之后，让用户的图片显示在旁边

var oF = document.getElementById("f1");
var oImg = document.getElementById("img1");
var oBtn = document.getElementById("btn");
var oC = document.querySelector("canvas");
var gd = oC.getContext("2d");

//点击上传图标,点击图片，使其有点击input就上传文件的功能
oImg.onclick = oC.onclick = function () {
  oF.click();
};

//当用户选择图片双击上传的时候
oF.onchange = function () {
  //第一种方式直接formData 添加 post ajax传过去
  //第二种情况。手机照出的相片，质量大，需要通过canvas处理图片
  //判断文件类型
  //不能从input.value中获取上传的文件的信息，oF.files中获取file文件，单选则用第0项，多选使用循环

  //需求，将用户上传的图片画出来，uploadimg图标隐藏起来，将canvas画布显示出来

  //需求 只能上传图片，判断如果是图片才可以上传
  if (oF.files[0].type.split("/")[0] == "image") {
    //由于我们不能直接获取文件地址，我们需要读文件并把文件转化成url地址
    //读文件
    var reader = new FileReader(); //创建一个读文件的对象
    reader.readAsDataURL(oF.files[0]); //把文件转化成base64的数据地址

    reader.onload = function (e) {
      //创建一个img
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        //图片画出来，图片画在画布上
        gd.drawImage(image, 0, 0, oC.width, oC.height);
        oImg.style.display = "none";
        oC.style.display = "block";
      };
    };
  } else {
    alert("请上传图片");
  }
};
//当点击上传的时候，发送ajax
oBtn.onclick = function () {
  var data = oC.toDataURL("image/jpeg", 0.5);
  $.ajax({
    url: "/uploadimg",
    type: "post",
    data: {
      img: data,
    },
    success: function (res) {
      console.log(res);
    },
  });
};
