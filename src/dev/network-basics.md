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
基本问题：程序根本没启动、启动后立刻崩了、或者跑在了你没想到的环境里。

2. 确认端口是否监听
# 推荐 ss
ss -tulnp

# 如果没有 ss，可以用 netstat（需要安装 net-tools）
netstat -tulnp

重点关注：

协议：TCP or UDP？

监听地址：0.0.0.0 / 127.0.0.1 / 内网 IP？

端口号：是否和你反向代理 / 客户端配置的一致？

常见坑：

服务只监听在 127.0.0.1，但你希望外网访问；

反向代理转发到的端口和实际端口不一致。

3. 防火墙与安全组
服务器本身可以访问，但外网访问不了时，可以检查：
# iptables / firewalld 状态
iptables -L
firewall-cmd --state
如果服务器在云厂商上，还要看：

安全组是否放行对应端口；

是否限制了来源 IP。

一个简单习惯：新开端口时，在 README 或 Wiki 里记一下「谁用、用途是什么」，避免以后自己忘了。

4. 反向代理配置
当引入 Nginx / Cloudflare 之类的组件时，链路会变成：

用户浏览器 → Cloudflare → Nginx → 后端服务

排错顺序可以是：

直接访问后端服务（例如 http://IP:8000）是否正常？

访问 Nginx 反代端口（如 http://IP:80）是否有日志？

Cloudflare 面板里这个域名的 DNS 和 HTTPS 规则是否正确？

Nginx 典型的反代配置：
location /api/ {
    proxy_pass http://127.0.0.1:8000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
5. 和大模型服务的结合点
大模型相关服务（Web UI、API 网关等）经常涉及：

WebSocket 或 SSE（流式响应）；

长连接 / 超时设置；

代理链路较长（本地 → 代理 → 云服务）。

建议：

把「入口端口」「后端端口」「反代理域名」画一个简单的拓扑图；

关键节点都加上健康检查接口（如 /health），方便快速验证链路是否通。

---

### 2️⃣ 新建：`src/dev/docker-notes.md`

> 路径：同样在 `src/dev/` 下创建文件：  
> **`src/dev/docker-notes.md`**

```md
---
title: Docker 与容器化实践
---

# Docker 与容器化实践

这一篇主要记录在部署各类服务（包括大模型相关服务）时，使用 Docker 的一些基本习惯和经验。

## 1. 容器视角理解服务

一个容器就是一个「打包好的进程环境」：

- 包含运行这个服务所需的依赖；
- 代码版本和配置相对固定；
- 通过镜像版本号来控制发布节奏。

优点是：换服务器时只要能跑 Docker，迁移成本会小很多。

## 2. 常用命令速查

```bash
# 查看镜像
docker images

# 构建镜像（当前目录有 Dockerfile）
docker build -t my-service:latest .

# 运行容器
docker run -d --name my-service -p 8000:8000 my-service:latest

# 查看容器日志
docker logs -f my-service

# 进入容器
docker exec -it my-service bash

3. 多阶段构建的简单示例
比如一个 Python Web 服务，可以用多阶段构建减小最终镜像体积：

# 第一阶段：构建依赖
FROM python:3.11-slim AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

# 第二阶段：运行镜像
FROM python:3.11-slim
WORKDIR /app

COPY --from=builder /install /usr/local
COPY . .

CMD ["python", "app.py"]
核心 idea：在 builder 阶段编译 / 安装依赖，在运行阶段只复制结果。

4. 映射配置与数据卷
在部署大模型服务时，经常需要映射配置文件和模型数据：
docker run -d \
  --name llm-service \
  -p 9000:9000 \
  -v /opt/llm/config.yaml:/app/config.yaml \
  -v /opt/llm/models:/app/models \
  llm-service:latest
这样做的好处：

更新镜像时不会覆盖配置和模型文件；

可以在不重建镜像的情况下调整部分参数。

5. 清理与维护
# 删除已退出容器
docker container prune

# 删除悬空镜像
docker image prune

# 删除所有没用到的东西（慎用）
docker system prune -a
一般建议：

不要频繁使用 system prune -a，容易删多；

对于大模型镜像，注意在构建时避免把缓存、临时文件打进镜像里。

6. 和大模型的结合点
将推理服务封装成镜像后，可以方便地在不同机器上复用；

可以为不同模型版本分别打 tag，例如 llm-service:2025-01；

通过环境变量控制模型路径、并发数、日志级别等参数，镜像本身保持相对稳定。

后续有机会可以再单独写一篇「Docker + Nginx + Cloudflare 部署一个 LLM Web UI 服务」的完整流程。

---

## 四、为大模型随笔新增两篇文章

### 1️⃣ 新建：`src/law/prompt-engineering.md`

> 路径：在 `src/law/` 目录下创建：  
> **`src/law/prompt-engineering.md`**

```md
---
title: 提示工程实践笔记
---

# 提示工程实践笔记

这里不讲特别玄学的内容，只从「工程可落地」的角度总结一些写 Prompt 的经验。

## 1. 三段式结构

一个比较好用的基础结构：

1. **角色设定**：你是谁、在什么背景下回答问题；
2. **任务说明**：需要完成什么任务、输入是什么；
3. **输出要求**：以什么格式输出、有哪些限制。

示例：

```text
你是一个熟悉 Linux 和网络排错的运维工程师。

任务：根据用户提供的日志片段和现象，帮助分析可能原因，并给出逐步排查建议。

输出要求：
1. 先用一句话总结问题的可能方向。
2. 再给出 3～5 步「由易到难」的排查步骤。
3. 最后提醒用户需要注意的风险或副作用。
2. 尽量结构化输入
和其说「多给信息」，不如说「信息结构化」。例如：

使用列表列出多个现象；

使用小标题区分「环境信息」「错误日志」「已尝试的操作」；

对于配置、日志这类内容，尽量用代码块包起来。

这样做的好处：

模型更容易理解上下文；

后端程序也能更容易从中提取信息。

3. 明确输出格式
常用几种：

Markdown 结构（标题 + 列表），适合人类阅读；

固定模板，比如：
[问题总结]
...

[排查步骤]
1.
2.
3.

[注意事项]
...
3.JSON 输出，适合程序消费，例如：
{
  "summary": "...",
  "possible_causes": ["...", "..."],
  "steps": ["...", "..."]
}
需要注意：要求 JSON 时，最好在系统提示里说清楚「不要输出多余文字」。

4. 迭代而不是一次写完
提示工程非常适合迭代：

先写一个简单版本；

观察模型在典型输入上的表现；

根据错误或不满意的地方，修改 Prompt。

可以把不同版本的 Prompt 存在一个单独的文档里，注明：

版本号 / 时间；

修改了什么；

针对什么问题。

5. 注意边界与风险
不要把敏感信息直接塞进 Prompt；

对模型的输出保持「建议」心态，而不是直接当作最终答案；

有可能出错的地方尽量加「自校验」，例如要求模型先给出思路，再给出答案，或者在最后一步检查是否满足约束条件。
