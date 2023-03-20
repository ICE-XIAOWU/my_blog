/**
 * NavItemWithLink {
  text: string 展示的文本
  link: string 单击文本时导航到的链接，可以将链接设置为不带.md的后缀的文件，并一直以/开头
  activeMatch?: string  处于当前链接的状态
  target?: string 跳转方式
  rel?: string  // 链接的类型
}

NavItemChildren {
  text?: string
  items: NavItemWithLink[]
}

NavItemWithChildren {
  text?: string
  items: (NavItemChildren | NavItemWithLink)[]
  activeMatch?: string
}
 */

const nav = [
  {
    text: "JavaScript",
    link: "/JavaScript/01-javascript-基础",
  },
  { text: "TypeScript", link: "/TypeScript/01-xxx" },
  { text: "React", link: "/React/" },
  { text: "Vue3", link: "/Vue3/" },
  { text: "工具导航", link: "/tools/" },
];
export { nav };
