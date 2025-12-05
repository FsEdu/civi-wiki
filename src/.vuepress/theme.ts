import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  // 部署后可以改成你的真实域名
  hostname: "https://wiki.example.com",

  author: {
    name: "Civi",
  },

  // 顶部导航
  navbar: [
    { text: "首页", link: "/" },
    { text: "技术笔记", link: "/dev/" },
    { text: "实务笔记", link: "/law/" },
    { text: "关于", link: "/about/" },
  ],

  // 侧边栏
  sidebar: {
    "/dev/": [
      {
        text: "开发环境与脚本",
        children: [
          "/dev/vuepress-basic.md",
          "/dev/docker-notes.md",
        ],
      },
    ],
    "/law/": [
      {
        text: "未检 / 刑执 实务",
        children: [
          "/law/internship-notes.md",
        ],
      },
    ],
    "/about/": [
      "/about/README.md",
    ],
  },

  // 页脚 & 文章信息
  lastUpdated: true,
  contributors: true,

  footer: "© 2025 Civi · 个人练手 Wiki",
  displayFooter: true,

  // 初期先不折腾插件，后面想玩搜索 / 评论再加
  plugins: {},
});
