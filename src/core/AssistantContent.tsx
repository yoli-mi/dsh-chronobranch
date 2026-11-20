/**
 * Shared Assistant content & Agent choice prompt renderers used by both
 * ChronoCanvas expanded cards and DSH root-level Magnetic Tiles (`shell.overlay`).
 */

import { IconCheck } from './icons';
import { ChronoMarkdown } from './markdown';
import type { AgentChoicePrompt, ChronoNode } from './types';

export function AgentChoiceCard({ choice }: { readonly choice: AgentChoicePrompt }) {
  const statusLabel =
    choice.status === 'waiting'
      ? '等待选择'
      : choice.status === 'cancelled'
        ? '已取消'
        : choice.status === 'interrupted'
          ? '已中断'
          : '已回答';

  return (
    <div className={`cb-choice-card cb-choice-${choice.status}`}>
      <div className="cb-choice-head">
        <span className="cb-choice-title">
          {choice.header ? `AGENT 选择 · ${choice.header}` : 'AGENT 提问与选择'}
          {choice.multiSelect ? '（多选）' : ''}
        </span>
        <span className={`cb-choice-badge cb-choice-badge-${choice.status}`}>{statusLabel}</span>
      </div>
      <div className="cb-choice-question">
        <ChronoMarkdown text={choice.question} />
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
          <span className="cb-choice-custom-tag">你的回答</span>
          <span>{choice.customAnswer}</span>
        </div>
      )}
      {choice.status === 'waiting' && (
        <div className="cb-choice-hint">等待你在下方原生对话栏提交选择</div>
      )}
    </div>
  );
}

export function AssistantContentBody({ node }: { readonly node: ChronoNode }) {
  if (node.aiSegments && node.aiSegments.length > 0) {
    return (
      <div className="cb-ai-segments">
        {node.aiSegments.map((seg) =>
          seg.kind === 'markdown' ? (
            <ChronoMarkdown key={seg.id} text={seg.text} />
          ) : (
            <AgentChoiceCard key={seg.id} choice={seg.choice} />
          ),
        )}
      </div>
    );
  }
  return (
    <div className="cb-ai-segments">
      {(node.aiFullText || !node.choices || node.choices.length === 0) && (
        <ChronoMarkdown text={node.aiFullText || node.aiSummary} />
      )}
      {node.choices && node.choices.map((ch) => <AgentChoiceCard key={ch.id} choice={ch} />)}
    </div>
  );
}
