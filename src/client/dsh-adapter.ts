/**
 * DeepSeek Harness (DSH) -> UCGS Adapter.
 *
 * Compatible with BOTH:
 * - DSH Desktop 0.2.x (`@deepseek-ai/dsh-client-ui-chat` providing `useChat` -> ChatSnapshot)
 * - DSH 0.1.x (`useSession` carrying `snap.chat` / `snap.views.get('chat')` / `snap.nodes`)
 */

import type {
  AssistantBlock,
  ChatSnapshot,
  ConversationNode,
  ConversationSnapshot,
  ISessions,
  RunningToolCall,
  SessionId,
  SessionListState,
  SessionSummary,
  ToolCallBlock,
  ToolResultNode,
} from '@deepseek-ai/dsh-client-runtime/client';
import type {
  AssistantChatData,
  ManualCompactionChatData,
  ToolChatData,
  TurnTailChatData,
} from '@deepseek-ai/dsh-client-ui-conversation/client';
import type {
  AgentChoiceOption,
  AgentChoicePrompt,
  AssistantSegment,
  ChronoGraph,
  ChronoNode,
  ChronoTrack,
  MicroStep,
  MicroStepKind,
} from '../core/types';
import { getChronoMessages, type ChronoLocale } from '../core/i18n';
import { RESTRAINED_BRANCH_PALETTE } from '../core/types';
import type { ChronoMetaSnapshot } from './meta-store';

let activeAdapterLocale: ChronoLocale = 'zh';
function tr(zh: string, en: string): string {
  return activeAdapterLocale === 'en' ? en : zh;
}

export type ChatSnapshotLike = Partial<ChatSnapshot> & {
  readonly nodes?: ChatSnapshot['nodes'] | readonly ConversationNode[];
  readonly items?: readonly unknown[];
  readonly entries?: readonly Record<string, unknown>[];
  readonly events?: readonly Record<string, unknown>[];
  readonly views?: { readonly get?: (key: string) => unknown; readonly chat?: unknown };
  readonly chat?: ChatSnapshotLike;
};

export type ConversationStateLike = Record<string, unknown> & {
  readonly chat?: ChatSnapshotLike;
  readonly views?: { readonly get?: (key: string) => unknown; readonly chat?: unknown };
  readonly nodes?: ChatSnapshot['nodes'] | readonly ConversationNode[];
  readonly order?: readonly string[];
  readonly entries?: readonly Record<string, unknown>[];
  readonly events?: readonly Record<string, unknown>[];
  readonly legacy?: ChatSnapshot['legacy'];
};

export interface CachedSessionData {
  readonly session?: ConversationSnapshot;
  readonly conversation?: ConversationStateLike;
  readonly chat?: ChatSnapshotLike;
}

function formatTime(epochMs: number | undefined): string {
  if (!epochMs) return '--:--';
  const d = new Date(epochMs);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function formatDuration(ms: number | undefined): string | undefined {
  if (ms === undefined || !Number.isFinite(ms) || ms < 0) return undefined;
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function extractTextFromContent(content: unknown): string {
  if (typeof content === 'string') return content.trim();
  if (!Array.isArray(content)) return '';
  const parts: string[] = [];
  for (const b of content) {
    if (typeof b === 'string') {
      if (b.trim()) parts.push(b.trim());
    } else if (b && typeof b === 'object') {
      const rec = b as Record<string, unknown>;
      if (rec.type === 'text' && typeof rec.text === 'string' && rec.text.trim()) {
        parts.push(rec.text.trim());
      } else if (rec.kind === 'text' && typeof rec.text === 'string' && rec.text.trim()) {
        parts.push(rec.text.trim());
      }
    }
  }
  return parts.join('\n').trim();
}

function extractAssistantText(blocks: readonly AssistantBlock[] | undefined): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b): b is Extract<AssistantBlock, { kind: 'text' }> => b?.kind === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
}

function extractAssistantReasoning(blocks: readonly AssistantBlock[] | undefined): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b): b is Extract<AssistantBlock, { kind: 'reasoning' }> => b?.kind === 'reasoning')
    .map((b) => b.text)
    .join('\n')
    .trim();
}

function extractFirstCodeBlock(markdown: string): { lang?: string; code?: string } {
  const match = /```([\w+-]*)\n([\s\S]*?)```/.exec(markdown);
  if (!match) return {};
  return {
    lang: match[1] || 'text',
    code: match[2].trim(),
  };
}

function classifyToolKind(toolName: string): MicroStepKind {
  const lower = toolName.toLowerCase();
  if (lower.includes('subagent') || lower.includes('agent') || lower.includes('spawn')) {
    return 'subagent-spawn';
  }
  if (
    lower.includes('bash') ||
    lower.includes('shell') ||
    lower.includes('exec') ||
    lower.includes('command') ||
    lower.includes('terminal') ||
    lower.includes('run')
  ) {
    return 'terminal';
  }
  if (lower.includes('edit') || lower.includes('write') || lower.includes('patch') || lower.includes('replace')) {
    return 'file-diff';
  }
  return 'tool-call';
}

function summarizeText(text: string, maxLen = 115): string {
  const clean = text
    .replace(/```[\s\S]*?```/g, tr('[代码片段]', '[Code]'))
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return tr('（无文本输出）', '(No text output)');
  return clean.length > maxLen ? `${clean.slice(0, maxLen)}…` : clean;
}

