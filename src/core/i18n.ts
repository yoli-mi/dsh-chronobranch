/**
 * Bilingual internationalization dictionary (`zh` / `en`) for ChronoBranch.
 * Automatically follows DeepSeek Harness's active locale (`ctx.locale` / `document.documentElement.lang`).
 */

export type ChronoLocale = 'zh' | 'en';

export function resolveChronoLocale(raw: string | null | undefined): ChronoLocale {
  if (!raw) return 'zh';
  return raw.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export interface ChronoMessages {
  readonly tabLabel: string;
  readonly errorTitle: string;

  // Shortcuts (DSH Settings -> Shortcuts)
  readonly scToggleExpand: string;
  readonly scForkNode: string;
  readonly scToggleMicro: string;
  readonly scPinTile: string;
  readonly scZoomL1: string;
  readonly scZoomL2: string;
  readonly scZoomL3: string;
  readonly scNotSet: string;

  // Top HUD
  readonly linearChat: string;
  readonly linearChatTip: string;
  readonly zoomL1: string;
  readonly zoomL1Tip: string;
  readonly zoomL2: string;
  readonly zoomL2Tip: string;
  readonly zoomL3: string;
  readonly zoomL3Tip: string;
  readonly fitViewTip: string;
  readonly searchPlaceholder: string;
  readonly linkChats: string;
  readonly linkChatsTip: string;
  readonly subagents: string;
  readonly subagentsTip: string;
  readonly hideDeadEnds: string;
  readonly hideDeadEndsTip: string;

  // Track headers & tags
  readonly trackMain: string;
  readonly trackLinked: string;
  readonly trackSubagent: string;
  readonly trackAdopted: string;
  readonly trackDeadEnd: string;
  readonly trackBranch: string;
  readonly loadOlder: string;
  readonly loading: string;
  readonly unlink: string;
  readonly unlinkTip: string;
  readonly cherryPick: string;
  readonly cherryPickTip: string;
  readonly fold: string;
  readonly foldTip: string;
  readonly collapsedTrack: (title: string, count: number) => string;

  // Nodes & expanded dialog sheet
  readonly dotTip: string;
  readonly pinImportantTip: string;
  readonly pinnedTag: string;
  readonly pinnedTagTip: string;
  readonly forkOriginTag: string;
  readonly tile: string;
  readonly tileTip: string;
  readonly expand: string;
  readonly expandTip: string;
  readonly collapse: string;
  readonly collapseTip: string;
  readonly fork: string;
  readonly forking: string;
  readonly forkTip: string;
  readonly microAxis: string;
  readonly microAxisTip: string;
  readonly microAxisHead: string;
  readonly streaming: string;
  readonly mergedFrom: (title: string) => string;
  readonly mergedShort: (title: string) => string;
  readonly resizeETip: string;
  readonly resizeSTip: string;
  readonly resizeSETip: string;
  readonly copy: string;
  readonly copied: string;
  readonly pendingForkBadge: string;
  readonly pendingForkTitle: string;
  readonly pendingForkSummary: (turnLabel: string) => string;

  // Agent Choice Cards
  readonly agentChoiceTitle: (header?: string) => string;
  readonly choiceWaiting: string;
  readonly choiceAnswered: string;
  readonly choiceCancelled: string;
  readonly choiceInterrupted: string;
  readonly choiceCustomAnswer: string;
  readonly choiceWaitingHint: string;

  // Composer dock (native bottom composer integration)
  readonly dockInputTarget: string;
  readonly dockActiveTip: (title: string) => string;
  readonly dockSwitchTip: (title: string) => string;
  readonly dockForkedPrefix: string;
  readonly dockForkedSuffix: string;
  readonly dockBackToSource: string;

  // Standalone composer fallback
  readonly standaloneForkPrefix: string;
  readonly standaloneContinueAfter: (turnLabel: string) => string;
  readonly standaloneStartNew: string;
  readonly standaloneCancelFork: string;
  readonly standaloneForkPlaceholder: (turnLabel: string) => string;
  readonly standaloneSendPlaceholder: (title: string) => string;
  readonly stop: string;
  readonly stopTip: string;
  readonly send: string;
  readonly sending: string;

  // Inspector drawer
  readonly inspectorMergeTitle: string;
  readonly inspectorTurnMeta: (turnLabel: string, title: string, duration?: string) => string;
  readonly inspectorEmpty: string;
  readonly inspectorMergeRole: string;

  // Cherry-pick modal
  readonly cherryModalTitle: string;
  readonly cherrySourceLabel: string;
  readonly cherryInjectLabel: string;
  readonly cherryDesc: string;
  readonly cherryCancel: string;
  readonly cherryConfirm: string;
  readonly cherryDefaultSummary: (title: string, excerpt: string) => string;
  readonly cherryFallbackExcerpt: string;
  readonly cherryMergePill: string;

  // Workspace Timeline Linking Modal
  readonly linkModalTitle: string;
  readonly linkModalDesc: string;
  readonly linkSearchPlaceholder: string;
  readonly linkCurrent: string;
  readonly linkDefaultFork: string;
  readonly linkManual: string;
  readonly linkClickToAdd: string;
  readonly linkEmpty: string;
  readonly linkGroupCount: (count: number) => string;
  readonly done: string;

  // Magnetic Tiles
  readonly tileAiOnly: string;
  readonly tileFull: string;
  readonly tileAiOnlyTip: string;
  readonly tileFullTip: string;
  readonly tilePopOutTip: string;
  readonly tileLocateTip: string;
  readonly tileArrangeTip: string;
  readonly tileMinimizeTip: string;
  readonly tileRestoreTip: string;
  readonly tileCloseTip: string;
  readonly tileResizeETip: string;
  readonly tileResizeSTip: string;
  readonly tileResizeSETip: string;
  readonly tilePopOutBlocked: string;
  readonly tilePopOutFailed: string;

  // Adapter defaults & placeholders
  readonly defaultMainTitle: string;
  readonly defaultBranchTitle: string;
  readonly defaultLinkedTitle: string;
  readonly defaultUntitled: string;
  readonly defaultCurrentChat: string;
  readonly noTextOutput: string;
  readonly codeSnippetTag: string;
  readonly reasoningStepTitle: string;
  readonly forkStarterTitle: string;
  readonly forkStarterUser: string;
  readonly forkStarterSummary: string;
  readonly forkStarterFull: string;
  readonly loadingHistoryTitle: string;
  readonly loadingHistoryUser: string;
  readonly loadingHistorySummary: string;
  readonly blankSessionUser: string;
  readonly blankSessionSummary: string;
  readonly blankSessionFull: string;
  readonly unhydratedUser: string;
  readonly unhydratedSummary: string;
  readonly unhydratedFull: string;
  readonly subagentUser: string;
  readonly subagentRunning: string;
  readonly subagentDoneSummary: string;
  readonly subagentDoneFull: string;

  // Toasts & Errors
  readonly toastSwitchedTarget: (title: string) => string;
  readonly toastLocated: (turnLabel: string, title: string) => string;
  readonly toastNoMicroSteps: string;
  readonly toastLoadingBeforeFork: string;
  readonly toastForkReadyFocus: string;
  readonly toastForkUnsupported: string;
  readonly toastWaitForTurn: string;
  readonly toastForkCreated: (turnLabel: string) => string;
  readonly toastForkFailed: (msg: string) => string;
  readonly toastForkPending: (turnLabel: string) => string;
  readonly toastLoadingBeforeTile: string;
  readonly toastTilePinned: (turnLabel: string) => string;
  readonly toastTileUnpinned: (turnLabel: string) => string;
  readonly toastMerged: string;
  readonly toastMergeFailed: (msg: string) => string;
  readonly toastSendFailed: (msg: string) => string;
  readonly toastForkSent: string;
  readonly toastUnlinked: (title: string) => string;
  readonly errSessionNotReady: string;
  readonly errSendRejected: string;
  readonly errMergeSendFailed: string;
}

const ZH: ChronoMessages = {
  tabLabel: '时间线',
  errorTitle: 'ChronoBranch 渲染遇到异常',

  scToggleExpand: '时间线 · 展开 / 收起完整对话',
  scForkNode: '时间线 · 从选中节点拉出分支',
  scToggleMicro: '时间线 · 展开 / 收起微观小轴',
  scPinTile: '时间线 · 悬挂为屏幕磁贴',
  scZoomL1: '时间线 · 鸟瞰视图 (L1)',
  scZoomL2: '时间线 · 点线视图 (L2)',
  scZoomL3: '时间线 · 展开视图 (L3)',
  scNotSet: '未设置',

  linearChat: '线性对话',
  linearChatTip: '切回原生线性对话框',
  zoomL1: '鸟瞰',
  zoomL1Tip: 'L1 极简点线鸟瞰',
  zoomL2: '点线',
  zoomL2Tip: 'L2 点线平衡阅读',
  zoomL3: '展开',
  zoomL3Tip: 'L3 展开完整对话',
  fitViewTip: '自适应全览画布',
  searchPlaceholder: '搜索节点或代码...',
  linkChats: '关联对话',
  linkChatsTip: '关联同一工作区下的任意对话，点开其中任一对话的时间线均可查看全部',
  subagents: 'Agent 派生',
  subagentsTip: '显示或隐藏 Agent 派生泳道',
  hideDeadEnds: '隐死胡同',
  hideDeadEndsTip: '隐藏已折叠的死胡同分支',

  trackMain: '主线',
  trackLinked: '已关联',
  trackSubagent: 'Agent 派生',
  trackAdopted: '已采纳',
  trackDeadEnd: '死胡同',
  trackBranch: '分支',
  loadOlder: '加载更早',
  loading: '加载中…',
  unlink: '断开',
  unlinkTip: '取消此对话的时间线关联',
  cherryPick: '回流',
  cherryPickTip: '提炼结论回流主线',
  fold: '折叠',
  foldTip: '折叠为细虚线',
  collapsedTrack: (title, count) => `${title} · 已折叠 (${count} 轮 · 点击展开)`,

  dotTip: '单击选中 / 双击展开完整对话 / Shift+点击贴为屏幕磁贴',
  pinImportantTip: '标记/取消重点',
  pinnedTag: '已贴',
  pinnedTagTip: '已悬挂为屏幕磁贴',
  forkOriginTag: '分叉点',
  tile: '磁贴',
  tileTip: '悬挂为屏幕磁贴，切换对话/模式不消失',
  expand: '展开',
  expandTip: '展开完整对话',
  collapse: '收起',
  collapseTip: '收起为点线态',
  fork: '分叉',
  forking: '分叉中…',
  forkTip: '从此处拉出新分支时间线',
  microAxis: '微观小轴',
  microAxisTip: '展开/收起微观执行小轴',
  microAxisHead: '微观执行小轴 · 点击查看 Diff / 日志',
  streaming: '生成中…',
  mergedFrom: (title) => `已吸收回流：${title}`,
  mergedShort: (title) => `已吸收：${title}`,
  resizeETip: '向右拖动调整宽度',
  resizeSTip: '向下拖动调整高度',
  resizeSETip: '拖动自由调整大小（双击恢复默认尺寸）',
  copy: '复制',
  copied: '已复制',
  pendingForkBadge: '待发送',
  pendingForkTitle: '新分支起点',
  pendingForkSummary: (turnLabel) =>
    `分叉自 ${turnLabel}（完整继承至此节点前缀上下文）。在下方输入首条问题发送即刻生成新泳道。`,

  agentChoiceTitle: (header) => (header ? `Agent 选择 · ${header}` : 'Agent 选择'),
  choiceWaiting: '等待选择',
  choiceAnswered: '已回答',
  choiceCancelled: '已取消',
  choiceInterrupted: '已中断',
  choiceCustomAnswer: '自定义回答',
  choiceWaitingHint: '请切回「对话」视图或底部交互栏完成本次选择',

  dockInputTarget: '输入目标',
  dockActiveTip: (title) => `当前底部输入框正在发送到「${title}」`,
  dockSwitchTip: (title) => `点击切换发送目标至「${title}」`,
  dockForkedPrefix: '已从',
  dockForkedSuffix: '分叉 · 请直接在下方输入框发送首条消息',
  dockBackToSource: '切回原对话',

  standaloneForkPrefix: '从',
  standaloneContinueAfter: (turnLabel) => `· ${turnLabel} 后继续`,
  standaloneStartNew: '· 开始新对话',
  standaloneCancelFork: '取消分叉 (Esc)',
  standaloneForkPlaceholder: (turnLabel) => `输入新分支首条消息（原生 fork 继承至 ${turnLabel}）...`,
  standaloneSendPlaceholder: (title) => `在「${title}」继续对话（Enter 发送，支持 / 斜杠命令）...`,
  stop: '停止',
  stopTip: '停止当前生成',
  send: '发送',
  sending: '发送中',

  inspectorMergeTitle: 'Cherry-pick 回流摘要',
  inspectorTurnMeta: (turnLabel, title, duration) =>
    `轮次：${turnLabel} · ${title}${duration ? ` · ${duration}` : ''}`,
  inspectorEmpty: '（无详细输出）',
  inspectorMergeRole: '提炼并注入主线的结论上下文',

  cherryModalTitle: 'Cherry-pick · 提炼分支结论回流父线',
  cherrySourceLabel: '来源分支：',
  cherryInjectLabel: '→ 将注入',
  cherryDesc: '编辑提炼后的结论摘要，确认后将发送至目标会话并在画布上生成回流连线：',
  cherryCancel: '取消',
  cherryConfirm: '确认回流',
  cherryDefaultSummary: (title, excerpt) => `【来自「${title}」的提炼结论】\n${excerpt}`,
  cherryFallbackExcerpt: '已完成支线探索与验证，核心结论确认可行，请结合主线上下文继续推进。',
  cherryMergePill: 'Cherry-pick 回流',

  linkModalTitle: '工作区时间线关联',
  linkModalDesc:
    '勾选同一工作区下的任意对话进行时间线关联。打开其中任意一个对话的时间线，均可同时查看全部已关联的时间线；分支对话默认与原对话关联。',
  linkSearchPlaceholder: '筛选当前工作区下的对话...',
  linkCurrent: '当前对话',
  linkDefaultFork: '分支默认关联',
  linkManual: '已关联',
  linkClickToAdd: '点击关联',
  linkEmpty: '当前工作区下暂无其他可关联的对话',
  linkGroupCount: (count) => `当前时间线组共 ${count} 段对话`,
  done: '完成',

  tileAiOnly: '仅AI',
  tileFull: '完整',
  tileAiOnlyTip: '当前仅显示 AI 回复，点击恢复完整对话',
  tileFullTip: '当前显示完整对话，点击切换为仅看 AI 回复',
  tilePopOutTip: '弹出到电脑桌面独立置顶显示（无边框、不占任务栏，最小化 DSH 仍保留）',
  tileLocateTip: '跳回该对话所在的时间线节点',
  tileArrangeTip: '将多张磁贴整齐并排，方便对照',
  tileMinimizeTip: '折叠为标题条',
  tileRestoreTip: '展开磁贴',
  tileCloseTip: '关闭磁贴',
  tileResizeETip: '拖动调整宽度',
  tileResizeSTip: '拖动调整高度',
  tileResizeSETip: '拖动自由调整大小',
  tilePopOutBlocked: '当前环境未启用桌面置顶宿主服务，请重启 DSH 桌面端后重试（磁贴已保留在 DSH 内悬浮）。',
  tilePopOutFailed: '桌面置顶启动失败，磁贴已继续保留在 DSH 内部悬浮。',

  defaultMainTitle: '主线对话',
  defaultBranchTitle: '分支',
  defaultLinkedTitle: '关联对话',
  defaultUntitled: '未命名对话',
  defaultCurrentChat: '当前对话',
  noTextOutput: '（无文本输出）',
  codeSnippetTag: '[代码片段]',
  reasoningStepTitle: '思考推理',
  forkStarterTitle: '新分支起点',
  forkStarterUser: '已从父节点分叉并继承前缀上下文',
  forkStarterSummary: '请直接在底部输入框发送首条消息，将自动开启本分支的第一轮对话。',
  forkStarterFull: '已从父节点分叉并继承前缀上下文，请直接在底部输入框发送首条消息。',
  loadingHistoryTitle: '正在加载对话历史…',
  loadingHistoryUser: '正在从 DSH 本地日志加载轮次…',
  loadingHistorySummary: '历史消息加载完成后将自动按时间次序展开为点线。',
  blankSessionUser: '新会话（尚未发送首条消息）',
  blankSessionSummary: '可直接在下方输入框发送消息开始对话。',
  blankSessionFull: '新会话，发送消息后节点将自动出现。',
  unhydratedUser: '点击此节点加载该对话完整时间线',
  unhydratedSummary: '该对话历史尚未加载到本地视口，单击圆点即可加载并同时查看。',
  unhydratedFull: '单击加载完整对话历史。',
  subagentUser: '[Agent 自动派生任务]',
  subagentRunning: '子代理正在后台执行中…',
  subagentDoneSummary: '子代理已完成，点击可查看执行轨迹。',
  subagentDoneFull: '子代理已完成。',

  toastSwitchedTarget: (title) => `已切换发送目标至「${title}」`,
  toastLocated: (turnLabel, title) => `已定位至 ${turnLabel} · ${title}`,
  toastNoMicroSteps: '当前轮次没有工具调用或思考步骤',
  toastLoadingBeforeFork: '正在加载该对话历史，加载完成后即可分叉',
  toastForkReadyFocus: '已就绪，请直接在底部输入框发送新分支首条消息',
  toastForkUnsupported: '当前平台暂不支持直接分叉',
  toastWaitForTurn: '当前轮次正在生成中，请等待本轮完成后分叉或从上一轮分叉',
  toastForkCreated: (turnLabel) => `已从 ${turnLabel} 创建分支，请直接在底部输入框发送消息`,
  toastForkFailed: (msg) => `创建分支失败：${msg}`,
  toastForkPending: (turnLabel) => `准备从 ${turnLabel} 拉出新分支，输入并发送即可创建独立泳道`,
  toastLoadingBeforeTile: '正在加载该分支历史，加载完成后即可贴为磁贴',
  toastTilePinned: (turnLabel) => `已将 ${turnLabel} 贴为 DSH 磁贴（切换对话或模式仍保留在屏幕上，支持磁吸并排）`,
  toastTileUnpinned: (turnLabel) => `已取消磁贴「${turnLabel}」`,
  toastMerged: '已将分支结论注入父线上下文并建立回流连线',
  toastMergeFailed: (msg) => `回流失败：${msg}`,
  toastSendFailed: (msg) => `发送失败：${msg}`,
  toastForkSent: '已通过原生 fork 拉出新时间线分支',
  toastUnlinked: (title) => `已取消「${title}」的时间线关联`,
  errSessionNotReady: '目标会话尚未就绪，请稍候重试',
  errSendRejected: '发送消息被服务端拒绝',
  errMergeSendFailed: '回流消息发送失败',
};

const EN: ChronoMessages = {
  tabLabel: 'Timeline',
  errorTitle: 'ChronoBranch Render Error',

  scToggleExpand: 'Timeline · Expand / Collapse Turn',
  scForkNode: 'Timeline · Fork Branch from Selected Turn',
  scToggleMicro: 'Timeline · Toggle Execution Micro-Axis',
  scPinTile: 'Timeline · Pin Turn as Magnetic Tile',
  scZoomL1: 'Timeline · Overview Zoom (L1)',
  scZoomL2: 'Timeline · Dot-Line Zoom (L2)',
  scZoomL3: 'Timeline · Expanded Zoom (L3)',
  scNotSet: 'Unbound',

  linearChat: 'Linear Chat',
  linearChatTip: 'Switch back to native linear chat',
  zoomL1: 'Overview',
  zoomL1Tip: 'L1 Minimal Overview',
  zoomL2: 'Dot-Line',
  zoomL2Tip: 'L2 Balanced Dot-Line View',
  zoomL3: 'Expanded',
  zoomL3Tip: 'L3 Expanded Dialog View',
  fitViewTip: 'Fit canvas to view',
  searchPlaceholder: 'Search turns or code...',
  linkChats: 'Link Chats',
  linkChatsTip: 'Link conversations in the same workspace to view all of their timelines together',
  subagents: 'Subagents',
  subagentsTip: 'Show or hide Agent subagent swimlanes',
  hideDeadEnds: 'Hide Folded',
  hideDeadEndsTip: 'Hide folded dead-end branches',

  trackMain: 'Main',
  trackLinked: 'Linked',
  trackSubagent: 'Subagent',
  trackAdopted: 'Adopted',
  trackDeadEnd: 'Dead-End',
  trackBranch: 'Branch',
  loadOlder: 'Load Older',
  loading: 'Loading…',
  unlink: 'Unlink',
  unlinkTip: 'Unlink this conversation from the timeline group',
  cherryPick: 'Merge',
  cherryPickTip: 'Cherry-pick summary back to parent track',
  fold: 'Fold',
  foldTip: 'Fold branch into a subtle dashed line',
  collapsedTrack: (title, count) => `${title} · Folded (${count} ${count === 1 ? 'turn' : 'turns'} · Click to expand)`,

  dotTip: 'Click to select / Double-click to expand / Shift+Click to pin as tile',
  pinImportantTip: 'Toggle highlight pin',
  pinnedTag: 'Tiled',
  pinnedTagTip: 'Pinned as a floating magnetic tile',
  forkOriginTag: 'Fork',
  tile: 'Tile',
  tileTip: 'Pin as a floating magnetic tile that persists across tabs and chats',
  expand: 'Expand',
  expandTip: 'Expand full dialog',
  collapse: 'Collapse',
  collapseTip: 'Collapse to dot-line card',
  fork: 'Fork',
  forking: 'Forking…',
  forkTip: 'Fork a new branch timeline from this turn',
  microAxis: 'Micro-Axis',
  microAxisTip: 'Toggle execution micro-axis',
  microAxisHead: 'Execution Micro-Axis · Click a step for Diff / Logs',
  streaming: 'Streaming…',
  mergedFrom: (title) => `Merged from: ${title}`,
  mergedShort: (title) => `Merged: ${title}`,
  resizeETip: 'Drag right edge to resize width',
  resizeSTip: 'Drag bottom edge to resize height',
  resizeSETip: 'Drag corner to resize (double-click to reset)',
  copy: 'Copy',
  copied: 'Copied',
  pendingForkBadge: 'Pending',
  pendingForkTitle: 'New Branch Start',
  pendingForkSummary: (turnLabel) =>
    `Forked from ${turnLabel} (inherits all prior context). Send your first message below to start this branch.`,

  agentChoiceTitle: (header) => (header ? `Agent Choice · ${header}` : 'Agent Choice'),
  choiceWaiting: 'Waiting',
  choiceAnswered: 'Answered',
  choiceCancelled: 'Cancelled',
  choiceInterrupted: 'Interrupted',
  choiceCustomAnswer: 'Custom Answer',
  choiceWaitingHint: 'Switch to Chat view or use the bottom bar to respond',

  dockInputTarget: 'Target',
  dockActiveTip: (title) => `Bottom composer is currently targeting "${title}"`,
  dockSwitchTip: (title) => `Click to switch composer target to "${title}"`,
  dockForkedPrefix: 'Forked from',
  dockForkedSuffix: '· Send the first message in the composer below',
  dockBackToSource: 'Back to Source',

  standaloneForkPrefix: 'Fork from',
  standaloneContinueAfter: (turnLabel) => `· Continue after ${turnLabel}`,
  standaloneStartNew: '· Start new conversation',
  standaloneCancelFork: 'Cancel Fork (Esc)',
  standaloneForkPlaceholder: (turnLabel) => `Send first message on new branch (forked from ${turnLabel})...`,
  standaloneSendPlaceholder: (title) => `Continue in "${title}" (Enter to send, supports / commands)...`,
  stop: 'Stop',
  stopTip: 'Stop current generation',
  send: 'Send',
  sending: 'Sending',

  inspectorMergeTitle: 'Cherry-Pick Merge Summary',
  inspectorTurnMeta: (turnLabel, title, duration) =>
    `Turn: ${turnLabel} · ${title}${duration ? ` · ${duration}` : ''}`,
  inspectorEmpty: '(No detailed output)',
  inspectorMergeRole: 'Synthesized branch conclusion injected into parent context',

  cherryModalTitle: 'Cherry-Pick · Merge Branch Summary to Parent',
  cherrySourceLabel: 'Source Branch: ',
  cherryInjectLabel: '→ Target: ',
  cherryDesc: 'Edit the synthesized summary below. Confirming sends it into the parent conversation and draws a merge link:',
  cherryCancel: 'Cancel',
  cherryConfirm: 'Confirm Merge',
  cherryDefaultSummary: (title, excerpt) => `[Summary from Branch "${title}"]\n${excerpt}`,
  cherryFallbackExcerpt:
    'Branch exploration and verification are complete. Key findings are confirmed and ready to incorporate into the main thread.',
  cherryMergePill: 'Cherry-Pick Merge',

  linkModalTitle: 'Link Workspace Timelines',
  linkModalDesc:
    'Select conversations in the same workspace to view them together on a shared timeline. Opening the timeline of any linked conversation shows all of them; forked branches are linked by default.',
  linkSearchPlaceholder: 'Filter conversations in this workspace...',
  linkCurrent: 'Current',
  linkDefaultFork: 'Fork (Default)',
  linkManual: 'Linked',
  linkClickToAdd: 'Link',
  linkEmpty: 'No other conversations in this workspace',
  linkGroupCount: (count) => `${count} ${count === 1 ? 'conversation' : 'conversations'} in this timeline group`,
  done: 'Done',

  tileAiOnly: 'AI Only',
  tileFull: 'Full',
  tileAiOnlyTip: 'Showing AI reply only — click to show full turn',
  tileFullTip: 'Showing full turn — click to show AI reply only',
  tilePopOutTip: 'Pop out as a frameless always-on-top Windows desktop sticky card (stays visible when DSH is minimized)',
  tileLocateTip: 'Jump back to this turn on the timeline',
  tileArrangeTip: 'Arrange multiple tiles neatly side by side',
  tileMinimizeTip: 'Collapse to title bar',
  tileRestoreTip: 'Expand tile',
  tileCloseTip: 'Close tile',
  tileResizeETip: 'Drag to resize width',
  tileResizeSTip: 'Drag to resize height',
  tileResizeSETip: 'Drag corner to resize',
  tilePopOutBlocked:
    'Desktop sticky host is unavailable. Restart DSH Desktop to enable frameless desktop pop-out (tile remains floating inside DSH).',
  tilePopOutFailed: 'Desktop pop-out failed; tile remains floating inside DSH.',

  defaultMainTitle: 'Main Thread',
  defaultBranchTitle: 'Branch',
  defaultLinkedTitle: 'Linked Chat',
  defaultUntitled: 'Untitled Chat',
  defaultCurrentChat: 'Current Chat',
  noTextOutput: '(No text output)',
  codeSnippetTag: '[Code snippet]',
  reasoningStepTitle: 'Reasoning',
  forkStarterTitle: 'New Branch Start',
  forkStarterUser: 'Forked from parent turn with prior context inherited',
  forkStarterSummary: 'Send your first message in the bottom composer to start this branch.',
  forkStarterFull: 'Forked from parent turn with prior context inherited. Send your first message in the bottom composer.',
  loadingHistoryTitle: 'Loading conversation history…',
  loadingHistoryUser: 'Loading turns from local DSH history…',
  loadingHistorySummary: 'Turns will appear along the timeline once history finishes loading.',
  blankSessionUser: 'New conversation (no messages yet)',
  blankSessionSummary: 'Send a message in the composer below to start.',
  blankSessionFull: 'New conversation. Nodes appear automatically after your first message.',
  unhydratedUser: 'Click this node to load full timeline history',
  unhydratedSummary: 'This conversation has not been loaded yet. Click to load and view its turns.',
  unhydratedFull: 'Click to load full conversation history.',
  subagentUser: '[Agent-Spawned Subagent Task]',
  subagentRunning: 'Subagent is running in the background…',
  subagentDoneSummary: 'Subagent completed. Click to inspect execution trace.',
  subagentDoneFull: 'Subagent completed.',

  toastSwitchedTarget: (title) => `Switched composer target to "${title}"`,
  toastLocated: (turnLabel, title) => `Located ${turnLabel} · ${title}`,
  toastNoMicroSteps: 'No tool calls or reasoning steps in this turn',
  toastLoadingBeforeFork: 'Loading conversation history — fork once loaded',
  toastForkReadyFocus: 'Ready — send the first message in the bottom composer',
  toastForkUnsupported: 'Direct forking is not supported on this platform',
  toastWaitForTurn: 'Current turn is still streaming — wait for completion or fork an earlier turn',
  toastForkCreated: (turnLabel) => `Forked from ${turnLabel} — type in the bottom composer to continue`,
  toastForkFailed: (msg) => `Fork failed: ${msg}`,
  toastForkPending: (turnLabel) => `Ready to fork from ${turnLabel} — send a message to create a new swimlane`,
  toastLoadingBeforeTile: 'Loading branch history — pin once loaded',
  toastTilePinned: (turnLabel) => `Pinned ${turnLabel} as a magnetic tile (persists across tabs & chats)`,
  toastTileUnpinned: (turnLabel) => `Unpinned tile "${turnLabel}"`,
  toastMerged: 'Injected branch summary into parent context with a merge link',
  toastMergeFailed: (msg) => `Merge failed: ${msg}`,
  toastSendFailed: (msg) => `Send failed: ${msg}`,
  toastForkSent: 'Created new timeline branch via native fork',
  toastUnlinked: (title) => `Unlinked "${title}" from timeline`,
  errSessionNotReady: 'Target session is not ready yet — please retry shortly',
  errSendRejected: 'Message rejected by server',
  errMergeSendFailed: 'Failed to send merge summary',
};

export const CHRONO_MESSAGES: Record<ChronoLocale, ChronoMessages> = {
  zh: ZH,
  en: EN,
};

export function getChronoMessages(locale: ChronoLocale): ChronoMessages {
  return CHRONO_MESSAGES[locale] ?? ZH;
}
