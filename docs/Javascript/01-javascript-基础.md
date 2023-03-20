# 1. 认识编程语言

### 1.1 计算机语言

1. **HTML 是一种标记语言，CSS 时候一种样式语言**。
2. **计算机语言就是人和计算机进行交流的语言。**
3. ![image-20220516185313868](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516185313868.png)

### 1.2 编程语言的特点

- **数据和数据结构**
- **指令以及流程控制**
- **引用机制和重用机制**
- **设计哲学**

### 1.3 常见的编程语言

![image-20220516185819355](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516185819355.png)

### 1.4 编程语言-机器语言

![image-20220516190214089](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516190214089.png)

### 1.5 编程语言-汇编语言

![image-20220516190242485](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516190242485.png)

### 1.6 编程语言-高级语言

1. 最好的编程语言是-**自然语言！**
2. 高级语言就是最接近自然语言，也更符合人类的思维方式！

![image-20220516190529396](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516190529396.png)

### 1.7 机器语言和高级语言的区别：

![image-20220516190651972](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516190651972.png)

# 2. JavaScript 的历史

### 2.1 定义

![image-20220516190825370](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516190825370.png)

### 2.2 起源

![image-20220516191846206](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516191846206.png)![image-20220516191855858](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516191855858.png)![image-20220516191906161](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516191906161.png)![image-20220516191921488](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516191921488.png)

# 3. JavaScript 的分类

### 3.1 ECMAScript

- ECMAScript 只是 JavaScript 的标准，描述了该语言的语法和基本对象。

### 3.2 组成

- 主要由 ECMAScript、DOM、BOM。

![image-20220516192149646](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516192149646.png)

# 4. JavaScript 的运行引擎

### 4.1 运行

- **由浏览器的 JavaScript 引擎来运行！**

### 4.2 JavaScript 引擎

![image-20220516192810551](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516192810551.png)

### 4.3 JavaScript 引擎分类

![image-20220516192854482](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516192854482.png)

### 4.4 JS 引擎和浏览器内核的关系

- 一般浏览器由 web 引擎和 js 引擎构成。
- web 引擎主要负责 HTML 的解析等
- js 引擎负责 js 代码的解析。

![image-20220516193125101](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516193125101.png)

# 5. JavaScript 的基础语法

### 5.1 编写方式

- 方式一：HTML 内部元素编写。

- 方式二：在 script 元素內编写。

- 方式三：独立的 js 文件。

- 演练

  ```html
  <!-- 1. 方式一：行内编写 -->
  <a href="#" onclick="alert('hangnei')">1</a>

  <!-- 2. 方式二：script元素中编写 -->
  <a class="a" href="#">2</a>

  <script>
    var aEl = document.querySelector("a");
    aEl.onclick = function () {
      alert("2");
    };
  </script>

  <!-- 3. 方式三：script引入 -->
  <script src="./js/demo.js"></script>
  ```

### 5.2 < noscript > 元素

- **< noscript> 元素是用于不支持 js 文件的浏览器提供的元素。**

- 如下：

  ![image-20220516194755844](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516194755844.png)

### 5.3 编写注意事项

![image-20220516194824052](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516194824052.png)

### 5.4 js 的交互方式

![image-20220516194944241](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516194944241.png)

### 5.5 js 的语句和分号

![image-20220516195343552](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516195343552.png)

### 5.6 js 的注释

![image-20220516195656288](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516195656288.png)

# 6. JS 的变量和数据类型

### 6.1 变量的定义

![image-20220516210021232](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516210021232.png)

- **当打印变量时，打印的是变量中保存的值！**

### 6.2 变量的命名规范

![image-20220516210203060](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516210203060.png)

- 变量练习：**不借助第三个变量完成交换**

  ![image-20220516210958137](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516210958137.png)

### 6.3 变量的注意事项

##### 6.3.1 注意一： 变量未声明直接使用，会直接报错！

##### 6.3.2 注意二：变量声明未赋值，变量为 undefined！

##### 6.3.3 注意三： 未使用关键字声明变量，也是可以声明成功的，并会加入到 window 中！

### 7. JS 的数据类型

![image-20220516213431333](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516213431333.png)

### 8. typeof 操作符

- 作用：**用来确定变量的数据类型。**

- 返回类型：

  ![image-20220516213758659](/Users/wu/Desktop/learn_%E7%B3%BB%E7%BB%9F%E8%AF%BE/notes/image-20220516213758659.png)

- **typeof 的用法：**

  - ![image-20220516213832842](/Users/wu/Library/Application%20Support/typora-user-images/image-20220516213832842.png)

- **（）的作用**

  - **（）在函数时表示调用函数。**
  - **（）包括表达式时，表示此处为一体。**
