/**
 * Shared Assistant content & Agent choice prompt renderers used by both
 * ChronoCanvas expanded cards and DSH root-level Magnetic Tiles (`shell.overlay`).
 */

import { getChronoMessages, type ChronoLocale } from './i18n';
import { IconCheck } from './icons';
import { ChronoMarkdown } from './markdown';
import type { AgentChoicePrompt, ChronoNode } from './types';

export function AgentChoiceCard({
  choice,
  locale = 'zh',
}: {
  readonly choice: AgentChoicePrompt;
  readonly locale?: ChronoLocale;
}) {
  const msg = getChronoMessages(locale);
  const statusLabel =
    choice.status === 'waiting'
      ? msg.choiceWaiting
      : choice.status === 'cancelled'
        ? msg.choiceCancelled
        : choice.status === 'interrupted'
          ? msg.choiceInterrupted
          : msg.choiceAnswered;

  return (
    <div className={`cb-choice-card cb-choice-${choice.status}`}>
      <div className="cb-choice-head">
        <span className="cb-choice-title">
          {msg.agentChoiceTitle(choice.header)}
          {choice.multiSelect ? (locale === 'en' ? ' (Multi-select)' : '（多选）') : ''}
        </span>
        <span className={`cb-choice-badge cb-choice-badge-${choice.status}`}>{statusLabel}</span>
      </div>
      <div className="cb-choice-question">
        <ChronoMarkdown text={choice.question} locale={locale} />
      </div>
      {choice.options.length > 0 && (
        <div className="cb-choice-options">
          {choice.options.map((opt, idx) => (
            <div key={idx} className={`cb-choice-opt ${opt.selected ? 'cb-selected' : ''}`}>
              <span className="cb-choice-indicator" aria-hidden="true">
                {opt.selected ? <IconCheck size="xs" /> : <span className="cb-choice-radio" />}
              </span>
              <div className="cb-choice-opt-body">
                <div className="cb-choice-opt-label">{opt.label}</div>
                {opt.description && <div className="cb-choice-opt-desc">{opt.description}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {choice.customAnswer && (
        <div className="cb-choice-custom">
          <span className="cb-choice-custom-tag">{msg.choiceCustomAnswer}</span>
          <span>{choice.customAnswer}</span>
        </div>
      )}
      {choice.status === 'waiting' && <div className="cb-choice-hint">{msg.choiceWaitingHint}</div>}
    </div>
  );
}

export function AssistantContentBody({
  node,
  locale = 'zh',
}: {
  readonly node: ChronoNode;
  readonly locale?: ChronoLocale;
}) {
  if (node.aiSegments && node.aiSegments.length > 0) {
    return (
      <div className="cb-ai-segments">
        {node.aiSegments.map((seg) =>
          seg.kind === 'markdown' ? (
            <ChronoMarkdown key={seg.id} text={seg.text} locale={locale} />
          ) : (
            <AgentChoiceCard key={seg.id} choice={seg.choice} locale={locale} />
          ),
        )}
      </div>
    );
  }
  return (
    <div className="cb-ai-segments">
      {(node.aiFullText || !node.choices || node.choices.length === 0) && (
        <ChronoMarkdown text={node.aiFullText || node.aiSummary} locale={locale} />
      )}
      {node.choices && node.choices.map((ch) => <AgentChoiceCard key={ch.id} choice={ch} locale={locale} />)}
    </div>
  );
}
