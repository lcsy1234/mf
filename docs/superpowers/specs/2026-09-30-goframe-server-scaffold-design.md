# GoFrame `server` 脚手架 — 设计

## 目标

在 `mf` 仓库下用官方 GoFrame CLI 新建一个最小可跑的 HTTP 服务，目录与现有前端 `packages/` 并列，便于后续加业务 API。

## 方案

使用官方默认单仓脚手架：

```bash
cd /Users/yqsl/Documents/study/mf
gf init server
```

- 路径：`mf/server/`
- Go module：`server`
- 保留模板自带 hello 示例接口
- 不接数据库、不改前端、不做 CORS / MF 联调

## 验证

进入 `server/` 后启动服务，访问默认 hello 接口返回成功即可（具体路径以脚手架生成的 README / 路由为准，通常为 `http://127.0.0.1:8000/hello`）。

## 范围外

- 业务 API、鉴权、数据库
- 与 Module Federation Host 的对接
- 根目录 npm scripts 集成、大改 README
