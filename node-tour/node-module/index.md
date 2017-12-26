# 7. Node Module

![](../img/nodejs-logo.png)

> 本教材撰寫於 Node.js 版本：v8.9.1

## 7.1 模組化結構

```
var circle = require('./circle.js');
// 或者
var circle = require('./circle');

var bar = require('bar');
```

## 7.2 核心模組
- http：提供HTTP服务器功能。
- url：解析URL。
- fs：与文件系统交互。
- querystring：解析URL的查询字符串。
- child_process：新建子进程。
- util：提供一系列实用小工具。
- path：处理文件路径。
- crypto：提供加密和解密功能，基本上是对OpenSSL的包装。


## 7.3 自訂模組
```
// module.js

module.exports = function(x) {
    console.log(x);
};
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
