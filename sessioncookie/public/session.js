$("#btn").click(function () {
  $.ajax({
    url: "/login",
    data: {
      username: $("#loginId").val(),
      password: $("#loginpwd").val(),
    },
    success: function (res) {
      //json解析后台返回的数据
      var json = res;
      // var json2 = JSON.parse(res);
      console.log("jsonjsonjson", json);
      if (json.error == 1) {
        window.location.href = "./index.html";
        console.log("失败");
      } else {
        window.location.href = "./user.html";
        console.log("登入成功");
      }
    },
  });
});
