# 1. 认识BOM

- BOM：浏览器对象模型（Browser Object Model）：
  - 简称BOM，由浏览器提供除于DOM之外的所有内容的其他对象；
  - 例如：navigator、location、history；
- BOM通常被看成为连接JS和浏览器窗口的桥梁；
- BOM主要包含的属性：
  - window：包括全局属性、方法，控制浏览器窗口相关的属性、方法；
  - history：浏览器的历史；
  - location：浏览器连接到的对象的位置（URL）；
  - navigator：用户代理（浏览器）的状态和标识；
  - screen：屏幕窗口信息。

# 2. window对象

- winodw对象可以从两个视角来看待：
  - 视角一：全局对象：
    - 在浏览器中是window，在node中是global；
  - 视角二：浏览器窗口对象：
    - 提供给了对浏览器进行操作的API。
- 由于对于浏览器和node中全局对象不统一的问题，现已指定了对应的标准，目前浏览器中都有一个属性：globalThis，它等同于window对象。
- window对象的作用：
  - ![image-20220620053816966](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620053816966.png)
- window对象常见的属性：
  - ![image-20220620053853939](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620053853939.png)
- 浏览器常见的方法：
  - ![image-20220620053913318](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620053913318.png)
- 浏览器常见的事件：
  - ![image-20220620053930490](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620053930490.png)

# 3. location对象

- location对象用于表示window上当前链接到的URL信息。
- 常见的属性有：
  - ![image-20220620054039550](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054039550.png)
- 常见的方法：
  - ![image-20220620054103209](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054103209.png)
- **URLSearchParams**
  - URLSearchParams定义了一些方法来处理URL的查询字符串；
    - 可以将一个字符串转换成URLSearchParams类型；
    - 也可以将一个URLSearchParams类型转换成字符串；
    - ![image-20220620054230774](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054230774.png)
  - 常见的方法：
    - ![image-20220620054249772](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054249772.png)
  - **在查询字符串中有中文的问题：**
    - **中文会使用encodeURIComponent和decodeURIComponent进行编码和解码。**



# 4. history对象

- history对象允许访问浏览器曾经的会话历史记录；
- history对象的属性：
  - length：会话中的记录条数；
  - state：当前保留的状态值；
- history对象的方法：
  - ![image-20220620054520750](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054520750.png)

# 5. navigator对象、screen对象

- ![image-20220620054607622](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054607622.png)
- ![image-20220620054618563](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054618563.png)

# 6. JSON

### 6.1 JSON的由来

- JSON是一种数据格式，并不是一种编程语言，而是一种在服务器和客户端之间传输的数据格式；
- JSON全称：JavaScript Object Notation（JavaScript对象符号）；
  - ![image-20220620054815463](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054815463.png)
- ![image-20220620054832860](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620054832860.png)

### 6.2 JSON的基础语法

- JSON的顶层支持三种类型的值：

  - 简单值：数字、字符串、布尔值、null类型；

  - 对象值：由key和value组成，key是字符串类型，必须添加双引号，值可以是简单值，对象值，数组值；

  - 数组值：数组的值可以是简单值、对象值、数组值。

  - ```json
    // 简单值
    123
    
    // 对象
    {
      "name": "123",
      "age": 12,
      "info": {
    		"name": 'jeams'
      }
    }
    
    // 数组
    [
      123,
      "asdsa",
      {
        "name": "123"
      }
    ]
    ```

### 6.3 JSON序列化

- **可以使用stringify方法和parse方法来对JavaScript的类型转换为JSON字符串，也可以转换为JavaScript类型；**

- ```js
  const info = {
    name: '1213',
    age: 12
  }
  const s = JSON.strngify(info)
  
  const b = JSON.parse(s)
  ```

##### 1. stringify方法的参数

- replace参数：

  - 如果指定了一个replace函数，可以选择性地替换值；

  - 如果指定的replace是一个数组，则可选择地仅包含数组指定的属性；

  - ```js
    const s1 = JSON.stringify(info);
    // s1: {"name": "12", "age": 12, "friend": {"name": "kobe"}, "hobbies": ["1", "2", "3"]}
    
    // replace参数是数组
    const s2 = JSON.stringify(info, ['name', 'age'])
    // s2: {"name": "12", "age": 12}
    
    // replace参数是一个函数 回调函数的参数会传入一个key和value
    const s3 = JSON.stringify(info, (key, value) => {
      if(key === 'name') {
        return 'coderwhy'
      }
      return value
    })
    
    // s3: {"name": "coderwhy", "age": 12, "friend": {"name": "coderwhy"}, "hobbies": ["1", "2", "3"]}
    ```

- Space参数：

  - 对字符串进行格式化，如果对象中包含了to JSON方法，则会直接使用toJSON方法的结果：
    - ![image-20220620060255076](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620060255076.png)

##### 2. parse方法的参数

- ![image-20220620060419387](/Users/wu/Library/Application%20Support/typora-user-images/image-20220620060419387.png)

# 7. Storage

### 7.1 初识Storage

- WebStorage提供了一种机制，让浏览器提供了一种比cookie更直观的存储方式：
  - localStorage：
    - 本地存储，提供的是一种永久性的存储方法，在关闭网页重新打开时，存储内容依旧保留；
  - sessionStorage：
    - 会话存储，提供的是本次的会话存储，在关闭会话后，存储的内容会被清除。
- **localStorage和sessionStorage的区别：**
  - 区别一：关闭网页后，localStorage会保留，sessionStorage会被删除；
  - 区别二：在页面内跳转，localStorage会保留，sessionStorage也会保留；
  - 区别三：在页面外实现跳转（打开新网页），localStorage会保留，sessionStorage不会保留。

### 7.2 Storage常见的方法和属性

- 属性：
  - Storage.length： 返回一个整数，表示存储在Storage对象中的数据项数量；
- 方法：
  - Storage.key()：接受一个数值n为参数，返回存储中第n个key名称；
  - Storage.getItem()：接受一个key为参数，返回key对应的value；
  - Storage.setItem()：接受一个key和value，将key和value添加到存储中；
  - Storage.removeItem()：接受一个key为参数，把该key从存储中删除；
  - Storage.clear()：清除存储中的所有的key。