# Contributing to dsh-chronobranch

感谢你对 **dsh-chronobranch** 的关注！欢迎提交 Issue、功能建议或 Pull Request。

## 本地开发环境

### 环境要求
- Node.js `>= 20`
- pnpm `>= 9`
- 已安装并至少运行过一次 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/dsh) Desktop (`0.2.x` 推荐)

### 快速开始

```bash
git clone https://github.com/yoli-mi/dsh-chronobranch.git
cd dsh-chronobranch
pnpm install
pnpm run typecheck
pnpm run build
```

挂载到本地 DSH Desktop 调试：

```bash
pnpm run install:desktop
```

监听源码改动并自动重新构建：

```bash
pnpm run dev
```

每次构建完成后，在 DSH Desktop 内按 `Ctrl + R`（若改动了 `src/index.ts` 或 `src/host/*` 则需完全重启 DSH Desktop）即可查看最新效果。

## 架构约定

- **`src/core/`**：平台无关的渲染与布局层（不直接依赖 Cordis 或 DSH 运行时），请保持零多余外部运行时依赖。
- **`src/client/`**：DSH 浏览器侧 Cordis 插件适配层。
  - 访问非 `inject` 声明的可选 DSH 服务（如 `uiWorkspace`、`uiConversation`、`shortcuts`）时，请始终通过 `ctx.get(...)` 或 `ctx.inject([...], ...)`，切勿直接读取 `ctx.<prop>`，否则 Cordis 4 会抛出异常。
  - `lib/client.js` 打包结果只应外部引用 `react` 与 `react/jsx-runtime`。
- **`src/host/` & `src/index.ts`**：Node Host 侧入口及本地回环（`127.0.0.1`）桌面磁贴宿主服务；任何写入磁盘的 PowerShell 脚本若包含中文字符，必须附带 UTF-8 BOM (`\uFEFF`)。

## 提交 PR 前检查

请确保以下命令全部通过且无报错：

```bash
pnpm run typecheck
pnpm run build
```
