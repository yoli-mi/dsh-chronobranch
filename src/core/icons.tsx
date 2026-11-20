import React from 'react';
import type { MicroStepKind } from './types';

interface IconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

function sizeClass(size: IconProps['size']): string {
  if (size === 'xs') return 'cb-icon cb-icon-xs';
  if (size === 'sm') return 'cb-icon cb-icon-sm';
  return 'cb-icon';
}

export function IconLinear({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M2.5 4h11M2.5 8h8.5M2.5 12h10" />
    </svg>
  );
}

export function IconTimeline({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M2 5h12M6 5v4a2 2 0 0 0 2 2h4.5" />
      <circle cx="4.5" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconZoomL1({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M2 8h12" />
      <circle cx="4" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconZoomL2({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M2 5h12" />
      <circle cx="5" cy="5" r="1.6" fill="var(--cb-surface)" />
      <path d="M5 8.5h7M5 11.5h5" />
    </svg>
  );
}

export function IconZoomL3({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" />
      <path d="M5 6h6M5 9h4" />
    </svg>
  );
}

export function IconFit({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M2.5 5.5V3a.5.5 0 0 1 .5-.5h2.5M10.5 2.5H13a.5.5 0 0 1 .5.5v2.5M13.5 10.5V13a.5.5 0 0 1-.5.5h-2.5M5.5 13.5H3a.5.5 0 0 1-.5-.5v-2.5" />
    </svg>
  );
}

export function IconSearch({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" />
    </svg>
  );
}

export function IconSubagent({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <circle cx="3" cy="5" r="1.5" />
      <circle cx="13" cy="5" r="1.5" />
      <rect x="6.7" y="9.7" width="2.6" height="2.6" rx=".4" transform="rotate(45 8 11)" />
      <path d="M4.5 5h7M3 6.5V9a2 2 0 0 0 2 2h1.2M9.8 11H11a2 2 0 0 0 2-2V6.5" />
    </svg>
  );
}

export function IconEyeOff({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M2 8s2.4-4 6-4 6 4 6 4-2.4 4-6 4-6-4-6-4Z" />
      <circle cx="8" cy="8" r="1.5" />
      <path d="m3 3 10 10" />
    </svg>
  );
}

export function IconCompare({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <rect x="2.2" y="2.8" width="11.6" height="10.4" rx="1.6" />
      <path d="M8 2.8v10.4" />
    </svg>
  );
}

export function IconMoon({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M12.5 9.8A5.2 5.2 0 0 1 6.2 3.5a5.2 5.2 0 1 0 6.3 6.3Z" />
    </svg>
  );
}

export function IconSun({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="2.8" />
      <path d="M8 1.8v1.5M8 12.7v1.5M1.8 8h1.5M12.7 8h1.5M3.6 3.6l1.1 1.1M11.3 11.3l1.1 1.1M12.4 3.6l-1.1 1.1M4.7 11.3l-1.1 1.1" />
    </svg>
  );
}

export function IconFork({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <circle cx="4" cy="4.5" r="1.4" />
      <circle cx="12" cy="4.5" r="1.4" />
      <circle cx="12" cy="11.5" r="1.4" />
      <path d="M5.4 4.5h5.2M6.8 4.5v5a2 2 0 0 0 2 2h1.8" />
    </svg>
  );
}

export function IconMerge({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <circle cx="4.5" cy="11.5" r="1.5" />
      <circle cx="11.5" cy="4.5" r="1.5" />
      <path d="M4.5 10V7.5a3 3 0 0 1 3-3H10" />
    </svg>
  );
}

export function IconExpand({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M9.5 3h3.5v3.5M6.5 13H3V9.5M13 3 8.8 7.2M3 13l4.2-4.2" />
    </svg>
  );
}

export function IconCollapse({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M13 6.5H9.5V3M3 9.5h3.5V13M9.5 6.5 13 3M6.5 9.5 3 13" />
    </svg>
  );
}

export function IconFold({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M3 8h10M5.5 5 8 7.5 10.5 5M5.5 11 8 8.5 10.5 11" />
    </svg>
  );
}

export function IconClose({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function IconCheck({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="m3.5 8.4 3 3 6-6.8" />
    </svg>
  );
}

export function IconCopy({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <rect x="5.5" y="5.5" width="7.5" height="7.5" rx="1.4" />
      <path d="M10.5 5.5V4.2A1.2 1.2 0 0 0 9.3 3H4.2A1.2 1.2 0 0 0 3 4.2v5.1a1.2 1.2 0 0 0 1.2 1.2h1.3" />
    </svg>
  );
}

export function IconPin({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M9.8 2.8 13.2 6.2 11.4 8l.4 2.2-1.4 1.4-2.8-2.8-3.6 3.6M6 8.2 3.8 6l1.4-1.4 2.2.4L9.8 2.8" />
    </svg>
  );
}

export function IconMagnet({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M4.2 3.2v5a3.8 3.8 0 0 0 7.6 0v-5" />
      <path d="M2.8 3.2h2.8M10.4 3.2h2.8M2.8 6h2.8M10.4 6h2.8" />
    </svg>
  );
}

export function IconLocate({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="3.6" />
      <path d="M8 2v2M8 12v2M2 8h2M12 8h2" />
    </svg>
  );
}

export function IconArrange({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <rect x="2.2" y="3" width="4.8" height="10" rx="1.2" />
      <rect x="9" y="3" width="4.8" height="10" rx="1.2" />
    </svg>
  );
}

export function IconMinimize({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M3.5 8h9" />
    </svg>
  );
}

export function IconSettings({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 2.2v1.6M8 12.2v1.6M2.2 8h1.6M12.2 8h1.6M3.9 3.9l1.1 1.1M11 11l1.1 1.1M12.1 3.9 11 5M5 11l-1.1 1.1" />
    </svg>
  );
}

export function IconPip({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <rect x="2" y="3" width="12" height="10" rx="1.6" />
      <rect x="7.8" y="7.4" width="4.4" height="3.6" rx="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSend({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}

export function IconStop({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <rect x="4" y="4" width="8" height="8" rx="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMicroAxis({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M2 8h12" />
      <circle cx="4.2" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="11.8" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLink({ className, size = 'sm' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M6.8 9.2 9.2 6.8M6 10.8l-1.1 1.1a2.2 2.2 0 0 1-3.1-3.1L3.6 7a2.2 2.2 0 0 1 3.1 0M10 5.2l1.1-1.1a2.2 2.2 0 1 1 3.1 3.1L12.4 9a2.2 2.2 0 0 1-3.1 0" />
    </svg>
  );
}

export function IconUnlink({ className, size = 'xs' }: IconProps) {
  return (
    <svg className={`${sizeClass(size)} ${className ?? ''}`} viewBox="0 0 16 16">
      <path d="M6 10.8l-1.1 1.1a2.2 2.2 0 0 1-3.1-3.1L3.6 7a2.2 2.2 0 0 1 3.1 0M10 5.2l1.1-1.1a2.2 2.2 0 1 1 3.1 3.1L12.4 9a2.2 2.2 0 0 1-3.1 0M3 3l10 10" />
    </svg>
  );
}

export function StepKindIcon({ kind }: { kind: MicroStepKind }) {
  switch (kind) {
    case 'thinking':
      return (
        <svg className="cb-icon cb-icon-xs" viewBox="0 0 16 16">
          <circle cx="8" cy="6.2" r="3.4" />
          <path d="M6.3 9.3v1.6a1.7 1.7 0 0 0 3.4 0V9.3M6.8 13.5h2.4" />
        </svg>
      );
    case 'terminal':
      return (
        <svg className="cb-icon cb-icon-xs" viewBox="0 0 16 16">
          <path d="m3.5 5.2 3 2.8-3 2.8M8.5 11.2h4" />
        </svg>
      );
    case 'file-diff':
      return (
        <svg className="cb-icon cb-icon-xs" viewBox="0 0 16 16">
          <path d="M8 3.5v5M5.5 6h5M5.5 11.5h5" />
        </svg>
      );
    case 'subagent-spawn':
      return (
        <svg className="cb-icon cb-icon-xs" viewBox="0 0 16 16">
          <circle cx="4" cy="4.5" r="1.5" />
          <circle cx="12" cy="11.5" r="1.5" />
          <path d="M4 6v3.5a2 2 0 0 0 2 2h4.5" />
        </svg>
      );
    case 'tool-call':
    default:
      return (
        <svg className="cb-icon cb-icon-xs" viewBox="0 0 16 16">
          <path d="M4 2.5h5.2L12.5 5.8V13.5h-8.5Z" />
          <path d="M9 2.5v3.5h3.5M6 8.5h4M6 11h2.8" />
        </svg>
      );
  }
}
