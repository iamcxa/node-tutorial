# File System


## readFile()，readFileSync()

`readFile`方法用於異步讀取數據。

```javascript
var fs = require('fs');
 
fs.readFile('TestFile.txt', function (err, data) {
    if (err) throw err;
 
    console.log(data.toString());
});
```

`readFile`方法的第一個參數是檔案的路徑，可以是絕對路徑，也可以是相對路徑。註意，如果是相對路徑，是相對於當前進程所在的路徑（`process.cwd()`），而不是相對於當前腳本所在的路徑。

`readFile`方法的第二個參數是讀取完成後的 callback 函數。該函數的第一個參數是發生錯誤時的錯誤對象，第二個參數是代表檔案內容的`Buffer`實例。

`readFileSync`方法用於同步讀取檔案，返回一個字串。

```javascript
var text = fs.readFileSync(fileName, 'utf8');

// 將檔案按行拆成數組
text.split(/\r?\n/).forEach(function (line) {
  console.log(line);
});
```

`readFileSync`方法的第一個參數是檔案路徑，第二個參數可以是一個表示配置的對象，也可以是一個表示文本檔案編碼的字串。默認的配置對象是`{ encoding: null, flag: 'r' }`，即檔案編碼默認為`null`，讀取模式默認為`r`（只讀）。如果第二個參數不指定編碼（`encoding`），`readFileSync`方法返回一個`Buffer`實例，否則返回的是一個字串。

不同系統的行結尾字符不同，可以用下面的方法判斷。

```javascript
// 方法一，查詢現有的行結尾字符
var EOL =
  fileContents.indexOf('\r\n') >= 0 ? '\r\n' : '\n';

// 方法二，根據當前系統處理
var EOL =
  (process.platform === 'win32' ? '\r\n' : '\n');
```

## writeFile()，writeFileSync()

`writeFile`方法用於異步寫入檔案。

```javascript
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
```

上面範例中，`writeFile`方法的第一個參數是寫入的檔案名，第二個參數是寫入的字串，第三個參數是 callback 函數。

 callback 函數前面，還可以再加一個參數，表示寫入字串的編碼（默認是`utf8`）。

```javascript
fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

`writeFileSync`方法用於同步寫入檔案。

```javascript
fs.writeFileSync(fileName, str, 'utf8');
```

它的第一個參數是檔案路徑，第二個參數是寫入檔案的字串，第三個參數是檔案編碼，默認為utf8。

## exists(path, callback)

exists方法用來判斷給定路徑是否存在，然後不管結果如何，都會調用 callback 函數。

```javascript
fs.exists('/path/to/file', function (exists) {
  util.debug(exists ? "it's there" : "no file!");
});
```

上面範例表明， callback 函數的參數是一個表示檔案是否存在的 boolean 值。

需要註意的是，不要在`open`方法之前調用`exists`方法，open方法本身就能檢查檔案是否存在。

下面的例子是如果給定目錄存在，就刪除它。

```javascript
if (fs.existsSync(outputFolder)) {
  console.log('Removing ' + outputFolder);
  fs.rmdirSync(outputFolder);
}
```

## mkdir()，writeFile()，readFile()

mkdir方法用於新建目錄。

```javascript

var fs = require('fs');

fs.mkdir('./helloDir',0777, function (err) {
  if (err) throw err;
});

```

mkdir接受三個參數，第一個是目錄名，第二個是權限值，第三個是 callback 函數。

writeFile方法用於寫入檔案。

```javascript

var fs = require('fs');

fs.writeFile('./helloDir/message.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('檔案寫入成功');
});

```

readFile方法用於讀取檔案內容。

```
var fs = require('fs');

fs.readFile('./helloDir/message.txt','UTF-8' ,function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

readFile方法的第一個參數是檔案名，第二個參數是檔案編碼，第三個參數是 callback 函數。可用的檔案編碼包括“ascii”、“utf8”和“base64”。如果沒有指定檔案編碼，返回的是原始的緩存二進制數據，這時需要調用buffer對象的toString方法，將其轉為字串。

```javascript

var fs = require('fs');
fs.readFile('example_log.txt', function (err, logData) {
  if (err) throw err;
  var text = logData.toString();
});

```

readFile方法是異步操作，所以必須小心，不要同時發起多個readFile請求。

```js
for(var i = 1; i <= 1000; i++) {
  fs.readFile('./'+i+'.txt', function() {
     // do something with the file
  });
}
```

上面範例會同時發起1000個readFile異步請求，很快就會耗盡系統資源。

## mkdirSync()，writeFileSync()，readFileSync()

這三個方法是建立目錄、寫入檔案、讀取檔案的同步版本。

```javascript
fs.mkdirSync('./helloDirSync',0777);
fs.writeFileSync('./helloDirSync/message.txt', 'Hello Node');
var data = fs.readFileSync('./helloDirSync/message.txt','UTF-8');
console.log('file created with contents:');
console.log(data);
```

對於流量較大的服務器，最好還是采用異步操作，因為同步操作時，只有前一個操作結束，才會開始後一個操作，如果某個操作特別耗時（常常發生在讀寫數據時），會導致整個程序停頓。

## readdir()，readdirSync()

`readdir`方法用於讀取目錄，返回一個所包含的檔案和子目錄的數組。

```javascript
fs.readdir(process.cwd(), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var count = files.length;
  var results = {};
  files.forEach(function (filename) {
    fs.readFile(filename, function (data) {
      results[filename] = data;
      count--;
      if (count <= 0) {
        // 對所有檔案進行處理
      }
    });
  });
});
```

`readdirSync`方法是`readdir`方法的同步版本。下面是同步列出目錄內容的範例。

```javascript
var dir = './';
var files = fs.readdirSync(dir);
files.forEach(function (filename) {
  var fullname = path.join(dir,filename);
  var stats = fs.statSync(fullname);
  if (stats.isDirectory()) filename += '/';
  process.stdout.write(filename + '\t' +
    stats.size + '\t' +
    stats.mtime + '\n'
  );
});
```

# 接下來...
- [回目錄](../SUMMARY.md)
- [Node Module - http](../node-module-http/index.md)