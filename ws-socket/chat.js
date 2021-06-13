var oBox = document.getElementById("box");
var oS = document.querySelector("span");
var oInp = document.querySelector("input");
var oBtn = document.querySelector("button");
var oA = document.querySelector("a");

//这里还没有写注册和登入的功能，我们先直接进入websocket页面
//登录成功才会进这个页面。进了这个页面用户信息已经有了。
//一进来就链接我的服务器,new出服务接口
//http://172.17.7.223,这里创建的就是ws协议而不是http协议了
var socket = new WebSocket("ws://172.17.7.249:9999");
//发送消息
oBtn.onclick = function () {
  //正常情况下最好能有用户的id，因为用户名是可以重复的
  var msg = {
    name: oS.innerHTML,
    con: oInp.value,
  };
  //有人发消息
  //所有发送的东西都是字符串
  socket.send(JSON.stringify(msg));
};
//接收消息
socket.onopen = function () {
  //建立链接等待消息
  //当消息来的时候
  socket.onmessage = function (data) {
    // data里面的data才是数据
    console.log(data.data);
    //因为获得的是字符串，则用parse解析成json格式
    var json = JSON.parse(data.data);
    var oP = document.createElement("p");
    if (json.name == "heather") {
      oP.className = "myself";
      oP.innerHTML = "<span>" + json.con + "</span>:<b>" + json.name + "</b>";
    } else {
      oP.innerHTML = "<b>" + json.name + "</b>:<span>" + json.con + "</span>";
    }

    oBox.appendChild(oP);
  };
};

//退出
oA.onclick = function () {
  socket.close();
};
