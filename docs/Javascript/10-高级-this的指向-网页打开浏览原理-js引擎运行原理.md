# 1. this的指向

### 1.1 this的绑定规则

#### 1. 规则一：默认绑定

- 当一个函数在没有被绑定到任何对象时调用，被称之为独立调用；

- **this不在严格模式下会绑定到window中。**

- 案例：

  ```js
  // 案例一
  function foo() {
    console.log(this); //  window
  }
  
  foo();
  
  // 案例二
  function test1() {
    console.log(this); //window
    test2();
  }
  
  function test2() {
    console.log(this); //window
    test3();
  }
  
  function test3() {
    console.log(this); // window
  }
  
  test1();
  
  // 案例三
  function bar(func) {
    func(); // window
  }
  
  var obj = {
    name: 'why',
    bar: function () {
      console.log(this); // obj
    },
  };
  
  bar(obj.bar);
  ```

#### 2. 规则二：隐式绑定

- 当一个函数通过某个对象进行调用时，被称之为隐式绑定。

- 案例：

  ```js
  // 1. 案例一
  
  function foo() {
    console.log(this);
  }
  
  var obj = {
    name: 'ice',
    foo: foo,
  };
  obj.foo(); // obj
  
  // 2. 案例二
  var obj1 = {
    name: 'obj1',
    foo: foo,
  };
  
  var obj2 = {
    name: 'obj2',
    obj1: obj1,
  };
  
  obj2.obj1.foo(); // obj1
  
  // 3. 案例三
  var obj3 = {
    name: 'obj3',
    foo: foo,
  };
  
  var bar = obj3.foo;
  bar(); // window
  ```

#### 3. 规则三：显示绑定

- 可以通过apply、call、bind方法将this显示的绑定到函数中；

- apply方法：apply的第一个参数为绑定的this，第二参数为传进去的参数，为数组类型；

- call方法：第一个参数为绑定的this，其余为参数类别；

- bind方法：bind方法会返回一个新的绑定函数，第一个参数为绑定的this，其余参数则作为新函数的参数。

- 案例：

  ```js
  function foo() {
    console.log(this);
  }
  
  foo.apply('123'); // String对象 {"123"}
  
  foo.call(123); // Number对象 {123}
  
  var bar = foo.bind('12312');
  bar(); // String对象 {"12312"}
  ```

#### 4. 规则四： new绑定

- 当使用new关键字调用一个函数时，会执行以下操作：

  - 创建一个新的对象；
  - 该对象会执行prototype连接；
  - 这个新对象会被绑定到构造函数的this上；
  - 如果这个函数没有返回其他对象，则返回这个新建的对象。

- 案例：

  ```js
  function Person(name) {
    console.log(this); // Person {}
    this.name = name;
    console.log(this); // Person {name: "ice"}
  }
  
  const obj = new Person('ice');
  console.log(obj); // Person {name: "ice"}
  ```

### 1.2 内置函数的绑定

- 在调用内置函数，或者使用一些第三方库中的内置函数时，this会绑定到哪里？

- 案例：

  ```js
  setTimeout(() => {
    console.log(this); // window
  });
  
  var names = ['jeamse', 'ice', 'nick'];
  names.forEach((item) => {
    console.log(this); // window
  });
  
  const boxEl = document.querySelector('.box');
  boxEl.onclick = function () {
    console.log(this); // .box
  };
  ```

### 1.3 规则的优先级

- 默认绑定优先级最低
- 显示绑定高于隐式绑定
- new绑定高于显示绑定
- new绑定高于bind绑定
- **注意点：**
  - new绑定不能和call、apply一起使用；
  - new绑定可以与bind一起使用，但是new绑定优先级更高。

### 1.4 this的规则之外

#### 1. 忽略显示绑定

- 如果在显示绑定中，传入一个null或undefined，则该显示绑定会被忽略，继续使用默认绑定。

  ```js
  function foo() {
    console.log(this);
  }
  
  var obj = {
    name: '123',
  };
  
  foo.apply(obj); // obj
  foo.apply(null); // window
  foo.apply(undefined); // window
  
  var bar = foo.bind(undefined);
  bar(); // window
  ```

#### 2. 间接函数的引用

- 创建一个函数的间接引用，这种情况继续使用默认绑定。

- ```js
  function foo1() {
    console.log(this);
  }
  
  var obj1 = {
    name: 'obj1',
    foo: foo1,
  };
  
  var obj2 = {
    name: 'obj2',
  };
  
  obj1.foo(); //obj
  (obj2.foo = obj1.foo)(); // window
  ```

