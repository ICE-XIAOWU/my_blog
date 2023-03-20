# 1. ES5对象的继承

### 1.1 对象的原型

- 在JS中每个对象都有一个**特殊的内置属性[[prototype]]，这个特殊的对象指向另外一个对象**；

- 当通过对象的属性key来获取一个value时，就会触发一个[[get]]操作；

- 这个操作会先从该对象中进行查找，查找该对象是否存在对应的属性；

- 如果查找不到对应的属性，则会访问对象的[[prototype]]属性指向的对象。

- **注意：无论通过什么方式创建的对象，都会有这个内置的属性。**

- **获取该属性的方式：**

  - 方式一：通过对象的`__proto__`属性可以获取到，但该属性时早期浏览器添加的，存在一定的兼容性问题；

  - 方式二：通过`Object.getPrototypeOf`方法可以获取到；

  - ```js
    var obj = {}
    
    console.log(obj.__proto__) // 获取方法一
    Object.getPrototypeOf(obj) //获取方法二
    
    ```

### 1.2 函数的原型prototype

- **所有的函数都有一个prototype属性。**
- **注意：是函数才有这个这个特殊的属性，对象是没有的。**

### 1.3 使用new操作符时的操作

- 第一步：在内存中新建一个空的对象

- 第二部：将这个对象作为这个函数的this

- 第三步：将这个函数的显式原型赋值为这个对象的隐士原型；

- 第四步：执行函数里的代码；

- 第五步：如果这个函数不返回其他东西，将会把这个新建的对象返回。

- 案例：

  ```js
  function Person() {}
  
  var p1 = new Person();
  
  // 以上的操作等于以下的操作
  var p = {};
  p.__proto__ = Person.prototype;
  
  var p1 = new Person();
  var p2 = new Person();
  var p3 = new Person();
  
  console.log(p1.__proto__ === Person.prototype); // true
  console.log(p1.__proto__ === p2.__proto__); // true
  ```

- 内存图：

  - ![image-20220809221209325](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092212354.png)

### 1.4 其余内存图操作

- prototype添加属性：![image-20220809221222470](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092212489.png)

- 上课画图：

  ![image-20220809221235598](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092212617.png)

- 上课画图：新增属性

  ![image-20220809221248474](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092212494.png)

- 上课画图：

  ![image-20220809221301308](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092213327.png)

### 1.5 constructor属性

- 在函数的显示原型上，会有一个constructor的属性，该属性指向当前的函数对象。
- ![image-20220809221313133](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092213150.png)

### 1.6 重写原型对象

- **注意：在重写原型对象后，该原型对象的constructor会指向Object，而不是指向当前的函数对象，需要在该对象中重新添加一个constructor属性。**

- ```js
  function Proson() {}
  
  // 重新原型对象
  Proson.prototype = {
    name: '123',
    age: 10,
    runing: function () {
      console.log('running~');
    },
  };
  
  // 手动添加constructir方式一;
  Proson.prototype = {
    constructor: Proson,
  };
  
  // 方式二：
  Object.defineProperty(Proson.prototype, 'constructor', {
    enumerable: false,
    value: Proson,
  });
  
  console.log(Proson.prototype);
  ```

### 1.7 构造函数和原型的结合

![image-20220809221354029](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092213053.png)

### 1.8 面向对象的特性-继承

- 面向对象有三大特性：封装、继承、多态。四大特性：封装、继承、多态、抽象。
  - 继承：减少代码的重复性，也是实现多态的前提（在纯面向对象中）；
  - 封装：将一些属性和方法封装到一个类中，可以称之为封装的过程；
  - 多态：不通的对象在执行时表现出不同的形态。
- **继承是什么：**
  - 将重复的代码和逻辑抽取到父类中，子类只需继承过来即可使用；
  - 很多编程语言中，继承也是多态的前提。

### 1.9 JS的原型链

- 如果从一个对象中获取属性，在没有获取到的情况下，会向上级的原型中进行获取，一直到尽头，如果获取不到，则会报错。这些获取中的原型构成起来则是原型链。
- ![image-20220809221412774](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092214792.png)

### 1.10 Object的原型

- 原型链的尽头是Object的`__proto__`，Object的`__proto__`指向的是null；

