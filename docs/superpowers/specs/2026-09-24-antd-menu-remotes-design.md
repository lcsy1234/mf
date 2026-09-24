# Ant Design 菜单切换多 Remote — 设计

## 目标

Host 使用 Ant Design 顶栏菜单，在两个独立 Module Federation Remote 应用之间切换展示内容。

## 方案

静态 remotes + 菜单切换：Host webpack 写死两个 remotes；`Layout` + `Menu` 选中后 `React.lazy` 加载对应 `Widget`。

## 应用与端口

| 应用 | 包名 | 端口 | MF name | 暴露 |
|------|------|------|---------|------|
| Host | `@mf/host` | 5680 | `hostApp` | — |
| Remote A | `@mf/remote` | 3001 | `remoteApp` | `./Widget` |
| Remote B | `@mf/remote-b` | 2222 | `remoteB` | `./Widget` |

## Host UI

- Ant Design `Layout`：顶栏 `Menu`（「Remote A」「Remote B」）+ 内容区
- 默认选中 Remote A
- `Suspense` + ErrorBoundary；切换菜单时用 `key` 重置错误态
- `antd` 仅装在 Host；shared 继续共享 `react` / `react-dom` singleton

## 启动

`npm start` 同时启动 remote、remote-b、host。

## 范围外

动态 remote 注册、React Router、Remote 内使用 antd。