#### 3.  箭头函数

- 箭头函数不绑定this，而是根据函数的上层作用域中查找this。

- ```js
  // 规则三：箭头函数
  var obj3 = {
    data: [],
    getData: function () {
      setTimeout(() => {
        var res = ['123', '123'];
        console.log(this); // obj3
        this.data.push(...res);
      }, 1000);
    },
  };
  
  var obj4 = {
    data: [],
    getData: () => {
      setTimeout(() => {
        console.log(this); // window
      }, 1000);
    },
  };
  
  obj3.getData(); // obj3
  obj4.getData(); // window
  ```

### 1.5 this面试题

- 第一题：

  ```js
  var name = 'window';
  
  var person = {
    name: 'person',
    sayName: function () {
      console.log(this.name);
    },
  };
  
  function sayName() {
    var sss = person.sayName;
    sss(); // window
    person.sayName(); // person
    person.sayName(); // person
    (b = person.sayName)(); // window
  }
  
  sayName();
  ```

  

- 第二题：

  ```js
  var name = 'window';
  
  var person1 = {
    name: 'person1',
    foo1: function () {
      console.log(this.name);
    },
    foo2: () => {
      console.log(this.name);
    },
    foo3: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo4: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
  
  var person2 = { name: 'person2' };
  
  person1.foo1(); // person1
  person1.foo1.call(person2); // person2
  
  person1.foo2(); // window
  person1.foo2.call(person2); // window
  
  person1.foo3()(); // window
  person1.foo3.call(person2)(); // window
  person1.foo3.call().call(person2); // person2
  
  person1.foo4()(); // person1
  person1.foo4.call(person2)(); // person2
  person1.foo4().call(person2); // person1
  ```

- 第三题：

  ```js
  var name = 'window';
  
  function Person(name) {
    this.name = name;
    this.foo1 = function () {
      console.log(this.name);
    };
  
    this.foo2 = () => console.log(this.name);
  
    this.foo3 = function () {
      return function () {
        console.log(this.name);
      };
    };
  
    this.foo4 = function () {
      return () => {
        console.log(this.name);
      };
    };
  }
  
  var person1 = new Person('person1');
  var person2 = new Person('person2');
  
  person1.foo1(); // person1
  person1.foo1.call(person2); // person2
  
  person1.foo2(); // person1
  person1.foo2.call(person2); // person1
  
  person1.foo3()(); // window
  person1.foo3.call(person2)(); // window
  person1.foo3.call().call(person2); // person2
  
  person1.foo4()(); // person1
  person1.foo4.call(person2)(); // person2
  person1.foo4().call(person2); // person1
  ```

  

- 第四题：

  ```js
  var name = 'window';
  
  function Person(name) {
    this.name = name;
    this.obj = {
      name: 'obj1',
      foo1: function () {
        return function () {
          console.log(this.name);
        };
      },
      foo2: function () {
        return () => {
          console.log(this.name);
        };
      },
    };
  }
  
  var person1 = new Person('person1');
  var person2 = new Person('person2');
  
  person1.obj.foo1()(); // window
  person1.obj.foo1.call(person2)(); // window
  person1.obj.foo1().call(person2); // person2
  
  person1.obj.foo2()(); // obj1
  person1.obj.foo2.call(person2)(); // person2
  person1.obj.foo2().call(person2); // obj1
  ```

# 2. 箭头函数

- 箭头函数是ES6后新增的一种函数写法；

- 它有以下两个特点：

  - 不会绑定this、argument属性；
  - 不能作为构造函数使用；

- 函数写法：

  ```js
  var nums = [1, 2, 3, 4]
  
  // 写法一
  nums.forEach(item => {
    console.log(item)
  })
  
  // 写法二
  nums.forEach(item => console.log(item))
  
  
  // 写法三： 如果返回一个对象，需要加个小括号
  const foo = () => ({name: '1213'})
  ```

# 3. 浏览器的渲染原理

### 1. 浏览器的内核

- Trident（三叉戟）；
- Gecko（ 壁虎）；
- Presto（急板乐曲） --> Blink(眨眼)；
- Webkit；
- WebKit --> Blink；
- 浏览器内核常指的是浏览器的排版引擎：
  - 排版引擎：又称之为浏览器引擎、页面渲染引擎或样板引擎。
  - 当一个页面下载下来之后，则有渲染引擎进行解析。

### 2. 解析页面

#### 2.1 简单流程：

![image-20220708155849911](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708155849911.png)

