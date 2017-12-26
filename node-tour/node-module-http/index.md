## http.STATUS_CODES

`http.STATUS_CODES`是一個對象，屬性名都是狀態碼，屬性值則是該狀態碼的簡短解釋。

```javascript
require('http').STATUS_CODES['301']
// "Moved Permanently"
```

## 基本用法

### 處理GET請求

`http` 模組主要用於搭建HTTP服務。使用Node搭建HTTP服務器非常簡單。

```javascript
var http = require('http');

http.createServer(function (request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Hello World");
  response.end();
}).listen(8080, '127.0.0.1');

console.log('Server running on port 8080.');

// 另一種寫法
function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(process.env.PORT);
```

程式碼第一行`var http = require("http")`，表示加載`http` 模組。然後，調用`http` 模組的`createServer`方法，創造一個服務器實例。

`ceateServer`方法接受一個函數作為參數，該函數的`request`參數是一個對象，表示客戶端的HTTP請求；`response`參數也是一個對象，表示服務器端的HTTP回應。`response.writeHead`方法用來寫入HTTP回應的頭信息；`response.end`方法用來寫入HTTP回應的具體內容，以及回應完成後關閉本次對話。最後的`listen(8080)`表示啟動服務器實例，監聽本機的8080端口。

將上面這幾行程式碼保存成文件`app.js`，然後執行該腳本，服務器就開始運行了。

```bash
$ node app.js
```

這時命令行窗口將顯示一行提示“Server running at port 8080.”。打開瀏覽器，訪問http://localhost:8080，網頁顯示“Hello world!”。

上面的例子是收到請求後生成網頁，也可以事前寫好網頁，存在文件中，然後利用`fs` 模組讀取網頁文件，將其返回。

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function (request, response){
  fs.readFile('data.txt', function readData(err, data) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(data);
  });

  // 或者

  fs.createReadStream(`${__dirname}/index.html`).pipe(response);
}).listen(8080, '127.0.0.1');

console.log('Server running on port 8080.');
```

下面的修改則是根據不同網址的請求，顯示不同的內容，已經相當於做出一個網站的雛形了。

```javascript
var http = require('http');

http.createServer(function(req, res) {

  // 主頁
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the homepage!");
  }

  // About頁面
  else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the about page!");
  }

  // 404錯誤
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 error! File not found.");
  }

}).listen(8080, "localhost");
```

### request 對象

`createServer`方法的回調函數的第一個參數是一個`request`對象，擁有以下屬性。

- `url`：發出請求的網址。
- `method`：HTTP請求的方法。
- `headers`：HTTP請求的所有HTTP頭信息。

下面的例子是獲取請求的路徑名。

```javascript
var url = require('url');
var pathname = url.parse(request.url).pathname;
```

`setEncoding()`方法用於設置請求的編碼。

```javascript
request.setEncoding("utf8");
```

`addListener()`方法用於為請求添加監聽事件的回調函數。

```javascript
var querystring = require('querystring');
var postData = '';

request.addListener('data', function (postDataChunk) {
  postData += postDataChunk;
});

request.addListener('end', function () {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("You've sent the text: " + querystring.parse(postData).text);
  response.end();
});
```

### 處理異步操作

遇到異步操作時，會先處理後面的請求，等到當前請求有了結果以後，再返回結果。

```javascript
var exec = require("child_process").exec;

exec('ls -lah', function (error, stdout, stderr) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(stdout);
  response.end();
});
```

### 處理POST請求

當客戶端采用POST方法發送數據時，服務器端可以對data和end兩個事件，設立監聽函數。

{% highlight javascript %}

var http = require('http');

http.createServer(function (req, res) {
  var content = "";

  req.on('data', function (chunk) {
    content += chunk;
  });

  req.on('end', function () {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("You've sent: " + content);
    res.end();
  });

}).listen(8080);

{% endhighlight %}

data事件會在數據接收過程中，每收到一段數據就觸發一次，接收到的數據被傳入回調函數。end事件則是在所有數據接收完成後觸發。

對上面程式碼稍加修改，就可以做出文件上傳的功能。

```javascript

"use strict";

var http = require('http');
var fs = require('fs');
var destinationFile, fileSize, uploadedBytes;

http.createServer(function (request, response) {
  response.writeHead(200);
  destinationFile = fs.createWriteStream("destination.md");
  request.pipe(destinationFile);
  fileSize = request.headers['content-length'];
  uploadedBytes = 0;

  request.on('data', function (d) {
    uploadedBytes += d.length;
    var p = (uploadedBytes / fileSize) * 100;
    response.write("Uploading " + parseInt(p, 0) + " %\n");
  });

  request.on('end', function () {
    response.end("File Upload Complete");
  });
}).listen(3030, function () {
  console.log("server started");
});

