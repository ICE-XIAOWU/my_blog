# 1. Proxy

### 1.1 监听对象的操作

- 以前都是使用Object.defineProperty存储属性描述符来对属性进行监听；

- 但该方式存在缺陷，只能监听属性的修改和获取，无法监听删除和新建；

- 并且此方法最初也不是用来监听一个对象的；

- ```js
  const obj = {
    name: 'ice',
    age: 12,
  };
  
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
  
    Object.defineProperty(obj, key, {
      get() {
        console.log('监听到获取');
        return value;
      },
      set(newValue) {
        value = newValue;
        console.log('监听到设置');
      },
    });
  });
  
  console.log(obj.age);
  obj.age = 11;
  console.log(obj.age);
  ```

### 1.2 Proxy的基本使用

- Proxy可以创建一个代理对象：

  - 也就是监听一个对象的相关操作；
  - 之后对对象的所有操作都是有代理对象来完成；

- get和set捕获器：

  - get函数有三个参数：
    - target：目标对象（侦听对象）；
    - property：被获取的属性key；
    - receiver：调用的代理对象；
  - set函数有四个参数：
    - target：目标对象；
    - property：将被设置的属性key；
    - value：新属性值；
    - receiver：调用的代理对象；

- 其余捕获器：

  - ![image-20220715224908781](/Users/wu/Library/Application%20Support/typora-user-images/image-20220715224908781.png)

- 简单使用：

  - ```js
    const obj = {
      name: 'ice',
      age: 19,
    };
    
    const objProxy = new Proxy(obj, {
      get(target, key, receiver) {
        console.log('get');
        return target[key];
      },
      set(target, key, value, receiver) {
        target[key] = value;
        console.log('set');
      },
      has(target, key) {
        console.log('has');
        return key in target;
      },
      deleteProperty(target, key) {
        console.log('delete');
        delete target[key];
      },
    });
    
    console.log(objProxy.age);
    objProxy.age = 12;
    console.log('age' in objProxy);
    console.log(delete obj.name);
    ```

### 1.3 Proxy的construct和apply

- Proxy的construct和apply都是应用于函数对象的；

- ```js
  const fooProxy = new Proxy(foo, {
    construct(target, arrArg, newTarget) {
      return new target(...arrArg);
    },
    apply(target, thisArg, arrArg) {
      console.log('apply');
      return target.apply(thisArg, arrArg);
    },
  });
  
  fooProxy.apply('123');
  ```

# 2. Reflect

### 2.1 初识Reflect

- Reflect是ES6中新增的一个对象，翻译为反射的意思；
- 主要作用：
  - 操作JS对象的方法；
  - 类似于Object操作对象的方法；
- 产生原因：
  - 因为早期ECAM未考虑周全的原因，许多对对象进行操作的API放到了Object中；
  - 而Object作为一个构造函数，这样极为的不合适；
  - 因此新增Reflect对象，可以使用Reflcet来操作这些对象方法；

### 2.2 常用方法

- ![image-20220716221328225](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/image-20220716221328225.png)

### 2.3 Reflect的使用

- ```js
  const obj = {
    name: '123',
    age: 12,
  };
  
  const objProxy = new Proxy(obj, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver);
    },
    has(target, key) {
      return Reflect.has(target, key);
    },
    deleteProperty(target, key) {
      return Reflect.deleteProperty(target, key);
    },
  });
  
  console.log(objProxy.name);
  objProxy.name = '1123';
  console.log('name' in objProxy);
  console.log(delete objProxy.name);
  console.log(objProxy);
  ```

### 2.4 Receiver的作用（

- receiver参数则是现在正在代理对象，使用场景如下：

  - 如果源对象存在setter与getter访问器，则可以通过receiver来改变里面的this。

- ```js
  const obj = {
    _name: '11123',
    set name(value) {
      this._name = value;
    },
    get name() {
      return this._name;
    },
  };
  
  const objProxy = new Proxy(obj, {
    get(target, key, receiver) {
      console.log('进入');
      console.log(target);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log('设置');
      return Reflect.set(target, key, value, receiver);
    },
  });
  
  objProxy.name = '1223';
  console.log(objProxy.name);
  ```

### 2.5 Reflect的construct

- Reflect得construct可以是目前的构造函数调用另外一个构造函数的construct函数，但隐士原型还是指向现构造函数；

- 如下:

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  function Student() {}
  
  const p = Reflect.construct(Person, ['12321', 12], Student);
  console.log(p.__proto__ === Student.prototype); // true
  console.log(p);
  ```

