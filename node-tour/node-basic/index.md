# 6. Node.js REPL 環境

![](../img/nodejs-logo.png)

> 本教材撰寫於 Node.js 版本：v8.9.1

## 6.1 REPL 環境


```shell
$ node
> 1+1
2
>
```

### _

```
> 1 + 1
2
> _ + 1
3
```

##回傳

- 賦值與時

```
> x = 1
1
> var x = 1
```

## 6.2理解 "not defined" / "undefined" / "null"

- not defined --> 該變數不存在
- undefined ----> 該變數存在，但是未賦值
- null ---------> 該變數存在，值為 null
```
// not-defined
> x
ReferenceError: x is not defined
    at repl:1:1
    at sigintHandlersWrap (vm.js:22:35)
    at sigintHandlersWrap (vm.js:96:12)
    at ContextifyScript.Script.runInThisContext (vm.js:21:12)
    at REPLServer.defaultEval (repl.js:346:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.<anonymous> (repl.js:545:10)
    at emitOne (events.js:101:20)
    at REPLServer.emit (events.js:188:7)

// undefined
> var x
> x
undefined

// null
> var y = null
> y
null
```

### 6.2.1 使用 typeof 檢查型別

typeof 運算子會傳回一個字串值, 指出未經運算 (unevaluated) 的運算元所代表的型別。

```
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 雖然是 "Not-A-Number"
typeof Number(1) === 'number'; // 但是不要使用這種方式!

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof 一律會傳回一個字串
typeof String("abc") === 'string'; // 但是不要使用這種方式!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 但是不要使用這種方式!

// Undefined
typeof undefined === 'undefined';
typeof blabla === 'undefined'; // 一個 undefined 變數

// Objects
typeof {a:1} === 'object';
typeof [1, 2, 4] === 'object'; // 請使用 Array.isArray 或者 Object.prototype.toString.call 以區分正規運算式和陣列
typeof new Date() === 'object';

// 注意！
typeof null === 'object';

// 不要這樣用!
typeof new Boolean(true) === 'object'; // 這樣會令人混淆。不要這樣用!
typeof new Number(1) === 'object'; // 這樣會令人混淆。不要這樣用!
typeof new String("abc") === 'object';  // 這樣會令人混淆。不要這樣用!

// Functions
typeof function(){} === 'function';
typeof Math.sin === 'function';
```

### 練習
嘗試輸入以下程式碼並觀察其結果，

```
var a = 1;
var b = 1.123;
var c = 'abc';
var d = {};
var e = [];
var f = function () {};

typeof a
typeof b
typeof c
typeof d
typeof e
typeof f
```

