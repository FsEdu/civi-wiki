import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Civi 的小 Wiki",
  description: "记录开发、脚本与未检/刑执实务的个人知识库",
  base: "/",

  bundler: viteBundler(),

  theme,
});