#### 2.2 详细流程：

![image-20220708155927801](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708155927801.png)

#### 2.3 解析步骤

1. 步骤一：解析HTML
   - 首先从解析HTML开始，构建DOM Tree；
2. 步骤二：生成CSS规则
   - 遇到CSS的link元素之后，会下载对应的CSS文件（下载CSS文件不会影响DOM的解析）；
   - 下载完CSS文件之后，会对其进行解析并构建相应的规则树（也被称之为CSSOM，CSS对象模型）；
3. 步骤三：构建Render Tree
   - 当有了DOM Tree和CSSOM Tree之后，则将这两者进行结合构建Render Tree；
   - **注意点：**
     - link元素不会影响DOM Tree的构建，但是会阻塞Render Tree的构建过程，因为在构建Render Tree时，也需要到CSSOM Tree；
     - Render Tree和DOM  Tree并不是一一对应的关系，例如dsiplay为none的元素，压根不会出现在Render Tree中！
4. 步骤四：布局（layout）和绘制（Paint）
   - 第四步是在Render Tree上运行布局来计算每个节点的几何体；
     - Render Tree只会显示哪些节点与样式，但是并不表示每个节点的位置和尺寸等信息；
     - 布局时确定呈现在Render Tree中的所有节点的宽度、高度以及位置信息；
   - 第五步时将每个节点绘制到屏幕上
     - 在绘制阶段，浏览器会讲布局阶段计算的每个frame转为屏幕上的实际像素点；
     - 包括将元素的可见部分进行绘制，如文本、颜色、阴影、边框、替换元素（img）等；

#### 2.4 特殊解析：composite合成

- 在绘制的进程，可以将布局后的元素绘制到多个合成图层中。
  - 这是浏览器的一种优化手段；
- **注意：**
  - **默认情况下，标准流中的内容都会被绘制到同一个图层中的；**
  - **而一些特殊的属性，则会创建一个新的图层，并且新的图层是可以利用GPU来进行加速绘制的；**
    - 因为每个图层都是单独渲染的。
- 会创建新图层的属性：
  - **3D transforms**
  - **video、canvas、iframe**
  - **opacity动画转变时；**
  - **position： fixed；**
  - **will-change：一个实验属性，可以提前告诉浏览器哪些元素发生了变化；**
  - **animation或transition设置了opacity、transform；**
- **注意：分层可以提高性能，但是它是以内存为代价的，因此不可以过度使用；**

### 3. 回流和重绘

#### 3.1 回流（reflow）

- **回流又被称为重排；**
  - **第一次确定节点位置、大小的，称之为布局；**
  - **之后对节点的大小、位置进行修改重新计算的称之为回流；**
- 什么情况下会引起回流：
  - DOM结构发生了变化，如添加新节点、移除节点；
  - 改变布局，如修改width、height、padding等；
  - 改变窗口的大小，修改尺寸；
  - 调用getComputedStyle方法获取尺寸、位置信息；

#### 3.2 重绘

- 第一次渲染内容称之为绘制。
- 之后重新绘制称之为重绘。
- 什么情况下会引起重绘：
  - 修改背景色、文字颜色、边框颜色、样式等；

#### 3.3 相关问题

- 回流一定会引起重绘，所以回流是一件很消耗性能的事情；
- 避免发生回流：
  - 尽量一次性修改样式
    - 通过cssText、class进行修改；
  - 避免频繁操作DOM
    - 可以在一个DocumentFragment或者父元素中将要操作的DOM操作完成，再一次性操作；
  - 避免通过getComputedStyle获取尺寸、位置信息；
  - 对某些元素使用position的absolute或fixed；
    - 并不是不会引起回流，只是开销比较小，不会对其他元素造成影响。

### 4. script元素与页面解析的关系

#### 4.1 概念解析

##### 1. 解析html时遇到script元素：

- 在解析HTML的过程中，遇到了script元素是不能继续构建DOM树的；

- 它会停止构建，下载js代码并且执行js的脚本；

- 只有等js的脚本执行完之后才会继续解析HTML，构建DOM树；

##### 2. 原因：

- 因为js的作用之一就是操作DOM，并且修改DOM；
- 如果等DOM树构建完成并且渲染之后再执行js脚本，会影响严重的回流和重绘，影响页面性能；
- 所以在遇到script元素时，会优先下载和执行js代码，然后再继续构建DOM树；

#### 4.2 相关属性

##### 1. defer属性

