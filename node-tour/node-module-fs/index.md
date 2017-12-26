`fs`是`filesystem`的縮寫，該模塊提供本地文件的讀寫能力，基本上是POSIX文件操作命令的簡單包裝。但是，這個模塊幾乎對所有操作提供異步和同步兩種操作方式，供開發者選擇。

## readFile()，readFileSync()

`readFile`方法用於異步讀取數據。

```javascript
fs.readFile('./image.png', function (err, buffer) {
  if (err) throw err;
  process(buffer);
});
```

`readFile`方法的第一個參數是文件的路徑，可以是絕對路徑，也可以是相對路徑。註意，如果是相對路徑，是相對於當前進程所在的路徑（`process.cwd()`），而不是相對於當前腳本所在的路徑。

`readFile`方法的第二個參數是讀取完成後的回調函數。該函數的第一個參數是發生錯誤時的錯誤對象，第二個參數是代表文件內容的`Buffer`實例。

`readFileSync`方法用於同步讀取文件，返回一個字符串。

```javascript
var text = fs.readFileSync(fileName, 'utf8');

// 將文件按行拆成數組
text.split(/\r?\n/).forEach(function (line) {
  // ...
});
```

`readFileSync`方法的第一個參數是文件路徑，第二個參數可以是一個表示配置的對象，也可以是一個表示文本文件編碼的字符串。默認的配置對象是`{ encoding: null, flag: 'r' }`，即文件編碼默認為`null`，讀取模式默認為`r`（只讀）。如果第二個參數不指定編碼（`encoding`），`readFileSync`方法返回一個`Buffer`實例，否則返回的是一個字符串。

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

`writeFile`方法用於異步寫入文件。

```javascript
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
```

上面代碼中，`writeFile`方法的第一個參數是寫入的文件名，第二個參數是寫入的字符串，第三個參數是回調函數。

回調函數前面，還可以再加一個參數，表示寫入字符串的編碼（默認是`utf8`）。

```javascript
fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

`writeFileSync`方法用於同步寫入文件。

```javascript
fs.writeFileSync(fileName, str, 'utf8');
```

它的第一個參數是文件路徑，第二個參數是寫入文件的字符串，第三個參數是文件編碼，默認為utf8。

## exists(path, callback)

exists方法用來判斷給定路徑是否存在，然後不管結果如何，都會調用回調函數。

```javascript
fs.exists('/path/to/file', function (exists) {
  util.debug(exists ? "it's there" : "no file!");
});
```

上面代碼表明，回調函數的參數是一個表示文件是否存在的布爾值。

需要註意的是，不要在`open`方法之前調用`exists`方法，open方法本身就能檢查文件是否存在。

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

mkdir接受三個參數，第一個是目錄名，第二個是權限值，第三個是回調函數。

writeFile方法用於寫入文件。

```javascript

var fs = require('fs');

fs.writeFile('./helloDir/message.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('文件寫入成功');
});

```

readFile方法用於讀取文件內容。

{% highlight javascript %}

var fs = require('fs');

fs.readFile('./helloDir/message.txt','UTF-8' ,function (err, data) {
  if (err) throw err;
  console.log(data);
});

{% endhighlight %}

上面代碼使用readFile方法讀取文件。readFile方法的第一個參數是文件名，第二個參數是文件編碼，第三個參數是回調函數。可用的文件編碼包括“ascii”、“utf8”和“base64”。如果沒有指定文件編碼，返回的是原始的緩存二進制數據，這時需要調用buffer對象的toString方法，將其轉為字符串。

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

上面代碼會同時發起1000個readFile異步請求，很快就會耗盡系統資源。

## mkdirSync()，writeFileSync()，readFileSync()

這三個方法是建立目錄、寫入文件、讀取文件的同步版本。

{% highlight javascript %}

fs.mkdirSync('./helloDirSync',0777);
fs.writeFileSync('./helloDirSync/message.txt', 'Hello Node');
var data = fs.readFileSync('./helloDirSync/message.txt','UTF-8');
console.log('file created with contents:');
console.log(data);

{% endhighlight %}

對於流量較大的服務器，最好還是采用異步操作，因為同步操作時，只有前一個操作結束，才會開始後一個操作，如果某個操作特別耗時（常常發生在讀寫數據時），會導致整個程序停頓。

## readdir()，readdirSync()

`readdir`方法用於讀取目錄，返回一個所包含的文件和子目錄的數組。

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
        // 對所有文件進行處理
      }
    });
  });
});
```

`readdirSync`方法是`readdir`方法的同步版本。下面是同步列出目錄內容的代碼。

```javascript
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

## stat()

stat方法的參數是一個文件或目錄，它產生一個對象，該對象包含了該文件或目錄的具體信息。我們往往通過該方法，判斷正在處理的到底是一個文件，還是一個目錄。

```javascript
var fs = require('fs');

fs.readdir('/etc/', function (err, files) {
  if (err) throw err;

  files.forEach( function (file) {
    fs.stat('/etc/' + file, function (err, stats) {
      if (err) throw err;

      if (stats.isFile()) {
        console.log("%s is file", file);
      }
      else if (stats.isDirectory ()) {
      console.log("%s is a directory", file);
      }
    console.log('stats:  %s',JSON.stringify(stats));
    });
  });
});
```

## watchfile()，unwatchfile()

watchfile方法監聽一個文件，如果該文件發生變化，就會自動觸發回調函數。

```javascript
var fs = require('fs');

fs.watchFile('./testFile.txt', function (curr, prev) {
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});

fs.writeFile('./testFile.txt', "changed", function (err) {
  if (err) throw err;

  console.log("file write complete");   
});
```

`unwatchfile`方法用於解除對文件的監聽。

## createReadStream()

`createReadStream`方法往往用於打開大型的文本文件，創建一個讀取操作的數據流。所謂大型文本文件，指的是文本文件的體積很大，讀取操作的緩存裝不下，只能分成幾次發送，每次發送會觸發一個`data`事件，發送結束會觸發`end`事件。

```javascript
var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
}

var input = fs.createReadStream('lines.txt');
readLines(input, func);
```

## createWriteStream()

`createWriteStream`方法創建一個寫入數據流對象，該對象的`write`方法用於寫入數據，`end`方法用於結束寫入操作。

```javascript
var out = fs.createWriteStream(fileName, {
  encoding: 'utf8'
});
out.write(str);
out.end();
```

`createWriteStream`方法和`createReadStream`方法配合，可以實現拷貝大型文件。

```javascript
function fileCopy(filename1, filename2, done) {
  var input = fs.createReadStream(filename1);
  var output = fs.createWriteStream(filename2);

  input.on('data', function(d) { output.write(d); });
  input.on('error', function(err) { throw err; });
  input.on('end', function() {
    output.end();
    if (done) done();
  });
}
```

# 接下來...
- [回目錄](../SUMMARY.md)
- [Node Module - http](../node-module-http/index.md)