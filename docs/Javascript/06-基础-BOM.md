# 1. 认识DOM和BOM

### 1.1 DOM和BOM的简单认识

- **DOM：文档对象模型（Document Object Model)**
  - **简称DOM，主要将页面的所有内容表示为一个可以修改的对象。**
- **BOM：浏览器对象模型（Browser Object Model）**
  - **简称BOM，主要处理除了文档之外的所有内容的其他对象；**
  - **如navigate、location、history等对象。**

### 1.2 深入理解DOM

- **DOM其实就是将HTML页面中的每一个元素抽象成一个个对象；**
- **这些对象都可以通过js的代码来进行访问以及操作；**
- **这个抽象过程也被称之为文档对象模型（Document Object Model)。**
- **例如 ：**
  - **document.documentElement对应的是html元素；**
  - **ducument.body对应的是body元素；**
  - **document.head对应的是head元素。**
- ![image-20220612011639898](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612011639898.png)

### 1.3 DOM  Tree的理解

- **在html的结构中，最终会形成一个树结构；**
- **而在抽象成DOM对象时，它们也会形成一个树结构，该结构也被称之为DOM Tree**。
- ![image-20220612011811852](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612011811852.png)

### 1.4 DOM的继承关系图

- **DOM其实就是JS和HTML、CSS之间的桥梁，通过DOM提供的API，可以对元素进行任意的操作。**
- ![image-20220612011935376](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612011935376.png)

# 2. document对象

### 2.1 认识document对象

- Document节点表示的是整个载入的网页，**它的实例是全局的document对象。**
  - **对DOM的所有操作都是从documents对象开始的；**
  - **它是DOM的入口点，可以从document开始取访问任何节点元素。**
- ![image-20220612012219821](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612012219821.png)

### 2.2 节点和元素的关系

- **节点包括了元素、注释、文本等内容；**
- **元素只是元素本身而已。**

### 2.3 节点（Node）之间的导航（Navigate）

- **在获取一个节点之后，可以通过该节点去获取到其他节点，就被称之为节点之间的导航。**

- **节点关系如下：**

  - 父节点：parentNode；

  - 前兄弟节点：previousSibling

  - 后兄弟节点：nextSibling

  - 子节点：childNodes

  - 第一个子节点：firstChild

  - 最后一个子节点：lastChild

  - 关系图：

    ![image-20220612012530844](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612012530844.png)

### 2.4 元素（Element）之间的导航（Navigate）

- **在获取到一个元素之后，可以通过该元素去获取到其他元素，就被称之为元素之间的导航。**

- **节点关系如下：**

  - 父节点：parentElement；

  - 前兄弟节点：previousElementSibling

  - 后兄弟节点：nextElementSibling

  - 子节点：child

  - 第一个子节点：firstElementChild

  - 最后一个子节点：lastElementChild

  - 关系图：

    ![image-20220612012717938](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612012717938.png)

### 2.5 表格元素的导航

![image-20220612012924537](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612012924537.png)

### 2.6 Form元素之间的导航

![image-20220612013302140](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612013302140.png)

### 2.7 获取元素的方法

![image-20220612013341440](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612013341440.png)

```js
const el1 = document.querySelector('.box')
const el2s = document.querySelectorAll('.box2')
const el3 = document.getElementById('#ddd')
const el4 = document.getElementsByName('dds')
const el5 = document.getElementsByTagName('id')
const el6 = document.getElementByClassName('.ddd')
```

### 2.8 节点的属性

#### 2.8.1 nodeType：

- 获取节点类型的方法，返回一个数值型值。

- 常见的节点类型：

  ![image-20220612013451855](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612013451855.png)

- ```js
  const el = document.querySelector('body')
  console.log(el.nodeType)
  ```

#### 2.8.2 nodeName与tagName:

- nodeName: 获取node节点的名字；

- tagName：获取元素的标签名字；

- ```js
  var el = document.querySelector('.box')
  var nodeName = el.nodeName
  var tagName = el.tagName
  ```

- 两者之间的区别：

  - **tagName只适合用于Element节点；**
  - **nodeName适合用于所有节点；**
    - 对于element元素，它与tagName一致；
    - 对于其余节点类型，它拥有一个对应节点类型的字符串

#### 2.8.3 innerHTML、textContent、outerHTML：

- innerHTML：

  - 将元素中的HTML获取为字符串形式；
  - 设置元素中的内容

- outerHTML：

  - 包含了元素的完整HTML；
  - innerHTML加上元素本身一样；

- textContent：

  - 获取元素中的文本内容；
  - 设置元素中的文本内容；

- innerHTML和textContent的区别：

  ![image-20220612014151364](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612014151364.png)

- ```js
  const el = document.querySelector('.box')
  console.log(el.innerHTML)
  console.log(el.outerHTML)
  console.log(el.textContent)
  ```

#### 2.8.4 nodeValue：

- **用于获取非元素节点的文本内容，如注释、文本等节点。**
- ![image-20220612014246262](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612014246262.png)

#### 2.8.5 hidden：

- **这是一个全局属性，可设置元素的隐藏与显示；**

- **本质上即是display的block和none。**

- ```js
  const el = document.querySelector('.box')
  el.hidden = true
  el.hidden = false
  ```

#### 2.8.6 其余属性：

![image-20220612014411682](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612014411682.png)

# 3. Element元素

### 3.1 元素的特性（attribute）

1. 基础概念

   - **一个元素的属性（attribute）会在抽象成对象时也创建在该对象中；**
     - **如id、class等全局属性（attribute），也会有对应的id、class等属性；**