- 而这个原型就是顶层的原型。

- **注意：从字面量的方式，或者new Object的方式创建出来的对象的`__proto__`都是指向Object的prototype。**

- **Object的特殊之处：**

  - 特殊一：该对象有许多原型属性，并且它的的隐士原型已经指向为null，它也是顶层的原型了；
  - 特殊二：该对象上有很多默认的方法和属性。

- **当创建了一个对象时的内存图：**

  ![image-20220809221430910](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092214929.png)

- 原型链的关系图：

  ![image-20220809221441792](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092214228.png)

- **注意：Object是所有类的父类。**

### 1.11 通过原型链实现继承

- 实现方式：

  ```js
  function Person() {}
  Person.prototype.running = function () {
    console.log('running~');
  };
  
  function Student() {}
  // 创建出一个Person的实例
  var p = new Person();
  // 将Student的prototype指向p
  Student.prototype = p;
  
  Student.prototype.studying = function () {
    console.log('studying~');
  };
  
  var s = new Student();
  
  s.studying();
  s.running();
  ```

- 内存图：

  ![image-20220809221515204](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092215228.png)

- 弊端：

  - 弊端一：某些属性是保存在p对象上的；
  - 弊端二：通过打印无法看到这些属性和方法
  - 弊端三：这些属性会被多个对象共享，如果这个对象是一个引用类型，则会造成问题；
  - 弊端四：不能给Person传递参数，因为对象是一次性创建的。

### 1.12 借用构造函数继承

- 为了解决原型链继承的问题，开发人员发明了一个新的技术：借用构造函数（constructor stealing）

  - steal时偷窃、剽窃的意思，这里翻译为借用。

- 借用继承的方式十分简单，在子类构造函数的内部调用父类的构造函数。

