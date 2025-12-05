import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  // 这里可以改成你真实的域名，比如 https://wiki.xxx.com
  hostname: "https://wiki.example.com",

  author: {
    name: "Civi",
  },

  // 顶部导航
  navbar: [
    { text: "首页", link: "/" },
    { text: "技术笔记", link: "/dev/" },
    { text: "实务随记", link: "/law/" },
    { text: "关于", link: "/about/" },
  ],

  // 侧边栏
  sidebar: {
    "/dev/": [
      {
        text: "总体说明",
        children: [
          "/dev/",
        ],
      },
      {
        text: "VuePress & 部署",
        children: [
          "/dev/vuepress-basic.md",
          "/dev/deploy-with-cloudflare.md",
        ],
      },
      {
        text: "环境与脚本",
        children: [
          "/dev/docker-notes.md",
          "/dev/linux-notes.md",
          "/dev/qinglong-notes.md",
        ],
      },
    ],

    "/law/": [
      {
        text: "栏目说明",
        children: [
          "/law/",
        ],
      },
      {
        text: "未检 / 刑执 实务",
        children: [
          "/law/internship-notes.md",
          "/law/case-observation.md",
          "/law/prosecution-workflow.md",
        ],
      },
      {
        text: "数字化与风险评估",
        children: [
          "/law/youth-risk-digital.md",
        ],
      },
    ],

    "/about/": [
      "/about/",
    ],
  },

  lastUpdated: true,
  contributors: true,

  footer: "© 2025 Civi · 个人练手 Wiki",
  displayFooter: true,

  plugins: {
    // 后面想加搜索、阅读时长、评论，再在这里按需开启即可
  },
});
