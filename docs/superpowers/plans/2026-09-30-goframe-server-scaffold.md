# GoFrame Server Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `mf/server/` 用 `gf init` 生成官方单仓 HTTP 脚手架，并确认服务可启动。

**Architecture:** 与现有 npm workspaces 前端并列；Go 侧独立 `go.mod`，不改 `packages/`。使用 GoFrame 官方 default template。

**Tech Stack:** Go 1.24+、GoFrame CLI `gf` v2.10.x、官方 `gf init` 单仓模板

## Global Constraints

- 项目目录必须是 `mf/server/`
- 模块名使用 `server`（`gf init server` 默认）
- 不接 DB、不改前端、不接 MF
- 不主动 git commit（除非用户明确要求）

---

### Task 1: 用官方脚手架生成 `server`

**Files:**
- Create: `server/`（整棵官方模板树：`main.go`、`go.mod`、`api/`、`internal/`、`manifest/` 等）

**Interfaces:**
- Consumes: 本机已安装的 `gf` CLI、`go`
- Produces: 可 `cd server && gf run main.go` 启动的 HTTP 服务

- [ ] **Step 1: 确认 `server/` 尚不存在**

Run: `test ! -d /Users/yqsl/Documents/study/mf/server && echo OK`

Expected: `OK`

- [ ] **Step 2: 在 mf 根目录执行官方 init**

Run:

```bash
cd /Users/yqsl/Documents/study/mf
gf init server
```

Expected: 生成 `server/` 目录，提示初始化成功；若 CLI 询问覆盖/下载，选默认确认。

- [ ] **Step 3: 拉取依赖**

Run:

```bash
cd /Users/yqsl/Documents/study/mf/server
go mod tidy
```

Expected: `go.mod` / `go.sum` 就绪，无 error

- [ ] **Step 4: 启动并验证 hello**

Run（另开进程）:

```bash
cd /Users/yqsl/Documents/study/mf/server
gf run main.go
```

然后:

```bash
curl -sS "http://127.0.0.1:8000/hello"
```

Expected: HTTP 200，响应体含 hello 相关内容（具体文案以模板为准）。若端口不是 8000，以 `manifest/config/config.yaml` 为准。

- [ ] **Step 5: 停止验证用进程**

停止刚才的 `gf run` 进程即可。不 commit。
