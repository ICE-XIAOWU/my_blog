# 1. Promise

### 1.1 未出现Promise时异步代码现状

- 在未出现Promise时，通常的网络请求都需要传递两个回调函数进去；

- 在获得成功结果时，则调用错误的回调函数；

- 在获得错误的结果时，则调用错误的回调函数；

- ```js
  function requestData(url, successCallback, failureCallback) {
    setTimeout(() => {
      if (url === 'iuce') {
        successCallback('成功');
      } else {
        failureCallback('失败');
      }
    }, 2000);
  }
  
  function successCallback(res) {
    console.log(res);
  }
  
  function failureCallback(err) {
    console.log(err);
  }
  
  requestData('iu2ce', successCallback, failureCallback);
  ```

- **该方法存在的缺点：**

  - 需要传递两个回调函数；
  - 对于不同的开发者，书写的函数也是不同，需要观看源码；

### 1.2 初识Promise

- Promise是ES6新增的一个类，可以翻译成：承诺，许诺，期约；

- **可以通过new创建一个Promise对象，并且传入一个回调函数（函数被称之为：executor）：**

  - **该回调函数则传入两个回调函数resolve与reject；**
  - **调用resolve函数时，则会执行Promise对象的then方法传入的函数；**
  - **调用reject函数时，则会执行Promise对象的catch方法传入的函数；**

- 演练：

  ```js
  const promise = new Promise((resolve, reject) => {
    resolve("成功的回调");
    
    reject("失败的回调");
  })
  
  promise.then((res) => {
  	console.log(res); // 成功的回调
  })
  
  promise.catch(err => {
    console.log(err); // 失败的回调
  })
  ```

### 1.3 Promise的状态

- 主要分为三种状态：

  - 待定（pending）状态：该状态为初始状态，Promise在未被兑现与拒绝时处于的状态；
    - 执行executo的代码；
  - 兑现（fulfilled)状态：处于兑现状态，则表示操作成功；
    - 执行了resolve回调函数，promise已被兑现；
  - 拒绝（rejected）状态：处于拒绝状态，则表示操作失败；
    - 执行了reject回调函数，promise已被拒绝；

- ```js
  const promise = new Promise((resolve, reject) => {
    // pending 状态
  	const name = 11;
    const age = 2;
    
    // fulfilled状态
    resolve("resolve");
    
    
    // rejected状态
    
    reject("reject");
  })
  
  promise.then(res => console.log(res)).catch(err => console.log(err));
  ```

### 1.4 Executor函数

- Executor函数是在Promise创建时传入的一个回调函数，**这个函数会被立即执行，并且传入两个参数：resolve和reject回调函数。**
- Promise的状态也会在Executor函数中决定：
  - 通过resolve，可以使Promise处于兑现（fulfilled状态），也可以称之为已决议状态（resolved）；
  - 通过reject，可以使Promise处于拒绝（rejected）状态‘
- **注意：Promise的状态一当确定，则不再可改变：**
  - 当调用resolve时，如果传递的值不是一个promise，则Promise的状态会处于兑现状态（fulfilled）；
  - 之后再调用reject也不会有任何响应。

### 1.5 resolve的值

- 情况一：如果resolve传递的值是一个普通值，则Promise的状态为fulfilled状态，并且将这个值作为then方法中回调函数的参数；

- 情况二：如果resolve传递的值是一个Promise，则这个新的Promise状态决定原Promise的状态；

- 情况三：如果resolve传递的值是一个对象，并且该对象中有一个then方法，则会执行该方法，并且决定Promise的状态；

- ```js
  const newPromsie = new Promise((resolve, reject) => {
    reject('1312');
  });
  
  const obj = {
    then(resolve, reject) {
      resolve('1232132132');
    },
  };
  
  const promise = new Promise((resolve, reject) => {
    // fulfilled状态
    resolve('131231');
  
    // rejected状态
    resolve(newPromsie);
  
    // fulfilled状态
    resolve(obj);
  });
  
  promise.then((res) => {
    console.log(res);
  });
  ```

