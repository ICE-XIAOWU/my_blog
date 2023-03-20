# 1. 事件循环

### 1.1 进程和线程的概念

- 进程（process）：计算机中运行的程序，是操作系统管理程序的一种方式；
  - 可以理解为当启动一个应用程序时，就会默认启动一个线程；
- 线程（thread）：操作系统能够运行运算调度的最小单位，通常情况下被包括在线程之中；
  - 在每一个进程中，至少会启动一个线程来执行程序中的代码，而该线程则被称之为主线程；
  - 也可以理解进程就是线程的容器；
- 例子解释：
  - 进程就是一个大超市，超市里有许多的工作人员；
  - 而工作人员就是线程，负责处理超市的工作；
- ![image-20220719154119338](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/image-20220719154119338.png)

### 1.2 浏览器的JS线程

- JS时单线程序的程序，但是JS线程也会有自己的容器，一般的容器**进程为浏览器或node**；
- 浏览器时一个多进程的软件：
  - 在打开一个标签页的时候，就会开启一个新进程，这也是为了防止一个页面卡死需要推出浏览器；
  - 而每个进程中，又有许多线程，**其中就包括执行JS的线程；**
- JS代码在单线程的执行：
  - 由于JS的代码是在一个单独的线程执行的，因此在同一个时间中，只能做一件事；
  - 如果有一件事耗时十分久，则代表了当前的线程被阻塞了；
  - **但在浏览器中，十分耗时的事件通常由浏览器来帮助JS来完成；**
    - 因为浏览器的每个进程是多线程的，则其他线程即可帮助完成这个耗时的操作；
    - 例如：定时器，网络请求等；

### 1.3 浏览器的事件循环

- 当有一些异步操作需要进行调用时，该操作通常会被放入到浏览器的队列中，当主线程的代码执行完之后，再来执行该操作；
- **宏任务与微任务：**
  - 在事件循环中通常维护着两个队列，分别是：
    - **宏任务队列（macrotask queue）：ajax、setTimeout、SetInterval、DOM监听、UI Rendering等；**
    - **微任务队列（microtask queue）：Promise的then回调、Mutation Observer API、 queueMicrotask等；**
  - **队列的优先级：**
    - 首先：main script的代码先执行完毕（编写的顶层script代码）；
    - 其次：在执行每一个宏任务之前都会检查微任务队列是否为空：
      - 在执行宏任务之前，微任务队列必须为空；
      - 如果微任务队列不为空，则先执行完微任务队列中的人物；
- 面试题：
  - 面试题1:![image-20220719155720418](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/image-20220719155720418.png)
  - 面试题2:![image-20220719160444689](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/image-20220719160444689.png)

# 2. 错误处理方案

### 2.1 throw关键字

- throw语句：

  - throw语句可以抛出一个用户自定义的异常信息；
  - 当遇到throw语句时，当前的代码则会被停止；

- throw语句后面可以跟上表达式来表示具体的异常信息；

- throw语句后面的表达式类型：

  - number、string、boolean
  - 对象类型

- 创建一个类：

  - ```js
    class IuceError {
      constructor(errCode, errMessage) {
        this.errCode = errCode;
        this.errMessage = errMessage;
      }
    }
    
    function foo() {
      throw new IuceError('500', '遇到错误')
    }
    ```

### 2.2 Error类

- JS提供了一个Error类，可以使用这个类来创建错误信息；

- Error类包含三个属性：

  - message：创建Error对象传入的message；
  - name：Error的名称；
  - stack：整个Error的错误信息，包括函数的调用栈，当直接打印Error对象时，打印的就是stack；

- Error的子类：

  - RangeError：下标值越界时使用的错误类型；
  - SyntaxError：解析语法错误时使用的错误类型；
  - TypeError：类型错误的类型；

- ```js
  function foo() {
    throw new Error("错误信息")
  }
  ```

# 3. 异常捕获

### 3.1 初识抛出异常过程

- 当一个函数抛出异常时，调用它的程序会被强行终止；
- 并且如果该函数没有对异常进行处理时，该异常将会继续往上传递；
- 直到顶层时还未处理该异常，将会进行报错并终止程序的运行；

### 3.2 异常捕获

- 当出现异常时，可以使用try catch语句来对异常进行处理；

- ```js
  function foo() {
    throw "12321312321321312"
  }
  
  function bar() {
  	try {
      foo()
    } catch(err) {
      console.log('err')
    }
  }
  bar()
  ```