- 这个属性会告诉浏览器不要等待脚本下载，而是继续解析HTML，构建DOM Tree；
  - 脚本由浏览器下载，但不会阻塞DOM Tree的构建；
  - 如果脚本提前下载好，则会等待DOM Tree的构建完成，在DOMContentLoad事件之前先执行defer中的代码；
- DOMContentLoad事件总是会在defer中的代码先执行完成；
- 当有多个defer脚本时，是根据顺序执行的；
- 从某种角度来说，defer可以提高页面性能，推荐放到head元素中。
- 注意：defer**只适用于外部脚本。**

##### 2. async属性

- async属性也是可以让脚本不阻塞DOM Tree；
- 它可以让一个脚本完全独立：
  - 浏览器不会因为async脚本而阻塞；
  - async不能保证顺序，但它是独立下载、运行的，不会影响其他脚本；
  - async不会保证是否在DOMContentLoad事件的之前或之后执行；

##### 3. 两者的区别：

- defer通常用于需要在文档解析后操作DOM的js代码；并且对多个script文件顺序有要求；
- async通常用于独立脚本，对其他脚本，甚至DOM都没有依赖。

# 5. JavaScript的运行原理

### 1. V8引擎的执行原理

- 定义：

  - 使用C++编写的Goole开源高性能JavaScript和WebAssembly引擎，主要用于chrome和node.js。
  - 实现了ECMAScript和WebAssembly，可以在windows7或以上版本、macos等系统上运行；
  - V8可以独立运行，也可以嵌入到任何的C++程序中。

- 执行过程：

  ![image-20220708175936578](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708175936578.png)

- 引擎架构：

  ![image-20220708180047188](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708180047188.png)

- 官方解析图：

  - ![image-20220708180127044](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708180127044.png)

### 2. JS的执行过程（ECMAScirpt3版本）

#### 1. 初始化全局对象

- js引擎在执行代码之前，会在堆内存中创建一个全局对象Global Object（GO）；
- 该对象可以被所有的作用域（scope）进行访问；
- 该对象里面会包含Data、Array、String等等；
- 其中还有一个window属性指向自己。

#### 2. 执行上下文（Execution Contexts）

- js引擎内部会有一个执行上下文栈（Execution Context Stack， 简称ECS），用于执行代码的调用栈；
- 它执行的是全局的代码块：
  - 全局的代码块为了执行会构建一个Global Execution Context（GEC），简称全局执行上下文；
  - GEC会被放入到ECS中执行；
- GEC被放入到ECS中里面包含两部分的内容：
  - 第一部分：在代码执行之前，在parser转成AST的过程中，会将全局定义的变量、函数等加入到GlobalObject中，但是不会进行赋值；
    - 这个过程也被称之为变量的作用域提升；
  - 第二部分：在代码执行中，对变量赋值，或者执行其他函数；

#### 3. VO对象（Variable Object）

- 每一个执行上下文都会关联一个VO对象，变量和函数声明会被添加到这个VO对象中；
- 当全局代码被执行时，VO就是GO对象；

#### 4. 全局代码执行过程的前后

- 执行前：
  - ![image-20220708181542362](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708181542362.png)
- 执行后：
  - ![image-20220708181556810](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708181556810.png)

#### 5. 函数的执行

- 在执行的过程中遇到一个函数时，会根据函数体创建一个函数执行上下文（Functional Execution Context， 简称FEC），并且压入ECS（执行上下文栈）中；
- 因为每个执行上下文都会关联一个VO，函数执行上下文的VO是什么呢？
  - 当进入一个函数执行上下文时，会创建一个AO对象（Activation Object）；
  - 这个对象会使用arguments作为初始化，并且初始值为传入的参数；
  - 这个AO对象会作为执行上下文的VO来存放变量的初始化；

#### 6. 函数执行前后

- 执行前：

  ![image-20220708182337793](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708182337793.png)

- 执行后：

  ![image-20220708182353844](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708182353844.png)

#### 7. 作用域和作用域链（Scope Chain）

- 当进入到一个执行上下文时，执行上下文也会关联一个作用域链（scope chain）；
- 作用域链是一个对象列表，用于变量标识符的求值；
- 当进入一个执行上下文时，这个作用域链被创建，并且根据代码类型，添加一系列的对象。
  - **函数在被创建的时候，作用域链就被确定了，而不是在执行的时候。**
- ![image-20220708201628301](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708201628301.png)
- 作用域提升面试题：
  - ![image-20220708201937590](/Users/wu/Library/Application%20Support/typora-user-images/image-20220708201937590.png)

