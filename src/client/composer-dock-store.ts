/**
 * Lightweight bridge between the active ChronoCanvas view and DSH's native
 * `conversation.input.dock` slot (rendered directly above DSH's single bottom composer).
 *
 * Ensures branching/forking NEVER introduces a second input box — users always type
 * in DSH's one complete native bottom composer while seeing & switching the active track target.
 */

export interface FreshForkNotice {
  readonly childSessionId: string;
  readonly sourceSessionId: string;
  readonly sourceTurnLabel: string;
  readonly sourceTitle: string;
  readonly trackColor: string;
}

export interface DockTrackOption {
  readonly id: string;
  readonly title: string;
  readonly color: string;
  readonly active: boolean;
}

export interface ComposerDockSnapshot {
  /** Whether the ChronoBranch timeline tab is currently mounted for the active session. */
  readonly timelineMountedFor: string | null;
  /** Number of tracks currently displayed on the mounted timeline. */
  readonly trackCount: number;
  /** Title & color of the currently active track targeted by DSH's bottom composer. */
  readonly activeTrackTitle: string;
  readonly activeTrackColor: string;
  /** Clickable track options in the current timeline group for 1-click send-target switching. */
  readonly tracks: readonly DockTrackOption[];
  /** Transient banner shown right after clicking `分叉` until the user sends their first prompt. */
  readonly forkNotice: FreshForkNotice | null;
}

function sameTracks(a: readonly DockTrackOption[], b: readonly DockTrackOption[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].id !== b[i].id ||
      a[i].title !== b[i].title ||
      a[i].color !== b[i].color ||
      a[i].active !== b[i].active
    ) {
      return false;
    }
  }
  return true;
}

export class ComposerDockStore {
  private snapshot: ComposerDockSnapshot = {
    timelineMountedFor: null,
    trackCount: 1,
    activeTrackTitle: '',
    activeTrackColor: '#27272a',
    tracks: [],
    forkNotice: null,
  };

  private readonly listeners = new Set<() => void>();

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  readonly getSnapshot = (): ComposerDockSnapshot => this.snapshot;

  setTimelineContext(
    sessionId: string | null,
    trackCount = 1,
    activeTrackTitle = '',
    activeTrackColor = '#27272a',
    tracks: readonly DockTrackOption[] = [],
  ): void {
    const prev = this.snapshot;
    if (
      prev.timelineMountedFor === sessionId &&
      prev.trackCount === trackCount &&
      prev.activeTrackTitle === activeTrackTitle &&
      prev.activeTrackColor === activeTrackColor &&
      sameTracks(prev.tracks, tracks)
    ) {
      return;
    }
    this.snapshot = {
      ...prev,
      timelineMountedFor: sessionId,
      trackCount,
      activeTrackTitle,
      activeTrackColor,
      tracks,
    };
    this.emit();
  }

  setForkNotice(notice: FreshForkNotice | null): void {
    const prev = this.snapshot.forkNotice;
    if (prev === notice) return;
    if (
      prev &&
      notice &&
      prev.childSessionId === notice.childSessionId &&
      prev.sourceSessionId === notice.sourceSessionId &&
      prev.sourceTurnLabel === notice.sourceTurnLabel
    ) {
      return;
    }
    this.snapshot = { ...this.snapshot, forkNotice: notice };
    this.emit();
  }

  clearForkNoticeIfMatches(childSessionId: string): void {
    if (this.snapshot.forkNotice?.childSessionId === childSessionId) {
      this.setForkNotice(null);
    }
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn());
  }
}
