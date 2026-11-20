/**
 * Unified Chrono-Graph Schema (UCGS).
 * Platform-agnostic data and action contracts shared across DSH (Phase 1)
 * and future Antigravity Sidecar adapter (Phase 2).
 */

export type TrackKind = 'main' | 'human-branch' | 'linked-peer' | 'agent-subagent';
export type BranchStatus = 'active' | 'adopted' | 'dead-end' | 'side-quest';
export type NodeStatus = 'idle' | 'streaming' | 'waiting-approval' | 'completed' | 'error';
export type MicroStepKind = 'thinking' | 'tool-call' | 'terminal' | 'file-diff' | 'subagent-spawn';

export interface MicroStep {
  readonly id: string;
  readonly kind: MicroStepKind;
  readonly title: string;
  readonly duration?: string;
  readonly status: 'running' | 'success' | 'error';
  readonly detail?: string;
  readonly diff?: string;
}

export interface AgentChoiceOption {
  readonly label: string;
  readonly description?: string;
  readonly selected?: boolean;
}

export interface AgentChoicePrompt {
  readonly id: string;
  readonly header?: string;
  readonly question: string;
  readonly multiSelect?: boolean;
  readonly options: readonly AgentChoiceOption[];
  readonly selectedAnswers: readonly string[];
  readonly customAnswer?: string;
  readonly status: 'waiting' | 'answered' | 'cancelled' | 'interrupted';
}

export type AssistantSegment =
  | { readonly kind: 'markdown'; readonly id: string; readonly text: string }
  | { readonly kind: 'choice'; readonly id: string; readonly choice: AgentChoicePrompt };

export interface ChronoNode {
  readonly id: string;
  readonly trackId: string;
  readonly order: number;
  readonly turnLabel: string;
  readonly title: string;
  readonly timestamp: string;
  readonly status: NodeStatus;
  /** Exact DSH event seq boundary for native `ctx.sessions.fork({ sessionId, atSeq })`. */
  readonly atSeq?: number;
  readonly pinned?: boolean;
  readonly userText: string;
  readonly aiSummary: string;
  readonly aiFullText: string;
  /** Chronologically interleaved assistant markdown + agent choice cards. */
  readonly aiSegments?: readonly AssistantSegment[];
  readonly codeLang?: string;
  readonly codeSnippet?: string;
  readonly microSteps: readonly MicroStep[];
  /** Structured Agent-to-User choice prompts (`ask_user_question` / pending questions). */
  readonly choices?: readonly AgentChoicePrompt[];
  readonly stats: {
    readonly durationMs?: number;
    readonly toolCount: number;
    readonly filesChanged: number;
  };
  readonly mergedFrom?: {
    readonly trackTitle: string;
    readonly summary: string;
  };
  /** True when this node is a lightweight placeholder for an unloaded/unhydrated session. */
  readonly placeholder?: boolean;
  /** True when this node is a freshly-forked starter waiting for the user's first prompt in DSH's bottom composer. */
  readonly forkStarter?: boolean;
}

export interface ChronoTrack {
  readonly id: string;
  readonly kind: TrackKind;
  readonly title: string;
  readonly status: BranchStatus;
  readonly parentTrackId?: string;
  readonly forkFromNodeId?: string;
  readonly convergeToNodeId?: string;
  readonly color: string;
  readonly collapsed: boolean;
  readonly running: boolean;
  readonly hydrated: boolean;
  readonly hasMore?: boolean;
  readonly loadingOlder?: boolean;
  /** True when this track is manually linked from another conversation in the same workspace. */
  readonly linkedPeer?: boolean;
}

export interface WorkspaceSessionOption {
  readonly id: string;
  readonly title: string;
  readonly updatedAt?: number;
  readonly running?: boolean;
  /** How this session relates to the currently viewed timeline group. */
  readonly linkKind: 'self' | 'fork' | 'manual' | 'none';
}

export interface MergeLink {
  readonly id: string;
  readonly kind: 'cherry-pick' | 'subagent-return';
  readonly sourceTrackId: string;
  readonly sourceNodeId: string;
  readonly targetTrackId: string;
  readonly targetNodeId: string;
  readonly label?: string;
  readonly summary: string;
}

export interface PlatformCapabilities {
  readonly canSend: boolean;
  readonly canFork: boolean;
  readonly canStop: boolean;
  readonly canMerge: boolean;
  readonly canLoadOlder: boolean;
  readonly canSwitchSession: boolean;
}

export interface ChronoGraph {
  readonly rootTrackId: string;
  readonly activeTrackId: string;
  readonly tracks: Readonly<Record<string, ChronoTrack>>;
  readonly nodes: Readonly<Record<string, ChronoNode>>;
  readonly mergeLinks: readonly MergeLink[];
  readonly capabilities: PlatformCapabilities;
}