```

## 發出請求

### get()

get方法用於發出get請求。

```javascript
function getTestPersonaLoginCredentials(callback) {
  return http.get({
    host: 'personatestuser.org',
    path: '/email'
  }, function(response) {
    var body = '';

    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      var parsed = JSON.parse(body);
      callback({
        email: parsed.email,
        password: parsed.pass
      });
    });
  });
},
```

### request()

request方法用於發出HTTP請求，它的使用格式如下。

```javascript
http.request(options[, callback])
```

request方法的options參數，可以是一個對象，也可以是一個字符串。如果是字符串，就表示這是一個URL，Node內部就會自動調用`url.parse()`，處理這個參數。

options對象可以設置如下屬性。

- host：HTTP請求所發往的域名或者IP地址，默認是localhost。
- hostname：該屬性會被`url.parse()`解析，優先級高於host。
- port：遠程服務器的端口，默認是80。
- localAddress：本地網絡接口。
- socketPath：Unix網絡套接字，格式為host:port或者socketPath。
- method：指定HTTP請求的方法，格式為字符串，默認為GET。
- path：指定HTTP請求的路徑，默認為根路徑（/）。可以在這個屬性裏面，指定查詢字符串，比如`/index.html?page=12`。如果這個屬性裏面包含非法字符（比如空格），就會拋出一個錯誤。
- headers：一個對象，包含了HTTP請求的頭信息。
- auth：一個代表HTTP基本認證的字符串`user:password`。
- agent：控制緩存行為，如果HTTP請求使用了agent，則HTTP請求默認為`Connection: keep-alive`，它的可能值如下：
  - undefined（默認）：對當前host和port，使用全局Agent。
  - Agent：一個對象，會傳入agent屬性。
  - false：不緩存連接，默認HTTP請求為`Connection: close`。
- keepAlive：一個布爾值，表示是否保留socket供未來其他請求使用，默認等於false。
- keepAliveMsecs：一個整數，當使用KeepAlive的時候，設置多久發送一個TCP KeepAlive包，使得連接不要被關閉。默認等於1000，只有keepAlive設為true的時候，該設置才有意義。

request方法的callback參數是可選的，在response事件發生時觸發，而且只觸發一次。

`http.request()`返回一個`http.ClientRequest`類的實例。它是一個可寫數據流，如果你想通過POST方法發送一個文件，可以將文件寫入這個ClientRequest對象。

下面是發送POST請求的一個例子。

```javascript
var postData = querystring.stringify({
  'msg' : 'Hello World!'
});

var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();
```

註意，上面程式碼中，`req.end()`必須被調用，即使沒有在請求體內寫入任何數據，也必須調用。因為這表示已經完成HTTP請求。

發送過程的任何錯誤（DNS錯誤、TCP錯誤、HTTP解析錯誤），都會在request對象上觸發error事件。

## Server()

`Server`方法用於新建一個服務器實例。

```javascript
var http = require('http');
var fs = require('fs');

var server = new http.Server();
server.listen(8000);

server.on('request', function (request, response) {
  // 解析請求的URL
  var url = require('url').parse(request.url);
  if (url.pathname === '/test/1') {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
    response.write('Hello');
    response.end();
  } else if (url.pathname === '/test/2') {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
    response.write(request.method + ' ' + request.url +
      ' HTTP/' + request.httpVersion + '\r\n');
    for (var h in request.headers) {
      response.write(h + ': ' + request.headers[h] + '\r\n');
    }
    response.write('\r\n');
    request.on('data', function(chunk) { response.write(chunk); });
    request.on('end', function(chunk) { response.end(); });
  } else {
    var filename = url.pathname.substring(1);
    var type;
    switch(filename.substring(filename.lastIndexOf('.') + 1))  {
      case 'html':
      case 'htm':      type = 'text/html; charset=UTF-8'; break;
      case 'js':       type = 'application/javascript; charset=UTF-8'; break;
      case 'css':      type = 'text/css; charset=UTF-8'; break;
      case 'txt' :     type = 'text/plain; charset=UTF-8'; break;
      case 'manifest': type = 'text/cache-manifest; charset=UTF-8'; break;
      default:         type = 'application/octet-stream'; break;
    }
    fs.readFile(filename, function (err, content) {
      if (err) {
        response.writeHead(404, {
          'Content-Type': 'text/plain; charset=UTF-8'});
        response.write(err.message);
        response.end();
      } else {
        response.writeHead(200, {'Content-Type': type});
        response.write(content);
        response.end();
      }
    });
  }
});
```

`listen`方法用於啟動服務器，它可以接受多種參數。

```javascript
var server = new http.Server();

// 端口
server.listen(8000);

// 端口，主機
server.listen(8000, 'localhost');

// 對象
server.listen({
  port: 8000,
  host: 'localhost',
})
```

以上三種寫法都是合法的。

## 搭建HTTPs服務器

搭建HTTPs服務器需要有SSL證書。對於向公眾提供服務的網站，SSL證書需要向證書頒發機構購買；對於自用的網站，可以自制。

自制SSL證書需要OpenSSL，具體命令如下。

```bash
$ openssl genrsa -out key.pem
$ openssl req -new -key key.pem -out csr.pem
$ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
$ rm csr.pem
```

上面的命令生成兩個文件：ert.pem（證書文件）和 key.pem（私鑰文件）。有了這兩個文件，就可以運行HTTPs服務器了。

Node內置Https支持。

```javascript
var server = https.createServer({
  key: privateKey,
  cert: certificate,
  ca: certificateAuthorityCertificate
}, app);
```

Node.js提供一個https 模組，專門用於處理加密訪問。

```javascript
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var a = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);
```

上面程式碼顯示，HTTPs服務器與HTTP服務器的最大區別，就是createServer方法多了一個options參數。運行以後，就可以測試是否能夠正常訪問。

{% highlight bash %}

curl -k https://localhost:8000

{% endhighlight %}

##  模組屬性

（1）HTTP請求的屬性

- headers：HTTP請求的頭信息。
- url：請求的路徑。

##  模組方法

（1）http 模組的方法

- createServer(callback)：創造服務器實例。

（2）服務器實例的方法

- listen(port)：啟動服務器監聽指定端口。

（3）HTTP回應的方法

- setHeader(key, value)：指定HTTP頭信息。
- write(str)：指定HTTP回應的內容。
- end()：發送HTTP回應。


# 接下來...
- [回目錄](../SUMMARY.md)
- [Node Module - fs](../node-module-fs/index.md)