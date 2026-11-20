/**
 * Scoped stylesheet injector for ChronoBranch (.cb-* namespace).
 * Guarantees zero CSS collision with DSH Web's host styles and zero external asset dependency.
 */

const STYLE_ELEMENT_ID = 'dsh-chronobranch-styles';

export const CHRONOBRANCH_CSS = `
/* ==================== DSH CONVERSATION VIEW INTEGRATION ==================== */
/* Keep DSH's native bottom composer ([data-composer-seat]) 100% intact and consistent
   with chat mode, while guaranteeing the ChronoBranch canvas fills the conversation pane. */
[data-conversation-scroll]:has([data-chronobranch-view]) {
  position: relative !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
}

[data-conversation-scroll]:has([data-chronobranch-view]) [data-slot="conversation.session"],
[data-conversation-scroll]:has([data-chronobranch-view]) [data-slot="conversation.session"] > div,
[data-conversation-scroll]:has([data-chronobranch-view]) [data-slot="conversation.view"],
[data-conversation-scroll]:has([data-chronobranch-view]) [data-slot="conversation.view"] > div {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 1 0% !important;
  min-height: 0 !important;
  height: 100% !important;
  width: 100% !important;
}

/* Make DSH's floating native composer background blend cleanly over the canvas */
[data-conversation-scroll]:has([data-chronobranch-view]) > [data-composer-seat] {
  z-index: 10 !important;
  pointer-events: none;
}

[data-conversation-scroll]:has([data-chronobranch-view]) > [data-composer-seat] > * {
  pointer-events: auto;
}

/* Elevate DSH's shell.overlay layer above the conversation pane so Magnetic Tiles are NEVER covered */
div:has(> [data-slot="shell.overlay"] [data-chronobranch-tiles]) {
  z-index: 450 !important;
  pointer-events: none !important;
}

[data-slot="shell.overlay"]:has([data-chronobranch-tiles]) {
  pointer-events: none !important;
  z-index: 450 !important;
}

/* ==================== EMBEDDED CONVERSATION CANVAS & ROOT OVERLAY TOKENS ==================== */
.cb-root,
.cb-overlay-host {
  --cb-canvas: #f7f7f8;
  --cb-surface: #ffffff;
  --cb-surface-subtle: #fafafa;
  --cb-surface-muted: #f2f2f4;
  --cb-surface-hover: #ededf0;
  --cb-hud: rgba(255, 255, 255, 0.94);
  --cb-code: #f5f5f7;

  --cb-border-hairline: #ececef;
  --cb-border-subtle: #e4e4e7;
  --cb-border-strong: #d4d4d8;
  --cb-border-focus: #18181b;

  --cb-text: #18181b;
  --cb-text-secondary: #52525b;
  --cb-text-muted: #71717a;
  --cb-text-faint: #a1a1aa;

  --cb-ink: #18181b;
  --cb-ink-hover: #27272a;
  --cb-on-ink: #ffffff;

  --cb-line-main: #27272a;
  --cb-line-merge: #92400e;
  --cb-emerald: #059669;
  --cb-blue: #2563eb;
  --cb-rose: #dc2626;

  --cb-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.035);
  --cb-shadow-sheet: 0 2px 6px rgba(0, 0, 0, 0.04), 0 12px 30px -8px rgba(0, 0, 0, 0.08);
  --cb-shadow-hud: 0 1px 4px rgba(0, 0, 0, 0.045), 0 10px 26px -8px rgba(0, 0, 0, 0.08);
  --cb-shadow-tile: 0 4px 14px rgba(0, 0, 0, 0.07), 0 20px 44px -12px rgba(0, 0, 0, 0.14);

  --cb-font-sans: "Inter", -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif;
  --cb-font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;

  color: var(--cb-text);
  font-family: var(--cb-font-sans);
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  -webkit-app-region: no-drag;
}

.cb-root {
  position: relative;
  isolation: isolate;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 420px;
  flex: 1 1 0%;
  overflow: hidden;
  background: var(--cb-canvas);
  user-select: none;
}

.cb-overlay-host {
  position: fixed;
  inset: 0;
  pointer-events: none !important;
  z-index: 450;
}

.cb-overlay-host .cb-tile {
  pointer-events: auto !important;
}

/* Automatically follow DSH's native dark theme attribute (data-ds-dark-theme) */
body[data-ds-dark-theme] .cb-root,
body[data-ds-dark-theme] .cb-overlay-host,
.cb-root.cb-theme-dark,
.cb-overlay-host.cb-theme-dark {
  --cb-canvas: #111113;
  --cb-surface: #18181b;
  --cb-surface-subtle: #141416;
  --cb-surface-muted: #202024;
  --cb-surface-hover: #27272a;
  --cb-hud: rgba(24, 24, 27, 0.94);
  --cb-code: #141417;

  --cb-border-hairline: #232327;
  --cb-border-subtle: #27272a;
  --cb-border-strong: #3f3f46;
  --cb-border-focus: #e4e4e7;

  --cb-text: #f4f4f5;
  --cb-text-secondary: #a1a1aa;
  --cb-text-muted: #71717a;
  --cb-text-faint: #52525b;

  --cb-ink: #f4f4f5;
  --cb-ink-hover: #e4e4e7;
  --cb-on-ink: #18181b;

  --cb-line-main: #d4d4d8;
  --cb-line-merge: #d97706;

  --cb-shadow-sheet: 0 6px 24px rgba(0, 0, 0, 0.45);
  --cb-shadow-hud: 0 8px 28px rgba(0, 0, 0, 0.45);
  --cb-shadow-tile: 0 10px 36px rgba(0, 0, 0, 0.58);
}

.cb-root *, .cb-root *::before, .cb-root *::after,
.cb-overlay-host *, .cb-overlay-host *::before, .cb-overlay-host *::after {
  box-sizing: border-box;
}

.cb-root button, .cb-root input, .cb-root textarea,
.cb-overlay-host button, .cb-overlay-host input, .cb-overlay-host textarea {
  font-family: inherit;
  color: inherit;
}

.cb-root button,
.cb-overlay-host button {
  cursor: pointer;
  border: none;
  background: transparent;
}

.cb-overlay-host.cb-resizing,
.cb-overlay-host.cb-resizing * {
  user-select: none !important;
}

/* ==================== ICON SYSTEM ==================== */
.cb-icon {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}

.cb-icon-sm { width: 13px; height: 13px; }
.cb-icon-xs { width: 11.5px; height: 11.5px; }

/* ==================== TOP FLOATING HUD ==================== */
.cb-hud-top {
  position: absolute;
  top: 14px;
  left: 16px;
  right: 16px;
  z-index: 64;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;
}

.cb-hud-group {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 7px;
  border-radius: 11px;
  background: var(--cb-hud);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--cb-border-subtle);
  box-shadow: var(--cb-shadow-hud);
  pointer-events: auto;
}

.cb-hud-top .cb-icon-sm {
  width: 15px;
  height: 15px;
}

.cb-btn-mode {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;
  background: var(--cb-ink);
  color: var(--cb-on-ink);
  transition: background 0.14s ease;
}

.cb-btn-mode:hover { background: var(--cb-ink-hover); }

.cb-divider {
  width: 1px;
  height: 18px;
  background: var(--cb-border-subtle);
  margin: 0 4px;
}

.cb-hud-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 11px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--cb-text-secondary);
  border: 1px solid transparent;
  white-space: nowrap;
  transition: all 0.14s ease;
}

.cb-hud-btn:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-hud-btn.cb-active {
  background: var(--cb-surface-muted);
  color: var(--cb-text);
  border-color: var(--cb-border-subtle);
}

.cb-hud-btn.cb-outline {
  border-color: var(--cb-border-strong);
  color: var(--cb-text);
  background: var(--cb-surface);
}

.cb-hud-btn.cb-outline:hover { background: var(--cb-surface-muted); }

.cb-search-box {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 10px;
  border-radius: 8px;
  background: var(--cb-surface-subtle);
  border: 1px solid var(--cb-border-subtle);
  transition: border-color 0.14s;
}

.cb-search-box:focus-within {
  border-color: var(--cb-border-focus);
  background: var(--cb-surface);
}

.cb-search-box input {
  width: 168px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: var(--cb-text);
}

.cb-search-box input::placeholder { color: var(--cb-text-faint); }

.cb-zoom-pill {
  font-family: var(--cb-font-mono);
  font-size: 12px;
  color: var(--cb-text-muted);
  padding: 0 6px;
  min-width: 44px;
  text-align: center;
}

/* ==================== VIEWPORT & SVG EDGES ==================== */
.cb-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: grab;
}

.cb-viewport.cb-panning { cursor: grabbing; }

.cb-world {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  will-change: transform;
}

.cb-edges-svg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  pointer-events: none;
}

.cb-edge {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: d 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}

.cb-edge-subagent { stroke-dasharray: 4 4; }
.cb-edge-cherry { stroke-dasharray: 4 4; }
.cb-edge-streaming {
  stroke-dasharray: 6 4;
  animation: cbDashFlow 0.85s linear infinite;
}

@keyframes cbDashFlow {
  to { stroke-dashoffset: -20; }
}

.cb-merge-pill {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 500;
  background: var(--cb-surface);
  color: var(--cb-text-secondary);
  border: 1px solid var(--cb-border-strong);
  box-shadow: var(--cb-shadow-xs);
  white-space: nowrap;
  z-index: 15;
}

.cb-merge-pill:hover {
  color: var(--cb-text);
  border-color: var(--cb-line-merge);
}

/* ==================== TRACK HEADERS ==================== */
.cb-track-header {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 10px 9px;
  border-left: 2px solid var(--cb-track-color, var(--cb-line-main));
  border-bottom: 1.5px solid var(--cb-border-strong);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 8;
  width: 212px;
  cursor: pointer;
}

.cb-track-header.cb-active-track { border-left-width: 2.5px; }

.cb-track-title {
  font-weight: 600;
  font-size: 12.5px;
  color: var(--cb-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-track-meta {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.cb-tag {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  font-weight: 500;
  background: var(--cb-surface-muted);
  color: var(--cb-text-muted);
}

.cb-tag-adopted {
  background: rgba(5, 150, 105, 0.09);
  color: #047857;
}

.cb-theme-dark .cb-tag-adopted { color: #34d399; }

.cb-track-mini-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 10.5px;
  color: var(--cb-text-muted);
}

.cb-track-mini-btn:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-collapsed-pill {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--cb-surface);
  border: 1px dashed var(--cb-border-strong);
  color: var(--cb-text-muted);
  font-size: 11px;
  z-index: 8;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.cb-collapsed-pill:hover {
  color: var(--cb-text);
  border-color: var(--cb-text-secondary);
}

/* ==================== DOT-AND-LINE NODES ==================== */
.cb-node {
  position: absolute;
  z-index: 10;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), width 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.16s ease;
  user-select: text;
}

.cb-node:hover { z-index: 18; }
.cb-node.cb-selected { z-index: 20; }
.cb-node.cb-dimmed { opacity: 0.22; }

.cb-node-meta-top {
  position: absolute;
  top: -24px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  cursor: pointer;
}

.cb-meta-turn {
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  font-weight: 600;
  color: var(--cb-text-secondary);
}

.cb-meta-time {
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  color: var(--cb-text-faint);
}

.cb-meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  color: var(--cb-text-muted);
  padding: 0 5px;
  border-radius: 4px;
  background: var(--cb-surface-muted);
}

.cb-dot-anchor {
  position: absolute;
  top: 0;
  left: 12px;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 12;
}

.cb-dot-core {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--cb-canvas);
  border: 2px solid var(--cb-node-color, var(--cb-line-main));
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

.cb-node.cb-fork-origin .cb-dot-core {
  width: 13px;
  height: 13px;
  box-shadow: 0 0 0 3px var(--cb-canvas), 0 0 0 4.5px var(--cb-node-color, var(--cb-line-main));
}

.cb-node.cb-subagent .cb-dot-core {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  transform: rotate(45deg);
  border-width: 1.75px;
}

.cb-node:hover .cb-dot-core { transform: scale(1.22); }
.cb-node.cb-subagent:hover .cb-dot-core { transform: rotate(45deg) scale(1.22); }

.cb-node.cb-selected .cb-dot-core {
  background: var(--cb-node-color, var(--cb-line-main));
  box-shadow: 0 0 0 3px var(--cb-canvas), 0 0 0 4.5px var(--cb-node-color, var(--cb-line-main));
}

.cb-node.cb-compare-picked .cb-dot-core {
  background: var(--cb-blue);
  border-color: var(--cb-blue);
  box-shadow: 0 0 0 3px var(--cb-canvas), 0 0 0 5px var(--cb-blue);
}

.cb-node.cb-streaming .cb-dot-core {
  background: var(--cb-emerald);
  border-color: var(--cb-emerald);
  animation: cbDotPulse 1.2s ease-in-out infinite;
}

@keyframes cbDotPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.36); }
  50% { box-shadow: 0 0 0 6px rgba(5, 150, 105, 0); }
}

/* ==================== BORDERLESS EDITORIAL TEXT ==================== */
.cb-editorial {
  margin-top: 15px;
  margin-left: 11px;
  padding: 2px 0 4px 13px;
  border-left: 1px solid var(--cb-border-subtle);
  transition: border-color 0.16s ease;
}

.cb-node:hover .cb-editorial,
.cb-node.cb-selected .cb-editorial { border-left-color: var(--cb-border-strong); }

.cb-node.cb-search-match .cb-editorial { border-left: 2px solid var(--cb-text); }

.cb-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--cb-text);
  line-height: 1.4;
  letter-spacing: -0.01em;
  cursor: pointer;
  margin-bottom: 5px;
}

.cb-title:hover {
  text-decoration: underline;
  text-decoration-color: var(--cb-border-strong);
  text-underline-offset: 3px;
}

.cb-summary {
  font-size: 12.2px;
  line-height: 1.62;
  color: var(--cb-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}

.cb-merge-note {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  font-size: 11px;
  color: var(--cb-line-merge);
  font-weight: 500;
}

.cb-inline-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
  min-height: 24px;
}

.cb-inline-bar-clean {
  justify-content: flex-start;
}

.cb-micro-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 7px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 500;
  color: var(--cb-text-muted);
  background: var(--cb-surface-muted);
  border: 1px solid transparent;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.14s ease;
}

.cb-micro-trigger:hover {
  color: var(--cb-text);
  border-color: var(--cb-border-strong);
  background: var(--cb-surface);
}

.cb-micro-trigger.cb-open {
  background: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-hover-actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
  opacity: 0.78;
  transition: opacity 0.15s ease;
}

.cb-node:hover .cb-hover-actions,
.cb-node.cb-selected .cb-hover-actions,
.cb-node.cb-expanded .cb-hover-actions { opacity: 1; }

.cb-act-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--cb-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.cb-act-btn:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-act-btn.cb-act-active {
  background: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-meta-tile {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: var(--cb-blue) !important;
  border-color: rgba(37, 99, 235, 0.28) !important;
  background: rgba(37, 99, 235, 0.07) !important;
}

.cb-node.cb-tile-pinned .cb-dot-core {
  box-shadow: 0 0 0 2.5px var(--cb-canvas), 0 0 0 4.5px var(--cb-blue);
}

.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-summary,
.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-inline-bar,
.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-merge-note,
.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-micro-subaxis { display: none; }

.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-editorial {
  border-left-color: transparent;
  padding-left: 0;
  margin-left: 4px;
  margin-top: 12px;
}

.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-title {
  font-size: 12.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ==================== EXPANDED PURE WHITE DIALOG SHEET ==================== */
.cb-root.cb-resizing,
.cb-root.cb-resizing * {
  user-select: none !important;
}

.cb-sheet-stack {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

.cb-sheet {
  position: relative;
  border-radius: 10px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: var(--cb-shadow-sheet);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cb-sheet.cb-has-micro-below {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.cb-micro-attached {
  border: 1px solid var(--cb-border-strong);
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: var(--cb-surface-subtle);
  box-shadow: var(--cb-shadow-sheet);
  overflow: hidden;
}

.cb-micro-attached .cb-micro-subaxis {
  margin-top: 0;
  padding: 10px 14px 12px;
  border-top: none;
  background: transparent;
}

.cb-sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--cb-border-hairline);
  background: var(--cb-surface-subtle);
  flex-shrink: 0;
}

.cb-sheet-title {
  font-weight: 600;
  font-size: 13px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cb-sheet-body {
  padding: 13px 14px;
  max-height: 340px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
  min-height: 0;
  user-select: text;
}

.cb-sheet.cb-sheet-resized .cb-sheet-body {
  max-height: none;
}

.cb-sheet-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 13px;
  border-top: 1px solid var(--cb-border-hairline);
  background: var(--cb-surface-subtle);
  flex-shrink: 0;
}

/* Interactive resize handles */
.cb-resize-handle {
  position: absolute;
  z-index: 15;
}

.cb-resize-e {
  top: 8px;
  right: 0;
  bottom: 16px;
  width: 7px;
  cursor: ew-resize;
}

.cb-resize-e::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 2px;
  width: 2px;
  height: 28px;
  border-radius: 2px;
  background: transparent;
  transform: translateY(-50%);
  transition: background 0.14s ease;
}

.cb-resize-e:hover::after {
  background: var(--cb-border-strong);
}

.cb-resize-s {
  left: 8px;
  right: 16px;
  bottom: 0;
  height: 7px;
  cursor: ns-resize;
}

.cb-resize-s::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 2px;
  height: 2px;
  width: 28px;
  border-radius: 2px;
  background: transparent;
  transform: translateX(-50%);
  transition: background 0.14s ease;
}

.cb-resize-s:hover::after {
  background: var(--cb-border-strong);
}

.cb-resize-se {
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
}

.cb-resize-se::after {
  content: "";
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 7px;
  height: 7px;
  border-right: 1.75px solid var(--cb-border-strong);
  border-bottom: 1.75px solid var(--cb-border-strong);
  border-bottom-right-radius: 2px;
  opacity: 0.55;
  transition: opacity 0.14s ease, border-color 0.14s ease;
}

.cb-resize-se:hover::after {
  opacity: 1;
  border-color: var(--cb-text);
}

.cb-bubble {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12.6px;
  line-height: 1.65;
  word-break: break-word;
}

.cb-bubble-user {
  background: var(--cb-surface-muted);
  border: 1px solid var(--cb-border-subtle);
}

.cb-bubble-ai {
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-hairline);
}

.cb-bubble-role {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.45px;
  color: var(--cb-text-muted);
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  user-select: none;
}

/* ==================== MARKDOWN CONTENT TYPOGRAPHY ==================== */
.cb-md {
  color: var(--cb-text);
  font-size: 12.6px;
  line-height: 1.68;
}

.cb-md > *:first-child { margin-top: 0; }
.cb-md > *:last-child { margin-bottom: 0; }

.cb-md-p {
  margin: 0 0 8px;
}

.cb-md-h {
  margin: 12px 0 6px;
  font-weight: 600;
  line-height: 1.38;
  color: var(--cb-text);
  letter-spacing: -0.01em;
}

.cb-md-h1 { font-size: 15px; padding-bottom: 4px; border-bottom: 1px solid var(--cb-border-hairline); }
.cb-md-h2 { font-size: 14px; }
.cb-md-h3 { font-size: 13.2px; }
.cb-md-h4 { font-size: 12.6px; color: var(--cb-text-secondary); }

.cb-md-inline-code {
  font-family: var(--cb-font-mono);
  font-size: 11.4px;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--cb-surface-muted);
  border: 1px solid var(--cb-border-hairline);
  color: var(--cb-text);
}

.cb-md-link {
  color: var(--cb-blue);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.cb-md-link:hover { opacity: 0.82; }

.cb-md-ul,
.cb-md-ol {
  margin: 4px 0 8px;
  padding-left: 19px;
}

.cb-md-ul li,
.cb-md-ol li {
  margin: 3px 0;
}

.cb-md-task {
  list-style: none;
  margin-left: -18px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.cb-md-checkbox {
  width: 14px;
  height: 14px;
  margin-top: 3px;
  border-radius: 3px;
  border: 1px solid var(--cb-border-strong);
  background: var(--cb-surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  flex-shrink: 0;
}

.cb-md-checkbox.cb-checked {
  background: var(--cb-ink);
  border-color: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-md-quote {
  margin: 6px 0 8px;
  padding: 4px 10px;
  border-left: 2.5px solid var(--cb-border-strong);
  color: var(--cb-text-secondary);
  background: var(--cb-surface-subtle);
  border-radius: 0 6px 6px 0;
}

.cb-md-hr {
  border: none;
  border-top: 1px solid var(--cb-border-subtle);
  margin: 10px 0;
}

.cb-md-table-wrap {
  margin: 8px 0;
  overflow-x: auto;
  border: 1px solid var(--cb-border-subtle);
  border-radius: 6px;
}

.cb-md-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.cb-md-table th,
.cb-md-table td {
  padding: 6px 9px;
  border-bottom: 1px solid var(--cb-border-hairline);
  border-right: 1px solid var(--cb-border-hairline);
  text-align: left;
  vertical-align: top;
}

.cb-md-table th:last-child,
.cb-md-table td:last-child { border-right: none; }
.cb-md-table tr:last-child td { border-bottom: none; }

.cb-md-table th {
  background: var(--cb-surface-muted);
  font-weight: 600;
  color: var(--cb-text);
}

.cb-code-block {
  margin: 8px 0;
  border-radius: 7px;
  background: var(--cb-code);
  border: 1px solid var(--cb-border-subtle);
  overflow: hidden;
}

.cb-code-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
  background: var(--cb-surface-muted);
  border-bottom: 1px solid var(--cb-border-subtle);
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  color: var(--cb-text-muted);
  user-select: none;
}

.cb-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--cb-font-sans);
  font-size: 11px;
  color: var(--cb-text-muted);
}

.cb-code-copy:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-code-block pre {
  margin: 0;
  padding: 9px 11px;
  font-family: var(--cb-font-mono);
  font-size: 11.3px;
  line-height: 1.55;
  color: var(--cb-text);
  overflow-x: auto;
  white-space: pre;
}

/* ==================== AGENT USER-CHOICE CARD ==================== */
.cb-ai-segments {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cb-choice-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cb-choice-card {
  border-radius: 8px;
  padding: 10px 12px;
  background: var(--cb-surface-subtle);
  border: 1px solid var(--cb-border-subtle);
}

.cb-choice-card.cb-choice-waiting {
  border-color: var(--cb-blue);
  background: var(--cb-surface);
}

.cb-choice-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.cb-choice-title {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--cb-text-muted);
  text-transform: uppercase;
}

.cb-choice-badge {
  font-size: 10px;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 999px;
  border: 1px solid var(--cb-border-subtle);
  color: var(--cb-text-muted);
  background: var(--cb-surface);
  white-space: nowrap;
}

.cb-choice-badge-answered {
  color: var(--cb-emerald);
  border-color: rgba(5, 150, 105, 0.3);
  background: rgba(5, 150, 105, 0.08);
}

.cb-choice-badge-waiting {
  color: var(--cb-blue);
  border-color: rgba(37, 99, 235, 0.32);
  background: rgba(37, 99, 235, 0.08);
}

.cb-choice-question {
  font-weight: 500;
  margin-bottom: 8px;
}

.cb-choice-options {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cb-choice-opt {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 7px 9px;
  border-radius: 6px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-hairline);
}

.cb-choice-opt.cb-selected {
  border-color: var(--cb-ink);
  background: var(--cb-surface-muted);
}

.cb-choice-indicator {
  width: 15px;
  height: 15px;
  margin-top: 2px;
  border-radius: 50%;
  border: 1.5px solid var(--cb-border-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--cb-on-ink);
}

.cb-choice-opt.cb-selected .cb-choice-indicator {
  background: var(--cb-ink);
  border-color: var(--cb-ink);
}

.cb-choice-radio {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: transparent;
}

.cb-choice-opt-body {
  min-width: 0;
  flex: 1;
}

.cb-choice-opt-label {
  font-size: 12.2px;
  font-weight: 500;
  color: var(--cb-text);
  line-height: 1.45;
}

.cb-choice-opt-desc {
  font-size: 11.4px;
  color: var(--cb-text-muted);
  line-height: 1.45;
  margin-top: 2px;
}

.cb-choice-custom {
  margin-top: 7px;
  padding: 6px 9px;
  border-radius: 6px;
  background: var(--cb-surface);
  border: 1px dashed var(--cb-border-strong);
  font-size: 12px;
  display: flex;
  align-items: baseline;
  gap: 7px;
}

.cb-choice-custom-tag {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--cb-text-muted);
  white-space: nowrap;
}

.cb-choice-hint {
  margin-top: 7px;
  font-size: 11px;
  color: var(--cb-blue);
}

/* ==================== DOT-AND-LINE MICRO-AXIS ==================== */
.cb-micro-subaxis {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed var(--cb-border-subtle);
}

.cb-sheet .cb-micro-subaxis {
  margin-top: 0;
  padding: 10px 14px 12px;
  background: var(--cb-surface-subtle);
  border-top: 1px solid var(--cb-border-hairline);
  flex-shrink: 0;
}

.cb-micro-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--cb-text-faint);
  margin-bottom: 6px;
}

.cb-micro-dotline {
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
  padding: 2px 2px 6px;
  gap: 0;
}

.cb-micro-node {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 84px;
  width: 84px;
  padding: 2px 0 4px;
  border-radius: 6px;
  text-align: center;
  transition: background 0.14s ease;
}

.cb-micro-node:hover {
  background: var(--cb-surface-hover);
}

.cb-micro-dur {
  height: 15px;
  line-height: 15px;
  margin-bottom: 5px;
  font-family: var(--cb-font-mono);
  font-size: 10px;
  color: var(--cb-text-muted);
  white-space: nowrap;
}

.cb-micro-rail {
  position: relative;
  width: 100%;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cb-micro-rail::before,
.cb-micro-rail::after {
  content: "";
  position: absolute;
  top: 50%;
  height: 1.5px;
  background: var(--cb-border-strong);
  transform: translateY(-50%);
}

.cb-micro-rail::before {
  left: 0;
  right: 50%;
}

.cb-micro-rail::after {
  left: 50%;
  right: 0;
}

.cb-micro-node.cb-micro-first .cb-micro-rail::before {
  display: none;
}

.cb-micro-node.cb-micro-last .cb-micro-rail::after {
  display: none;
}

.cb-micro-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--cb-surface);
  border: 1.75px solid var(--cb-text-secondary);
  position: relative;
  z-index: 2;
  transition: all 0.14s ease;
}

.cb-micro-dot.cb-ms-running {
  border-color: var(--cb-emerald);
  background: var(--cb-emerald);
}

.cb-micro-dot.cb-ms-error {
  border-color: var(--cb-rose);
}

.cb-micro-node:hover .cb-micro-dot {
  background: var(--cb-text);
  border-color: var(--cb-text);
  transform: scale(1.18);
}

.cb-micro-icon {
  margin-top: 6px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cb-text-muted);
}

.cb-micro-node:hover .cb-micro-icon {
  color: var(--cb-text);
}

.cb-micro-name {
  margin-top: 2px;
  max-width: 78px;
  padding: 0 3px;
  font-size: 11px;
  line-height: 1.3;
  color: var(--cb-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-micro-node:hover .cb-micro-name {
  color: var(--cb-text);
}

/* ==================== FLOATING COMPOSER / FORK BAR ==================== */
.cb-composer {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 66;
  width: min(720px, calc(100% - 260px));
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  border-radius: 12px;
  box-shadow: var(--cb-shadow-hud);
  padding: 8px 11px;
}

.cb-composer.cb-above-native {
  bottom: calc(var(--dsh-composer-height, 132px) + 12px);
  width: min(640px, calc(100% - 40px));
}

.cb-composer:focus-within { border-color: var(--cb-border-focus); }

.cb-composer.cb-fork-mode {
  border-color: var(--cb-emerald);
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.12), var(--cb-shadow-hud);
}

.cb-composer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--cb-border-hairline);
  font-size: 11.5px;
}

.cb-composer-target {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-weight: 500;
}

.cb-composer-row {
  display: flex;
  align-items: flex-end;
  gap: 6px;
}

.cb-textarea {
  flex: 1;
  min-height: 32px;
  max-height: 108px;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  line-height: 1.5;
  padding: 4px;
  color: var(--cb-text);
}

.cb-textarea::placeholder { color: var(--cb-text-faint); }

.cb-btn-send {
  padding: 6px 12px;
  border-radius: 7px;
  background: var(--cb-ink);
  color: var(--cb-on-ink);
  font-weight: 500;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.cb-btn-send:hover { background: var(--cb-ink-hover); }
.cb-composer.cb-fork-mode .cb-btn-send { background: var(--cb-emerald); color: #fff; }
.cb-btn-stop {
  padding: 6px 11px;
  border-radius: 7px;
  background: rgba(220, 38, 38, 0.1);
  color: var(--cb-rose);
  border: 1px solid rgba(220, 38, 38, 0.28);
  font-weight: 500;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* ==================== DRAWER, SETTINGS & MODALS ==================== */
.cb-drawer {
  position: absolute;
  top: 62px;
  right: 14px;
  bottom: calc(var(--dsh-composer-height, 128px) + 14px);
  width: 400px;
  z-index: 68;
  border-radius: 12px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: var(--cb-shadow-sheet);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cb-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  border-bottom: 1px solid var(--cb-border-hairline);
  background: var(--cb-surface-subtle);
}

.cb-drawer-body {
  padding: 14px;
  overflow-y: auto;
  flex: 1;
  user-select: text;
}

.cb-diff-add { display: block; background: #ecfdf5; color: #065f46; padding: 1px 8px; }
.cb-diff-del { display: block; background: #fef2f2; color: #991b1b; padding: 1px 8px; }
.cb-diff-ctx { display: block; color: var(--cb-text-secondary); padding: 1px 8px; }
.cb-theme-dark .cb-diff-add { background: rgba(16, 185, 129, 0.14); color: #6ee7b7; }
.cb-theme-dark .cb-diff-del { background: rgba(244, 63, 94, 0.14); color: #fda4af; }

/* ==================== MAGNETIC FLOATING TILES (PINBOARD) ==================== */
.cb-tiles-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 69;
}

.cb-tile {
  position: absolute;
  pointer-events: auto;
  border-radius: 10px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: var(--cb-shadow-tile);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 0.14s ease, box-shadow 0.14s ease;
}

.cb-tile.cb-tile-snapped {
  border-color: var(--cb-blue);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.16), var(--cb-shadow-tile);
}

.cb-tile.cb-tile-minimized {
  box-shadow: var(--cb-shadow-hud);
}

.cb-tile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px 7px 12px;
  background: var(--cb-surface-subtle);
  border-bottom: 1px solid var(--cb-border-hairline);
  cursor: grab;
  flex-shrink: 0;
  user-select: none;
}

.cb-tile.cb-tile-minimized .cb-tile-head {
  border-bottom: none;
}

.cb-tile.cb-tile-active .cb-tile-head {
  cursor: grabbing;
}

.cb-tile-id {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.cb-tile-turn {
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--cb-surface-muted);
  color: var(--cb-text);
  flex-shrink: 0;
}

.cb-tile-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--cb-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-tile-tools {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.cb-tile-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  min-width: 22px;
  padding: 0 5px;
  border-radius: 5px;
  font-size: 10.5px;
  font-weight: 500;
  color: var(--cb-text-muted);
  white-space: nowrap;
  transition: background 0.12s ease, color 0.12s ease;
}

.cb-tile-btn:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-tile-btn.cb-active {
  background: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-tile-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  user-select: text;
}

.cb-tile-notice {
  padding: 7px 12px;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--cb-text-secondary);
  background: var(--cb-surface-muted);
  border-bottom: 1px solid var(--cb-border-hairline);
  flex-shrink: 0;
}

.cb-modal-backdrop {
  position: absolute;
  inset: 0;
  z-index: 80;
  background: rgba(24, 24, 27, 0.34);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.cb-modal-head, .cb-modal-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 18px;
  background: var(--cb-surface-subtle);
}

.cb-modal-head { border-bottom: 1px solid var(--cb-border-hairline); }
.cb-modal-foot { border-top: 1px solid var(--cb-border-hairline); }

.cb-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 7px;
  font-weight: 500;
  font-size: 12px;
  background: var(--cb-surface);
  color: var(--cb-text);
  border: 1px solid var(--cb-border-strong);
}

.cb-btn-secondary:hover { background: var(--cb-surface-muted); }

.cb-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 13px;
  border-radius: 7px;
  font-weight: 500;
  font-size: 12px;
  background: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-btn-primary:hover { background: var(--cb-ink-hover); }

.cb-cherry-modal {
  width: min(560px, 92vw);
  border-radius: 13px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}

.cb-cherry-textarea {
  width: 100%;
  min-height: 118px;
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--cb-surface-subtle);
  border: 1px solid var(--cb-border-subtle);
  font-size: 12.5px;
  line-height: 1.6;
  outline: none;
  resize: vertical;
}

.cb-cherry-textarea:focus { border-color: var(--cb-border-focus); background: var(--cb-surface); }

.cb-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

/* ==================== SHORTCUT SETTINGS (MODAL & NATIVE DSH SETTINGS) ==================== */
.cb-settings-modal {
  width: min(520px, 92vw);
  border-radius: 13px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}

.cb-sc-list {
  display: flex;
  flex-direction: column;
}

.cb-sc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 9px 0;
  border-bottom: 1px solid var(--cb-border-hairline, var(--dsw-alias-border-l2, #ececef));
}

.cb-sc-row:last-of-type {
  border-bottom: none;
}

.cb-sc-info {
  min-width: 0;
  flex: 1;
}

.cb-sc-label {
  font-size: 12.8px;
  font-weight: 500;
  color: var(--cb-text, var(--dsw-alias-label-primary, #18181b));
}

.cb-sc-desc {
  font-size: 11.4px;
  color: var(--cb-text-muted, var(--dsw-alias-label-tertiary, #71717a));
  margin-top: 2px;
}

.cb-sc-keybtn {
  min-width: 78px;
  padding: 5px 10px;
  border-radius: 6px;
  font-family: "JetBrains Mono", Consolas, monospace;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--cb-text, var(--dsw-alias-label-primary, #18181b));
  background: var(--cb-surface-muted, var(--dsw-alias-bg-module-platform, #f2f2f4));
  border: 1px solid var(--cb-border-subtle, var(--dsw-alias-border-l2, #e4e4e7));
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.14s ease;
}

.cb-sc-keybtn:hover {
  border-color: var(--cb-border-strong, #a1a1aa);
}

.cb-sc-keybtn.cb-capturing {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
}

.cb-sc-static {
  font-family: "JetBrains Mono", Consolas, monospace;
  font-size: 11px;
  padding: 4px 9px;
  border-radius: 6px;
  color: var(--cb-text-muted, var(--dsw-alias-label-tertiary, #71717a));
  background: var(--cb-surface-subtle, transparent);
  border: 1px dashed var(--cb-border-subtle, var(--dsw-alias-border-l2, #e4e4e7));
  white-space: nowrap;
}

.cb-sc-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--cb-border-hairline, var(--dsw-alias-border-l2, #ececef));
}

.cb-sc-tip {
  font-size: 11px;
  color: var(--cb-text-muted, var(--dsw-alias-label-tertiary, #71717a));
}

.cb-sc-reset {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--cb-text-secondary, var(--dsw-alias-label-secondary, #52525b));
  background: var(--cb-surface-muted, var(--dsw-alias-bg-module-platform, #f2f2f4));
  border: 1px solid var(--cb-border-subtle, var(--dsw-alias-border-l2, #e4e4e7));
  cursor: pointer;
  white-space: nowrap;
}

.cb-sc-reset:hover {
  color: var(--cb-text, var(--dsw-alias-label-primary, #18181b));
  border-color: var(--cb-border-strong, #a1a1aa);
}

.cb-settings-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 4px 0 24px;
}

.cb-settings-section-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--dsw-alias-border-l2, #ececef);
}

.cb-settings-section-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--dsw-alias-label-primary, #18181b);
}

.cb-settings-section-desc {
  margin: 0;
  font-size: 12.5px;
  line-height: 19px;
  color: var(--dsw-alias-label-tertiary, #71717a);
}

.cb-settings-section-card {
  padding: 4px 16px 14px;
  border-radius: 12px;
  border: 1px solid var(--dsw-alias-border-l2, #ececef);
  background: var(--dsw-alias-bg-base, transparent);
}

/* ==================== FORK STARTER NODE ==================== */
.cb-editorial-starter {
  border-left-style: dashed !important;
  border-left-color: var(--cb-emerald) !important;
}

.cb-tag-linked {
  color: var(--cb-blue);
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.24);
}

/* ==================== NATIVE BOTTOM COMPOSER DOCK STRIP ==================== */
.cb-native-dock {
  position: relative;
  z-index: 2;
  pointer-events: auto !important;
  box-sizing: border-box;
  width: calc(100% - var(--dsh-composer-side-clearance, 16px) * 2);
  max-width: var(--dsh-composer-card-max-width, 760px);
  margin: 0 auto 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #e4e4e7;
  color: #3f3f46;
  font-size: 12px;
  line-height: 1.4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cb-native-dock.cb-theme-dark {
  background: rgba(24, 24, 27, 0.94);
  border-color: #2f2f35;
  color: #d4d4d8;
}

.cb-native-dock-fork {
  border-color: rgba(5, 150, 105, 0.42);
  background: rgba(236, 253, 245, 0.95);
  color: #065f46;
}

.cb-native-dock-fork.cb-theme-dark {
  border-color: rgba(52, 211, 153, 0.35);
  background: rgba(6, 78, 59, 0.32);
  color: #a7f3d0;
}

.cb-native-dock-main {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cb-native-dock-icon {
  display: inline-flex;
  align-items: center;
  color: #059669;
  flex-shrink: 0;
}

.cb-native-dock-fork.cb-theme-dark .cb-native-dock-icon {
  color: #34d399;
}

.cb-native-dock-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cb-native-dock-hint {
  color: #71717a;
  font-weight: 400;
}

.cb-native-dock.cb-theme-dark .cb-native-dock-hint {
  color: #a1a1aa;
}

.cb-native-dock-btn {
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0.85;
  transition: opacity 0.14s ease, background 0.14s ease;
}

.cb-native-dock-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.05);
}

.cb-native-dock-tracks {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.cb-native-dock-label {
  font-size: 11.5px;
  font-weight: 500;
  color: #71717a;
  white-space: nowrap;
  flex-shrink: 0;
}

.cb-native-dock.cb-theme-dark .cb-native-dock-label {
  color: #a1a1aa;
}

.cb-native-dock-chips {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

.cb-native-dock-chips::-webkit-scrollbar {
  display: none;
}

.cb-dock-track-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 180px;
  padding: 2px 9px;
  border-radius: 999px;
  border: 1px solid #e4e4e7;
  background: transparent;
  color: #52525b;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.45;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
}

.cb-dock-track-chip:hover {
  background: rgba(0, 0, 0, 0.04);
  color: #18181b;
  border-color: #d4d4d8;
}

.cb-dock-track-chip.cb-active {
  background: #18181b;
  border-color: #18181b;
  color: #ffffff;
}

.cb-native-dock.cb-theme-dark .cb-dock-track-chip {
  border-color: #3f3f46;
  color: #a1a1aa;
}

.cb-native-dock.cb-theme-dark .cb-dock-track-chip:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #f4f4f5;
  border-color: #52525b;
}

.cb-native-dock.cb-theme-dark .cb-dock-track-chip.cb-active {
  background: #f4f4f5;
  border-color: #f4f4f5;
  color: #18181b;
}

.cb-dock-track-chip-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ==================== WORKSPACE TIMELINE LINK MODAL ==================== */
.cb-modal-backdrop.cb-link-backdrop {
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  padding: 64px 20px calc(var(--dsh-composer-height, 168px) + 28px);
}

.cb-link-modal {
  width: min(500px, 90vw);
  max-height: min(100%, 460px);
  display: flex;
  flex-direction: column;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-subtle);
  border-radius: 12px;
  box-shadow: var(--cb-shadow-sheet);
  overflow: hidden;
}

.cb-link-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px 16px;
  min-height: 0;
  flex: 1 1 auto;
}

.cb-link-desc {
  font-size: 12px;
  line-height: 1.55;
  color: var(--cb-text-muted);
  flex-shrink: 0;
}

.cb-link-search {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--cb-border-subtle);
  background: var(--cb-surface-subtle);
  color: var(--cb-text-muted);
  flex-shrink: 0;
}

.cb-link-search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--cb-text);
  font-size: 12.5px;
}

.cb-link-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  min-height: 0;
  flex: 1 1 auto;
  padding-right: 2px;
}

.cb-link-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 11px;
  border-radius: 8px;
  border: 1px solid var(--cb-border-hairline);
  background: var(--cb-surface);
  text-align: left;
  cursor: pointer;
  transition: background 0.14s ease, border-color 0.14s ease;
}

.cb-link-row:hover:not(.cb-locked) {
  background: var(--cb-surface-hover);
  border-color: var(--cb-border-subtle);
}

.cb-link-row.cb-checked {
  border-color: var(--cb-border-strong);
  background: var(--cb-surface-subtle);
}

.cb-link-row.cb-locked {
  cursor: default;
}

.cb-link-check {
  width: 17px;
  height: 17px;
  border-radius: 5px;
  border: 1.5px solid var(--cb-border-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--cb-on-ink);
  background: var(--cb-surface);
}

.cb-link-check.cb-checked {
  background: var(--cb-ink);
  border-color: var(--cb-ink);
}

.cb-link-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.cb-link-title {
  font-size: 12.8px;
  font-weight: 500;
  color: var(--cb-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cb-link-time {
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  color: var(--cb-text-faint);
}

.cb-link-badge-col {
  flex-shrink: 0;
}

.cb-link-add-hint {
  font-size: 11px;
  color: var(--cb-text-faint);
}

.cb-link-empty {
  padding: 20px 12px;
  text-align: center;
  font-size: 12px;
  color: var(--cb-text-muted);
}

.cb-link-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--cb-border-hairline);
}

.cb-link-count {
  font-size: 12px;
  color: var(--cb-text-muted);
}

.cb-toast {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 95;
  padding: 7px 14px;
  border-radius: 8px;
  background: var(--cb-ink);
  color: var(--cb-on-ink);
  box-shadow: var(--cb-shadow-hud);
  font-size: 12px;
  font-weight: 500;
}

@media (max-width: 1120px) {
  .cb-shortcuts { display: none; }
  .cb-composer { width: calc(100% - 28px); left: 14px; transform: none; }
}
`;

export function injectChronoStyles(): () => void {
  if (typeof document === 'undefined') return () => {};
  let styleEl = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ELEMENT_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = CHRONOBRANCH_CSS;
  return () => {
    const existing = document.getElementById(STYLE_ELEMENT_ID);
    if (existing) existing.remove();
  };
}
