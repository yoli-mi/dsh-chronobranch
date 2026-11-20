/**
 * Editable keyboard shortcut configurator shared between:
 * - ChronoBranch in-canvas settings modal (gear button on timeline HUD)
 * - DSH native General Settings page (`settings.general.item` slot)
 */

import { useEffect, useState } from 'react';
import {
  formatShortcutLabel,
  normalizeShortcutKey,
  SHORTCUT_DESCRIPTORS,
  type ShortcutAction,
  type ShortcutBindings,
} from './types';

export interface ShortcutSettingsListProps {
  readonly shortcuts: ShortcutBindings;
  readonly onChangeShortcut: (action: ShortcutAction, binding: string) => void;
  readonly onResetShortcuts: () => void;
  readonly compact?: boolean;
}

export function ShortcutSettingsList({
  shortcuts,
  onChangeShortcut,
  onResetShortcuts,
  compact = false,
}: ShortcutSettingsListProps) {
  const [capturing, setCapturing] = useState<ShortcutAction | null>(null);

  useEffect(() => {
    if (!capturing) return;
    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.key === 'Escape') {
        setCapturing(null);
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
        onChangeShortcut(capturing, '');
        setCapturing(null);
        return;
      }
      const normalized = normalizeShortcutKey(e);
      if (!normalized) return;
      onChangeShortcut(capturing, normalized);
      setCapturing(null);
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [capturing, onChangeShortcut]);

  return (
    <div className={`cb-sc-list ${compact ? 'cb-sc-compact' : ''}`}>
      {SHORTCUT_DESCRIPTORS.map((desc) => {
        const isCap = capturing === desc.action;
        const binding = shortcuts[desc.action];
        return (
          <div key={desc.action} className="cb-sc-row">
            <div className="cb-sc-info">
              <div className="cb-sc-label">{desc.label}</div>
              {!compact && <div className="cb-sc-desc">{desc.description}</div>}
            </div>
            <button
              type="button"
              className={`cb-sc-keybtn ${isCap ? 'cb-capturing' : ''}`}
              onClick={() => setCapturing(isCap ? null : desc.action)}
              title="点击后按下新按键修改；按 Backspace 清空，按 Esc 取消"
            >
              {isCap ? '请按下按键…' : formatShortcutLabel(binding)}
            </button>
          </div>
        );
      })}

      <div className="cb-sc-row cb-sc-readonly">
        <div className="cb-sc-info">
          <div className="cb-sc-label">跨轮次与泳道导航</div>
          {!compact && <div className="cb-sc-desc">方向键快速在轮次节点和分支泳道之间跳转</div>}
        </div>
        <span className="cb-sc-static">← ↑ ↓ →</span>
      </div>

      <div className="cb-sc-row cb-sc-readonly">
        <div className="cb-sc-info">
          <div className="cb-sc-label">快捷贴为磁贴</div>
          {!compact && <div className="cb-sc-desc">按住 Shift 单击任意对话节点直接贴为 DSH 原生磁贴</div>}
        </div>
        <span className="cb-sc-static">Shift + 点击</span>
      </div>

      <div className="cb-sc-foot">
        <span className="cb-sc-tip">点击按键即可录制新快捷键（Backspace 清空，Esc 取消）</span>
        <button type="button" className="cb-sc-reset" onClick={onResetShortcuts}>
          恢复默认
        </button>
      </div>
    </div>
  );
}
