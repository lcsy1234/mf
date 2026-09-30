# mf-demo

基于 **Webpack Module Federation** 的最小可运行示例：Host 用 Ant Design 顶栏菜单，在多个独立 Remote 应用之间切换加载组件，并共享同一份 React / ReactDOM 单例。

## 项目结构

```
packages/
  host/       # 宿主应用（antd 菜单 + 消费远程模块） → http://localhost:5680
  remote/     # Remote A（暴露 Widget）              → http://localhost:3001
  remote-b/   # Remote B（暴露 Widget）              → http://localhost:2222
```

| 应用 | 包名 | 端口 | 角色 |
|------|------|------|------|
| Host | `@mf/host` | 5680 | Ant Design 菜单切换 `remoteApp` / `remoteB` |
| Remote A | `@mf/remote` | 3001 | 暴露 `./Widget`，入口 `remoteEntry.js` |
| Remote B | `@mf/remote-b` | 2222 | 暴露 `./Widget`，入口 `remoteEntry.js` |

## 环境要求

- Node.js 18+（建议）
- npm 7+（支持 workspaces）

## 怎么跑起来

在仓库根目录执行：

```bash
# 1. 安装依赖（workspaces 会装好 host / remote / remote-b）
npm install

# 2. 同时启动 remote A + remote B + host
npm start
```

启动成功后：

1. 打开 **http://localhost:5680**（Host）
2. 顶栏切换「Remote A」「Remote B」，内容区加载对应远程 Widget
3. 也可单独预览：
   - Remote A → http://localhost:3001
   - Remote B → http://localhost:2222

> Host 依赖两个 remote 的 `remoteEntry.js`。`npm start` 已用 `concurrently` 一起拉起三者；若某个 remote 未启动，切换到对应菜单会提示加载失败。

### 分别启动

```bash
npm run start:remote     # Remote A → :3001
npm run start:remote-b   # Remote B → :2222
npm run start:host       # Host     → :5680
```

建议先起两个 remote，再起 host。

### 生产构建

```bash
npm run build
```

会依次构建 `@mf/remote`、`@mf/remote-b`、`@mf/host`，产物在各自包的 `dist/` 下。

## 运作方式（简要）

1. **Remote A / B** 各自通过 `ModuleFederationPlugin` 暴露 `./Widget`，产出 `remoteEntry.js`
2. **Host** 不再在 webpack 里写死 `remotes`；清单在 `packages/host/src/remotes.js`
3. 菜单切换时，运行时注入对应 `remoteEntry.js`，再 `container.get('./Widget')` 取模块
4. `react` / `react-dom` / `jsx-runtime` 配置为 `singleton: true`，避免 hooks 失效

新增 Remote：在 `remotes.js` 加一条配置即可，不必改 `webpack.config.js`。

## 常用脚本

| 命令 | 说明 |
|------|------|
| `npm start` | 同时启动 remote A + remote B + host |
| `npm run start:host` | 只启动 host |
| `npm run start:remote` | 只启动 remote A |
| `npm run start:remote-b` | 只启动 remote B |
| `npm run build` | 生产构建（remote → remote-b → host） |