### 1.6 then方法

- then方法是Promise对象上的一个方法（实例方法）；

- then方法可以接受两个参数：

  - fulfilled的回调函数：当状态变成fulfilled时的回调函数；
  - reject的回调函数：当状态变成rejected时的回调函数。

- ```js
  const promise = new Promse((resolve, reject) => {
  	resolve('12321')
  })
  
  promise.then(res => {
    console.log(res);
  }, err => {
    console.log(err);
  })
  ```

- **注意：then方法是可以进行多次调用的；**

  - ```js
    const promise = new Promse((resolve, reject) => {
    	resolve('12321')
    })
    
    promise.then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
    
    
    promise.then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
    
    promise.then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
    ```

- **then方法的返回值：**

  - then方法的返回值是一个Promise，可以通过该Promise进行链式调用；
  - **then方法返回Promise的状态值：**
    - 在then方法中的回调函数执行时，Promsie处于pending状态；
    - 当在then方法中的回调函数中返回一个结果时，Promise处于fulfilled状态，并将结果作为resolve的参数：
      - 情况一：返回一个普通值；
      - 情况二：返回一个Promise；
      - 情况三：返回一个thenable值；
    - 当在then方法中抛出一个异常时，Promise则处于reject状态；

### 1.7 catch方法

- catch方法也是Promise对象中的一个实例方法；
- 该方法也是可以被多次调用的；
  - 具体与then方法相同；
- **catch方法的返回值：**
  - 返回的是一个promise对象，可以在catch方法后面继续调用then方法或者catch方法；
  - **注意：catch方法的回调函数执行完之后默认是处于fulfilled状态的，所以该Promise的状态默认为fulfilled，也会继续执行then方法；**
  - **如果需要后续继续执行cathc，则需要抛出一个异常；**

### 1.8 finally方法

- finally方法：无论Promise对象处于fulfilled状态还是rejected状态都会执行的一个方法；

- 该方法不接受参数；

- ```js
  const promise = new Promise((resolve, reject) => {
    resolve(13212)
  })
  
  promise.then().catch().finally(() => {
    console.log("finally");
  })
  ```

### 1.9 类方法：resolve

- Promise.resolve方法相当于直接new了一个Promise对象，并且执行了resolve；

- 该方法的返回值与前面Executor方法中resolve回调函数的返回值一致；

  - 情况一：返回一个普通值；
  - 情况二：返回一个Promise；
  - 情况三：返回一个thenable值；

- ```js
  Promise.resolve('12312')
  // 等价于
  const promise = new Promise((resolve, reject) => {
    resolve('12312');
  })
  ```

### 1.10 类方法：reject

- Promise.reject方法相当于直接new了一个Promise对象，并且执行了reject；

- 该方法的返回值会直接出现在catch方法中的回调函数的参数中；

- ```js
  Promise.reject('1231');
  // 等价于
  new Promise((resolve, reject) => reject('1231'));
  ```

### 1.11 类方法：all与allSettled方法

#### 1.11.1 all方法

- all方法是会将多个Promise包裹起来形成一个新的Promise；

- 新的Promise状态由所有的Promise共同决定：

  - 当所有的Promise都处于fulfilled状态时，新的Promise状态则为fulfilled状态，并且会将所有的Promise的返回值组成一个新的数组返回；
  - 当有其中一个Promise的状态为rejected时，新的Promise状态则为rejected状态，并且将第一个reject的返回值作为catch的参数；

- ```js
  const p1 = new Promise((resolve, reject) => resolve('12321'));
  
  const p2 = new Promise((resolve, reject) => reject('12321'));
  
  const p3 = new Promise((resolve, reject) => resolve('12321'));
  
  Promise.all([p1, p2, p3]).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
  ```

