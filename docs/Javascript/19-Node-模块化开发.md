# 1. Node.js

### 1.1 Node.js的定义

- 官方定义：
  - Node.js是一个基于V8 JavaScript引擎的JavaScript运行环境；
  - 但Node不仅仅只有V8引擎，它在其中还有一些文件系统读/写、网络IO、加密、压缩解压文件等操作；

### 1.2 浏览器和Node架构

#### 1.2.1 Node架构

- JS的代码会经过V8引擎，然后再通过Bindings，将任务放在Libuv的事件循环中；
- Libuv（Unicorn Velociraptor-独角伶盗龙）是使用C语言编写的库；
- Libuv提供了事件循环、文件系统读写、网络IO、线程池等等内容；
- ![image-20220804175718569](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041757607.png?token=AQH5FHINFYWIKP2OS75C24TC5OMD2)

#### 1.2.2 Node与浏览器架构的区别

- ![image-20220804175646132](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041756156.png?token=AQH5FHOJDNEAANICZI2M3I3C5OMB4)




### 1.3 应用场景

- 应用一：前端开发的库都是一node包的形式进行管理；
- 应用二：npm、yarn、pnpm工具成为前端开发使用最多的工具；
- 应用三：越来越多的公司使用node.js作为web服务器开发、中间件、代理服务器；
- 应用四：大量的项目需要借助node.js完成前后端渲染的同构应用；
- 应用五：使用node.js来为项目编写脚本工具；
- 应用六：很多企业在使用Electron来开发桌面应用程序；



### 1.4 Node.js的安装

- 版本：
  - Node.js诞生于2009年，目前最新的版本分为LTS 16.15.1和Current 18.4.0
    - LTS版本：（long-term support，长期支持）相对稳定的版本，推荐线上环境使用；
    - Current版本：最新的node版本，包括很多新特性；
- 安装：
  - Mac可以借助homebrew等工具安装；
  - windows可以下载对应的安装包；
  - 以及其他...

### 1.5 Node的版本工具

- 当需要使用多个版本的node时，可以借助于一些工具来快速切换node；
- 例如：
  - nvm：Node Version Manager；
  - n：Interactively Manage Your Node.js Version（交互式管理你的Node.js版本）；
- nvm的使用：
  - nvm install latest：安装最新的Node版本；
  - nvm list：展示目前安装的所有版本；
  - nvm use：切换版本；
- n的使用：
  - **`npm install -g n`**：安装
  - **`n -- version`**：查看版本
  - **`n lts`**：安装最新的lts版本；
  - **`n latest`**：安装最新的版本；
  - **`n`**：查看所有版本；

### 1.6 Node的REPL

- REPL：Read-Eval-Print Loop的简称，翻译为“读取-求值-输出” 循环；
- REPL是一个简单的、交互式的编程环境；
- 从某种情况上，浏览器的console就可以看成为一个REPL；
- Node中也提供了一个REPL的环境，可以在其中演练其代码；
- ![image-20220804175747037](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041757072.png?token=AQH5FHIBSDCPQMBXR3PSWSLC5OMFQ)

### 1.7 Node程序传递参数

- 正常执行文件：node index.js

- 传递参数：node index.js env=development coderwhy

- 获取参数：

  - 在process的内置对象中可以获取到相应的参数；
  - 该对象包含了一些特别的信息：如版本、操作系统等信息；
  - 可以在其中找到一个argv的属性，该数组则包含了对应的参数；

- **为什么从argv中获取到参数：**

  - 因为在C/C++程序的main函数中，可以获取到两个参数：

    - argc：argument counter的缩写，传递参数的个数；
    - argv：argument vector（向量、矢量）的缩写，传入的具体参数；
      - vector翻译过来为矢量的意思，在程序中表示的是一种数据接构；
      - 在C/C++、Java中也有该数据结构，是一种数组结构；
      - 在JS中也是一个数组，里面存储着一些参数信息；

  - JS中获取argv：

    - ```js
      process.argv.forEach(item => {
        console.log(item)
      })
      ```

### 1.8 Node的输出

- console.log
  - 最常用的输出方式；
- console.clear
  - 清空控制台；
- console.trace
  - 打印函数的调用栈；

### 1.9 特殊的全局对象

