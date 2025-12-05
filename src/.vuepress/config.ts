import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Civi Tech Notes",
  description: "记录计算机系统、大模型与工具链的技术随笔",
  base: "/",

  bundler: viteBundler(),

  theme,
});