#### 1.11.2 allSettled方法

- **all方法的缺陷：**当有其中一个Promise的状态处于reject状态，新的Promise则会变成reject的状态，并且将第一个reject的返回作为参数返回；

  - 对于其他fulfilled状态的Promise以及pending状态的promise是获取不到结果的；

- allSettled方法：该方法会等待所有的Promise都有结果，无论是fulfilled状态，还是rejected状态，才会有最终的状态；

  - **并且这个新的Promise的结果一定为你fulfilled**；

- allSettled的then方法返回值：

  - 返回的结果是一个数组，数组中存放着每一个Promise的结果；
  - 该结果是一个对象，这个对象包含了status状态，以及对应的value值；

- ```js
  const p1 = new Promise((resolve, reject) => resolve('12321'));
  
  const p2 = new Promise((resolve, reject) => reject('12321'));
  
  const p3 = new Promise((resolve, reject) => resolve('12321'));
  
  Promise.allSettled([p1, p2, p3]).then(res => {
    console.log(res)
  }).catch(err => {
  	console.log(err)
  });
  ```

### 1.12 race方法

- 如果有一个Promise有了结果，并且将该结果作为新Promise的状态，则可以race方法：

  - 该方法表示多个Promise相互竞争，谁先有结果，则使用谁的结果；

- ```js
  const p1 = new Promise((resolve, reject) => resolve('12321'));
  
  const p2 = new Promise((resolve, reject) => reject('12321'));
  
  const p3 = new Promise((resolve, reject) => resolve('12321'));
  
  Promise.race([p1, p2, p3]).then(res => {
    console.log(res)
  }).catch(err => {
  	console.log(err)
  });
  ```

### 1.13 any方法

- any方法会在多个Promise中等待一个fulfilled状态，然后再决定新的Promise状态；

- 如果所有的Promise都为reject，也会等到所有的Promise变成rejected状态，并且报一个AggregateError的错误；

- ```js
  const p1 = new Promise((resolve, reject) => resolve('12321'));
  
  const p2 = new Promise((resolve, reject) => reject('12321'));
  
  const p3 = new Promise((resolve, reject) => resolve('12321'));
  
  Promise.any([p1, p2, p3]).then(res => {
    console.log(res)
  }).catch(err => {
  	console.log(err)
  });
  ```

# 2. 迭代器（Iterator）

### 2.1 初识迭代器

- 迭代器：使用户可以在容器对象上遍历的对象，使用该接口无需关心对象内部实现的细节。

  - 其行为类似于数据库中的光标（游标）；

- **迭代器其实就是能够更方便的对某个数据结构进行遍历的对象**。

- **在JS中，迭代器也是一个具体的对象，但该对象需要符合迭代器协议（iterator protocol）；**

  - 在JS的标准中，该对象必须有一个特定的next方法；

- **next方法的要求：**

  - 一个无参数或有参数的函数，返回一个应拥有一下两个属性的对象：
  - done（boolean）：
    - 如果迭代器可以产生序列中的下一个值，则为false；
    - 如果迭代器已经将序列迭代完毕，则为true。在该情况下，value是可选的，如果它仍然存在，即为迭代结束之后返回的默认值；
  - value：
    - 迭代器返回任何的JS类型值，done为true时省略。

- 初识迭代器练习：

  - ```js
    const names = ['names', 'jeams', 'kobe', 'curry'];
    
    let index = 0;
    
    const namesIterator = {
      next() {
        if (index < names.length) {
          return { done: false, value: names[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
    
    console.log(namesIterator.next());
    console.log(namesIterator.next());
    console.log(namesIterator.next());
    console.log(namesIterator.next());
    console.log(namesIterator.next());
    
    // 封装到一个函数中
    function createArrayIterator(arr) {
      let index = 0;
      return {
        next() {
          if (index < arr.length) {
            return { done: false, value: arr[index++] };
          } else {
            return { done: true, value: undefined };
          }
        },
      };
    }
    
    const namesIterator1 = createArrayIterator(names);
    console.log(namesIterator1.next());
    console.log(namesIterator1.next());
    console.log(namesIterator1.next());
    console.log(namesIterator1.next());
    console.log(namesIterator1.next());
    ```

