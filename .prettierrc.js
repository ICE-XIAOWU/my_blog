module.export = {
  // 是否用制表符代替空格执行缩进
  useTabs: false,
  // 缩进的空格数
  tabWidth: 2,
  // 代码行宽度
  printWidth: 80,
  // 是否使用单引号，JSX单独设置
  singleQuote: false,
  // 是否在JSX中使用单引号
  jsxSingleQuote: true,
  // false 多行 jsx 中的 > 放在最后一行，而不是另起一行
  jsxBracketSameLine: false,
  // 在多行以逗号分割的句法中尽可能补充尾行逗号。 es5 为在es5中进行补充 none 不进行补充  all 尽可能补充，包括函数参数、函数调用，支持TS
  trailingComma: "all",
  // 是否在代码语句结尾添加分号
  semi: true,
  // 设置换行风格 参数为 lf / crlf / cr / auto，默认lf
  endOfLine: "lf",
  // 是否在对象属性与大括号之间填充空格
  bracketSpacing: true,
  // 开始标签的右尖括号是否跟随在最后一行属性末尾。 前提：非自结束标签、HTML多行属性（HTML, JSX, Vue, Angular）
  bracketSameLine: false,
  // 单个参数的箭头函数使用括号 参数：always / avoid ； 默认值 always
  // always (x) => x
  // avoid x => x
  arrowParens: "always",
  // 是否仅格式化文件开始位置存在特殊注释的代码
  requirePragma: false,
  // 是否在文件插入标记表明该文件已被格式化处理过了
  insertPragma: false,
  // 是否在Vue文件中对代码和标签进行缩进，script和style部分
  vueIndentScriptAndStyle: false,
  // 是否格式化一些文件中被嵌入的代码片段的风格，如果插件可以识别; 参数 off / auto
  embeddedLanguageFormatting: "auto",
};