export interface ChronoActions {
  /** Optional close callback when running as an overlay (omitted when mounted as a native view tab). */
  readonly onClose?: () => void;
  /** Focus / hydrate a session track (calls `ctx.sessions.open` in DSH). */
  readonly onSelectTrack: (trackId: string) => void;
  /** Send a message or slash command on a track. */
  readonly onSend: (trackId: string, text: string) => Promise<void>;
  /** Fork a new branch from a completed node and optionally send the first prompt. */
  readonly onForkAndSend: (sourceTrackId: string, sourceNode: ChronoNode, promptText: string) => Promise<string | undefined>;
  /** Fork a new branch natively and switch DSH's unified bottom composer to target it (no second input box). */
  readonly onForkNode?: (sourceTrackId: string, sourceNode: ChronoNode) => Promise<string | undefined>;
  /** Link another conversation in the same workspace into the current timeline group. */
  readonly onLinkSession?: (targetSessionId: string) => void;
  /** Remove a manually linked conversation from the current timeline group. */
  readonly onUnlinkSession?: (targetSessionId: string) => void;
  /** Stop / cancel the running turn on a track. */
  readonly onStop: (trackId: string) => Promise<void>;
  /** Load older history turns for a track. */
  readonly onLoadOlder: (trackId: string) => Promise<void>;
  /** Update user-managed branch status & collapsed state. */
  readonly onSetTrackMeta: (trackId: string, patch: { status?: BranchStatus; collapsed?: boolean }) => void;
  /** Toggle pin on a node. */
  readonly onTogglePin: (nodeId: string) => void;
  /** Cherry-pick synthesized summary from a branch back into target (main) track. */
  readonly onCherryPickMerge: (opts: {
    sourceTrackId: string;
    sourceNodeId: string;
    targetTrackId: string;
    summary: string;
  }) => Promise<void>;
}

export type ShortcutAction =
  | 'toggleMicro'
  | 'forkNode'
  | 'toggleExpand'
  | 'pinTile'
  | 'zoomL1'
  | 'zoomL2'
  | 'zoomL3';

export type ShortcutBindings = Readonly<Record<ShortcutAction, string>>;

export const DEFAULT_SHORTCUTS: ShortcutBindings = {
  toggleMicro: 'e',
  forkNode: 'f',
  toggleExpand: 'Enter',
  pinTile: 'p',
  zoomL1: '1',
  zoomL2: '2',
  zoomL3: '3',
};

export interface ShortcutDescriptor {
  readonly action: ShortcutAction;
  readonly label: string;
  readonly description: string;
}

export const SHORTCUT_DESCRIPTORS: readonly ShortcutDescriptor[] = [
  { action: 'toggleMicro', label: '展开 / 收起微观小轴', description: '查看当前节点的工具调用与思考步骤' },
  { action: 'forkNode', label: '从选中节点拉出分支', description: '以当前轮次为分叉点开启新泳道' },
  { action: 'toggleExpand', label: '原地展开 / 收起完整对话', description: '在点线态与完整对话卡片间切换' },
  { action: 'pinTile', label: '悬挂为磁贴', description: '将当前对话贴为 DSH 原生磁贴，切对话/切模式不消失，支持自由磁吸并排对比' },
  { action: 'zoomL1', label: '缩放 · 鸟瞰视图 (L1)', description: '快速切换到极简点线鸟瞰视图' },
  { action: 'zoomL2', label: '缩放 · 点线视图 (L2)', description: '快速切换到平衡阅读点线视图' },
  { action: 'zoomL3', label: '缩放 · 展开视图 (L3)', description: '快速放大并展开当前选中对话' },
];

export function normalizeShortcutKey(e: KeyboardEvent): string | null {
  const key = e.key;
  if (!key || key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta') return null;
  const parts: string[] = [];
  if (e.ctrlKey) parts.push('Ctrl');
  if (e.altKey) parts.push('Alt');
  if (e.shiftKey && key.length > 1) parts.push('Shift');
  const normKey = key === ' ' ? 'Space' : key.length === 1 ? key.toLowerCase() : key;
  parts.push(normKey);
  return parts.join('+');
}

export function formatShortcutLabel(binding: string): string {
  if (!binding) return '未设置';
  return binding
    .split('+')
    .map((p) => (p.length === 1 ? p.toUpperCase() : p))
    .join(' + ');
}

export const RESTRAINED_BRANCH_PALETTE = [
  '#2563eb',
  '#059669',
  '#4f46e5',
  '#b45309',
  '#0f766e',
  '#52525b',
] as const;
