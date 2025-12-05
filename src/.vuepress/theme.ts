import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  // 部署后的真实域名，记得换成你自己的
  hostname: "https://wiki.example.com",

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

  // 侧边栏配置
  sidebar: {
    "/dev/": [
      {
        text: "系统 & 开发",
        children: [
          "/dev/",
          "/dev/vuepress-basic.md",
        ],
      },
    ],
    "/law/": [
      {
        text: "大模型随笔",
        children: [
          "/law/",
          "/law/internship-notes.md",
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
