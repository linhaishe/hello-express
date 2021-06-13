/**
 * 下载方式
 * 1. 地址链接下载
 * a).<a href="./uploads/a-1623133527718.txt">学习资料</a>
 * a方式会直接打开内容，并不适合下载场景
 * b).<a href="./uploads/a-1623133527718.txt" download="学习资料.txt">学习资料</a>
 * 使用download方法则可实现点击下载的功能
 * 2. ajax下载
 */

//2. ajax下载
$("#a1").click(function () {
  $.ajax({
    url: "/download",
    data: {
      file: "logo-1623575125895",
    },
    success: function (res) {
      console.log(res);
    },
  });
});

// $("#a1").click(function () {
//   ajax({
//     url: "/download",
//     data: {
//       file: "a-1623133527718.txt",
//     },
//     success: function (res) {
//       console.log(res);
//     },
//   });
// });
