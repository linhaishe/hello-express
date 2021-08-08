### 项目介绍

1. 此文件主要内容为学习内容

2. 使用 express 和 连接 mysql 数据库使用

3. 进入对应的文件夹后，启动服务器即可，命令为`node server.js`,即可运行相关 demo

### middleware

- 此 demo 文件用于 express 创建的后台，与前台的 js/index.js/ & /public/index.html 文件进行 ajax 操作实验。
- express 作用为创建一个服务器，生成后台接口，通过 ajax 进行数据交互。

1. 安装 express
2. 引入 express
   `var express = require("express");`
3. 创建端口应用对象
   `var app = express();`
4. 引入 mysql
   `var mysql = require("mysql");`
5. 链接 mysql

```
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dormProject",
});

```

3. 创建路由规则

```
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/', (request, response)=>{
    //设置响应
    response.send('HELLO EXPRESS');
});

```

### ajaxDemo

1. 原生 ajax 请求，jquery-ajax 请求，axios-ajax 请求，fetch-ajax 请求的 demo 和笔记

#### 1. 原生 ajax 请求

- readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4。

1. 0 表示数据未初始化
2. 1 表示 open 方法调用完毕
3. 2 表示 send 方法调用完毕
4. 3 表示服务器响应回部分数据
5. 4 表示服务器响应完毕所有数据

- 在状态为 4 的时候判断，因为服务器返回了所有数据

##### get 请求

demolink : 1-get

get 方法随请求发送的方式用问号分割，多个数据用&方法链接

`xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');`

##### post 请求

demolink : 2-post

- 请求体参数放在 send 方法中进行传递
  `xhr.send('a=100&b=200&c=300');`

##### 设置请求头

1. 第一个参数是参数名，第二个参数是参数内容
2. Content-Type ：用于设置请求体内容的类型
3. application/x-www-form-urlencoded ：参数查询字符串类型

```
app.post("/server", (request, response) => {
  //设置响应头  设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");

  //响应头，表明可以接收各种自定义请求头
  response.setHeader("Access-Control-Allow-Headers", "*");

  //设置响应体
  response.send("HELLO AJAX POST");
});

```

使用 app.post 设置好接收所有自定义请求头并传送自定义请求头时，服务器还是显示请求失败，有个 option 回传，因为我们没有任何校验结果传给服务器，所以我们改用 app.all 处理，可以接收任意类型的请求

```
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

//这个请求头会报错，因为这个请求头的名字是自定义的，而不是预定义的，浏览器验证的时候会报错。
xhr.setRequestHeader('name','atguigu');
//error 错误报告为
// Provisional headers are shown
```

```
//使用app.all请求则不会报错
app.all("/server", (request, response) => {
  //设置响应头  设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");
  //响应头
  response.setHeader("Access-Control-Allow-Headers", "*");
  //设置响应体
  response.send("HELLO AJAX POST");
});

```

##### 服务器传送的数据只能是字符串或者是 buffer

demolink : 3-JSON

1. 服务器端需要通过`JSON.stringify();`将对象数据转化为字符串

```
app.all("/json-server", (request, response) => {
  //设置响应头  设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");
  //响应头
  response.setHeader("Access-Control-Allow-Headers", "*");
  //响应一个数据
  const data = {
    name: "atguigu",
  };
  //对对象进行字符串转换
  let str = JSON.stringify(data);
  //设置响应体
  response.send(str);
});
```

2. 请求端有两种法式转换服务器传送的数据

- 1. 手动通过`JSON.parse(xhr.response);`进行转换后再渲染进 html 网页中
- 2. 通过设置响应体数据的类型进行自动转换

` xhr.responseType = 'json';`

```
console.log(xhr.response);
result.innerHTML = xhr.response.name;

```

##### ie 缓存

ie 不会走新的 ajax 请求，因为会有缓存，会从缓存中获取数据

```
xhr.open("GET",'http://127.0.0.1:8000/ie?t='+Date.now());
```

##### 超时与网络异常

首先设置延时响应，设置 1000ms 后才返回数据

```
app.all("/delay", (request, response) => {
  //设置响应头  设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  setTimeout(() => {
    //设置响应体
    response.send("延时响应");
  }, 1000);
});
```

```
 btn.addEventListener('click', function(){
            const xhr = new XMLHttpRequest();

            //超时设置 2s 设置,设置超时时间
            xhr.timeout = 2000;
            //超时回调
            xhr.ontimeout = function(){
                alert("网络异常, 请稍后重试!!");
            }
            //网络异常回调
            xhr.onerror = function(){
                alert("你的网络似乎出了一些问题!");
            }

            xhr.open("GET",'http://127.0.0.1:8000/delay');
            xhr.send();
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status >= 200 && xhr.status< 300){
                        result.innerHTML = xhr.response;
                    }
                }
            }
        })
```

##### 取消请求

```
       //获取元素对象
        const btns = document.querySelectorAll('button');
        let x = null;

        btns[0].onclick = function(){
            x = new XMLHttpRequest();
            x.open("GET",'http://127.0.0.1:8000/delay');
            x.send();
        }

        // abort
        btns[1].onclick = function(){
            //取消请求
            x.abort();
        }
```

##### 重复请求

处理思路为，将上一个请求取消，只留下最新一次的请求

```
   //获取元素对象
        const btns = document.querySelectorAll('button');
        let x = null;
        //标识变量
        let isSending = false; // 是否正在发送AJAX请求

        btns[0].onclick = function(){
            //判断标识变量
            if(isSending) x.abort();// 如果正在发送, 则取消该请求, 创建一个新的请求
            x = new XMLHttpRequest();
            //修改 标识变量的值
            isSending = true;
            x.open("GET",'http://127.0.0.1:8000/delay');
            x.send();
            x.onreadystatechange = function(){
                if(x.readyState === 4){
                    //修改标识变量
                    isSending = false;
                }
            }
        }

        // abort
        btns[1].onclick = function(){
            x.abort();
        }

```
