/**
 * Native DSH Shortcuts Service Bridge (`@deepseek-ai/dsh-client-shortcuts`).
 *
 * Registers ChronoBranch's timeline actions directly into DSH's own built-in
 * `ShortcutsService` (`ctx.shortcuts`), so users view, customize, clear, and
 * reset all timeline shortcuts inside DSH's native Settings -> 快捷键 page
 * alongside DSH's built-in commands (with native Electron persistence & conflict detection).
 */

import type {
  ShortcutBinding,
  ShortcutCatalogEntry,
  ShortcutCommand,
  ShortcutCommandId,
  ShortcutContext,
  Shortcuts,
} from '@deepseek-ai/dsh-client-shortcuts/client';
import { getChronoMessages, type ChronoLocale, type ChronoMessages } from '../core/i18n';
import type { ShortcutAction, ShortcutBindings } from '../core/types';

type ShortcutProfile =
  | 'desktop:windows'
  | 'desktop:macos'
  | 'desktop:linux'
  | 'web:windows'
  | 'web:macos'
  | 'web:linux';

export type ShortcutCommandHandler = (action: ShortcutAction) => void;

type ShortcutLabelKey =
  | 'scToggleExpand'
  | 'scForkNode'
  | 'scToggleMicro'
  | 'scPinTile'
  | 'scZoomL1'
  | 'scZoomL2'
  | 'scZoomL3';

interface ActionSpec {
  readonly action: ShortcutAction;
  readonly commandId: ShortcutCommandId;
  readonly labelKey: ShortcutLabelKey;
  readonly aliases: readonly string[];
  readonly defaultBinding: ShortcutBinding;
}

const PROFILES_WITH_DEFAULT: readonly ShortcutProfile[] = [
  'desktop:windows',
  'desktop:macos',
  'desktop:linux',
  'web:windows',
  'web:macos',
];

function makeDefaults(binding: ShortcutBinding): Partial<Record<ShortcutProfile, ShortcutBinding>> {
  const out: Partial<Record<ShortcutProfile, ShortcutBinding>> = {};
  for (const profile of PROFILES_WITH_DEFAULT) {
    out[profile] = binding;
  }
  return out;
}

const ACTION_SPECS: readonly ActionSpec[] = [
  {
    action: 'toggleExpand',
    commandId: 'chronobranch.toggle-expand' as ShortcutCommandId,
    labelKey: 'scToggleExpand',
    aliases: ['chronobranch', 'timeline', 'expand', '时间线', '展开'],
    defaultBinding: { code: 'KeyO', modifiers: ['primary', 'alt', 'shift'] },
  },
  {
    action: 'forkNode',
    commandId: 'chronobranch.fork-node' as ShortcutCommandId,
    labelKey: 'scForkNode',
    aliases: ['chronobranch', 'timeline', 'fork', 'branch', '时间线', '分叉'],
    defaultBinding: { code: 'KeyB', modifiers: ['primary', 'alt', 'shift'] },
  },
  {
    action: 'toggleMicro',
    commandId: 'chronobranch.toggle-micro' as ShortcutCommandId,
    labelKey: 'scToggleMicro',
    aliases: ['chronobranch', 'timeline', 'micro', '时间线', '微观小轴'],
    defaultBinding: { code: 'KeyM', modifiers: ['primary', 'alt', 'shift'] },
  },
  {
    action: 'pinTile',
    commandId: 'chronobranch.pin-tile' as ShortcutCommandId,
    labelKey: 'scPinTile',
    aliases: ['chronobranch', 'timeline', 'tile', 'pin', '时间线', '磁贴'],
    defaultBinding: { code: 'KeyT', modifiers: ['primary', 'alt', 'shift'] },
  },
  {
    action: 'zoomL1',
    commandId: 'chronobranch.zoom-l1' as ShortcutCommandId,
    labelKey: 'scZoomL1',
    aliases: ['chronobranch', 'timeline', 'zoom', 'overview', '时间线', '鸟瞰'],
    defaultBinding: { code: 'Digit1', modifiers: ['primary', 'alt', 'shift'] },
  },
  {
    action: 'zoomL2',
    commandId: 'chronobranch.zoom-l2' as ShortcutCommandId,
    labelKey: 'scZoomL2',
    aliases: ['chronobranch', 'timeline', 'zoom', 'dot-line', '时间线', '点线'],
    defaultBinding: { code: 'Digit2', modifiers: ['primary', 'alt', 'shift'] },
  },
  {
    action: 'zoomL3',
    commandId: 'chronobranch.zoom-l3' as ShortcutCommandId,
    labelKey: 'scZoomL3',
    aliases: ['chronobranch', 'timeline', 'zoom', 'expanded', '时间线', '展开视图'],
    defaultBinding: { code: 'Digit3', modifiers: ['primary', 'alt', 'shift'] },
  },
];

