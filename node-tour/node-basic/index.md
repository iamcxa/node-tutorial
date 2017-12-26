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

# 接下來...
- [回目錄](../SUMMARY.md)
- [認識 Node Module](../node-module/index.md)