### 2.2 可迭代对象

- 当一个对象实现了iterator protocol协议时，该对象就是一个可迭代对象；

- 这个对象必须实现@@iterator方法，在代码中可以使用Symbol.iterator访问该属性；

- 代码演练：

  - ```js
    const obj = {
      name: '1231',
      age: 10,
      [Symbol.iterator]() {
        let index = 0;
    
        return {
          next() {
            if (index < Object.keys(obj).length) {
              return { done: false, value: Object.keys(obj)[index++] };
            } else {
              return { done: true, value: undefined };
            }
          },
        };
      },
    };
    
    const objIterator = obj[Symbol.iterator]();
    console.log(objIterator.next());
    console.log(objIterator.next());
    console.log(objIterator.next());
    
    for (const o of obj) {
      console.log(o);
    }
    ```

##### 2.2.1 **原生迭代器对象**

- **String、Array、arguments、NodeList、Map、Set；**

- ```js
  // 原生可迭代对象
  // string
  const str = '123';
  const strIterator = str[Symbol.iterator]();
  console.log(strIterator.next());
  console.log(strIterator.next());
  console.log(strIterator.next());
  console.log(strIterator.next());
  
  // array
  const arr = [1, 2, 3];
  const arrIterator = arr[Symbol.iterator]();
  console.log(arrIterator.next());
  console.log(arrIterator.next());
  console.log(arrIterator.next());
  console.log(arrIterator.next());
  
  // set
  const set = new Set([1, 3, 4, 5]);
  const setIterator = set[Symbol.iterator]();
  console.log(setIterator.next());
  console.log(setIterator.next());
  console.log(setIterator.next());
  console.log(setIterator.next());
  console.log(setIterator.next());
  
  // foo
  function foo() {
    const argIterator = arguments[Symbol.iterator]();
    console.log(argIterator.next());
    console.log(argIterator.next());
    console.log(argIterator.next());
    console.log(argIterator.next());
    console.log(argIterator.next());
    console.log(argIterator.next());
  }
  
  foo(1, 2, 3, 4, 5);
  ```

##### 2.2.2  **可迭代对象的应用**

- JS语法：for of、展开语法、yield*、解构赋值；
- 创建对象：new Map、new WeakMap、new Set、new WeakSet；
- 方法的调用：Promise.all、Promise.race、Array.from；
- ![image-20220717105526673](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/image-20220717105526673.png)

### 2.3 自定义类的迭代

- ```js
  class Person {
    constructor(name, age) {
      this.age = age;
      this.name = name;
    }
  
    [Symbol.iterator]() {
      let index = 0;
      const values = Object.values(this);
      return {
        next() {
          if (index < values.length) {
            return { done: false, value: values[index++] };
          } else {
            return { done: true, value: undefined };
          }
        },
      };
    }
  }
  
  const p = new Person('ice', 20);
  const pIterator = p[Symbol.iterator]();
  console.log(pIterator.next());
  console.log(pIterator.next());
  console.log(pIterator.next());
  
  for (const t of p) {
    console.log(t);
  }
  ```

### 2.4 迭代器的中断

- 如果需要监听迭代器在未完成迭代的情况下中断，可以在返回的对象中添加return方法；

- 中断方法：

  - 遍历时break、return、throw；
  - 解构时未解构完所有值；

- ```js
  [Symbol.iterator]() {
    let index = 0;
    const values = Object.values(this);
    return {
      next() {
        if (index < values.length) {
          return { done: false, value: values[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
      return() {
        console.log('迭代器提前中断了');
        return { done: true, value: undefined };
      },
    };
  }
  
  for (const t of p) {
    if (t === 'ice') break;
    console.log(t);
  }
  ```