function formatCatalogKeys(entry: ShortcutCatalogEntry | undefined): string {
  if (!entry || !entry.keys || entry.keys.length === 0) return '';
  return entry.keys.join(' ').replace(/\s*\+\s*/g, '+');
}

const EMPTY_BINDINGS: ShortcutBindings = {
  toggleMicro: '',
  forkNode: '',
  toggleExpand: '',
  pinTile: '',
  zoomL1: '',
  zoomL2: '',
  zoomL3: '',
};

export interface NativeShortcutBridgeSnapshot {
  readonly connected: boolean;
  readonly bindings: ShortcutBindings;
}

export class NativeShortcutBridge {
  private handler: ShortcutCommandHandler | null = null;
  private snapshot: NativeShortcutBridgeSnapshot = {
    connected: false,
    bindings: EMPTY_BINDINGS,
  };
  private readonly listeners = new Set<() => void>();

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  readonly getSnapshot = (): NativeShortcutBridgeSnapshot => this.snapshot;

  setActiveHandler(handler: ShortcutCommandHandler | null): void {
    this.handler = handler;
  }

  /**
   * Attach to DSH's `ctx.shortcuts` service and register all ChronoBranch timeline commands.
   * Returns a disposer that cleanly unregisters all commands and listeners.
   */
  attach(shortcuts: Shortcuts, getLocale: () => ChronoLocale = () => 'zh'): () => void {
    const disposers: Array<() => void> = [];

    for (const spec of ACTION_SPECS) {
      const buildCommand = (defaults: Partial<Record<ShortcutProfile, ShortcutBinding>>): ShortcutCommand => ({
        id: spec.commandId,
        label: () => (getChronoMessages(getLocale()) as ChronoMessages)[spec.labelKey],
        aliases: spec.aliases,
        defaults,
        regions: ['page'],
        modals: [],
        resolve: (context: ShortcutContext) => {
          const activeHandler = this.handler;
          if (!activeHandler) return { status: 'pass' };
          if (context.region !== 'page' || context.modal !== null) return { status: 'pass' };
          return {
            status: 'handled',
            run: () => activeHandler(spec.action),
          };
        },
      });

      try {
        disposers.push(shortcuts.register(buildCommand(makeDefaults(spec.defaultBinding))));
      } catch (err) {
        // Default conflicted with another command or platform rule — register unbound so it remains customizable in Settings -> 快捷键
        console.warn(`[dsh-chronobranch] Default shortcut conflict for ${spec.commandId}, registering unbound:`, err);
        try {
          disposers.push(shortcuts.register(buildCommand({})));
        } catch (err2) {
          console.error(`[dsh-chronobranch] Failed to register shortcut ${spec.commandId}:`, err2);
        }
      }
    }

    const syncFromCatalog = () => {
      try {
        const rows = shortcuts.catalog.getSnapshot();
        const byId = new Map<string, ShortcutCatalogEntry>();
        for (const row of rows) {
          byId.set(row.id, row);
        }
        const nextBindings: Record<ShortcutAction, string> = {
          toggleMicro: '',
          forkNode: '',
          toggleExpand: '',
          pinTile: '',
          zoomL1: '',
          zoomL2: '',
          zoomL3: '',
        };
        for (const spec of ACTION_SPECS) {
          nextBindings[spec.action] = formatCatalogKeys(byId.get(spec.commandId));
        }
        this.snapshot = {
          connected: true,
          bindings: nextBindings,
        };
        this.emit();
      } catch {
        // Ignore transient catalog read errors
      }
    };

    syncFromCatalog();
    const unsubCatalog = shortcuts.catalog.subscribe(syncFromCatalog);
    disposers.push(unsubCatalog);

    return () => {
      for (const off of disposers.reverse()) {
        try {
          off();
        } catch {
          // Ignore dispose failure
        }
      }
      this.snapshot = {
        connected: false,
        bindings: EMPTY_BINDINGS,
      };
      this.emit();
    };
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn());
  }
}
