var oBox = document.getElementById("box");
var oS = document.querySelector("span");
var oInp = document.querySelector("input");
var oBtn = document.querySelector("button");
var oA = document.querySelector("a");

//登录成功才会进这个页面。进了这个页面用户信息已经有了。
//一进来就链接
var socket = new WebSocket("ws://172.17.7.223:9999");
//发送消息
oBtn.onclick = function () {
  var msg = {
    name: oS.innerHTML,
    con: oInp.value,
  };
  socket.send(JSON.stringify(msg)); //发送的是字符串
};
//接收消息
socket.onopen = function () {
  //建立链接等待消息
  //当消息来的时候
  socket.onmessage = function (data) {
    // data里面的data才是数据
    console.log(data.data);
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
