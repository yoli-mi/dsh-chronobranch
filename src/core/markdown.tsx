/**
 * Lightweight, zero-dependency, XSS-safe Markdown renderer for ChronoBranch.
 * Supports headings, fenced code blocks with copy, inline code, bold/italic/strike,
 * links, blockquotes, horizontal rules, ordered/unordered/task lists, and GFM tables.
 */

import { Fragment, useState, type ReactNode } from 'react';
import { getChronoMessages, type ChronoLocale } from './i18n';
import { IconCheck, IconCopy } from './icons';

function isSafeHref(raw: string): boolean {
  const trimmed = raw.trim().toLowerCase();
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('#')
  );
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Order matters: inline code first, then links, bold+italic, bold, strike, italic
  const tokenRe =
    /(`[^`\n]+`|\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*\*([^*\n]+)\*\*\*|\*\*([^*\n]+)\*\*|__([^_\n]+)__|~~([^~\n]+)~~|\*([^*\n]+)\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let tokenIdx = 0;

  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const full = match[0];
    const key = `${keyPrefix}-${tokenIdx++}`;

    if (full.startsWith('`')) {
      nodes.push(
        <code key={key} className="cb-md-inline-code">
          {full.slice(1, -1)}
        </code>,
      );
    } else if (match[2] !== undefined && match[3] !== undefined) {
      const label = match[2];
      const href = match[3];
      if (isSafeHref(href)) {
        nodes.push(
          <a
            key={key}
            className="cb-md-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {label}
          </a>,
        );
      } else {
        nodes.push(label);
      }
    } else if (match[4] !== undefined) {
      nodes.push(
        <strong key={key}>
          <em>{match[4]}</em>
        </strong>,
      );
    } else if (match[5] !== undefined || match[6] !== undefined) {
      nodes.push(<strong key={key}>{match[5] ?? match[6]}</strong>);
    } else if (match[7] !== undefined) {
      nodes.push(<del key={key}>{match[7]}</del>);
    } else if (match[8] !== undefined) {
      nodes.push(<em key={key}>{match[8]}</em>);
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function renderLinesWithBreaks(lines: string[], keyPrefix: string): ReactNode {
  return lines.map((line, i) => (
    <Fragment key={`${keyPrefix}-l-${i}`}>
      {i > 0 && <br />}
      {renderInline(line, `${keyPrefix}-i-${i}`)}
    </Fragment>
  ));
}

function CodeBlockView({
  lang,
  code,
  copyLabel,
  copiedLabel,
}: {
  readonly lang: string;
  readonly code: string;
  readonly copyLabel: string;
  readonly copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    void navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="cb-code-block cb-md-code-block">
      <div className="cb-code-head">
        <span>{lang || 'text'}</span>
        <button type="button" className="cb-code-copy" onClick={handleCopy}>
          {copied ? <IconCheck size="xs" /> : <IconCopy size="xs" />}
          <span>{copied ? copiedLabel : copyLabel}</span>
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

function isTableSeparator(line: string): boolean {
  const t = line.trim();
  if (!t.includes('-')) return false;
  return /^\|?(\s*:?-{2,}:?\s*\|)+\s*:?-{2,}:?\s*\|?$/.test(t);
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((c) => c.trim());
}

function isBlockStarter(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  if (/^```/.test(t)) return true;
  if (/^#{1,6}\s+/.test(t)) return true;
  if (/^>\s?/.test(t)) return true;
  if (/^([-*_])\1{2,}$/.test(t)) return true;
  if (/^[-*+•]\s+/.test(t)) return true;
  if (/^\d+[.)]\s+/.test(t)) return true;
  return false;
}

export function ChronoMarkdown({
  text,
  className,
  locale = 'zh',
}: {
  readonly text: string;
  readonly className?: string;
  readonly locale?: ChronoLocale;
}) {
  if (!text) return null;
  const msg = getChronoMessages(locale);

  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // 1. Fenced code block
    const fenceMatch = /^```([^\s`]*)\s*$/.exec(trimmed);
    if (fenceMatch) {
      const lang = fenceMatch[1] || '';
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1; // skip closing fence
      blocks.push(
        <CodeBlockView
          key={`b-${blockKey++}`}
          lang={lang}
          code={codeLines.join('\n')}
          copyLabel={msg.copy}
          copiedLabel={msg.copied}
        />,
      );
      continue;
    }

    // 2. Horizontal rule
    if (/^([-*_])\1{2,}$/.test(trimmed)) {
      blocks.push(<hr key={`b-${blockKey++}`} className="cb-md-hr" />);
      i += 1;
      continue;
    }

    // 3. Heading
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = renderInline(headingMatch[2].trim(), `h-${blockKey}`);
      const k = `b-${blockKey++}`;
      if (level === 1) blocks.push(<h1 key={k} className="cb-md-h cb-md-h1">{content}</h1>);
      else if (level === 2) blocks.push(<h2 key={k} className="cb-md-h cb-md-h2">{content}</h2>);
      else if (level === 3) blocks.push(<h3 key={k} className="cb-md-h cb-md-h3">{content}</h3>);
      else blocks.push(<h4 key={k} className="cb-md-h cb-md-h4">{content}</h4>);
      i += 1;
      continue;
    }

    // 4. GFM Table
    if (trimmed.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = splitTableRow(rawLine);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      const k = `b-${blockKey++}`;
      blocks.push(
        <div key={k} className="cb-md-table-wrap">
          <table className="cb-md-table">
            <thead>
              <tr>
                {headers.map((h, ci) => (
                  <th key={ci}>{renderInline(h, `${k}-th-${ci}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {headers.map((_, ci) => (
                    <td key={ci}>{renderInline(row[ci] ?? '', `${k}-td-${ri}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // 5. Blockquote
    if (/^>\s?/.test(trimmed)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      const k = `b-${blockKey++}`;
      blocks.push(
        <blockquote key={k} className="cb-md-quote">
          {renderLinesWithBreaks(quoteLines, k)}
        </blockquote>,
      );
      continue;
    }

    // 6. Unordered / task list
    if (/^[-*+•]\s+/.test(trimmed)) {
      const items: { checked?: boolean; text: string }[] = [];
      while (i < lines.length && /^[-*+•]\s+/.test(lines[i].trim())) {
        const body = lines[i].trim().replace(/^[-*+•]\s+/, '');
        const taskMatch = /^\[( |x|X)\]\s+(.*)$/.exec(body);
        if (taskMatch) {
          items.push({ checked: taskMatch[1].toLowerCase() === 'x', text: taskMatch[2] });
        } else {
          items.push({ text: body });
        }
        i += 1;
      }
      const k = `b-${blockKey++}`;
      blocks.push(
        <ul key={k} className="cb-md-ul">
          {items.map((it, idx) => (
            <li key={idx} className={it.checked !== undefined ? 'cb-md-task' : undefined}>
              {it.checked !== undefined && (
                <span className={`cb-md-checkbox ${it.checked ? 'cb-checked' : ''}`}>
                  {it.checked ? '✓' : ''}
                </span>
              )}
              <span>{renderInline(it.text, `${k}-li-${idx}`)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // 7. Ordered list
    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ''));
        i += 1;
      }
      const k = `b-${blockKey++}`;
      blocks.push(
        <ol key={k} className="cb-md-ol">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `${k}-oli-${idx}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // 8. Paragraph (consume consecutive non-block lines)
    const paraLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i];
      if (!cur.trim()) break;
      if (paraLines.length > 0 && isBlockStarter(cur)) break;
      if (cur.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) break;
      paraLines.push(cur);
      i += 1;
    }
    const k = `b-${blockKey++}`;
    blocks.push(
      <p key={k} className="cb-md-p">
        {renderLinesWithBreaks(paraLines, k)}
      </p>,
    );
  }

  return <div className={`cb-md ${className ?? ''}`}>{blocks}</div>;
}
