$("#loginBtn").click(function () {
  $.ajax({
    url: "/login",
    data: {
      username: $("#loginId").val(),
      password: $("#loginpwd").val(),
    },
    type: "get",
    success: function (res) {
      console.log(res);
    },
  });
});

$("#signInBtn").click(function () {
  $.ajax({
    url: "/signin",
    data: {
      username: $("#signinId").val(),
      password: $("#signinpwd").val(),
      account: $("#account").val(),
    },
    type: "post",
    success: function (res) {
      console.log(res);
    },
  });
});

//原生ajax封装，类$.ajax
function json2url(json) {
  var arr = [];
  for (var name in json) {
    arr.push(name + "=" + json[name]);
  }
  return arr.join("&");
}
function ajax(json) {
  if (!json.url) {
    alert("必须要地址");
    return;
  }

  json.type = json.type || "get";
  json.data = json.data || {};

  //1、准备一个ajax
  var oAjax = new XMLHttpRequest();
  //2、通过ajax，和后台建立联系
  switch (json.type) {
    case "get":
      //oAjax.open(请求的方式,请求的地址,是否异步)
      oAjax.open(json.type, json.url + "?" + json2url(json.data), true);
      //3、通过ajax发送数据
      oAjax.send();
      break;
    case "post":
      oAjax.open(json.type, json.url, true);
      //把请求头设置成form表单的post请求类型
      oAjax.setRequestHeader(
        "content-type",
        "application/x-www-form-urlencoded"
      );
      oAjax.send(json2url(json.data));
  }

  //4、通过ajax接收数据
  oAjax.onreadystatechange = function () {
    console.log(oAjax.readyState);
    if (oAjax.readyState == 4) {
      //数据完全到了
      if ((oAjax.status >= 200 && oAjax.status < 300) || oAjax.status == 304) {
        //console.log(oAjax.responseText)
        //成功了
        json.success && json.success(oAjax.responseText);
      }
    }
  };
}

$("#signInBtn1").click(function () {
  ajax({
    url: "/signin1",
    data: {
      username: $("#signinId1").val(),
      password: $("#signinpwd1").val(),
      account: $("#account1").val(),
    },
    type: "post",
    success: function (res) {
      console.log(res);
      get();
    },
  });
});

//原生ajax数据传输

//1.准备ajax

var XHR = new XMLHttpRequest();

//2.通过ajax和后台建立联系
XHR.open("get", "/ajaxtest", true);

//3.通过ajax传送数据
XHR.send();

//4.通过ajax接受数据
XHR.onreadystatechange = function () {
  console.log(XHR);
  if (XHR.readyState == 4) {
    if ((XHR.status >= 200 && XHR.status < 300) || XHR.status == 304) {
      console.log(XHR.responseText);
    }
  }
};

var oTbody = document.querySelector("tbody");
//拿到数据并渲染
function get() {
  ajax({
    url: "/get",
    success: function (res) {
      var arr = JSON.parse(res).data;
      console.log("arr", arr);
      oTbody.innerHTML = "";
      for (var i = 0; i < arr.length; i++) {
        var oTr = document.createElement("tr");
        oTr.innerHTML =
          "<td>" +
          arr[i].adminId +
          "</td>\
                                    <td>" +
          arr[i].username +
          "</td>\
                                    <td>" +
          arr[i].adminName +
          '</td>\
                                    <td>\
                                        <button class="del">删除</button>\
                                        <button class="edit">修改</button>\
                                    </td>';
        oTbody.appendChild(oTr);
      }
    },
  });
}
get();

oTbody.onclick = function () {
  if (event.target.className == "del") {
    ajax({
      url: "/del",
      data: {
        id: event.target.parentNode.parentNode.children[0].innerText,
      },
      type: "post",
      success: function (res) {
        console.log(res);
        var json = JSON.parse(res);
        if (!json.error) {
          get();
        }
      },
    });
  }
};
