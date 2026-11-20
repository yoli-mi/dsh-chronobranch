/**
 * Reactive locale bridge syncing ChronoBranch with DSH's internal language switcher.
 *
 * Reads language from:
 * 1. `@deepseek-ai/dsh-client-locale` (`ctx.locale.register` + `ctx.locale.bind` + `ctx.locale.subscribe`)
 * 2. Fallback: `document.documentElement.lang` (`MutationObserver`) / `navigator.language`
 */

import { resolveChronoLocale, type ChronoLocale } from '../core/i18n';

export interface DshLocaleServiceLike {
  readonly register?: (ns: string, dicts: Record<string, Record<string, string>>) => () => void;
  readonly bind?: (ns: string) => (key: string) => string;
  readonly subscribe?: (listener: () => void) => () => void;
}

const LOCALE_NS = 'chronobranch';

function readDomLocale(): ChronoLocale {
  if (typeof document !== 'undefined' && document.documentElement?.lang) {
    return resolveChronoLocale(document.documentElement.lang);
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    return resolveChronoLocale(navigator.language);
  }
  return 'zh';
}

export class ChronoLocaleStore {
  private locale: ChronoLocale = readDomLocale();
  private translateFn: ((key: string) => string) | null = null;
  private readonly listeners = new Set<() => void>();

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  readonly getSnapshot = (): ChronoLocale => this.locale;

  /** Synchronous read (safe inside DSH thunk callbacks like `label: () => ...`). */
  readCurrent(): ChronoLocale {
    if (this.translateFn) {
      try {
        const val = this.translateFn('lang');
        if (val === 'zh' || val === 'en') {
          this.locale = val;
          return val;
        }
      } catch {
        // Fallback to DOM
      }
    }
    return this.locale;
  }

  /** Attach to DSH's `ctx.locale` service; returns disposer. */
  attachDshLocale(localeSvc: DshLocaleServiceLike): () => void {
    const disposers: Array<() => void> = [];

    try {
      if (typeof localeSvc.register === 'function') {
        const offReg = localeSvc.register(LOCALE_NS, {
          zh: { lang: 'zh', tabLabel: '时间线' },
          en: { lang: 'en', tabLabel: 'Timeline' },
        });
        if (typeof offReg === 'function') disposers.push(offReg);
      }
      if (typeof localeSvc.bind === 'function') {
        this.translateFn = localeSvc.bind(LOCALE_NS);
      }
    } catch {
      // Ignore if namespace already registered
    }

    const sync = () => {
      let next: ChronoLocale = readDomLocale();
      if (this.translateFn) {
        try {
          const val = this.translateFn('lang');
          if (val === 'zh' || val === 'en') next = val;
        } catch {
          // Keep DOM fallback
        }
      }
      if (next !== this.locale) {
        this.locale = next;
        this.emit();
      }
    };

    sync();

    if (typeof localeSvc.subscribe === 'function') {
      const offSub = localeSvc.subscribe(sync);
      if (typeof offSub === 'function') disposers.push(offSub);
    }

    return () => {
      this.translateFn = null;
      for (const off of disposers.reverse()) {
        try {
          off();
        } catch {
          // Ignore
        }
      }
    };
  }

  /** Observe `document.documentElement.lang` as an always-on fallback. */
  observeDocumentLang(): () => void {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return () => {};
    const sync = () => {
      if (this.translateFn) return; // `ctx.locale` is authoritative when attached
      const next = readDomLocale();
      if (next !== this.locale) {
        this.locale = next;
        this.emit();
      }
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
    return () => obs.disconnect();
  }

  private emit(): void {
    this.listeners.forEach((fn) => fn());
  }
}