- 实现方式：

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.running = function () {
    console.log('running~');
  };
  
  function Student(name, age, sno) {
    Person.call(this, name, age);
    this.sno = sno;
  }
  
  Student.prototype = Person.prototype;
  
  const s = new Student('name1', 12, 11232);
  console.log(s);
  ```

- 弊端：

  - 问题一：会调用两次父类构造函数：
    - 一次是创建子类的原型的时候；
    - 一次是在子类函数内部的时候。

### 1.13 原型式继承函数

- 什么是原型式继承：
  - 这种模式是在2006时由道格拉斯·克罗克福德写的一篇文章中说起的；
  - 该文章介绍了一种继承方法，这种方法不是使用构造函数来实现的。





### 1.15 寄生式继承函数



### 1.16 寄生式继承组合函数



### 1.17 对象的方法补充

- 方法一：hasOwnProperty
  - 对象是否有某一个属于自己的属性（不是在原型上的属性）；
- 方法二：in/for in 操作符
  - 判断某个属性是否在某个对象或对象的原型上；
- instanceof
  - 用于检测构造函数的prototype，是否出现在某个实例对象的原型链上；
- isPrototypeOf
  - 用于检测某个对象，是否出现在某个实例对象的原型链上。

### 1.18 原型继承关系

![image-20220809221547813](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092215837.png)



# 2. ES6的继承-class

- ES6之后可以使用class关键字来定义类；

- 但它原则上只是ES5的语法糖而已；

- 声明类的方式：

  - ```js
    // 方式一
    class Person {}
    
    // 方式二
    var Student = class {}
    ```

### 2.1 类和构造函数的异同

- ![image-20220809221609728](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208092216751.png)

### 2.2 类的构造函数

- 每个类都有自己的一个构造函数，这个方法的名称是固定的constructor；
- 每当通过new操作符，操作一个类时都会调用这个类的构造函数constructor；
- **注意：每个类只允许有一个constructor，多个会报错。**

### 2.3 类的实例方法

- 如下：

  ```js
  class Person {
    constructor(name, age, height) {
      this.name = name;
      this.age = age;
      this.height = height;
    }
    
    // 实例方法
    running() {
      console.log(this.name + "running!")
    }
    
    eating() {
      console.log(this.name + "eating~")
    }
  }
  
  ```

### 2.4 类的访问器方法

- 类也是可以定义setter和getter方法的；

- 如下：

  ```js
  class Person {
    constructor(name, age) {
  		this._name = name
      this._age = age
    }
    
    set name(value) {
      this._name = value
    }
    
    get name() {
      return this._name
    }
  }
  
  var p = new Person()
  p.name = '123'
  console.log(p.name)
  ```

### 2.5 类的静态方法（类方法）

- 静态方法：直接通过类执行的方法，无需使用类的实例

- 实现方式：

  ```js
  class Person {
    constructor(age) {
      this.age = age
    }
    
    static create() {
      return new Person(Math.floor(Math.random() * 100))
    }
  }
  
  // 调用类方法
  Person.create()
  ```

### 2.6 ES6类的继承-extends

- 在ES6中新增了extends，可以很轻松的实现继承

  ```js
  class Person {}
  
  class Student extends Person {
    
  }
  ```

### 2.7 super关键字

- super关键字可以调用父类的构造函数，父类的方法、属性；

- **注意：在子类的构造函数中使用this或者返回默认对象之前，必须先通过super调用父类的构造函数。**

- **super的使用位置：子类的构造函数、子类的实例方法、子类的静态方法。**

- 实现方式：

  ```js
  class Person {
    
    getName() {
      return '123'
    }
  }
  
  class Student extends Person {
    constructor(name) {
      super()
      this.name = name
    }
    
    running() {
      // 调用父类的犯法
      super.getName()
    }
  }
  ```

### 2.8 继承内置类

- 在class的继承中，也是可以继承内置类的，用来扩展内置类。

- 实现方式：

  ```js
  class IuceArray extends Array {
    // 返回数组的最后一个元素
    lastItem() {
  		return this[this.length-1];
    }
  }
  
  var arr = new IuceArray(10, 20, 30)
  console.log(arr.lastItem()) // 30
  ```

### 2.9 类的混入

- 在JS的继承中，只允许实现单继承，也就是只能有一个父类；

- 因此开发人员为了实现继承多个父类，发明混入的方法；

- 实现方式：

  ```js
  class Person {}
  
  function mixin1(c) {
    return class extends c {
      running() {
        console.log('123');
      }
    };
  }
  
  function mixin2(c) {
    return class extends c {
      eating() {
        console.log('456');
      }
    };
  }
  
  class newPerson extends mixin1(mixin2(Person)) {}
  
  var p = new newPerson();
  p.running();
  p.eating();
  
  ```

# 3. JS中的多态

- 面向对象的三大特性：继承、封装、多态；

- **多态的定义：**

  - 多态：指为不同的数据类型的实体提供一个统一的接口，或者使用一个单一的符号来表示多个不同的类型。

- **总结多态：**

  - 不同的数据类型进行统一的操作，表现出不同的形式，就是多态的体现。

- 如下：

  ```js
  function sum(a, b) {
    return a + b
  }
  
  var a = sum(1, 2)
  var b = sum('a', 'b')
  ```

# 4. ES6中对象的增强

### 4.1 字面量的增强

- **字面量的增强主要包含了三个部分：属性的简写、方法的简写、计算属性名。**

- 如下：

  ```js
  var name = '123'
  var address = "guangzhoushi"
  var obj = {
    // 属性简写
    name,
    
    // 方法名简写
    running() {
      console.log('123')
    }
    
    // 计算属性名
    [address]: '广州是一个美丽的城市。'
  }
  ```

### 4.2 解构-Destructuring

- 解构赋值：将数组或对象拆包到一系列的变量中；

- 类型：

  - 数据解构: 数据解构的顺序是固定的，不能改变。
  - 对象解构：对象解构的顺序可以改变。

- **数据解构：**

  ```js
  var names = ['12', '34', '56']
  
  // 正常解构
  var [a, b, c] = names
  
  // 使用默认值
  var [a = '111', b, c] = names 
  
  // 使用剩余参数
  var [a, b, ...arr] = names // 12, 34, [56]
  ```

- **对象解构：**

  ```js
  var obj = {
    name: '123',
    age: 12,
    height: 1.88
  }
  
  // 正常解构
  const {name, age, height} = obj
  
  // 使用别名
  const {name: nName, age, height } = obj
  
  // 使用默认值
  const {name = "123", age, height} = obj
  
  // 使用剩余参数
  const {name, ...nObj} = obj
  
  ```

  

