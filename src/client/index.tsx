/**
 * DeepSeek Harness (DSH) Browser Client Entry for ChronoBranch.
 *
 * Registers natively into:
 * 1. `conversation.view` (`id: 'chronobranch'`, `label: '时间线'`) right beside `对话` and `轨迹`
 * 2. `conversation.input.dock` (`id: 'chronobranch-branch-dock'`) so branching strictly reuses DSH's ONE unified bottom composer
 * 3. `shell.overlay` (`id: 'chronobranch-tiles'`) for DSH-native Magnetic Tiles + frameless Windows desktop pop-out
 * 4. `ctx.shortcuts` (`@deepseek-ai/dsh-client-shortcuts`) so all timeline shortcuts live directly in DSH's native Settings -> 快捷键
 */

import { Component, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ErrorInfo, type ReactNode } from 'react';
import type {
  ClientContext,
  ConversationSnapshot,
  ISessions,
  IWorkspaces,
  SessionId,
  SessionListState,
  SessionSummary,
  WorkspaceListState,
} from '@deepseek-ai/dsh-client-runtime/client';
import type {} from '@deepseek-ai/dsh-client-ui-layout/client';
import type { ConvViewProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { Shortcuts } from '@deepseek-ai/dsh-client-shortcuts/client';
import { ChronoCanvas } from '../core/ChronoCanvas';
import { getChronoMessages } from '../core/i18n';
import { IconFork } from '../core/icons';
import { injectChronoStyles } from '../core/styles';
import type { ChronoActions, ChronoNode, WorkspaceSessionOption } from '../core/types';
import { ComposerDockStore } from './composer-dock-store';
import {
  buildDshChronoGraph,
  computeLinkedComponentIds,
  type CachedSessionData,
  type ChatSnapshotLike,
  type ConversationStateLike,
} from './dsh-adapter';
import { ChronoLocaleStore, type DshLocaleServiceLike } from './locale-store';
import { ChronoMetaStore } from './meta-store';
import { NativeShortcutBridge } from './shortcut-bridge';
import { TileOverlay } from './TileOverlay';
import { TileStore } from './tile-store';

export const name = 'dsh-chronobranch';
export const inject = ['slots', 'sessions'];

type SelectorHook<T> = <R>(selector: (state: T) => R) => R;

interface UiConversationLike {
  readonly binding?: (
    sid: SessionId,
  ) =>
    | {
        readonly getSnapshot?: () => ConversationStateLike | undefined;
        readonly subscribe?: (listener: () => void) => () => void;
        readonly view?: (id: string) => unknown;
      }
    | undefined;
}

interface UiWorkspaceLike {
  readonly openSession?: (target: SessionId) => void;
}

interface ChronoViewSlotProps extends ConvViewProps {
  /** Provided by `@deepseek-ai/dsh-client-ui-conversation` in DSH 0.2.x standard session kit. */
  readonly useConversation?: SelectorHook<ConversationStateLike>;
  /** Provided by `@deepseek-ai/dsh-client-ui-chat` in DSH 0.2.x standard session kit. */
  readonly useChat?: SelectorHook<ChatSnapshotLike>;
  readonly sessionsApi: ISessions;
  readonly workspacesApi?: IWorkspaces;
  readonly uiConversationApi?: UiConversationLike;
  readonly getUiWorkspace?: () => UiWorkspaceLike | undefined;
  readonly metaStore: ChronoMetaStore;
  readonly tileStore: TileStore;
  readonly dockStore: ComposerDockStore;
  readonly localeStore: ChronoLocaleStore;
  readonly shortcutBridge: NativeShortcutBridge;
  readonly snapshotCache: Map<string, CachedSessionData>;
}

const noopUseChat: SelectorHook<ChatSnapshotLike | undefined> = <R,>() => undefined as R;
const noopUseConversation: SelectorHook<ConversationStateLike | undefined> = <R,>() => undefined as R;
const noopUseWorkspaces: SelectorHook<WorkspaceListState | undefined> = <R,>() => undefined as R;

interface ErrorBoundaryState {
  error: Error | null;
}

class ChronoErrorBoundary extends Component<{ children: ReactNode; errorTitle?: string }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[dsh-chronobranch] Render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          data-conversation-composer-overlay="true"
          data-chronobranch-view="true"
          style={{
            padding: 24,
            background: '#f7f7f8',
            color: '#18181b',
            fontFamily: 'system-ui, sans-serif',
            minHeight: 320,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            {this.props.errorTitle ?? 'ChronoBranch Render Error'}
          </div>
          <pre
            style={{
              padding: 12,
              borderRadius: 8,
              background: '#fff',
              border: '1px solid #e4e4e7',
              fontSize: 12,
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {this.state.error.message}
            {'\n'}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
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

function useHostTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(readHostTheme);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return;
    const sync = () => setTheme(readHostTheme());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-ds-dark-theme', 'class', 'data-theme'],
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-ds-dark-theme', 'class', 'data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

function focusNativeBottomComposer(): void {
  if (typeof document === 'undefined') return;
  window.requestAnimationFrame(() => {
    const el = document.querySelector(
      '[data-composer-seat] textarea, [data-composer-seat] [contenteditable="true"]',
    ) as HTMLElement | null;
    el?.focus();
  });
}

function activateTimelineTabIfNeeded(): boolean {
  if (typeof document === 'undefined') return false;
  const tabs = document.querySelectorAll<HTMLButtonElement>('[role="tablist"] [role="tab"]');
  for (const tab of Array.from(tabs)) {
    const label = tab.textContent?.trim();
    if (label === '时间线' || label === 'Timeline') {
      if (tab.getAttribute('aria-selected') !== 'true') {
        tab.click();
      }
      return true;
    }
  }
  return false;
}

/**
 * Switch DSH's active session (and therefore DSH's unified bottom composer target) to `targetSid`,
 * using DSH 0.2.x's `uiWorkspace.openSession(targetSid)` (falling back to 0.1.x `sessionsApi.open`),
 * while keeping the user seamlessly on the `时间线` tab instead of letting DSH's per-session
 * persisted view jump back to `对话`.
 */
function openSessionInTimeline(
  sessionsApi: ISessions,
  getUiWorkspace: (() => UiWorkspaceLike | undefined) | undefined,
  targetSid: SessionId,
  focusComposer = false,
): void {
  try {
    const uiWorkspace = getUiWorkspace?.();
    if (uiWorkspace && typeof uiWorkspace.openSession === 'function') {
      uiWorkspace.openSession(targetSid);
    } else if (typeof sessionsApi?.open === 'function') {
      sessionsApi.open(targetSid);
    }
  } catch (err) {
    console.warn('[dsh-chronobranch] openSession failed for', targetSid, err);
    try {
      if (typeof sessionsApi?.open === 'function') {
        sessionsApi.open(targetSid);
      }
    } catch {
      return;
    }
  }

  if (typeof window === 'undefined') return;
  let settled = false;
  const ensureTimeline = () => {
    if (settled) return;
    const viewEl = document.querySelector('[data-chronobranch-view="true"]');
    const currentViewSession = viewEl?.getAttribute('data-chronobranch-session');
    if (viewEl && currentViewSession === targetSid) {
      settled = true;
      if (focusComposer) focusNativeBottomComposer();
      return;
    }
    if (!viewEl) {
      activateTimelineTabIfNeeded();
    }
    if (focusComposer) {
      focusNativeBottomComposer();
    }
  };
  window.requestAnimationFrame(ensureTimeline);
  window.setTimeout(ensureTimeline, 45);
  window.setTimeout(ensureTimeline, 140);
  window.setTimeout(ensureTimeline, 280);
}

function deriveWorkspaceLabel(cwd: string | undefined): string | undefined {
  if (!cwd) return undefined;
  const parts = cwd.replace(/[\\/]+$/, '').split(/[\\/]/);
  return parts[parts.length - 1] || cwd;
}

function ChronoConversationInner(props: ChronoViewSlotProps) {
  const {
    sessionId,
    useSession,
    useSessions,
    sessionsApi,
    workspacesApi,
    uiConversationApi,
    getUiWorkspace,
    metaStore,
    tileStore,
    dockStore,
    localeStore,
    shortcutBridge,
    snapshotCache,
  } = props;
  const useConversationHook =
    typeof props.useConversation === 'function' ? props.useConversation : noopUseConversation;
  const useChatHook = typeof props.useChat === 'function' ? props.useChat : noopUseChat;
  const useWorkspacesHook = typeof props.useWorkspaces === 'function' ? props.useWorkspaces : noopUseWorkspaces;

  const hostTheme = useHostTheme();
  const locale = useSyncExternalStore(localeStore.subscribe, localeStore.getSnapshot);
  const msg = useMemo(() => getChronoMessages(locale), [locale]);
  const currentSnapshot: ConversationSnapshot | undefined = useSession((s) => s);
  const hookConversation: ConversationStateLike | undefined = useConversationHook((s) => s);
  const currentChat: ChatSnapshotLike | undefined = useChatHook((s) => s);
  const listState: SessionListState | undefined = useSessions((s) => s);
  const hookWorkspaces: WorkspaceListState | undefined = useWorkspacesHook((s) => s);
  const meta = useSyncExternalStore(metaStore.subscribe, metaStore.getSnapshot);
  const tileState = useSyncExternalStore(tileStore.subscribe, tileStore.getSnapshot);
  const shortcutState = useSyncExternalStore(shortcutBridge.subscribe, shortcutBridge.getSnapshot);
  const pinnedTileNodeIds = useMemo(() => new Set(tileState.tiles.map((t) => t.nodeId)), [tileState.tiles]);
  const loggedDiagRef = useRef<Set<string>>(new Set());

  // Fallback workspace subscription if `useWorkspaces` wasn't injected on the slot
  const [fallbackWorkspaces, setFallbackWorkspaces] = useState<WorkspaceListState | undefined>(undefined);
  useEffect(() => {
    if (hookWorkspaces || !workspacesApi?.list) {
      setFallbackWorkspaces(undefined);
      return;
    }
    const read = () => {
      try {
        setFallbackWorkspaces(workspacesApi.list.getSnapshot());
      } catch {
        // Ignore
      }
    };
    read();
    return workspacesApi.list.subscribe(read);
  }, [hookWorkspaces, workspacesApi]);
  const workspacesState = hookWorkspaces ?? fallbackWorkspaces;

  // Fallback to ctx.get('uiConversation')?.binding(sessionId) if the view slot didn't inject `useConversation`
  const [boundConversation, setBoundConversation] = useState<ConversationStateLike | undefined>(undefined);
  useEffect(() => {
    if (hookConversation || !uiConversationApi?.binding) {
      setBoundConversation(undefined);
      return;
    }
    try {
      const convBinding = uiConversationApi.binding(sessionId);
      if (!convBinding) return;
      const read = () => {
        try {
          const snap = typeof convBinding.getSnapshot === 'function' ? convBinding.getSnapshot() : undefined;
          const chatView = typeof convBinding.view === 'function' ? convBinding.view('chat') : undefined;
          if (chatView && typeof chatView === 'object') {
            setBoundConversation({ ...(snap ?? {}), chat: chatView as ChatSnapshotLike });
          } else if (snap) {
            setBoundConversation(snap);
          }
        } catch {
          // Ignore snapshot read mismatch
        }
      };
      read();
      const unsub = typeof convBinding.subscribe === 'function' ? convBinding.subscribe(read) : undefined;
      return () => {
        if (typeof unsub === 'function') unsub();
      };
    } catch {
      return;
    }
  }, [sessionId, hookConversation, uiConversationApi]);

  const currentConversation = hookConversation ?? boundConversation;

  // Cache live hydrated chat + conversation + session snapshots so sibling/linked tracks stay visible simultaneously
  useEffect(() => {
    const hasChatData =
      Boolean(currentChat?.order && currentChat.order.length > 0) ||
      Boolean(currentChat?.legacy?.nodes && currentChat.legacy.nodes.length > 0);
    const hasConvData = Boolean(currentConversation);
    const hasSessionData =
      currentSnapshot?.openState === 'open' ||
      Boolean(currentSnapshot?.chat?.order && currentSnapshot.chat.order.length > 0) ||
      Boolean(currentSnapshot?.nodes && currentSnapshot.nodes.length > 0);

    if (hasChatData || hasConvData || hasSessionData) {
      snapshotCache.set(sessionId, {
        session: currentSnapshot,
        conversation: currentConversation,
        chat: currentChat,
      });
    }
  }, [sessionId, currentSnapshot, currentConversation, currentChat, snapshotCache]);

  // Refresh direct Subagent catalog safely
  useEffect(() => {
    try {
      const maybePromise = sessionsApi?.refreshSubagents?.(sessionId);
      if (maybePromise && typeof maybePromise.catch === 'function') {
        void maybePromise.catch(() => {});
      }
    } catch {
      // Ignore if runtime omits subagent refresh
    }
  }, [sessionId, sessionsApi]);

  const graph = useMemo(
    () =>
      buildDshChronoGraph({
        sessionId,
        currentSnapshot,
        currentConversation,
        currentChat,
        listState,
        sessionsApi,
        uiConversationApi,
        snapshotCache,
        meta,
        locale,
      }),
    [
      sessionId,
      currentSnapshot,
      currentConversation,
      currentChat,
      listState,
      sessionsApi,
      uiConversationApi,
      snapshotCache,
      meta,
      locale,
    ],
  );

  // Sync timeline context & clickable track targets to DSH's native `conversation.input.dock` slot
  useEffect(() => {
    const activeTrack = graph.tracks[sessionId];
    const sendableTracks = Object.values(graph.tracks)
      .filter((t) => t.kind !== 'agent-subagent')
      .map((t) => ({
        id: t.id,
        title: t.title,
        color: t.color,
        active: t.id === sessionId,
      }));
    dockStore.setTimelineContext(
      sessionId,
      sendableTracks.length,
      activeTrack?.title ?? '',
      activeTrack?.color ?? '#27272a',
      sendableTracks,
    );
    const activeNodes = Object.values(graph.nodes).filter((n) => n.trackId === sessionId);
    if (activeNodes.some((n) => !n.forkStarter && !n.placeholder)) {
      dockStore.clearForkNoticeIfMatches(sessionId);
    }
    return () => {
      // Only clear if we weren't immediately superseded by another session mounting the timeline
      if (dockStore.getSnapshot().timelineMountedFor === sessionId) {
        dockStore.setTimelineContext(null);
      }
    };
  }, [dockStore, sessionId, graph]);

  // Build same-workspace conversation list for the Workspace Timeline Linking picker
  const { workspaceName, workspaceSessions } = useMemo(() => {
    const byId = (listState?.byId ?? {}) as Record<SessionId, SessionSummary>;
    const currentSummary = byId[sessionId];
    const { componentIds, forkFamilySet } = computeLinkedComponentIds({ sessionId, byId, meta });
    const componentSet = new Set<string>(componentIds);

    const matchedWorkspace = workspacesState?.items?.find((w) => w.sessionIds.includes(sessionId));
    const currentCwd = currentSummary?.cwd;

    const candidateIdSet = new Set<string>([sessionId, ...componentIds]);
    if (matchedWorkspace) {
      for (const sid of matchedWorkspace.sessionIds) {
        if (byId[sid]) candidateIdSet.add(sid);
      }
    } else if (currentCwd) {
      for (const s of Object.values(byId)) {
        if (s && s.cwd === currentCwd) candidateIdSet.add(s.id);
      }
    }

    const items: WorkspaceSessionOption[] = [];
    for (const id of candidateIdSet) {
      const summary = byId[id as SessionId];
      if (!summary && id !== sessionId) continue;
      if (summary?.origin === 'subagent') continue;
      const linkKind: WorkspaceSessionOption['linkKind'] =
        id === sessionId
          ? 'self'
          : forkFamilySet.has(id)
            ? 'fork'
            : componentSet.has(id)
              ? 'manual'
              : 'none';
      items.push({
        id,
        title: summary?.displayTitle || msg.defaultUntitled,
        updatedAt: summary?.updatedAt,
        running: summary?.running,
        linkKind,
      });
    }

    const rank = (k: WorkspaceSessionOption['linkKind']): number =>
      k === 'self' ? 0 : k === 'fork' ? 1 : k === 'manual' ? 2 : 3;

    items.sort((a, b) => {
      const ra = rank(a.linkKind);
      const rb = rank(b.linkKind);
      if (ra !== rb) return ra - rb;
      return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
    });

    return {
      workspaceName: matchedWorkspace?.title ?? deriveWorkspaceLabel(currentCwd),
      workspaceSessions: items,
    };
  }, [listState, sessionId, workspacesState, meta, msg]);

  // One-time diagnostic if a non-blank open session still fails to hydrate nodes
  useEffect(() => {
    const activeTrack = graph.tracks[sessionId];
    const summary = listState?.byId?.[sessionId];
    if (
      activeTrack &&
      !activeTrack.hydrated &&
      !summary?.blank &&
      currentSnapshot?.openState !== 'loading' &&
      !loggedDiagRef.current.has(sessionId)
    ) {
      loggedDiagRef.current.add(sessionId);
      console.info('[dsh-chronobranch] diagnostic (unhydrated session):', {
        sessionId,
        propKeys: Object.keys(props),
        hasUiConversation: Boolean(uiConversationApi),
        snapshotKeys: currentSnapshot ? Object.keys(currentSnapshot) : null,
        conversationKeys: currentConversation ? Object.keys(currentConversation) : null,
        chatKeys: currentChat ? Object.keys(currentChat) : null,
      });
    }
  }, [sessionId, graph, listState, currentSnapshot, currentConversation, currentChat, uiConversationApi, props]);

  const actions: ChronoActions = useMemo(
    () => ({
      onSelectTrack: (trackId: string) => {
        const sid = trackId as SessionId;
        if (sid === sessionId) {
          focusNativeBottomComposer();
          return;
        }
        const liveById = listState?.byId ?? sessionsApi.list?.getSnapshot?.()?.byId;
        if (liveById?.[sid]) {
          openSessionInTimeline(sessionsApi, getUiWorkspace, sid, false);
          return;
        }
        const subAddr = sessionsApi.subagentAddress?.(sid);
        if (subAddr) {
          sessionsApi.openSubagent?.(subAddr);
          return;
        }
        openSessionInTimeline(sessionsApi, getUiWorkspace, sid, false);
      },

      onSend: async (trackId: string, text: string) => {
        const sid = trackId as SessionId;
        if (sessionId !== sid && listState?.byId?.[sid]) {
          openSessionInTimeline(sessionsApi, getUiWorkspace, sid, false);
        }
        const binding = sessionsApi.binding?.(sid);
        if (!binding) throw new Error(msg.errSessionNotReady);

        if (text.startsWith('/')) {
          await binding.session.command(text);
          return;
        }
        const res = await binding.session.prompt([{ type: 'text', text }], 'queue');
        if (!res.ok) {
          throw new Error(res.error?.message || msg.errSendRejected);
        }
      },

      onForkNode: async (sourceTrackId: string, sourceNode: ChronoNode) => {
        const sourceSid = sourceTrackId as SessionId;
        const childId = await sessionsApi.fork({
          sessionId: sourceSid,
          atSeq: sourceNode.atSeq,
          increaseTitle: true,
        });

        metaStore.patchTrackMeta(childId, {
          status: 'active',
          collapsed: false,
          forkFromNodeId: sourceNode.id,
          forkAtSeq: sourceNode.atSeq,
          forkParentId: sourceSid,
        });

        dockStore.setForkNotice({
          childSessionId: childId,
          sourceSessionId: sourceSid,
          sourceTurnLabel: sourceNode.turnLabel,
          sourceTitle: sourceNode.title,
          trackColor: '#059669',
        });

        openSessionInTimeline(sessionsApi, getUiWorkspace, childId, true);
        return childId;
      },

      onForkAndSend: async (sourceTrackId: string, sourceNode: ChronoNode, promptText: string) => {
        const sourceSid = sourceTrackId as SessionId;
        const childId = await sessionsApi.fork({
          sessionId: sourceSid,
          atSeq: sourceNode.atSeq,
          increaseTitle: true,
        });

        metaStore.patchTrackMeta(childId, {
          status: 'active',
          collapsed: false,
          forkFromNodeId: sourceNode.id,
          forkAtSeq: sourceNode.atSeq,
          forkParentId: sourceSid,
        });

        openSessionInTimeline(sessionsApi, getUiWorkspace, childId, false);

        const binding = sessionsApi.binding?.(childId);
        if (binding && promptText.trim()) {
          if (promptText.trim().startsWith('/')) {
            await binding.session.command(promptText.trim());
          } else {
            await binding.session.prompt([{ type: 'text', text: promptText.trim() }], 'queue');
          }
        }
        return childId;
      },

      onLinkSession: (targetSessionId: string) => {
        metaStore.linkSessions(sessionId, targetSessionId);
      },

      onUnlinkSession: (targetSessionId: string) => {
        const byId = (listState?.byId ?? {}) as Record<SessionId, SessionSummary>;
        const latestMeta = metaStore.getSnapshot();
        const { forkFamilySet: targetForkFamily } = computeLinkedComponentIds({
          sessionId: targetSessionId as SessionId,
          byId,
          meta: { ...latestMeta, linkGroups: [] },
        });
        targetForkFamily.forEach((id) => {
          metaStore.unlinkSession(id);
        });
      },

      onStop: async (trackId: string) => {
        const binding = sessionsApi.binding?.(trackId as SessionId);
        if (binding) {
          await binding.session.cancel();
        }
      },

      onLoadOlder: async (trackId: string) => {
        const binding = sessionsApi.binding?.(trackId as SessionId);
        if (binding) {
          await binding.session.loadOlder();
        }
      },

      onSetTrackMeta: (trackId, patch) => {
        metaStore.patchTrackMeta(trackId, patch);
      },

      onTogglePin: (nodeId) => {
        metaStore.togglePin(nodeId);
      },

      onCherryPickMerge: async ({ sourceTrackId, sourceNodeId, targetTrackId, summary }) => {
        const targetSid = targetTrackId as SessionId;
        if (sessionId !== targetSid && listState?.byId?.[targetSid]) {
          openSessionInTimeline(sessionsApi, getUiWorkspace, targetSid, false);
        }
        const binding = sessionsApi.binding?.(targetSid);
        if (!binding) throw new Error(msg.errSessionNotReady);

        const promptBody =
          locale === 'en'
            ? `[ChronoBranch Cherry-Pick Summary]\n${summary}\n\nPlease incorporate these verified findings from the exploration branch into the main thread context.`
            : `[ChronoBranch Cherry-pick 结论回流]\n${summary}\n\n请接收以上来自探索分支的已验证结论，并将其作为主线后续工作的有效上下文。`;
        const prevSnap = binding.session.getSnapshot();
        const prevOrderLen = prevSnap.chat?.order?.length ?? prevSnap.nodes?.length ?? 0;

        const res = await binding.session.prompt([{ type: 'text', text: promptBody }], 'queue');
        if (!res.ok) {
          throw new Error(res.error?.message || msg.errMergeSendFailed);
        }

        const unsub = binding.session.subscribe(() => {
          const nextSnap = binding.session.getSnapshot();
          const nextOrderLen = nextSnap.chat?.order?.length ?? nextSnap.nodes?.length ?? 0;
          if (nextOrderLen > prevOrderLen) {
            let addedSeq: number | undefined;
            if (nextSnap.chat?.order && nextSnap.chat.nodes) {
              for (let i = nextSnap.chat.order.length - 1; i >= 0; i--) {
                const n = nextSnap.chat.nodes.get(nextSnap.chat.order[i]);
                if (n?.kind === 'user') {
                  addedSeq = (n.data as { seq?: number } | undefined)?.seq ?? n.anchorSeq;
                  break;
                }
              }
            }
            if (addedSeq === undefined && Array.isArray(nextSnap.nodes)) {
              const addedUser = [...nextSnap.nodes].reverse().find((n) => n.kind === 'user');
              addedSeq = addedUser?.seq;
            }
            if (addedSeq !== undefined) {
              metaStore.addMergeLink({
                id: `ml-${Date.now()}`,
                kind: 'cherry-pick',
                sourceTrackId,
                sourceNodeId,
                targetTrackId,
                targetNodeId: `${targetSid}:turn:${addedSeq}`,
                label: msg.cherryMergePill,
                summary,
              });
              unsub();
            }
          }
        });
        window.setTimeout(() => unsub(), 8000);
      },
    }),
    [sessionId, listState, sessionsApi, getUiWorkspace, metaStore, dockStore, locale, msg],
  );

  // Keep any already-pinned magnetic tiles live-synced when their source turn streams
  useEffect(() => {
    tileStore.syncLiveNodes(graph.nodes);
  }, [tileStore, graph.nodes]);

  return (
    <ChronoCanvas
      graph={graph}
      actions={actions}
      theme={hostTheme}
      locale={locale}
      useNativeComposer={true}
      shortcuts={shortcutState.connected ? shortcutState.bindings : meta.shortcuts}
      managedShortcuts={shortcutState.connected}
      onRegisterShortcutHandler={(handler) => shortcutBridge.setActiveHandler(handler)}
      pinnedTileNodeIds={pinnedTileNodeIds}
      onToggleTile={(node, trackTitle, trackColor) =>
        tileStore.togglePin({ node, trackTitle, trackColor })
      }
      focusRequest={tileState.focusRequest}
      onFocusConsumed={(seq) => tileStore.clearFocusRequest(seq)}
      workspaceName={workspaceName}
      workspaceSessions={workspaceSessions}
    />
  );
}

function ChronoConversationView(props: ChronoViewSlotProps) {
  const locale = useSyncExternalStore(props.localeStore.subscribe, props.localeStore.getSnapshot);
  return (
    <ChronoErrorBoundary errorTitle={getChronoMessages(locale).errorTitle}>
      <ChronoConversationInner {...props} />
    </ChronoErrorBoundary>
  );
}

interface ComposerDockSlotProps {
  readonly sessionId?: SessionId;
  readonly session?: { readonly sessionId?: SessionId };
  readonly dockStore: ComposerDockStore;
  readonly localeStore: ChronoLocaleStore;
  readonly sessionsApi: ISessions;
  readonly getUiWorkspace?: () => UiWorkspaceLike | undefined;
}

/**
 * Slim status dock mounted natively into DSH's `conversation.input.dock` slot
 * directly above DSH's single unified bottom composer (no duplicate input box).
 */
function ChronoComposerDock({
  sessionId,
  session,
  dockStore,
  localeStore,
  sessionsApi,
  getUiWorkspace,
}: ComposerDockSlotProps) {
  const dock = useSyncExternalStore(dockStore.subscribe, dockStore.getSnapshot);
  const locale = useSyncExternalStore(localeStore.subscribe, localeStore.getSnapshot);
  const msg = getChronoMessages(locale);
  const hostTheme = useHostTheme();

  const activeSid = sessionId ?? session?.sessionId;
  if (!activeSid) return null;

  const isFreshFork = dock.forkNotice?.childSessionId === activeSid;
  const showMultiTrackTarget =
    !isFreshFork && dock.timelineMountedFor === activeSid && dock.trackCount > 1 && dock.tracks.length > 1;

  if (!isFreshFork && !showMultiTrackTarget) return null;

  return (
    <div
      className={`cb-native-dock ${isFreshFork ? 'cb-native-dock-fork' : ''} ${hostTheme === 'dark' ? 'cb-theme-dark' : ''}`}
      data-chronobranch-dock="true"
    >
      {isFreshFork && dock.forkNotice ? (
        <>
          <span className="cb-native-dock-main">
            <span className="cb-native-dock-icon">
              <IconFork size="xs" />
            </span>
            <span>
              {msg.dockForkedPrefix} <strong>{dock.forkNotice.sourceTurnLabel}</strong> {msg.dockForkedSuffix}
            </span>
          </span>
          <button
            type="button"
            className="cb-native-dock-btn"
            onClick={() => {
              const sourceId = dock.forkNotice!.sourceSessionId as SessionId;
              dockStore.setForkNotice(null);
              openSessionInTimeline(sessionsApi, getUiWorkspace, sourceId, false);
            }}
          >
            {msg.dockBackToSource}
          </button>
        </>
      ) : (
        <div className="cb-native-dock-tracks">
          <span className="cb-native-dock-label">{msg.dockInputTarget}</span>
          <div className="cb-native-dock-chips">
            {dock.tracks.map((tr) => (
              <button
                key={tr.id}
                type="button"
                className={`cb-dock-track-chip ${tr.active ? 'cb-active' : ''}`}
                title={tr.active ? msg.dockActiveTip(tr.title) : msg.dockSwitchTip(tr.title)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (tr.active) {
                    focusNativeBottomComposer();
                    return;
                  }
                  openSessionInTimeline(sessionsApi, getUiWorkspace, tr.id as SessionId, true);
                }}
              >
                <span className="cb-native-dock-dot" style={{ background: tr.color }} />
                <span className="cb-dock-track-chip-text">{tr.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function apply(ctx: ClientContext): void {
  const metaStore = new ChronoMetaStore();
  const tileStore = new TileStore();
  const dockStore = new ComposerDockStore();
  const localeStore = new ChronoLocaleStore();
  const shortcutBridge = new NativeShortcutBridge();
  const snapshotCache = new Map<string, CachedSessionData>();

  ctx.effect(() => {
    const removeStyles = injectChronoStyles();
    return () => {
      removeStyles();
    };
  }, 'dsh-chronobranch:styles');

  // Observe DOM lang attribute as fallback, and attach to DSH's reactive `ctx.locale` service
  ctx.effect(() => localeStore.observeDocumentLang(), 'dsh-chronobranch:dom-lang');

  try {
    (ctx as unknown as { inject?: (deps: string[], fn: (sub: ClientContext) => void) => void }).inject?.(
      ['locale'],
      (lCtx) => {
        lCtx.effect(() => {
          const localeSvc = (lCtx as unknown as { get?: (k: string) => unknown }).get?.('locale') as
            | DshLocaleServiceLike
            | undefined;
          if (!localeSvc) return () => {};
          return localeStore.attachDshLocale(localeSvc);
        }, 'dsh-chronobranch:locale');
      },
    );
  } catch (err) {
    console.warn('[dsh-chronobranch] Unable to attach to native locale service:', err);
  }

  const getOptionalService = <T,>(serviceName: string): T | undefined => {
    try {
      const getter = (ctx as unknown as { get?: (name: string) => unknown }).get;
      return typeof getter === 'function' ? (getter.call(ctx, serviceName) as T | undefined) : undefined;
    } catch {
      return undefined;
    }
  };

  const getUiWorkspace = (): UiWorkspaceLike | undefined => getOptionalService<UiWorkspaceLike>('uiWorkspace');

  // 1. Register natively as a conversation view tab right beside Chat / Trace (`对话` / `轨迹`)
  ctx.slots.inject('conversation.view', () =>
    ctx.slots.register(
      {
        name: 'conversation.view',
        id: 'chronobranch',
        order: 20,
        label: (() => getChronoMessages(localeStore.readCurrent()).tabLabel) as unknown as string,
        inject: () => ({
          sessionsApi: ctx.sessions,
          workspacesApi: getOptionalService<IWorkspaces>('workspaces'),
          uiConversationApi: getOptionalService<UiConversationLike>('uiConversation'),
          getUiWorkspace,
          metaStore,
          tileStore,
          dockStore,
          localeStore,
          shortcutBridge,
          snapshotCache,
        }),
      },
      ChronoConversationView,
    ),
  );

  // 2. Register a slim branch/target dock directly above DSH's ONE native bottom composer
  ctx.slots.inject('conversation.input.dock', () =>
    ctx.slots.register(
      {
        name: 'conversation.input.dock',
        id: 'chronobranch-branch-dock',
        order: 5,
        inject: () => ({
          dockStore,
          localeStore,
          sessionsApi: ctx.sessions,
          getUiWorkspace,
        }),
      },
      ChronoComposerDock as never,
    ),
  );

  // 3. Mount DSH-native Magnetic Tiles into root `shell.overlay` so tiles are 100% part of DSH
  //    and stay floating across tab switches and session switches!
  ctx.slots.inject('shell.overlay', () =>
    ctx.slots.register(
      {
        name: 'shell.overlay',
        id: 'chronobranch-tiles',
        order: 40,
        inject: () => ({
          tileStore,
          localeStore,
          sessionsApi: ctx.sessions,
          getUiWorkspace,
        }),
      },
      TileOverlay,
    ),
  );

  // 4. Register all timeline shortcuts directly into DSH's built-in `ctx.shortcuts` service
  //    so they appear and can be customized right inside DSH's native Settings -> Shortcuts page!
  //    Defer registration by one macrotask so all required DSH core plugins (`ui-layout`, `ui-sidebar`, etc.)
  //    always claim their built-in defaults first and can never fail boot due to a third-party shortcut conflict.
  try {
    (ctx as unknown as { inject?: (deps: string[], fn: (sub: ClientContext) => void) => void }).inject?.(
      ['shortcuts'],
      (sCtx) => {
        sCtx.effect(() => {
          const shortcutsSvc = (sCtx as unknown as { get?: (k: string) => unknown }).get?.('shortcuts') as
            | Shortcuts
            | undefined;
          if (!shortcutsSvc || typeof shortcutsSvc.register !== 'function') return () => {};
          let disposed = false;
          let detach: (() => void) | null = null;
          const timer = window.setTimeout(() => {
            if (disposed) return;
            detach = shortcutBridge.attach(shortcutsSvc, () => localeStore.readCurrent());
          }, 0);
          return () => {
            disposed = true;
            window.clearTimeout(timer);
            detach?.();
          };
        }, 'dsh-chronobranch:shortcuts');
      },
    );
  } catch (err) {
    console.warn('[dsh-chronobranch] Unable to attach to native shortcuts service:', err);
  }
}
