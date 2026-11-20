/**
 * Native Windows WPF Frameless Desktop Sticky Card Host (zero external apps, zero taskbar icon).
 *
 * Runs as a single hidden STA WPF dispatcher spawned lazily by the DSH host plugin:
 * - Receives one UTF-8 Base64 JSON payload per stdin line (`show` / `close` / `quit`).
 * - Creates 100% frameless, rounded, drop-shadowed, `ShowInTaskbar = false`, `Topmost = true`
 *   floating cards directly on the Windows desktop — persisting even when DSH is minimized!
 * - Renders Markdown (headings, inline bold/italic/code, fenced code blocks with 1-click Copy,
 *   lists, blockquotes, tables) and chronologically interleaved Agent Choice cards.
 * - Exits cleanly the instant stdin closes (when DSH Desktop exits or plugin unloads).
 */

export const WPF_TILE_HOST_PS = String.raw`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
Add-Type -AssemblyName System.Web.Extensions

$cs = @'
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web.Script.Serialization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Effects;
using System.Windows.Shapes;

namespace ChronoBranchDesktop {
    internal static class Win32Ex {
        public const int GWL_EXSTYLE = -20;
        public const int WS_EX_TOOLWINDOW = 0x00000080;

        [DllImport("user32.dll")]
        public static extern int GetWindowLong(IntPtr hWnd, int nIndex);

        [DllImport("user32.dll")]
        public static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong);

        public static void HideFromAltTab(Window w) {
            try {
                var hwnd = new WindowInteropHelper(w).Handle;
                if (hwnd == IntPtr.Zero) return;
                int ex = GetWindowLong(hwnd, GWL_EXSTYLE);
                SetWindowLong(hwnd, GWL_EXSTYLE, ex | WS_EX_TOOLWINDOW);
            } catch { }
        }
    }

    internal sealed class ThemePalette {
        public SolidColorBrush Surface;
        public SolidColorBrush Subtle;
        public SolidColorBrush Muted;
        public SolidColorBrush Hover;
        public SolidColorBrush CodeBg;
        public SolidColorBrush BorderHair;
        public SolidColorBrush BorderSubtle;
        public SolidColorBrush BorderStrong;
        public SolidColorBrush Text;
        public SolidColorBrush Text2;
        public SolidColorBrush TextMuted;
        public SolidColorBrush Ink;
        public SolidColorBrush OnInk;
        public SolidColorBrush Blue;
        public SolidColorBrush Emerald;
        public SolidColorBrush EmeraldBg;
        public SolidColorBrush BlueBg;
        public double ShadowOpacity;

        public static SolidColorBrush B(string hex) {
            var b = (SolidColorBrush)new BrushConverter().ConvertFromString(hex);
            b.Freeze();
            return b;
        }

        public static ThemePalette Create(bool dark) {
            if (dark) {
                return new ThemePalette {
                    Surface = B("#18181b"),
                    Subtle = B("#141416"),
                    Muted = B("#202024"),
                    Hover = B("#27272a"),
                    CodeBg = B("#121215"),
                    BorderHair = B("#232327"),
                    BorderSubtle = B("#27272a"),
                    BorderStrong = B("#3f3f46"),
                    Text = B("#f4f4f5"),
                    Text2 = B("#a1a1aa"),
                    TextMuted = B("#71717a"),
                    Ink = B("#f4f4f5"),
                    OnInk = B("#18181b"),
                    Blue = B("#60a5fa"),
                    Emerald = B("#34d399"),
                    EmeraldBg = B("#162c24"),
                    BlueBg = B("#17253d"),
                    ShadowOpacity = 0.48
                };
            }
            return new ThemePalette {
                Surface = B("#ffffff"),
                Subtle = B("#fafafa"),
                Muted = B("#f2f2f4"),
                Hover = B("#ededf0"),
                CodeBg = B("#f5f5f7"),
                BorderHair = B("#ececef"),
                BorderSubtle = B("#e4e4e7"),
                BorderStrong = B("#d4d4d8"),
                Text = B("#18181b"),
                Text2 = B("#52525b"),
                TextMuted = B("#71717a"),
                Ink = B("#18181b"),
                OnInk = B("#ffffff"),
                Blue = B("#2563eb"),
                Emerald = B("#059669"),
                EmeraldBg = B("#ecfdf5"),
                BlueBg = B("#eff6ff"),
                ShadowOpacity = 0.18
            };
        }
    }

    public sealed class StickyTileWindow : Window {
        private static readonly FontFamily SansFont = new FontFamily("Microsoft YaHei UI, Segoe UI, Inter");
        private static readonly FontFamily MonoFont = new FontFamily("JetBrains Mono, Cascadia Mono, Consolas");

        private readonly ThemePalette _pal;
        private readonly Border _userBubble;
        private readonly ScrollViewer _scroll;
        private readonly Border _headBorder;
        private readonly Button _btnAi;
        private readonly Button _btnTop;
        private readonly Button _btnMin;
        private readonly UIElement[] _resizeHandles;
        private bool _aiOnly;
        private bool _minimized;
        private double _expandedHeight;

        public string TileId { get; private set; }

        public StickyTileWindow(Dictionary<string, object> data, Action<string> onClosed) {
            TileId = Str(data, "id", Guid.NewGuid().ToString("N"));
            bool isDark = Str(data, "theme", "light") == "dark";
            _pal = ThemePalette.Create(isDark);
            _aiOnly = Bool(data, "aiOnly", false);

            WindowStyle = WindowStyle.None;
            AllowsTransparency = true;
            Background = Brushes.Transparent;
            ShowInTaskbar = false;
            Topmost = true;
            ResizeMode = ResizeMode.NoResize;
            FontFamily = SansFont;
            FontSize = 13;

            double reqW = Clamp(Num(data, "w", 390), 280, 860);
            double reqH = Clamp(Num(data, "h", 420), 210, 860);
            _expandedHeight = reqH + 28;
            Width = reqW + 28;
            Height = _expandedHeight;

            double screenW = SystemParameters.WorkArea.Width;
            double screenH = SystemParameters.WorkArea.Height;
            double reqX = Num(data, "x", -1);
            double reqY = Num(data, "y", -1);
            if (reqX >= 0 && reqY >= 0) {
                Left = Clamp(reqX - 14, SystemParameters.VirtualScreenLeft - 10, SystemParameters.VirtualScreenLeft + SystemParameters.VirtualScreenWidth - Width + 10);
                Top = Clamp(reqY - 14, SystemParameters.VirtualScreenTop - 10, SystemParameters.VirtualScreenTop + SystemParameters.VirtualScreenHeight - 60);
            } else {
                Left = Math.Max(20, screenW - Width - 24);
                Top = Math.Max(20, 64);
            }

            SourceInitialized += (s, e) => Win32Ex.HideFromAltTab(this);
            Closed += (s, e) => { if (onClosed != null) onClosed(TileId); };

            var rootGrid = new Grid { Margin = new Thickness(14) };

            var cardBorder = new Border {
                Background = _pal.Surface,
                BorderBrush = _pal.BorderStrong,
                BorderThickness = new Thickness(1),
                CornerRadius = new CornerRadius(11),
                SnapsToDevicePixels = true,
                Effect = new DropShadowEffect {
                    Color = Colors.Black,
                    BlurRadius = 22,
                    ShadowDepth = 6,
                    Opacity = _pal.ShadowOpacity,
                    Direction = 270
                }
            };

            var cardClipGrid = new Grid();
            cardClipGrid.RowDefinitions.Add(new RowDefinition { Height = GridLength.Auto });
            cardClipGrid.RowDefinitions.Add(new RowDefinition { Height = new GridLength(1, GridUnitType.Star) });

            // ==================== HEADER BAR ====================
            _headBorder = new Border {
                Background = _pal.Subtle,
                BorderBrush = _pal.BorderHair,
                BorderThickness = new Thickness(0, 0, 0, 1),
                CornerRadius = new CornerRadius(10, 10, 0, 0),
                Padding = new Thickness(11, 7, 9, 7),
                Cursor = Cursors.SizeAll
            };

            var headDock = new DockPanel { LastChildFill = true };

            var toolsPanel = new StackPanel {
                Orientation = Orientation.Horizontal,
                VerticalAlignment = VerticalAlignment.Center
            };
            DockPanel.SetDock(toolsPanel, Dock.Right);

            _btnAi = MakeToolBtn(_aiOnly ? "仅AI" : "完整", _aiOnly, "切换仅看 AI 回复或完整对话");
            _btnAi.Click += (s, e) => ToggleAiOnly();
            toolsPanel.Children.Add(_btnAi);

            _btnTop = MakeToolBtn("置顶", true, "切换桌面置顶状态");
            _btnTop.Click += (s, e) => {
                Topmost = !Topmost;
                ApplyBtnStyle(_btnTop, Topmost);
                _btnTop.Content = Topmost ? "置顶" : "普通";
            };
            toolsPanel.Children.Add(_btnTop);

            _btnMin = MakeToolBtn("—", false, "折叠 / 展开磁贴");
            _btnMin.Click += (s, e) => ToggleMinimize();
            toolsPanel.Children.Add(_btnMin);

            var btnClose = MakeToolBtn("×", false, "关闭磁贴");
            btnClose.FontSize = 13;
            btnClose.Click += (s, e) => Close();
            toolsPanel.Children.Add(btnClose);

            headDock.Children.Add(toolsPanel);

            var idPanel = new DockPanel {
                VerticalAlignment = VerticalAlignment.Center,
                Margin = new Thickness(0, 0, 8, 0)
            };

            string trackColorHex = Str(data, "trackColor", isDark ? "#d4d4d8" : "#27272a");
            if (isDark && trackColorHex.Equals("#27272a", StringComparison.OrdinalIgnoreCase)) trackColorHex = "#d4d4d8";
            Brush dotBrush;
            try { dotBrush = ThemePalette.B(trackColorHex); } catch { dotBrush = _pal.Ink; }

            var dot = new Ellipse {
                Width = 8, Height = 8, Fill = dotBrush,
                VerticalAlignment = VerticalAlignment.Center,
                Margin = new Thickness(0, 0, 7, 0)
            };
            DockPanel.SetDock(dot, Dock.Left);
            idPanel.Children.Add(dot);

            var turnPill = new Border {
                Background = _pal.Muted,
                CornerRadius = new CornerRadius(4),
                Padding = new Thickness(5, 1, 5, 1),
                Margin = new Thickness(0, 0, 7, 0),
                VerticalAlignment = VerticalAlignment.Center,
                Child = new TextBlock {
                    Text = Str(data, "turnLabel", "M1"),
                    FontFamily = MonoFont,
                    FontSize = 10.5,
                    FontWeight = FontWeights.SemiBold,
                    Foreground = _pal.Text
                }
            };
            DockPanel.SetDock(turnPill, Dock.Left);
            idPanel.Children.Add(turnPill);

            var titleText = new TextBlock {
                Text = Str(data, "title", "对话磁贴"),
                FontSize = 12.5,
                FontWeight = FontWeights.SemiBold,
                Foreground = _pal.Text,
                TextTrimming = TextTrimming.CharacterEllipsis,
                VerticalAlignment = VerticalAlignment.Center
            };
            idPanel.Children.Add(titleText);

            headDock.Children.Add(idPanel);
            _headBorder.Child = headDock;

            _headBorder.MouseLeftButtonDown += (s, e) => {
                if (e.ClickCount == 2) {
                    ToggleMinimize();
                } else {
                    try { DragMove(); } catch { }
                }
            };

            Grid.SetRow(_headBorder, 0);
            cardClipGrid.Children.Add(_headBorder);

            // ==================== SCROLLABLE CONTENT BODY ====================
            var bodyStack = new StackPanel { Margin = new Thickness(12, 11, 12, 14) };

            // User bubble
            string userText = Str(data, "userText", "");
            string timestamp = Str(data, "timestamp", "");
            var userContent = new StackPanel();
            userContent.Children.Add(MakeRoleHeader("YOU", timestamp));
            BuildMarkdownInto(userContent, userText);

            _userBubble = new Border {
                Background = _pal.Muted,
                BorderBrush = _pal.BorderSubtle,
                BorderThickness = new Thickness(1),
                CornerRadius = new CornerRadius(8),
                Padding = new Thickness(11, 9, 11, 9),
                Margin = new Thickness(0, 0, 0, 10),
                Visibility = _aiOnly ? Visibility.Collapsed : Visibility.Visible,
                Child = userContent
            };
            bodyStack.Children.Add(_userBubble);

            // Assistant bubble (chronologically interleaved markdown + choice cards)
            var aiContent = new StackPanel();
            aiContent.Children.Add(MakeRoleHeader(Str(data, "trackTitle", "DSH AGENT"), Str(data, "durationText", "")));

            var segs = AsList(data, "aiSegments");
            if (segs != null && segs.Count > 0) {
                foreach (var item in segs) {
                    var seg = item as Dictionary<string, object>;
                    if (seg == null) continue;
                    string kind = Str(seg, "kind", "");
                    if (kind == "markdown") {
                        BuildMarkdownInto(aiContent, Str(seg, "text", ""));
                    } else if (kind == "choice") {
                        var ch = seg.ContainsKey("choice") ? seg["choice"] as Dictionary<string, object> : null;
                        if (ch != null) aiContent.Children.Add(BuildChoiceCard(ch));
                    }
                }
            } else {
                string aiText = Str(data, "aiFullText", "");
                if (!string.IsNullOrWhiteSpace(aiText)) BuildMarkdownInto(aiContent, aiText);
                var choices = AsList(data, "choices");
                if (choices != null) {
                    foreach (var c in choices) {
                        var ch = c as Dictionary<string, object>;
                        if (ch != null) aiContent.Children.Add(BuildChoiceCard(ch));
                    }
                }
            }

            var aiBubble = new Border {
                Background = _pal.Surface,
                BorderBrush = _pal.BorderHair,
                BorderThickness = new Thickness(1),
                CornerRadius = new CornerRadius(8),
                Padding = new Thickness(11, 9, 11, 10),
                Child = aiContent
            };
            bodyStack.Children.Add(aiBubble);

            _scroll = new ScrollViewer {
                VerticalScrollBarVisibility = ScrollBarVisibility.Auto,
                HorizontalScrollBarVisibility = ScrollBarVisibility.Disabled,
                Content = bodyStack
            };
            Grid.SetRow(_scroll, 1);
            cardClipGrid.Children.Add(_scroll);

            cardBorder.Child = cardClipGrid;
            rootGrid.Children.Add(cardBorder);

            // ==================== RESIZE HANDLES (E / S / SE) ====================
            var thumbE = MakeResizeThumb(Cursors.SizeWE, HorizontalAlignment.Right, VerticalAlignment.Stretch, 7, double.NaN);
            thumbE.Margin = new Thickness(0, 12, 0, 16);
            thumbE.DragDelta += (s, e) => { Width = Clamp(Width + e.HorizontalChange, 290, 920); };

            var thumbS = MakeResizeThumb(Cursors.SizeNS, HorizontalAlignment.Stretch, VerticalAlignment.Bottom, double.NaN, 7);
            thumbS.Margin = new Thickness(12, 0, 16, 0);
            thumbS.DragDelta += (s, e) => {
                if (_minimized) return;
                Height = Clamp(Height + e.VerticalChange, 220, 920);
                _expandedHeight = Height;
            };

            var thumbSE = MakeResizeThumb(Cursors.SizeNWSE, HorizontalAlignment.Right, VerticalAlignment.Bottom, 16, 16);
            thumbSE.DragDelta += (s, e) => {
                Width = Clamp(Width + e.HorizontalChange, 290, 920);
                if (!_minimized) {
                    Height = Clamp(Height + e.VerticalChange, 220, 920);
                    _expandedHeight = Height;
                }
            };

            // Subtle architectural corner notch visual
            var cornerGrip = new Border {
                Width = 8, Height = 8,
                HorizontalAlignment = HorizontalAlignment.Right,
                VerticalAlignment = VerticalAlignment.Bottom,
                Margin = new Thickness(0, 0, 5, 5),
                BorderBrush = _pal.BorderStrong,
                BorderThickness = new Thickness(0, 0, 1.5, 1.5),
                CornerRadius = new CornerRadius(0, 0, 2, 0),
                IsHitTestVisible = false,
                Opacity = 0.65
            };

            rootGrid.Children.Add(cornerGrip);
            rootGrid.Children.Add(thumbE);
            rootGrid.Children.Add(thumbS);
            rootGrid.Children.Add(thumbSE);
            _resizeHandles = new UIElement[] { thumbE, thumbS, thumbSE, cornerGrip };

            Content = rootGrid;
        }

        private void ToggleAiOnly() {
            _aiOnly = !_aiOnly;
            _userBubble.Visibility = _aiOnly ? Visibility.Collapsed : Visibility.Visible;
            ApplyBtnStyle(_btnAi, _aiOnly);
            _btnAi.Content = _aiOnly ? "仅AI" : "完整";
        }

        private void ToggleMinimize() {
            _minimized = !_minimized;
            if (_minimized) {
                _expandedHeight = Height;
                _scroll.Visibility = Visibility.Collapsed;
                _headBorder.BorderThickness = new Thickness(0);
                _headBorder.CornerRadius = new CornerRadius(10);
                foreach (var h in _resizeHandles) h.Visibility = Visibility.Collapsed;
                Height = 68;
                _btnMin.Content = "+";
            } else {
                _scroll.Visibility = Visibility.Visible;
                _headBorder.BorderThickness = new Thickness(0, 0, 0, 1);
                _headBorder.CornerRadius = new CornerRadius(10, 10, 0, 0);
                foreach (var h in _resizeHandles) h.Visibility = Visibility.Visible;
                Height = Math.Max(220, _expandedHeight);
                _btnMin.Content = "—";
            }
        }

        private Button MakeToolBtn(string label, bool active, string tip) {
            var btn = new Button {
                Content = label,
                ToolTip = tip,
                FontSize = 11,
                FontWeight = FontWeights.Medium,
                Padding = new Thickness(7, 2, 7, 2),
                Margin = new Thickness(3, 0, 0, 0),
                Cursor = Cursors.Hand,
                BorderThickness = new Thickness(1)
            };
            var tpl = new ControlTemplate(typeof(Button));
            var bd = new FrameworkElementFactory(typeof(Border));
            bd.SetValue(Border.CornerRadiusProperty, new CornerRadius(5));
            bd.SetBinding(Border.BackgroundProperty, new System.Windows.Data.Binding("Background") { RelativeSource = System.Windows.Data.RelativeSource.TemplatedParent });
            bd.SetBinding(Border.BorderBrushProperty, new System.Windows.Data.Binding("BorderBrush") { RelativeSource = System.Windows.Data.RelativeSource.TemplatedParent });
            bd.SetBinding(Border.BorderThicknessProperty, new System.Windows.Data.Binding("BorderThickness") { RelativeSource = System.Windows.Data.RelativeSource.TemplatedParent });
            bd.SetBinding(Border.PaddingProperty, new System.Windows.Data.Binding("Padding") { RelativeSource = System.Windows.Data.RelativeSource.TemplatedParent });
            var cp = new FrameworkElementFactory(typeof(ContentPresenter));
            cp.SetValue(FrameworkElement.HorizontalAlignmentProperty, HorizontalAlignment.Center);
            cp.SetValue(FrameworkElement.VerticalAlignmentProperty, VerticalAlignment.Center);
            bd.AppendChild(cp);
            tpl.VisualTree = bd;
            btn.Template = tpl;
            ApplyBtnStyle(btn, active);
            return btn;
        }

        private void ApplyBtnStyle(Button btn, bool active) {
            if (active) {
                btn.Background = _pal.Ink;
                btn.BorderBrush = _pal.Ink;
                btn.Foreground = _pal.OnInk;
            } else {
                btn.Background = _pal.Surface;
                btn.BorderBrush = _pal.BorderSubtle;
                btn.Foreground = _pal.Text2;
            }
        }

        private Thumb MakeResizeThumb(Cursor cursor, HorizontalAlignment ha, VerticalAlignment va, double w, double h) {
            var tpl = new ControlTemplate(typeof(Thumb));
            var r = new FrameworkElementFactory(typeof(Border));
            r.SetValue(Border.BackgroundProperty, Brushes.Transparent);
            tpl.VisualTree = r;
            return new Thumb {
                Cursor = cursor,
                HorizontalAlignment = ha,
                VerticalAlignment = va,
                Width = w,
                Height = h,
                Template = tpl
            };
        }

        private UIElement MakeRoleHeader(string left, string right) {
            var dock = new DockPanel { Margin = new Thickness(0, 0, 0, 5) };
            if (!string.IsNullOrEmpty(right)) {
                var rt = new TextBlock {
                    Text = right,
                    FontFamily = MonoFont,
                    FontSize = 10,
                    Foreground = _pal.TextMuted
                };
                DockPanel.SetDock(rt, Dock.Right);
                dock.Children.Add(rt);
            }
            dock.Children.Add(new TextBlock {
                Text = left.ToUpperInvariant(),
                FontSize = 10,
                FontWeight = FontWeights.SemiBold,
                Foreground = _pal.TextMuted
            });
            return dock;
        }

        private RichTextBox MakeReadOnlyRtb(FlowDocument doc) {
            doc.PagePadding = new Thickness(0);
            doc.FontFamily = SansFont;
            doc.FontSize = 12.6;
            doc.Foreground = _pal.Text;
            var rtb = new RichTextBox(doc) {
                IsReadOnly = true,
                IsDocumentEnabled = true,
                BorderThickness = new Thickness(0),
                Background = Brushes.Transparent,
                Padding = new Thickness(0),
                Margin = new Thickness(0),
                VerticalScrollBarVisibility = ScrollBarVisibility.Disabled,
                HorizontalScrollBarVisibility = ScrollBarVisibility.Disabled
            };
            // Forward mouse wheel to parent ScrollViewer
            rtb.PreviewMouseWheel += (s, e) => {
                if (!e.Handled) {
                    e.Handled = true;
                    var ev = new MouseWheelEventArgs(e.MouseDevice, e.Timestamp, e.Delta) {
                        RoutedEvent = UIElement.MouseWheelEvent,
                        Source = s
                    };
                    _scroll.RaiseEvent(ev);
                }
            };
            return rtb;
        }

        private void AddInlineRuns(InlineCollection target, string line) {
            var rx = new Regex(@"(\x60[^\x60\n]+\x60|\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|\*[^*\n]+\*)");
            int last = 0;
            foreach (Match m in rx.Matches(line)) {
                if (m.Index > last) target.Add(new Run(line.Substring(last, m.Index - last)));
                string tok = m.Value;
                if (tok.Length >= 2 && tok[0] == (char)96) {
                    var r = new Run(" " + tok.Substring(1, tok.Length - 2) + " ") {
                        FontFamily = MonoFont,
                        FontSize = 11.4,
                        Background = _pal.Muted
                    };
                    target.Add(r);
                } else if ((tok.StartsWith("**") || tok.StartsWith("__")) && tok.Length >= 4) {
                    target.Add(new Bold(new Run(tok.Substring(2, tok.Length - 4))));
                } else if (tok.StartsWith("~~") && tok.Length >= 4) {
                    var r = new Run(tok.Substring(2, tok.Length - 4));
                    r.TextDecorations = TextDecorations.Strikethrough;
                    target.Add(r);
                } else if (tok.StartsWith("*") && tok.Length >= 2) {
                    target.Add(new Italic(new Run(tok.Substring(1, tok.Length - 2))));
                } else {
                    target.Add(new Run(tok));
                }
                last = m.Index + m.Length;
            }
            if (last < line.Length) target.Add(new Run(line.Substring(last)));
        }

        private void BuildMarkdownInto(StackPanel host, string text) {
            if (string.IsNullOrWhiteSpace(text)) return;
            var lines = text.Replace("\r\n", "\n").Replace("\r", "\n").Split('\n');
            FlowDocument curDoc = null;
            Action flushDoc = () => {
                if (curDoc != null && curDoc.Blocks.Count > 0) {
                    host.Children.Add(MakeReadOnlyRtb(curDoc));
                }
                curDoc = null;
            };
            Func<FlowDocument> ensureDoc = () => {
                if (curDoc == null) curDoc = new FlowDocument();
                return curDoc;
            };

            string fenceToken = new string((char)96, 3);
            int i = 0;
            while (i < lines.Length) {
                string raw = lines[i];
                string trimmed = raw.Trim();
                if (string.IsNullOrEmpty(trimmed)) { i++; continue; }

                // Fenced code block
                if (trimmed.StartsWith(fenceToken)) {
                    flushDoc();
                    string lang = trimmed.Substring(3).Trim();
                    var codeLines = new List<string>();
                    i++;
                    while (i < lines.Length && !lines[i].Trim().StartsWith(fenceToken)) {
                        codeLines.Add(lines[i]);
                        i++;
                    }
                    if (i < lines.Length) i++;
                    host.Children.Add(BuildCodeBlock(string.IsNullOrEmpty(lang) ? "text" : lang, string.Join("\n", codeLines)));
                    continue;
                }

                // Horizontal rule
                if (Regex.IsMatch(trimmed, @"^([-*_])\1{2,}$")) {
                    flushDoc();
                    host.Children.Add(new Border {
                        Height = 1, Background = _pal.BorderSubtle, Margin = new Thickness(0, 7, 0, 7)
                    });
                    i++;
                    continue;
                }

                // Heading
                var hm = Regex.Match(trimmed, @"^(#{1,6})\s+(.+)$");
                if (hm.Success) {
                    int lvl = hm.Groups[1].Value.Length;
                    var p = new Paragraph {
                        Margin = new Thickness(0, 8, 0, 4),
                        FontWeight = FontWeights.SemiBold,
                        FontSize = lvl == 1 ? 15 : lvl == 2 ? 14 : 13.2
                    };
                    AddInlineRuns(p.Inlines, hm.Groups[2].Value.Trim());
                    ensureDoc().Blocks.Add(p);
                    i++;
                    continue;
                }

                // Blockquote
                if (trimmed.StartsWith(">")) {
                    flushDoc();
                    var qLines = new List<string>();
                    while (i < lines.Length && lines[i].Trim().StartsWith(">")) {
                        qLines.Add(Regex.Replace(lines[i].Trim(), @"^>\s?", ""));
                        i++;
                    }
                    var qDoc = new FlowDocument();
                    var qp = new Paragraph { Margin = new Thickness(0), Foreground = _pal.Text2 };
                    for (int qi = 0; qi < qLines.Count; qi++) {
                        if (qi > 0) qp.Inlines.Add(new LineBreak());
                        AddInlineRuns(qp.Inlines, qLines[qi]);
                    }
                    qDoc.Blocks.Add(qp);
                    host.Children.Add(new Border {
                        Background = _pal.Subtle,
                        BorderBrush = _pal.BorderStrong,
                        BorderThickness = new Thickness(2.5, 0, 0, 0),
                        CornerRadius = new CornerRadius(0, 5, 5, 0),
                        Padding = new Thickness(9, 5, 8, 5),
                        Margin = new Thickness(0, 4, 0, 7),
                        Child = MakeReadOnlyRtb(qDoc)
                    });
                    continue;
                }

                // Unordered list
                if (Regex.IsMatch(trimmed, @"^[-*+•]\s+")) {
                    var doc = ensureDoc();
                    while (i < lines.Length && Regex.IsMatch(lines[i].Trim(), @"^[-*+•]\s+")) {
                        string body = Regex.Replace(lines[i].Trim(), @"^[-*+•]\s+", "");
                        var p = new Paragraph {
                            Margin = new Thickness(12, 1.5, 0, 1.5),
                            TextIndent = -10,
                            LineHeight = 21
                        };
                        p.Inlines.Add(new Run("•  ") { Foreground = _pal.TextMuted });
                        AddInlineRuns(p.Inlines, body);
                        doc.Blocks.Add(p);
                        i++;
                    }
                    continue;
                }

                // Ordered list
                if (Regex.IsMatch(trimmed, @"^\d+[.)]\s+")) {
                    var doc = ensureDoc();
                    while (i < lines.Length && Regex.IsMatch(lines[i].Trim(), @"^\d+[.)]\s+")) {
                        var om = Regex.Match(lines[i].Trim(), @"^(\d+[.)])\s+(.*)$");
                        var p = new Paragraph {
                            Margin = new Thickness(16, 1.5, 0, 1.5),
                            TextIndent = -14,
                            LineHeight = 21
                        };
                        p.Inlines.Add(new Run(om.Groups[1].Value + " ") { Foreground = _pal.TextMuted });
                        AddInlineRuns(p.Inlines, om.Groups[2].Value);
                        doc.Blocks.Add(p);
                        i++;
                    }
                    continue;
                }

                // Paragraph
                var pLines = new List<string>();
                while (i < lines.Length) {
                    string cur = lines[i];
                    string ct = cur.Trim();
                    if (string.IsNullOrEmpty(ct)) break;
                    if (pLines.Count > 0 && (ct.StartsWith(fenceToken) || ct.StartsWith("#") || ct.StartsWith(">") || Regex.IsMatch(ct, @"^([-*+•]|\d+[.)])\s+"))) break;
                    pLines.Add(cur);
                    i++;
                }
                var para = new Paragraph { Margin = new Thickness(0, 0, 0, 7), LineHeight = 21.5 };
                for (int pi = 0; pi < pLines.Count; pi++) {
                    if (pi > 0) para.Inlines.Add(new LineBreak());
                    AddInlineRuns(para.Inlines, pLines[pi]);
                }
                ensureDoc().Blocks.Add(para);
            }
            flushDoc();
        }

        private UIElement BuildCodeBlock(string lang, string code) {
            var box = new Border {
                Background = _pal.CodeBg,
                BorderBrush = _pal.BorderSubtle,
                BorderThickness = new Thickness(1),
                CornerRadius = new CornerRadius(7),
                Margin = new Thickness(0, 5, 0, 8)
            };
            var sp = new StackPanel();
            var head = new Border {
                Background = _pal.Muted,
                BorderBrush = _pal.BorderSubtle,
                BorderThickness = new Thickness(0, 0, 0, 1),
                CornerRadius = new CornerRadius(6, 6, 0, 0),
                Padding = new Thickness(9, 4, 7, 4)
            };
            var dock = new DockPanel();
            var copyBtn = MakeToolBtn("复制", false, "复制代码");
            copyBtn.Click += (s, e) => {
                try { Clipboard.SetText(code); } catch { }
                copyBtn.Content = "已复制";
            };
            DockPanel.SetDock(copyBtn, Dock.Right);
            dock.Children.Add(copyBtn);
            dock.Children.Add(new TextBlock {
                Text = lang,
                FontFamily = MonoFont,
                FontSize = 10.5,
                Foreground = _pal.TextMuted,
                VerticalAlignment = VerticalAlignment.Center
            });
            head.Child = dock;
            sp.Children.Add(head);

            var tb = new TextBox {
                Text = code,
                IsReadOnly = true,
                BorderThickness = new Thickness(0),
                Background = Brushes.Transparent,
                Foreground = _pal.Text,
                FontFamily = MonoFont,
                FontSize = 11.4,
                Padding = new Thickness(10, 8, 10, 8),
                TextWrapping = TextWrapping.NoWrap,
                HorizontalScrollBarVisibility = ScrollBarVisibility.Auto,
                VerticalScrollBarVisibility = ScrollBarVisibility.Disabled
            };
            sp.Children.Add(tb);
            box.Child = sp;
            return box;
        }

        private UIElement BuildChoiceCard(Dictionary<string, object> ch) {
            string status = Str(ch, "status", "answered");
            string statusLabel = status == "waiting" ? "等待选择" : status == "cancelled" ? "已取消" : status == "interrupted" ? "已中断" : "已回答";
            string header = Str(ch, "header", "");
            string title = string.IsNullOrEmpty(header) ? "AGENT 提问与选择" : ("AGENT 选择 · " + header);
            if (Bool(ch, "multiSelect", false)) title += "（多选）";

            var card = new Border {
                Background = _pal.Subtle,
                BorderBrush = status == "waiting" ? _pal.Blue : _pal.BorderSubtle,
                BorderThickness = new Thickness(1),
                CornerRadius = new CornerRadius(8),
                Padding = new Thickness(10, 9, 10, 9),
                Margin = new Thickness(0, 6, 0, 8)
            };
            var sp = new StackPanel();

            var headDock = new DockPanel { Margin = new Thickness(0, 0, 0, 6) };
            var badge = new Border {
                Background = status == "answered" ? _pal.EmeraldBg : status == "waiting" ? _pal.BlueBg : _pal.Surface,
                BorderBrush = status == "answered" ? _pal.Emerald : status == "waiting" ? _pal.Blue : _pal.BorderSubtle,
                BorderThickness = new Thickness(1),
                CornerRadius = new CornerRadius(9),
                Padding = new Thickness(6, 1, 6, 1),
                Child = new TextBlock {
                    Text = statusLabel,
                    FontSize = 10,
                    FontWeight = FontWeights.Medium,
                    Foreground = status == "answered" ? _pal.Emerald : status == "waiting" ? _pal.Blue : _pal.TextMuted
                }
            };
            DockPanel.SetDock(badge, Dock.Right);
            headDock.Children.Add(badge);
            headDock.Children.Add(new TextBlock {
                Text = title,
                FontSize = 10.5,
                FontWeight = FontWeights.SemiBold,
                Foreground = _pal.TextMuted,
                VerticalAlignment = VerticalAlignment.Center
            });
            sp.Children.Add(headDock);

            sp.Children.Add(new TextBlock {
                Text = Str(ch, "question", ""),
                FontWeight = FontWeights.Medium,
                Foreground = _pal.Text,
                TextWrapping = TextWrapping.Wrap,
                Margin = new Thickness(0, 0, 0, 7)
            });

            var opts = AsList(ch, "options");
            if (opts != null) {
                foreach (var oObj in opts) {
                    var opt = oObj as Dictionary<string, object>;
                    if (opt == null) continue;
                    bool sel = Bool(opt, "selected", false);
                    var optRow = new Border {
                        Background = sel ? _pal.Muted : _pal.Surface,
                        BorderBrush = sel ? _pal.Ink : _pal.BorderHair,
                        BorderThickness = new Thickness(1),
                        CornerRadius = new CornerRadius(6),
                        Padding = new Thickness(8, 6, 8, 6),
                        Margin = new Thickness(0, 0, 0, 5)
                    };
                    var rowDock = new DockPanel();
                    var ind = new Border {
                        Width = 15, Height = 15,
                        CornerRadius = new CornerRadius(8),
                        Background = sel ? _pal.Ink : Brushes.Transparent,
                        BorderBrush = sel ? _pal.Ink : _pal.BorderStrong,
                        BorderThickness = new Thickness(1.5),
                        Margin = new Thickness(0, 2, 8, 0),
                        VerticalAlignment = VerticalAlignment.Top,
                        Child = sel ? new TextBlock {
                            Text = "✓", FontSize = 9.5, FontWeight = FontWeights.Bold,
                            Foreground = _pal.OnInk, HorizontalAlignment = HorizontalAlignment.Center,
                            VerticalAlignment = VerticalAlignment.Center
                        } : null
                    };
                    DockPanel.SetDock(ind, Dock.Left);
                    rowDock.Children.Add(ind);

                    var optText = new StackPanel();
                    optText.Children.Add(new TextBlock {
                        Text = Str(opt, "label", ""),
                        FontSize = 12.2, FontWeight = FontWeights.Medium,
                        Foreground = _pal.Text, TextWrapping = TextWrapping.Wrap
                    });
                    string desc = Str(opt, "description", "");
                    if (!string.IsNullOrEmpty(desc)) {
                        optText.Children.Add(new TextBlock {
                            Text = desc, FontSize = 11.3, Foreground = _pal.TextMuted,
                            TextWrapping = TextWrapping.Wrap, Margin = new Thickness(0, 2, 0, 0)
                        });
                    }
                    rowDock.Children.Add(optText);
                    optRow.Child = rowDock;
                    sp.Children.Add(optRow);
                }
            }

            string custom = Str(ch, "customAnswer", "");
            if (!string.IsNullOrEmpty(custom)) {
                sp.Children.Add(new TextBlock {
                    Text = "你的回答：" + custom,
                    FontSize = 12, Foreground = _pal.Text2,
                    TextWrapping = TextWrapping.Wrap, Margin = new Thickness(0, 3, 0, 0)
                });
            }

            card.Child = sp;
            return card;
        }

        private static string Str(Dictionary<string, object> d, string k, string fb) {
            if (d == null || !d.ContainsKey(k) || d[k] == null) return fb;
            return Convert.ToString(d[k]) ?? fb;
        }
        private static bool Bool(Dictionary<string, object> d, string k, bool fb) {
            if (d == null || !d.ContainsKey(k) || d[k] == null) return fb;
            try { return Convert.ToBoolean(d[k]); } catch { return fb; }
        }
        private static double Num(Dictionary<string, object> d, string k, double fb) {
            if (d == null || !d.ContainsKey(k) || d[k] == null) return fb;
            try { return Convert.ToDouble(d[k]); } catch { return fb; }
        }
        private static double Clamp(double v, double lo, double hi) {
            return v < lo ? lo : (v > hi ? hi : v);
        }
        private static System.Collections.ArrayList AsList(Dictionary<string, object> d, string k) {
            if (d == null || !d.ContainsKey(k)) return null;
            return d[k] as System.Collections.ArrayList;
        }
    }

    public static class TileAppHost {
        private static readonly Dictionary<string, StickyTileWindow> OpenWindows = new Dictionary<string, StickyTileWindow>();

        public static void Run() {
            var app = new Application { ShutdownMode = ShutdownMode.OnExplicitShutdown };
            var ser = new JavaScriptSerializer { MaxJsonLength = 8 * 1024 * 1024 };

            var reader = new Thread(() => {
                try {
                    string line;
                    while ((line = Console.In.ReadLine()) != null) {
                        if (string.IsNullOrWhiteSpace(line)) continue;
                        string json = Encoding.UTF8.GetString(Convert.FromBase64String(line.Trim()));
                        var msg = ser.DeserializeObject(json) as Dictionary<string, object>;
                        if (msg == null) continue;
                        string op = msg.ContainsKey("op") ? Convert.ToString(msg["op"]) : "";
                        if (op == "quit") {
                            app.Dispatcher.BeginInvoke(new Action(() => app.Shutdown()));
                            return;
                        }
                        if (op == "show") {
                            app.Dispatcher.BeginInvoke(new Action(() => {
                                string id = msg.ContainsKey("id") ? Convert.ToString(msg["id"]) : "";
                                if (!string.IsNullOrEmpty(id) && OpenWindows.ContainsKey(id)) {
                                    var existing = OpenWindows[id];
                                    existing.Topmost = true;
                                    existing.Activate();
                                    return;
                                }
                                var win = new StickyTileWindow(msg, closedId => {
                                    OpenWindows.Remove(closedId);
                                });
                                OpenWindows[win.TileId] = win;
                                win.Show();
                            }));
                        } else if (op == "close") {
                            string id = msg.ContainsKey("id") ? Convert.ToString(msg["id"]) : "";
                            app.Dispatcher.BeginInvoke(new Action(() => {
                                if (OpenWindows.ContainsKey(id)) {
                                    OpenWindows[id].Close();
                                }
                            }));
                        }
                    }
                } catch { }
                try { app.Dispatcher.BeginInvoke(new Action(() => app.Shutdown())); } catch { }
            }) { IsBackground = true };

            reader.Start();
            app.Run();
        }
    }
}
'@

Add-Type -TypeDefinition $cs -ReferencedAssemblies PresentationFramework, PresentationCore, WindowsBase, System.Xaml, System.Web.Extensions
[ChronoBranchDesktop.TileAppHost]::Run()
`;
