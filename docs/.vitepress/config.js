import { defineConfig } from "vitepress";

import { nav, JSSidebar } from "./configs";

export default defineConfig({
  // 打包输出目录
  outDir: "../dist",
  // 设置网站语言
  lang: "zh-CN",
  // 网站title
  title: "",
  // 标题模版
  titleTemplate: "RICH BLOG - :title",
  // 站点描述
  description: "属于我的随记",
  // 在页面的head部分添加东西
  head: [
    ["link", { rel: "preconnect", href: "/favicon.ico", crossorigin: "" }],
  ],
  // 每个页面的最后更新时间
  lastUpdated: true,
  // 主题配置
  themeConfig: {
    // logo 路径以public目录查询
    logo: "/logo.png",
    //
    siteTitle: "RICH'S",
    // 导航栏配置
    nav,
    sidebar: {
      ...JSSidebar,
    },
    // 页脚配置
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-Rich",
    },

    algolia: {
      appId: "...",
      apiKey: "...",
      indexName: "...",
    },
  },

  /* 右侧大纲配置 */
  outline: {
    level: "deep",
    label: "本页目录",
  },

  // 社交链接
  socialLinks: [{ icon: "github", link: "https://github.com/ICE-XIAOWU" }],

  darkModeSwitchLabel: "外观",
  returnToTopLabel: "返回顶部",
  lastUpdatedText: "上次更新",

  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
});
