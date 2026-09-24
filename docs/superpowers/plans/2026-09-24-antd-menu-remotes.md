# Ant Design 菜单切换多 Remote — Implementation Plan

> **For agentic workers:** 按任务实现；完成后更新 README 与根脚本。

**Goal:** Host 顶栏 Ant Design 菜单切换 `remoteApp`（3001）与 `remoteB`（2222）。

**Architecture:** 新建 `packages/remote-b` 镜像现有 remote；Host 静态注册两个 remotes，菜单驱动 lazy 加载。

**Tech Stack:** React 18、Webpack 5 Module Federation、Ant Design 5、npm workspaces、concurrently

---

### Task 1: 新建 `@mf/remote-b`

Files: `packages/remote-b/**`（镜像 remote，端口 2222，name `remoteB`，Widget 视觉区分）

### Task 2: Host 接入 antd + 双 remote

Files:
- `packages/host/package.json` — 加 `antd`
- `packages/host/webpack.config.js` — remotes 增加 `remoteB`
- `packages/host/src/App.jsx` — Layout + Menu
- `packages/host/src/loadRemote.jsx` — 按选中项加载

### Task 3: 根脚本与 README

Files: `package.json`、`README.md`