# 3. 生成器（Generator）不熟

### 3.1 初识生成器

- 生成器是ES6新增的一种函数控制、使用方法，可以使用它来控制函数的执行、暂停等操作；
- **生成器函数也是一个函数，但是与普通的函数有一些区别：**
  - 首先：生成器函数需要在function后面加一个`*`号；
  - 其次：生成器函数可以通过yield关键字来控制函数的执行流程；
  - 最后：生成器函数的返回值是一个生成器（Generator）；
- **注意：生成器事实上也是一种特殊的迭代器；**

### 3.2 生成器函数的执行

- 生成器函数在调用的时候只是返回了一个生成器对象；

- 需要调用生成器对象的next方法才能执行函数；

- 在生成器函数中，可以通过yield关键字来返回next方法的结果；

- 演练如下：

  - ```js
    function* foo() {
      yield '1';
    
      yield '2';
    
      yield '3';
    
      console.log('4');
    }
    // 返回生成器对象
    const fooGenerator = foo();
    
    // 执行到第一个yield并暂停
    console.log(fooGenerator.next()); // 1
    
    // 执行到第二个yield并暂停
    console.log(fooGenerator.next()); // 2
    
    // 执行到第三个yield并暂停
    console.log(fooGenerator.next()); // 3
    
    // 执行到最后，并返回undefined
    console.log(fooGenerator.next()); // undefined
    ```

### 3.3 生成器的next、return、throw方法（函数）

#### 3.3.1 next方法（函数）

- 生成器函数可以分段执行，也可以分段的传递参数；

- next传递的参数会由上一个yield关键字返回；

- 演练如下：

  - ```js
    function* foo(value) {
      const value1 = yield value + 1;
      const value2 = yield value1 + 2;
      const value3 = yield value2 + 3;
    }
    
    const fooGenerator = foo('ice');
    const result1 = fooGenerator.next('jeams');
    console.log(result1); //{value: 'ice1', done: false}
    const result2 = fooGenerator.next(result1.value + 'kobe');
    console.log(result2); // {value: 'ice1kobe2', done: false}
    const result3 = fooGenerator.next(result2.value + 'curry');
    console.log(result3); // {value: 'ice1kobe2curry3', done: false}
    ```

#### 3.3.2 return方法（生成器提前结束）

- 也可以通过return方法给生成器函数传递参数；

- 但使用该方法后，生成器函数则停止执行，后续的next不会再产生值；

- 演练: 

  - ```js
    const fooGenerator = foo('ice');
    const result1 = fooGenerator.next('jeams');
    console.log(result1); //{value: 'ice1', done: false}
    const result2 = fooGenerator.return(result1.value + 'kobe');
    console.log(result2); // {value: 'ice1kobe2', done: false}
    const result3 = fooGenerator.next(result2.value + 'curry');
    console.log(result3); // {value: undefined, done: true}
    ```

#### 3.3.3 throw方法（生成器抛出异常）--异常--后续重新观看

- 抛出异常后可以在生成器函数中捕获异常；

- 但是在catch语句中不能在继续yield新的值，但在catch语句外可以继续使用yield继续函数的执行；

- 演练：

  - ```js
    const fooGenerator = foo('ice');
    const result1 = fooGenerator.next('jeams');
    console.log(result1); //{value: 'ice1', done: false}
    fooGenerator.throw('12321');
    const result2 = fooGenerator.return(result1.value + 'kobe');
    console.log(result2); // {value: 'ice1kobe2', done: false}
    const result3 = fooGenerator.next(result2.value + 'curry');
    console.log(result3); // {value: undefined, done: true}
    ```

### 3.4 生成器替代迭代器

- 可以使用`yield*`语法来产生一个可迭代的对象；

  - 其实这只是`yield`的语法糖，会每次自动迭代这个可迭代对象，每次迭代其中的一个值；

