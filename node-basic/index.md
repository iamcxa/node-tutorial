#  Node.js REPL 環境

![](../img/nodejs-logo.png)

> 本教材撰寫於 Node.js 版本：v8.9.1

## 簡介

#### 參考連結
- [Node.js](https://nodejs.org/en/)

## 安裝與更新
連結到 [`Download | Node.js`](https://nodejs.org/en/download/) 可以下載最新版本的 Node.js 執行環境。

### Example

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

```shell
$ node example.js
```



---

## 練習
- 撰寫九九乘法表：
  - 使用 Node REPL 環境撰寫一套 JavaScript 版本的九九乘法表
  - 到這裡 PR 該作業：
- 執行範例程式：
  - 將 Example 小節的程式碼另存為 `app.js`
  - 透過 Node 執行 `node app.js`
  - 使用瀏覽器開啟 ` http://127.0.0.1:3000/`
  - 回報你看到的內容，並且試著解析程式碼內容
- 回報你的練習結果：`完成` / `失敗，因為...(簡述原因)`