function firstLineTitle(text: string, fallback: string): string {
  const line = text.split('\n')[0]?.replace(/^[#>*\-\s]+/, '').trim() ?? '';
  if (!line) return fallback;
  return line.length > 28 ? `${line.slice(0, 28)}…` : line;
}

function toolResultToStep(node: ToolResultNode): MicroStep {
  const name = node.call?.name ?? node.callId;
  const kind = classifyToolKind(name);
  const resultText = extractTextFromContent(node.content);
  const duration = node.callTime !== null ? formatDuration(node.time - node.callTime) : undefined;
  const looksLikeDiff = kind === 'file-diff' && (resultText.includes('\n+') || resultText.includes('--- '));

  return {
    id: `tool-${node.callId}-${node.seq}`,
    kind,
    title: name,
    duration,
    status: node.isError ? 'error' : 'success',
    diff: looksLikeDiff ? resultText : undefined,
    detail: !looksLikeDiff
      ? [
          node.call?.argsRaw ? `Args:\n${node.call.argsRaw}` : '',
          resultText ? `\nOutput:\n${resultText}` : '',
        ]
          .filter(Boolean)
          .join('\n')
      : undefined,
  };
}

function runningToolToStep(call: RunningToolCall): MicroStep {
  return {
    id: `running-${call.callId}`,
    kind: classifyToolKind(call.name),
    title: call.name,
    duration: 'running',
    status: 'running',
    detail: call.argsRaw ? `Args:\n${call.argsRaw}` : tr('执行中…', 'Running…'),
  };
}

function safeParseJson(raw: string | undefined): unknown {
  if (!raw || typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return undefined;
  try {
    return JSON.parse(trimmed);
  } catch {
    return undefined;
  }
}

function isAskUserToolName(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    lower.includes('ask_user') ||
    lower.includes('askuser') ||
    lower.includes('ask_question') ||
    lower.includes('user_question') ||
    lower.includes('request_user_input') ||
    lower === 'ask' ||
    lower === 'question'
  );
}

function normalizeChoiceOptions(rawOptions: unknown): Array<{ label: string; description?: string; value?: string }> {
  if (!Array.isArray(rawOptions)) return [];
  const out: Array<{ label: string; description?: string; value?: string }> = [];
  for (const item of rawOptions) {
    if (typeof item === 'string' && item.trim()) {
      out.push({ label: item.trim(), value: item.trim() });
    } else if (item && typeof item === 'object') {
      const rec = item as Record<string, unknown>;
      const label = String(rec.label ?? rec.title ?? rec.text ?? rec.name ?? rec.value ?? '').trim();
      if (!label) continue;
      const desc = typeof rec.description === 'string' && rec.description.trim() ? rec.description.trim() : undefined;
      const value = typeof rec.value === 'string' && rec.value.trim() ? rec.value.trim() : label;
      out.push({ label, description: desc, value });
    }
  }
  return out;
}

function parseToolChoices(params: {
  readonly idPrefix: string;
  readonly toolName: string;
  readonly argsRaw?: string;
  readonly resultText?: string;
  readonly isRunning: boolean;
  readonly isError?: boolean;
}): AgentChoicePrompt[] {
  const parsedArgs = safeParseJson(params.argsRaw);
  const argsRec = parsedArgs && typeof parsedArgs === 'object' ? (parsedArgs as Record<string, unknown>) : undefined;
  const rawQuestions: Record<string, unknown>[] = [];

  if (argsRec && Array.isArray(argsRec.questions)) {
    for (const q of argsRec.questions) {
      if (q && typeof q === 'object') rawQuestions.push(q as Record<string, unknown>);
    }
  } else if (
    argsRec &&
    (Array.isArray(argsRec.options) || Array.isArray(argsRec.choices)) &&
    (isAskUserToolName(params.toolName) || typeof argsRec.question === 'string' || typeof argsRec.prompt === 'string')
  ) {
    rawQuestions.push(argsRec);
  }

  if (rawQuestions.length === 0) return [];

  const resultText = (params.resultText ?? '').trim();
  const parsedResult = safeParseJson(resultText);
  const resultRec =
    parsedResult && typeof parsedResult === 'object' ? (parsedResult as Record<string, unknown>) : undefined;

  let baseStatus: AgentChoicePrompt['status'] = params.isRunning ? 'waiting' : 'answered';
  if (!params.isRunning) {
    const statusStr = String(resultRec?.status ?? resultRec?.outcome ?? '').toLowerCase();
    const lowerText = resultText.toLowerCase();
    if (statusStr.includes('cancel') || lowerText.includes('cancelled') || resultText.includes('已取消')) {
      baseStatus = 'cancelled';
    } else if (
      statusStr.includes('interrupt') ||
      lowerText.includes('interrupted') ||
      resultText.includes('已中断') ||
      params.isError
    ) {
      baseStatus = 'interrupted';
    }
  }

  const answerMap = new Map<string, string[]>();
  const addAnswer = (key: string, val: unknown) => {
    if (!key) return;
    const list = answerMap.get(key) ?? [];
    if (typeof val === 'string' && val.trim()) {
      list.push(val.trim());
    } else if (Array.isArray(val)) {
      for (const v of val) {
        if (typeof v === 'string' && v.trim()) list.push(v.trim());
        else if (v && typeof v === 'object') {
          const r = v as Record<string, unknown>;
          const s = String(r.label ?? r.value ?? r.text ?? '').trim();
          if (s) list.push(s);
        }
      }
    } else if (val && typeof val === 'object') {
      const r = val as Record<string, unknown>;
      if (Array.isArray(r.selected)) addAnswer(key, r.selected);
      if (Array.isArray(r.values)) addAnswer(key, r.values);
      if (typeof r.value === 'string' && r.value.trim()) list.push(r.value.trim());
      if (typeof r.label === 'string' && r.label.trim()) list.push(r.label.trim());
      if (typeof r.answer === 'string' && r.answer.trim()) list.push(r.answer.trim());
      if (typeof r.text === 'string' && r.text.trim()) list.push(r.text.trim());
      if (typeof r.custom === 'string' && r.custom.trim()) list.push(r.custom.trim());
      if (typeof r.customText === 'string' && r.customText.trim()) list.push(r.customText.trim());
    }
    if (list.length > 0) answerMap.set(key, list);
  };

  const rawAnswers = resultRec?.answers ?? resultRec?.responses ?? resultRec?.results;
  if (Array.isArray(rawAnswers)) {
    rawAnswers.forEach((entry, idx) => {
      if (entry && typeof entry === 'object') {
        const r = entry as Record<string, unknown>;
        const k = String(r.id ?? r.questionId ?? r.question ?? idx);
        addAnswer(k, r);
        addAnswer(String(idx), r);
      } else {
        addAnswer(String(idx), entry);
      }
    });
  } else if (rawAnswers && typeof rawAnswers === 'object') {
    for (const [k, v] of Object.entries(rawAnswers as Record<string, unknown>)) {
      addAnswer(k, v);
    }
  } else if (resultRec) {
    if (resultRec.answer !== undefined) addAnswer('0', resultRec.answer);
    if (resultRec.selected !== undefined) addAnswer('0', resultRec.selected);
    if (resultRec.value !== undefined) addAnswer('0', resultRec.value);
  }

  return rawQuestions.map((q, idx) => {
    const qId = String(q.id ?? q.key ?? idx);
    const header = typeof q.header === 'string' && q.header.trim() ? q.header.trim() : undefined;
    const question = String(
      q.question ?? q.prompt ?? q.title ?? q.text ?? header ?? tr(`问题 ${idx + 1}`, `Question ${idx + 1}`),
    ).trim();
    const multiSelect = Boolean(q.multiSelect ?? q.multi_select ?? q.is_multi_select ?? q.multiple);
    const rawOpts = normalizeChoiceOptions(q.options ?? q.choices);

    let matched = answerMap.get(qId) ?? answerMap.get(question) ?? (header ? answerMap.get(header) : undefined) ?? answerMap.get(String(idx)) ?? [];

    // Plain-text fallback matching when tool result isn't JSON
    if (matched.length === 0 && !params.isRunning && resultText && !resultRec) {
      const foundLabels = rawOpts
        .filter((o) => resultText.includes(o.label) || (o.value && resultText.includes(o.value)))
        .map((o) => o.label);
      if (foundLabels.length > 0) {
        matched = foundLabels;
      } else if (rawQuestions.length === 1 && baseStatus === 'answered') {
        matched = [resultText];
      }
    }

    const matchedSet = new Set(matched.map((m) => m.toLowerCase()));
    const options: AgentChoiceOption[] = rawOpts.map((o) => ({
      label: o.label,
      description: o.description,
      selected:
        matchedSet.has(o.label.toLowerCase()) ||
        (o.value ? matchedSet.has(o.value.toLowerCase()) : false),
    }));

    const optionMatchKeys = new Set(
      rawOpts.flatMap((o) => [o.label.toLowerCase(), ...(o.value ? [o.value.toLowerCase()] : [])]),
    );
    const customAnswers = matched.filter((m) => !optionMatchKeys.has(m.toLowerCase()));

    return {
      id: `${params.idPrefix}-q-${idx}`,
      header,
      question,
      multiSelect,
      options,
      selectedAnswers: matched,
      customAnswer: customAnswers.length > 0 ? customAnswers.join('；') : undefined,
      status: baseStatus,
    };
  });
}

function collectToolBlockSteps(
  block: ToolCallBlock,
  out: MicroStep[],
  choicesOut?: AgentChoicePrompt[],
): number {
  let filesChanged = 0;
  const isResult = 'kind' in block && block.kind === 'tool-result';
  const step = isResult ? toolResultToStep(block) : runningToolToStep(block as RunningToolCall);
  out.push(step);
  if (step.kind === 'file-diff') filesChanged += 1;

  if (choicesOut) {
    const toolName = isResult ? block.call?.name ?? block.callId : (block as RunningToolCall).name;
    const argsRaw = isResult ? block.call?.argsRaw : (block as RunningToolCall).argsRaw;
    const resultText = isResult ? extractTextFromContent(block.content) : undefined;
    const parsed = parseToolChoices({
      idPrefix: step.id,
      toolName,
      argsRaw,
      resultText,
      isRunning: !isResult,
      isError: isResult ? block.isError : false,
    });
    if (parsed.length > 0) choicesOut.push(...parsed);
  }

  if (Array.isArray(block.subCalls)) {
    for (const sub of block.subCalls) {
      filesChanged += collectToolBlockSteps(sub, out, choicesOut);
    }
  }
  return filesChanged;
}

function extractPendingChoices(sessionSnap: ConversationSnapshot | undefined): AgentChoicePrompt[] {
  const pending = (sessionSnap as unknown as { pending?: readonly unknown[] } | undefined)?.pending;
  if (!Array.isArray(pending) || pending.length === 0) return [];
  const out: AgentChoicePrompt[] = [];

  pending.forEach((item, idx) => {
    if (!item || typeof item !== 'object') return;
    const rec = item as { kind?: string; key?: string; payload?: Record<string, unknown> };
    if (rec.kind !== 'question' || !rec.payload) return;
    const payload = rec.payload;
    const rawList = Array.isArray(payload.questions)
      ? (payload.questions as Record<string, unknown>[])
      : [payload];

    rawList.forEach((q, qIdx) => {
      if (!q || typeof q !== 'object') return;
      const header = typeof q.header === 'string' && q.header.trim() ? q.header.trim() : undefined;
      const question = String(
        q.question ?? q.prompt ?? q.title ?? q.text ?? header ?? tr(`待选择问题 ${qIdx + 1}`, `Question ${qIdx + 1}`),
      ).trim();
      const opts = normalizeChoiceOptions(q.options ?? q.choices).map((o) => ({
        label: o.label,
        description: o.description,
        selected: false,
      }));
      out.push({
        id: `pending-${rec.key ?? idx}-${qIdx}`,
        header,
        question,
        multiSelect: Boolean(q.multiSelect ?? q.multi_select ?? q.is_multi_select ?? q.multiple),
        options: opts,
        selectedAnswers: [],
        status: 'waiting',
      });
    });
  });

  return out;
}

interface TurnBucket {
  turnNumber: number;
  userSeq: number;
  userTime: number;
  userText: string;
  assistantTexts: string[];
  aiSegments: AssistantSegment[];
  closingSeq?: number;
  microSteps: MicroStep[];
  choices: AgentChoicePrompt[];
  filesChanged: number;
  hasError: boolean;
  streaming: boolean;
  durationMs?: number;
}

function appendAssistantText(b: TurnBucket, text: string): void {
  const clean = text.trim();
  if (!clean) return;
  b.assistantTexts.push(clean);
  const last = b.aiSegments[b.aiSegments.length - 1];
  if (last && last.kind === 'markdown') {
    b.aiSegments[b.aiSegments.length - 1] = {
      ...last,
      text: `${last.text}\n\n${clean}`,
    };
  } else {
    b.aiSegments.push({
      kind: 'markdown',
      id: `md-${b.turnNumber}-${b.aiSegments.length}`,
      text: clean,
    });
  }
}

function appendChoices(b: TurnBucket, choices: readonly AgentChoicePrompt[]): void {
  if (choices.length === 0) return;
  for (const ch of choices) {
    b.choices.push(ch);
    b.aiSegments.push({
      kind: 'choice',
      id: ch.id,
      choice: ch,
    });
  }
}

function finalizeBuckets(
  sessionId: string,
  trackPrefix: string,
  buckets: TurnBucket[],
  pinnedSet: ReadonlySet<string>,
  mergeTargetMap: ReadonlyMap<string, { trackTitle: string; summary: string }>,
): ChronoNode[] {
  return buckets.map((b, idx) => {
    const fullAi = b.assistantTexts.join('\n\n').trim();
    const { lang, code } = extractFirstCodeBlock(fullAi);
    const nodeId = `${sessionId}:turn:${b.userSeq}`;
    const turnLabel = `${trackPrefix}${idx + 1}`;
    const hasChoices = b.choices.length > 0;
    const firstChoiceSummary = hasChoices
      ? `${tr('【提问选择】', '[Choice] ')}${b.choices[0].question}`
      : undefined;

    return {
      id: nodeId,
      trackId: sessionId,
      order: idx + 1,
      turnLabel,
      title: firstLineTitle(b.userText, tr(`第 ${idx + 1} 轮对话`, `Turn ${idx + 1}`)),
      timestamp: formatTime(b.userTime),
      status: b.streaming ? 'streaming' : b.hasError ? 'error' : 'completed',
      atSeq: b.closingSeq ?? b.userSeq,
      pinned: pinnedSet.has(nodeId),
      userText: b.userText,
      aiSummary: b.streaming
        ? summarizeText(fullAi || firstChoiceSummary || tr('正在生成回复并调用工具…', 'Generating reply and running tools…'), 115)
        : summarizeText(fullAi || firstChoiceSummary || '', 115),
      aiFullText:
        fullAi ||
        (hasChoices
          ? ''
          : b.streaming
            ? tr('正在生成中…', 'Streaming…')
            : tr('（本轮仅包含工具调用或系统事件）', '(Tool calls or system events only)')),
      aiSegments: b.aiSegments.length > 0 ? b.aiSegments : undefined,
      codeLang: lang,
      codeSnippet: code,
      microSteps: b.microSteps,
      choices: hasChoices ? b.choices : undefined,
      stats: {
        durationMs: b.durationMs,
        toolCount: b.microSteps.length,
        filesChanged: b.filesChanged,
      },
      mergedFrom: mergeTargetMap.get(nodeId),
    };
  });
}

function readChatFromContainer(obj: unknown): ChatSnapshotLike | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const rec = obj as Record<string, unknown>;
  if (Array.isArray(rec.order) && rec.order.length > 0 && rec.nodes) {
    return rec as ChatSnapshotLike;
  }
  const legacy = rec.legacy as { nodes?: unknown[]; order?: unknown[] } | undefined;
  if (legacy && ((Array.isArray(legacy.nodes) && legacy.nodes.length > 0) || (Array.isArray(legacy.order) && legacy.order.length > 0))) {
    return rec as ChatSnapshotLike;
  }
  if (rec.chat && typeof rec.chat === 'object') {
    const inner = readChatFromContainer(rec.chat);
    if (inner) return inner;
  }
  const views = rec.views as { get?: (k: string) => unknown; chat?: unknown } | undefined;
  if (views && typeof views === 'object') {
    if (typeof views.get === 'function') {
      const fromMap = views.get('chat');
      const inner = readChatFromContainer(fromMap);
      if (inner) return inner;
      if (fromMap && typeof fromMap === 'object') return fromMap as ChatSnapshotLike;
    }
    if (views.chat && typeof views.chat === 'object') {
      const inner = readChatFromContainer(views.chat);
      if (inner) return inner;
      return views.chat as ChatSnapshotLike;
    }
  }
  if (Array.isArray(rec.nodes) && rec.nodes.length > 0) {
    return rec as ChatSnapshotLike;
  }
  return undefined;
}

function resolveChatSnapshot(
  chatSnap: ChatSnapshotLike | undefined,
  convSnap: ConversationStateLike | undefined,
  sessionSnap: ConversationSnapshot | undefined,
): ChatSnapshotLike | undefined {
  return (
    readChatFromContainer(chatSnap) ??
    readChatFromContainer(convSnap) ??
    readChatFromContainer(sessionSnap) ??
    chatSnap ??
    convSnap?.chat ??
    sessionSnap?.chat
  );
}

/**
 * Primary modern DSH 0.2.x parser: reads `chatSnap.order` + `chatSnap.nodes.get(key)`.
 */
function buildFromChatStore(
  sessionId: string,
  trackPrefix: string,
  chatObj: ChatSnapshotLike | undefined,
  sessionSnap: ConversationSnapshot | undefined,
  pinnedSet: ReadonlySet<string>,
  mergeTargetMap: ReadonlyMap<string, { trackTitle: string; summary: string }>,
): ChronoNode[] {
  const order = chatObj?.order;
  const nodeStore = chatObj?.nodes;
  if (!order || order.length === 0 || !nodeStore || Array.isArray(nodeStore)) return [];

  const buckets: TurnBucket[] = [];
  let current: TurnBucket | null = null;

  const ensureBucket = (seq: number, time: number, fallbackUser = tr('（会话延续）', '(Continued)')): TurnBucket => {
    if (!current) {
      current = {
        turnNumber: buckets.length + 1,
        userSeq: seq,
        userTime: time,
        userText: fallbackUser,
        assistantTexts: [],
        aiSegments: [],
        microSteps: [],
        choices: [],
        filesChanged: 0,
        hasError: false,
        streaming: false,
      };
      buckets.push(current);
    }
    return current;
  };

  for (const key of order) {
    const viewNode =
      typeof nodeStore.get === 'function'
        ? nodeStore.get(key)
        : (nodeStore as unknown as Record<string, ReturnType<ChatSnapshot['nodes']['get']>>)[key];
    if (!viewNode) continue;
    const data = viewNode.data as Record<string, unknown> | undefined;
    if (!data) continue;

    if (viewNode.kind === 'user' || viewNode.kind === 'steering') {
      const seq = typeof data.seq === 'number' ? data.seq : viewNode.anchorSeq;
      const time = typeof data.time === 'number' ? data.time : Date.now();
      const text = extractTextFromContent(data.content ?? data.text) || tr('（图片或附件消息）', '(Image or attachment)');
      current = {
        turnNumber: buckets.length + 1,
        userSeq: seq,
        userTime: time,
        userText: text,
        assistantTexts: [],
        aiSegments: [],
        microSteps: [],
        choices: [],
        filesChanged: 0,
        hasError: false,
        streaming: false,
      };
      buckets.push(current);
      continue;
    }

    if (viewNode.kind === 'assistant-step' || viewNode.kind === 'assistant') {
      const stepData = data as unknown as AssistantChatData;
      const b = ensureBucket(viewNode.anchorSeq, stepData.time || Date.now());
      const text = extractAssistantText(stepData.blocks);
      if (text) appendAssistantText(b, text);
      const reasoning = extractAssistantReasoning(stepData.blocks);
      if (reasoning) {
        const timing = stepData.finalNode?.timing;
        const durMs =
          timing?.stepStartTime && timing.completedTime
            ? timing.completedTime - timing.stepStartTime
            : undefined;
        b.microSteps.push({
          id: `think-${key}`,
          kind: 'thinking',
          title: stepData.status === 'running' ? tr('实时思考中', 'Thinking…') : tr('思考推理', 'Reasoning'),
          duration: stepData.status === 'running' ? 'live' : formatDuration(durMs),
          status: stepData.status === 'running' ? 'running' : 'success',
          detail: reasoning,
        });
      }
      if (stepData.status === 'running') b.streaming = true;
      if (stepData.finalNode?.seq !== undefined) b.closingSeq = stepData.finalNode.seq;
      continue;
    }

    if (viewNode.kind === 'tool-call') {
      const toolData = data as unknown as ToolChatData;
      if (toolData.root) {
        const b = ensureBucket(viewNode.anchorSeq, Date.now());
        const stepChoices: AgentChoicePrompt[] = [];
        b.filesChanged += collectToolBlockSteps(toolData.root, b.microSteps, stepChoices);
        appendChoices(b, stepChoices);
        if (!('kind' in toolData.root)) b.streaming = true;
      }
      continue;
    }

    if (viewNode.kind === 'turn-tail') {
      const tail = data as unknown as TurnTailChatData;
      if (current) {
        current.closingSeq = tail.seq;
        const timing = chatObj?.legacy?.turnTimings?.get(tail.turn) ?? sessionSnap?.turnTimings?.get(tail.turn);
        if (timing?.endTime && timing.startTime) {
          current.durationMs = timing.endTime - timing.startTime;
        }
      }
      continue;
    }

    if (viewNode.kind === 'command') {
      const b = ensureBucket(viewNode.anchorSeq, typeof data.time === 'number' ? data.time : Date.now());
      const name = typeof data.name === 'string' ? data.name : 'command';
      const args = typeof data.args === 'string' ? data.args : '';
      const outcome = data.outcome as { kind?: string; text?: string } | null | undefined;
      b.microSteps.push({
        id: `cmd-${key}`,
        kind: 'terminal',
        title: `/${name}`,
        status: outcome?.kind === 'error' ? 'error' : 'success',
        detail: [args ? `Args: ${args}` : '', outcome?.text ?? ''].filter(Boolean).join('\n'),
      });
      continue;
    }

    if (viewNode.kind === 'manual-compaction') {
      const mc = data as unknown as ManualCompactionChatData;
      const b = ensureBucket(viewNode.anchorSeq, mc.command?.time ?? Date.now());
      b.microSteps.push({
        id: `compact-${key}`,
        kind: 'thinking',
        title: tr('/compact 压缩上下文', '/compact Context'),
        status: 'success',
        detail: mc.compaction?.summary ?? tr('已完成上下文压缩检查点', 'Context compaction checkpoint completed'),
      });
      continue;
    }

    if (viewNode.kind === 'turn-error') {
      const b = ensureBucket(viewNode.anchorSeq, typeof data.time === 'number' ? data.time : Date.now());
      b.hasError = true;
      const msg = typeof data.message === 'string' ? data.message : tr('执行失败', 'Execution failed');
      appendAssistantText(b, `[Error] ${msg}`);
    }
  }

  return finalizeBuckets(sessionId, trackPrefix, buckets, pinnedSet, mergeTargetMap);
}

/**
 * Fallback parser for `chatSnap.legacy.nodes` (DSH 0.2.x legacy slice) & `sessionSnap.nodes` (DSH 0.1.x).
 */
function buildFromLegacyNodes(
  sessionId: string,
  trackPrefix: string,
  chatObj: ChatSnapshotLike | undefined,
  sessionSnap: ConversationSnapshot | undefined,
  pinnedSet: ReadonlySet<string>,
  mergeTargetMap: ReadonlyMap<string, { trackTitle: string; summary: string }>,
): ChronoNode[] {
  const legacyNodes: readonly ConversationNode[] =
    (chatObj?.legacy?.nodes && chatObj.legacy.nodes.length > 0 ? chatObj.legacy.nodes : undefined) ??
    (Array.isArray(chatObj?.nodes) && chatObj.nodes.length > 0 ? chatObj.nodes : undefined) ??
    (sessionSnap?.nodes && sessionSnap.nodes.length > 0 ? sessionSnap.nodes : []);

  const turnEnds = chatObj?.legacy?.turnEnds ?? sessionSnap?.turnEnds;
  const turnTimings = chatObj?.legacy?.turnTimings ?? sessionSnap?.turnTimings;
  const partial = chatObj?.legacy?.partial ?? sessionSnap?.partial;
  const runningCalls = chatObj?.legacy?.runningCalls ?? sessionSnap?.runningCalls ?? [];

  if (legacyNodes.length === 0 && !partial && runningCalls.length === 0) return [];

  const buckets: TurnBucket[] = [];
  let current: TurnBucket | null = null;

  const ensureBucket = (seq: number, time: number, fallbackUser = tr('（会话延续）', '(Continued)')): TurnBucket => {
    if (!current) {
      current = {
        turnNumber: buckets.length + 1,
        userSeq: seq,
        userTime: time,
        userText: fallbackUser,
        assistantTexts: [],
        aiSegments: [],
        microSteps: [],
        choices: [],
        filesChanged: 0,
        hasError: false,
        streaming: false,
      };
      buckets.push(current);
    }
    return current;
  };

  for (const node of legacyNodes) {
    if (node.kind === 'user' || node.kind === 'steering') {
      const text = extractTextFromContent(node.content) || tr('（图片或附件消息）', '(Image or attachment)');
      current = {
        turnNumber: buckets.length + 1,
        userSeq: node.seq,
        userTime: node.time,
        userText: text,
        assistantTexts: [],
        aiSegments: [],
        microSteps: [],
        choices: [],
        filesChanged: 0,
        hasError: false,
        streaming: false,
      };
      buckets.push(current);
      continue;
    }

    if (node.kind === 'assistant') {
      const b = ensureBucket(node.seq, node.time);
      const text = extractAssistantText(node.blocks);
      if (text) appendAssistantText(b, text);
      const reasoning = extractAssistantReasoning(node.blocks);
      if (reasoning) {
        const durMs =
          node.timing?.stepStartTime && node.timing.completedTime
            ? node.timing.completedTime - node.timing.stepStartTime
            : undefined;
        b.microSteps.push({
          id: `think-${node.seq}`,
          kind: 'thinking',
          title: tr('思考推理', 'Reasoning'),
          duration: formatDuration(durMs),
          status: 'success',
          detail: reasoning,
        });
      }
      b.closingSeq = turnEnds?.get(node.turn) ?? node.seq;
      const timing = turnTimings?.get(node.turn);
      if (timing?.endTime && timing.startTime) {
        b.durationMs = timing.endTime - timing.startTime;
      }
      continue;
    }

    if (node.kind === 'tool-result') {
      const b = ensureBucket(node.seq, node.time);
      const stepChoices: AgentChoicePrompt[] = [];
      b.filesChanged += collectToolBlockSteps(node, b.microSteps, stepChoices);
      appendChoices(b, stepChoices);
      continue;
    }

    if (node.kind === 'command') {
      const b = ensureBucket(node.seq, node.time);
      b.microSteps.push({
        id: `cmd-${node.seq}`,
        kind: 'terminal',
        title: `/${node.name ?? 'command'}`,
        status: node.outcome?.kind === 'error' ? 'error' : 'success',
        detail: [node.args ? `Args: ${node.args}` : '', node.outcome?.text ?? ''].filter(Boolean).join('\n'),
      });
      continue;
    }

    if (node.kind === 'turn-error') {
      const b = ensureBucket(node.seq, node.time);
      b.hasError = true;
      appendAssistantText(b, `[Error] ${node.message}`);
    }
  }

  if (partial || runningCalls.length > 0 || sessionSnap?.running) {
    const b = ensureBucket(Date.now(), Date.now(), tr('（执行中…）', '(Running…)'));
    b.streaming = true;
    if (partial) {
      const pText = extractAssistantText(partial.blocks);
      if (pText) appendAssistantText(b, pText);
      const pReason = extractAssistantReasoning(partial.blocks);
      if (pReason) {
        b.microSteps.push({
          id: `partial-think-${partial.turn}-${partial.step}`,
          kind: 'thinking',
          title: tr('实时思考中', 'Thinking…'),
          duration: 'live',
          status: 'running',
          detail: pReason,
        });
      }
    }
    runningCalls.forEach((rc) => {
      b.microSteps.push(runningToolToStep(rc));
    });
  }

  return finalizeBuckets(sessionId, trackPrefix, buckets, pinnedSet, mergeTargetMap);
}

/**
 * Raw session-event fallback parser for DSH 0.2.x SessionController feeds
 * (`entries` / `events` arrays where each entry is a SessionEventLikeEntry).
 */
function buildFromRawEntries(
  sessionId: string,
  trackPrefix: string,
  sources: readonly (unknown | undefined)[],
  pinnedSet: ReadonlySet<string>,
  mergeTargetMap: ReadonlyMap<string, { trackTitle: string; summary: string }>,
): ChronoNode[] {
  let rawList: readonly Record<string, unknown>[] = [];
  for (const src of sources) {
    if (!src || typeof src !== 'object') continue;
    const rec = src as Record<string, unknown>;
    if (Array.isArray(rec.entries) && rec.entries.length > 0) {
      rawList = rec.entries as Record<string, unknown>[];
      break;
    }
    if (Array.isArray(rec.events) && rec.events.length > 0) {
      rawList = rec.events as Record<string, unknown>[];
      break;
    }
  }
  if (rawList.length === 0) return [];

  const buckets: TurnBucket[] = [];
  let current: TurnBucket | null = null;
  const ensureBucket = (seq: number, time: number, fallbackUser = tr('（会话延续）', '(Continued)')): TurnBucket => {
    if (!current) {
      current = {
        turnNumber: buckets.length + 1,
        userSeq: seq,
        userTime: time,
        userText: fallbackUser,
        assistantTexts: [],
        aiSegments: [],
        microSteps: [],
        choices: [],
        filesChanged: 0,
        hasError: false,
        streaming: false,
      };
      buckets.push(current);
    }
    return current;
  };

  for (let i = 0; i < rawList.length; i++) {
    const entry = rawList[i];
    if (!entry || typeof entry !== 'object') continue;
    const payload = (entry.event && typeof entry.event === 'object' ? entry.event : entry) as Record<string, unknown>;
    const kind = String(payload.type ?? payload.kind ?? entry.type ?? entry.kind ?? '');
    const seq =
      typeof entry.seq === 'number'
        ? entry.seq
        : typeof payload.seq === 'number'
          ? payload.seq
          : i + 1;
    const time =
      typeof entry.time === 'number'
        ? entry.time
        : typeof payload.time === 'number'
          ? payload.time
          : typeof entry.ts === 'number'
            ? entry.ts
            : Date.now();

    if (kind === 'user' || kind === 'user_message' || kind === 'user-message' || kind === 'steering' || kind === 'prompt') {
      const text =
        extractTextFromContent(payload.content ?? payload.parts ?? payload.text ?? payload.message) ||
        tr('（图片或附件消息）', '(Image or attachment)');
      current = {
        turnNumber: buckets.length + 1,
        userSeq: seq,
        userTime: time,
        userText: text,
        assistantTexts: [],
        aiSegments: [],
        microSteps: [],
        choices: [],
        filesChanged: 0,
        hasError: false,
        streaming: false,
      };
      buckets.push(current);
      continue;
    }

    if (
      kind === 'assistant' ||
      kind === 'assistant_message' ||
      kind === 'assistant-message' ||
      kind === 'assistant-step' ||
      kind === 'step_complete' ||
      kind === 'model_response'
    ) {
      const b = ensureBucket(seq, time);
      const blocks = Array.isArray(payload.blocks) ? (payload.blocks as AssistantBlock[]) : undefined;
      const text = blocks
        ? extractAssistantText(blocks)
        : extractTextFromContent(payload.content ?? payload.text ?? payload.message);
      if (text) appendAssistantText(b, text);
      const reasoning = blocks
        ? extractAssistantReasoning(blocks)
        : typeof payload.reasoning === 'string'
          ? payload.reasoning
          : '';
      if (reasoning) {
        b.microSteps.push({
          id: `think-raw-${seq}`,
          kind: 'thinking',
          title: tr('思考推理', 'Reasoning'),
          status: 'success',
          detail: reasoning,
        });
      }
      b.closingSeq = seq;
      continue;
    }

    if (kind === 'tool-result' || kind === 'tool_result' || kind === 'tool-call' || kind === 'tool_call') {
      const b = ensureBucket(seq, time);
      const toolName = String(
        (payload.call as { name?: string } | undefined)?.name ?? payload.name ?? payload.toolName ?? 'tool',
      );
      const output = extractTextFromContent(payload.content ?? payload.output ?? payload.result);
      const argsRaw =
        typeof (payload.call as { argsRaw?: string } | undefined)?.argsRaw === 'string'
          ? (payload.call as { argsRaw: string }).argsRaw
          : typeof payload.argsRaw === 'string'
            ? payload.argsRaw
            : payload.args && typeof payload.args === 'object'
              ? JSON.stringify(payload.args)
              : undefined;
      const rawChoices = parseToolChoices({
        idPrefix: `tool-raw-${seq}`,
        toolName,
        argsRaw,
        resultText: output,
        isRunning: kind === 'tool-call' || kind === 'tool_call',
        isError: Boolean(payload.isError),
      });
      if (rawChoices.length > 0) appendChoices(b, rawChoices);
      b.microSteps.push({
        id: `tool-raw-${seq}`,
        kind: classifyToolKind(toolName),
        title: toolName,
        status: payload.isError ? 'error' : 'success',
        detail: output || undefined,
      });
      if (classifyToolKind(toolName) === 'file-diff') b.filesChanged += 1;
    }
  }

  return finalizeBuckets(sessionId, trackPrefix, buckets, pinnedSet, mergeTargetMap);
}

function attachPendingChoices(
  nodes: ChronoNode[],
  sessionSnap: ConversationSnapshot | undefined,
): ChronoNode[] {
  const pendingChoices = extractPendingChoices(sessionSnap);
  if (pendingChoices.length === 0 || nodes.length === 0) return nodes;
  const last = nodes[nodes.length - 1];
  const existing = last.choices ?? [];
  const existingQs = new Set(existing.map((c) => c.question));
  const added = pendingChoices.filter((c) => !existingQs.has(c.question));
  if (added.length === 0) return nodes;
  const baseSegments: AssistantSegment[] = last.aiSegments
    ? [...last.aiSegments]
    : last.aiFullText
      ? [{ kind: 'markdown', id: `${last.id}-md`, text: last.aiFullText }]
      : [];
  const nextSegments: AssistantSegment[] = [
    ...baseSegments,
    ...added.map((c): AssistantSegment => ({ kind: 'choice', id: c.id, choice: c })),
  ];
  const next = [...nodes];
  next[next.length - 1] = {
    ...last,
    status: 'waiting-approval',
    choices: [...existing, ...added],
    aiSegments: nextSegments,
  };
  return next;
}

function buildNodesForSession(
  sessionId: string,
  trackPrefix: string,
  chatSnap: ChatSnapshotLike | undefined,
  convSnap: ConversationStateLike | undefined,
  sessionSnap: ConversationSnapshot | undefined,
  pinnedSet: ReadonlySet<string>,
  mergeTargetMap: ReadonlyMap<string, { trackTitle: string; summary: string }>,
): ChronoNode[] {
  const resolvedChat = resolveChatSnapshot(chatSnap, convSnap, sessionSnap);
  const fromChat = buildFromChatStore(sessionId, trackPrefix, resolvedChat, sessionSnap, pinnedSet, mergeTargetMap);
  if (fromChat.length > 0) return attachPendingChoices(fromChat, sessionSnap);
  const fromLegacy = buildFromLegacyNodes(sessionId, trackPrefix, resolvedChat, sessionSnap, pinnedSet, mergeTargetMap);
  if (fromLegacy.length > 0) return attachPendingChoices(fromLegacy, sessionSnap);
  return attachPendingChoices(
    buildFromRawEntries(
      sessionId,
      trackPrefix,
      [chatSnap, convSnap, sessionSnap, resolvedChat],
      pinnedSet,
      mergeTargetMap,
    ),
    sessionSnap,
  );
}

function getEffectiveParentId(
  sid: SessionId,
  byId: Record<SessionId, SessionSummary>,
  meta: ChronoMetaSnapshot,
): SessionId | undefined {
  const nativeParent = byId[sid]?.parentId;
  if (nativeParent && byId[nativeParent]) return nativeParent;
  const metaParent = meta.trackMeta[sid]?.forkParentId as SessionId | undefined;
  if (metaParent && byId[metaParent]) return metaParent;
  return undefined;
}

function findRootSessionId(
  currentId: SessionId,
  byId: Record<SessionId, SessionSummary>,
  meta: ChronoMetaSnapshot,
): SessionId {
  let cursor: SessionId = currentId;
  const visited = new Set<string>([cursor]);
  for (let i = 0; i < 32; i++) {
    const parent = getEffectiveParentId(cursor, byId, meta);
    if (!parent || !byId[parent] || visited.has(parent)) break;
    visited.add(parent);
    cursor = parent;
  }
  return cursor;
}

/**
 * Compute all session IDs in the connected timeline group containing `sessionId`.
 * Edges are undirected across BOTH:
 * 1. Native DSH fork parent/child links (`parentId` / `forkParentId`) — default linked!
 * 2. User-configured manual workspace links (`meta.linkGroups`).
 */
export function computeLinkedComponentIds(params: {
  readonly sessionId: SessionId;
  readonly byId: Record<SessionId, SessionSummary>;
  readonly meta: ChronoMetaSnapshot;
}): {
  readonly componentIds: readonly SessionId[];
  readonly forkFamilySet: ReadonlySet<string>;
} {
  const { sessionId, byId, meta } = params;
  const allSummaries = Object.values(byId);

  const forkAdj = new Map<string, Set<string>>();
  const addEdge = (map: Map<string, Set<string>>, a: string, b: string) => {
    if (!a || !b || a === b) return;
    let sa = map.get(a);
    if (!sa) {
      sa = new Set();
      map.set(a, sa);
    }
    sa.add(b);
    let sb = map.get(b);
    if (!sb) {
      sb = new Set();
      map.set(b, sb);
    }
    sb.add(a);
  };

  for (const s of allSummaries) {
    if (!s?.id) continue;
    const parent = getEffectiveParentId(s.id, byId, meta);
    if (parent) addEdge(forkAdj, s.id, parent);
  }

  // Fork-only family containing `sessionId` (used to tag "分支默认关联" in the workspace link picker)
  const forkFamilySet = new Set<string>([sessionId]);
  const forkQueue: string[] = [sessionId];
  while (forkQueue.length > 0) {
    const cur = forkQueue.shift()!;
    const neighbors = forkAdj.get(cur);
    if (!neighbors) continue;
    for (const next of neighbors) {
      if (!forkFamilySet.has(next)) {
        forkFamilySet.add(next);
        forkQueue.push(next);
      }
    }
  }

  // Full adjacency = fork edges + manual workspace link groups
  const fullAdj = new Map<string, Set<string>>();
  forkAdj.forEach((neighbors, key) => {
    fullAdj.set(key, new Set(neighbors));
  });

  for (const grp of meta.linkGroups) {
    const valid = grp.filter((id) => id === sessionId || Boolean(byId[id as SessionId]));
    for (let i = 1; i < valid.length; i++) {
      addEdge(fullAdj, valid[0], valid[i]);
    }
  }

  const visited = new Set<string>([sessionId]);
  const queue: string[] = [sessionId];
  while (queue.length > 0) {
    const cur = queue.shift()!;
    const neighbors = fullAdj.get(cur);
    if (!neighbors) continue;
    for (const next of neighbors) {
      if (!visited.has(next) && (next === sessionId || Boolean(byId[next as SessionId]))) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  // Order deterministically: group by independent fork-tree roots sorted stably so switching between linked peers doesn't jump rows
  const memberIds = Array.from(visited) as SessionId[];
  const treeRoots = new Set<SessionId>();
  for (const sid of memberIds) {
    treeRoots.add(findRootSessionId(sid, byId, meta));
  }

  const sortedRoots = Array.from(treeRoots).sort((a, b) => {
    const sa = byId[a];
    const sb = byId[b];
    const ca = (sa as { createdAt?: number } | undefined)?.createdAt ?? sa?.updatedAt ?? 0;
    const cb = (sb as { createdAt?: number } | undefined)?.createdAt ?? sb?.updatedAt ?? 0;
    if (ca !== cb) return ca - cb;
    return a.localeCompare(b);
  });

  const childrenMap = new Map<string, SessionId[]>();
  for (const sid of memberIds) {
    const parent = getEffectiveParentId(sid, byId, meta);
    if (parent && visited.has(parent)) {
      const list = childrenMap.get(parent) ?? [];
      list.push(sid);
      childrenMap.set(parent, list);
    }
  }
  childrenMap.forEach((list) => {
    list.sort((a, b) => {
      const ca = (byId[a] as { createdAt?: number } | undefined)?.createdAt ?? byId[a]?.updatedAt ?? 0;
      const cb = (byId[b] as { createdAt?: number } | undefined)?.createdAt ?? byId[b]?.updatedAt ?? 0;
      if (ca !== cb) return ca - cb;
      return a.localeCompare(b);
    });
  });

  const ordered: SessionId[] = [];
  const emitted = new Set<string>();
  const dfs = (sid: SessionId) => {
    if (emitted.has(sid)) return;
    emitted.add(sid);
    ordered.push(sid);
    for (const child of childrenMap.get(sid) ?? []) {
      dfs(child);
    }
  };
  for (const root of sortedRoots) {
    dfs(root);
  }
  for (const sid of memberIds) {
    if (!emitted.has(sid)) dfs(sid);
  }

  return { componentIds: ordered, forkFamilySet };
}

export function buildDshChronoGraph(params: {
  readonly sessionId: SessionId;
  readonly currentSnapshot: ConversationSnapshot | undefined;
  readonly currentConversation: ConversationStateLike | undefined;
  readonly currentChat: ChatSnapshotLike | undefined;
  readonly listState: SessionListState | undefined;
  readonly sessionsApi: ISessions;
  readonly uiConversationApi?: {
    readonly binding?: (
      sid: SessionId,
    ) =>
      | {
          readonly getSnapshot?: () => ConversationStateLike | undefined;
          readonly view?: (id: string) => unknown;
        }
      | undefined;
  };
  readonly snapshotCache: ReadonlyMap<string, CachedSessionData>;
  readonly meta: ChronoMetaSnapshot;
  readonly locale?: ChronoLocale;
}): ChronoGraph {
  const {
    sessionId,
    currentSnapshot,
    currentConversation,
    currentChat,
    listState,
    sessionsApi,
    uiConversationApi,
    snapshotCache,
    meta,
    locale = 'zh',
  } = params;
  activeAdapterLocale = locale;
  const msg = getChronoMessages(locale);
  const byId: Record<SessionId, SessionSummary> = (listState?.byId ?? {}) as Record<SessionId, SessionSummary>;
  const subagentsByParent = listState?.subagentsByParent ?? ({} as SessionListState['subagentsByParent']);

  const { componentIds, forkFamilySet } = computeLinkedComponentIds({ sessionId, byId, meta });
  const componentSet = new Set<string>(componentIds);

  const primaryRootId = componentIds[0] ?? (byId[sessionId] ? findRootSessionId(sessionId, byId, meta) : sessionId);

  const pinnedSet = new Set(meta.pinnedNodeIds);
  const mergeTargetMap = new Map<string, { trackTitle: string; summary: string }>();
  meta.mergeLinks.forEach((ml) => {
    const srcTitle = byId[ml.sourceTrackId as SessionId]?.displayTitle ?? msg.defaultBranchTitle;
    mergeTargetMap.set(ml.targetNodeId, { trackTitle: srcTitle, summary: ml.summary });
  });

  const tracks: Record<string, ChronoTrack> = {};
  const nodes: Record<string, ChronoNode> = {};
  const nodesBySession = new Map<string, ChronoNode[]>();
  let branchColorIdx = 0;
  let peerIndex = 0;
  let branchIndex = 0;

  componentIds.forEach((sid) => {
    const summary = byId[sid];
    const cached = snapshotCache.get(sid);
    const savedMeta = meta.trackMeta[sid];

    let sessionSnap: ConversationSnapshot | undefined;
    let convSnap: ConversationStateLike | undefined;
    let chatSnap: ChatSnapshotLike | undefined;

    if (sid === sessionId) {
      sessionSnap = currentSnapshot ?? cached?.session;
      convSnap = currentConversation ?? cached?.conversation;
      chatSnap = currentChat ?? cached?.chat;
    } else {
      try {
        const live = sessionsApi?.binding?.(sid)?.session?.getSnapshot?.();
        sessionSnap = live ?? cached?.session;
      } catch {
        sessionSnap = cached?.session;
      }
      try {
        const uiBinding = uiConversationApi?.binding?.(sid);
        const uiSnap = typeof uiBinding?.getSnapshot === 'function' ? uiBinding.getSnapshot() : undefined;
        const uiChat =
          typeof uiBinding?.view === 'function' ? (uiBinding.view('chat') as ChatSnapshotLike | undefined) : undefined;
        convSnap = uiSnap ?? cached?.conversation;
        chatSnap = uiChat ?? cached?.chat ?? sessionSnap?.chat;
      } catch {
        convSnap = cached?.conversation;
        chatSnap = cached?.chat ?? sessionSnap?.chat;
      }
    }

    const effectiveParentId = getEffectiveParentId(sid, byId, meta);
    const hasParentInGraph = Boolean(effectiveParentId && componentSet.has(effectiveParentId));
    const isPrimaryRoot = sid === primaryRootId;
    const isSubagent = summary?.origin === 'subagent';
    const isLinkedPeerRoot = !isPrimaryRoot && !hasParentInGraph && !isSubagent;
    const isManualPeer = !forkFamilySet.has(sid);

    let prefix: string;
    if (isPrimaryRoot) {
      prefix = 'M';
    } else if (isSubagent) {
      prefix = 'A';
    } else if (isLinkedPeerRoot) {
      peerIndex += 1;
      prefix = `L${peerIndex}-`;
    } else {
      branchIndex += 1;
      prefix = `B${branchIndex}-`;
    }

    let builtNodes = buildNodesForSession(sid, prefix, chatSnap, convSnap, sessionSnap, pinnedSet, mergeTargetMap);

    // When a branch was forked from a parent node inside ChronoBranch, hide the inherited prefix turns
    // so the branch swimlane cleanly starts right after its fork point without duplicating parent history.
    let waitingForFirstForkPrompt = false;
    if (hasParentInGraph && savedMeta?.forkAtSeq !== undefined && builtNodes.length > 0) {
      const diverged = builtNodes.filter((n) => n.atSeq === undefined || n.atSeq > savedMeta.forkAtSeq!);
      if (diverged.length > 0) {
        builtNodes = diverged.map((n, i) => ({
          ...n,
          order: i + 1,
          turnLabel: `${prefix}${i + 1}`,
        }));
      } else {
        waitingForFirstForkPrompt = true;
        builtNodes = [];
      }
    }

    if (builtNodes.length === 0) {
      const isLoading = sessionSnap?.openState === 'loading';
      const isBlank = Boolean(summary?.blank || sessionSnap?.blank);
      if (waitingForFirstForkPrompt) {
        builtNodes = [
          {
            id: `${sid}:fork-starter`,
            trackId: sid,
            order: 1,
            turnLabel: 'NEW',
            title: msg.forkStarterTitle,
            timestamp: formatTime(summary?.updatedAt),
            status: 'idle',
            userText: msg.forkStarterUser,
            aiSummary: msg.forkStarterSummary,
            aiFullText: msg.forkStarterFull,
            microSteps: [],
            stats: { toolCount: 0, filesChanged: 0 },
            placeholder: false,
            forkStarter: true,
          },
        ];
      } else {
        builtNodes = [
          {
            id: `${sid}:placeholder`,
            trackId: sid,
            order: 1,
            turnLabel: `${prefix}1`,
            title: isLoading
              ? msg.loadingHistoryTitle
              : summary?.displayTitle ||
                (isPrimaryRoot
                  ? msg.defaultCurrentChat
                  : isLinkedPeerRoot
                    ? msg.defaultLinkedTitle
                    : msg.defaultBranchTitle),
            timestamp: formatTime(summary?.updatedAt),
            status: isLoading || summary?.running ? 'streaming' : 'idle',
            userText: isBlank
              ? msg.blankSessionUser
              : isLoading
                ? msg.loadingHistoryUser
                : msg.unhydratedUser,
            aiSummary: isBlank
              ? msg.blankSessionSummary
              : isLoading
                ? msg.loadingHistorySummary
                : msg.unhydratedSummary,
            aiFullText: isBlank ? msg.blankSessionFull : msg.unhydratedFull,
            microSteps: [],
            stats: { toolCount: 0, filesChanged: 0 },
            placeholder: !isBlank && !isLoading,
          },
        ];
      }
    }

    nodesBySession.set(sid, builtNodes);
    builtNodes.forEach((n) => {
      nodes[n.id] = n;
    });

    const color = isPrimaryRoot
      ? '#27272a'
      : isSubagent
        ? '#64748b'
        : RESTRAINED_BRANCH_PALETTE[branchColorIdx++ % RESTRAINED_BRANCH_PALETTE.length];

    tracks[sid] = {
      id: sid,
      kind: isPrimaryRoot
        ? 'main'
        : isSubagent
          ? 'agent-subagent'
          : isLinkedPeerRoot
            ? 'linked-peer'
            : 'human-branch',
      title:
        summary?.displayTitle ||
        (isPrimaryRoot ? msg.defaultMainTitle : isLinkedPeerRoot ? msg.defaultLinkedTitle : msg.defaultBranchTitle),
      status: savedMeta?.status ?? 'active',
      parentTrackId: hasParentInGraph ? effectiveParentId : undefined,
      forkFromNodeId: hasParentInGraph ? savedMeta?.forkFromNodeId : undefined,
      color,
      collapsed: savedMeta?.collapsed ?? false,
      running: Boolean(summary?.running || sessionSnap?.running),
      hydrated: builtNodes.some((n) => !n.placeholder),
      hasMore: sessionSnap?.hasMore,
      loadingOlder: sessionSnap?.loadingOlder,
      linkedPeer: isLinkedPeerRoot || isManualPeer,
    };
  });

  // Resolve fallback forkFromNodeId for branches forked outside ChronoBranch
  Object.values(tracks).forEach((t) => {
    if (t.id === primaryRootId || !t.parentTrackId) return;
    if (t.forkFromNodeId && nodes[t.forkFromNodeId]) return;
    const parentNodes = nodesBySession.get(t.parentTrackId);
    if (parentNodes && parentNodes.length > 0) {
      tracks[t.id] = {
        ...t,
        forkFromNodeId: parentNodes[Math.min(parentNodes.length - 1, Math.max(0, parentNodes.length - 2))].id,
      };
    }
  });

  // Include subagent catalog rows reported under any session in the connected component
  componentIds.forEach((parentSid) => {
    const catalog = subagentsByParent?.[parentSid];
    if (!catalog || !('items' in catalog) || !Array.isArray((catalog as { items?: unknown[] }).items)) return;
    const items = (catalog as { items: Array<{ sessionId?: string; id?: string; title?: string; running?: boolean }> }).items;
    const parentNodes = nodesBySession.get(parentSid);
    const anchorNodeId = parentNodes && parentNodes.length > 0 ? parentNodes[parentNodes.length - 1].id : undefined;

    items.forEach((item, idx) => {
      const subId = item.sessionId ?? item.id;
      if (!subId || tracks[subId]) return;
      const subCached = snapshotCache.get(subId);
      const subNodes =
        subCached && (subCached.chat || subCached.conversation || subCached.session)
          ? buildNodesForSession(
              subId,
              `S${idx + 1}-`,
              subCached.chat,
              subCached.conversation,
              subCached.session,
              pinnedSet,
              mergeTargetMap,
            )
          : [
              {
                id: `${subId}:placeholder`,
                trackId: subId,
                order: 1,
                turnLabel: `S${idx + 1}`,
                title: item.title || `Subagent ${idx + 1}`,
                timestamp: '--:--',
                status: item.running ? ('streaming' as const) : ('completed' as const),
                userText: msg.subagentUser,
                aiSummary: item.running ? msg.subagentRunning : msg.subagentDoneSummary,
                aiFullText: item.running ? msg.subagentRunning : msg.subagentDoneFull,
                microSteps: [],
                stats: { toolCount: 0, filesChanged: 0 },
                placeholder: true,
              },
            ];

      subNodes.forEach((n) => {
        nodes[n.id] = n;
      });

      tracks[subId] = {
        id: subId,
        kind: 'agent-subagent',
        title: item.title || `Subagent ${idx + 1}`,
        status: 'adopted',
        parentTrackId: parentSid,
        forkFromNodeId: anchorNodeId,
        color: '#64748b',
        collapsed: false,
        running: Boolean(item.running),
        hydrated: Boolean(subCached),
      };
    });
  });

  const relevantMerges = meta.mergeLinks.filter(
    (ml) => Boolean(nodes[ml.sourceNodeId]) && Boolean(nodes[ml.targetNodeId]),
  );

  return {
    rootTrackId: primaryRootId,
    activeTrackId: sessionId,
    tracks,
    nodes,
    mergeLinks: relevantMerges,
    capabilities: {
      canSend: true,
      canFork: true,
      canStop: true,
      canMerge: true,
      canLoadOlder: true,
      canSwitchSession: true,
    },
  };
}
