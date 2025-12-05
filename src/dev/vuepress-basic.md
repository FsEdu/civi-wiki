---
title: VuePress 基本命令与项目结构
---

# VuePress 基本命令与项目结构

这一篇记录当前 Wiki 的基本项目结构和常用命令，方便以后回顾。

## 项目结构

```text
civi-wiki
├── package.json
└── src
    ├── .vuepress
    │   ├── config.ts
    │   └── theme.ts
    ├── README.md
    ├── about
    │   └── README.md
    ├── dev
    │   ├── README.md
    │   ├── vuepress-basic.md
    │   ├── deploy-with-cloudflare.md
    │   ├── docker-notes.md
    │   ├── linux-notes.md
    │   └── qinglong-notes.md
    └── law
        ├── README.md
        ├── internship-notes.md
        ├── case-observation.md
        ├── prosecution-workflow.md
        └── youth-risk-digital.md
