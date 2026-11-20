/**
 * Deterministic Architectural Dot-and-Line Swimlane Layout Engine.
 * Zero freeform spaghetti: X-axis is strictly chronological, Y-axis is parallel tracks,
 * and every inter-track fork/convergence/merge curve routes through open vertical column gutters.
 */

import type { ChronoGraph, ChronoNode, ChronoTrack } from './types';

export const DOT_OFFSET_X = 12;
export const DEFAULT_EXPANDED_W = 468;
export const DEFAULT_EXPANDED_H = 400;
export const MIN_SHEET_W = 320;
export const MAX_SHEET_W = 960;
export const MIN_SHEET_H = 220;
export const MAX_SHEET_H = 920;

export interface NodeCustomSize {
  readonly width?: number;
  readonly height?: number;
}

export type ZoomTier = 'l1' | 'l2' | 'l3';

export interface TrackRect {
  readonly x: number;
  readonly axisY: number;
  readonly w: number;
  readonly collapsed: boolean;
}

export interface NodeRect {
  readonly x: number;
  readonly axisY: number;
  readonly dotX: number;
  readonly w: number;
  /** Explicit sheet height (when expanded & user-resized or default). */
  readonly sheetH?: number;
  readonly col: number;
}

export interface GhostRect {
  readonly x: number;
  readonly axisY: number;
  readonly dotX: number;
  readonly w: number;
  readonly parentId: string;
}

export interface ChronoLayout {
  readonly orderedTracks: readonly ChronoTrack[];
  readonly trackRects: Readonly<Record<string, TrackRect>>;
  readonly nodeRects: Readonly<Record<string, NodeRect>>;
  readonly ghostRect: GhostRect | null;
  readonly colX: Readonly<Record<number, number>>;
  readonly colRightGutter: Readonly<Record<number, number>>;
  readonly totalW: number;
  readonly totalH: number;
}

export function getZoomTier(zoom: number): ZoomTier {
  if (zoom < 0.56) return 'l1';
  if (zoom <= 1.08) return 'l2';
  return 'l3';
}

export function getTrackNodes(graph: ChronoGraph, trackId: string): ChronoNode[] {
  return Object.values(graph.nodes)
    .filter((n) => n.trackId === trackId)
    .sort((a, b) => a.order - b.order);
}

export interface LayoutOptions {
  readonly zoom: number;
  readonly showSubagents: boolean;
  readonly hideDeadEnds: boolean;
  readonly expandedNodeIds: ReadonlySet<string>;
  readonly microOpenNodeIds: ReadonlySet<string>;
  readonly pendingForkNodeId: string | null;
  readonly nodeCustomSizes?: Readonly<Record<string, NodeCustomSize>>;
}

function clampSheetW(w: number | undefined): number {
  if (typeof w !== 'number' || !Number.isFinite(w)) return DEFAULT_EXPANDED_W;
  return Math.max(MIN_SHEET_W, Math.min(MAX_SHEET_W, Math.round(w)));
}

function clampSheetH(h: number | undefined): number {
  if (typeof h !== 'number' || !Number.isFinite(h)) return DEFAULT_EXPANDED_H;
  return Math.max(MIN_SHEET_H, Math.min(MAX_SHEET_H, Math.round(h)));
}

