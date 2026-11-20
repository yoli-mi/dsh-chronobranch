import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode, type WheelEvent as ReactWheelEvent } from 'react';
import { AssistantContentBody } from './AssistantContent';
import { getChronoMessages, type ChronoLocale } from './i18n';
import {
  IconCheck,
  IconClose,
  IconCollapse,
  IconExpand,
  IconEyeOff,
  IconFit,
  IconFold,
  IconFork,
  IconLinear,
  IconLink,
  IconMagnet,
  IconMerge,
  IconMicroAxis,
  IconPin,
  IconSearch,
  IconSend,
  IconStop,
  IconSubagent,
  IconUnlink,
  IconZoomL1,
  IconZoomL2,
  IconZoomL3,
  StepKindIcon,
} from './icons';
import {
  computeChronoLayout,
  DEFAULT_EXPANDED_H,
  DEFAULT_EXPANDED_W,
  getTrackNodes,
  getZoomTier,
  gutterElbowPath,
  MAX_SHEET_H,
  MAX_SHEET_W,
  MIN_SHEET_H,
  MIN_SHEET_W,
  type ChronoLayout,
  type NodeCustomSize,
} from './layout';
import { ChronoMarkdown } from './markdown';
import {
  DEFAULT_SHORTCUTS,
  formatShortcutLabel,
  normalizeShortcutKey,
  type ChronoActions,
  type ChronoGraph,
  type ChronoNode,
  type ChronoTrack,
  type MergeLink,
  type MicroStep,
  type ShortcutAction,
  type ShortcutBindings,
  type WorkspaceSessionOption,
} from './types';

export interface ChronoCanvasProps {
  readonly graph: ChronoGraph;
  readonly actions: ChronoActions;
  /** Live theme synced directly from host (DSH `data-ds-dark-theme`). */
  readonly theme?: 'light' | 'dark';
  /** Active UI locale synced from DSH (`zh` or `en`). */
  readonly locale?: ChronoLocale;
  /** When true, strictly share DSH's single unified native bottom composer (never render a second input box). */
  readonly useNativeComposer?: boolean;
  /** User-configurable keyboard shortcut display map (synced from DSH native Settings -> 快捷键). */
  readonly shortcuts?: ShortcutBindings;
  /** True when DSH's native `ctx.shortcuts` owns key dispatch for the 7 timeline actions. */
  readonly managedShortcuts?: boolean;
  /** Register live action dispatcher for DSH's native `ctx.shortcuts` service. */
  readonly onRegisterShortcutHandler?: (handler: ((action: ShortcutAction) => void) | null) => void;
  /** Set of node IDs currently pinned as native DSH magnetic tiles (`shell.overlay`). */
  readonly pinnedTileNodeIds?: ReadonlySet<string>;
  /** Toggle a node in DSH's root-level magnetic tile pinboard. */
  readonly onToggleTile?: (
    node: ChronoNode,
    trackTitle: string,
    trackColor: string,
  ) => 'pinned' | 'unpinned';
  /** Pending locate/jump request triggered from a magnetic tile. */
  readonly focusRequest?: { readonly sessionId: string; readonly nodeId: string; readonly seq: number } | null;
  readonly onFocusConsumed?: (seq: number) => void;
  /** Current workspace display name (for the workspace timeline linking modal). */
  readonly workspaceName?: string;
  /** All conversations under the current workspace eligible for timeline linking. */
  readonly workspaceSessions?: readonly WorkspaceSessionOption[];
}

interface InspectorState {
  readonly kind: 'step' | 'merge';
  readonly node?: ChronoNode;
  readonly step?: MicroStep;
  readonly merge?: MergeLink;
}

function resolveTrackStroke(track: ChronoTrack, theme: 'light' | 'dark'): string {
  if (theme === 'dark' && track.color === '#27272a') return '#d4d4d8';
  return track.color;
}

interface SavedCanvasViewState {
  pan: { x: number; y: number };
  zoom: number;
  expandedNodeIds: string[];
  microOpenNodeIds: string[];
  nodeSizes: Record<string, NodeCustomSize>;
}

const canvasViewCache = new Map<string, SavedCanvasViewState>();

