/**
 * Global DSH-Native Magnetic Tile Store.
 *
 * Lives at the plugin root (persisting across `对话` / `轨迹` / `时间线` tabs and across
 * session switches!) and drives the native `shell.overlay` Magnetic Tile layer.
 */

import type { ChronoNode } from '../core/types';

export interface MagneticTileRecord {
  readonly id: string;
  readonly nodeId: string;
  readonly sessionId: string;
  readonly node: ChronoNode;
  readonly trackTitle: string;
  readonly trackColor: string;
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly minimized: boolean;
  readonly aiOnly: boolean;
  readonly z: number;
}

export const TILE_DEFAULT_W = 380;
export const TILE_DEFAULT_H = 380;
export const TILE_MIN_W = 268;
export const TILE_MAX_W = 820;
export const TILE_MIN_H = 190;
export const TILE_MAX_H = 820;
export const TILE_SNAP_DIST = 14;
export const TILE_GAP = 10;

export interface TileFocusRequest {
  readonly sessionId: string;
  readonly nodeId: string;
  readonly seq: number;
}

export interface TileStoreSnapshot {
  readonly tiles: readonly MagneticTileRecord[];
  readonly focusRequest: TileFocusRequest | null;
}

export class TileStore {
  private snapshot: TileStoreSnapshot = { tiles: [], focusRequest: null };
  private zCounter = 120;
  private focusSeq = 0;
  private readonly listeners = new Set<() => void>();

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  readonly getSnapshot = (): TileStoreSnapshot => this.snapshot;

  private setTiles(tiles: readonly MagneticTileRecord[]): void {
    this.snapshot = { ...this.snapshot, tiles };
    this.emit();
  }

  has(nodeId: string): boolean {
    return this.snapshot.tiles.some((t) => t.nodeId === nodeId);
  }

  requestFocus(sessionId: string, nodeId: string): void {
    this.snapshot = {
      ...this.snapshot,
      focusRequest: { sessionId, nodeId, seq: ++this.focusSeq },
    };
    this.emit();
  }

  clearFocusRequest(seq: number): void {
    if (this.snapshot.focusRequest?.seq !== seq) return;
    this.snapshot = { ...this.snapshot, focusRequest: null };
    this.emit();
  }

  togglePin(params: {
    readonly node: ChronoNode;
    readonly trackTitle: string;
    readonly trackColor: string;
  }): 'pinned' | 'unpinned' {
    const { node, trackTitle, trackColor } = params;
    const prevTiles = this.snapshot.tiles;
    if (prevTiles.some((t) => t.nodeId === node.id)) {
      this.setTiles(prevTiles.filter((t) => t.nodeId !== node.id));
      return 'unpinned';
    }

    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 820;
    const pad = 18;
    const topSafe = 54;
    const bottomSafe = Math.max(280, vh - 90);
    const tileW = Math.min(TILE_DEFAULT_W, Math.max(TILE_MIN_W, Math.floor((vw - pad * 3) / 2)));
    const tileH = Math.min(TILE_DEFAULT_H, Math.max(TILE_MIN_H, bottomSafe - topSafe));

    // Smart placement: 1st tile docks top-right; 2nd tile snaps immediately to its left for side-by-side comparison
    let x = Math.max(pad, vw - tileW - pad);
    let y = topSafe;
    if (prevTiles.length > 0) {
      const last = prevTiles[prevTiles.length - 1];
      const leftSlot = last.x - tileW - TILE_GAP;
      if (leftSlot >= pad + 220) {
        x = leftSlot;
        y = last.y;
      } else {
        x = Math.max(pad, Math.min(vw - tileW - pad, last.x - 28));
        y = Math.max(topSafe, Math.min(bottomSafe - tileH, last.y + 30));
      }
    }

    const record: MagneticTileRecord = {
      id: node.id,
      nodeId: node.id,
      sessionId: node.trackId,
      node,
      trackTitle,
      trackColor,
      x: Math.round(x),
      y: Math.round(y),
      w: tileW,
      h: tileH,
      minimized: false,
      aiOnly: false,
      z: ++this.zCounter,
    };

    this.setTiles([...prevTiles, record]);
    return 'pinned';
  }

  /** Keep already-pinned tiles live-synced when their source node updates (e.g. streaming). */
  syncLiveNodes(nodes: Readonly<Record<string, ChronoNode>>): void {
    let changed = false;
    const next = this.snapshot.tiles.map((t) => {
      const fresh = nodes[t.nodeId];
      if (!fresh || fresh === t.node) return t;
      if (
        fresh.aiFullText === t.node.aiFullText &&
        fresh.status === t.node.status &&
        fresh.choices?.length === t.node.choices?.length
      ) {
        return t;
      }
      changed = true;
      return { ...t, node: fresh };
    });
    if (changed) {
      this.setTiles(next);
    }
  }

  bringToFront(tileId: string): void {
    const z = ++this.zCounter;
    this.setTiles(this.snapshot.tiles.map((t) => (t.id === tileId ? { ...t, z } : t)));
  }

  patchTile(
    tileId: string,
    patch: Partial<Pick<MagneticTileRecord, 'x' | 'y' | 'w' | 'h' | 'minimized' | 'aiOnly'>>,
  ): void {
    this.setTiles(this.snapshot.tiles.map((t) => (t.id === tileId ? { ...t, ...patch } : t)));
  }

  remove(tileId: string): void {
    this.setTiles(this.snapshot.tiles.filter((t) => t.id !== tileId));
  }

  clear(): void {
    if (this.snapshot.tiles.length === 0) return;
    this.setTiles([]);
  }

  arrangeSideBySide(): void {
    const prevTiles = this.snapshot.tiles;
    if (prevTiles.length === 0) return;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 820;
    const pad = 16;
    const topSafe = 54;
    const availW = Math.max(320, vw - pad * 2);
    const availH = Math.max(240, vh - topSafe - 72);
    const count = prevTiles.length;
    const cols = Math.min(count, Math.max(1, Math.floor((availW + TILE_GAP) / (TILE_MIN_W + TILE_GAP))));
    const rows = Math.ceil(count / cols);
    const cellW = Math.min(460, Math.floor((availW - TILE_GAP * (cols - 1)) / cols));
    const cellH = Math.min(460, Math.max(TILE_MIN_H, Math.floor((availH - TILE_GAP * (rows - 1)) / rows)));
    const totalRowW = cols * cellW + (cols - 1) * TILE_GAP;
    const startX = Math.max(pad, vw - pad - totalRowW);

    this.setTiles(
      prevTiles.map((tile, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        return {
          ...tile,
          minimized: false,
          x: Math.round(startX + col * (cellW + TILE_GAP)),
          y: Math.round(topSafe + row * (cellH + TILE_GAP)),
          w: cellW,
          h: cellH,
          z: ++this.zCounter,
        };
      }),
    );
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn());
  }
}
