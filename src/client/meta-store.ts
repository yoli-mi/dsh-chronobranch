import {
  DEFAULT_SHORTCUTS,
  type BranchStatus,
  type MergeLink,
  type ShortcutAction,
  type ShortcutBindings,
} from '../core/types';

export interface TrackMetaRecord {
  status?: BranchStatus;
  collapsed?: boolean;
  forkFromNodeId?: string;
  /** Exact source turn `atSeq` cut boundary when forked via ChronoBranch (used to hide inherited prefix turns). */
  forkAtSeq?: number;
  /** Parent session ID captured immediately on fork so linking works before listState catches up. */
  forkParentId?: string;
}

export interface ChronoMetaSnapshot {
  readonly open: boolean;
  readonly trackMeta: Readonly<Record<string, TrackMetaRecord>>;
  readonly pinnedNodeIds: readonly string[];
  readonly mergeLinks: readonly MergeLink[];
  readonly shortcuts: ShortcutBindings;
  /** Disjoint groups of manually linked session IDs within a workspace. */
  readonly linkGroups: readonly (readonly string[])[];
}

const STORAGE_KEY = 'dsh-chronobranch:meta:v1';

interface PersistedShape {
  trackMeta?: Record<string, TrackMetaRecord>;
  pinnedNodeIds?: string[];
  mergeLinks?: MergeLink[];
  shortcuts?: Partial<Record<ShortcutAction, string>>;
  linkGroups?: string[][];
}

function normalizeLinkGroups(raw: readonly (readonly string[])[] | undefined): string[][] {
  if (!Array.isArray(raw)) return [];
  const parent = new Map<string, string>();
  const find = (x: string): string => {
    let cur = x;
    while (parent.has(cur) && parent.get(cur) !== cur) {
      cur = parent.get(cur)!;
    }
    return cur;
  };
  const union = (a: string, b: string) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent.set(rb, ra);
  };

  for (const grp of raw) {
    if (!Array.isArray(grp)) continue;
    const cleaned = grp.filter((id): id is string => typeof id === 'string' && id.trim().length > 0);
    if (cleaned.length < 2) continue;
    cleaned.forEach((id) => {
      if (!parent.has(id)) parent.set(id, id);
    });
    for (let i = 1; i < cleaned.length; i++) {
      union(cleaned[0], cleaned[i]);
    }
  }

  const buckets = new Map<string, string[]>();
  for (const id of parent.keys()) {
    const r = find(id);
    const list = buckets.get(r) ?? [];
    list.push(id);
    buckets.set(r, list);
  }
  return Array.from(buckets.values()).filter((g) => g.length >= 2);
}

function loadPersisted(): PersistedShape {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return {};
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PersistedShape;
  } catch {
    return {};
  }
}

export class ChronoMetaStore {
  private snapshot: ChronoMetaSnapshot;
  private readonly listeners = new Set<() => void>();

  constructor() {
    const saved = loadPersisted();
    this.snapshot = {
      open: false,
      trackMeta: saved.trackMeta ?? {},
      pinnedNodeIds: saved.pinnedNodeIds ?? [],
      mergeLinks: saved.mergeLinks ?? [],
      shortcuts: { ...DEFAULT_SHORTCUTS, ...(saved.shortcuts ?? {}) },
      linkGroups: normalizeLinkGroups(saved.linkGroups),
    };
  }

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  readonly getSnapshot = (): ChronoMetaSnapshot => this.snapshot;

  setOpen(open: boolean): void {
    if (this.snapshot.open === open) return;
    this.snapshot = { ...this.snapshot, open };
    this.emit();
  }

  toggleOpen(): void {
    this.setOpen(!this.snapshot.open);
  }

  patchTrackMeta(trackId: string, patch: TrackMetaRecord): void {
    const prev = this.snapshot.trackMeta[trackId] ?? {};
    const nextTrackMeta = {
      ...this.snapshot.trackMeta,
      [trackId]: { ...prev, ...patch },
    };
    this.snapshot = { ...this.snapshot, trackMeta: nextTrackMeta };
    this.persist();
    this.emit();
  }

  togglePin(nodeId: string): void {
    const exists = this.snapshot.pinnedNodeIds.includes(nodeId);
    const next = exists
      ? this.snapshot.pinnedNodeIds.filter((id) => id !== nodeId)
      : [...this.snapshot.pinnedNodeIds, nodeId];
    this.snapshot = { ...this.snapshot, pinnedNodeIds: next };
    this.persist();
    this.emit();
  }

  addMergeLink(link: MergeLink): void {
    this.snapshot = {
      ...this.snapshot,
      mergeLinks: [...this.snapshot.mergeLinks, link],
    };
    this.persist();
    this.emit();
  }

  setShortcut(action: ShortcutAction, binding: string): void {
    this.snapshot = {
      ...this.snapshot,
      shortcuts: {
        ...this.snapshot.shortcuts,
        [action]: binding,
      },
    };
    this.persist();
    this.emit();
  }

  resetShortcuts(): void {
    this.snapshot = {
      ...this.snapshot,
      shortcuts: { ...DEFAULT_SHORTCUTS },
    };
    this.persist();
    this.emit();
  }

  /** Link two sessions (transitively merging their existing workspace link groups). */
  linkSessions(sessionA: string, sessionB: string): void {
    if (!sessionA || !sessionB || sessionA === sessionB) return;
    const next = normalizeLinkGroups([...this.snapshot.linkGroups, [sessionA, sessionB]]);
    this.snapshot = { ...this.snapshot, linkGroups: next };
    this.persist();
    this.emit();
  }

  /** Remove one session from its manual workspace link group (keeping remaining peers linked if ≥ 2). */
  unlinkSession(sessionId: string): void {
    if (!sessionId) return;
    const next = this.snapshot.linkGroups
      .map((grp) => grp.filter((id) => id !== sessionId))
      .filter((grp) => grp.length >= 2);
    this.snapshot = { ...this.snapshot, linkGroups: next };
    this.persist();
    this.emit();
  }

  private persist(): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const payload: PersistedShape = {
        trackMeta: { ...this.snapshot.trackMeta },
        pinnedNodeIds: [...this.snapshot.pinnedNodeIds],
        mergeLinks: [...this.snapshot.mergeLinks],
        shortcuts: { ...this.snapshot.shortcuts },
        linkGroups: this.snapshot.linkGroups.map((g) => [...g]),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn());
  }
}