- **注意：如果有一些必须要执行的代码，可以放在finally中执行；**

  - finally中的代码为一定会被执行的代码；
  - **如果try和finally中都有返回值，则会使用finally的返回值。**

# 4. Storage

- WebStorage提供了一种机制，分别有：

  - localStorage：本地存储，提供的是一种永久性的存储方法，在关闭网页重新打开时，存储的内容依旧保留；
  - sessionStorage：会话存储，提供的是本次会话存储，在关闭会话时，存储的内容会被清除；

- **localStorage与sessionStorage的区别：**

  - 区别一：在关闭网页后，localStorage会保留，sessionStorage会被删除；
  - 区别二：在页面内跳转，localStorage和sessionStorage都会保留；
  - 区别三：在页面外跳转（打开新网页），localStorage会保留，sessionStorage会删除；

- Storage常见的方法和属性：

  - 属性：
    - Storage.length：只读属性；返回一个整数，表示存储在Storage对象中的数据项数量；
  - 方法：
    - key(index)：接受一个数值为参数，返回存储中的第N个key的名称；
    - getItem()：接受一个key作为参数，返回key对应的value；
    - setItem()：接受一个key和value为参数，并将key和value存入到存储中；
    - removeItem()：接受一个key为参数，将该key从存储中删除；
    - clear()：清空存储中的所有key；

- 封装Storage：

  ```js
  class IuceStroage {
    constructor(isLocal = true) {
      this.stroage = isLocal ? window.localStorage : window.sessionStorage;
    }
  
    getLength() {
      return this.stroage.length;
    }
  
    getKey(index) {
      return this.stroage.key(index);
    }
  
    getItem(key) {
      const value = JSON.parse(this.stroage.getItem(key));
      if (value) return value;
    }
  
    setItem(key, value) {
      if (!value) return;
      this.stroage.setItem(key, JSON.stringify(value));
    }
  
    removeItem(key) {
      this.stroage.removeItem(key);
    }
  
    clear() {
      this.stroage.clear();
    }
  }
  
  const local = new IuceStroage();
  const session = new IuceStroage(false);
  ```

# 5. 正则表达式

### 5.1 初识正则

- 正则表达式：
  - 又称之为正则表示式、正则表示法、规则表达式、常规表示法，是计算机科学的一个概念；
  - 通常使用单个字符串来描述、匹配一系列某个句法规则的字符串；
- 概括：正则表达式是一种字符串匹配的利器，可以帮助搜索、获取、替换字符串；
- **创建：**
  - 通过RegExp类来创建；
  - 由两部分组成，模式（patterns）和修饰符（flags）；

### 5.2 使用方法

- 用于RegExp的exec和test方法；
- 用于String的match、matchAll、replace、search、split方法；
- ![image-20220719173629075](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/image-20220719173629075.png)

### 5.3 修饰符的使用

- 常见的修饰符：

  - g：全部的，匹配全部字符；
  - i：忽略大小写；
  - m：多行匹配；

- 案例练习：

  - ```js
    const pattern = /abc/gi;
    let message = 'abc aabbssd acb casdsa ABC abc';
    // 所有的abc换成大写
    const result1 = message.replaceAll(pattern, 'ABC');
    // 获取一个字符串中所有的abc
    const result2 = message.match(pattern);
    console.log(result2);
    console.log(result1);
    ```

### 5.4 规则

#### 5.4.1 字符类

- 字符类是一个特殊的符号，匹配特定集中的任何符号；

- ![image-20220719174255702](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/image-20220719174255702.png)

- 案例练习：

  - ```js
    // 字符类
    const pattern1 = /\d/gi;
    const pattern2 = /\d\d\d\S/gi;
    const result3 = message.match(pattern1);
    const result4 = message.match(pattern2);
    console.log(result3);
    console.log(result4);
    ```

#### 5.4.2 反向类

- \D：非数字，除了\d以外的任何字符，例如字母；
- \S：非空格符号，除了\s之外的任何字符，例如字母；
- \W：非单个字符，除了\w之外的任何字符，例如非拉丁字符和空格；

#### 5.4.3 锚点（Anchors）

- 符号^和符号$在正则表达式中都有特殊的意义，被称之为锚点；

  - 符号^匹配文本开头；
  - 符号$匹配文本结尾；

- 词边界（word boundary）：

  - 词边界\b是一种检查，就像^和$一样，它会检查字符串中的位置是否词边界；
  - 词边界测试\b检查位置的一侧是否匹配\w，而另一侧则不匹配\W；