export function computeChronoLayout(graph: ChronoGraph, opts: LayoutOptions): ChronoLayout {
  const isL1 = getZoomTier(opts.zoom) === 'l1';
  const allTracks = Object.values(graph.tracks);
  const orderedTracks: ChronoTrack[] = [];

  const rootTrack = graph.tracks[graph.rootTrackId];
  const seenTrackIds = new Set<string>();
  const pushTrack = (t: ChronoTrack | undefined) => {
    if (!t || seenTrackIds.has(t.id)) return;
    if (t.kind === 'agent-subagent' && !opts.showSubagents) return;
    if (opts.hideDeadEnds && t.status === 'dead-end' && t.collapsed) return;
    seenTrackIds.add(t.id);
    orderedTracks.push(t);
  };

  // Preserve deterministic tree order: root track & its subagents/branches first, then linked peer trees
  pushTrack(rootTrack);
  const childrenByParent = new Map<string, ChronoTrack[]>();
  allTracks.forEach((t) => {
    if (!t.parentTrackId) return;
    const list = childrenByParent.get(t.parentTrackId) ?? [];
    list.push(t);
    childrenByParent.set(t.parentTrackId, list);
  });

  const appendSubtree = (parentId: string) => {
    const kids = childrenByParent.get(parentId) ?? [];
    // Place subagents directly beneath their parent, followed by human branches
    kids
      .filter((k) => k.kind === 'agent-subagent')
      .forEach((k) => {
        pushTrack(k);
        appendSubtree(k.id);
      });
    kids
      .filter((k) => k.kind !== 'agent-subagent')
      .forEach((k) => {
        pushTrack(k);
        appendSubtree(k.id);
      });
  };

  if (rootTrack) appendSubtree(rootTrack.id);

  // Linked peer roots (independent workspace conversations linked into this timeline group)
  allTracks
    .filter((t) => t.id !== graph.rootTrackId && !seenTrackIds.has(t.id) && (t.kind === 'linked-peer' || !t.parentTrackId))
    .forEach((peer) => {
      pushTrack(peer);
      appendSubtree(peer.id);
    });

  // Any remaining tracks (safety net)
  allTracks.forEach((t) => pushTrack(t));

  // 1. Chronological column placement
  const nodeCol: Record<string, number> = {};
  const mainNodes = rootTrack ? getTrackNodes(graph, rootTrack.id) : [];
  let curMainCol = 0;

  mainNodes.forEach((n, i) => {
    if (i > 0) {
      const prevId = mainNodes[i - 1].id;
      const hasConvergingSub = orderedTracks.some(
        (t) => t.kind === 'agent-subagent' && t.forkFromNodeId === prevId && t.convergeToNodeId === n.id,
      );
      curMainCol += hasConvergingSub ? 2 : 1;
    }
    nodeCol[n.id] = curMainCol;
  });

  // Multi-pass resolution for nested branches, linked peer tracks, and cherry-pick causality
  for (let pass = 0; pass < 4; pass++) {
    orderedTracks.forEach((t) => {
      if (t.id === graph.rootTrackId) return;
      const baseCol =
        t.forkFromNodeId && nodeCol[t.forkFromNodeId] !== undefined
          ? nodeCol[t.forkFromNodeId] + 1
          : t.kind === 'linked-peer' || !t.parentTrackId
            ? 0
            : 1;
      const tNodes = getTrackNodes(graph, t.id);
      tNodes.forEach((n, idx) => {
        nodeCol[n.id] = baseCol + idx;
      });
    });

    graph.mergeLinks.forEach((ml) => {
      if (nodeCol[ml.sourceNodeId] !== undefined && nodeCol[ml.targetNodeId] !== undefined) {
        const minTargetCol = nodeCol[ml.sourceNodeId] + 1;
        if (nodeCol[ml.targetNodeId] < minTargetCol) {
          const delta = minTargetCol - nodeCol[ml.targetNodeId];
          const tNodes = getTrackNodes(graph, ml.targetTrackId);
          const startIdx = tNodes.findIndex((n) => n.id === ml.targetNodeId);
          if (startIdx >= 0) {
            for (let k = startIdx; k < tNodes.length; k++) {
              nodeCol[tNodes[k].id] += delta;
            }
          }
        }
      }
    });
  }

  let ghostCol: number | null = null;
  if (opts.pendingForkNodeId && nodeCol[opts.pendingForkNodeId] !== undefined) {
    ghostCol = nodeCol[opts.pendingForkNodeId] + 1;
  }

  // 2. Column widths and dedicated open vertical gutter coordinates
  const colWidths: Record<number, number> = {};
  const setColWidth = (col: number, w: number) => {
    colWidths[col] = Math.max(colWidths[col] ?? 0, w);
  };

  orderedTracks.forEach((t) => {
    if (t.collapsed) return;
    getTrackNodes(graph, t.id).forEach((n) => {
      const col = nodeCol[n.id] ?? 0;
      const expanded = opts.expandedNodeIds.has(n.id);
      const microOpen = opts.microOpenNodeIds.has(n.id) && n.microSteps.length > 0;
      const custom = opts.nodeCustomSizes?.[n.id];
      const baseW = isL1 ? 185 : microOpen ? 316 : 258;
      setColWidth(col, expanded ? clampSheetW(custom?.width) : baseW);
    });
  });

  if (ghostCol !== null) setColWidth(ghostCol, 258);

  const colKeys = Object.keys(colWidths).map(Number);
  const maxCol = colKeys.length > 0 ? Math.max(...colKeys) : 0;
  const HEADER_W = 218;
  const H_GAP = isL1 ? 54 : 68;
  const colX: Record<number, number> = {};
  const colRightGutter: Record<number, number> = {};
  let accX = HEADER_W + 42;

  for (let c = 0; c <= maxCol; c++) {
    const cw = colWidths[c] || 258;
    colX[c] = accX;
    colRightGutter[c] = accX + cw + H_GAP * 0.44;
    accX += cw + H_GAP;
  }

  // 3. Track row vertical coordinates
  const TOP_META_CLEARANCE = 34;
  const ROW_GAP = isL1 ? 30 : 38;
  let accY = 38;
  const trackRects: Record<string, TrackRect> = {};
  const nodeRects: Record<string, NodeRect> = {};

  orderedTracks.forEach((t) => {
    if (t.collapsed) {
      const axisY = accY + 14;
      trackRects[t.id] = { x: 18, axisY, w: HEADER_W, collapsed: true };
      accY += 46;
      return;
    }

    const axisY = accY + TOP_META_CLEARANCE;
    const tNodes = getTrackNodes(graph, t.id);
    let belowAxisH = isL1 ? 40 : 128;

    tNodes.forEach((n) => {
      const expanded = opts.expandedNodeIds.has(n.id);
      const microOpen = opts.microOpenNodeIds.has(n.id) && n.microSteps.length > 0;
      const custom = opts.nodeCustomSizes?.[n.id];
      const expandedH = clampSheetH(custom?.height);
      let bh = expanded ? expandedH + 28 : isL1 ? 36 : 122;
      if (microOpen && !isL1) bh += 112;
      if (n.mergedFrom && !isL1 && !expanded) bh += 22;
      belowAxisH = Math.max(belowAxisH, bh);
    });

    trackRects[t.id] = { x: 18, axisY, w: HEADER_W, collapsed: false };

    tNodes.forEach((n) => {
      const col = nodeCol[n.id] ?? 0;
      const expanded = opts.expandedNodeIds.has(n.id);
      const microOpen = opts.microOpenNodeIds.has(n.id) && n.microSteps.length > 0;
      const custom = opts.nodeCustomSizes?.[n.id];
      const baseW = isL1 ? 185 : microOpen ? 316 : 258;
      const w = expanded ? clampSheetW(custom?.width) : baseW;

      nodeRects[n.id] = {
        x: colX[col],
        axisY,
        dotX: colX[col] + DOT_OFFSET_X,
        w,
        sheetH: expanded ? (custom?.height !== undefined ? clampSheetH(custom.height) : undefined) : undefined,
        col,
      };
    });

    accY = axisY + belowAxisH + ROW_GAP;
  });

  let ghostRect: GhostRect | null = null;
  if (opts.pendingForkNodeId && nodeRects[opts.pendingForkNodeId] && ghostCol !== null) {
    const axisY = accY + TOP_META_CLEARANCE;
    ghostRect = {
      x: colX[ghostCol],
      axisY,
      dotX: colX[ghostCol] + DOT_OFFSET_X,
      w: 258,
      parentId: opts.pendingForkNodeId,
    };
    accY = axisY + 120;
  }

  return {
    orderedTracks,
    trackRects,
    nodeRects,
    ghostRect,
    colX,
    colRightGutter,
    totalW: Math.max(1200, accX + 240),
    totalH: Math.max(760, accY + 200),
  };
}

/**
 * Architectural subway / Git-graph elbow path routed strictly through the open vertical column gutter
 * so inter-track lines never cross text below nodes.
 */
export function gutterElbowPath(x1: number, y1: number, x2: number, y2: number, gutterX: number): string {
  const dy = y2 - y1;
  if (Math.abs(dy) < 2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
  const dir = dy > 0 ? 1 : -1;
  const gx = Math.max(x1 + 24, Math.min(x2 - 24, gutterX));
  const r = Math.min(22, Math.abs(dy) / 2, Math.abs(gx - x1) / 2, Math.abs(x2 - gx) / 2);

  return [
    `M ${x1} ${y1}`,
    `L ${gx - r} ${y1}`,
    `Q ${gx} ${y1}, ${gx} ${y1 + dir * r}`,
    `L ${gx} ${y2 - dir * r}`,
    `Q ${gx} ${y2}, ${gx + r} ${y2}`,
    `L ${x2} ${y2}`,
  ].join(' ');
}
