import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Civi 的小 Wiki",
  description: "用 VuePress Theme Hope 搭建的个人知识库练手项目",
  base: "/",

  // 使用 Vite 作为打包器
  bundler: viteBundler(),

  // 主题配置拆到 theme.ts 里
  theme,
});
