import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  // 记得改成你自己的真实域名
  hostname: "https://wiki.yuki.hidns.vip",

  author: {
    name: "Civi",
  },

  // 顶部导航
  navbar: [
    { text: "首页", link: "/" },
    { text: "系统 & 开发", link: "/dev/" },
    { text: "大模型随笔", link: "/law/" },
    { text: "关于", link: "/about/" },
  ],

  // 侧边栏
  sidebar: {
    "/dev/": [
      {
        text: "系统基础",
        children: [
          "/dev/",
          "/dev/vuepress-basic.md",
          "/dev/network-basics.md",
        ],
      },
      {
        text: "容器与部署",
        children: [
          "/dev/docker-notes.md",
        ],
      },
    ],

    "/law/": [
      {
        text: "大模型总览",
        children: [
          "/law/",
          "/law/internship-notes.md",
        ],
      },
      {
        text: "提示工程",
        children: [
          "/law/prompt-engineering.md",
        ],
      },
      {
        text: "RAG 与检索增强",
        children: [
          "/law/rag-basics.md",
        ],
      },
    ],

    "/about/": ["/about/"],
  },

  lastUpdated: true,
  contributors: true,

  footer: "© 2025 Civi · Computer & LLM Tech Notes",
  displayFooter: true,

  plugins: {
    // 以后想加搜索、阅读时间、评论等插件，可以在这里按需开启
  },
});
