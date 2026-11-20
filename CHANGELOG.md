# Changelog

All notable changes to **dsh-chronobranch** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-11-20

### Added
- **Native `时间线` Conversation View (`conversation.view`)**: Registers directly beside DSH's built-in `对话` and `轨迹` tabs and automatically syncs with DSH's light/dark theme (`data-ds-dark-theme`).
- **Deterministic Dot-and-Line Swimlane Canvas**: Pure solid canvas, left-to-right chronological ordering, gutter-routed elbow curves, three zoom tiers (L1 鸟瞰 / L2 点线 / L3 展开), node search, and interactive drag-resizing of expanded dialog sheets with live timeline auto-reflow.
- **Markdown & Inline Agent Choice Rendering**: Zero-dependency XSS-safe Markdown renderer (headings, lists, tasks, GFM tables, fenced code blocks with copy button) plus chronologically interleaved Agent choice cards (`ask_user_question` & live pending prompts).
- **Downward-Unfolding Micro-Axis**: Expandable step-by-step execution rail (reasoning, tool calls, terminal commands, file diffs) outside the dialog body with right-side inspector drawer and unified diff viewer.
- **Unified Single Native Bottom Composer for Branching**: Forking any completed turn via `sessionsApi.fork` reuses DSH's single native bottom composer without spawning a second input box; includes a slim `conversation.input.dock` status strip with clickable track-target switcher capsules (`uiWorkspace.openSession`) and inherited-prefix trimming on new branches.
- **Workspace-Scoped Multi-Conversation Timeline Linking (`关联对话`)**: Link any number of conversations within the same workspace into a shared timeline group (transitively merged); opening the timeline tab of any linked conversation displays all linked timelines together, with forked conversations linked to their parent by default.
- **Magnetic Tiles (`磁贴`) + Frameless Windows Desktop Pop-out**:
  - DSH-native floating cards mounted in `shell.overlay` that persist across view tabs and session switches, supporting magnetic edge/sibling snapping, free resize, `完整 / 仅AI` toggle, and one-click `定位` back to the source node.
  - Frameless, `ShowInTaskbar=False`, always-on-top Windows WPF desktop sticky cards (`127.0.0.1:47392` loopback host) that remain visible on the desktop even when DSH Desktop is minimized.
- **Native DSH Shortcuts Integration (`ctx.shortcuts`)**: Registers all 7 timeline commands directly into DSH's native **设置 → 快捷键** page with deferred boot registration and non-conflicting cross-platform defaults (`Ctrl+Alt+Shift+O/B/M/T/1/2/3`).
- **Branch Lifecycle Tools**: Dead-end branch folding, Cherry-pick summary merge back to parent track, and unified Agent Subagent swimlanes.
- **Desktop Installer Script**: One-command `pnpm run install:desktop` / `pnpm run uninstall:desktop` with automatic backup of `~/.dsh/profiles/desktop/cordis.patch.yml`.
