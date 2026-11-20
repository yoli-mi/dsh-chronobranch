/**
 * Root-level DSH Native Magnetic Tile Overlay (`shell.overlay` slot).
 *
 * 100% part of DeepSeek Harness itself (zero external apps or extra browser processes):
 * - Always renders cleanly above `.cb-hud-top`, composers, and sidebars (`z-index: 450` vs isolated canvas `z-index: 1`).
 * - Persists across `对话` / `轨迹` / `时间线` tabs AND across switching sessions in the left sidebar.
 * - Locate (`定位`) switches to the source session, activates `时间线` if needed, and centers the exact turn node.
 * - Pop-out tries DSH-native Document PiP first, then DSH Electron child window (`window.open`), with clear feedback if Electron blocks child windows.
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type MouseEvent as ReactMouseEvent } from 'react';
import type { ISessions, SessionId } from '@deepseek-ai/dsh-client-runtime/client';
import { AssistantContentBody } from '../core/AssistantContent';
import { IconArrange, IconClose, IconExpand, IconLocate, IconMinimize, IconPip } from '../core/icons';
import { ChronoMarkdown } from '../core/markdown';
import { CHRONOBRANCH_CSS } from '../core/styles';
import {
  TILE_GAP,
  TILE_MAX_H,
  TILE_MAX_W,
  TILE_MIN_H,
  TILE_MIN_W,
  TILE_SNAP_DIST,
  type MagneticTileRecord,
  type TileStore,
} from './tile-store';

interface DocumentPipApi {
  requestWindow(options?: { width?: number; height?: number }): Promise<Window>;
}

function getDocumentPip(): DocumentPipApi | null {
  if (typeof window === 'undefined') return null;
  const pip = (window as unknown as { documentPictureInPicture?: DocumentPipApi }).documentPictureInPicture;
  return pip && typeof pip.requestWindow === 'function' ? pip : null;
}

function readHostTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  const body = document.body;
  const root = document.documentElement;
  if (
    body.hasAttribute('data-ds-dark-theme') ||
    root.hasAttribute('data-ds-dark-theme') ||
    body.classList.contains('dark') ||
    root.classList.contains('dark') ||
    body.getAttribute('data-theme') === 'dark' ||
    root.getAttribute('data-theme') === 'dark'
  ) {
    return 'dark';
  }
  return 'light';
}

function activateTimelineTabIfPresent(): void {
  if (typeof document === 'undefined') return;
  const tabs = document.querySelectorAll<HTMLButtonElement>('[role="tablist"] [role="tab"]');
  for (const tab of Array.from(tabs)) {
    if (tab.textContent?.trim() === '时间线') {
      if (tab.getAttribute('aria-selected') !== 'true') {
        tab.click();
      }
      return;
    }
  }
}

function hydrateDetachedTileWindow(
  win: Window,
  tile: MagneticTileRecord,
  sourceEl: HTMLElement,
  theme: 'light' | 'dark',
): boolean {
  try {
    const doc = win.document;
    if (!doc) return false;
    doc.open();
    doc.write('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8" /></head><body></body></html>');
    doc.close();
    doc.title = `${tile.node.turnLabel} · ${tile.node.title}`;

    const styleTag = doc.createElement('style');
    styleTag.textContent = `${CHRONOBRANCH_CSS}
html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; background: var(--cb-surface); }
.cb-pip-host { width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
.cb-pip-host .cb-tile-head { cursor: default; }
.cb-pip-host .cb-tile-body { flex: 1; overflow-y: auto; }
.cb-pip-host.cb-pip-ai-only .cb-bubble-user { display: none; }`;
    doc.head.appendChild(styleTag);

    if (theme === 'dark') {
      doc.body.setAttribute('data-ds-dark-theme', '');
    }

    const host = doc.createElement('div');
    host.className = `cb-root cb-pip-host ${theme === 'dark' ? 'cb-theme-dark' : ''} ${tile.aiOnly ? 'cb-pip-ai-only' : ''}`;
    host.innerHTML = sourceEl.innerHTML;

    // Replace tools bar with a clean working `完整 / 仅AI` toggle inside the detached DSH window
    host.querySelectorAll('.cb-resize-handle').forEach((n) => n.remove());
    const tools = host.querySelector('.cb-tile-tools');
    if (tools) {
      tools.innerHTML = '';
      const aiBtn = doc.createElement('button');
      aiBtn.className = `cb-tile-btn ${tile.aiOnly ? 'cb-active' : ''}`;
      aiBtn.textContent = tile.aiOnly ? '仅AI' : '完整';
      aiBtn.addEventListener('click', () => {
        const next = host.classList.toggle('cb-pip-ai-only');
        aiBtn.classList.toggle('cb-active', next);
        aiBtn.textContent = next ? '仅AI' : '完整';
      });
      tools.appendChild(aiBtn);
    }

    // Re-bind code copy buttons inside the detached window
    host.querySelectorAll<HTMLButtonElement>('.cb-code-copy').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pre = btn.closest('.cb-code-block')?.querySelector('pre');
        const text = pre?.textContent ?? '';
        void win.navigator.clipboard?.writeText(text).catch(() => {});
        const span = btn.querySelector('span');
        if (span) {
          const prev = span.textContent;
          span.textContent = '已复制';
          win.setTimeout(() => {
            span.textContent = prev;
          }, 1400);
        }
      });
    });

    doc.body.appendChild(host);
    return true;
  } catch {
    return false;
  }
}

export interface TileOverlayProps {
  readonly tileStore: TileStore;
  readonly sessionsApi: ISessions;
  readonly getUiWorkspace?: () => { readonly openSession?: (target: SessionId) => void } | undefined;
}

export function TileOverlay({ tileStore, sessionsApi, getUiWorkspace }: TileOverlayProps) {
  const { tiles } = useSyncExternalStore(tileStore.subscribe, tileStore.getSnapshot);
  const [theme, setTheme] = useState<'light' | 'dark'>(readHostTheme);
  const [snappedId, setSnappedId] = useState<string | null>(null);
  const [activeOpId, setActiveOpId] = useState<string | null>(null);
  const [tileHint, setTileHint] = useState<{ id: string; text: string } | null>(null);

  const hintTimerRef = useRef<number | null>(null);
  const opRef = useRef<{
    mode: 'drag' | 'resize-e' | 'resize-s' | 'resize-se';
    tileId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  } | null>(null);

  const showTileHint = useCallback((id: string, text: string) => {
    setTileHint({ id, text });
    if (hintTimerRef.current) window.clearTimeout(hintTimerRef.current);
    hintTimerRef.current = window.setTimeout(() => setTileHint(null), 3200);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return;
    const sync = () => setTheme(readHostTheme());
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme', 'class', 'data-theme'] });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-ds-dark-theme', 'class', 'data-theme'],
    });
    return () => obs.disconnect();
  }, []);

  const startOp = useCallback(
    (e: ReactMouseEvent, tile: MagneticTileRecord, mode: 'drag' | 'resize-e' | 'resize-s' | 'resize-se') => {
      e.stopPropagation();
      e.preventDefault();
      tileStore.bringToFront(tile.id);
      opRef.current = {
        mode,
        tileId: tile.id,
        startX: e.clientX,
        startY: e.clientY,
        origX: tile.x,
        origY: tile.y,
        origW: tile.w,
        origH: tile.h,
      };
      setActiveOpId(tile.id);
    },
    [tileStore],
  );

  useEffect(() => {
    if (!activeOpId) return;
    const onMove = (e: MouseEvent) => {
      const op = opRef.current;
      if (!op) return;
      const dx = e.clientX - op.startX;
      const dy = e.clientY - op.startY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pad = 12;
      const minTop = 44;
      const maxBottom = Math.max(minTop + 80, vh - 12);

      const snapshot = tileStore.getSnapshot().tiles;
      const tile = snapshot.find((t) => t.id === op.tileId);
      if (!tile) return;
      const others = snapshot.filter((t) => t.id !== op.tileId);

      let didSnap = false;

      if (op.mode === 'drag') {
        const tileH = tile.minimized ? 38 : tile.h;
        let nx = Math.max(pad, Math.min(vw - tile.w - pad, op.origX + dx));
        let ny = Math.max(minTop, Math.min(maxBottom - tileH, op.origY + dy));

        if (Math.abs(nx - pad) <= TILE_SNAP_DIST) {
          nx = pad;
          didSnap = true;
        } else if (Math.abs(nx + tile.w - (vw - pad)) <= TILE_SNAP_DIST) {
          nx = vw - pad - tile.w;
          didSnap = true;
        }
        if (Math.abs(ny - minTop) <= TILE_SNAP_DIST) {
          ny = minTop;
          didSnap = true;
        } else if (Math.abs(ny + tileH - maxBottom) <= TILE_SNAP_DIST) {
          ny = maxBottom - tileH;
          didSnap = true;
        }

        for (const o of others) {
          const oh = o.minimized ? 38 : o.h;
          const xTargets = [o.x + o.w + TILE_GAP, o.x - tile.w - TILE_GAP, o.x, o.x + o.w - tile.w];
          for (const tx of xTargets) {
            if (Math.abs(nx - tx) <= TILE_SNAP_DIST) {
              nx = tx;
              didSnap = true;
              break;
            }
          }
          const yTargets = [o.y, o.y + oh + TILE_GAP, o.y - tileH - TILE_GAP, o.y + oh - tileH];
          for (const ty of yTargets) {
            if (Math.abs(ny - ty) <= TILE_SNAP_DIST) {
              ny = ty;
              didSnap = true;
              break;
            }
          }
        }

        tileStore.patchTile(tile.id, { x: Math.round(nx), y: Math.round(ny) });
      } else {
        let nw = tile.w;
        let nh = tile.h;
        if (op.mode === 'resize-e' || op.mode === 'resize-se') {
          nw = Math.max(TILE_MIN_W, Math.min(TILE_MAX_W, Math.min(vw - tile.x - pad, Math.round(op.origW + dx))));
          for (const o of others) {
            if (Math.abs(nw - o.w) <= 10) {
              nw = o.w;
              didSnap = true;
              break;
            }
          }
        }
        if (op.mode === 'resize-s' || op.mode === 'resize-se') {
          nh = Math.max(TILE_MIN_H, Math.min(TILE_MAX_H, Math.min(maxBottom - tile.y, Math.round(op.origH + dy))));
          for (const o of others) {
            if (!o.minimized && Math.abs(nh - o.h) <= 10) {
              nh = o.h;
              didSnap = true;
              break;
            }
          }
        }
        tileStore.patchTile(tile.id, { w: nw, h: nh, minimized: false });
      }

      setSnappedId(didSnap ? op.tileId : null);
    };

    const onUp = () => {
      opRef.current = null;
      setActiveOpId(null);
      setSnappedId(null);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [activeOpId, tileStore]);

  const handleLocate = useCallback(
    (tile: MagneticTileRecord) => {
      const sid = tile.sessionId as SessionId;
      try {
        const uiWorkspace = getUiWorkspace?.();
        if (uiWorkspace && typeof uiWorkspace.openSession === 'function') {
          uiWorkspace.openSession(sid);
        } else {
          const subAddr = sessionsApi.subagentAddress?.(sid);
          const listById = sessionsApi.list?.getSnapshot?.()?.byId;
          if (listById && listById[sid]) {
            sessionsApi.open(sid);
          } else if (subAddr) {
            sessionsApi.openSubagent?.(subAddr);
          } else {
            sessionsApi.open(sid);
          }
        }
      } catch {
        // Ignore if session already active
      }

      // Queue exact node focus for ChronoCanvas, and ensure the `时间线` tab is active
      tileStore.requestFocus(tile.sessionId, tile.nodeId);
      window.setTimeout(() => activateTimelineTabIfPresent(), 40);
      window.setTimeout(() => activateTimelineTabIfPresent(), 160);
    },
    [sessionsApi, getUiWorkspace, tileStore],
  );

  // Detach tile onto the Windows desktop as a 100% frameless, zero-taskbar-icon, always-on-top native card
  // (stays visible on desktop even when DSH Desktop is minimized — zero external Edge/Chrome app!)
  const handlePopOut = useCallback(
    async (tile: MagneticTileRecord, el: HTMLElement | null) => {
      const w = Math.max(320, Math.min(760, tile.w));
      const h = Math.max(260, Math.min(760, tile.h));
      const screenLeft = Math.round((window.screenX || 80) + tile.x);
      const screenTop = Math.round((window.screenY || 60) + tile.y);
      const durationText =
        tile.node.status === 'streaming'
          ? '生成中…'
          : tile.node.stats.durationMs
            ? `${(tile.node.stats.durationMs / 1000).toFixed(1)}s`
            : '';

      // Primary: Native Windows WPF Frameless Always-on-Top Card (ShowInTaskbar = false, owned by DSH host)
      try {
        const resp = await fetch('http://127.0.0.1:47392/api/desktop-tile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: tile.id,
            turnLabel: tile.node.turnLabel,
            title: tile.node.title,
            trackTitle: tile.trackTitle || 'DSH AGENT',
            trackColor: tile.trackColor,
            timestamp: tile.node.timestamp,
            durationText,
            userText: tile.node.userText,
            aiFullText: tile.node.aiFullText || tile.node.aiSummary,
            aiSegments: tile.node.aiSegments,
            choices: tile.node.choices,
            theme,
            aiOnly: tile.aiOnly,
            x: screenLeft,
            y: screenTop,
            w,
            h,
          }),
        });
        if (resp.ok) {
          const json = (await resp.json()) as { ok?: boolean };
          if (json.ok) {
            // Seamlessly hand off to the frameless desktop card (avoid showing two duplicate copies)
            tileStore.remove(tile.id);
            return;
          }
        }
      } catch {
        // Host bridge unavailable (e.g. DSH not restarted yet or non-Windows) -> try Document PiP fallback
      }

      // Secondary fallback: Native Chromium Document PiP
      const pip = getDocumentPip();
      if (pip && el) {
        try {
          const pipWin = await pip.requestWindow({ width: w, height: h });
          if (hydrateDetachedTileWindow(pipWin, tile, el, theme)) {
            tileStore.remove(tile.id);
            return;
          }
        } catch {
          // Ignore
        }
      }

      showTileHint(
        tile.id,
        '桌面悬浮桥未连接：请完全退出并重启一次 DeepSeek Harness 桌面端后即可无缝弹出无边框置顶磁贴。',
      );
    },
    [theme, tileStore, showTileHint],
  );

  if (tiles.length === 0) return null;

  return (
    <div
      className={`cb-overlay-host ${theme === 'dark' ? 'cb-theme-dark' : ''} ${activeOpId ? 'cb-resizing' : ''}`}
      data-chronobranch-tiles="true"
    >
      {tiles.map((tile) => {
        const isSnapped = snappedId === tile.id;
        const isActive = activeOpId === tile.id;
        const color = theme === 'dark' && tile.trackColor === '#27272a' ? '#d4d4d8' : tile.trackColor;

        return (
          <section
            key={tile.id}
            data-cb-tile-id={tile.id}
            className={[
              'cb-tile',
              tile.minimized ? 'cb-tile-minimized' : '',
              isSnapped ? 'cb-tile-snapped' : '',
              isActive ? 'cb-tile-active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              left: tile.x,
              top: tile.y,
              width: tile.w,
              height: tile.minimized ? undefined : tile.h,
              zIndex: tile.z,
            }}
            onMouseDown={() => tileStore.bringToFront(tile.id)}
            onWheel={(e) => e.stopPropagation()}
          >
            <div
              className="cb-tile-head"
              onMouseDown={(e) => {
                if ((e.target as HTMLElement).closest('button')) return;
                startOp(e, tile, 'drag');
              }}
              onDoubleClick={() => tileStore.patchTile(tile.id, { minimized: !tile.minimized })}
              title="拖动可自由悬挂于 DSH 任意位置并自动磁吸对齐；双击折叠"
            >
              <div className="cb-tile-id">
                <span className="cb-dot" style={{ background: color }} />
                <span className="cb-tile-turn">{tile.node.turnLabel}</span>
                <span className="cb-tile-title">{tile.node.title}</span>
              </div>
              <div className="cb-tile-tools">
                {tiles.length >= 2 && (
                  <button
                    className="cb-tile-btn"
                    title="一键将全部磁贴自动吸附并排"
                    onClick={(e) => {
                      e.stopPropagation();
                      tileStore.arrangeSideBySide();
                    }}
                  >
                    <IconArrange />
                  </button>
                )}
                {!tile.minimized && (
                  <button
                    className={`cb-tile-btn ${tile.aiOnly ? 'cb-active' : ''}`}
                    title={tile.aiOnly ? '切换为完整对话（含提问）' : '切换为仅看 AI 回复'}
                    onClick={(e) => {
                      e.stopPropagation();
                      tileStore.patchTile(tile.id, { aiOnly: !tile.aiOnly });
                    }}
                  >
                    <span>{tile.aiOnly ? '仅AI' : '完整'}</span>
                  </button>
                )}
                {!tile.minimized && (
                  <button
                    className="cb-tile-btn"
                    title="尝试以 DSH 原生独立子窗口悬浮到桌面"
                    onClick={(e) => {
                      e.stopPropagation();
                      const tileEl = (e.currentTarget as HTMLElement).closest('.cb-tile') as HTMLElement | null;
                      void handlePopOut(tile, tileEl);
                    }}
                  >
                    <IconPip />
                  </button>
                )}
                <button
                  className="cb-tile-btn"
                  title="跳转回该对话在时间线中的对应节点"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocate(tile);
                  }}
                >
                  <IconLocate />
                </button>
                <button
                  className="cb-tile-btn"
                  title={tile.minimized ? '展开磁贴' : '折叠为顶部条'}
                  onClick={(e) => {
                    e.stopPropagation();
                    tileStore.patchTile(tile.id, { minimized: !tile.minimized });
                  }}
                >
                  {tile.minimized ? <IconExpand /> : <IconMinimize />}
                </button>
                <button
                  className="cb-tile-btn"
                  title="取消磁贴"
                  onClick={(e) => {
                    e.stopPropagation();
                    tileStore.remove(tile.id);
                  }}
                >
                  <IconClose size="xs" />
                </button>
              </div>
            </div>

            {tileHint?.id === tile.id && (
              <div className="cb-tile-notice">{tileHint.text}</div>
            )}

            {!tile.minimized && (
              <>
                <div className="cb-tile-body">
                  {!tile.aiOnly && (
                    <div className="cb-bubble cb-bubble-user">
                      <div className="cb-bubble-role">
                        <span>YOU</span>
                        <span>{tile.node.timestamp}</span>
                      </div>
                      <ChronoMarkdown text={tile.node.userText} />
                    </div>
                  )}
                  <div className="cb-bubble cb-bubble-ai">
                    <div className="cb-bubble-role">
                      <span>{tile.trackTitle || 'DSH AGENT'}</span>
                      <span>
                        {tile.node.stats.durationMs ? `${(tile.node.stats.durationMs / 1000).toFixed(1)}s` : ''}
                      </span>
                    </div>
                    <AssistantContentBody node={tile.node} />
                  </div>
                </div>

                <div
                  className="cb-resize-handle cb-resize-e"
                  onMouseDown={(e) => startOp(e, tile, 'resize-e')}
                />
                <div
                  className="cb-resize-handle cb-resize-s"
                  onMouseDown={(e) => startOp(e, tile, 'resize-s')}
                />
                <div
                  className="cb-resize-handle cb-resize-se"
                  onMouseDown={(e) => startOp(e, tile, 'resize-se')}
                />
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}