export function ChronoCanvas({
  graph,
  actions,
  theme = 'light',
  locale = 'zh',
  useNativeComposer = false,
  shortcuts: hostShortcuts,
  managedShortcuts = false,
  onRegisterShortcutHandler,
  pinnedTileNodeIds,
  onToggleTile,
  focusRequest,
  onFocusConsumed,
  workspaceName,
  workspaceSessions,
}: ChronoCanvasProps) {
  const msg = getChronoMessages(locale);
  const tipWithKey = (label: string, binding: string | undefined) =>
    binding ? `${label} (${formatShortcutLabel(binding)})` : label;
  const savedView = canvasViewCache.get(graph.rootTrackId);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTrackId, setActiveTrackId] = useState<string>(graph.activeTrackId || graph.rootTrackId);
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(
    () => new Set(savedView?.expandedNodeIds ?? []),
  );
  const [microOpenNodeIds, setMicroOpenNodeIds] = useState<Set<string>>(
    () => new Set(savedView?.microOpenNodeIds ?? []),
  );
  const activeShortcuts = hostShortcuts ?? DEFAULT_SHORTCUTS;

  const [pendingForkNodeId, setPendingForkNodeId] = useState<string | null>(null);
  const [forkingNodeId, setForkingNodeId] = useState<string | null>(null);
  const [showSubagents, setShowSubagents] = useState(true);
  const [hideDeadEnds, setHideDeadEnds] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkSearch, setLinkSearch] = useState('');

  const [pan, setPan] = useState(() => savedView?.pan ?? { x: 32, y: 88 });
  const [zoom, setZoom] = useState(() => savedView?.zoom ?? 0.92);
  const [isPanning, setIsPanning] = useState(false);
  const [nodeSizes, setNodeSizes] = useState<Record<string, NodeCustomSize>>(() => savedView?.nodeSizes ?? {});
  const [resizingNodeId, setResizingNodeId] = useState<string | null>(null);

  const [composerText, setComposerText] = useState('');
  const [sending, setSending] = useState(false);
  const [inspector, setInspector] = useState<InspectorState | null>(null);
  const [cherryTrackId, setCherryTrackId] = useState<string | null>(null);
  const [cherrySummary, setCherrySummary] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const panOriginRef = useRef({ x: 0, y: 0 });
  const resizeStateRef = useRef<{
    nodeId: string;
    dir: 'e' | 's' | 'se';
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    zoom: number;
  } | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  // Persist camera pan/zoom & open cards per linked timeline group so switching active track feels seamless
  useEffect(() => {
    canvasViewCache.set(graph.rootTrackId, {
      pan,
      zoom,
      expandedNodeIds: Array.from(expandedNodeIds),
      microOpenNodeIds: Array.from(microOpenNodeIds),
      nodeSizes,
    });
  }, [graph.rootTrackId, pan, zoom, expandedNodeIds, microOpenNodeIds, nodeSizes]);

  const selectTrackTarget = useCallback(
    (trackId: string, opts?: { readonly keepNodeId?: string }) => {
      const tr = graph.tracks[trackId];
      if (!tr || tr.kind === 'agent-subagent') return;
      const changed = trackId !== activeTrackId || trackId !== graph.activeTrackId;
      setActiveTrackId(trackId);
      setPendingForkNodeId(null);
      if (opts?.keepNodeId) {
        setSelectedNodeId(opts.keepNodeId);
      } else {
        const tNodes = getTrackNodes(graph, trackId);
        if (tNodes.length > 0) setSelectedNodeId(tNodes[tNodes.length - 1].id);
      }
      actions.onSelectTrack(trackId);
      if (changed) {
        showToast(msg.toastSwitchedTarget(tr.title));
      }
    },
    [graph, activeTrackId, actions, showToast, msg],
  );

  // Keep activeTrackId synced when external active session changes
  useEffect(() => {
    if (graph.activeTrackId && graph.tracks[graph.activeTrackId]) {
      setActiveTrackId(graph.activeTrackId);
      const tNodes = getTrackNodes(graph, graph.activeTrackId);
      if (tNodes.length > 0 && (!selectedNodeId || !graph.nodes[selectedNodeId])) {
        setSelectedNodeId(tNodes[tNodes.length - 1].id);
      }
    }
  }, [graph.activeTrackId, graph.tracks, graph.nodes, selectedNodeId]);

  const layout: ChronoLayout = useMemo(
    () =>
      computeChronoLayout(graph, {
        zoom,
        showSubagents,
        hideDeadEnds,
        expandedNodeIds,
        microOpenNodeIds,
        pendingForkNodeId,
        nodeCustomSizes: nodeSizes,
      }),
    [graph, zoom, showSubagents, hideDeadEnds, expandedNodeIds, microOpenNodeIds, pendingForkNodeId, nodeSizes],
  );

  const forkOriginIds = useMemo(() => {
    const set = new Set<string>();
    Object.values(graph.tracks).forEach((t) => {
      if (t.forkFromNodeId) set.add(t.forkFromNodeId);
    });
    if (pendingForkNodeId) set.add(pendingForkNodeId);
    return set;
  }, [graph.tracks, pendingForkNodeId]);

  const getViewportSize = useCallback(() => {
    const el = viewportRef.current;
    return {
      w: el ? el.clientWidth : window.innerWidth,
      h: el ? el.clientHeight : window.innerHeight,
    };
  }, []);

  const focusNode = useCallback(
    (nodeId: string) => {
      const r = layout.nodeRects[nodeId];
      if (!r) return;
      const { w, h } = getViewportSize();
      setPan({
        x: w * 0.45 - (r.x + r.w / 2) * zoom,
        y: h * 0.4 - r.axisY * zoom,
      });
    },
    [layout.nodeRects, zoom, getViewportSize],
  );

  // Fulfill locate/jump requests dispatched from a floating magnetic tile
  useEffect(() => {
    if (!focusRequest) return;
    const node = graph.nodes[focusRequest.nodeId];
    const rect = layout.nodeRects[focusRequest.nodeId];
    if (!node || !rect) return;
    setSelectedNodeId(node.id);
    setActiveTrackId(node.trackId);
    const { w, h } = getViewportSize();
    setPan({
      x: w * 0.42 - (rect.x + rect.w / 2) * zoom,
      y: h * 0.36 - rect.axisY * zoom,
    });
    showToast(msg.toastLocated(node.turnLabel, node.title));
    onFocusConsumed?.(focusRequest.seq);
  }, [focusRequest, graph.nodes, layout.nodeRects, zoom, getViewportSize, showToast, msg, onFocusConsumed]);

  const fitToView = useCallback(() => {
    const { w, h } = getViewportSize();
    const vw = w - 60;
    const vh = h - 220;
    const scaleX = vw / Math.max(400, layout.totalW - 140);
    const scaleY = vh / Math.max(300, layout.totalH - 120);
    setZoom(Math.max(0.4, Math.min(0.98, Math.min(scaleX, scaleY))));
    setPan({ x: 24, y: 82 });
  }, [layout.totalW, layout.totalH, getViewportSize]);

  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
    setSelectedNodeId(nodeId);
  }, []);

  const toggleMicro = useCallback(
    (nodeId: string) => {
      const node = graph.nodes[nodeId];
      if (!node || node.microSteps.length === 0) {
        showToast(msg.toastNoMicroSteps);
        return;
      }
      setMicroOpenNodeIds((prev) => {
        const next = new Set(prev);
        if (next.has(nodeId)) next.delete(nodeId);
        else next.add(nodeId);
        return next;
      });
      setSelectedNodeId(nodeId);
    },
    [graph.nodes, showToast, msg],
  );

  const startFork = useCallback(
    async (nodeId: string) => {
      const node = graph.nodes[nodeId];
      if (!node || forkingNodeId) return;
      if (node.placeholder) {
        actions.onSelectTrack(node.trackId);
        showToast(msg.toastLoadingBeforeFork);
        return;
      }
      if (node.forkStarter) {
        actions.onSelectTrack(node.trackId);
        const nativeInput = document.querySelector('[data-composer-seat] textarea') as HTMLTextAreaElement | null;
        nativeInput?.focus();
        showToast(msg.toastForkReadyFocus);
        return;
      }
      if (!graph.capabilities.canFork) {
        showToast(msg.toastForkUnsupported);
        return;
      }
      if (node.status === 'streaming') {
        showToast(msg.toastWaitForTurn);
        return;
      }
      setSelectedNodeId(nodeId);

      // Unified native composer mode: fork natively and hand focus to DSH's single bottom composer (ZERO second input box)
      if (useNativeComposer && actions.onForkNode) {
        setForkingNodeId(nodeId);
        try {
          const childId = await actions.onForkNode(node.trackId, node);
          if (childId) {
            setActiveTrackId(childId);
            showToast(msg.toastForkCreated(node.turnLabel));
          }
        } catch (err) {
          showToast(msg.toastForkFailed(err instanceof Error ? err.message : String(err)));
        } finally {
          setForkingNodeId(null);
        }
        return;
      }

      setPendingForkNodeId(nodeId);
      setTimeout(() => composerRef.current?.focus(), 0);
      showToast(msg.toastForkPending(node.turnLabel));
    },
    [graph.nodes, graph.capabilities.canFork, forkingNodeId, useNativeComposer, actions, showToast, msg],
  );

  const pinnedTileIdSet = pinnedTileNodeIds ?? new Set<string>();

  const toggleTile = useCallback(
    (nodeId: string) => {
      const node = graph.nodes[nodeId];
      if (!node) return;
      if (node.placeholder) {
        actions.onSelectTrack(node.trackId);
        showToast(msg.toastLoadingBeforeTile);
        return;
      }
      if (!onToggleTile) return;
      const track = graph.tracks[node.trackId];
      const result = onToggleTile(node, track?.title ?? 'DSH AGENT', track?.color ?? '#27272a');
      if (result === 'pinned') {
        showToast(msg.toastTilePinned(node.turnLabel));
      } else {
        showToast(msg.toastTileUnpinned(node.turnLabel));
      }
    },
    [graph.nodes, graph.tracks, actions, onToggleTile, showToast, msg],
  );

  const openCherryModal = useCallback(
    (trackId: string) => {
      const tr = graph.tracks[trackId];
      if (!tr) return;
      const tNodes = getTrackNodes(graph, trackId);
      const last = tNodes[tNodes.length - 1];
      setCherryTrackId(trackId);
      setCherrySummary(
        msg.cherryDefaultSummary(
          tr.title,
          last ? last.aiSummary || last.aiFullText.slice(0, 260) : msg.cherryFallbackExcerpt,
        ),
      );
    },
    [graph, msg],
  );

  const handleConfirmCherryPick = useCallback(async () => {
    if (!cherryTrackId || !cherrySummary.trim()) return;
    const tNodes = getTrackNodes(graph, cherryTrackId);
    const last = tNodes[tNodes.length - 1];
    if (!last) return;
    const targetTrackId = graph.tracks[cherryTrackId]?.parentTrackId ?? graph.rootTrackId;
    try {
      await actions.onCherryPickMerge({
        sourceTrackId: cherryTrackId,
        sourceNodeId: last.id,
        targetTrackId,
        summary: cherrySummary.trim(),
      });
      actions.onSetTrackMeta(cherryTrackId, { status: 'adopted' });
      setCherryTrackId(null);
      setActiveTrackId(targetTrackId);
      showToast(msg.toastMerged);
    } catch (err) {
      showToast(msg.toastMergeFailed(err instanceof Error ? err.message : String(err)));
    }
  }, [cherryTrackId, cherrySummary, graph, actions, showToast, msg]);

  const handleSend = useCallback(async () => {
    const text = composerText.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      if (pendingForkNodeId) {
        const parentNode = graph.nodes[pendingForkNodeId];
        if (parentNode) {
          const childTrackId = await actions.onForkAndSend(parentNode.trackId, parentNode, text);
          setPendingForkNodeId(null);
          setComposerText('');
          if (childTrackId) {
            setActiveTrackId(childTrackId);
            showToast(msg.toastForkSent);
          }
        }
      } else {
        const targetTrack = graph.tracks[activeTrackId] ? activeTrackId : graph.rootTrackId;
        await actions.onSend(targetTrack, text);
        setComposerText('');
      }
    } catch (err) {
      showToast(msg.toastSendFailed(err instanceof Error ? err.message : String(err)));
    } finally {
      setSending(false);
    }
  }, [composerText, sending, pendingForkNodeId, graph, actions, activeTrackId, showToast, msg]);

  const dispatchShortcutAction = useCallback(
    (action: ShortcutAction) => {
      switch (action) {
        case 'toggleMicro':
          if (selectedNodeId) toggleMicro(selectedNodeId);
          break;
        case 'forkNode':
          if (selectedNodeId) void startFork(selectedNodeId);
          break;
        case 'pinTile':
          if (selectedNodeId) toggleTile(selectedNodeId);
          break;
        case 'toggleExpand':
          if (selectedNodeId) toggleExpand(selectedNodeId);
          break;
        case 'zoomL1':
          setZoom(0.48);
          break;
        case 'zoomL2':
          setZoom(0.92);
          break;
        case 'zoomL3':
          setZoom(1.12);
          if (selectedNodeId) setExpandedNodeIds((prev) => new Set(prev).add(selectedNodeId));
          break;
      }
    },
    [selectedNodeId, toggleMicro, startFork, toggleTile, toggleExpand],
  );

  // Register live action handler with DSH's native `ctx.shortcuts` bridge while timeline is mounted
  useEffect(() => {
    if (!onRegisterShortcutHandler) return;
    onRegisterShortcutHandler(dispatchShortcutAction);
    return () => {
      onRegisterShortcutHandler(null);
    };
  }, [onRegisterShortcutHandler, dispatchShortcutAction]);

  // Canvas keyboard navigation (arrows + Esc) and fallback local shortcuts when not managed by `ctx.shortcuts`
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (linkModalOpen) {
          setLinkModalOpen(false);
          return;
        }
        if (inspector) {
          setInspector(null);
          return;
        }
        if (cherryTrackId) {
          setCherryTrackId(null);
          return;
        }
        if (pendingForkNodeId) {
          setPendingForkNodeId(null);
          return;
        }
        return;
      }

      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (!managedShortcuts) {
        const pressed = normalizeShortcutKey(e);
        if (pressed && activeShortcuts.toggleMicro && pressed === activeShortcuts.toggleMicro) {
          e.preventDefault();
          dispatchShortcutAction('toggleMicro');
          return;
        } else if (pressed && activeShortcuts.forkNode && pressed === activeShortcuts.forkNode) {
          e.preventDefault();
          dispatchShortcutAction('forkNode');
          return;
        } else if (pressed && activeShortcuts.pinTile && pressed === activeShortcuts.pinTile) {
          e.preventDefault();
          dispatchShortcutAction('pinTile');
          return;
        } else if (
          (pressed && activeShortcuts.toggleExpand && pressed === activeShortcuts.toggleExpand) ||
          (activeShortcuts.toggleExpand === 'Enter' && e.key === ' ')
        ) {
          e.preventDefault();
          dispatchShortcutAction('toggleExpand');
          return;
        } else if (pressed && activeShortcuts.zoomL1 && pressed === activeShortcuts.zoomL1) {
          dispatchShortcutAction('zoomL1');
          return;
        } else if (pressed && activeShortcuts.zoomL2 && pressed === activeShortcuts.zoomL2) {
          dispatchShortcutAction('zoomL2');
          return;
        } else if (pressed && activeShortcuts.zoomL3 && pressed === activeShortcuts.zoomL3) {
          dispatchShortcutAction('zoomL3');
          return;
        }
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (!selectedNodeId) return;
        const cur = graph.nodes[selectedNodeId];
        if (!cur) return;
        const tNodes = getTrackNodes(graph, cur.trackId);
        const idx = tNodes.findIndex((n) => n.id === cur.id);
        const next = tNodes[e.key === 'ArrowRight' ? idx + 1 : idx - 1];
        if (next) {
          e.preventDefault();
          setSelectedNodeId(next.id);
          focusNode(next.id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const visibleTracks = layout.orderedTracks.filter((t) => !t.collapsed);
        const curTrackId = (selectedNodeId && graph.nodes[selectedNodeId]?.trackId) || activeTrackId;
        const idx = visibleTracks.findIndex((t) => t.id === curTrackId);
        const nextTrack = visibleTracks[e.key === 'ArrowDown' ? idx + 1 : idx - 1];
        if (nextTrack) {
          const tNodes = getTrackNodes(graph, nextTrack.id);
          if (tNodes.length > 0) {
            e.preventDefault();
            const target = tNodes[tNodes.length - 1];
            setSelectedNodeId(target.id);
            if (nextTrack.kind !== 'agent-subagent') {
              setActiveTrackId(nextTrack.id);
              actions.onSelectTrack(nextTrack.id);
            }
            focusNode(target.id);
          }
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    managedShortcuts,
    activeShortcuts,
    dispatchShortcutAction,
    linkModalOpen,
    inspector,
    cherryTrackId,
    pendingForkNodeId,
    selectedNodeId,
    graph,
    layout.orderedTracks,
    activeTrackId,
    focusNode,
    actions,
  ]);

  // Panning handlers
  const handleViewportMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('.cb-node') ||
      target.closest('.cb-track-header') ||
      target.closest('.cb-collapsed-pill') ||
      target.closest('.cb-merge-pill')
    ) {
      return;
    }
    setIsPanning(true);
    panOriginRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  useEffect(() => {
    if (!isPanning) return;
    const onMove = (e: MouseEvent) => {
      setPan({ x: e.clientX - panOriginRef.current.x, y: e.clientY - panOriginRef.current.y });
    };
    const onUp = () => setIsPanning(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isPanning]);

  // Interactive drag-resize for expanded dialog sheets (timeline auto-reflows live)
  const startSheetResize = useCallback(
    (e: ReactMouseEvent, nodeId: string, dir: 'e' | 's' | 'se') => {
      e.stopPropagation();
      e.preventDefault();
      const sheetEl = (e.currentTarget as HTMLElement).closest('.cb-sheet') as HTMLElement | null;
      const curSize = nodeSizes[nodeId];
      const measuredW = sheetEl ? sheetEl.offsetWidth : DEFAULT_EXPANDED_W;
      const measuredH = sheetEl ? sheetEl.offsetHeight : DEFAULT_EXPANDED_H;
      resizeStateRef.current = {
        nodeId,
        dir,
        startX: e.clientX,
        startY: e.clientY,
        startW: curSize?.width ?? measuredW,
        startH: curSize?.height ?? measuredH,
        zoom,
      };
      setResizingNodeId(nodeId);
    },
    [nodeSizes, zoom],
  );

  const resetSheetSize = useCallback((nodeId: string) => {
    setNodeSizes((prev) => {
      if (!prev[nodeId]) return prev;
      const next = { ...prev };
      delete next[nodeId];
      return next;
    });
  }, []);

  useEffect(() => {
    if (!resizingNodeId) return;
    const onMove = (e: MouseEvent) => {
      const st = resizeStateRef.current;
      if (!st) return;
      const dx = (e.clientX - st.startX) / st.zoom;
      const dy = (e.clientY - st.startY) / st.zoom;
      setNodeSizes((prev) => {
        const existing = prev[st.nodeId] ?? {};
        const nextW =
          st.dir === 'e' || st.dir === 'se'
            ? Math.max(MIN_SHEET_W, Math.min(MAX_SHEET_W, Math.round(st.startW + dx)))
            : existing.width;
        const nextH =
          st.dir === 's' || st.dir === 'se'
            ? Math.max(MIN_SHEET_H, Math.min(MAX_SHEET_H, Math.round(st.startH + dy)))
            : existing.height;
        return {
          ...prev,
          [st.nodeId]: { width: nextW, height: nextH },
        };
      });
    };
    const onUp = () => {
      resizeStateRef.current = null;
      setResizingNodeId(null);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [resizingNodeId]);

  const handleWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.cb-sheet-body') || target.closest('.cb-micro-dotline')) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.09 : 0.92;
    const nextZoom = Math.max(0.36, Math.min(1.35, zoom * factor));
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setPan((prev) => ({
      x: mx - ((mx - prev.x) / zoom) * nextZoom,
      y: my - ((my - prev.y) / zoom) * nextZoom,
    }));
    setZoom(nextZoom);
  };

  const tier = getZoomTier(zoom);
  const activeTrack = graph.tracks[activeTrackId] ?? graph.tracks[graph.rootTrackId];
  const activeTrackNodes = activeTrack ? getTrackNodes(graph, activeTrack.id) : [];
  const activeTail = activeTrackNodes[activeTrackNodes.length - 1];
  const pendingForkNode = pendingForkNodeId ? graph.nodes[pendingForkNodeId] : null;
  const q = searchQuery.trim().toLowerCase();

  // Compute SVG edge paths + merge badges
  const { edgeElements, mergeBadges } = useMemo(() => {
    const edges: ReactNode[] = [];
    const badges: Array<{ id: string; x: number; y: number; label: string; link: MergeLink }> = [];

    layout.orderedTracks.forEach((t) => {
      const tRect = layout.trackRects[t.id];
      if (!tRect) return;
      const stroke = resolveTrackStroke(t, theme);

      if (t.collapsed) {
        const parentRect = t.forkFromNodeId ? layout.nodeRects[t.forkFromNodeId] : undefined;
        if (parentRect) {
          const gx = layout.colRightGutter[parentRect.col] ?? parentRect.dotX + 240;
          const d = gutterElbowPath(parentRect.dotX, parentRect.axisY, gx + 48, tRect.axisY, gx);
          edges.push(
            <path
              key={`col-fork-${t.id}`}
              className="cb-edge"
              d={d}
              stroke="#a1a1aa"
              strokeWidth={1.25}
              strokeDasharray="3 4"
              opacity={0.65}
            />,
            <path
              key={`col-line-${t.id}`}
              className="cb-edge"
              d={`M ${gx + 48} ${tRect.axisY} L ${layout.totalW - 200} ${tRect.axisY}`}
              stroke="#a1a1aa"
              strokeWidth={1.15}
              strokeDasharray="2 6"
              opacity={0.4}
            />,
          );
        }
        return;
      }

      const tNodes = getTrackNodes(graph, t.id);
      const isSub = t.kind === 'agent-subagent';

      if (t.id === graph.rootTrackId && tNodes.length > 0) {
        const first = layout.nodeRects[tNodes[0].id];
        if (first) {
          edges.push(
            <path
              key={`lead-${t.id}`}
              className="cb-edge"
              d={`M ${tRect.x + tRect.w} ${first.axisY} L ${first.dotX} ${first.axisY}`}
              stroke={stroke}
              strokeWidth={1.5}
              opacity={0.32}
            />,
          );
        }
      }

      if (t.forkFromNodeId && layout.nodeRects[t.forkFromNodeId] && tNodes.length > 0) {
        const p = layout.nodeRects[t.forkFromNodeId];
        const first = layout.nodeRects[tNodes[0].id];
        if (first) {
          const gx = (layout.colRightGutter[p.col] ?? p.dotX + 240) + (isSub ? -8 : 6);
          const d = gutterElbowPath(p.dotX, p.axisY, first.dotX, first.axisY, gx);
          edges.push(
            <path
              key={`fork-${t.id}`}
              className={`cb-edge ${isSub ? 'cb-edge-subagent' : ''}`}
              d={d}
              stroke={stroke}
              strokeWidth={isSub ? 1.4 : 1.65}
              opacity={t.status === 'dead-end' ? 0.48 : isSub ? 0.62 : 0.78}
            />,
          );
        }
      }

      for (let i = 0; i < tNodes.length - 1; i++) {
        const a = layout.nodeRects[tNodes[i].id];
        const b = layout.nodeRects[tNodes[i + 1].id];
        if (!a || !b) continue;
        const streaming = tNodes[i + 1].status === 'streaming';
        edges.push(
          <path
            key={`seg-${tNodes[i].id}-${tNodes[i + 1].id}`}
            className={`cb-edge ${streaming ? 'cb-edge-streaming' : isSub ? 'cb-edge-subagent' : ''}`}
            d={`M ${a.dotX} ${a.axisY} L ${b.dotX} ${b.axisY}`}
            stroke={stroke}
            strokeWidth={isSub ? 1.4 : 1.65}
            opacity={t.status === 'dead-end' ? 0.5 : 0.78}
          />,
        );
      }

      if (isSub && t.convergeToNodeId && layout.nodeRects[t.convergeToNodeId] && tNodes.length > 0) {
        const last = layout.nodeRects[tNodes[tNodes.length - 1].id];
        const target = layout.nodeRects[t.convergeToNodeId];
        if (last && target) {
          const gx = layout.colRightGutter[last.col] ?? last.dotX + 240;
          edges.push(
            <path
              key={`conv-${t.id}`}
              className="cb-edge cb-edge-subagent"
              d={gutterElbowPath(last.dotX, last.axisY, target.dotX, target.axisY, gx)}
              stroke={stroke}
              strokeWidth={1.4}
              opacity={0.58}
            />,
          );
        }
      }
    });

    if (layout.ghostRect && layout.nodeRects[layout.ghostRect.parentId]) {
      const p = layout.nodeRects[layout.ghostRect.parentId];
      const gx = (layout.colRightGutter[p.col] ?? p.dotX + 240) + 12;
      edges.push(
        <path
          key="ghost-fork"
          className="cb-edge cb-edge-streaming"
          d={gutterElbowPath(p.dotX, p.axisY, layout.ghostRect.dotX, layout.ghostRect.axisY, gx)}
          stroke="#059669"
          strokeWidth={1.65}
          opacity={0.9}
        />,
      );
    }

    graph.mergeLinks.forEach((ml) => {
      const src = layout.nodeRects[ml.sourceNodeId];
      const dst = layout.nodeRects[ml.targetNodeId];
      if (!src || !dst) return;
      const gx = layout.colRightGutter[src.col] ?? (src.dotX + dst.dotX) / 2;
      edges.push(
        <path
          key={`merge-${ml.id}`}
          className="cb-edge cb-edge-cherry"
          d={gutterElbowPath(src.dotX, src.axisY, dst.dotX, dst.axisY, gx)}
          stroke="var(--cb-line-merge)"
          strokeWidth={1.5}
          opacity={0.72}
        />,
      );
      badges.push({
        id: ml.id,
        x: gx,
        y: (src.axisY + dst.axisY) / 2,
        label: ml.label || msg.cherryMergePill,
        link: ml,
      });
    });

    return { edgeElements: edges, mergeBadges: badges };
  }, [layout, graph, theme, msg.cherryMergePill]);

  return (
    <div
      data-conversation-composer-overlay="true"
      data-chronobranch-view="true"
      data-chronobranch-session={graph.activeTrackId}
      className={`cb-root ${theme === 'dark' ? 'cb-theme-dark' : ''} ${resizingNodeId ? 'cb-resizing' : ''}`}
    >
      {/* ==================== TOP FLOATING HUD ==================== */}
      <header className="cb-hud-top">
        <div className="cb-hud-group">
          {actions.onClose && (
            <>
              <button className="cb-btn-mode" onClick={actions.onClose} title={msg.linearChatTip}>
                <IconLinear />
                <span>{msg.linearChat}</span>
              </button>
              <div className="cb-divider" />
            </>
          )}
          <button
            className={`cb-hud-btn ${tier === 'l1' ? 'cb-active' : ''}`}
            onClick={() => setZoom(0.48)}
            title={tipWithKey(msg.zoomL1Tip, activeShortcuts.zoomL1)}
          >
            <IconZoomL1 />
            <span>{msg.zoomL1}</span>
          </button>
          <button
            className={`cb-hud-btn ${tier === 'l2' ? 'cb-active' : ''}`}
            onClick={() => setZoom(0.92)}
            title={tipWithKey(msg.zoomL2Tip, activeShortcuts.zoomL2)}
          >
            <IconZoomL2 />
            <span>{msg.zoomL2}</span>
          </button>
          <button
            className={`cb-hud-btn ${tier === 'l3' ? 'cb-active' : ''}`}
            onClick={() => {
              setZoom(1.12);
              if (selectedNodeId) setExpandedNodeIds((prev) => new Set(prev).add(selectedNodeId));
            }}
            title={tipWithKey(msg.zoomL3Tip, activeShortcuts.zoomL3)}
          >
            <IconZoomL3 />
            <span>{msg.zoomL3}</span>
          </button>
          <span className="cb-zoom-pill">{Math.round(zoom * 100)}%</span>
          <button className="cb-hud-btn" onClick={fitToView} title={msg.fitViewTip}>
            <IconFit />
          </button>
        </div>

        <div className="cb-hud-group">
          <div className="cb-search-box">
            <IconSearch />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={msg.searchPlaceholder}
            />
          </div>
          {workspaceSessions && actions.onLinkSession && (
            <>
              <div className="cb-divider" />
              <button
                className={`cb-hud-btn ${
                  workspaceSessions.filter((s) => s.linkKind === 'manual' || s.linkKind === 'fork').length > 0
                    ? 'cb-active'
                    : ''
                }`}
                onClick={() => {
                  setLinkSearch('');
                  setLinkModalOpen(true);
                }}
                title={msg.linkChatsTip}
              >
                <IconLink />
                <span>
                  {msg.linkChats}
                  {workspaceSessions.filter((s) => s.linkKind !== 'none').length > 1
                    ? ` · ${workspaceSessions.filter((s) => s.linkKind !== 'none').length}`
                    : ''}
                </span>
              </button>
            </>
          )}
          <div className="cb-divider" />
          <button
            className={`cb-hud-btn ${showSubagents ? 'cb-active' : ''}`}
            onClick={() => setShowSubagents((v) => !v)}
            title={msg.subagentsTip}
          >
            <IconSubagent />
            <span>{msg.subagents}</span>
          </button>
          <button
            className={`cb-hud-btn ${hideDeadEnds ? 'cb-active' : ''}`}
            onClick={() => setHideDeadEnds((v) => !v)}
            title={msg.hideDeadEndsTip}
          >
            <IconEyeOff />
            <span>{msg.hideDeadEnds}</span>
          </button>
        </div>
      </header>

      {/* ==================== CANVAS VIEWPORT ==================== */}
      <div
        ref={viewportRef}
        className={`cb-viewport cb-zoom-${tier} ${isPanning ? 'cb-panning' : ''}`}
        onMouseDown={handleViewportMouseDown}
        onWheel={handleWheel}
      >
        <div
          className="cb-world"
          style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})` }}
        >
          {/* SVG Dot-to-Dot Edges */}
          <svg className="cb-edges-svg" width={layout.totalW} height={layout.totalH}>
            {edgeElements}
          </svg>

          {/* Clickable Merge Badges */}
          {mergeBadges.map((b) => (
            <button
              key={b.id}
              className="cb-merge-pill"
              style={{ left: b.x, top: b.y }}
              onClick={(e) => {
                e.stopPropagation();
                setInspector({ kind: 'merge', merge: b.link });
              }}
            >
              <span style={{ display: 'inline-flex', color: 'var(--cb-line-merge)' }}>
                <IconMerge />
              </span>
              <span>{b.label}</span>
            </button>
          ))}

          {/* Track Headers & Collapsed Pills */}
          {layout.orderedTracks.map((t) => {
            const r = layout.trackRects[t.id];
            if (!r) return null;
            const color = resolveTrackStroke(t, theme);
            const tNodes = getTrackNodes(graph, t.id);

            if (t.collapsed) {
              const parentRect = t.forkFromNodeId ? layout.nodeRects[t.forkFromNodeId] : undefined;
              const gx = parentRect ? (layout.colRightGutter[parentRect.col] ?? 300) + 56 : 280;
              return (
                <button
                  key={`th-${t.id}`}
                  className="cb-collapsed-pill"
                  style={{ transform: `translate3d(${gx}px, ${r.axisY - 12}px, 0)` }}
                  onClick={() => actions.onSetTrackMeta(t.id, { collapsed: false })}
                >
                  <span className="cb-dot" style={{ background: '#a1a1aa' }} />
                  <span>{msg.collapsedTrack(t.title, tNodes.length)}</span>
                </button>
              );
            }

            const isActive = activeTrackId === t.id && !pendingForkNodeId;
            return (
              <div
                key={`th-${t.id}`}
                className={`cb-track-header ${isActive ? 'cb-active-track' : ''}`}
                style={
                  {
                    '--cb-track-color': color,
                    transform: `translate3d(${r.x}px, ${r.axisY - 22}px, 0)`,
                  } as CSSProperties
                }
                onClick={() => {
                  if (t.kind === 'agent-subagent') {
                    actions.onSelectTrack(t.id);
                    if (tNodes.length > 0) setSelectedNodeId(tNodes[tNodes.length - 1].id);
                    return;
                  }
                  selectTrackTarget(t.id);
                }}
              >
                <div className="cb-track-title" title={t.title}>
                  {t.title}
                </div>
                <div className="cb-track-meta">
                  <span className={`cb-tag ${t.status === 'adopted' ? 'cb-tag-adopted' : ''}`}>
                    {t.kind === 'main'
                      ? msg.trackMain
                      : t.kind === 'linked-peer'
                        ? msg.trackLinked
                        : t.kind === 'agent-subagent'
                          ? msg.trackSubagent
                          : t.status === 'adopted'
                            ? msg.trackAdopted
                            : t.status === 'dead-end'
                              ? msg.trackDeadEnd
                              : msg.trackBranch}
                  </span>
                  {t.hasMore && graph.capabilities.canLoadOlder && (
                    <button
                      className="cb-track-mini-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        void actions.onLoadOlder(t.id);
                      }}
                    >
                      {t.loadingOlder ? msg.loading : msg.loadOlder}
                    </button>
                  )}
                  {t.kind === 'linked-peer' && actions.onUnlinkSession && (
                    <button
                      className="cb-track-mini-btn"
                      title={msg.unlinkTip}
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.onUnlinkSession?.(t.id);
                        showToast(msg.toastUnlinked(t.title));
                      }}
                    >
                      <IconUnlink />
                      <span>{msg.unlink}</span>
                    </button>
                  )}
                  {t.kind === 'human-branch' && (
                    <>
                      <button
                        className="cb-track-mini-btn"
                        title={msg.cherryPickTip}
                        onClick={(e) => {
                          e.stopPropagation();
                          openCherryModal(t.id);
                        }}
                      >
                        <IconMerge />
                        <span>{msg.cherryPick}</span>
                      </button>
                      <button
                        className="cb-track-mini-btn"
                        title={msg.foldTip}
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.onSetTrackMeta(t.id, { status: 'dead-end', collapsed: true });
                          if (activeTrackId === t.id) setActiveTrackId(graph.rootTrackId);
                        }}
                      >
                        <IconFold />
                        <span>{msg.fold}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Dot-and-Line Nodes */}
          {layout.orderedTracks.map((t) => {
            if (t.collapsed) return null;
            const color = resolveTrackStroke(t, theme);
            const isSub = t.kind === 'agent-subagent';

            return getTrackNodes(graph, t.id).map((n) => {
              const r = layout.nodeRects[n.id];
              if (!r) return null;

              const isSelected = selectedNodeId === n.id;
              const isExpanded = expandedNodeIds.has(n.id);
              const isMicroOpen = microOpenNodeIds.has(n.id) && n.microSteps.length > 0;
              const isTilePinned = pinnedTileIdSet.has(n.id);
              const isForkOrigin = forkOriginIds.has(n.id);

              let searchCls = '';
              if (q) {
                const hay = `${n.title} ${n.userText} ${n.aiSummary} ${n.aiFullText} ${n.codeSnippet ?? ''}`.toLowerCase();
                searchCls = hay.includes(q) ? 'cb-search-match' : 'cb-dimmed';
              }

              const microSubAxis = isMicroOpen ? (
                <div className="cb-micro-subaxis">
                  <div className="cb-micro-head">
                    <span>{msg.microAxisHead}</span>
                    <button
                      style={{ fontSize: 10.5, color: 'var(--cb-text-muted)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMicro(n.id);
                      }}
                    >
                      {msg.collapse}
                    </button>
                  </div>
                  <div className="cb-micro-dotline">
                    {n.microSteps.map((step, sIdx) => (
                      <button
                        key={step.id}
                        className={[
                          'cb-micro-node',
                          sIdx === 0 ? 'cb-micro-first' : '',
                          sIdx === n.microSteps.length - 1 ? 'cb-micro-last' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        title={`${step.title}${step.duration ? ` (${step.duration})` : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspector({ kind: 'step', node: n, step });
                        }}
                      >
                        <span className="cb-micro-dur">{step.duration || '\u00A0'}</span>
                        <span className="cb-micro-rail">
                          <span className={`cb-micro-dot cb-ms-${step.status}`} />
                        </span>
                        <span className="cb-micro-icon">
                          <StepKindIcon kind={step.kind} />
                        </span>
                        <span className="cb-micro-name">{step.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null;

              const sheetMicroTrigger =
                n.microSteps.length > 0 ? (
                  <button
                    className={`cb-micro-trigger ${isMicroOpen ? 'cb-open' : ''}`}
                    title={tipWithKey(msg.microAxisTip, activeShortcuts.toggleMicro)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMicro(n.id);
                    }}
                  >
                    <IconMicroAxis />
                    <span>{msg.microAxis}</span>
                  </button>
                ) : (
                  <span />
                );

              const actionStrip = n.forkStarter ? null : (
                <div className="cb-hover-actions">
                  {isExpanded && !n.placeholder && (
                    <button
                      className={`cb-act-btn ${isTilePinned ? 'cb-act-active' : ''}`}
                      title={tipWithKey(msg.tileTip, activeShortcuts.pinTile)}
                      onClick={(e) => {
                        e.stopPropagation();
                        void toggleTile(n.id);
                      }}
                    >
                      <IconMagnet size="xs" />
                      <span>{msg.tile}</span>
                    </button>
                  )}
                  <button
                    className="cb-act-btn"
                    title={tipWithKey(isExpanded ? msg.collapseTip : msg.expandTip, activeShortcuts.toggleExpand)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (n.placeholder) {
                        actions.onSelectTrack(n.trackId);
                        return;
                      }
                      toggleExpand(n.id);
                    }}
                  >
                    {isExpanded ? <IconCollapse /> : <IconExpand />}
                    <span>{isExpanded ? msg.collapse : msg.expand}</span>
                  </button>
                  {!isSub && !n.placeholder && graph.capabilities.canFork && (
                    <button
                      className="cb-act-btn"
                      disabled={forkingNodeId === n.id}
                      title={tipWithKey(msg.forkTip, activeShortcuts.forkNode)}
                      onClick={(e) => {
                        e.stopPropagation();
                        void startFork(n.id);
                      }}
                    >
                      <IconFork />
                      <span>{forkingNodeId === n.id ? msg.forking : msg.fork}</span>
                    </button>
                  )}
                </div>
              );

              return (
                <div
                  key={n.id}
                  className={[
                    'cb-node',
                    isSelected ? 'cb-selected' : '',
                    isExpanded ? 'cb-expanded' : '',
                    isTilePinned ? 'cb-tile-pinned' : '',
                    isSub ? 'cb-subagent' : '',
                    isForkOrigin ? 'cb-fork-origin' : '',
                    n.status === 'streaming' ? 'cb-streaming' : '',
                    searchCls,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={
                    {
                      '--cb-node-color': color,
                      width: r.w,
                      transform: `translate3d(${r.x}px, ${r.axisY}px, 0)`,
                    } as CSSProperties
                  }
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('button')) return;
                    if (e.shiftKey && !n.placeholder && !n.forkStarter) {
                      toggleTile(n.id);
                      return;
                    }
                    if (!isSub) {
                      selectTrackTarget(n.trackId, { keepNodeId: n.id });
                      if (n.forkStarter) {
                        const nativeInput = document.querySelector('[data-composer-seat] textarea') as HTMLTextAreaElement | null;
                        nativeInput?.focus();
                      }
                    } else {
                      setSelectedNodeId(n.id);
                      setPendingForkNodeId(null);
                    }
                  }}
                  onDoubleClick={(e) => {
                    if ((e.target as HTMLElement).closest('button')) return;
                    if (n.forkStarter) {
                      actions.onSelectTrack(n.trackId);
                      const nativeInput = document.querySelector('[data-composer-seat] textarea') as HTMLTextAreaElement | null;
                      nativeInput?.focus();
                      return;
                    }
                    if (n.placeholder) {
                      actions.onSelectTrack(n.trackId);
                      return;
                    }
                    toggleExpand(n.id);
                  }}
                >
                  <div className="cb-node-meta-top">
                    <span className="cb-meta-turn">{n.turnLabel}</span>
                    <span className="cb-meta-time">{n.timestamp}</span>
                    {n.pinned && (
                      <span className="cb-meta-tag" title={msg.pinImportantTip}>
                        <IconPin />
                      </span>
                    )}
                    {isTilePinned && (
                      <span className="cb-meta-tag cb-meta-tile" title={msg.pinnedTagTip}>
                        <IconMagnet size="xs" />
                        <span>{msg.pinnedTag}</span>
                      </span>
                    )}
                    {isForkOrigin && <span className="cb-meta-tag">{msg.forkOriginTag}</span>}
                  </div>

                  <div className="cb-dot-anchor" title={msg.dotTip}>
                    <span className="cb-dot-core" />
                  </div>

                  {isExpanded ? (
                    <div className="cb-sheet-stack">
                      <div
                        className={[
                          'cb-sheet',
                          r.sheetH !== undefined ? 'cb-sheet-resized' : '',
                          isMicroOpen ? 'cb-has-micro-below' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        style={r.sheetH !== undefined ? { height: r.sheetH } : undefined}
                      >
                        <div className="cb-sheet-head">
                          <div className="cb-sheet-title">{n.title}</div>
                          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                            <button
                              className="cb-act-btn"
                              title={msg.pinImportantTip}
                              onClick={(e) => {
                                e.stopPropagation();
                                actions.onTogglePin(n.id);
                              }}
                            >
                              <IconPin />
                            </button>
                          </div>
                        </div>

                        <div className="cb-sheet-body">
                          {n.mergedFrom && (
                            <div className="cb-merge-note" style={{ margin: 0 }}>
                              <IconMerge />
                              <span>{msg.mergedFrom(n.mergedFrom.trackTitle)}</span>
                            </div>
                          )}
                          <div className="cb-bubble cb-bubble-user">
                            <div className="cb-bubble-role">
                              <span>YOU</span>
                              <span>{n.timestamp}</span>
                            </div>
                            <ChronoMarkdown text={n.userText} locale={locale} />
                          </div>
                          <div className="cb-bubble cb-bubble-ai">
                            <div className="cb-bubble-role">
                              <span>{isSub ? 'SUBAGENT' : 'DSH AGENT'}</span>
                              <span>
                                {n.status === 'streaming'
                                  ? msg.streaming
                                  : n.stats.durationMs
                                    ? `${(n.stats.durationMs / 1000).toFixed(1)}s`
                                    : ''}
                              </span>
                            </div>
                            <AssistantContentBody node={n} locale={locale} />
                          </div>
                        </div>

                        <div className="cb-sheet-foot">
                          {sheetMicroTrigger}
                          {actionStrip}
                        </div>

                        {/* Interactive resize handles (timeline auto-reflows live) */}
                        <div
                          className="cb-resize-handle cb-resize-e"
                          title={msg.resizeETip}
                          onMouseDown={(e) => startSheetResize(e, n.id, 'e')}
                        />
                        <div
                          className="cb-resize-handle cb-resize-s"
                          title={msg.resizeSTip}
                          onMouseDown={(e) => startSheetResize(e, n.id, 's')}
                        />
                        <div
                          className="cb-resize-handle cb-resize-se"
                          title={msg.resizeSETip}
                          onMouseDown={(e) => startSheetResize(e, n.id, 'se')}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            resetSheetSize(n.id);
                          }}
                        />
                      </div>
                      {isMicroOpen && <div className="cb-micro-attached">{microSubAxis}</div>}
                    </div>
                  ) : (
                    <div className={`cb-editorial ${n.forkStarter ? 'cb-editorial-starter' : ''}`}>
                      {n.mergedFrom && (
                        <div className="cb-merge-note">
                          <IconMerge />
                          <span>{msg.mergedShort(n.mergedFrom.trackTitle)}</span>
                        </div>
                      )}
                      <div className="cb-title">{n.title}</div>
                      <div className="cb-summary">{n.aiSummary}</div>
                      {actionStrip && (
                        <div className="cb-inline-bar cb-inline-bar-clean">
                          {actionStrip}
                        </div>
                      )}
                      {microSubAxis}
                    </div>
                  )}
                </div>
              );
            });
          })}

          {/* Pending Fork Ghost Node */}
          {layout.ghostRect && pendingForkNode && (
            <div
              className="cb-node cb-streaming"
              style={
                {
                  '--cb-node-color': '#059669',
                  width: layout.ghostRect.w,
                  transform: `translate3d(${layout.ghostRect.x}px, ${layout.ghostRect.axisY}px, 0)`,
                } as React.CSSProperties
              }
            >
              <div className="cb-node-meta-top">
                <span className="cb-meta-turn" style={{ color: '#059669' }}>
                  NEW
                </span>
                <span className="cb-meta-time">{msg.pendingForkBadge}</span>
              </div>
              <div className="cb-dot-anchor">
                <span className="cb-dot-core" />
              </div>
              <div className="cb-editorial" style={{ borderLeftStyle: 'dashed' }}>
                <div className="cb-title">{msg.pendingForkTitle}</div>
                <div className="cb-summary">{msg.pendingForkSummary(pendingForkNode.turnLabel)}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== STANDALONE COMPOSER (NEVER SHOWN IN DSH NATIVE COMPOSER MODE) ==================== */}
      {graph.capabilities.canSend && !useNativeComposer && (
        <section className={`cb-composer ${pendingForkNode ? 'cb-fork-mode' : ''}`}>
          <div className="cb-composer-bar">
            <div className="cb-composer-target">
              {pendingForkNode ? (
                <>
                  <span style={{ color: '#059669', display: 'inline-flex' }}>
                    <IconFork />
                  </span>
                  <span>
                    {msg.standaloneForkPrefix} <strong>{pendingForkNode.turnLabel}</strong>
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="cb-dot"
                    style={{ background: activeTrack ? resolveTrackStroke(activeTrack, theme) : '#27272a' }}
                  />
                  <span>{activeTrack?.title ?? msg.trackMain}</span>
                  <span style={{ color: 'var(--cb-text-faint)', fontWeight: 400 }}>
                    {activeTail ? msg.standaloneContinueAfter(activeTail.turnLabel) : msg.standaloneStartNew}
                  </span>
                </>
              )}
            </div>
            {pendingForkNode && (
              <button
                className="cb-hud-btn"
                style={{ color: 'var(--cb-rose)', padding: '2px 6px' }}
                onClick={() => setPendingForkNodeId(null)}
              >
                {msg.standaloneCancelFork}
              </button>
            )}
          </div>

          <div className="cb-composer-row">
            <textarea
              ref={composerRef}
              className="cb-textarea"
              rows={1}
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              placeholder={
                pendingForkNode
                  ? msg.standaloneForkPlaceholder(pendingForkNode.turnLabel)
                  : msg.standaloneSendPlaceholder(activeTrack?.title ?? msg.trackMain)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
            />
            {activeTrack?.running && graph.capabilities.canStop && !pendingForkNode && (
              <button
                className="cb-btn-stop"
                onClick={() => void actions.onStop(activeTrack.id)}
                title={msg.stopTip}
              >
                <IconStop />
                <span>{msg.stop}</span>
              </button>
            )}
            <button
              className="cb-btn-send"
              disabled={sending || !composerText.trim()}
              onClick={() => void handleSend()}
            >
              <span>{sending ? msg.sending : msg.send}</span>
              <IconSend />
            </button>
          </div>
        </section>
      )}

      {/* ==================== RIGHT INSPECTOR DRAWER ==================== */}
      {inspector && (
        <aside className="cb-drawer">
          <div className="cb-drawer-head">
            <strong style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
              {inspector.kind === 'step' && inspector.step ? (
                <>
                  <StepKindIcon kind={inspector.step.kind} />
                  <span>{inspector.step.title}</span>
                </>
              ) : (
                <>
                  <IconMerge />
                  <span>{msg.inspectorMergeTitle}</span>
                </>
              )}
            </strong>
            <button className="cb-hud-btn" style={{ padding: '3px 6px' }} onClick={() => setInspector(null)}>
              <IconClose />
            </button>
          </div>
          <div className="cb-drawer-body">
            {inspector.kind === 'step' && inspector.step && inspector.node && (
              <>
                <div style={{ fontSize: 11.5, color: 'var(--cb-text-muted)', marginBottom: 10 }}>
                  {msg.inspectorTurnMeta(inspector.node.turnLabel, inspector.node.title, inspector.step.duration)}
                </div>
                {inspector.step.diff ? (
                  <div className="cb-code-block">
                    <div className="cb-code-head">
                      <span>Unified Diff</span>
                    </div>
                    <pre style={{ padding: '8px 0' }}>
                      {inspector.step.diff.split('\n').map((line, i) => {
                        const cls =
                          line.startsWith('+') && !line.startsWith('+++')
                            ? 'cb-diff-add'
                            : line.startsWith('-') && !line.startsWith('---')
                              ? 'cb-diff-del'
                              : 'cb-diff-ctx';
                        return (
                          <span key={i} className={cls}>
                            {line}
                          </span>
                        );
                      })}
                    </pre>
                  </div>
                ) : (
                  <div className="cb-code-block">
                    <div className="cb-code-head">
                      <span>{inspector.step.kind.toUpperCase()}</span>
                    </div>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{inspector.step.detail || msg.inspectorEmpty}</pre>
                  </div>
                )}
              </>
            )}

            {inspector.kind === 'merge' && inspector.merge && (
              <div className="cb-bubble cb-bubble-user">
                <div className="cb-bubble-role">
                  <span>{msg.inspectorMergeRole}</span>
                </div>
                <div>{inspector.merge.summary}</div>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* ==================== CHERRY-PICK MERGE MODAL ==================== */}
      {cherryTrackId && (
        <div
          className="cb-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCherryTrackId(null);
          }}
        >
          <div className="cb-cherry-modal">
            <div className="cb-modal-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <IconMerge />
                <strong style={{ fontSize: 13.5 }}>{msg.cherryModalTitle}</strong>
              </div>
              <button className="cb-hud-btn" style={{ padding: '3px 6px' }} onClick={() => setCherryTrackId(null)}>
                <IconClose />
              </button>
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ fontSize: 12.5, color: 'var(--cb-text-secondary)' }}>
                {msg.cherrySourceLabel}
                <strong>{graph.tracks[cherryTrackId]?.title}</strong> {msg.cherryInjectLabel}
                <strong>
                  {graph.tracks[graph.tracks[cherryTrackId]?.parentTrackId ?? graph.rootTrackId]?.title ??
                    msg.trackMain}
                </strong>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--cb-text-muted)', marginTop: 6 }}>{msg.cherryDesc}</div>
              <textarea
                className="cb-cherry-textarea"
                value={cherrySummary}
                onChange={(e) => setCherrySummary(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
                <button className="cb-btn-secondary" onClick={() => setCherryTrackId(null)}>
                  {msg.cherryCancel}
                </button>
                <button className="cb-btn-primary" onClick={() => void handleConfirmCherryPick()}>
                  {msg.cherryConfirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== WORKSPACE TIMELINE LINK MODAL ==================== */}
      {linkModalOpen && workspaceSessions && actions.onLinkSession && (
        <div
          className="cb-modal-backdrop cb-link-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLinkModalOpen(false);
          }}
        >
          <div className="cb-link-modal">
            <div className="cb-modal-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconLink />
                <strong style={{ fontSize: 13.5 }}>{msg.linkModalTitle}</strong>
                {workspaceName && <span className="cb-tag">{workspaceName}</span>}
              </div>
              <button className="cb-hud-btn" style={{ padding: '3px 6px' }} onClick={() => setLinkModalOpen(false)}>
                <IconClose />
              </button>
            </div>
            <div className="cb-link-body">
              <div className="cb-link-desc">{msg.linkModalDesc}</div>
              <div className="cb-link-search">
                <IconSearch />
                <input
                  type="text"
                  value={linkSearch}
                  onChange={(e) => setLinkSearch(e.target.value)}
                  placeholder={msg.linkSearchPlaceholder}
                />
              </div>
              <div className="cb-link-list">
                {workspaceSessions
                  .filter((item) => {
                    const kw = linkSearch.trim().toLowerCase();
                    if (!kw) return true;
                    return item.title.toLowerCase().includes(kw) || item.id.toLowerCase().includes(kw);
                  })
                  .map((item) => {
                    const isSelf = item.linkKind === 'self';
                    const isFork = item.linkKind === 'fork';
                    const isManual = item.linkKind === 'manual';
                    const checked = isSelf || isFork || isManual;
                    const locked = isSelf || isFork;
                    const timeStr = item.updatedAt
                      ? new Date(item.updatedAt).toLocaleString(locale === 'en' ? 'en-US' : 'zh-CN', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '';
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`cb-link-row ${checked ? 'cb-checked' : ''} ${locked ? 'cb-locked' : ''}`}
                        onClick={() => {
                          if (locked) return;
                          if (isManual) {
                            actions.onUnlinkSession?.(item.id);
                          } else {
                            actions.onLinkSession?.(item.id);
                          }
                        }}
                      >
                        <span className={`cb-link-check ${checked ? 'cb-checked' : ''}`}>
                          {checked && <IconCheck />}
                        </span>
                        <span className="cb-link-info">
                          <span className="cb-link-title">{item.title}</span>
                          {timeStr && <span className="cb-link-time">{timeStr}</span>}
                        </span>
                        <span className="cb-link-badge-col">
                          {isSelf ? (
                            <span className="cb-tag cb-tag-adopted">{msg.linkCurrent}</span>
                          ) : isFork ? (
                            <span className="cb-tag">{msg.linkDefaultFork}</span>
                          ) : isManual ? (
                            <span className="cb-tag cb-tag-linked">{msg.linkManual}</span>
                          ) : (
                            <span className="cb-link-add-hint">{msg.linkClickToAdd}</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                {workspaceSessions.length <= 1 && <div className="cb-link-empty">{msg.linkEmpty}</div>}
              </div>
              <div className="cb-link-foot">
                <span className="cb-link-count">
                  {msg.linkGroupCount(workspaceSessions.filter((s) => s.linkKind !== 'none').length)}
                </span>
                <button className="cb-btn-primary" onClick={() => setLinkModalOpen(false)}>
                  {msg.done}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOAST ==================== */}
      {toast && <div className="cb-toast">{toast}</div>}
    </div>
  );
}
