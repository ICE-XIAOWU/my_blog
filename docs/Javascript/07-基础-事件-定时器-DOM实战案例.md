# 1. 认识事件处理

### 1.1 认识事件（event）

- ![image-20220615190900648](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615190900648.png)

- **事件监听方式：**

  - 方式一：在script中直接监听；

  - 方式二：DOM属性，通过元素的on来监听事件；

  - 方式三：通过EventTarget中的addEventListener来监听；

  - ```js
    // 方式一
    <div onclick='alert("警告")'> </div>
    
    // 方式二
    var boxEl = document.querySelector('.box')
    boxEl.onclick = function() {
      console.log(12321)
    }
    
    // 方式三
    boxEl.addEventListener('click', function() {
      console.log(12321)
    })
    ```

### 1.2 常见的事件列表

![image-20220615191313858](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615191313858.png)

### 1.3 认识事件流

- 事件流其实就是当点击一个元素时，该元素会往父级元素往上冒泡，或者从父元素往下捕获；

- 具体看下：

  ![image-20220615191507135](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615191507135.png)

# 2. 事件冒泡、捕获

### 2.1 事件冒泡、捕获的认识

- 事件冒泡：事件的默认情况是**从内到外的传递**，这种顺序被称之为**事件冒泡（event bubble）**；

- 事件捕获：另一种监听事件流**从外到内的传递**，这种顺序被称之为**事件捕获（event capture）**。

- 产生原因：

  - 因为初期的浏览器中，网景公司采用的**是事件捕获方式，微软采用的是事件冒泡方式**。

- 事件冒泡和事件捕获的过程书写：

  - ```js
    var spanEl = document.querySelector('span')
    var boxEl = document.querySelector('div')
    var bodyEl = document.body
    
    // 事件冒泡
    spanEl.addEventListener('click', function() {
      consloe.log('span冒泡')
    })
    
    boxEl.addEventListener('click', function() {
      consloe.log('box冒泡')
    })
    
    bodyEl.addEventListener('click', function() {
      consloe.log('body冒泡')
    })
    
    // 事件捕获
    spanEl.addEventListener('click', function() {
      consloe.log('span捕获')
    }, true)
    
    boxEl.addEventListener('click', function() {
      consloe.log('box捕获')
    }, true)
    
    bodyEl.addEventListener('click', function() {
      consloe.log('body捕获')
    }, true)
    ```

- ![image-20220615192211753](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615192211753.png)

### 2.2 事件冒泡和事件捕获的过程

- 事件发生时会有三个阶段：
  - **捕获阶段（capturing phase）：事件向下走近元素；**
  - **目标阶段（Target phase）：事件到达目标元素；**
  - **冒泡阶段（bubbling phase）：事件从元素上开始冒泡。**
- 流程图：
  - ![image-20220615192434913](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615192434913.png)
- **注：可以通过event对象的eventPhase来获取当前阶段。**

# 3. 事件对象event

- 当一个事件发生时，产生该事件的元素信息都会被封装到一个Event对象中，这个对象由浏览器进行创建，被称之为event对象；

- event对象提供了许多属性和方法，可以根据该属性与方法来进行某些操作。

- 获取event对象：event对象会在传入的事件处理函数回调时被系统传入，可以在回调函数中拿到event对象。

  - ```js
    var spanEl = document.querySelector('span')
    
    spanEl.addEventListener('click', function(evnet) {
      console.log(event)
    })
    
    spanEl.onclick = function(event) {
      console.log(event)
    }
    
    ```

- **event对象常见的属性：**

  - **type：事件的类型；**
  - **target：当前事件发生的元素；**
  - **currentTarget：当前处理事件的元素；**
  - **eventPhase：事件所处阶段；**
  - **offsetX、offsetY：事件发生在元素内的位置；**
  - **clientX、clientY：事件发生在客户端内的位置；**
  - **pageX、pageY：事件发生在客户端相对于document的位置；**
  - **screenX、screenY：事件发生相对于屏幕的位置。**

- **event对象常见的方法：**

  - **preventDefault：取消事件的默认行为；**
  - **stopPropagation：阻止事件的进一步传递（冒泡或捕获被阻止）。**

# 4. 事件处理中的this

- **在事件处理的函数中，函数中的this指向当前的target上；**
- **因此也可通过this来获取当前发生的元素。**

# 5. EventTarget类

- **事实上，所有的节点、元素都继承自EventTarget，包括window。**

- **EventTarget是一个DOM接口，主要用于添加、删除、派发Event事件。**

- EventTarget常见的方法：

  - addEventListener：注册某个事件类型及试驾处理函数；

  - removeEventListener：移除某个事件类型及事件处理函数；

  - dispatchEvent：派发某个事件类型到EventTarget上。

  - ```js
    var spanEl = document.querySelector('span')
    
    function foo(event) {
      console.log(event)
    }
    
    function bar(event) {
      // 派发事件
      window.dispatchEvent(new Event('coderwhy'))
    }
    
    // 注册事件
    spanEl.addEventListener('click', foo)
    
    // 移除事件
    spanEl.removeEventListener('click', foo)
    
    window.addEventListener('coderwhy', function() {
      console.log('监测到coderwhy事件')
    })
    ```

# 6. 事件委托模式（event delegation）

- 事件委托模式其实是一种设计模式，它可以在事件冒泡的情况下来进行事件处理；

- 事件委托模式的流程：

  - 当子元素被点击时，父元素可以通过冒泡监听到子元素的点击；
  - 并且课通过event.target属性来获取到当前监听的元素。