- 演练：

  - ```js
    function* createArrayIterator(arr) {
      yield* arr;
    }
    const arr = [1, 2, 3, 4, 5];
    const arrIterator = arr[Symbol.iterator]();
    for (const a of arrIterator) {
      console.log(a);
    }
    
    // 自定义类
    class Person {
      constructor(name, age) {
        this.age = age;
        this.name = name;
      }
    
      *[Symbol.iterator]() {
        yield* Object.values(this);
      }
    }
    
    const p = new Person('ice', 20);
    const pIterator = p[Symbol.iterator]();
    for (const pi of pIterator) {
      console.log(pi);
    }
    ```

# 4. 生成器进行异步处理方案 不熟

### 4.1 旧时异步处理方案

- ```js
  function requestData(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(url), 2000);
    });
  }
  
  // 每一次请求都需要依赖前一次结果
  function getData() {
    requestData('iuce').then((res1) => {
      requestData('12312' + res1).then((res2) => {
        requestData('333' + res2).then((res3) => {
          console.log(res3);
        });
      });
    });
  }
  
  function getData() {
    requestData('iuce')
      .then((res1) => {
      return requestData(res1 + '111');
    })
      .then((res2) => {
      return requestData(res2 + '2222');
    })
      .then((res3) => {
      console.log(res3);
    });
  }
  getData();
  ```

### 4.2 Generator方案

- ```js
  // generator方案
  function* getData() {
    const res1 = yield requestData('1');
    console.log(res1);
    const res2 = yield requestData(res1 + '2');
    console.log(res2);
    const res3 = yield requestData(res2 + '3');
    console.log(res3);
  }
  
  const getDataIterator = getData();
  
  getDataIterator.next().value.then((res1) => {
    console.log(res1);
    getDataIterator.next(res1).value.then((res2) => {
      console.log(res2);
      getDataIterator.next(res2).value.then((res3) => {
        console.log(res3);
      });
    });
  });
  ```

### 4.3 自动化Generator函数

- ```js
  // 自动化generator函数
  function execGenerator(genFn) {
    const generator = genFn();
  
    function exec(res) {
      const result = generator.next(res);
  
      if (result.done) return result.value;
      result.value.then((res) => {
        exec(res);
      });
    }
  
    exec();
  }
  
  execGenerator(getData);
  ```

# 5. async和await

### 5.1 async关键字

- async关键字是用于声明一个异步函数的；

  - async是asynchronous单词的缩写，翻译为异步，非同步；
  - sync是synchronous单词的缩写，翻译为同步、同时；

- async写法：

  - ```js
    async function foo() {}
    
    const bar = async function() {}
    
    const baz = async () => {}
    
    class Person {
      async foo() {}
    }
    ```

### 5.2 异步函数的执行流程

- 异步函数的内部代码执行过程和普通的函数是一致的，默认情况下也是会被同步执行的；
- **但异步函数的返回值和普通函数的返回值有区别：**
  - 情况一：异步函数的直接返回值，会被包裹在Promise的resolve中；
  - 情况二：异步函数的返回值如果是Promise，状态则由Promise决定；
  - 情况三：异步函数的返回值如果是一个对象并且实现了thenable，则有对象的then方法决定；
- **如果async抛出了异常，则由Promise的reject来传递；**

### 5.3 await关键字

- **async函数中可以使用await关键字，在普通函数中则不可以；**
- **await关键字的特点：**
  - await后面通常跟一个表达式，这个表达式会返回一个Promise；
  - await会等待Promise的状态变成fulfilled状态，之后再继续执行异步函数；
- **返回值：**
  - 如果await后面的是一个普通值，则直接返回；
  - 如果await后面是一thenable对象，则由对象的then方法决定后续的值；
  - 如果await后面的表达式返回的是Promise的rejected状态，则将reject的结果作为函数的Promise的reject值；

