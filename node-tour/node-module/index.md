# 7. Node Module

![](../img/nodejs-logo.png)

> 本教材撰寫於 Node.js 版本：v8.9.1

## 7.1 模組化結構

```
var circle = require('./circle.js');
// or
var circle = require('./circle');

var bar = require('bar');
```

## 7.2 核心模組
- [http](https://nodejs.org/api/http.html)：提供 http server
- [url](https://nodejs.org/api/url.html)：解析URL。
- [fs](https://nodejs.org/api/fs.html)：讀寫檔案系統
- [child_process](https://nodejs.org/api/child_process.html)：用來執行新的子處理程序
- [util](https://nodejs.org/api/util.html)：工具類別
- [path](https://nodejs.org/api/path.html)：處理模組路徑
- [crypto](https://nodejs.org/api/crypto.html)：處理加密

## 7.3 自訂模組


### function

```
// module.js
module.exports = function(x) {
    console.log(x);
};

// index.js
var m = require('./foo');

m("這是一個自訂模組");

// 執行
$ node index.js
這是一個自訂模組
```

### object

```
// foo.js

var out = new Object();

function p(string) {
  console.log(string);
}

out.print = p;

module.exports = out;
```


---

## 7.4 練習
- 將資料 JSON [獨立文化書店](https://cloud.culture.tw/frontsite/trans/emapOpenDataAction.do?method=exportEmapJson&typeId=M) 撰寫為一模組，命名為 `data.json`。（[來源](https://data.gov.tw/dataset/6224)）
- 使用 npm install `lodash`，然後使用 `find` 取得 cityName 欄位中含有 `臺中市` 的所有資料。
- 將 `console.info` / `console.time` / `console.count` 包裝為一個叫做 `log` 的 module。
- 最後透過 `log.info` 印出所有結果，並透過 `log.time` 計算耗費時間，同時使用 `log.count` 統計筆數。
- 將專案命名為 `day2/module` 並 PR 該作業。

# 接下來...
- [回目錄](../SUMMARY.md)
- [Node Module - http](../node-module-http/index.md)