2. attribute的分类；

   - **标准的attribute：如id、class、href、type等；**
   - **非标准的attribute：自定义的attribute，如abc、ddd等**

3. attribute的操作：

   ![image-20220612015150296](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612015150296.png)

4. attribute的特征：

   - **它们的名字不区分大小写（id与ID相同）；**
   - **它们的值永远都是字符串类型；**

### 3.2 元素的属性（property）

1. **对于标准的attribute，会在DOM对象上创建于其对应的property属性。**

   ```js
   const el = document.querySelector('.box')
   console.log(el.id, el.className)
   console.log(el.abc, el.ddd) // undefined 
   ```

2. **在多数的情况下，attribute和property是相互作用的：**

   - **改变property时，通过attribute获取的值也会改变；**

   - **通过attribute操作修改值时，property的值也会改变。**

3. **除了特殊情况，大部分情况下，设置或获取attribute，推荐使用property的方式，因为默认情况下property是有类型的。**

### 3.3 HTML5的data-*自定义属性

- 通过data-*自定义的属性，可以在元素的dataset属性中获取。

- ```js
  const el = document.querySelector('.box')
  coonsole.log(el.dataset)
  ```

### 3.4 元素的className和classList

1. 修改样式问题：

   ![image-20220612020628693](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612020628693.png)

2. className：

   - 元素的class attribute，对应的property并不是叫class，而是className：

     - 因为早期中JS不允许使用关键字作为对象的属性；
     - 虽然现在已不再限制，但不推荐使用。

   - **注意：当对className进行赋值时，将会替换掉整个类中的字符串，也就是说该元素的类将会更新为刚赋值的类，原先定义的类被替换掉。**

   - ```js
     const el = document.querySelector('.box')
     el.className = 'why ddd'
     ```

3. classList:

   - 当需要添加或移除单个class时，可以使用classList属性，因为该属性会保留原有的class。

   - classList是一个特殊的类对象，它是一个可迭代对象，可以通过for of进行遍历；

   - 使用方法：

     ![image-20220612021130291](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612021130291.png)

   - ```js
     const el = document.querySelector('.box')
     el.classList.add('vvvv')
     el.classList.remove('ddd')
     el.classList.toggle('vvv')
     el.classList.contains('vvv') // true
     ```

### 3.5 元素的style属性

1. style属性的设置

   - 当修改单个css属性时，可以通过style来进行操作；

   - **css的属性使用小驼峰的方式进行获取**；

   - **如果将css的属性值设置为空字符串，那么将会使用默认值；**

   - **当需要写多个样式时，推荐使用cssText属性，但该属性的写法会替换掉整个style中的属性。**

   - ```js
     const el = document.querySelector('.box')
     el.style.backgroundColor = 'red'
     el.style.cssText = `width: 100px; height: 100px`
     ```

2. style属性的的读取-getComputedStyle

   - **在读取内联样式时，可以通过style.*的方式读取；**

   - **但在style、css文件中的样式是无法进行读取的，需要通过全局属性getComputedStyle全局函数来进行获取。**

   - ```js
     const el = document.querySelector('.box')
     console.log(getComputedStyle(el).width)
     console.log(getComputedStyle(el).height)
     ```

### 3.6 创建元素、插入元素、克隆元素、移除元素

##### 3.6.1 创建元素

- document.createElement(tag)方法

- ```js
  const el = document.createElement('h2')
  ```

##### 3.6.2 插入元素

![image-20220612022141397](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612022141397.png)

```js
const el = document.querySelector('.box')
const el1 = document.createElement('h2')
const el2 = document.createElement('p')

el.append(el1)
el.prepend(el1, el2)
el.before(el1, el2)
el.after(el1, el2)
el.replaceWith(el1)
```

##### 3.6.3 移除元素

- element.remove()方法

- ```js
  const el = document.querySelector('.box')
  el.remove()
  ```

##### 3.6.4 克隆元素

- Elment.cloneNode方法，可以传入一个布尔类型的值，决定是否深度克隆；

- 深度克隆可以克隆对应元素的子元素。

- ```js
  const el = document.querySelector('.box')
  const el1 = el.cloneNode(true)
  ```

##### 3.6.5 旧的元素操作方法

![image-20220612022655434](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612022655434.png)

### 3.7 元素的大小、滚动

![image-20220612022737072](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612022737072.png)

```js
const el = document.querySelector('.box')

console.log(el.clienWidth)
console.log(el.clienHeight)
console.log(el.clienTop)
console.log(el.clienLeft)

console.log(el.offsetWidth)
console.log(el.offsetHeight)
console.log(el.offsetLeft)
console.log(el.offsetTop)

console.log(el.scrollHeight)
console.log(el.scrollTop)
```

### 3.8 window的大小、滚动

![image-20220612023000489](/Users/wu/Library/Application%20Support/typora-user-images/image-20220612023000489.png)

# 4. 案例练习

### 4.1 倒计时

```js
const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')

setInterval(function() {
  // 获取当前时间
  const nowDate = new Date()
  const endDate = new Date()
  endDate.setHours(24)
  endDate.setMinutes(00)
  endDate.setSeconds(00)
  endDate.setMilliSeconds(00)

  // 获取剩余的秒数
  const time = Math.floor((endDate().getTime() - nowDate().getTime()) / 1000)

  // 获取对应的格式
  const hours = Math.floor(time / 3600)
  const minute = Math.floor(time / 60) % 60
  const second = time % 60

  hourEl.textContent = hours
  minuteEl.textContent = minute
  secondEl.textContent = second
}, 1000)
```