- 演练：

  - ```js
    const message2 = 'My name is Iuce';
    const pattern3 = /^my/i;
    if (pattern3.test(message2)) {
      console.log('my');
    }
    if (/Iuce$/i.test(message2)) {
      console.log('iuce');
    }
    
    const message3 = 'now time is 17:56, number is 123,332';
    console.log(message3.match(/\b\d\d:\d\d\b/g)); // ['17:56']
    ```

#### 5.4.4 转义字符串

- 如果需要将特殊字符作为常规字符来使用，需要对其进行转义：

  - 在字符前面加上一个反斜杠；

- 常见的转义字符：

  - `[]`、`\`、`^`、`$`、`.`、`|`、`?`、`*`、`+`、`()`

- 斜杠符号`/`并不是一个特殊的符号，但在字面量正则表达式中也需要转义；

- 练习：

  - ```js
    const fileNames = ['1.html', '2.js', '3.jsx', '4.js', '5.css'];
    const names = fileNames.filter((item) => /\.jsx?$/.test(item));
    console.log(names); // ['2.js', '3.jsx', '4.js']
    ```

### 6. 集合（Sets）和范围（Range）

- 需求：有时候只需要选择多个匹配字符的其中一个即可：

  - 在方括号`[]`中的几个字符，只需匹配到一个即可；

- **集合：**

  - 在`[iuce]`中，只要查找到其中的一个字符即可；

- 范围：

  - 方括号表示字符范围；
  - 比如：`[a-z]`则会自动匹配从a-z范围的字符，`[0-5]`则表示从0-5的数字；
  - `[0-9A-Z]`则表示两个范围：搜索一个字符，需要满足数字0-9或字符A-Z之间的；
  - \d和`[0-9]`相同；
  - \w和`[a-zA-Z0-9]`相同；

- 案例：

  - ```js
    const phoneNumber = '187778138747';
    const phonePattern = /^1[3-9]\d{9}/;
    console.log(phonePattern.test(phoneNumber));
    ```

### 7. 量词（Quantifiers）

- 数量`{n}`：

  - 准确的位数：`{5}`，5位数；
  - 范围的位数：`{3,5}`，3-5之间；

- 缩写：

  - `+`：代表一个或多个，相当于`{1,}`；
  - `?`：代表零个或一个，相当于`{0,1}`；
  - `*`：代表零个或多个，相当于`{0,}`；

- 案例：

  - ```js
    // 量词
    const htmlEl = '<div><p>1321321</p><span>123213</span></div>';
    const elPattern = /<\/?[a-z][a-z0-9]*>/gi;
    console.log(htmlEl.match(elPattern)); // ['<div>', '<p>', '</p>', '<span>', '</span>', '</div>']
    ```

### 8. 贪婪（Greedy）和惰性（lazy）模式

- 默认情况下的匹配规则是查找到匹配内容后，会继续向后查找，一直找到最后一个匹配的内容；

  - 这种模式则被称之为**贪婪模式**；

- 而**懒惰模式**中的量词则是与贪婪模式中的相反；

  - 只要获取到对应的内容后，则不再向后匹配；
  - 可以在量词后面加个`?`号来启用它；

- 案例练习：

  - ```js
    // 贪婪模式
    const booksMessage = '我最喜欢的两本书是《跟谁较劲》和《云边的小卖部》';
    const bookResult = booksMessage.match(/《.+》/gi);
    console.log(bookResult); // ['《跟谁较劲》和《云边的小卖部》']
    // 懒惰模式
    const booksMessage1 = '我最喜欢的两本书是《跟谁较劲》和《云边的小卖部》';
    const bookResult1 = booksMessage.match(/《.+?》/gi);
    console.log(bookResult1); // ['《跟谁较劲》', '《云边的小卖部》']
    ```

### 9. 捕获组（capturing group）

- 模式的一部分可以用括号括起来`(...)`，这称之为捕获组（capturing group）；

- 作用：

  - 将匹配的一部分作为结果数组中的单独项；
  - 将括号视为一个整体；

- 方法str.match(regexp)，如果regexp没有g的标志，将查找第一个匹配并将它作为一个数组返回；

- 案例：

  - ```js
    // 捕获器
    const str = '<h1>title</h1>';
    console.log(str.match(/<(.+?)>/)); // ['<h1>', 'h1', index: 0, input: '<h1>title</h1>', groups: undefined]
    ```

- **命名组：**

  - 可以在开始括号的位置放置`?<name>`来完成组的命名；

  - ```js
    //  命名组
    const str1 = '<h1>title</h1>';
    console.log(str.match(/<(?<title>.+?)>/));
    ```

- ![image-20220719183803312](/Users/wu/Library/Application%20Support/typora-user-images/image-20220719183803312.png)

### 10 案例练习

### 10.1 歌词解析

```js
const lyrics =
      '[00:00.000] 作词 : 许嵩\n[00:01.000] 作曲 : 许嵩\n[00:02.000] 编曲 : 许嵩\n[00:22.240]天空好想下雨\n[00:24.380]我好想住你隔壁\n[00:26.810]傻站在你家楼下\n[00:29.500]抬起头数乌云\n[00:31.160]如果场景里出现一架钢琴\n[00:33.640]我会唱歌给你听\n[00:35.900]哪怕好多盆水往下淋\n[00:41.060]夏天快要过去\n[00:43.340]请你少买冰淇淋\n[00:45.680]天凉就别穿短裙\n[00:47.830]别再那么淘气\n[00:50.060]如果有时不那么开心\n[00:52.470]我愿意将格洛米借给你\n[00:55.020]你其实明白我心意\n[00:58.290]为你唱这首歌没有什么风格\n[01:02.976]它仅仅代表着我想给你快乐\n[01:07.840]为你解冻冰河为你做一只扑火的飞蛾\n[01:12.998]没有什么事情是不值得\n[01:17.489]为你唱这首歌没有什么风格\n[01:21.998]它仅仅代表着我希望你快乐\n[01:26.688]为你辗转反侧为你放弃世界有何不可\n[01:32.328]夏末秋凉里带一点温热有换季的颜色\n[01:41.040]\n[01:57.908]天空好想下雨\n[01:59.378]我好想住你隔壁\n[02:02.296]傻站在你家楼下\n[02:03.846]抬起头数乌云\n[02:06.183]如果场景里出现一架钢琴\n[02:08.875]我会唱歌给你听\n[02:10.974]哪怕好多盆水往下淋\n[02:15.325]夏天快要过去\n[02:18.345]请你少买冰淇淋\n[02:21.484]天凉就别穿短裙\n[02:22.914]别再那么淘气\n[02:25.185]如果有时不那么开心\n[02:27.625]我愿意将格洛米借给你\n[02:30.015]你其实明白我心意\n[02:33.327]为你唱这首歌没有什么风格\n[02:37.976]它仅仅代表着我想给你快乐\n[02:42.835]为你解冻冰河为你做一只扑火的飞蛾\n[02:48.406]没有什么事情是不值得\n[02:52.416]为你唱这首歌没有什么风格\n[02:57.077]它仅仅代表着我希望你快乐\n[03:01.993]为你辗转反侧为你放弃世界有何不可\n[03:07.494]夏末秋凉里带一点温热\n[03:11.536]\n[03:20.924]为你解冻冰河为你做一只扑火的飞蛾\n[03:26.615]没有什么事情是不值得\n[03:30.525]为你唱这首歌没有什么风格\n[03:35.196]它仅仅代表着我希望你快乐\n[03:39.946]为你辗转反侧为你放弃世界有何不可\n[03:45.644]夏末秋凉里带一点温热有换季的颜色\n';

const lyricLineStrings = lyrics.split('\n');
const lyricLines = [];
const timePattern = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
for (const lyric of lyricLineStrings) {
  const timeString = timePattern.exec(lyric);
  if (!timeString) continue;
  const time1 = timeString[1] * 60 * 1000;
  const time2 = timeString[2] * 1000;
  const time3 =
        timeString[3].length !== 3 ? timeString[3] * 10 : timeString[3] * 1;
  const time = time1 + time2 + time3;
  const content = lyric.replace(timePattern, '').trim();
  lyricLines.push({ time, content });
}

console.log(lyricLines);
```

### 10.2 时间格式化

```js
function formatDate(timestamp, formatString) {
  const date = new Date(timestamp);
  // 定义正则和值之间的关系
  const obj = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  // 替换
  for (const key in obj) {
    const reKey = new RegExp(`(${key})`);
    if (reKey.test(formatString)) {
      const value = (obj[key] + '').padStart(2, '0');
      formatString = formatString.replace(reKey, value);
    }
  }

  return formatString;
}

const time = formatDate(1758232807702, ' hh:mm:ss yyyy/MM/dd');
console.log(time);
```