- 为什么称之为特殊的全局对象：

  - 因为这些对象实际上是模块中的变量，也正是因为每个模块都有，看起来像是全局对象；

  - **但这些对象在命令行交互中是不可以使用的；**

    - 主要有：**`__dirname、__filename、exports、module、require();`**

    - **`__dirname：获取当前文件所在的路径，但不包括后面的文件名；`**

    - **`__filename:获取当前文件所在的路径和文件名称，包括后面的文件名称；`**

    - ```js
      console.log(__dirname);
      // /User/wu/Desktop/node/TestNode/03_全局变量
      console.log(__filename);
      // /User/wu/Desktop/node/TestNode/03_全局变量/demo.js
      ```

### 1.10 常见的全局对象

- **process对象：**process提供了Node进程中的相关信息：

  - 例如Node的运行环境、参数信息等；

- **console对象：**提供了简单的调试控制台；

- **定时器函数：**在Node中使用定时器有好几种方式：

  - **setTimeout（callback、delay[,...args])：**callback在delay毫秒后执行一次；
  - **setInterval（callback、delay[,...args])：**callback在每delay毫秒后重复执行；
  - **setImmediate（callback[,...args])：**callback I/O事件后的回调的立即执行；
  - **process.nextTick(callback[,...args]：**添加到下一次的tick队列中；

- **global对象：**

  - global是一个全局对象，像process、console、定时器等都有被放到global中；
  - 像globalThis该属性，就只想global对象；

- **global对象和window对象的区别：**

  - 在浏览器中，全局的属性都在window对象中，如document、console、alert等；

  - 在Node中，也有一个global的属性，并且也存放着许多的属性；

  - **但在浏览器执行的JS代码中，如果有在顶层的作用域中使用var定义一个属性，该属性会被默认的加入到window对象中；**

  - **而在Node中，通过var定义一个变量，它则只是在当前模块中有一个变量而已，不会被添加到全局中；**

  - ```js
    // 浏览器
    var name = 'iuce'
    console.log(name) // iuce
    
    // Node 
    var name = 'iuce'
    console.log(global.name) // undefined
    
    ```

# 2. JavaScript的模块化开发

### 2.1 模块化的概念

- 模块化开发的最终目的是将程序划分为一个个小的结构；
- 在该结构中编写属于自己的逻辑代码，有自己的作用域，定义变量名词时不会受到其他结构的影响；
- 这个结构可以将自身需要暴露的变量、函数、对象等进行导出给其他结构进行使用；
- 也可以通过某种方式，导入其他结构中的变量、函数、对象等；
- **以上说到的结构其实即是模块，按照这种结构划分开发程序的过程，就被称之为模块化开发的过程；**

### 2.2 模块化的历史

- **早期：**BrendanEich开发JS仅仅作为一种脚本语言，做一些简单表单验证和动画实现而已，且代码量极少，压根不需要使用到模块化；
- **中期：**随着前端和JS的快速发展，JS的代码越来越复杂；例如ajax的出现、前后端分离、SPA的出现、前端路由、状态管理、Node实现的后端程序，在这种情况下，没有模块化是致命的硬伤；
- **后期：在ECMA推出相应的模块化之前，相应的社区已经涌出了许多不同的模块化规范，例如：AMD、CMD、CommonJS等；**

### 2.3 没有模块化的问题

- 命名冲突问题，虽然可以通过立即函数调用表达式进行解决，但也会带来新的问题：
  - 第一：需要记得每个模块返回的对象命名；
  - 第二：代码写起来混乱不堪，每个文件中的代码都包裹在一个匿名函数中；
  - 第三：没有规定的规范下，每个人的命名方式都不一样；

# 3.  CommonJS规范

### 3.1 CommonJS规范和Node.js的关系

- **CommonJS最初提出来是在浏览器以外的地方使用，并且当时被命名为ServerJS，但后续为了体现它的广泛性，修改其为CommonJS，也会被简称为CJS；**

  - Node是CommonJS在服务器端中一个具有代表性的实现；
  - Browserify是CommonJS在浏览器中的一种实现；
  - webpack打包工具具备对CommonJS的支持和转换；

- **Node对CommonJS进行了支持和实现，可以在开发node的进程中进行模块化开发：**

  - 在Node中，**每个JS的文件都是一个单独的模块；**
  - 在该模块中包含了**ComonJs规范的核心变量：exports、module.exports、require；**
  - 可以使用以上的变量进行模块化开发；

- **变量的作用：**

  - **exports和module.exports可以对模块中的内容进行导出；**

  - **required函数可以用于导入其他模块的内容，例如自定义模块、系统模块、第三方库模块等；**

  - ```js
    // bar.js
    function foo() {
      console.log('foo')
    }
    
    const name = '1232'
    
    exports.name = name;
    exports.foo = foo
    
    
    // main.js
    const bar = require('./bar')
    console.log(bar.name)
    console.log(bar.foo())
    ```

### 3.2 exports的使用

- **exports是一个对象，可以在该对象中添加多个属性，添加的属性都会被其导出；**

- **在另一个文件中可以导入；**

- **当导入一个文件之后，类似于发生了以下的过程：**

  - 首先，导入定义的变量等于exports对象；

  - 也就是require通过各种查找的方式，最终找到exports对象；

  - 并且将exports对象赋值给定义的变量；

  - 因此，bar对象等同于exports这个对象；

  - ```js
    // bar.js
    exports.name = '123'
    exports.age = 12;
    
    // main
    const bar = require('./bar');
    
    
    ```

### 3.3 module.exports的使用

- **exports和module.exports的区别：**
  - 首先，**CommonJS中是没有module.exports的概念的；**
  - 其次，**Node为了实现模块的导出，Node使用了Module类，每一个模块都是Module的一个实例，也就是module；**
  - 因此，**在Node中，真正用于导出的并不是exports，而是module.exports；**
  - **因为module才是导出的真正实现者；**
- **为什么exports也可以进行导出？**
  - 因为**module对象的exports属性是exports对象的一个引用；**
  - 也就是：**module.exports = exports ；**

### 3.4 require的使用

- **require是一个函数，可以用于导入一个文件（模块）中导出的对象；**
- require的查找规则：
  - 情况一：**导入的是Node的一个核心模块，比如path、http；**
    - 直接返回核心模块，并且停止查找；
  - 情况二：**导入是以`./`或`../`或`/`（根目录）开头的；**
    - 第一步：将会以一个文件的形式在对应的目录下进行查找；
      - 如果有后缀名，按照后缀名的格式来查找对应的文件；
      - 如果没有后缀名，按照下面的顺序查找：
        - 直接查找文件；
        - 查找.js后缀的文件；
        - 查找.json后缀的文件；
        - 查找.node后缀的文件；
    - 第二步：没有找到对应的文件，将作为一个目录；
      - 查找目录下的index文件
        - 查找index.js后缀的文件；
        - 查找index.json后缀的文件；
        - 查找index.node后缀的文件；
    - **如果最后没有找到，则报错：not found**
  - 情况三：**导入的不是一个路径，也不是一个模块，将以以下的路径中的node_modules中查找，如果都没有找到，则报错：not found；**
    - ![image-20220804175835257](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041758300.png?token=AQH5FHJSYRYNMSSJ4T766F3C5OMIS)

### 3.5 模块加载过程

- **结论一：模块在被第一次引入时，模块中的JS代码会被运行一次；**
- **结论二：模块被多次引用时，会有相应的缓存，最终只运行一次；**
  - 为什么只加载（运行）一次；
  - 因为每个模块对象中都有一个属性：**loaded，该属性为false时表示还未加载，true时 表示已加载；**
- **结论三：如果有循环引入，加载顺序是按照深度优先算法来加载；**

### 3.6 CommonJS规范的缺点

- **CommonJS加载模块是同步的：**
  - 只有等到对应的模块加载完毕，当前模块中的内容才会继续运行；
  - 但在服务器中不会存在什么问题，因为服务器中加载文件都是本地文件，加载速度非常快；
- **但在浏览器中，则需要将其文件下载下来，在加载运行；后续的JS代码都无法正常运行，会被阻塞；**
- **因此在浏览器中，通常不使用CommonJS规范；**

# 4. AMD规范和CMD规范（少用）

### 4.1 AMD规范

- AMD主要是应用于浏览器的一种模块化规范：
  - AMD是**`Asynchronous Module Definition（异步模块定义）`**的缩写：
  - AMD采用的是异步加载模块；
- 实现：
  - 使用require.js和curl.js库来实现；
- 使用：
  - ![image-20220804180209099](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041802125.png?token=AQH5FHK5VZZPVKQAKPC3WV3C5OMV4)

### 4.2 CMD规范

- CMD规范也是应用于浏览器的一种模块化规范；
  - CMD是**`Common Module Definition（通用模块定义)`**的缩写；
  - 采用的也是异步加载模块，但是它将CommonJS的优点吸收了；
- CMD的实现方案：**`SeaJS`**;
- 使用：
  - ![image-20220804180512127](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041805157.png?token=AQH5FHOXQUW3HYDKN65DZUTC5ONBK)

# 5. ES Module（ES6新增）

### 5.1 认识ES Module

- ES Module与CommonJS的模块化的一些不同之处：
  - **第一 ：它使用了import和export关键字；**
  - **第二：它采用了编译器的静态分析，并且加入了动态引入的方式；**
- ES Module模块采用`export`和`import`关键字来实现模块化；
  - **export负责模块的到处；**
  - **import负责模块的导入；**
- **注意：ES Module自动采用严格模式（use strict）；**
- **在浏览器中不可以直接运行ES Module的代码，会报错，因为在本地加载HTML文件时，会遇到CORS错误，因为JS模块安全性的需要；需要通过一个服务器来进行测试。**

### 5.2 export关键字

- export关键字负责将一个模块中的变量、函数、类等到处；

- 如果希望将其他的内容全部导出，有如下方式：

  - 方式一：在语句声明之前加上export关键字；

  - 方式二：将所有需要到处的标识符，放在export的`{}`中；

    - **注意：export后面的`{}`并不是ES的对象字面量的增强写法，`{}`也不是一个对象；**
    - 因此，此种语法是错误的：`{name: name}`;

  - 方式三：导出时给标识符起一个别名；

  - 演练：

    - ```js
      // 方式一
      export const name = '123'
      
      //方式二
      const age = 19;
      const address = '12321321'
      const info = {
        name: 'iuce',
        age: 22,
        height: 1.98
      }
      
      export {
      	info,
        age,
        address
      }
      
      // 方式三
      const obj = {}
      
      export {
      	obj as newObj
      }
      ```

### 5.3 import关键字

- import关键字负责从另一个模块中导入内容；

- 导入方式：

  - 方式一：import {标识符列表} from '模块';

    - **注意：这里的`{}`也不是一个对象，里面只是存放导入的标识符列表的内容；**

  - 方式二：导入时通过`as`关键字给标识符起别名；

  - 方式三：通过`*`将模块功能放到一个模块功能对象（a module object）上；

  - 演练：

    - ```js
      // 方式一
      import { name, age } from 'bar'
      
      // 方式二
      import { name as newName, age as newAge } from 'bar'
      
      // 方式三
      import * as obj from 'bar'
      import * from 'bar'
      ```

### 5.4 export和import结合使用

- ```js
  export { sum as newSum } from 'bar'
  ```

- 使用原因：

  - ![image-20220804182203550](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041822591.png?token=AQH5FHLMGMATTBBNUNP6V4LC5OPAQ)

### 5.5 default用法

- **默认导出：**

  - 默认导出（export）是可以不需要指定名字；
  - 导入时也不需要使用`{}`，并且可以自定义名字；

- **注意：在一个模块中，只能有一个默认导出(default export);**

- 演练：

  - ```js
    // 导出
    export default function() {
      console.log(232)
    }
    
    // 导入
    
    import FOO from "./bar.js"
    FOO()
    ```

### 5.6 import函数

- 通过import加载一个模块，是不可以在其逻辑代码中的；

- **但如果需要动态的决定加载某一个模块，可以使用import函数来来进行动态导入；**

- import函数返回的是一个Promise，可以通过then方法来获取结果；

- 演练：

  - ```js
    // 错误用法，会报错
    if (true) {
    	import sub from './sub.js'
    }
    
    // import函数
    if (true) {
      import("./modules/aaa.js").then(res => {
        console.log(res)
      })
    }
    ```

### 5.7 import meta（ES11新增）

- **import meta是一个给JS模块暴露特定上下文的元数据属性的对象；**
  - 主要包含了这个模块的一些信息，例如：该模块的URL等；

### 5.8 ES Module的解析流程：

![image-20220804183011631](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041830664.png?token=AQH5FHPVDONDRINVBPE7H6DC5OP7E)

![image-20220804183021538](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041830568.png?token=AQH5FHLVWNPOEI4PR7GXEILC5OP7U)

![image-20220804183031525](https://raw.githubusercontent.com/ICE-XIAOWU/picxImg/master/img/202208041830556.png?token=AQH5FHIH2KV7H5AUDUDA373C5OQAK)

