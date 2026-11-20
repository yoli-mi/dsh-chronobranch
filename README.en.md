<div align="center">

# dsh-chronobranch

[![CI](https://github.com/yoli-mi/dsh-chronobranch/actions/workflows/ci.yml/badge.svg)](https://github.com/yoli-mi/dsh-chronobranch/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![DSH](https://img.shields.io/badge/DeepSeek%20Harness-0.2.x-18181b.svg)](https://github.com/deepseek-ai/dsh)

[中文](README.md) | English

</div>

**ChronoBranch** is a native horizontal dot-and-line timeline & branching canvas plugin for **DeepSeek Harness (DSH)**.  
It registers a native **`时间线` (Timeline)** view tab directly beside DSH's built-in Chat and Trajectory tabs, automatically syncing with DSH's light/dark theme and unifying conversation branching, workspace-wide multi-conversation linking, execution micro-axes, and floating magnetic sticky tiles on a calm architectural canvas.

---

## Features

- **Native Timeline View (`conversation.view`)**: Deterministic left-to-right dot-and-line swimlanes, gutter-routed elbow curves, 3 zoom tiers (Overview / Dot-Line / Expanded), search filtering, and live drag-resizing of expanded Markdown dialog cards with automatic timeline reflow.
- **Markdown & Chronological Agent Choices**: Zero-dependency XSS-safe Markdown renderer (fenced code with copy, GFM tables, lists/tasks) with inline `ask_user_question` & pending Agent choice cards rendered at their exact chronological positions.
- **Unified Native Bottom Composer for Branching**: Forking any completed turn via `sessions.fork` switches DSH's **single unified bottom composer** directly to the new branch (`uiWorkspace.openSession`) with zero duplicate input box, trims inherited prefix turns, and provides clickable track-target switcher capsules in `conversation.input.dock`.
- **Workspace-Scoped Multi-Conversation Timeline Linking**: Link any number of conversations within the same workspace into a shared timeline group; opening the timeline of any linked conversation shows all of them together, with forked conversations linked to their parent by default.
- **Downward-Unfolding Micro-Axis**: Expand reasoning, tool calls, terminal commands, and file diffs cleanly beneath any expanded card without squeezing conversation height, with a right-side unified diff & log inspector drawer.
- **Magnetic Tiles + Frameless Windows Desktop Pop-out**: Pin any turn as a DSH-native floating card (`shell.overlay`) with magnetic snapping, resize, `Full / AI-only` toggle, and one-click locate—plus optional frameless, `ShowInTaskbar=False`, always-on-top Windows WPF desktop sticky cards that stay visible even when DSH is minimized.
- **Native DSH Shortcuts (`ctx.shortcuts`)**: All 7 timeline commands register directly into DSH's native **Settings → Shortcuts** page with full recording, conflict detection, and persistence.

---

## Installation

### Requirements
- Node.js `>= 20`
- pnpm `>= 9`
- [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/dsh) Desktop (`0.2.2+` recommended)

### One-Command Desktop Install

```bash
git clone https://github.com/yoli-mi/dsh-chronobranch.git
cd dsh-chronobranch
pnpm install
pnpm run install:desktop
```

Restart DeepSeek Harness Desktop completely (including system tray) to activate the plugin.

To uninstall:

```bash
pnpm run uninstall:desktop
```

---

## Development

```bash
pnpm run dev        # Watch mode build
pnpm run typecheck  # TypeScript check
pnpm run build      # Build lib/index.js (ESM) & lib/client.js (CJS)
```

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CHANGELOG.md](CHANGELOG.md) for details.

## License

[MIT License](LICENSE) © 2026 [yoli-mi](https://github.com/yoli-mi)
