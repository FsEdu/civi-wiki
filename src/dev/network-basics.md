---
title: 网络与端口排错笔记
---

# 网络与端口排错笔记

这里记录一些在部署服务时常见的「端口打不开 / 访问不了」问题，以及习惯性的排查顺序。

## 1. 先确认服务有没有跑起来

```bash
# 看进程
ps aux | grep python
ps aux | grep node

# 或者直接看某个服务 (示例)
systemctl status my-service
