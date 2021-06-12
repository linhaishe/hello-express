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
      // console.log("jsonjsonjson", json);
      if (json.error == 2) {
        window.location.href = "/login.html";
      }
      document.write("登入成功");
      console.log("成功啊啊啊啊啊");
    },
  });
});