- 案例：

  - ```js
    // 案例一 ：一个ul中存放着多个li，点击某一个li变成红色
    
    // 方法一：使用for循环
    const liEls = document.querySelector('li')
    
    for(const liEl of liELs) {
      liEl.onclick = function(event) {
       	liEl.style.color = 'red'
      }
    }
    
    // 方法二： 使用事件委托
    var ulEl = document.querySelector('ul');
    ulEl.addEventListener('click', function (event) {
      event.target.style.color = 'red';
    });
    ```

  - ```js
    // 案例一改进版
    var ulEl = document.querySelector('ul');
    var currentEvnet = null;
    ulEl.addEventListener('click', function (event) {
      if (event.target !== ulEl) {
        if (currentEvnet) {
          currentEvnet.classList.remove('active');
        }
        event.target.classList.add('active');
        currentEvnet = event.target;
      }
    });
    ```

  - ```js
    // 案例二： 事件委托标记
    var list = document.querySelector('.btn-list');
    list.addEventListener('click', function (event) {
      var active = event.target.dataset.active;
      switch (active) {
        case '1':
          console.log(1);
          break;
        case '2':
          console.log(2);
          break;
        case '3':
          console.log(3);
          break;
      }
    });
    ```

# 7. 常见的事件

### 7.1 鼠标事件

- ![image-20220615200303622](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615200303622.png)

- ```js
  var btn = document.querySelector('button');
  
  btn.onclick = function () {
    console.log('点击');
  };
  
  btn.oncontextmenu = function () {
    console.log('右键菜单');
  };
  
  btn.ondblclick = function () {
    console.log('双击');
  };
  
  btn.onmousedown = function () {
    console.log('鼠标按下');
  };
  
  btn.onmouseup = function () {
    console.log('鼠标离开');
  };
  
  btn.onmouseover = function () {
    console.log('鼠标移到目标上');
  };
  
  btn.onmouseout = function () {
    console.log('鼠标离开目标');
  };
  
  btn.onmouseenter = function () {
    console.log('鼠标移到目标上-不冒泡');
  };
  
  btn.onmouseleave = function () {
    console.log('鼠标离开目标-不冒泡');
  };
  
  btn.onmousemove = function () {
    console.log('鼠标移动');
  };
  ```

- **mouseover和moouseenter的区别：**

  - **mouseover和mouseout：**
    - **支持冒泡；**
    - **进入该元素的子元素时：**
      1. **先调用该元素的mouseout;**
      2. **调用子元素的mouseover；**
      3. **因为冒泡，父元素的mouseover也会调用；**
      4. **离开子元素，子元素的mouseout调用；**
      5. **因为冒泡，父元素的mouseover和mouseout也会调用。**
  - **mouseenter和mouseleave：**
    - **不支持冒泡；**
    - **进入子元素时，默认子元素还是属于父元素，没有任何反应。**

### 7.2 键盘事件

- ![image-20220615201140224](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615201140224.png)

- 事件执行顺序：

  - down事件先发生；
  - press事件发生在文本被输入时；
  - up事件发生在文本输入完成时，也就是离开键盘时；

- 可以通过event的key和code来区分按下的键：

  - key：字符的"A"、"a"，等于非字符的按键，通常具有与code相同的值；
  - code：按键代码，如KeyA、ArrowLeft等，特定于键盘上按键的物理位置；

- ```js
  var i = document.querySelector('input');
  
  i.addEventListener('keydown', function (event) {
    console.log(event.code, event.key);
  });
  
  i.addEventListener('keypress', function (event) {
    console.log(event.code, event.key);
  });
  
  i.addEventListener('keyup', function (event) {
    console.log(event.code, event.key);
  });
  ```

### 7.3 表单事件

- ![image-20220615201630462](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615201630462.png)
- changge和input的区别：
  - changge当内容确定时触发；
  - input当内容输入时触发；

### 7.4 文档加载事件

- DOMContentLoaded：浏览器完全加载HTML、并构建DOM树，但像`<img>`和样式表之类的外部资源可能尚未加载完毕。

- load：浏览器加载完HTML，还加载完所有外部资源，如图片，样式表等。

- ```js
  window.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');
  });
  
  window.addEventListener('load', function () {
    console.log('load');
  });
  ```

# 8. window中的定时器

- 当一个函数并不是立即执行，而是等待特定的一段时间再执行，这种情况被称之为：计划调用（scheduling a call）。
- JS提供了两种执行方法：
  - setTimeout：将函数推迟到一段时间再执行；
  - setInterval：重复执行一个函数，从一段函数间隔之后开始运行，之后的时间则重复运行该函数；
- 取消方法：
  - clearTimeout：取消setTimeout定时器；
  - clearInterval：取消setInterval定时器。

### 8.1 setTimeout方法

- 语法：

  ![image-20220615202723919](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615202723919.png)

- claerTimeout方法：

  - setTimeout在调用时会返回一个 **定时器标识符（timer identifier）**，可以通过该标识符来取消定时器；

- ```js
  var t = setTimeout(
    function (name, age) {
      console.log(name, age);
    },
    1000,
    'adas',
    15
  );
  
  clearTimeout(t);
  ```

### 8.2 setInterval方法

- 语法：

  ![image-20220615203022018](/Users/wu/Library/Application%20Support/typora-user-images/image-20220615203022018.png)

- clearInterval方法：

  -   setInterval也会返回一个“**定时器标识符（timer identifier）**”，我们可以通过clearInterval来取消这个定时器。

- ```js
  var i = setInterval(function () {
    console.log(22);
  }, 3000);
  
  clearInterval(i);
  ```

 