### 6.2.2 問題
- Ｑ：嘗試判斷以下程式碼中的 console 所輸出的類型為何？為什麼？
- Ａ：請以個人為單位，**私訊**你的學號、答案與原因到粉專[**`程式馬`**](https://www.facebook.com/programhorse/)。

```javascript
var a = 1, b, c = null;
b = c;
c = a;
a = 2;
console.log('typeof b=>', typeof b);
```

### 6.2.3 參考連結
- [typeof - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/typeof)

## 6.3 全域變數
- global

```
// 在瀏覽器
var a = 1;
window.a => 1;

// 在 Node
var x = 1;
global.x => undefined;
```

- process
- console

```
console.log(123);

console.info(123);

console.warn(123);

console.time('tag');

console.timeEnd('tag');
```


## 6.4 全域函式

- setTimeout
- clearTimeout
- setInterval
- clearInterval
- Buffer
- `require`

## 6.5 callback

Node 使用 JavaScript 作為開發語言，其特色就是單執行緒，一次只能執行一個任務，所以會使用非同步執行（asynchronous opertion）的方式來達成多個任務的協調。也就是說，每個任務不會是立刻執行，而是輪到前面的處理佇列完成後才執行。

通常 JavaScript 程式都會使用 callback 方式來實作需要等待的任務，如下範例：

```javascript
var callback = function (error, value) {
  if (error) {
    return console.log(error);
  }
  console.log(value);
}

var isTrue = function(value, callback) {
  if (value === true) {
    callback(null, "Value was true.");
  }
  else {
    callback(new Error("Value is not true!"));
  }
}
```

## 6.6 callback 與 try-catch

```javascript
try {
  db.User.get(userId, function(err, user) {
    if(err) {
      throw err
    }
    // ...
  })
} catch(e) {
  console.log(‘Oh no!’);
}
```

![](../img/node-trycatch.png)


## 6.7 錯誤處理

```
function (err, data) {
  if (err) {
    if (!err.noPermission) {
      return next(err);
    }
  }
}
```

## 6.8 執行 .js 檔案

下載 [app.js](./app.js)

```shell
$ node app.js
```

---

## 6.9 練習
- 在 node 環境分別嘗試使用 setTimeout/clearTimeout
- 撰寫九九乘法表：
  - 使用 Node REPL 環境撰寫一套 JavaScript 版本的九九乘法表，使用 `console.log` 輸出結果
  - 命名為 `day2/99.js` 並 PR 該作業
- 回報與討論你的練習結果：`完成` / `失敗，因為...(簡述原因)`

## 6.10 提升

執行環境 (execution content)
- Creation Phase
程式會知道哪裡有用到變數跟函式，並替它們在記憶體留一個位子。
函式在宣告的時候，就被放入了記憶體。
所有變數在建立階段被預設成 undefined
Creation Phase 的時候，包含 Variable Environment, this 和 Outer Environment 都會被建立，而 this 有些情況指向 global environment、有些時候則是指向到某個物件 Object。
Execute Phase

### 範例一

```
// 這是比較好的做法，不依賴 hoisting
var a = 'Hello World';
console.log(a);

function b() {
  console.log('呼叫 b');
}
b();
```

### 範例二

```
console.log(a); // ?
b();

var a = 'Hello World';

function b() {
  console.log('呼叫 b');  // ?
}
```

### 範例三

```
console.log(a); // ?
console.log(b); // ?
b();  // ?

var a = 'Hello World';

var b = function() {
  console.log('呼叫 b');
}
```
## 6.9 範圍

- 顯式宣告變數

```
var value = 1;
```

- 未顯式宣告變數

```
value = 1;
```

### 使用情境

- 強烈建議使用 var 防止同名的區域變數和全域變數之間的衝突。

### 重點提醒

盡量減少使用全域變數，因為如果你使用很多 Javascript 函式庫，免不了使用到同樣名字的全域變數，將導致不可預期的副作用。
對類別語言而言 scope 是什麼？

- global scope
- block scope
```
public class Main {
    int c = 3;
    public void demo(){
        int a = 0;
        if(true){
            int b = 1;
        }

        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
    }
}
```

對 Javascript 而言 scope 是什麼？
- global scope
- function scope


### 範例一
```
var message = 'hi';

if(true){
  var message = 'bye';
  console.log('=== 1 ===');
  console.log(message); // ?
}

console.log('=== 2 ===');
console.log(message); // ?
```

### 範例二

```
var message = 'hi';

function greet() {
  var message = 'bye';
  console.log(message);   // ?
}

console.log('=== 1 ===');
console.log(message); // ?
console.log('=== 2 ===');
greet();
console.log('=== 3 ===');
console.log(message); // ?
```

### 範例三：忽略 var 的情況

```
message = 'hi';

function greet() {
  message = 'bye';
  console.log(message);
}

console.log('=== 1 ===');
console.log(message);
console.log('=== 2 ===');
greet();
console.log('=== 3 ===');
console.log(message);
```

### 範例 4

```
function test(){
  var a = 10
}

if(true){
  var b = 20
}

console.log(a) // a is not defined 存取不到
console.log(b) // 存取得到
```

## 6.10 const/let

![](../img/node-let-const.png)

### 範例1

```
var a = 1;
let b = 1;

function func1() {
  a = 2;
  b = 2;
  c = 2;
  console.log('a@func1', a);
  console.log('b@func1', b);
}
func1();
```

### 範例2

```
const c = 1;

function func2() {
  c = 2;
  console.log('c@func2', c);
}
func2();
```

### 範例3

```
function func3() {
  var d = 3;
  let e = 3;
  const f = 3;
  console.log('d@func3=>', d);
  console.log('e@func3=>', e);
  console.log('f@func3=>', f);
}
func3();

console.log('d=>', d);
console.log('e=>', e);
console.log('f=>', f);
```

### 範例4

```
function test() {
  let a = 10
}

if (true) {
  const b = 20
}

console.log(a) // a is not defined 存取不到
console.log(b) // b is not defined 存取不到
```

### 範例5: array/object

```
const a = 10
a = 20  // TypeError: Assignment to constant variable. 錯誤

const a = []
a[0] = 1

const b = {}
b.foo = 123

```

### 範例 6：let in for

```
for (let i = 0; i < 10; i++) {
  console.log('in for statement: i', i)
}

console.log(i) // ReferenceError: i is not defined(…) 存取不到
```

### 建議
- 盡量使用 const/let，特別是 const
- 不要使用 `,` 在同一行分別宣告多個變數
- 不要在區塊或是函式的的最上方宣告所有變數


# 接下來...
- [回目錄](../SUMMARY.md)
- [認識 Node Module](../node-module/index.md)
