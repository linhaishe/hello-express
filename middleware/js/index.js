//访问不到js文件夹下的js，引入后会显示找不到文件夹，只能将js文件移动到public文件内
//在中间件express中，会将所有静态页面的文档放在一个公共的文件夹中，取名public

//jquery使用方式

// #region

$("#loginBtn").click(function () {
  $.ajax({
    url: "/ajaxtext",
    data: {
      username: $("#loginId").val(),
      password: $("#loginpwd").val(),
    },
    success: function (res) {
      console.log(res);
    },
  });
});

// #endregion
