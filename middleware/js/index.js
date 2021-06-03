//访问不到js文件夹下的js，引入后会显示找不到文件夹，只能将js文件移动到public文件内

$("#loginBtn").click(function () {
  $.ajax({
    url: "/login",
    data: {
      username: $("#loginId").val(),
      password: $("#loginpwd").val(),
    },
    success: function (res) {
      console.log(res);
    },
  });
});
