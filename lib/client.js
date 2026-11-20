window.__ModuleLoader__.load({
	id: "dsh-chronobranch",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		// \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		let react = require("react");
		react = __toESM(react, 1);
		let react_jsx_runtime = require("react/jsx-runtime");
		// src/core/icons.tsx
		function sizeClass(size) {
			if (size === "xs") return "cb-icon cb-icon-xs";
			if (size === "sm") return "cb-icon cb-icon-sm";
			return "cb-icon";
		}
		function IconLinear({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2.5 4h11M2.5 8h8.5M2.5 12h10" })
			});
		}
		function IconZoomL1({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2 8h12" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "4",
						cy: "8",
						r: "1.4",
						fill: "currentColor",
						stroke: "none"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "8",
						cy: "8",
						r: "1.4",
						fill: "currentColor",
						stroke: "none"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "12",
						cy: "8",
						r: "1.4",
						fill: "currentColor",
						stroke: "none"
					})
				]
			});
		}
		function IconZoomL2({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2 5h12" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "5",
						cy: "5",
						r: "1.6",
						fill: "var(--cb-surface)"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M5 8.5h7M5 11.5h5" })
				]
			});
		}
		function IconZoomL3({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "2.5",
					y: "2.5",
					width: "11",
					height: "11",
					rx: "2"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M5 6h6M5 9h4" })]
			});
		}
		function IconFit({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2.5 5.5V3a.5.5 0 0 1 .5-.5h2.5M10.5 2.5H13a.5.5 0 0 1 .5.5v2.5M13.5 10.5V13a.5.5 0 0 1-.5.5h-2.5M5.5 13.5H3a.5.5 0 0 1-.5-.5v-2.5" })
			});
		}
		function IconSearch({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
					cx: "7",
					cy: "7",
					r: "4.5"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m10.5 10.5 3 3" })]
			});
		}
		function IconSubagent({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "3",
						cy: "5",
						r: "1.5"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "13",
						cy: "5",
						r: "1.5"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
						x: "6.7",
						y: "9.7",
						width: "2.6",
						height: "2.6",
						rx: ".4",
						transform: "rotate(45 8 11)"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4.5 5h7M3 6.5V9a2 2 0 0 0 2 2h1.2M9.8 11H11a2 2 0 0 0 2-2V6.5" })
				]
			});
		}
		function IconEyeOff({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2 8s2.4-4 6-4 6 4 6 4-2.4 4-6 4-6-4-6-4Z" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "8",
						cy: "8",
						r: "1.5"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m3 3 10 10" })
				]
			});
		}
		function IconFork({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "4",
						cy: "4.5",
						r: "1.4"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "12",
						cy: "4.5",
						r: "1.4"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "12",
						cy: "11.5",
						r: "1.4"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M5.4 4.5h5.2M6.8 4.5v5a2 2 0 0 0 2 2h1.8" })
				]
			});
		}
		function IconMerge({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "4.5",
						cy: "11.5",
						r: "1.5"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "11.5",
						cy: "4.5",
						r: "1.5"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4.5 10V7.5a3 3 0 0 1 3-3H10" })
				]
			});
		}
		function IconExpand({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M9.5 3h3.5v3.5M6.5 13H3V9.5M13 3 8.8 7.2M3 13l4.2-4.2" })
			});
		}
		function IconCollapse({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M13 6.5H9.5V3M3 9.5h3.5V13M9.5 6.5 13 3M6.5 9.5 3 13" })
			});
		}
		function IconFold({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M3 8h10M5.5 5 8 7.5 10.5 5M5.5 11 8 8.5 10.5 11" })
			});
		}
		function IconClose({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4 4l8 8M12 4l-8 8" })
			});
		}
		function IconCheck({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m3.5 8.4 3 3 6-6.8" })
			});
		}
		function IconCopy({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "5.5",
					y: "5.5",
					width: "7.5",
					height: "7.5",
					rx: "1.4"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M10.5 5.5V4.2A1.2 1.2 0 0 0 9.3 3H4.2A1.2 1.2 0 0 0 3 4.2v5.1a1.2 1.2 0 0 0 1.2 1.2h1.3" })]
			});
		}
		function IconPin({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M9.8 2.8 13.2 6.2 11.4 8l.4 2.2-1.4 1.4-2.8-2.8-3.6 3.6M6 8.2 3.8 6l1.4-1.4 2.2.4L9.8 2.8" })
			});
		}
		function IconMagnet({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4.2 3.2v5a3.8 3.8 0 0 0 7.6 0v-5" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2.8 3.2h2.8M10.4 3.2h2.8M2.8 6h2.8M10.4 6h2.8" })]
			});
		}
		function IconLocate({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
					cx: "8",
					cy: "8",
					r: "3.6"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M8 2v2M8 12v2M2 8h2M12 8h2" })]
			});
		}
		function IconArrange({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "2.2",
					y: "3",
					width: "4.8",
					height: "10",
					rx: "1.2"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "9",
					y: "3",
					width: "4.8",
					height: "10",
					rx: "1.2"
				})]
			});
		}
		function IconMinimize({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M3.5 8h9" })
			});
		}
		function IconPip({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "2",
					y: "3",
					width: "12",
					height: "10",
					rx: "1.6"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "7.8",
					y: "7.4",
					width: "4.4",
					height: "3.6",
					rx: "0.8",
					fill: "currentColor",
					stroke: "none"
				})]
			});
		}
		function IconSend({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M3 8h10M8.5 3.5 13 8l-4.5 4.5" })
			});
		}
		function IconStop({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
					x: "4",
					y: "4",
					width: "8",
					height: "8",
					rx: "1.2",
					fill: "currentColor",
					stroke: "none"
				})
			});
		}
		function IconMicroAxis({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M2 8h12" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "4.2",
						cy: "8",
						r: "1.4",
						fill: "currentColor",
						stroke: "none"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "8",
						cy: "8",
						r: "1.4",
						fill: "currentColor",
						stroke: "none"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "11.8",
						cy: "8",
						r: "1.4",
						fill: "currentColor",
						stroke: "none"
					})
				]
			});
		}
		function IconLink({ className, size = "sm" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6.8 9.2 9.2 6.8M6 10.8l-1.1 1.1a2.2 2.2 0 0 1-3.1-3.1L3.6 7a2.2 2.2 0 0 1 3.1 0M10 5.2l1.1-1.1a2.2 2.2 0 1 1 3.1 3.1L12.4 9a2.2 2.2 0 0 1-3.1 0" })
			});
		}
		function IconUnlink({ className, size = "xs" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className: `${sizeClass(size)} ${className ?? ""}`,
				viewBox: "0 0 16 16",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6 10.8l-1.1 1.1a2.2 2.2 0 0 1-3.1-3.1L3.6 7a2.2 2.2 0 0 1 3.1 0M10 5.2l1.1-1.1a2.2 2.2 0 1 1 3.1 3.1L12.4 9a2.2 2.2 0 0 1-3.1 0M3 3l10 10" })
			});
		}
		function StepKindIcon({ kind }) {
			switch (kind) {
				case "thinking": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
					className: "cb-icon cb-icon-xs",
					viewBox: "0 0 16 16",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "8",
						cy: "6.2",
						r: "3.4"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6.3 9.3v1.6a1.7 1.7 0 0 0 3.4 0V9.3M6.8 13.5h2.4" })]
				});
				case "terminal": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
					className: "cb-icon cb-icon-xs",
					viewBox: "0 0 16 16",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m3.5 5.2 3 2.8-3 2.8M8.5 11.2h4" })
				});
				case "file-diff": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
					className: "cb-icon cb-icon-xs",
					viewBox: "0 0 16 16",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M8 3.5v5M5.5 6h5M5.5 11.5h5" })
				});
				case "subagent-spawn": return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
					className: "cb-icon cb-icon-xs",
					viewBox: "0 0 16 16",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							cx: "4",
							cy: "4.5",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
							cx: "12",
							cy: "11.5",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4 6v3.5a2 2 0 0 0 2 2h4.5" })
					]
				});
				default: return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
					className: "cb-icon cb-icon-xs",
					viewBox: "0 0 16 16",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4 2.5h5.2L12.5 5.8V13.5h-8.5Z" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M9 2.5v3.5h3.5M6 8.5h4M6 11h2.8" })]
				});
			}
		}
		// src/core/markdown.tsx
		/**
		* Lightweight, zero-dependency, XSS-safe Markdown renderer for ChronoBranch.
		* Supports headings, fenced code blocks with copy, inline code, bold/italic/strike,
		* links, blockquotes, horizontal rules, ordered/unordered/task lists, and GFM tables.
		*/
		function isSafeHref(raw) {
			const trimmed = raw.trim().toLowerCase();
			return trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:") || trimmed.startsWith("#");
		}
		function renderInline(text, keyPrefix) {
			const nodes = [];
			const tokenRe = /(`[^`\n]+`|\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*\*([^*\n]+)\*\*\*|\*\*([^*\n]+)\*\*|__([^_\n]+)__|~~([^~\n]+)~~|\*([^*\n]+)\*)/g;
			let lastIndex = 0;
			let match;
			let tokenIdx = 0;
			while ((match = tokenRe.exec(text)) !== null) {
				if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
				const full = match[0];
				const key = `${keyPrefix}-${tokenIdx++}`;
				if (full.startsWith("`")) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
					className: "cb-md-inline-code",
					children: full.slice(1, -1)
				}, key));
				else if (match[2] !== void 0 && match[3] !== void 0) {
					const label = match[2];
					const href = match[3];
					if (isSafeHref(href)) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
						className: "cb-md-link",
						href,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: (e) => e.stopPropagation(),
						children: label
					}, key));
					else nodes.push(label);
				} else if (match[4] !== void 0) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("em", { children: match[4] }) }, key));
				else if (match[5] !== void 0 || match[6] !== void 0) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: match[5] ?? match[6] }, key));
				else if (match[7] !== void 0) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("del", { children: match[7] }, key));
				else if (match[8] !== void 0) nodes.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("em", { children: match[8] }, key));
				lastIndex = match.index + full.length;
			}
			if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
			return nodes;
		}
		function renderLinesWithBreaks(lines, keyPrefix) {
			return lines.map((line, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.Fragment, { children: [i > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("br", {}), renderInline(line, `${keyPrefix}-i-${i}`)] }, `${keyPrefix}-l-${i}`));
		}
		function CodeBlockView({ lang, code }) {
			const [copied, setCopied] = (0, react.useState)(false);
			const handleCopy = (e) => {
				e.stopPropagation();
				navigator.clipboard?.writeText(code).catch(() => {});
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1500);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "cb-code-block cb-md-code-block",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "cb-code-head",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: lang || "text" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "cb-code-copy",
						onClick: handleCopy,
						children: [copied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheck, { size: "xs" }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCopy, { size: "xs" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: copied ? "已复制" : "复制" })]
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", { children: code })]
			});
		}
		function isTableSeparator(line) {
			const t = line.trim();
			if (!t.includes("-")) return false;
			return /^\|?(\s*:?-{2,}:?\s*\|)+\s*:?-{2,}:?\s*\|?$/.test(t);
		}
		function splitTableRow(line) {
			return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
		}
		function isBlockStarter(line) {
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
		function ChronoMarkdown({ text, className }) {
			if (!text) return null;
			const lines = text.replace(/\r\n?/g, "\n").split("\n");
			const blocks = [];
			let i = 0;
			let blockKey = 0;
			while (i < lines.length) {
				const rawLine = lines[i];
				const trimmed = rawLine.trim();
				if (!trimmed) {
					i += 1;
					continue;
				}
				const fenceMatch = /^```([^\s`]*)\s*$/.exec(trimmed);
				if (fenceMatch) {
					const lang = fenceMatch[1] || "";
					const codeLines = [];
					i += 1;
					while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
						codeLines.push(lines[i]);
						i += 1;
					}
					if (i < lines.length) i += 1;
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CodeBlockView, {
						lang,
						code: codeLines.join("\n")
					}, `b-${blockKey++}`));
					continue;
				}
				if (/^([-*_])\1{2,}$/.test(trimmed)) {
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("hr", { className: "cb-md-hr" }, `b-${blockKey++}`));
					i += 1;
					continue;
				}
				const headingMatch = /^(#{1,6})\s+(.+)$/.exec(trimmed);
				if (headingMatch) {
					const level = headingMatch[1].length;
					const content = renderInline(headingMatch[2].trim(), `h-${blockKey}`);
					const k = `b-${blockKey++}`;
					if (level === 1) blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", {
						className: "cb-md-h cb-md-h1",
						children: content
					}, k));
					else if (level === 2) blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
						className: "cb-md-h cb-md-h2",
						children: content
					}, k));
					else if (level === 3) blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						className: "cb-md-h cb-md-h3",
						children: content
					}, k));
					else blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
						className: "cb-md-h cb-md-h4",
						children: content
					}, k));
					i += 1;
					continue;
				}
				if (trimmed.includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
					const headers = splitTableRow(rawLine);
					i += 2;
					const rows = [];
					while (i < lines.length && lines[i].trim() && lines[i].includes("|")) {
						rows.push(splitTableRow(lines[i]));
						i += 1;
					}
					const k = `b-${blockKey++}`;
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "cb-md-table-wrap",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
							className: "cb-md-table",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: headers.map((h, ci) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: renderInline(h, `${k}-th-${ci}`) }, ci)) }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: rows.map((row, ri) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: headers.map((_, ci) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: renderInline(row[ci] ?? "", `${k}-td-${ri}-${ci}`) }, ci)) }, ri)) })]
						})
					}, k));
					continue;
				}
				if (/^>\s?/.test(trimmed)) {
					const quoteLines = [];
					while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
						quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
						i += 1;
					}
					const k = `b-${blockKey++}`;
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("blockquote", {
						className: "cb-md-quote",
						children: renderLinesWithBreaks(quoteLines, k)
					}, k));
					continue;
				}
				if (/^[-*+•]\s+/.test(trimmed)) {
					const items = [];
					while (i < lines.length && /^[-*+•]\s+/.test(lines[i].trim())) {
						const body = lines[i].trim().replace(/^[-*+•]\s+/, "");
						const taskMatch = /^\[( |x|X)\]\s+(.*)$/.exec(body);
						if (taskMatch) items.push({
							checked: taskMatch[1].toLowerCase() === "x",
							text: taskMatch[2]
						});
						else items.push({ text: body });
						i += 1;
					}
					const k = `b-${blockKey++}`;
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
						className: "cb-md-ul",
						children: items.map((it, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
							className: it.checked !== void 0 ? "cb-md-task" : void 0,
							children: [it.checked !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: `cb-md-checkbox ${it.checked ? "cb-checked" : ""}`,
								children: it.checked ? "✓" : ""
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: renderInline(it.text, `${k}-li-${idx}`) })]
						}, idx))
					}, k));
					continue;
				}
				if (/^\d+[.)]\s+/.test(trimmed)) {
					const items = [];
					while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
						items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ""));
						i += 1;
					}
					const k = `b-${blockKey++}`;
					blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ol", {
						className: "cb-md-ol",
						children: items.map((it, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", { children: renderInline(it, `${k}-oli-${idx}`) }, idx))
					}, k));
					continue;
				}
				const paraLines = [];
				while (i < lines.length) {
					const cur = lines[i];
					if (!cur.trim()) break;
					if (paraLines.length > 0 && isBlockStarter(cur)) break;
					if (cur.includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) break;
					paraLines.push(cur);
					i += 1;
				}
				const k = `b-${blockKey++}`;
				blocks.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: "cb-md-p",
					children: renderLinesWithBreaks(paraLines, k)
				}, k));
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: `cb-md ${className ?? ""}`,
				children: blocks
			});
		}
		// src/core/AssistantContent.tsx
		/**
		* Shared Assistant content & Agent choice prompt renderers used by both
		* ChronoCanvas expanded cards and DSH root-level Magnetic Tiles (`shell.overlay`).
		*/
		function AgentChoiceCard({ choice }) {
			const statusLabel = choice.status === "waiting" ? "等待选择" : choice.status === "cancelled" ? "已取消" : choice.status === "interrupted" ? "已中断" : "已回答";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `cb-choice-card cb-choice-${choice.status}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "cb-choice-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "cb-choice-title",
							children: [choice.header ? `AGENT 选择 · ${choice.header}` : "AGENT 提问与选择", choice.multiSelect ? "（多选）" : ""]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: `cb-choice-badge cb-choice-badge-${choice.status}`,
							children: statusLabel
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "cb-choice-question",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChronoMarkdown, { text: choice.question })
					}),
					choice.options.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "cb-choice-options",
						children: choice.options.map((opt, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: `cb-choice-opt ${opt.selected ? "cb-selected" : ""}`,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "cb-choice-indicator",
								"aria-hidden": "true",
								children: opt.selected ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheck, { size: "xs" }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "cb-choice-radio" })
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "cb-choice-opt-body",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "cb-choice-opt-label",
									children: opt.label
								}), opt.description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "cb-choice-opt-desc",
									children: opt.description
								})]
							})]
						}, idx))
					}),
					choice.customAnswer && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "cb-choice-custom",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "cb-choice-custom-tag",
							children: "你的回答"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: choice.customAnswer })]
					}),
					choice.status === "waiting" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "cb-choice-hint",
						children: "等待你在下方原生对话栏提交选择"
					})
				]
			});
		}
		function AssistantContentBody({ node }) {
			if (node.aiSegments && node.aiSegments.length > 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "cb-ai-segments",
				children: node.aiSegments.map((seg) => seg.kind === "markdown" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChronoMarkdown, { text: seg.text }, seg.id) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentChoiceCard, { choice: seg.choice }, seg.id))
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "cb-ai-segments",
				children: [(node.aiFullText || !node.choices || node.choices.length === 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChronoMarkdown, { text: node.aiFullText || node.aiSummary }), node.choices && node.choices.map((ch) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AgentChoiceCard, { choice: ch }, ch.id))]
			});
		}
		function getZoomTier(zoom) {
			if (zoom < .56) return "l1";
			if (zoom <= 1.08) return "l2";
			return "l3";
		}
		function getTrackNodes(graph, trackId) {
			return Object.values(graph.nodes).filter((n) => n.trackId === trackId).sort((a, b) => a.order - b.order);
		}
		function clampSheetW(w) {
			if (typeof w !== "number" || !Number.isFinite(w)) return 468;
			return Math.max(320, Math.min(960, Math.round(w)));
		}
		function clampSheetH(h) {
			if (typeof h !== "number" || !Number.isFinite(h)) return 400;
			return Math.max(220, Math.min(920, Math.round(h)));
		}
		function computeChronoLayout(graph, opts) {
			const isL1 = getZoomTier(opts.zoom) === "l1";
			const allTracks = Object.values(graph.tracks);
			const orderedTracks = [];
			const rootTrack = graph.tracks[graph.rootTrackId];
			const seenTrackIds = /* @__PURE__ */ new Set();
			const pushTrack = (t) => {
				if (!t || seenTrackIds.has(t.id)) return;
				if (t.kind === "agent-subagent" && !opts.showSubagents) return;
				if (opts.hideDeadEnds && t.status === "dead-end" && t.collapsed) return;
				seenTrackIds.add(t.id);
				orderedTracks.push(t);
			};
			pushTrack(rootTrack);
			const childrenByParent = /* @__PURE__ */ new Map();
			allTracks.forEach((t) => {
				if (!t.parentTrackId) return;
				const list = childrenByParent.get(t.parentTrackId) ?? [];
				list.push(t);
				childrenByParent.set(t.parentTrackId, list);
			});
			const appendSubtree = (parentId) => {
				const kids = childrenByParent.get(parentId) ?? [];
				kids.filter((k) => k.kind === "agent-subagent").forEach((k) => {
					pushTrack(k);
					appendSubtree(k.id);
				});
				kids.filter((k) => k.kind !== "agent-subagent").forEach((k) => {
					pushTrack(k);
					appendSubtree(k.id);
				});
			};
			if (rootTrack) appendSubtree(rootTrack.id);
			allTracks.filter((t) => t.id !== graph.rootTrackId && !seenTrackIds.has(t.id) && (t.kind === "linked-peer" || !t.parentTrackId)).forEach((peer) => {
				pushTrack(peer);
				appendSubtree(peer.id);
			});
			allTracks.forEach((t) => pushTrack(t));
			const nodeCol = {};
			const mainNodes = rootTrack ? getTrackNodes(graph, rootTrack.id) : [];
			let curMainCol = 0;
			mainNodes.forEach((n, i) => {
				if (i > 0) {
					const prevId = mainNodes[i - 1].id;
					const hasConvergingSub = orderedTracks.some((t) => t.kind === "agent-subagent" && t.forkFromNodeId === prevId && t.convergeToNodeId === n.id);
					curMainCol += hasConvergingSub ? 2 : 1;
				}
				nodeCol[n.id] = curMainCol;
			});
			for (let pass = 0; pass < 4; pass++) {
				orderedTracks.forEach((t) => {
					if (t.id === graph.rootTrackId) return;
					const baseCol = t.forkFromNodeId && nodeCol[t.forkFromNodeId] !== void 0 ? nodeCol[t.forkFromNodeId] + 1 : t.kind === "linked-peer" || !t.parentTrackId ? 0 : 1;
					getTrackNodes(graph, t.id).forEach((n, idx) => {
						nodeCol[n.id] = baseCol + idx;
					});
				});
				graph.mergeLinks.forEach((ml) => {
					if (nodeCol[ml.sourceNodeId] !== void 0 && nodeCol[ml.targetNodeId] !== void 0) {
						const minTargetCol = nodeCol[ml.sourceNodeId] + 1;
						if (nodeCol[ml.targetNodeId] < minTargetCol) {
							const delta = minTargetCol - nodeCol[ml.targetNodeId];
							const tNodes = getTrackNodes(graph, ml.targetTrackId);
							const startIdx = tNodes.findIndex((n) => n.id === ml.targetNodeId);
							if (startIdx >= 0) for (let k = startIdx; k < tNodes.length; k++) nodeCol[tNodes[k].id] += delta;
						}
					}
				});
			}
			let ghostCol = null;
			if (opts.pendingForkNodeId && nodeCol[opts.pendingForkNodeId] !== void 0) ghostCol = nodeCol[opts.pendingForkNodeId] + 1;
			const colWidths = {};
			const setColWidth = (col, w) => {
				colWidths[col] = Math.max(colWidths[col] ?? 0, w);
			};
			orderedTracks.forEach((t) => {
				if (t.collapsed) return;
				getTrackNodes(graph, t.id).forEach((n) => {
					const col = nodeCol[n.id] ?? 0;
					const expanded = opts.expandedNodeIds.has(n.id);
					const microOpen = opts.microOpenNodeIds.has(n.id) && n.microSteps.length > 0;
					const custom = opts.nodeCustomSizes?.[n.id];
					setColWidth(col, expanded ? clampSheetW(custom?.width) : isL1 ? 185 : microOpen ? 316 : 258);
				});
			});
			if (ghostCol !== null) setColWidth(ghostCol, 258);
			const colKeys = Object.keys(colWidths).map(Number);
			const maxCol = colKeys.length > 0 ? Math.max(...colKeys) : 0;
			const HEADER_W = 218;
			const H_GAP = isL1 ? 54 : 68;
			const colX = {};
			const colRightGutter = {};
			let accX = 260;
			for (let c = 0; c <= maxCol; c++) {
				const cw = colWidths[c] || 258;
				colX[c] = accX;
				colRightGutter[c] = accX + cw + H_GAP * .44;
				accX += cw + H_GAP;
			}
			const TOP_META_CLEARANCE = 34;
			const ROW_GAP = isL1 ? 30 : 38;
			let accY = 38;
			const trackRects = {};
			const nodeRects = {};
			orderedTracks.forEach((t) => {
				if (t.collapsed) {
					const axisY = accY + 14;
					trackRects[t.id] = {
						x: 18,
						axisY,
						w: HEADER_W,
						collapsed: true
					};
					accY += 46;
					return;
				}
				const axisY = accY + TOP_META_CLEARANCE;
				const tNodes = getTrackNodes(graph, t.id);
				let belowAxisH = isL1 ? 40 : 128;
				tNodes.forEach((n) => {
					const expanded = opts.expandedNodeIds.has(n.id);
					const microOpen = opts.microOpenNodeIds.has(n.id) && n.microSteps.length > 0;
					const custom = opts.nodeCustomSizes?.[n.id];
					const expandedH = clampSheetH(custom?.height);
					let bh = expanded ? expandedH + 28 : isL1 ? 36 : 122;
					if (microOpen && !isL1) bh += 112;
					if (n.mergedFrom && !isL1 && !expanded) bh += 22;
					belowAxisH = Math.max(belowAxisH, bh);
				});
				trackRects[t.id] = {
					x: 18,
					axisY,
					w: HEADER_W,
					collapsed: false
				};
				tNodes.forEach((n) => {
					const col = nodeCol[n.id] ?? 0;
					const expanded = opts.expandedNodeIds.has(n.id);
					const microOpen = opts.microOpenNodeIds.has(n.id) && n.microSteps.length > 0;
					const custom = opts.nodeCustomSizes?.[n.id];
					const w = expanded ? clampSheetW(custom?.width) : isL1 ? 185 : microOpen ? 316 : 258;
					nodeRects[n.id] = {
						x: colX[col],
						axisY,
						dotX: colX[col] + 12,
						w,
						sheetH: expanded ? custom?.height !== void 0 ? clampSheetH(custom.height) : void 0 : void 0,
						col
					};
				});
				accY = axisY + belowAxisH + ROW_GAP;
			});
			let ghostRect = null;
			if (opts.pendingForkNodeId && nodeRects[opts.pendingForkNodeId] && ghostCol !== null) {
				const axisY = accY + TOP_META_CLEARANCE;
				ghostRect = {
					x: colX[ghostCol],
					axisY,
					dotX: colX[ghostCol] + 12,
					w: 258,
					parentId: opts.pendingForkNodeId
				};
				accY = axisY + 120;
			}
			return {
				orderedTracks,
				trackRects,
				nodeRects,
				ghostRect,
				colX,
				colRightGutter,
				totalW: Math.max(1200, accX + 240),
				totalH: Math.max(760, accY + 200)
			};
		}
		/**
		* Architectural subway / Git-graph elbow path routed strictly through the open vertical column gutter
		* so inter-track lines never cross text below nodes.
		*/
		function gutterElbowPath(x1, y1, x2, y2, gutterX) {
			const dy = y2 - y1;
			if (Math.abs(dy) < 2) return `M ${x1} ${y1} L ${x2} ${y2}`;
			const dir = dy > 0 ? 1 : -1;
			const gx = Math.max(x1 + 24, Math.min(x2 - 24, gutterX));
			const r = Math.min(22, Math.abs(dy) / 2, Math.abs(gx - x1) / 2, Math.abs(x2 - gx) / 2);
			return [
				`M ${x1} ${y1}`,
				`L ${gx - r} ${y1}`,
				`Q ${gx} ${y1}, ${gx} ${y1 + dir * r}`,
				`L ${gx} ${y2 - dir * r}`,
				`Q ${gx} ${y2}, ${gx + r} ${y2}`,
				`L ${x2} ${y2}`
			].join(" ");
		}
		// src/core/types.ts
		const DEFAULT_SHORTCUTS = {
			toggleMicro: "e",
			forkNode: "f",
			toggleExpand: "Enter",
			pinTile: "p",
			zoomL1: "1",
			zoomL2: "2",
			zoomL3: "3"
		};
		function normalizeShortcutKey(e) {
			const key = e.key;
			if (!key || key === "Shift" || key === "Control" || key === "Alt" || key === "Meta") return null;
			const parts = [];
			if (e.ctrlKey) parts.push("Ctrl");
			if (e.altKey) parts.push("Alt");
			if (e.shiftKey && key.length > 1) parts.push("Shift");
			const normKey = key === " " ? "Space" : key.length === 1 ? key.toLowerCase() : key;
			parts.push(normKey);
			return parts.join("+");
		}
		function formatShortcutLabel(binding) {
			if (!binding) return "未设置";
			return binding.split("+").map((p) => p.length === 1 ? p.toUpperCase() : p).join(" + ");
		}
		const RESTRAINED_BRANCH_PALETTE = [
			"#2563eb",
			"#059669",
			"#4f46e5",
			"#b45309",
			"#0f766e",
			"#52525b"
		];
		// src/core/ChronoCanvas.tsx
		function resolveTrackStroke(track, theme) {
			if (theme === "dark" && track.color === "#27272a") return "#d4d4d8";
			return track.color;
		}
		const canvasViewCache = /* @__PURE__ */ new Map();
		function ChronoCanvas({ graph, actions, theme = "light", useNativeComposer = false, shortcuts: hostShortcuts, managedShortcuts = false, onRegisterShortcutHandler, pinnedTileNodeIds, onToggleTile, focusRequest, onFocusConsumed, workspaceName, workspaceSessions }) {
			const savedView = canvasViewCache.get(graph.rootTrackId);
			const [selectedNodeId, setSelectedNodeId] = (0, react.useState)(null);
			const [activeTrackId, setActiveTrackId] = (0, react.useState)(graph.activeTrackId || graph.rootTrackId);
			const [expandedNodeIds, setExpandedNodeIds] = (0, react.useState)(() => new Set(savedView?.expandedNodeIds ?? []));
			const [microOpenNodeIds, setMicroOpenNodeIds] = (0, react.useState)(() => new Set(savedView?.microOpenNodeIds ?? []));
			const activeShortcuts = hostShortcuts ?? DEFAULT_SHORTCUTS;
			const [pendingForkNodeId, setPendingForkNodeId] = (0, react.useState)(null);
			const [forkingNodeId, setForkingNodeId] = (0, react.useState)(null);
			const [showSubagents, setShowSubagents] = (0, react.useState)(true);
			const [hideDeadEnds, setHideDeadEnds] = (0, react.useState)(false);
			const [searchQuery, setSearchQuery] = (0, react.useState)("");
			const [linkModalOpen, setLinkModalOpen] = (0, react.useState)(false);
			const [linkSearch, setLinkSearch] = (0, react.useState)("");
			const [pan, setPan] = (0, react.useState)(() => savedView?.pan ?? {
				x: 32,
				y: 88
			});
			const [zoom, setZoom] = (0, react.useState)(() => savedView?.zoom ?? .92);
			const [isPanning, setIsPanning] = (0, react.useState)(false);
			const [nodeSizes, setNodeSizes] = (0, react.useState)(() => savedView?.nodeSizes ?? {});
			const [resizingNodeId, setResizingNodeId] = (0, react.useState)(null);
			const [composerText, setComposerText] = (0, react.useState)("");
			const [sending, setSending] = (0, react.useState)(false);
			const [inspector, setInspector] = (0, react.useState)(null);
			const [cherryTrackId, setCherryTrackId] = (0, react.useState)(null);
			const [cherrySummary, setCherrySummary] = (0, react.useState)("");
			const [toast, setToast] = (0, react.useState)(null);
			const viewportRef = (0, react.useRef)(null);
			const composerRef = (0, react.useRef)(null);
			const panOriginRef = (0, react.useRef)({
				x: 0,
				y: 0
			});
			const resizeStateRef = (0, react.useRef)(null);
			const toastTimerRef = (0, react.useRef)(null);
			const showToast = (0, react.useCallback)((msg) => {
				setToast(msg);
				if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
				toastTimerRef.current = window.setTimeout(() => setToast(null), 2600);
			}, []);
			(0, react.useEffect)(() => {
				canvasViewCache.set(graph.rootTrackId, {
					pan,
					zoom,
					expandedNodeIds: Array.from(expandedNodeIds),
					microOpenNodeIds: Array.from(microOpenNodeIds),
					nodeSizes
				});
			}, [
				graph.rootTrackId,
				pan,
				zoom,
				expandedNodeIds,
				microOpenNodeIds,
				nodeSizes
			]);
			const selectTrackTarget = (0, react.useCallback)((trackId, opts) => {
				const tr = graph.tracks[trackId];
				if (!tr || tr.kind === "agent-subagent") return;
				const changed = trackId !== activeTrackId || trackId !== graph.activeTrackId;
				setActiveTrackId(trackId);
				setPendingForkNodeId(null);
				if (opts?.keepNodeId) setSelectedNodeId(opts.keepNodeId);
				else {
					const tNodes = getTrackNodes(graph, trackId);
					if (tNodes.length > 0) setSelectedNodeId(tNodes[tNodes.length - 1].id);
				}
				actions.onSelectTrack(trackId);
				if (changed) showToast(`已切换发送目标至「${tr.title}」`);
			}, [
				graph,
				activeTrackId,
				actions,
				showToast
			]);
			(0, react.useEffect)(() => {
				if (graph.activeTrackId && graph.tracks[graph.activeTrackId]) {
					setActiveTrackId(graph.activeTrackId);
					const tNodes = getTrackNodes(graph, graph.activeTrackId);
					if (tNodes.length > 0 && (!selectedNodeId || !graph.nodes[selectedNodeId])) setSelectedNodeId(tNodes[tNodes.length - 1].id);
				}
			}, [
				graph.activeTrackId,
				graph.tracks,
				graph.nodes,
				selectedNodeId
			]);
			const layout = (0, react.useMemo)(() => computeChronoLayout(graph, {
				zoom,
				showSubagents,
				hideDeadEnds,
				expandedNodeIds,
				microOpenNodeIds,
				pendingForkNodeId,
				nodeCustomSizes: nodeSizes
			}), [
				graph,
				zoom,
				showSubagents,
				hideDeadEnds,
				expandedNodeIds,
				microOpenNodeIds,
				pendingForkNodeId,
				nodeSizes
			]);
			const forkOriginIds = (0, react.useMemo)(() => {
				const set = /* @__PURE__ */ new Set();
				Object.values(graph.tracks).forEach((t) => {
					if (t.forkFromNodeId) set.add(t.forkFromNodeId);
				});
				if (pendingForkNodeId) set.add(pendingForkNodeId);
				return set;
			}, [graph.tracks, pendingForkNodeId]);
			const getViewportSize = (0, react.useCallback)(() => {
				const el = viewportRef.current;
				return {
					w: el ? el.clientWidth : window.innerWidth,
					h: el ? el.clientHeight : window.innerHeight
				};
			}, []);
			const focusNode = (0, react.useCallback)((nodeId) => {
				const r = layout.nodeRects[nodeId];
				if (!r) return;
				const { w, h } = getViewportSize();
				setPan({
					x: w * .45 - (r.x + r.w / 2) * zoom,
					y: h * .4 - r.axisY * zoom
				});
			}, [
				layout.nodeRects,
				zoom,
				getViewportSize
			]);
			(0, react.useEffect)(() => {
				if (!focusRequest) return;
				const node = graph.nodes[focusRequest.nodeId];
				const rect = layout.nodeRects[focusRequest.nodeId];
				if (!node || !rect) return;
				setSelectedNodeId(node.id);
				setActiveTrackId(node.trackId);
				const { w, h } = getViewportSize();
				setPan({
					x: w * .42 - (rect.x + rect.w / 2) * zoom,
					y: h * .36 - rect.axisY * zoom
				});
				showToast(`已定位至 ${node.turnLabel} · ${node.title}`);
				onFocusConsumed?.(focusRequest.seq);
			}, [
				focusRequest,
				graph.nodes,
				layout.nodeRects,
				zoom,
				getViewportSize,
				showToast,
				onFocusConsumed
			]);
			const fitToView = (0, react.useCallback)(() => {
				const { w, h } = getViewportSize();
				const vw = w - 60;
				const vh = h - 220;
				const scaleX = vw / Math.max(400, layout.totalW - 140);
				const scaleY = vh / Math.max(300, layout.totalH - 120);
				setZoom(Math.max(.4, Math.min(.98, Math.min(scaleX, scaleY))));
				setPan({
					x: 24,
					y: 82
				});
			}, [
				layout.totalW,
				layout.totalH,
				getViewportSize
			]);
			const toggleExpand = (0, react.useCallback)((nodeId) => {
				setExpandedNodeIds((prev) => {
					const next = new Set(prev);
					if (next.has(nodeId)) next.delete(nodeId);
					else next.add(nodeId);
					return next;
				});
				setSelectedNodeId(nodeId);
			}, []);
			const toggleMicro = (0, react.useCallback)((nodeId) => {
				const node = graph.nodes[nodeId];
				if (!node || node.microSteps.length === 0) {
					showToast("当前轮次没有工具调用或思考步骤");
					return;
				}
				setMicroOpenNodeIds((prev) => {
					const next = new Set(prev);
					if (next.has(nodeId)) next.delete(nodeId);
					else next.add(nodeId);
					return next;
				});
				setSelectedNodeId(nodeId);
			}, [graph.nodes, showToast]);
			const startFork = (0, react.useCallback)(async (nodeId) => {
				const node = graph.nodes[nodeId];
				if (!node || forkingNodeId) return;
				if (node.placeholder) {
					actions.onSelectTrack(node.trackId);
					showToast("正在加载该对话历史，加载完成后即可分叉");
					return;
				}
				if (node.forkStarter) {
					actions.onSelectTrack(node.trackId);
					document.querySelector("[data-composer-seat] textarea")?.focus();
					showToast("已就绪，请直接在底部输入框发送新分支首条消息");
					return;
				}
				if (!graph.capabilities.canFork) {
					showToast("当前平台暂不支持直接分叉");
					return;
				}
				if (node.status === "streaming") {
					showToast("当前轮次正在生成中，请等待本轮完成后分叉或从上一轮分叉");
					return;
				}
				setSelectedNodeId(nodeId);
				if (useNativeComposer && actions.onForkNode) {
					setForkingNodeId(nodeId);
					try {
						const childId = await actions.onForkNode(node.trackId, node);
						if (childId) {
							setActiveTrackId(childId);
							showToast(`已从 ${node.turnLabel} 创建分支，请直接在底部输入框发送消息`);
						}
					} catch (err) {
						showToast(`创建分支失败：${err instanceof Error ? err.message : String(err)}`);
					} finally {
						setForkingNodeId(null);
					}
					return;
				}
				setPendingForkNodeId(nodeId);
				setTimeout(() => composerRef.current?.focus(), 0);
				showToast(`准备从 ${node.turnLabel} 拉出新分支，输入并发送即可创建独立泳道`);
			}, [
				graph.nodes,
				graph.capabilities.canFork,
				forkingNodeId,
				useNativeComposer,
				actions,
				showToast
			]);
			const pinnedTileIdSet = pinnedTileNodeIds ?? /* @__PURE__ */ new Set();
			const toggleTile = (0, react.useCallback)((nodeId) => {
				const node = graph.nodes[nodeId];
				if (!node) return;
				if (node.placeholder) {
					actions.onSelectTrack(node.trackId);
					showToast("正在加载该分支历史，加载完成后即可贴为磁贴");
					return;
				}
				if (!onToggleTile) return;
				const track = graph.tracks[node.trackId];
				if (onToggleTile(node, track?.title ?? "DSH AGENT", track?.color ?? "#27272a") === "pinned") showToast(`已将 ${node.turnLabel} 贴为 DSH 磁贴（切换对话或模式仍保留在屏幕上，支持磁吸并排）`);
				else showToast(`已取消磁贴「${node.turnLabel}」`);
			}, [
				graph.nodes,
				graph.tracks,
				actions,
				onToggleTile,
				showToast
			]);
			const openCherryModal = (0, react.useCallback)((trackId) => {
				const tr = graph.tracks[trackId];
				if (!tr) return;
				const tNodes = getTrackNodes(graph, trackId);
				const last = tNodes[tNodes.length - 1];
				setCherryTrackId(trackId);
				setCherrySummary(`【来自「${tr.title}」的提炼结论】\n${last ? last.aiSummary || last.aiFullText.slice(0, 260) : "已完成支线探索与验证，核心结论确认可行，请结合主线上下文继续推进。"}`);
			}, [graph]);
			const handleConfirmCherryPick = (0, react.useCallback)(async () => {
				if (!cherryTrackId || !cherrySummary.trim()) return;
				const tNodes = getTrackNodes(graph, cherryTrackId);
				const last = tNodes[tNodes.length - 1];
				if (!last) return;
				const targetTrackId = graph.tracks[cherryTrackId]?.parentTrackId ?? graph.rootTrackId;
				try {
					await actions.onCherryPickMerge({
						sourceTrackId: cherryTrackId,
						sourceNodeId: last.id,
						targetTrackId,
						summary: cherrySummary.trim()
					});
					actions.onSetTrackMeta(cherryTrackId, { status: "adopted" });
					setCherryTrackId(null);
					setActiveTrackId(targetTrackId);
					showToast("已将分支结论注入父线上下文并建立回流连线");
				} catch (err) {
					showToast(`回流失败：${err instanceof Error ? err.message : String(err)}`);
				}
			}, [
				cherryTrackId,
				cherrySummary,
				graph,
				actions,
				showToast
			]);
			const handleSend = (0, react.useCallback)(async () => {
				const text = composerText.trim();
				if (!text || sending) return;
				setSending(true);
				try {
					if (pendingForkNodeId) {
						const parentNode = graph.nodes[pendingForkNodeId];
						if (parentNode) {
							const childTrackId = await actions.onForkAndSend(parentNode.trackId, parentNode, text);
							setPendingForkNodeId(null);
							setComposerText("");
							if (childTrackId) {
								setActiveTrackId(childTrackId);
								showToast("已通过原生 fork 拉出新时间线分支");
							}
						}
					} else {
						const targetTrack = graph.tracks[activeTrackId] ? activeTrackId : graph.rootTrackId;
						await actions.onSend(targetTrack, text);
						setComposerText("");
					}
				} catch (err) {
					showToast(`发送失败：${err instanceof Error ? err.message : String(err)}`);
				} finally {
					setSending(false);
				}
			}, [
				composerText,
				sending,
				pendingForkNodeId,
				graph,
				actions,
				activeTrackId,
				showToast
			]);
			const dispatchShortcutAction = (0, react.useCallback)((action) => {
				switch (action) {
					case "toggleMicro":
						if (selectedNodeId) toggleMicro(selectedNodeId);
						break;
					case "forkNode":
						if (selectedNodeId) startFork(selectedNodeId);
						break;
					case "pinTile":
						if (selectedNodeId) toggleTile(selectedNodeId);
						break;
					case "toggleExpand":
						if (selectedNodeId) toggleExpand(selectedNodeId);
						break;
					case "zoomL1":
						setZoom(.48);
						break;
					case "zoomL2":
						setZoom(.92);
						break;
					case "zoomL3":
						setZoom(1.12);
						if (selectedNodeId) setExpandedNodeIds((prev) => new Set(prev).add(selectedNodeId));
				}
			}, [
				selectedNodeId,
				toggleMicro,
				startFork,
				toggleTile,
				toggleExpand
			]);
			(0, react.useEffect)(() => {
				if (!onRegisterShortcutHandler) return;
				onRegisterShortcutHandler(dispatchShortcutAction);
				return () => {
					onRegisterShortcutHandler(null);
				};
			}, [onRegisterShortcutHandler, dispatchShortcutAction]);
			(0, react.useEffect)(() => {
				const onKeyDown = (e) => {
					if (e.key === "Escape") {
						if (linkModalOpen) {
							setLinkModalOpen(false);
							return;
						}
						if (inspector) {
							setInspector(null);
							return;
						}
						if (cherryTrackId) {
							setCherryTrackId(null);
							return;
						}
						if (pendingForkNodeId) {
							setPendingForkNodeId(null);
							return;
						}
						return;
					}
					const tag = document.activeElement?.tagName;
					if (tag === "INPUT" || tag === "TEXTAREA") return;
					if (!managedShortcuts) {
						const pressed = normalizeShortcutKey(e);
						if (pressed && activeShortcuts.toggleMicro && pressed === activeShortcuts.toggleMicro) {
							e.preventDefault();
							dispatchShortcutAction("toggleMicro");
							return;
						} else if (pressed && activeShortcuts.forkNode && pressed === activeShortcuts.forkNode) {
							e.preventDefault();
							dispatchShortcutAction("forkNode");
							return;
						} else if (pressed && activeShortcuts.pinTile && pressed === activeShortcuts.pinTile) {
							e.preventDefault();
							dispatchShortcutAction("pinTile");
							return;
						} else if (pressed && activeShortcuts.toggleExpand && pressed === activeShortcuts.toggleExpand || activeShortcuts.toggleExpand === "Enter" && e.key === " ") {
							e.preventDefault();
							dispatchShortcutAction("toggleExpand");
							return;
						} else if (pressed && activeShortcuts.zoomL1 && pressed === activeShortcuts.zoomL1) {
							dispatchShortcutAction("zoomL1");
							return;
						} else if (pressed && activeShortcuts.zoomL2 && pressed === activeShortcuts.zoomL2) {
							dispatchShortcutAction("zoomL2");
							return;
						} else if (pressed && activeShortcuts.zoomL3 && pressed === activeShortcuts.zoomL3) {
							dispatchShortcutAction("zoomL3");
							return;
						}
					}
					if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
						if (!selectedNodeId) return;
						const cur = graph.nodes[selectedNodeId];
						if (!cur) return;
						const tNodes = getTrackNodes(graph, cur.trackId);
						const idx = tNodes.findIndex((n) => n.id === cur.id);
						const next = tNodes[e.key === "ArrowRight" ? idx + 1 : idx - 1];
						if (next) {
							e.preventDefault();
							setSelectedNodeId(next.id);
							focusNode(next.id);
						}
					} else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
						const visibleTracks = layout.orderedTracks.filter((t) => !t.collapsed);
						const curTrackId = selectedNodeId && graph.nodes[selectedNodeId]?.trackId || activeTrackId;
						const idx = visibleTracks.findIndex((t) => t.id === curTrackId);
						const nextTrack = visibleTracks[e.key === "ArrowDown" ? idx + 1 : idx - 1];
						if (nextTrack) {
							const tNodes = getTrackNodes(graph, nextTrack.id);
							if (tNodes.length > 0) {
								e.preventDefault();
								const target = tNodes[tNodes.length - 1];
								setSelectedNodeId(target.id);
								if (nextTrack.kind !== "agent-subagent") {
									setActiveTrackId(nextTrack.id);
									actions.onSelectTrack(nextTrack.id);
								}
								focusNode(target.id);
							}
						}
					}
				};
				window.addEventListener("keydown", onKeyDown);
				return () => window.removeEventListener("keydown", onKeyDown);
			}, [
				managedShortcuts,
				activeShortcuts,
				dispatchShortcutAction,
				linkModalOpen,
				inspector,
				cherryTrackId,
				pendingForkNodeId,
				selectedNodeId,
				graph,
				layout.orderedTracks,
				activeTrackId,
				focusNode,
				actions
			]);
			const handleViewportMouseDown = (e) => {
				const target = e.target;
				if (target.closest(".cb-node") || target.closest(".cb-track-header") || target.closest(".cb-collapsed-pill") || target.closest(".cb-merge-pill")) return;
				setIsPanning(true);
				panOriginRef.current = {
					x: e.clientX - pan.x,
					y: e.clientY - pan.y
				};
			};
			(0, react.useEffect)(() => {
				if (!isPanning) return;
				const onMove = (e) => {
					setPan({
						x: e.clientX - panOriginRef.current.x,
						y: e.clientY - panOriginRef.current.y
					});
				};
				const onUp = () => setIsPanning(false);
				window.addEventListener("mousemove", onMove);
				window.addEventListener("mouseup", onUp);
				return () => {
					window.removeEventListener("mousemove", onMove);
					window.removeEventListener("mouseup", onUp);
				};
			}, [isPanning]);
			const startSheetResize = (0, react.useCallback)((e, nodeId, dir) => {
				e.stopPropagation();
				e.preventDefault();
				const sheetEl = e.currentTarget.closest(".cb-sheet");
				const curSize = nodeSizes[nodeId];
				const measuredW = sheetEl ? sheetEl.offsetWidth : 468;
				const measuredH = sheetEl ? sheetEl.offsetHeight : 400;
				resizeStateRef.current = {
					nodeId,
					dir,
					startX: e.clientX,
					startY: e.clientY,
					startW: curSize?.width ?? measuredW,
					startH: curSize?.height ?? measuredH,
					zoom
				};
				setResizingNodeId(nodeId);
			}, [nodeSizes, zoom]);
			const resetSheetSize = (0, react.useCallback)((nodeId) => {
				setNodeSizes((prev) => {
					if (!prev[nodeId]) return prev;
					const next = { ...prev };
					delete next[nodeId];
					return next;
				});
			}, []);
			(0, react.useEffect)(() => {
				if (!resizingNodeId) return;
				const onMove = (e) => {
					const st = resizeStateRef.current;
					if (!st) return;
					const dx = (e.clientX - st.startX) / st.zoom;
					const dy = (e.clientY - st.startY) / st.zoom;
					setNodeSizes((prev) => {
						const existing = prev[st.nodeId] ?? {};
						const nextW = st.dir === "e" || st.dir === "se" ? Math.max(320, Math.min(960, Math.round(st.startW + dx))) : existing.width;
						const nextH = st.dir === "s" || st.dir === "se" ? Math.max(220, Math.min(920, Math.round(st.startH + dy))) : existing.height;
						return {
							...prev,
							[st.nodeId]: {
								width: nextW,
								height: nextH
							}
						};
					});
				};
				const onUp = () => {
					resizeStateRef.current = null;
					setResizingNodeId(null);
				};
				window.addEventListener("mousemove", onMove);
				window.addEventListener("mouseup", onUp);
				return () => {
					window.removeEventListener("mousemove", onMove);
					window.removeEventListener("mouseup", onUp);
				};
			}, [resizingNodeId]);
			const handleWheel = (e) => {
				const target = e.target;
				if (target.closest(".cb-sheet-body") || target.closest(".cb-micro-dotline")) return;
				e.preventDefault();
				const factor = e.deltaY < 0 ? 1.09 : .92;
				const nextZoom = Math.max(.36, Math.min(1.35, zoom * factor));
				const rect = viewportRef.current?.getBoundingClientRect();
				if (!rect) return;
				const mx = e.clientX - rect.left;
				const my = e.clientY - rect.top;
				setPan((prev) => ({
					x: mx - (mx - prev.x) / zoom * nextZoom,
					y: my - (my - prev.y) / zoom * nextZoom
				}));
				setZoom(nextZoom);
			};
			const tier = getZoomTier(zoom);
			const activeTrack = graph.tracks[activeTrackId] ?? graph.tracks[graph.rootTrackId];
			const activeTrackNodes = activeTrack ? getTrackNodes(graph, activeTrack.id) : [];
			const activeTail = activeTrackNodes[activeTrackNodes.length - 1];
			const pendingForkNode = pendingForkNodeId ? graph.nodes[pendingForkNodeId] : null;
			const q = searchQuery.trim().toLowerCase();
			const { edgeElements, mergeBadges } = (0, react.useMemo)(() => {
				const edges = [];
				const badges = [];
				layout.orderedTracks.forEach((t) => {
					const tRect = layout.trackRects[t.id];
					if (!tRect) return;
					const stroke = resolveTrackStroke(t, theme);
					if (t.collapsed) {
						const parentRect = t.forkFromNodeId ? layout.nodeRects[t.forkFromNodeId] : void 0;
						if (parentRect) {
							const gx = layout.colRightGutter[parentRect.col] ?? parentRect.dotX + 240;
							const d = gutterElbowPath(parentRect.dotX, parentRect.axisY, gx + 48, tRect.axisY, gx);
							edges.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
								className: "cb-edge",
								d,
								stroke: "#a1a1aa",
								strokeWidth: 1.25,
								strokeDasharray: "3 4",
								opacity: .65
							}, `col-fork-${t.id}`), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
								className: "cb-edge",
								d: `M ${gx + 48} ${tRect.axisY} L ${layout.totalW - 200} ${tRect.axisY}`,
								stroke: "#a1a1aa",
								strokeWidth: 1.15,
								strokeDasharray: "2 6",
								opacity: .4
							}, `col-line-${t.id}`));
						}
						return;
					}
					const tNodes = getTrackNodes(graph, t.id);
					const isSub = t.kind === "agent-subagent";
					if (t.id === graph.rootTrackId && tNodes.length > 0) {
						const first = layout.nodeRects[tNodes[0].id];
						if (first) edges.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							className: "cb-edge",
							d: `M ${tRect.x + tRect.w} ${first.axisY} L ${first.dotX} ${first.axisY}`,
							stroke,
							strokeWidth: 1.5,
							opacity: .32
						}, `lead-${t.id}`));
					}
					if (t.forkFromNodeId && layout.nodeRects[t.forkFromNodeId] && tNodes.length > 0) {
						const p = layout.nodeRects[t.forkFromNodeId];
						const first = layout.nodeRects[tNodes[0].id];
						if (first) {
							const gx = (layout.colRightGutter[p.col] ?? p.dotX + 240) + (isSub ? -8 : 6);
							const d = gutterElbowPath(p.dotX, p.axisY, first.dotX, first.axisY, gx);
							edges.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
								className: `cb-edge ${isSub ? "cb-edge-subagent" : ""}`,
								d,
								stroke,
								strokeWidth: isSub ? 1.4 : 1.65,
								opacity: t.status === "dead-end" ? .48 : isSub ? .62 : .78
							}, `fork-${t.id}`));
						}
					}
					for (let i = 0; i < tNodes.length - 1; i++) {
						const a = layout.nodeRects[tNodes[i].id];
						const b = layout.nodeRects[tNodes[i + 1].id];
						if (!a || !b) continue;
						const streaming = tNodes[i + 1].status === "streaming";
						edges.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							className: `cb-edge ${streaming ? "cb-edge-streaming" : isSub ? "cb-edge-subagent" : ""}`,
							d: `M ${a.dotX} ${a.axisY} L ${b.dotX} ${b.axisY}`,
							stroke,
							strokeWidth: isSub ? 1.4 : 1.65,
							opacity: t.status === "dead-end" ? .5 : .78
						}, `seg-${tNodes[i].id}-${tNodes[i + 1].id}`));
					}
					if (isSub && t.convergeToNodeId && layout.nodeRects[t.convergeToNodeId] && tNodes.length > 0) {
						const last = layout.nodeRects[tNodes[tNodes.length - 1].id];
						const target = layout.nodeRects[t.convergeToNodeId];
						if (last && target) {
							const gx = layout.colRightGutter[last.col] ?? last.dotX + 240;
							edges.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
								className: "cb-edge cb-edge-subagent",
								d: gutterElbowPath(last.dotX, last.axisY, target.dotX, target.axisY, gx),
								stroke,
								strokeWidth: 1.4,
								opacity: .58
							}, `conv-${t.id}`));
						}
					}
				});
				if (layout.ghostRect && layout.nodeRects[layout.ghostRect.parentId]) {
					const p = layout.nodeRects[layout.ghostRect.parentId];
					const gx = (layout.colRightGutter[p.col] ?? p.dotX + 240) + 12;
					edges.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						className: "cb-edge cb-edge-streaming",
						d: gutterElbowPath(p.dotX, p.axisY, layout.ghostRect.dotX, layout.ghostRect.axisY, gx),
						stroke: "#059669",
						strokeWidth: 1.65,
						opacity: .9
					}, "ghost-fork"));
				}
				graph.mergeLinks.forEach((ml) => {
					const src = layout.nodeRects[ml.sourceNodeId];
					const dst = layout.nodeRects[ml.targetNodeId];
					if (!src || !dst) return;
					const gx = layout.colRightGutter[src.col] ?? (src.dotX + dst.dotX) / 2;
					edges.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
						className: "cb-edge cb-edge-cherry",
						d: gutterElbowPath(src.dotX, src.axisY, dst.dotX, dst.axisY, gx),
						stroke: "var(--cb-line-merge)",
						strokeWidth: 1.5,
						opacity: .72
					}, `merge-${ml.id}`));
					badges.push({
						id: ml.id,
						x: gx,
						y: (src.axisY + dst.axisY) / 2,
						label: ml.label || "Cherry-pick 回流",
						link: ml
					});
				});
				return {
					edgeElements: edges,
					mergeBadges: badges
				};
			}, [
				layout,
				graph,
				theme
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				"data-conversation-composer-overlay": "true",
				"data-chronobranch-view": "true",
				"data-chronobranch-session": graph.activeTrackId,
				className: `cb-root ${theme === "dark" ? "cb-theme-dark" : ""} ${resizingNodeId ? "cb-resizing" : ""}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: "cb-hud-top",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-hud-group",
							children: [
								actions.onClose && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: "cb-btn-mode",
									onClick: actions.onClose,
									title: "切回原生线性对话框",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconLinear, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "线性对话" })]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "cb-divider" })] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: `cb-hud-btn ${tier === "l1" ? "cb-active" : ""}`,
									onClick: () => setZoom(.48),
									title: `L1 极简点线鸟瞰 (${formatShortcutLabel(activeShortcuts.zoomL1)})`,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconZoomL1, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "鸟瞰" })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: `cb-hud-btn ${tier === "l2" ? "cb-active" : ""}`,
									onClick: () => setZoom(.92),
									title: `L2 点线平衡阅读 (${formatShortcutLabel(activeShortcuts.zoomL2)})`,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconZoomL2, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "点线" })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: `cb-hud-btn ${tier === "l3" ? "cb-active" : ""}`,
									onClick: () => {
										setZoom(1.12);
										if (selectedNodeId) setExpandedNodeIds((prev) => new Set(prev).add(selectedNodeId));
									},
									title: `L3 展开完整对话 (${formatShortcutLabel(activeShortcuts.zoomL3)})`,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconZoomL3, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "展开" })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: "cb-zoom-pill",
									children: [Math.round(zoom * 100), "%"]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: "cb-hud-btn",
									onClick: fitToView,
									title: "自适应全览画布",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconFit, {})
								})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-hud-group",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "cb-search-box",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconSearch, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "text",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										placeholder: "搜索节点或代码..."
									})]
								}),
								workspaceSessions && actions.onLinkSession && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "cb-divider" }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: `cb-hud-btn ${workspaceSessions.filter((s) => s.linkKind === "manual" || s.linkKind === "fork").length > 0 ? "cb-active" : ""}`,
									onClick: () => {
										setLinkSearch("");
										setLinkModalOpen(true);
									},
									title: "关联同一工作区下的任意对话，点开其中任一对话的时间线均可查看全部",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconLink, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["关联对话", workspaceSessions.filter((s) => s.linkKind !== "none").length > 1 ? ` · ${workspaceSessions.filter((s) => s.linkKind !== "none").length}` : ""] })]
								})] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "cb-divider" }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: `cb-hud-btn ${showSubagents ? "cb-active" : ""}`,
									onClick: () => setShowSubagents((v) => !v),
									title: "显示或隐藏 Agent 派生泳道",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconSubagent, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Agent 派生" })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: `cb-hud-btn ${hideDeadEnds ? "cb-active" : ""}`,
									onClick: () => setHideDeadEnds((v) => !v),
									title: "隐藏已折叠的死胡同分支",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconEyeOff, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "隐死胡同" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: viewportRef,
						className: `cb-viewport cb-zoom-${tier} ${isPanning ? "cb-panning" : ""}`,
						onMouseDown: handleViewportMouseDown,
						onWheel: handleWheel,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-world",
							style: { transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})` },
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
									className: "cb-edges-svg",
									width: layout.totalW,
									height: layout.totalH,
									children: edgeElements
								}),
								mergeBadges.map((b) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: "cb-merge-pill",
									style: {
										left: b.x,
										top: b.y
									},
									onClick: (e) => {
										e.stopPropagation();
										setInspector({
											kind: "merge",
											merge: b.link
										});
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										style: {
											display: "inline-flex",
											color: "var(--cb-line-merge)"
										},
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMerge, {})
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: b.label })]
								}, b.id)),
								layout.orderedTracks.map((t) => {
									const r = layout.trackRects[t.id];
									if (!r) return null;
									const color = resolveTrackStroke(t, theme);
									const tNodes = getTrackNodes(graph, t.id);
									if (t.collapsed) {
										const parentRect = t.forkFromNodeId ? layout.nodeRects[t.forkFromNodeId] : void 0;
										const gx = parentRect ? (layout.colRightGutter[parentRect.col] ?? 300) + 56 : 280;
										return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											className: "cb-collapsed-pill",
											style: { transform: `translate3d(${gx}px, ${r.axisY - 12}px, 0)` },
											onClick: () => actions.onSetTrackMeta(t.id, { collapsed: false }),
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "cb-dot",
												style: { background: "#a1a1aa" }
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: t.title }),
												" · 已折叠 (",
												tNodes.length,
												" 轮 · 点击展开)"
											] })]
										}, `th-${t.id}`);
									}
									const isActive = activeTrackId === t.id && !pendingForkNodeId;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: `cb-track-header ${isActive ? "cb-active-track" : ""}`,
										style: {
											"--cb-track-color": color,
											transform: `translate3d(${r.x}px, ${r.axisY - 22}px, 0)`
										},
										onClick: () => {
											if (t.kind === "agent-subagent") {
												actions.onSelectTrack(t.id);
												if (tNodes.length > 0) setSelectedNodeId(tNodes[tNodes.length - 1].id);
												return;
											}
											selectTrackTarget(t.id);
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "cb-track-title",
											title: t.title,
											children: t.title
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "cb-track-meta",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: `cb-tag ${t.status === "adopted" ? "cb-tag-adopted" : ""}`,
													children: t.kind === "main" ? "主线" : t.kind === "linked-peer" ? "已关联" : t.kind === "agent-subagent" ? "Agent 派生" : t.status === "adopted" ? "已采纳" : t.status === "dead-end" ? "死胡同" : "分支"
												}),
												t.hasMore && graph.capabilities.canLoadOlder && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													className: "cb-track-mini-btn",
													onClick: (e) => {
														e.stopPropagation();
														actions.onLoadOlder(t.id);
													},
													children: t.loadingOlder ? "加载中…" : "加载更早"
												}),
												t.kind === "linked-peer" && actions.onUnlinkSession && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													className: "cb-track-mini-btn",
													title: "取消此对话的时间线关联",
													onClick: (e) => {
														e.stopPropagation();
														actions.onUnlinkSession?.(t.id);
														showToast(`已取消「${t.title}」的时间线关联`);
													},
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconUnlink, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "断开" })]
												}),
												t.kind === "human-branch" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													className: "cb-track-mini-btn",
													title: "提炼结论回流主线",
													onClick: (e) => {
														e.stopPropagation();
														openCherryModal(t.id);
													},
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMerge, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "回流" })]
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													className: "cb-track-mini-btn",
													title: "折叠为细虚线",
													onClick: (e) => {
														e.stopPropagation();
														actions.onSetTrackMeta(t.id, {
															status: "dead-end",
															collapsed: true
														});
														if (activeTrackId === t.id) setActiveTrackId(graph.rootTrackId);
													},
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconFold, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "折叠" })]
												})] })
											]
										})]
									}, `th-${t.id}`);
								}),
								layout.orderedTracks.map((t) => {
									if (t.collapsed) return null;
									const color = resolveTrackStroke(t, theme);
									const isSub = t.kind === "agent-subagent";
									return getTrackNodes(graph, t.id).map((n) => {
										const r = layout.nodeRects[n.id];
										if (!r) return null;
										const isSelected = selectedNodeId === n.id;
										const isExpanded = expandedNodeIds.has(n.id);
										const isMicroOpen = microOpenNodeIds.has(n.id) && n.microSteps.length > 0;
										const isTilePinned = pinnedTileIdSet.has(n.id);
										const isForkOrigin = forkOriginIds.has(n.id);
										let searchCls = "";
										if (q) searchCls = `${n.title} ${n.userText} ${n.aiSummary} ${n.aiFullText} ${n.codeSnippet ?? ""}`.toLowerCase().includes(q) ? "cb-search-match" : "cb-dimmed";
										const microSubAxis = isMicroOpen ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "cb-micro-subaxis",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "cb-micro-head",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "微观执行小轴 · 点击查看 Diff / 日志" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													style: {
														fontSize: 10.5,
														color: "var(--cb-text-muted)"
													},
													onClick: (e) => {
														e.stopPropagation();
														toggleMicro(n.id);
													},
													children: "收起 (E)"
												})]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "cb-micro-dotline",
												children: n.microSteps.map((step, sIdx) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													className: [
														"cb-micro-node",
														sIdx === 0 ? "cb-micro-first" : "",
														sIdx === n.microSteps.length - 1 ? "cb-micro-last" : ""
													].filter(Boolean).join(" "),
													title: `${step.title}${step.duration ? ` (${step.duration})` : ""}`,
													onClick: (e) => {
														e.stopPropagation();
														setInspector({
															kind: "step",
															node: n,
															step
														});
													},
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-micro-dur",
															children: step.duration || "\xA0"
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-micro-rail",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: `cb-micro-dot cb-ms-${step.status}` })
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-micro-icon",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StepKindIcon, { kind: step.kind })
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-micro-name",
															children: step.title
														})
													]
												}, step.id))
											})]
										}) : null;
										const sheetMicroTrigger = n.microSteps.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											className: `cb-micro-trigger ${isMicroOpen ? "cb-open" : ""}`,
											title: "展开/收起微观执行小轴 (E)",
											onClick: (e) => {
												e.stopPropagation();
												toggleMicro(n.id);
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMicroAxis, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "微观小轴" })]
										}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {});
										const actionStrip = n.forkStarter ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "cb-hover-actions",
											children: [
												isExpanded && !n.placeholder && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													className: `cb-act-btn ${isTilePinned ? "cb-act-active" : ""}`,
													title: `悬挂为屏幕磁贴，切换对话/模式不消失${activeShortcuts.pinTile ? ` (${formatShortcutLabel(activeShortcuts.pinTile)})` : ""}`,
													onClick: (e) => {
														e.stopPropagation();
														toggleTile(n.id);
													},
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMagnet, { size: "xs" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "磁贴" })]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													className: "cb-act-btn",
													title: isExpanded ? `收起为点线态${activeShortcuts.toggleExpand ? ` (${formatShortcutLabel(activeShortcuts.toggleExpand)})` : ""}` : `展开完整对话${activeShortcuts.toggleExpand ? ` (${formatShortcutLabel(activeShortcuts.toggleExpand)})` : ""}`,
													onClick: (e) => {
														e.stopPropagation();
														if (n.placeholder) {
															actions.onSelectTrack(n.trackId);
															return;
														}
														toggleExpand(n.id);
													},
													children: [isExpanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCollapse, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconExpand, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: isExpanded ? "收起" : "展开" })]
												}),
												!isSub && !n.placeholder && graph.capabilities.canFork && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													className: "cb-act-btn",
													disabled: forkingNodeId === n.id,
													title: `从此处拉出新分支时间线${activeShortcuts.forkNode ? ` (${formatShortcutLabel(activeShortcuts.forkNode)})` : ""}`,
													onClick: (e) => {
														e.stopPropagation();
														startFork(n.id);
													},
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconFork, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: forkingNodeId === n.id ? "分叉中…" : "分叉" })]
												})
											]
										});
										return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: [
												"cb-node",
												isSelected ? "cb-selected" : "",
												isExpanded ? "cb-expanded" : "",
												isTilePinned ? "cb-tile-pinned" : "",
												isSub ? "cb-subagent" : "",
												isForkOrigin ? "cb-fork-origin" : "",
												n.status === "streaming" ? "cb-streaming" : "",
												searchCls
											].filter(Boolean).join(" "),
											style: {
												"--cb-node-color": color,
												width: r.w,
												transform: `translate3d(${r.x}px, ${r.axisY}px, 0)`
											},
											onClick: (e) => {
												if (e.target.closest("button")) return;
												if (e.shiftKey && !n.placeholder && !n.forkStarter) {
													toggleTile(n.id);
													return;
												}
												if (!isSub) {
													selectTrackTarget(n.trackId, { keepNodeId: n.id });
													if (n.forkStarter) document.querySelector("[data-composer-seat] textarea")?.focus();
												} else {
													setSelectedNodeId(n.id);
													setPendingForkNodeId(null);
												}
											},
											onDoubleClick: (e) => {
												if (e.target.closest("button")) return;
												if (n.forkStarter) {
													actions.onSelectTrack(n.trackId);
													document.querySelector("[data-composer-seat] textarea")?.focus();
													return;
												}
												if (n.placeholder) {
													actions.onSelectTrack(n.trackId);
													return;
												}
												toggleExpand(n.id);
											},
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: "cb-node-meta-top",
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-meta-turn",
															children: n.turnLabel
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-meta-time",
															children: n.timestamp
														}),
														n.pinned && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-meta-tag",
															title: "已标记重点",
															children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconPin, {})
														}),
														isTilePinned && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
															className: "cb-meta-tag cb-meta-tile",
															title: "已悬挂为屏幕磁贴",
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMagnet, { size: "xs" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "已贴" })]
														}),
														isForkOrigin && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-meta-tag",
															children: "分叉点"
														})
													]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: "cb-dot-anchor",
													title: "单击选中 / 双击展开完整对话 / Shift+点击贴为屏幕磁贴",
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "cb-dot-core" })
												}),
												isExpanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: "cb-sheet-stack",
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: [
															"cb-sheet",
															r.sheetH !== void 0 ? "cb-sheet-resized" : "",
															isMicroOpen ? "cb-has-micro-below" : ""
														].filter(Boolean).join(" "),
														style: r.sheetH !== void 0 ? { height: r.sheetH } : void 0,
														children: [
															/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																className: "cb-sheet-head",
																children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
																	className: "cb-sheet-title",
																	children: n.title
																}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
																	style: {
																		display: "flex",
																		gap: 4,
																		flexShrink: 0
																	},
																	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
																		className: "cb-act-btn",
																		title: "标记/取消重点",
																		onClick: (e) => {
																			e.stopPropagation();
																			actions.onTogglePin(n.id);
																		},
																		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconPin, {})
																	})
																})]
															}),
															/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																className: "cb-sheet-body",
																children: [
																	n.mergedFrom && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																		className: "cb-merge-note",
																		style: { margin: 0 },
																		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMerge, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["已吸收回流：", n.mergedFrom.trackTitle] })]
																	}),
																	/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																		className: "cb-bubble cb-bubble-user",
																		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																			className: "cb-bubble-role",
																			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "YOU" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: n.timestamp })]
																		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChronoMarkdown, { text: n.userText })]
																	}),
																	/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																		className: "cb-bubble cb-bubble-ai",
																		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																			className: "cb-bubble-role",
																			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: isSub ? "SUBAGENT" : "DSH AGENT" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: n.status === "streaming" ? "生成中…" : n.stats.durationMs ? `${(n.stats.durationMs / 1e3).toFixed(1)}s` : "" })]
																		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssistantContentBody, { node: n })]
																	})
																]
															}),
															/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
																className: "cb-sheet-foot",
																children: [sheetMicroTrigger, actionStrip]
															}),
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
																className: "cb-resize-handle cb-resize-e",
																title: "向右拖动调整宽度",
																onMouseDown: (e) => startSheetResize(e, n.id, "e")
															}),
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
																className: "cb-resize-handle cb-resize-s",
																title: "向下拖动调整高度",
																onMouseDown: (e) => startSheetResize(e, n.id, "s")
															}),
															/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
																className: "cb-resize-handle cb-resize-se",
																title: "拖动自由调整大小（双击恢复默认尺寸）",
																onMouseDown: (e) => startSheetResize(e, n.id, "se"),
																onDoubleClick: (e) => {
																	e.stopPropagation();
																	resetSheetSize(n.id);
																}
															})
														]
													}), isMicroOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
														className: "cb-micro-attached",
														children: microSubAxis
													})]
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													className: `cb-editorial ${n.forkStarter ? "cb-editorial-starter" : ""}`,
													children: [
														n.mergedFrom && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
															className: "cb-merge-note",
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMerge, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["已吸收：", n.mergedFrom.trackTitle] })]
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: "cb-title",
															children: n.title
														}),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: "cb-summary",
															children: n.aiSummary
														}),
														actionStrip && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
															className: "cb-inline-bar cb-inline-bar-clean",
															children: actionStrip
														}),
														microSubAxis
													]
												})
											]
										}, n.id);
									});
								}),
								layout.ghostRect && pendingForkNode && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "cb-node cb-streaming",
									style: {
										"--cb-node-color": "#059669",
										width: layout.ghostRect.w,
										transform: `translate3d(${layout.ghostRect.x}px, ${layout.ghostRect.axisY}px, 0)`
									},
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "cb-node-meta-top",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "cb-meta-turn",
												style: { color: "#059669" },
												children: "NEW"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "cb-meta-time",
												children: "待发送"
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "cb-dot-anchor",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "cb-dot-core" })
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "cb-editorial",
											style: { borderLeftStyle: "dashed" },
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "cb-title",
												children: "新分支起点"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "cb-summary",
												children: [
													"分叉自 ",
													pendingForkNode.turnLabel,
													"（完整继承至此节点前缀上下文）。在下方输入首条问题发送即刻生成新泳道。"
												]
											})]
										})
									]
								})
							]
						})
					}),
					graph.capabilities.canSend && !useNativeComposer && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						className: `cb-composer ${pendingForkNode ? "cb-fork-mode" : ""}`,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-composer-bar",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "cb-composer-target",
								children: pendingForkNode ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: {
										color: "#059669",
										display: "inline-flex"
									},
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconFork, {})
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
									"从 ",
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: pendingForkNode.turnLabel }),
									" 拉出新分支"
								] })] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "cb-dot",
										style: { background: activeTrack ? resolveTrackStroke(activeTrack, theme) : "#27272a" }
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: activeTrack?.title ?? "主线" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										style: {
											color: "var(--cb-text-faint)",
											fontWeight: 400
										},
										children: ["· ", activeTail ? `${activeTail.turnLabel} 后继续` : "开始新对话"]
									})
								] })
							}), pendingForkNode && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "cb-hud-btn",
								style: {
									color: "var(--cb-rose)",
									padding: "2px 6px"
								},
								onClick: () => setPendingForkNodeId(null),
								children: "取消分叉 (Esc)"
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-composer-row",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
									ref: composerRef,
									className: "cb-textarea",
									rows: 1,
									value: composerText,
									onChange: (e) => setComposerText(e.target.value),
									placeholder: pendingForkNode ? `输入新分支首条消息（原生 fork 继承至 ${pendingForkNode.turnLabel}）...` : `在「${activeTrack?.title ?? "当前轨道"}」继续对话（Enter 发送，支持 / 斜杠命令）...`,
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											handleSend();
										}
									}
								}),
								activeTrack?.running && graph.capabilities.canStop && !pendingForkNode && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: "cb-btn-stop",
									onClick: () => void actions.onStop(activeTrack.id),
									title: "停止当前生成",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconStop, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "停止" })]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
									className: "cb-btn-send",
									disabled: sending || !composerText.trim(),
									onClick: () => void handleSend(),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: sending ? "发送中" : "发送" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconSend, {})]
								})
							]
						})]
					}),
					inspector && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
						className: "cb-drawer",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-drawer-head",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: 6,
									fontSize: 13
								},
								children: inspector.kind === "step" && inspector.step ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StepKindIcon, { kind: inspector.step.kind }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: inspector.step.title })] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMerge, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Cherry-pick 回流摘要" })] })
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "cb-hud-btn",
								style: { padding: "3px 6px" },
								onClick: () => setInspector(null),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClose, {})
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-drawer-body",
							children: [inspector.kind === "step" && inspector.step && inspector.node && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: {
									fontSize: 11.5,
									color: "var(--cb-text-muted)",
									marginBottom: 10
								},
								children: [
									"轮次：",
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: inspector.node.turnLabel }),
									" · ",
									inspector.node.title,
									inspector.step.duration ? ` · ${inspector.step.duration}` : ""
								]
							}), inspector.step.diff ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "cb-code-block",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "cb-code-head",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Unified Diff" })
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
									style: { padding: "8px 0" },
									children: inspector.step.diff.split("\n").map((line, i) => {
										const cls = line.startsWith("+") && !line.startsWith("+++") ? "cb-diff-add" : line.startsWith("-") && !line.startsWith("---") ? "cb-diff-del" : "cb-diff-ctx";
										return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: cls,
											children: line
										}, i);
									})
								})]
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "cb-code-block",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "cb-code-head",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: inspector.step.kind.toUpperCase() })
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
									style: { whiteSpace: "pre-wrap" },
									children: inspector.step.detail || "（无详细输出）"
								})]
							})] }), inspector.kind === "merge" && inspector.merge && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "cb-bubble cb-bubble-user",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "cb-bubble-role",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "提炼并注入主线的结论上下文" })
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: inspector.merge.summary })]
							})]
						})]
					}),
					cherryTrackId && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "cb-modal-backdrop",
						onClick: (e) => {
							if (e.target === e.currentTarget) setCherryTrackId(null);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-cherry-modal",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "cb-modal-head",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 7
									},
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMerge, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
										style: { fontSize: 13.5 },
										children: "Cherry-pick · 提炼分支结论回流主线"
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: "cb-hud-btn",
									style: { padding: "3px 6px" },
									onClick: () => setCherryTrackId(null),
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClose, {})
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: { padding: "16px 18px" },
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: {
											fontSize: 12.5,
											color: "var(--cb-text-secondary)"
										},
										children: [
											"来源分支：",
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: graph.tracks[cherryTrackId]?.title }),
											" → 将注入",
											" ",
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: graph.tracks[graph.rootTrackId]?.title ?? "主线" })
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										style: {
											fontSize: 11.5,
											color: "var(--cb-text-muted)",
											marginTop: 6
										},
										children: "编辑提炼后的结论摘要，确认后将发送至主线会话并在画布上生成回流连线："
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
										className: "cb-cherry-textarea",
										value: cherrySummary,
										onChange: (e) => setCherrySummary(e.target.value)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											justifyContent: "flex-end",
											gap: 8,
											marginTop: 14
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "cb-btn-secondary",
											onClick: () => setCherryTrackId(null),
											children: "取消"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "cb-btn-primary",
											onClick: () => void handleConfirmCherryPick(),
											children: "确认回流至主线"
										})]
									})
								]
							})]
						})
					}),
					linkModalOpen && workspaceSessions && actions.onLinkSession && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "cb-modal-backdrop cb-link-backdrop",
						onClick: (e) => {
							if (e.target === e.currentTarget) setLinkModalOpen(false);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "cb-link-modal",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "cb-modal-head",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 8
									},
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconLink, {}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
											style: { fontSize: 13.5 },
											children: "工作区时间线关联"
										}),
										workspaceName && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "cb-tag",
											children: workspaceName
										})
									]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									className: "cb-hud-btn",
									style: { padding: "3px 6px" },
									onClick: () => setLinkModalOpen(false),
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClose, {})
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "cb-link-body",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "cb-link-desc",
										children: "勾选同一工作区下的任意对话进行时间线关联。打开其中任意一个对话的时间线，均可同时查看全部已关联的时间线；分支对话默认与原对话关联。"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "cb-link-search",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconSearch, {}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "text",
											value: linkSearch,
											onChange: (e) => setLinkSearch(e.target.value),
											placeholder: "筛选当前工作区下的对话..."
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "cb-link-list",
										children: [workspaceSessions.filter((item) => {
											const kw = linkSearch.trim().toLowerCase();
											if (!kw) return true;
											return item.title.toLowerCase().includes(kw) || item.id.toLowerCase().includes(kw);
										}).map((item) => {
											const isSelf = item.linkKind === "self";
											const isFork = item.linkKind === "fork";
											const isManual = item.linkKind === "manual";
											const checked = isSelf || isFork || isManual;
											const locked = isSelf || isFork;
											const timeStr = item.updatedAt ? new Date(item.updatedAt).toLocaleString("zh-CN", {
												month: "2-digit",
												day: "2-digit",
												hour: "2-digit",
												minute: "2-digit"
											}) : "";
											return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: `cb-link-row ${checked ? "cb-checked" : ""} ${locked ? "cb-locked" : ""}`,
												onClick: () => {
													if (locked) return;
													if (isManual) actions.onUnlinkSession?.(item.id);
													else actions.onLinkSession?.(item.id);
												},
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: `cb-link-check ${checked ? "cb-checked" : ""}`,
														children: checked && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheck, {})
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														className: "cb-link-info",
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-link-title",
															children: item.title
														}), timeStr && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-link-time",
															children: timeStr
														})]
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "cb-link-badge-col",
														children: isSelf ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-tag cb-tag-adopted",
															children: "当前对话"
														}) : isFork ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-tag",
															children: "分支默认关联"
														}) : isManual ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-tag cb-tag-linked",
															children: "已关联"
														}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: "cb-link-add-hint",
															children: "点击关联"
														})
													})
												]
											}, item.id);
										}), workspaceSessions.length <= 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: "cb-link-empty",
											children: "当前工作区下暂无其他可关联的对话"
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "cb-link-foot",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: "cb-link-count",
											children: [
												"当前时间线组共",
												" ",
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: workspaceSessions.filter((s) => s.linkKind !== "none").length }),
												" 段对话"
											]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "cb-btn-primary",
											onClick: () => setLinkModalOpen(false),
											children: "完成"
										})]
									})
								]
							})]
						})
					}),
					toast && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "cb-toast",
						children: toast
					})
				]
			});
		}
		// src/core/styles.ts
		/**
		* Scoped stylesheet injector for ChronoBranch (.cb-* namespace).
		* Guarantees zero CSS collision with DSH Web's host styles and zero external asset dependency.
		*/
		const STYLE_ELEMENT_ID = "dsh-chronobranch-styles";
		const CHRONOBRANCH_CSS = `
/* ==================== DSH CONVERSATION VIEW INTEGRATION ==================== */
/* Keep DSH's native bottom composer ([data-composer-seat]) 100% intact and consistent
   with chat mode, while guaranteeing the ChronoBranch canvas fills the conversation pane. */
[data-conversation-scroll]:has([data-chronobranch-view]) {
  position: relative !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
}

[data-conversation-scroll]:has([data-chronobranch-view]) [data-slot="conversation.session"],
[data-conversation-scroll]:has([data-chronobranch-view]) [data-slot="conversation.session"] > div,
[data-conversation-scroll]:has([data-chronobranch-view]) [data-slot="conversation.view"],
[data-conversation-scroll]:has([data-chronobranch-view]) [data-slot="conversation.view"] > div {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 1 0% !important;
  min-height: 0 !important;
  height: 100% !important;
  width: 100% !important;
}

/* Make DSH's floating native composer background blend cleanly over the canvas */
[data-conversation-scroll]:has([data-chronobranch-view]) > [data-composer-seat] {
  z-index: 10 !important;
  pointer-events: none;
}

[data-conversation-scroll]:has([data-chronobranch-view]) > [data-composer-seat] > * {
  pointer-events: auto;
}

/* Elevate DSH's shell.overlay layer above the conversation pane so Magnetic Tiles are NEVER covered */
div:has(> [data-slot="shell.overlay"] [data-chronobranch-tiles]) {
  z-index: 450 !important;
  pointer-events: none !important;
}

[data-slot="shell.overlay"]:has([data-chronobranch-tiles]) {
  pointer-events: none !important;
  z-index: 450 !important;
}

/* ==================== EMBEDDED CONVERSATION CANVAS & ROOT OVERLAY TOKENS ==================== */
.cb-root,
.cb-overlay-host {
  --cb-canvas: #f7f7f8;
  --cb-surface: #ffffff;
  --cb-surface-subtle: #fafafa;
  --cb-surface-muted: #f2f2f4;
  --cb-surface-hover: #ededf0;
  --cb-hud: rgba(255, 255, 255, 0.94);
  --cb-code: #f5f5f7;

  --cb-border-hairline: #ececef;
  --cb-border-subtle: #e4e4e7;
  --cb-border-strong: #d4d4d8;
  --cb-border-focus: #18181b;

  --cb-text: #18181b;
  --cb-text-secondary: #52525b;
  --cb-text-muted: #71717a;
  --cb-text-faint: #a1a1aa;

  --cb-ink: #18181b;
  --cb-ink-hover: #27272a;
  --cb-on-ink: #ffffff;

  --cb-line-main: #27272a;
  --cb-line-merge: #92400e;
  --cb-emerald: #059669;
  --cb-blue: #2563eb;
  --cb-rose: #dc2626;

  --cb-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.035);
  --cb-shadow-sheet: 0 2px 6px rgba(0, 0, 0, 0.04), 0 12px 30px -8px rgba(0, 0, 0, 0.08);
  --cb-shadow-hud: 0 1px 4px rgba(0, 0, 0, 0.045), 0 10px 26px -8px rgba(0, 0, 0, 0.08);
  --cb-shadow-tile: 0 4px 14px rgba(0, 0, 0, 0.07), 0 20px 44px -12px rgba(0, 0, 0, 0.14);

  --cb-font-sans: "Inter", -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif;
  --cb-font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;

  color: var(--cb-text);
  font-family: var(--cb-font-sans);
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  -webkit-app-region: no-drag;
}

.cb-root {
  position: relative;
  isolation: isolate;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 420px;
  flex: 1 1 0%;
  overflow: hidden;
  background: var(--cb-canvas);
  user-select: none;
}

.cb-overlay-host {
  position: fixed;
  inset: 0;
  pointer-events: none !important;
  z-index: 450;
}

.cb-overlay-host .cb-tile {
  pointer-events: auto !important;
}

/* Automatically follow DSH's native dark theme attribute (data-ds-dark-theme) */
body[data-ds-dark-theme] .cb-root,
body[data-ds-dark-theme] .cb-overlay-host,
.cb-root.cb-theme-dark,
.cb-overlay-host.cb-theme-dark {
  --cb-canvas: #111113;
  --cb-surface: #18181b;
  --cb-surface-subtle: #141416;
  --cb-surface-muted: #202024;
  --cb-surface-hover: #27272a;
  --cb-hud: rgba(24, 24, 27, 0.94);
  --cb-code: #141417;

  --cb-border-hairline: #232327;
  --cb-border-subtle: #27272a;
  --cb-border-strong: #3f3f46;
  --cb-border-focus: #e4e4e7;

  --cb-text: #f4f4f5;
  --cb-text-secondary: #a1a1aa;
  --cb-text-muted: #71717a;
  --cb-text-faint: #52525b;

  --cb-ink: #f4f4f5;
  --cb-ink-hover: #e4e4e7;
  --cb-on-ink: #18181b;

  --cb-line-main: #d4d4d8;
  --cb-line-merge: #d97706;

  --cb-shadow-sheet: 0 6px 24px rgba(0, 0, 0, 0.45);
  --cb-shadow-hud: 0 8px 28px rgba(0, 0, 0, 0.45);
  --cb-shadow-tile: 0 10px 36px rgba(0, 0, 0, 0.58);
}

.cb-root *, .cb-root *::before, .cb-root *::after,
.cb-overlay-host *, .cb-overlay-host *::before, .cb-overlay-host *::after {
  box-sizing: border-box;
}

.cb-root button, .cb-root input, .cb-root textarea,
.cb-overlay-host button, .cb-overlay-host input, .cb-overlay-host textarea {
  font-family: inherit;
  color: inherit;
}

.cb-root button,
.cb-overlay-host button {
  cursor: pointer;
  border: none;
  background: transparent;
}

.cb-overlay-host.cb-resizing,
.cb-overlay-host.cb-resizing * {
  user-select: none !important;
}

/* ==================== ICON SYSTEM ==================== */
.cb-icon {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}

.cb-icon-sm { width: 13px; height: 13px; }
.cb-icon-xs { width: 11.5px; height: 11.5px; }

/* ==================== TOP FLOATING HUD ==================== */
.cb-hud-top {
  position: absolute;
  top: 14px;
  left: 16px;
  right: 16px;
  z-index: 64;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;
}

.cb-hud-group {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 7px;
  border-radius: 11px;
  background: var(--cb-hud);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--cb-border-subtle);
  box-shadow: var(--cb-shadow-hud);
  pointer-events: auto;
}

.cb-hud-top .cb-icon-sm {
  width: 15px;
  height: 15px;
}

.cb-btn-mode {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;
  background: var(--cb-ink);
  color: var(--cb-on-ink);
  transition: background 0.14s ease;
}

.cb-btn-mode:hover { background: var(--cb-ink-hover); }

.cb-divider {
  width: 1px;
  height: 18px;
  background: var(--cb-border-subtle);
  margin: 0 4px;
}

.cb-hud-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 11px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--cb-text-secondary);
  border: 1px solid transparent;
  white-space: nowrap;
  transition: all 0.14s ease;
}

.cb-hud-btn:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-hud-btn.cb-active {
  background: var(--cb-surface-muted);
  color: var(--cb-text);
  border-color: var(--cb-border-subtle);
}

.cb-hud-btn.cb-outline {
  border-color: var(--cb-border-strong);
  color: var(--cb-text);
  background: var(--cb-surface);
}

.cb-hud-btn.cb-outline:hover { background: var(--cb-surface-muted); }

.cb-search-box {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 10px;
  border-radius: 8px;
  background: var(--cb-surface-subtle);
  border: 1px solid var(--cb-border-subtle);
  transition: border-color 0.14s;
}

.cb-search-box:focus-within {
  border-color: var(--cb-border-focus);
  background: var(--cb-surface);
}

.cb-search-box input {
  width: 168px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: var(--cb-text);
}

.cb-search-box input::placeholder { color: var(--cb-text-faint); }

.cb-zoom-pill {
  font-family: var(--cb-font-mono);
  font-size: 12px;
  color: var(--cb-text-muted);
  padding: 0 6px;
  min-width: 44px;
  text-align: center;
}

/* ==================== VIEWPORT & SVG EDGES ==================== */
.cb-viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  cursor: grab;
}

.cb-viewport.cb-panning { cursor: grabbing; }

.cb-world {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  will-change: transform;
}

.cb-edges-svg {
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  pointer-events: none;
}

.cb-edge {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: d 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}

.cb-edge-subagent { stroke-dasharray: 4 4; }
.cb-edge-cherry { stroke-dasharray: 4 4; }
.cb-edge-streaming {
  stroke-dasharray: 6 4;
  animation: cbDashFlow 0.85s linear infinite;
}

@keyframes cbDashFlow {
  to { stroke-dashoffset: -20; }
}

.cb-merge-pill {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 500;
  background: var(--cb-surface);
  color: var(--cb-text-secondary);
  border: 1px solid var(--cb-border-strong);
  box-shadow: var(--cb-shadow-xs);
  white-space: nowrap;
  z-index: 15;
}

.cb-merge-pill:hover {
  color: var(--cb-text);
  border-color: var(--cb-line-merge);
}

/* ==================== TRACK HEADERS ==================== */
.cb-track-header {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 10px 9px;
  border-left: 2px solid var(--cb-track-color, var(--cb-line-main));
  border-bottom: 1.5px solid var(--cb-border-strong);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 8;
  width: 212px;
  cursor: pointer;
}

.cb-track-header.cb-active-track { border-left-width: 2.5px; }

.cb-track-title {
  font-weight: 600;
  font-size: 12.5px;
  color: var(--cb-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-track-meta {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.cb-tag {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  font-weight: 500;
  background: var(--cb-surface-muted);
  color: var(--cb-text-muted);
}

.cb-tag-adopted {
  background: rgba(5, 150, 105, 0.09);
  color: #047857;
}

.cb-theme-dark .cb-tag-adopted { color: #34d399; }

.cb-track-mini-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 10.5px;
  color: var(--cb-text-muted);
}

.cb-track-mini-btn:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-collapsed-pill {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--cb-surface);
  border: 1px dashed var(--cb-border-strong);
  color: var(--cb-text-muted);
  font-size: 11px;
  z-index: 8;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.cb-collapsed-pill:hover {
  color: var(--cb-text);
  border-color: var(--cb-text-secondary);
}

/* ==================== DOT-AND-LINE NODES ==================== */
.cb-node {
  position: absolute;
  z-index: 10;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), width 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.16s ease;
  user-select: text;
}

.cb-node:hover { z-index: 18; }
.cb-node.cb-selected { z-index: 20; }
.cb-node.cb-dimmed { opacity: 0.22; }

.cb-node-meta-top {
  position: absolute;
  top: -24px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  cursor: pointer;
}

.cb-meta-turn {
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  font-weight: 600;
  color: var(--cb-text-secondary);
}

.cb-meta-time {
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  color: var(--cb-text-faint);
}

.cb-meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  color: var(--cb-text-muted);
  padding: 0 5px;
  border-radius: 4px;
  background: var(--cb-surface-muted);
}

.cb-dot-anchor {
  position: absolute;
  top: 0;
  left: 12px;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 12;
}

.cb-dot-core {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--cb-canvas);
  border: 2px solid var(--cb-node-color, var(--cb-line-main));
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

.cb-node.cb-fork-origin .cb-dot-core {
  width: 13px;
  height: 13px;
  box-shadow: 0 0 0 3px var(--cb-canvas), 0 0 0 4.5px var(--cb-node-color, var(--cb-line-main));
}

.cb-node.cb-subagent .cb-dot-core {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  transform: rotate(45deg);
  border-width: 1.75px;
}

.cb-node:hover .cb-dot-core { transform: scale(1.22); }
.cb-node.cb-subagent:hover .cb-dot-core { transform: rotate(45deg) scale(1.22); }

.cb-node.cb-selected .cb-dot-core {
  background: var(--cb-node-color, var(--cb-line-main));
  box-shadow: 0 0 0 3px var(--cb-canvas), 0 0 0 4.5px var(--cb-node-color, var(--cb-line-main));
}

.cb-node.cb-compare-picked .cb-dot-core {
  background: var(--cb-blue);
  border-color: var(--cb-blue);
  box-shadow: 0 0 0 3px var(--cb-canvas), 0 0 0 5px var(--cb-blue);
}

.cb-node.cb-streaming .cb-dot-core {
  background: var(--cb-emerald);
  border-color: var(--cb-emerald);
  animation: cbDotPulse 1.2s ease-in-out infinite;
}

@keyframes cbDotPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.36); }
  50% { box-shadow: 0 0 0 6px rgba(5, 150, 105, 0); }
}

/* ==================== BORDERLESS EDITORIAL TEXT ==================== */
.cb-editorial {
  margin-top: 15px;
  margin-left: 11px;
  padding: 2px 0 4px 13px;
  border-left: 1px solid var(--cb-border-subtle);
  transition: border-color 0.16s ease;
}

.cb-node:hover .cb-editorial,
.cb-node.cb-selected .cb-editorial { border-left-color: var(--cb-border-strong); }

.cb-node.cb-search-match .cb-editorial { border-left: 2px solid var(--cb-text); }

.cb-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--cb-text);
  line-height: 1.4;
  letter-spacing: -0.01em;
  cursor: pointer;
  margin-bottom: 5px;
}

.cb-title:hover {
  text-decoration: underline;
  text-decoration-color: var(--cb-border-strong);
  text-underline-offset: 3px;
}

.cb-summary {
  font-size: 12.2px;
  line-height: 1.62;
  color: var(--cb-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}

.cb-merge-note {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  font-size: 11px;
  color: var(--cb-line-merge);
  font-weight: 500;
}

.cb-inline-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
  min-height: 24px;
}

.cb-inline-bar-clean {
  justify-content: flex-start;
}

.cb-micro-trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 7px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 500;
  color: var(--cb-text-muted);
  background: var(--cb-surface-muted);
  border: 1px solid transparent;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.14s ease;
}

.cb-micro-trigger:hover {
  color: var(--cb-text);
  border-color: var(--cb-border-strong);
  background: var(--cb-surface);
}

.cb-micro-trigger.cb-open {
  background: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-hover-actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
  opacity: 0.78;
  transition: opacity 0.15s ease;
}

.cb-node:hover .cb-hover-actions,
.cb-node.cb-selected .cb-hover-actions,
.cb-node.cb-expanded .cb-hover-actions { opacity: 1; }

.cb-act-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--cb-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.cb-act-btn:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-act-btn.cb-act-active {
  background: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-meta-tile {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: var(--cb-blue) !important;
  border-color: rgba(37, 99, 235, 0.28) !important;
  background: rgba(37, 99, 235, 0.07) !important;
}

.cb-node.cb-tile-pinned .cb-dot-core {
  box-shadow: 0 0 0 2.5px var(--cb-canvas), 0 0 0 4.5px var(--cb-blue);
}

.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-summary,
.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-inline-bar,
.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-merge-note,
.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-micro-subaxis { display: none; }

.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-editorial {
  border-left-color: transparent;
  padding-left: 0;
  margin-left: 4px;
  margin-top: 12px;
}

.cb-zoom-l1 .cb-node:not(.cb-expanded) .cb-title {
  font-size: 12.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ==================== EXPANDED PURE WHITE DIALOG SHEET ==================== */
.cb-root.cb-resizing,
.cb-root.cb-resizing * {
  user-select: none !important;
}

.cb-sheet-stack {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

.cb-sheet {
  position: relative;
  border-radius: 10px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: var(--cb-shadow-sheet);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cb-sheet.cb-has-micro-below {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.cb-micro-attached {
  border: 1px solid var(--cb-border-strong);
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: var(--cb-surface-subtle);
  box-shadow: var(--cb-shadow-sheet);
  overflow: hidden;
}

.cb-micro-attached .cb-micro-subaxis {
  margin-top: 0;
  padding: 10px 14px 12px;
  border-top: none;
  background: transparent;
}

.cb-sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--cb-border-hairline);
  background: var(--cb-surface-subtle);
  flex-shrink: 0;
}

.cb-sheet-title {
  font-weight: 600;
  font-size: 13px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cb-sheet-body {
  padding: 13px 14px;
  max-height: 340px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
  min-height: 0;
  user-select: text;
}

.cb-sheet.cb-sheet-resized .cb-sheet-body {
  max-height: none;
}

.cb-sheet-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 13px;
  border-top: 1px solid var(--cb-border-hairline);
  background: var(--cb-surface-subtle);
  flex-shrink: 0;
}

/* Interactive resize handles */
.cb-resize-handle {
  position: absolute;
  z-index: 15;
}

.cb-resize-e {
  top: 8px;
  right: 0;
  bottom: 16px;
  width: 7px;
  cursor: ew-resize;
}

.cb-resize-e::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 2px;
  width: 2px;
  height: 28px;
  border-radius: 2px;
  background: transparent;
  transform: translateY(-50%);
  transition: background 0.14s ease;
}

.cb-resize-e:hover::after {
  background: var(--cb-border-strong);
}

.cb-resize-s {
  left: 8px;
  right: 16px;
  bottom: 0;
  height: 7px;
  cursor: ns-resize;
}

.cb-resize-s::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 2px;
  height: 2px;
  width: 28px;
  border-radius: 2px;
  background: transparent;
  transform: translateX(-50%);
  transition: background 0.14s ease;
}

.cb-resize-s:hover::after {
  background: var(--cb-border-strong);
}

.cb-resize-se {
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
}

.cb-resize-se::after {
  content: "";
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 7px;
  height: 7px;
  border-right: 1.75px solid var(--cb-border-strong);
  border-bottom: 1.75px solid var(--cb-border-strong);
  border-bottom-right-radius: 2px;
  opacity: 0.55;
  transition: opacity 0.14s ease, border-color 0.14s ease;
}

.cb-resize-se:hover::after {
  opacity: 1;
  border-color: var(--cb-text);
}

.cb-bubble {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12.6px;
  line-height: 1.65;
  word-break: break-word;
}

.cb-bubble-user {
  background: var(--cb-surface-muted);
  border: 1px solid var(--cb-border-subtle);
}

.cb-bubble-ai {
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-hairline);
}

.cb-bubble-role {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.45px;
  color: var(--cb-text-muted);
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  user-select: none;
}

/* ==================== MARKDOWN CONTENT TYPOGRAPHY ==================== */
.cb-md {
  color: var(--cb-text);
  font-size: 12.6px;
  line-height: 1.68;
}

.cb-md > *:first-child { margin-top: 0; }
.cb-md > *:last-child { margin-bottom: 0; }

.cb-md-p {
  margin: 0 0 8px;
}

.cb-md-h {
  margin: 12px 0 6px;
  font-weight: 600;
  line-height: 1.38;
  color: var(--cb-text);
  letter-spacing: -0.01em;
}

.cb-md-h1 { font-size: 15px; padding-bottom: 4px; border-bottom: 1px solid var(--cb-border-hairline); }
.cb-md-h2 { font-size: 14px; }
.cb-md-h3 { font-size: 13.2px; }
.cb-md-h4 { font-size: 12.6px; color: var(--cb-text-secondary); }

.cb-md-inline-code {
  font-family: var(--cb-font-mono);
  font-size: 11.4px;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--cb-surface-muted);
  border: 1px solid var(--cb-border-hairline);
  color: var(--cb-text);
}

.cb-md-link {
  color: var(--cb-blue);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.cb-md-link:hover { opacity: 0.82; }

.cb-md-ul,
.cb-md-ol {
  margin: 4px 0 8px;
  padding-left: 19px;
}

.cb-md-ul li,
.cb-md-ol li {
  margin: 3px 0;
}

.cb-md-task {
  list-style: none;
  margin-left: -18px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.cb-md-checkbox {
  width: 14px;
  height: 14px;
  margin-top: 3px;
  border-radius: 3px;
  border: 1px solid var(--cb-border-strong);
  background: var(--cb-surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  flex-shrink: 0;
}

.cb-md-checkbox.cb-checked {
  background: var(--cb-ink);
  border-color: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-md-quote {
  margin: 6px 0 8px;
  padding: 4px 10px;
  border-left: 2.5px solid var(--cb-border-strong);
  color: var(--cb-text-secondary);
  background: var(--cb-surface-subtle);
  border-radius: 0 6px 6px 0;
}

.cb-md-hr {
  border: none;
  border-top: 1px solid var(--cb-border-subtle);
  margin: 10px 0;
}

.cb-md-table-wrap {
  margin: 8px 0;
  overflow-x: auto;
  border: 1px solid var(--cb-border-subtle);
  border-radius: 6px;
}

.cb-md-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.cb-md-table th,
.cb-md-table td {
  padding: 6px 9px;
  border-bottom: 1px solid var(--cb-border-hairline);
  border-right: 1px solid var(--cb-border-hairline);
  text-align: left;
  vertical-align: top;
}

.cb-md-table th:last-child,
.cb-md-table td:last-child { border-right: none; }
.cb-md-table tr:last-child td { border-bottom: none; }

.cb-md-table th {
  background: var(--cb-surface-muted);
  font-weight: 600;
  color: var(--cb-text);
}

.cb-code-block {
  margin: 8px 0;
  border-radius: 7px;
  background: var(--cb-code);
  border: 1px solid var(--cb-border-subtle);
  overflow: hidden;
}

.cb-code-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
  background: var(--cb-surface-muted);
  border-bottom: 1px solid var(--cb-border-subtle);
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  color: var(--cb-text-muted);
  user-select: none;
}

.cb-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--cb-font-sans);
  font-size: 11px;
  color: var(--cb-text-muted);
}

.cb-code-copy:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-code-block pre {
  margin: 0;
  padding: 9px 11px;
  font-family: var(--cb-font-mono);
  font-size: 11.3px;
  line-height: 1.55;
  color: var(--cb-text);
  overflow-x: auto;
  white-space: pre;
}

/* ==================== AGENT USER-CHOICE CARD ==================== */
.cb-ai-segments {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cb-choice-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cb-choice-card {
  border-radius: 8px;
  padding: 10px 12px;
  background: var(--cb-surface-subtle);
  border: 1px solid var(--cb-border-subtle);
}

.cb-choice-card.cb-choice-waiting {
  border-color: var(--cb-blue);
  background: var(--cb-surface);
}

.cb-choice-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.cb-choice-title {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: var(--cb-text-muted);
  text-transform: uppercase;
}

.cb-choice-badge {
  font-size: 10px;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 999px;
  border: 1px solid var(--cb-border-subtle);
  color: var(--cb-text-muted);
  background: var(--cb-surface);
  white-space: nowrap;
}

.cb-choice-badge-answered {
  color: var(--cb-emerald);
  border-color: rgba(5, 150, 105, 0.3);
  background: rgba(5, 150, 105, 0.08);
}

.cb-choice-badge-waiting {
  color: var(--cb-blue);
  border-color: rgba(37, 99, 235, 0.32);
  background: rgba(37, 99, 235, 0.08);
}

.cb-choice-question {
  font-weight: 500;
  margin-bottom: 8px;
}

.cb-choice-options {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cb-choice-opt {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 7px 9px;
  border-radius: 6px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-hairline);
}

.cb-choice-opt.cb-selected {
  border-color: var(--cb-ink);
  background: var(--cb-surface-muted);
}

.cb-choice-indicator {
  width: 15px;
  height: 15px;
  margin-top: 2px;
  border-radius: 50%;
  border: 1.5px solid var(--cb-border-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--cb-on-ink);
}

.cb-choice-opt.cb-selected .cb-choice-indicator {
  background: var(--cb-ink);
  border-color: var(--cb-ink);
}

.cb-choice-radio {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: transparent;
}

.cb-choice-opt-body {
  min-width: 0;
  flex: 1;
}

.cb-choice-opt-label {
  font-size: 12.2px;
  font-weight: 500;
  color: var(--cb-text);
  line-height: 1.45;
}

.cb-choice-opt-desc {
  font-size: 11.4px;
  color: var(--cb-text-muted);
  line-height: 1.45;
  margin-top: 2px;
}

.cb-choice-custom {
  margin-top: 7px;
  padding: 6px 9px;
  border-radius: 6px;
  background: var(--cb-surface);
  border: 1px dashed var(--cb-border-strong);
  font-size: 12px;
  display: flex;
  align-items: baseline;
  gap: 7px;
}

.cb-choice-custom-tag {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--cb-text-muted);
  white-space: nowrap;
}

.cb-choice-hint {
  margin-top: 7px;
  font-size: 11px;
  color: var(--cb-blue);
}

/* ==================== DOT-AND-LINE MICRO-AXIS ==================== */
.cb-micro-subaxis {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed var(--cb-border-subtle);
}

.cb-sheet .cb-micro-subaxis {
  margin-top: 0;
  padding: 10px 14px 12px;
  background: var(--cb-surface-subtle);
  border-top: 1px solid var(--cb-border-hairline);
  flex-shrink: 0;
}

.cb-micro-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--cb-text-faint);
  margin-bottom: 6px;
}

.cb-micro-dotline {
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
  padding: 2px 2px 6px;
  gap: 0;
}

.cb-micro-node {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 84px;
  width: 84px;
  padding: 2px 0 4px;
  border-radius: 6px;
  text-align: center;
  transition: background 0.14s ease;
}

.cb-micro-node:hover {
  background: var(--cb-surface-hover);
}

.cb-micro-dur {
  height: 15px;
  line-height: 15px;
  margin-bottom: 5px;
  font-family: var(--cb-font-mono);
  font-size: 10px;
  color: var(--cb-text-muted);
  white-space: nowrap;
}

.cb-micro-rail {
  position: relative;
  width: 100%;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cb-micro-rail::before,
.cb-micro-rail::after {
  content: "";
  position: absolute;
  top: 50%;
  height: 1.5px;
  background: var(--cb-border-strong);
  transform: translateY(-50%);
}

.cb-micro-rail::before {
  left: 0;
  right: 50%;
}

.cb-micro-rail::after {
  left: 50%;
  right: 0;
}

.cb-micro-node.cb-micro-first .cb-micro-rail::before {
  display: none;
}

.cb-micro-node.cb-micro-last .cb-micro-rail::after {
  display: none;
}

.cb-micro-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--cb-surface);
  border: 1.75px solid var(--cb-text-secondary);
  position: relative;
  z-index: 2;
  transition: all 0.14s ease;
}

.cb-micro-dot.cb-ms-running {
  border-color: var(--cb-emerald);
  background: var(--cb-emerald);
}

.cb-micro-dot.cb-ms-error {
  border-color: var(--cb-rose);
}

.cb-micro-node:hover .cb-micro-dot {
  background: var(--cb-text);
  border-color: var(--cb-text);
  transform: scale(1.18);
}

.cb-micro-icon {
  margin-top: 6px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cb-text-muted);
}

.cb-micro-node:hover .cb-micro-icon {
  color: var(--cb-text);
}

.cb-micro-name {
  margin-top: 2px;
  max-width: 78px;
  padding: 0 3px;
  font-size: 11px;
  line-height: 1.3;
  color: var(--cb-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-micro-node:hover .cb-micro-name {
  color: var(--cb-text);
}

/* ==================== FLOATING COMPOSER / FORK BAR ==================== */
.cb-composer {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 66;
  width: min(720px, calc(100% - 260px));
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  border-radius: 12px;
  box-shadow: var(--cb-shadow-hud);
  padding: 8px 11px;
}

.cb-composer.cb-above-native {
  bottom: calc(var(--dsh-composer-height, 132px) + 12px);
  width: min(640px, calc(100% - 40px));
}

.cb-composer:focus-within { border-color: var(--cb-border-focus); }

.cb-composer.cb-fork-mode {
  border-color: var(--cb-emerald);
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.12), var(--cb-shadow-hud);
}

.cb-composer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--cb-border-hairline);
  font-size: 11.5px;
}

.cb-composer-target {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-weight: 500;
}

.cb-composer-row {
  display: flex;
  align-items: flex-end;
  gap: 6px;
}

.cb-textarea {
  flex: 1;
  min-height: 32px;
  max-height: 108px;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  line-height: 1.5;
  padding: 4px;
  color: var(--cb-text);
}

.cb-textarea::placeholder { color: var(--cb-text-faint); }

.cb-btn-send {
  padding: 6px 12px;
  border-radius: 7px;
  background: var(--cb-ink);
  color: var(--cb-on-ink);
  font-weight: 500;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.cb-btn-send:hover { background: var(--cb-ink-hover); }
.cb-composer.cb-fork-mode .cb-btn-send { background: var(--cb-emerald); color: #fff; }
.cb-btn-stop {
  padding: 6px 11px;
  border-radius: 7px;
  background: rgba(220, 38, 38, 0.1);
  color: var(--cb-rose);
  border: 1px solid rgba(220, 38, 38, 0.28);
  font-weight: 500;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* ==================== DRAWER, SETTINGS & MODALS ==================== */
.cb-drawer {
  position: absolute;
  top: 62px;
  right: 14px;
  bottom: calc(var(--dsh-composer-height, 128px) + 14px);
  width: 400px;
  z-index: 68;
  border-radius: 12px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: var(--cb-shadow-sheet);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cb-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  border-bottom: 1px solid var(--cb-border-hairline);
  background: var(--cb-surface-subtle);
}

.cb-drawer-body {
  padding: 14px;
  overflow-y: auto;
  flex: 1;
  user-select: text;
}

.cb-diff-add { display: block; background: #ecfdf5; color: #065f46; padding: 1px 8px; }
.cb-diff-del { display: block; background: #fef2f2; color: #991b1b; padding: 1px 8px; }
.cb-diff-ctx { display: block; color: var(--cb-text-secondary); padding: 1px 8px; }
.cb-theme-dark .cb-diff-add { background: rgba(16, 185, 129, 0.14); color: #6ee7b7; }
.cb-theme-dark .cb-diff-del { background: rgba(244, 63, 94, 0.14); color: #fda4af; }

/* ==================== MAGNETIC FLOATING TILES (PINBOARD) ==================== */
.cb-tiles-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 69;
}

.cb-tile {
  position: absolute;
  pointer-events: auto;
  border-radius: 10px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: var(--cb-shadow-tile);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 0.14s ease, box-shadow 0.14s ease;
}

.cb-tile.cb-tile-snapped {
  border-color: var(--cb-blue);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.16), var(--cb-shadow-tile);
}

.cb-tile.cb-tile-minimized {
  box-shadow: var(--cb-shadow-hud);
}

.cb-tile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px 7px 12px;
  background: var(--cb-surface-subtle);
  border-bottom: 1px solid var(--cb-border-hairline);
  cursor: grab;
  flex-shrink: 0;
  user-select: none;
}

.cb-tile.cb-tile-minimized .cb-tile-head {
  border-bottom: none;
}

.cb-tile.cb-tile-active .cb-tile-head {
  cursor: grabbing;
}

.cb-tile-id {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.cb-tile-turn {
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--cb-surface-muted);
  color: var(--cb-text);
  flex-shrink: 0;
}

.cb-tile-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--cb-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-tile-tools {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.cb-tile-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  min-width: 22px;
  padding: 0 5px;
  border-radius: 5px;
  font-size: 10.5px;
  font-weight: 500;
  color: var(--cb-text-muted);
  white-space: nowrap;
  transition: background 0.12s ease, color 0.12s ease;
}

.cb-tile-btn:hover {
  background: var(--cb-surface-hover);
  color: var(--cb-text);
}

.cb-tile-btn.cb-active {
  background: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-tile-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  user-select: text;
}

.cb-tile-notice {
  padding: 7px 12px;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--cb-text-secondary);
  background: var(--cb-surface-muted);
  border-bottom: 1px solid var(--cb-border-hairline);
  flex-shrink: 0;
}

.cb-modal-backdrop {
  position: absolute;
  inset: 0;
  z-index: 80;
  background: rgba(24, 24, 27, 0.34);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.cb-modal-head, .cb-modal-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 18px;
  background: var(--cb-surface-subtle);
}

.cb-modal-head { border-bottom: 1px solid var(--cb-border-hairline); }
.cb-modal-foot { border-top: 1px solid var(--cb-border-hairline); }

.cb-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 7px;
  font-weight: 500;
  font-size: 12px;
  background: var(--cb-surface);
  color: var(--cb-text);
  border: 1px solid var(--cb-border-strong);
}

.cb-btn-secondary:hover { background: var(--cb-surface-muted); }

.cb-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 13px;
  border-radius: 7px;
  font-weight: 500;
  font-size: 12px;
  background: var(--cb-ink);
  color: var(--cb-on-ink);
}

.cb-btn-primary:hover { background: var(--cb-ink-hover); }

.cb-cherry-modal {
  width: min(560px, 92vw);
  border-radius: 13px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}

.cb-cherry-textarea {
  width: 100%;
  min-height: 118px;
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--cb-surface-subtle);
  border: 1px solid var(--cb-border-subtle);
  font-size: 12.5px;
  line-height: 1.6;
  outline: none;
  resize: vertical;
}

.cb-cherry-textarea:focus { border-color: var(--cb-border-focus); background: var(--cb-surface); }

.cb-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

/* ==================== SHORTCUT SETTINGS (MODAL & NATIVE DSH SETTINGS) ==================== */
.cb-settings-modal {
  width: min(520px, 92vw);
  border-radius: 13px;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-strong);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}

.cb-sc-list {
  display: flex;
  flex-direction: column;
}

.cb-sc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 9px 0;
  border-bottom: 1px solid var(--cb-border-hairline, var(--dsw-alias-border-l2, #ececef));
}

.cb-sc-row:last-of-type {
  border-bottom: none;
}

.cb-sc-info {
  min-width: 0;
  flex: 1;
}

.cb-sc-label {
  font-size: 12.8px;
  font-weight: 500;
  color: var(--cb-text, var(--dsw-alias-label-primary, #18181b));
}

.cb-sc-desc {
  font-size: 11.4px;
  color: var(--cb-text-muted, var(--dsw-alias-label-tertiary, #71717a));
  margin-top: 2px;
}

.cb-sc-keybtn {
  min-width: 78px;
  padding: 5px 10px;
  border-radius: 6px;
  font-family: "JetBrains Mono", Consolas, monospace;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--cb-text, var(--dsw-alias-label-primary, #18181b));
  background: var(--cb-surface-muted, var(--dsw-alias-bg-module-platform, #f2f2f4));
  border: 1px solid var(--cb-border-subtle, var(--dsw-alias-border-l2, #e4e4e7));
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.14s ease;
}

.cb-sc-keybtn:hover {
  border-color: var(--cb-border-strong, #a1a1aa);
}

.cb-sc-keybtn.cb-capturing {
  background: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
}

.cb-sc-static {
  font-family: "JetBrains Mono", Consolas, monospace;
  font-size: 11px;
  padding: 4px 9px;
  border-radius: 6px;
  color: var(--cb-text-muted, var(--dsw-alias-label-tertiary, #71717a));
  background: var(--cb-surface-subtle, transparent);
  border: 1px dashed var(--cb-border-subtle, var(--dsw-alias-border-l2, #e4e4e7));
  white-space: nowrap;
}

.cb-sc-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--cb-border-hairline, var(--dsw-alias-border-l2, #ececef));
}

.cb-sc-tip {
  font-size: 11px;
  color: var(--cb-text-muted, var(--dsw-alias-label-tertiary, #71717a));
}

.cb-sc-reset {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--cb-text-secondary, var(--dsw-alias-label-secondary, #52525b));
  background: var(--cb-surface-muted, var(--dsw-alias-bg-module-platform, #f2f2f4));
  border: 1px solid var(--cb-border-subtle, var(--dsw-alias-border-l2, #e4e4e7));
  cursor: pointer;
  white-space: nowrap;
}

.cb-sc-reset:hover {
  color: var(--cb-text, var(--dsw-alias-label-primary, #18181b));
  border-color: var(--cb-border-strong, #a1a1aa);
}

.cb-settings-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 4px 0 24px;
}

.cb-settings-section-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--dsw-alias-border-l2, #ececef);
}

.cb-settings-section-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--dsw-alias-label-primary, #18181b);
}

.cb-settings-section-desc {
  margin: 0;
  font-size: 12.5px;
  line-height: 19px;
  color: var(--dsw-alias-label-tertiary, #71717a);
}

.cb-settings-section-card {
  padding: 4px 16px 14px;
  border-radius: 12px;
  border: 1px solid var(--dsw-alias-border-l2, #ececef);
  background: var(--dsw-alias-bg-base, transparent);
}

/* ==================== FORK STARTER NODE ==================== */
.cb-editorial-starter {
  border-left-style: dashed !important;
  border-left-color: var(--cb-emerald) !important;
}

.cb-tag-linked {
  color: var(--cb-blue);
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.24);
}

/* ==================== NATIVE BOTTOM COMPOSER DOCK STRIP ==================== */
.cb-native-dock {
  position: relative;
  z-index: 2;
  pointer-events: auto !important;
  box-sizing: border-box;
  width: calc(100% - var(--dsh-composer-side-clearance, 16px) * 2);
  max-width: var(--dsh-composer-card-max-width, 760px);
  margin: 0 auto 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #e4e4e7;
  color: #3f3f46;
  font-size: 12px;
  line-height: 1.4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cb-native-dock.cb-theme-dark {
  background: rgba(24, 24, 27, 0.94);
  border-color: #2f2f35;
  color: #d4d4d8;
}

.cb-native-dock-fork {
  border-color: rgba(5, 150, 105, 0.42);
  background: rgba(236, 253, 245, 0.95);
  color: #065f46;
}

.cb-native-dock-fork.cb-theme-dark {
  border-color: rgba(52, 211, 153, 0.35);
  background: rgba(6, 78, 59, 0.32);
  color: #a7f3d0;
}

.cb-native-dock-main {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cb-native-dock-icon {
  display: inline-flex;
  align-items: center;
  color: #059669;
  flex-shrink: 0;
}

.cb-native-dock-fork.cb-theme-dark .cb-native-dock-icon {
  color: #34d399;
}

.cb-native-dock-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cb-native-dock-hint {
  color: #71717a;
  font-weight: 400;
}

.cb-native-dock.cb-theme-dark .cb-native-dock-hint {
  color: #a1a1aa;
}

.cb-native-dock-btn {
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0.85;
  transition: opacity 0.14s ease, background 0.14s ease;
}

.cb-native-dock-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.05);
}

.cb-native-dock-tracks {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.cb-native-dock-label {
  font-size: 11.5px;
  font-weight: 500;
  color: #71717a;
  white-space: nowrap;
  flex-shrink: 0;
}

.cb-native-dock.cb-theme-dark .cb-native-dock-label {
  color: #a1a1aa;
}

.cb-native-dock-chips {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

.cb-native-dock-chips::-webkit-scrollbar {
  display: none;
}

.cb-dock-track-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 180px;
  padding: 2px 9px;
  border-radius: 999px;
  border: 1px solid #e4e4e7;
  background: transparent;
  color: #52525b;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.45;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
}

.cb-dock-track-chip:hover {
  background: rgba(0, 0, 0, 0.04);
  color: #18181b;
  border-color: #d4d4d8;
}

.cb-dock-track-chip.cb-active {
  background: #18181b;
  border-color: #18181b;
  color: #ffffff;
}

.cb-native-dock.cb-theme-dark .cb-dock-track-chip {
  border-color: #3f3f46;
  color: #a1a1aa;
}

.cb-native-dock.cb-theme-dark .cb-dock-track-chip:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #f4f4f5;
  border-color: #52525b;
}

.cb-native-dock.cb-theme-dark .cb-dock-track-chip.cb-active {
  background: #f4f4f5;
  border-color: #f4f4f5;
  color: #18181b;
}

.cb-dock-track-chip-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ==================== WORKSPACE TIMELINE LINK MODAL ==================== */
.cb-modal-backdrop.cb-link-backdrop {
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  padding: 64px 20px calc(var(--dsh-composer-height, 168px) + 28px);
}

.cb-link-modal {
  width: min(500px, 90vw);
  max-height: min(100%, 460px);
  display: flex;
  flex-direction: column;
  background: var(--cb-surface);
  border: 1px solid var(--cb-border-subtle);
  border-radius: 12px;
  box-shadow: var(--cb-shadow-sheet);
  overflow: hidden;
}

.cb-link-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px 16px;
  min-height: 0;
  flex: 1 1 auto;
}

.cb-link-desc {
  font-size: 12px;
  line-height: 1.55;
  color: var(--cb-text-muted);
  flex-shrink: 0;
}

.cb-link-search {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--cb-border-subtle);
  background: var(--cb-surface-subtle);
  color: var(--cb-text-muted);
  flex-shrink: 0;
}

.cb-link-search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--cb-text);
  font-size: 12.5px;
}

.cb-link-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  min-height: 0;
  flex: 1 1 auto;
  padding-right: 2px;
}

.cb-link-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 11px;
  border-radius: 8px;
  border: 1px solid var(--cb-border-hairline);
  background: var(--cb-surface);
  text-align: left;
  cursor: pointer;
  transition: background 0.14s ease, border-color 0.14s ease;
}

.cb-link-row:hover:not(.cb-locked) {
  background: var(--cb-surface-hover);
  border-color: var(--cb-border-subtle);
}

.cb-link-row.cb-checked {
  border-color: var(--cb-border-strong);
  background: var(--cb-surface-subtle);
}

.cb-link-row.cb-locked {
  cursor: default;
}

.cb-link-check {
  width: 17px;
  height: 17px;
  border-radius: 5px;
  border: 1.5px solid var(--cb-border-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--cb-on-ink);
  background: var(--cb-surface);
}

.cb-link-check.cb-checked {
  background: var(--cb-ink);
  border-color: var(--cb-ink);
}

.cb-link-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.cb-link-title {
  font-size: 12.8px;
  font-weight: 500;
  color: var(--cb-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cb-link-time {
  font-family: var(--cb-font-mono);
  font-size: 10.5px;
  color: var(--cb-text-faint);
}

.cb-link-badge-col {
  flex-shrink: 0;
}

.cb-link-add-hint {
  font-size: 11px;
  color: var(--cb-text-faint);
}

.cb-link-empty {
  padding: 20px 12px;
  text-align: center;
  font-size: 12px;
  color: var(--cb-text-muted);
}

.cb-link-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--cb-border-hairline);
}

.cb-link-count {
  font-size: 12px;
  color: var(--cb-text-muted);
}

.cb-toast {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 95;
  padding: 7px 14px;
  border-radius: 8px;
  background: var(--cb-ink);
  color: var(--cb-on-ink);
  box-shadow: var(--cb-shadow-hud);
  font-size: 12px;
  font-weight: 500;
}

@media (max-width: 1120px) {
  .cb-shortcuts { display: none; }
  .cb-composer { width: calc(100% - 28px); left: 14px; transform: none; }
}
`;
		function injectChronoStyles() {
			if (typeof document === "undefined") return () => {};
			let styleEl = document.getElementById(STYLE_ELEMENT_ID);
			if (!styleEl) {
				styleEl = document.createElement("style");
				styleEl.id = STYLE_ELEMENT_ID;
				document.head.appendChild(styleEl);
			}
			styleEl.textContent = CHRONOBRANCH_CSS;
			return () => {
				const existing = document.getElementById(STYLE_ELEMENT_ID);
				if (existing) existing.remove();
			};
		}
		// src/client/composer-dock-store.ts
		function sameTracks(a, b) {
			if (a.length !== b.length) return false;
			for (let i = 0; i < a.length; i++) if (a[i].id !== b[i].id || a[i].title !== b[i].title || a[i].color !== b[i].color || a[i].active !== b[i].active) return false;
			return true;
		}
		var ComposerDockStore = class {
			snapshot = {
				timelineMountedFor: null,
				trackCount: 1,
				activeTrackTitle: "",
				activeTrackColor: "#27272a",
				tracks: [],
				forkNotice: null
			};
			listeners = /* @__PURE__ */ new Set();
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			};
			getSnapshot = () => this.snapshot;
			setTimelineContext(sessionId, trackCount = 1, activeTrackTitle = "", activeTrackColor = "#27272a", tracks = []) {
				const prev = this.snapshot;
				if (prev.timelineMountedFor === sessionId && prev.trackCount === trackCount && prev.activeTrackTitle === activeTrackTitle && prev.activeTrackColor === activeTrackColor && sameTracks(prev.tracks, tracks)) return;
				this.snapshot = {
					...prev,
					timelineMountedFor: sessionId,
					trackCount,
					activeTrackTitle,
					activeTrackColor,
					tracks
				};
				this.emit();
			}
			setForkNotice(notice) {
				const prev = this.snapshot.forkNotice;
				if (prev === notice) return;
				if (prev && notice && prev.childSessionId === notice.childSessionId && prev.sourceSessionId === notice.sourceSessionId && prev.sourceTurnLabel === notice.sourceTurnLabel) return;
				this.snapshot = {
					...this.snapshot,
					forkNotice: notice
				};
				this.emit();
			}
			clearForkNoticeIfMatches(childSessionId) {
				if (this.snapshot.forkNotice?.childSessionId === childSessionId) this.setForkNotice(null);
			}
			emit() {
				this.listeners.forEach((fn) => fn());
			}
		};
		// src/client/dsh-adapter.ts
		function formatTime(epochMs) {
			if (!epochMs) return "--:--";
			const d = new Date(epochMs);
			return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
		}
		function formatDuration(ms) {
			if (ms === void 0 || !Number.isFinite(ms) || ms < 0) return void 0;
			if (ms < 1e3) return `${Math.round(ms)}ms`;
			return `${(ms / 1e3).toFixed(1)}s`;
		}
		function extractTextFromContent(content) {
			if (typeof content === "string") return content.trim();
			if (!Array.isArray(content)) return "";
			const parts = [];
			for (const b of content) if (typeof b === "string") {
				if (b.trim()) parts.push(b.trim());
			} else if (b && typeof b === "object") {
				const rec = b;
				if (rec.type === "text" && typeof rec.text === "string" && rec.text.trim()) parts.push(rec.text.trim());
				else if (rec.kind === "text" && typeof rec.text === "string" && rec.text.trim()) parts.push(rec.text.trim());
			}
			return parts.join("\n").trim();
		}
		function extractAssistantText(blocks) {
			if (!Array.isArray(blocks)) return "";
			return blocks.filter((b) => b?.kind === "text").map((b) => b.text).join("\n").trim();
		}
		function extractAssistantReasoning(blocks) {
			if (!Array.isArray(blocks)) return "";
			return blocks.filter((b) => b?.kind === "reasoning").map((b) => b.text).join("\n").trim();
		}
		function extractFirstCodeBlock(markdown) {
			const match = /```([\w+-]*)\n([\s\S]*?)```/.exec(markdown);
			if (!match) return {};
			return {
				lang: match[1] || "text",
				code: match[2].trim()
			};
		}
		function classifyToolKind(toolName) {
			const lower = toolName.toLowerCase();
			if (lower.includes("subagent") || lower.includes("agent") || lower.includes("spawn")) return "subagent-spawn";
			if (lower.includes("bash") || lower.includes("shell") || lower.includes("exec") || lower.includes("command") || lower.includes("terminal") || lower.includes("run")) return "terminal";
			if (lower.includes("edit") || lower.includes("write") || lower.includes("patch") || lower.includes("replace")) return "file-diff";
			return "tool-call";
		}
		function summarizeText(text, maxLen = 115) {
			const clean = text.replace(/```[\s\S]*?```/g, "[代码片段]").replace(/\s+/g, " ").trim();
			if (!clean) return "（无文本输出）";
			return clean.length > maxLen ? `${clean.slice(0, maxLen)}…` : clean;
		}
		function firstLineTitle(text, fallback) {
			const line = text.split("\n")[0]?.replace(/^[#>*\-\s]+/, "").trim() ?? "";
			if (!line) return fallback;
			return line.length > 28 ? `${line.slice(0, 28)}…` : line;
		}
		function toolResultToStep(node) {
			const name = node.call?.name ?? node.callId;
			const kind = classifyToolKind(name);
			const resultText = extractTextFromContent(node.content);
			const duration = node.callTime !== null ? formatDuration(node.time - node.callTime) : void 0;
			const looksLikeDiff = kind === "file-diff" && (resultText.includes("\n+") || resultText.includes("--- "));
			return {
				id: `tool-${node.callId}-${node.seq}`,
				kind,
				title: name,
				duration,
				status: node.isError ? "error" : "success",
				diff: looksLikeDiff ? resultText : void 0,
				detail: !looksLikeDiff ? [node.call?.argsRaw ? `Args:\n${node.call.argsRaw}` : "", resultText ? `\nOutput:\n${resultText}` : ""].filter(Boolean).join("\n") : void 0
			};
		}
		function runningToolToStep(call) {
			return {
				id: `running-${call.callId}`,
				kind: classifyToolKind(call.name),
				title: call.name,
				duration: "running",
				status: "running",
				detail: call.argsRaw ? `Args:\n${call.argsRaw}` : "执行中…"
			};
		}
		function safeParseJson(raw) {
			if (!raw || typeof raw !== "string") return void 0;
			const trimmed = raw.trim();
			if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return void 0;
			try {
				return JSON.parse(trimmed);
			} catch {
				return;
			}
		}
		function isAskUserToolName(name) {
			const lower = name.toLowerCase();
			return lower.includes("ask_user") || lower.includes("askuser") || lower.includes("ask_question") || lower.includes("user_question") || lower.includes("request_user_input") || lower === "ask" || lower === "question";
		}
		function normalizeChoiceOptions(rawOptions) {
			if (!Array.isArray(rawOptions)) return [];
			const out = [];
			for (const item of rawOptions) if (typeof item === "string" && item.trim()) out.push({
				label: item.trim(),
				value: item.trim()
			});
			else if (item && typeof item === "object") {
				const rec = item;
				const label = String(rec.label ?? rec.title ?? rec.text ?? rec.name ?? rec.value ?? "").trim();
				if (!label) continue;
				const desc = typeof rec.description === "string" && rec.description.trim() ? rec.description.trim() : void 0;
				const value = typeof rec.value === "string" && rec.value.trim() ? rec.value.trim() : label;
				out.push({
					label,
					description: desc,
					value
				});
			}
			return out;
		}
		function parseToolChoices(params) {
			const parsedArgs = safeParseJson(params.argsRaw);
			const argsRec = parsedArgs && typeof parsedArgs === "object" ? parsedArgs : void 0;
			const rawQuestions = [];
			if (argsRec && Array.isArray(argsRec.questions)) {
				for (const q of argsRec.questions) if (q && typeof q === "object") rawQuestions.push(q);
			} else if (argsRec && (Array.isArray(argsRec.options) || Array.isArray(argsRec.choices)) && (isAskUserToolName(params.toolName) || typeof argsRec.question === "string" || typeof argsRec.prompt === "string")) rawQuestions.push(argsRec);
			if (rawQuestions.length === 0) return [];
			const resultText = (params.resultText ?? "").trim();
			const parsedResult = safeParseJson(resultText);
			const resultRec = parsedResult && typeof parsedResult === "object" ? parsedResult : void 0;
			let baseStatus = params.isRunning ? "waiting" : "answered";
			if (!params.isRunning) {
				const statusStr = String(resultRec?.status ?? resultRec?.outcome ?? "").toLowerCase();
				const lowerText = resultText.toLowerCase();
				if (statusStr.includes("cancel") || lowerText.includes("cancelled") || resultText.includes("已取消")) baseStatus = "cancelled";
				else if (statusStr.includes("interrupt") || lowerText.includes("interrupted") || resultText.includes("已中断") || params.isError) baseStatus = "interrupted";
			}
			const answerMap = /* @__PURE__ */ new Map();
			const addAnswer = (key, val) => {
				if (!key) return;
				const list = answerMap.get(key) ?? [];
				if (typeof val === "string" && val.trim()) list.push(val.trim());
				else if (Array.isArray(val)) {
					for (const v of val) if (typeof v === "string" && v.trim()) list.push(v.trim());
					else if (v && typeof v === "object") {
						const r = v;
						const s = String(r.label ?? r.value ?? r.text ?? "").trim();
						if (s) list.push(s);
					}
				} else if (val && typeof val === "object") {
					const r = val;
					if (Array.isArray(r.selected)) addAnswer(key, r.selected);
					if (Array.isArray(r.values)) addAnswer(key, r.values);
					if (typeof r.value === "string" && r.value.trim()) list.push(r.value.trim());
					if (typeof r.label === "string" && r.label.trim()) list.push(r.label.trim());
					if (typeof r.answer === "string" && r.answer.trim()) list.push(r.answer.trim());
					if (typeof r.text === "string" && r.text.trim()) list.push(r.text.trim());
					if (typeof r.custom === "string" && r.custom.trim()) list.push(r.custom.trim());
					if (typeof r.customText === "string" && r.customText.trim()) list.push(r.customText.trim());
				}
				if (list.length > 0) answerMap.set(key, list);
			};
			const rawAnswers = resultRec?.answers ?? resultRec?.responses ?? resultRec?.results;
			if (Array.isArray(rawAnswers)) rawAnswers.forEach((entry, idx) => {
				if (entry && typeof entry === "object") {
					const r = entry;
					const k = String(r.id ?? r.questionId ?? r.question ?? idx);
					addAnswer(k, r);
					addAnswer(String(idx), r);
				} else addAnswer(String(idx), entry);
			});
			else if (rawAnswers && typeof rawAnswers === "object") for (const [k, v] of Object.entries(rawAnswers)) addAnswer(k, v);
			else if (resultRec) {
				if (resultRec.answer !== void 0) addAnswer("0", resultRec.answer);
				if (resultRec.selected !== void 0) addAnswer("0", resultRec.selected);
				if (resultRec.value !== void 0) addAnswer("0", resultRec.value);
			}
			return rawQuestions.map((q, idx) => {
				const qId = String(q.id ?? q.key ?? idx);
				const header = typeof q.header === "string" && q.header.trim() ? q.header.trim() : void 0;
				const question = String(q.question ?? q.prompt ?? q.title ?? q.text ?? header ?? `问题 ${idx + 1}`).trim();
				const multiSelect = Boolean(q.multiSelect ?? q.multi_select ?? q.is_multi_select ?? q.multiple);
				const rawOpts = normalizeChoiceOptions(q.options ?? q.choices);
				let matched = answerMap.get(qId) ?? answerMap.get(question) ?? (header ? answerMap.get(header) : void 0) ?? answerMap.get(String(idx)) ?? [];
				if (matched.length === 0 && !params.isRunning && resultText && !resultRec) {
					const foundLabels = rawOpts.filter((o) => resultText.includes(o.label) || o.value && resultText.includes(o.value)).map((o) => o.label);
					if (foundLabels.length > 0) matched = foundLabels;
					else if (rawQuestions.length === 1 && baseStatus === "answered") matched = [resultText];
				}
				const matchedSet = new Set(matched.map((m) => m.toLowerCase()));
				const options = rawOpts.map((o) => ({
					label: o.label,
					description: o.description,
					selected: matchedSet.has(o.label.toLowerCase()) || (o.value ? matchedSet.has(o.value.toLowerCase()) : false)
				}));
				const optionMatchKeys = new Set(rawOpts.flatMap((o) => [o.label.toLowerCase(), ...o.value ? [o.value.toLowerCase()] : []]));
				const customAnswers = matched.filter((m) => !optionMatchKeys.has(m.toLowerCase()));
				return {
					id: `${params.idPrefix}-q-${idx}`,
					header,
					question,
					multiSelect,
					options,
					selectedAnswers: matched,
					customAnswer: customAnswers.length > 0 ? customAnswers.join("；") : void 0,
					status: baseStatus
				};
			});
		}
		function collectToolBlockSteps(block, out, choicesOut) {
			let filesChanged = 0;
			const isResult = "kind" in block && block.kind === "tool-result";
			const step = isResult ? toolResultToStep(block) : runningToolToStep(block);
			out.push(step);
			if (step.kind === "file-diff") filesChanged += 1;
			if (choicesOut) {
				const toolName = isResult ? block.call?.name ?? block.callId : block.name;
				const argsRaw = isResult ? block.call?.argsRaw : block.argsRaw;
				const resultText = isResult ? extractTextFromContent(block.content) : void 0;
				const parsed = parseToolChoices({
					idPrefix: step.id,
					toolName,
					argsRaw,
					resultText,
					isRunning: !isResult,
					isError: isResult ? block.isError : false
				});
				if (parsed.length > 0) choicesOut.push(...parsed);
			}
			if (Array.isArray(block.subCalls)) for (const sub of block.subCalls) filesChanged += collectToolBlockSteps(sub, out, choicesOut);
			return filesChanged;
		}
		function extractPendingChoices(sessionSnap) {
			const pending = sessionSnap?.pending;
			if (!Array.isArray(pending) || pending.length === 0) return [];
			const out = [];
			pending.forEach((item, idx) => {
				if (!item || typeof item !== "object") return;
				const rec = item;
				if (rec.kind !== "question" || !rec.payload) return;
				const payload = rec.payload;
				(Array.isArray(payload.questions) ? payload.questions : [payload]).forEach((q, qIdx) => {
					if (!q || typeof q !== "object") return;
					const header = typeof q.header === "string" && q.header.trim() ? q.header.trim() : void 0;
					const question = String(q.question ?? q.prompt ?? q.title ?? q.text ?? header ?? `待选择问题 ${qIdx + 1}`).trim();
					const opts = normalizeChoiceOptions(q.options ?? q.choices).map((o) => ({
						label: o.label,
						description: o.description,
						selected: false
					}));
					out.push({
						id: `pending-${rec.key ?? idx}-${qIdx}`,
						header,
						question,
						multiSelect: Boolean(q.multiSelect ?? q.multi_select ?? q.is_multi_select ?? q.multiple),
						options: opts,
						selectedAnswers: [],
						status: "waiting"
					});
				});
			});
			return out;
		}
		function appendAssistantText(b, text) {
			const clean = text.trim();
			if (!clean) return;
			b.assistantTexts.push(clean);
			const last = b.aiSegments[b.aiSegments.length - 1];
			if (last && last.kind === "markdown") b.aiSegments[b.aiSegments.length - 1] = {
				...last,
				text: `${last.text}\n\n${clean}`
			};
			else b.aiSegments.push({
				kind: "markdown",
				id: `md-${b.turnNumber}-${b.aiSegments.length}`,
				text: clean
			});
		}
		function appendChoices(b, choices) {
			if (choices.length === 0) return;
			for (const ch of choices) {
				b.choices.push(ch);
				b.aiSegments.push({
					kind: "choice",
					id: ch.id,
					choice: ch
				});
			}
		}
		function finalizeBuckets(sessionId, trackPrefix, buckets, pinnedSet, mergeTargetMap) {
			return buckets.map((b, idx) => {
				const fullAi = b.assistantTexts.join("\n\n").trim();
				const { lang, code } = extractFirstCodeBlock(fullAi);
				const nodeId = `${sessionId}:turn:${b.userSeq}`;
				const turnLabel = `${trackPrefix}${idx + 1}`;
				const hasChoices = b.choices.length > 0;
				const firstChoiceSummary = hasChoices ? `【提问选择】${b.choices[0].question}` : void 0;
				return {
					id: nodeId,
					trackId: sessionId,
					order: idx + 1,
					turnLabel,
					title: firstLineTitle(b.userText, `第 ${idx + 1} 轮对话`),
					timestamp: formatTime(b.userTime),
					status: b.streaming ? "streaming" : b.hasError ? "error" : "completed",
					atSeq: b.closingSeq ?? b.userSeq,
					pinned: pinnedSet.has(nodeId),
					userText: b.userText,
					aiSummary: b.streaming ? summarizeText(fullAi || firstChoiceSummary || "正在生成回复并调用工具…", 115) : summarizeText(fullAi || firstChoiceSummary || "", 115),
					aiFullText: fullAi || (hasChoices ? "" : b.streaming ? "正在生成中…" : "（本轮仅包含工具调用或系统事件）"),
					aiSegments: b.aiSegments.length > 0 ? b.aiSegments : void 0,
					codeLang: lang,
					codeSnippet: code,
					microSteps: b.microSteps,
					choices: hasChoices ? b.choices : void 0,
					stats: {
						durationMs: b.durationMs,
						toolCount: b.microSteps.length,
						filesChanged: b.filesChanged
					},
					mergedFrom: mergeTargetMap.get(nodeId)
				};
			});
		}
		function readChatFromContainer(obj) {
			if (!obj || typeof obj !== "object") return void 0;
			const rec = obj;
			if (Array.isArray(rec.order) && rec.order.length > 0 && rec.nodes) return rec;
			const legacy = rec.legacy;
			if (legacy && (Array.isArray(legacy.nodes) && legacy.nodes.length > 0 || Array.isArray(legacy.order) && legacy.order.length > 0)) return rec;
			if (rec.chat && typeof rec.chat === "object") {
				const inner = readChatFromContainer(rec.chat);
				if (inner) return inner;
			}
			const views = rec.views;
			if (views && typeof views === "object") {
				if (typeof views.get === "function") {
					const fromMap = views.get("chat");
					const inner = readChatFromContainer(fromMap);
					if (inner) return inner;
					if (fromMap && typeof fromMap === "object") return fromMap;
				}
				if (views.chat && typeof views.chat === "object") {
					const inner = readChatFromContainer(views.chat);
					if (inner) return inner;
					return views.chat;
				}
			}
			if (Array.isArray(rec.nodes) && rec.nodes.length > 0) return rec;
		}
		function resolveChatSnapshot(chatSnap, convSnap, sessionSnap) {
			return readChatFromContainer(chatSnap) ?? readChatFromContainer(convSnap) ?? readChatFromContainer(sessionSnap) ?? chatSnap ?? convSnap?.chat ?? sessionSnap?.chat;
		}
		/**
		* Primary modern DSH 0.2.x parser: reads `chatSnap.order` + `chatSnap.nodes.get(key)`.
		*/
		function buildFromChatStore(sessionId, trackPrefix, chatObj, sessionSnap, pinnedSet, mergeTargetMap) {
			const order = chatObj?.order;
			const nodeStore = chatObj?.nodes;
			if (!order || order.length === 0 || !nodeStore || Array.isArray(nodeStore)) return [];
			const buckets = [];
			let current = null;
			const ensureBucket = (seq, time, fallbackUser = "（会话延续）") => {
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
						streaming: false
					};
					buckets.push(current);
				}
				return current;
			};
			for (const key of order) {
				const viewNode = typeof nodeStore.get === "function" ? nodeStore.get(key) : nodeStore[key];
				if (!viewNode) continue;
				const data = viewNode.data;
				if (!data) continue;
				if (viewNode.kind === "user" || viewNode.kind === "steering") {
					const seq = typeof data.seq === "number" ? data.seq : viewNode.anchorSeq;
					const time = typeof data.time === "number" ? data.time : Date.now();
					const text = extractTextFromContent(data.content ?? data.text) || "（图片或附件消息）";
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
						streaming: false
					};
					buckets.push(current);
					continue;
				}
				if (viewNode.kind === "assistant-step" || viewNode.kind === "assistant") {
					const stepData = data;
					const b = ensureBucket(viewNode.anchorSeq, stepData.time || Date.now());
					const text = extractAssistantText(stepData.blocks);
					if (text) appendAssistantText(b, text);
					const reasoning = extractAssistantReasoning(stepData.blocks);
					if (reasoning) {
						const timing = stepData.finalNode?.timing;
						const durMs = timing?.stepStartTime && timing.completedTime ? timing.completedTime - timing.stepStartTime : void 0;
						b.microSteps.push({
							id: `think-${key}`,
							kind: "thinking",
							title: stepData.status === "running" ? "实时思考中" : "思考推理",
							duration: stepData.status === "running" ? "live" : formatDuration(durMs),
							status: stepData.status === "running" ? "running" : "success",
							detail: reasoning
						});
					}
					if (stepData.status === "running") b.streaming = true;
					if (stepData.finalNode?.seq !== void 0) b.closingSeq = stepData.finalNode.seq;
					continue;
				}
				if (viewNode.kind === "tool-call") {
					const toolData = data;
					if (toolData.root) {
						const b = ensureBucket(viewNode.anchorSeq, Date.now());
						const stepChoices = [];
						b.filesChanged += collectToolBlockSteps(toolData.root, b.microSteps, stepChoices);
						appendChoices(b, stepChoices);
						if (!("kind" in toolData.root)) b.streaming = true;
					}
					continue;
				}
				if (viewNode.kind === "turn-tail") {
					const tail = data;
					if (current) {
						current.closingSeq = tail.seq;
						const timing = chatObj?.legacy?.turnTimings?.get(tail.turn) ?? sessionSnap?.turnTimings?.get(tail.turn);
						if (timing?.endTime && timing.startTime) current.durationMs = timing.endTime - timing.startTime;
					}
					continue;
				}
				if (viewNode.kind === "command") {
					const b = ensureBucket(viewNode.anchorSeq, typeof data.time === "number" ? data.time : Date.now());
					const name = typeof data.name === "string" ? data.name : "command";
					const args = typeof data.args === "string" ? data.args : "";
					const outcome = data.outcome;
					b.microSteps.push({
						id: `cmd-${key}`,
						kind: "terminal",
						title: `/${name}`,
						status: outcome?.kind === "error" ? "error" : "success",
						detail: [args ? `Args: ${args}` : "", outcome?.text ?? ""].filter(Boolean).join("\n")
					});
					continue;
				}
				if (viewNode.kind === "manual-compaction") {
					const mc = data;
					ensureBucket(viewNode.anchorSeq, mc.command?.time ?? Date.now()).microSteps.push({
						id: `compact-${key}`,
						kind: "thinking",
						title: "/compact 压缩上下文",
						status: "success",
						detail: mc.compaction?.summary ?? "已完成上下文压缩检查点"
					});
					continue;
				}
				if (viewNode.kind === "turn-error") {
					const b = ensureBucket(viewNode.anchorSeq, typeof data.time === "number" ? data.time : Date.now());
					b.hasError = true;
					appendAssistantText(b, `[Error] ${typeof data.message === "string" ? data.message : "执行失败"}`);
				}
			}
			return finalizeBuckets(sessionId, trackPrefix, buckets, pinnedSet, mergeTargetMap);
		}
		/**
		* Fallback parser for `chatSnap.legacy.nodes` (DSH 0.2.x legacy slice) & `sessionSnap.nodes` (DSH 0.1.x).
		*/
		function buildFromLegacyNodes(sessionId, trackPrefix, chatObj, sessionSnap, pinnedSet, mergeTargetMap) {
			const legacyNodes = (chatObj?.legacy?.nodes && chatObj.legacy.nodes.length > 0 ? chatObj.legacy.nodes : void 0) ?? (Array.isArray(chatObj?.nodes) && chatObj.nodes.length > 0 ? chatObj.nodes : void 0) ?? (sessionSnap?.nodes && sessionSnap.nodes.length > 0 ? sessionSnap.nodes : []);
			const turnEnds = chatObj?.legacy?.turnEnds ?? sessionSnap?.turnEnds;
			const turnTimings = chatObj?.legacy?.turnTimings ?? sessionSnap?.turnTimings;
			const partial = chatObj?.legacy?.partial ?? sessionSnap?.partial;
			const runningCalls = chatObj?.legacy?.runningCalls ?? sessionSnap?.runningCalls ?? [];
			if (legacyNodes.length === 0 && !partial && runningCalls.length === 0) return [];
			const buckets = [];
			let current = null;
			const ensureBucket = (seq, time, fallbackUser = "（会话延续）") => {
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
						streaming: false
					};
					buckets.push(current);
				}
				return current;
			};
			for (const node of legacyNodes) {
				if (node.kind === "user" || node.kind === "steering") {
					const text = extractTextFromContent(node.content) || "（图片或附件消息）";
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
						streaming: false
					};
					buckets.push(current);
					continue;
				}
				if (node.kind === "assistant") {
					const b = ensureBucket(node.seq, node.time);
					const text = extractAssistantText(node.blocks);
					if (text) appendAssistantText(b, text);
					const reasoning = extractAssistantReasoning(node.blocks);
					if (reasoning) {
						const durMs = node.timing?.stepStartTime && node.timing.completedTime ? node.timing.completedTime - node.timing.stepStartTime : void 0;
						b.microSteps.push({
							id: `think-${node.seq}`,
							kind: "thinking",
							title: "思考推理",
							duration: formatDuration(durMs),
							status: "success",
							detail: reasoning
						});
					}
					b.closingSeq = turnEnds?.get(node.turn) ?? node.seq;
					const timing = turnTimings?.get(node.turn);
					if (timing?.endTime && timing.startTime) b.durationMs = timing.endTime - timing.startTime;
					continue;
				}
				if (node.kind === "tool-result") {
					const b = ensureBucket(node.seq, node.time);
					const stepChoices = [];
					b.filesChanged += collectToolBlockSteps(node, b.microSteps, stepChoices);
					appendChoices(b, stepChoices);
					continue;
				}
				if (node.kind === "command") {
					ensureBucket(node.seq, node.time).microSteps.push({
						id: `cmd-${node.seq}`,
						kind: "terminal",
						title: `/${node.name ?? "command"}`,
						status: node.outcome?.kind === "error" ? "error" : "success",
						detail: [node.args ? `Args: ${node.args}` : "", node.outcome?.text ?? ""].filter(Boolean).join("\n")
					});
					continue;
				}
				if (node.kind === "turn-error") {
					const b = ensureBucket(node.seq, node.time);
					b.hasError = true;
					appendAssistantText(b, `[Error] ${node.message}`);
				}
			}
			if (partial || runningCalls.length > 0 || sessionSnap?.running) {
				const b = ensureBucket(Date.now(), Date.now(), "（执行中…）");
				b.streaming = true;
				if (partial) {
					const pText = extractAssistantText(partial.blocks);
					if (pText) appendAssistantText(b, pText);
					const pReason = extractAssistantReasoning(partial.blocks);
					if (pReason) b.microSteps.push({
						id: `partial-think-${partial.turn}-${partial.step}`,
						kind: "thinking",
						title: "实时思考中",
						duration: "live",
						status: "running",
						detail: pReason
					});
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
		function buildFromRawEntries(sessionId, trackPrefix, sources, pinnedSet, mergeTargetMap) {
			let rawList = [];
			for (const src of sources) {
				if (!src || typeof src !== "object") continue;
				const rec = src;
				if (Array.isArray(rec.entries) && rec.entries.length > 0) {
					rawList = rec.entries;
					break;
				}
				if (Array.isArray(rec.events) && rec.events.length > 0) {
					rawList = rec.events;
					break;
				}
			}
			if (rawList.length === 0) return [];
			const buckets = [];
			let current = null;
			const ensureBucket = (seq, time, fallbackUser = "（会话延续）") => {
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
						streaming: false
					};
					buckets.push(current);
				}
				return current;
			};
			for (let i = 0; i < rawList.length; i++) {
				const entry = rawList[i];
				if (!entry || typeof entry !== "object") continue;
				const payload = entry.event && typeof entry.event === "object" ? entry.event : entry;
				const kind = String(payload.type ?? payload.kind ?? entry.type ?? entry.kind ?? "");
				const seq = typeof entry.seq === "number" ? entry.seq : typeof payload.seq === "number" ? payload.seq : i + 1;
				const time = typeof entry.time === "number" ? entry.time : typeof payload.time === "number" ? payload.time : typeof entry.ts === "number" ? entry.ts : Date.now();
				if (kind === "user" || kind === "user_message" || kind === "user-message" || kind === "steering" || kind === "prompt") {
					const text = extractTextFromContent(payload.content ?? payload.parts ?? payload.text ?? payload.message) || "（图片或附件消息）";
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
						streaming: false
					};
					buckets.push(current);
					continue;
				}
				if (kind === "assistant" || kind === "assistant_message" || kind === "assistant-message" || kind === "assistant-step" || kind === "step_complete" || kind === "model_response") {
					const b = ensureBucket(seq, time);
					const blocks = Array.isArray(payload.blocks) ? payload.blocks : void 0;
					const text = blocks ? extractAssistantText(blocks) : extractTextFromContent(payload.content ?? payload.text ?? payload.message);
					if (text) appendAssistantText(b, text);
					const reasoning = blocks ? extractAssistantReasoning(blocks) : typeof payload.reasoning === "string" ? payload.reasoning : "";
					if (reasoning) b.microSteps.push({
						id: `think-raw-${seq}`,
						kind: "thinking",
						title: "思考推理",
						status: "success",
						detail: reasoning
					});
					b.closingSeq = seq;
					continue;
				}
				if (kind === "tool-result" || kind === "tool_result" || kind === "tool-call" || kind === "tool_call") {
					const b = ensureBucket(seq, time);
					const toolName = String(payload.call?.name ?? payload.name ?? payload.toolName ?? "tool");
					const output = extractTextFromContent(payload.content ?? payload.output ?? payload.result);
					const argsRaw = typeof payload.call?.argsRaw === "string" ? payload.call.argsRaw : typeof payload.argsRaw === "string" ? payload.argsRaw : payload.args && typeof payload.args === "object" ? JSON.stringify(payload.args) : void 0;
					const rawChoices = parseToolChoices({
						idPrefix: `tool-raw-${seq}`,
						toolName,
						argsRaw,
						resultText: output,
						isRunning: kind === "tool-call" || kind === "tool_call",
						isError: Boolean(payload.isError)
					});
					if (rawChoices.length > 0) appendChoices(b, rawChoices);
					b.microSteps.push({
						id: `tool-raw-${seq}`,
						kind: classifyToolKind(toolName),
						title: toolName,
						status: payload.isError ? "error" : "success",
						detail: output || void 0
					});
					if (classifyToolKind(toolName) === "file-diff") b.filesChanged += 1;
				}
			}
			return finalizeBuckets(sessionId, trackPrefix, buckets, pinnedSet, mergeTargetMap);
		}
		function attachPendingChoices(nodes, sessionSnap) {
			const pendingChoices = extractPendingChoices(sessionSnap);
			if (pendingChoices.length === 0 || nodes.length === 0) return nodes;
			const last = nodes[nodes.length - 1];
			const existing = last.choices ?? [];
			const existingQs = new Set(existing.map((c) => c.question));
			const added = pendingChoices.filter((c) => !existingQs.has(c.question));
			if (added.length === 0) return nodes;
			const nextSegments = [...last.aiSegments ? [...last.aiSegments] : last.aiFullText ? [{
				kind: "markdown",
				id: `${last.id}-md`,
				text: last.aiFullText
			}] : [], ...added.map((c) => ({
				kind: "choice",
				id: c.id,
				choice: c
			}))];
			const next = [...nodes];
			next[next.length - 1] = {
				...last,
				status: "waiting-approval",
				choices: [...existing, ...added],
				aiSegments: nextSegments
			};
			return next;
		}
		function buildNodesForSession(sessionId, trackPrefix, chatSnap, convSnap, sessionSnap, pinnedSet, mergeTargetMap) {
			const resolvedChat = resolveChatSnapshot(chatSnap, convSnap, sessionSnap);
			const fromChat = buildFromChatStore(sessionId, trackPrefix, resolvedChat, sessionSnap, pinnedSet, mergeTargetMap);
			if (fromChat.length > 0) return attachPendingChoices(fromChat, sessionSnap);
			const fromLegacy = buildFromLegacyNodes(sessionId, trackPrefix, resolvedChat, sessionSnap, pinnedSet, mergeTargetMap);
			if (fromLegacy.length > 0) return attachPendingChoices(fromLegacy, sessionSnap);
			return attachPendingChoices(buildFromRawEntries(sessionId, trackPrefix, [
				chatSnap,
				convSnap,
				sessionSnap,
				resolvedChat
			], pinnedSet, mergeTargetMap), sessionSnap);
		}
		function getEffectiveParentId(sid, byId, meta) {
			const nativeParent = byId[sid]?.parentId;
			if (nativeParent && byId[nativeParent]) return nativeParent;
			const metaParent = meta.trackMeta[sid]?.forkParentId;
			if (metaParent && byId[metaParent]) return metaParent;
		}
		function findRootSessionId(currentId, byId, meta) {
			let cursor = currentId;
			const visited = /* @__PURE__ */ new Set([cursor]);
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
		function computeLinkedComponentIds(params) {
			const { sessionId, byId, meta } = params;
			const allSummaries = Object.values(byId);
			const forkAdj = /* @__PURE__ */ new Map();
			const addEdge = (map, a, b) => {
				if (!a || !b || a === b) return;
				let sa = map.get(a);
				if (!sa) {
					sa = /* @__PURE__ */ new Set();
					map.set(a, sa);
				}
				sa.add(b);
				let sb = map.get(b);
				if (!sb) {
					sb = /* @__PURE__ */ new Set();
					map.set(b, sb);
				}
				sb.add(a);
			};
			for (const s of allSummaries) {
				if (!s?.id) continue;
				const parent = getEffectiveParentId(s.id, byId, meta);
				if (parent) addEdge(forkAdj, s.id, parent);
			}
			const forkFamilySet = /* @__PURE__ */ new Set([sessionId]);
			const forkQueue = [sessionId];
			while (forkQueue.length > 0) {
				const cur = forkQueue.shift();
				const neighbors = forkAdj.get(cur);
				if (!neighbors) continue;
				for (const next of neighbors) if (!forkFamilySet.has(next)) {
					forkFamilySet.add(next);
					forkQueue.push(next);
				}
			}
			const fullAdj = /* @__PURE__ */ new Map();
			forkAdj.forEach((neighbors, key) => {
				fullAdj.set(key, new Set(neighbors));
			});
			for (const grp of meta.linkGroups) {
				const valid = grp.filter((id) => id === sessionId || Boolean(byId[id]));
				for (let i = 1; i < valid.length; i++) addEdge(fullAdj, valid[0], valid[i]);
			}
			const visited = /* @__PURE__ */ new Set([sessionId]);
			const queue = [sessionId];
			while (queue.length > 0) {
				const cur = queue.shift();
				const neighbors = fullAdj.get(cur);
				if (!neighbors) continue;
				for (const next of neighbors) if (!visited.has(next) && (next === sessionId || Boolean(byId[next]))) {
					visited.add(next);
					queue.push(next);
				}
			}
			const memberIds = Array.from(visited);
			const treeRoots = /* @__PURE__ */ new Set();
			for (const sid of memberIds) treeRoots.add(findRootSessionId(sid, byId, meta));
			const sortedRoots = Array.from(treeRoots).sort((a, b) => {
				const sa = byId[a];
				const sb = byId[b];
				const ca = sa?.createdAt ?? sa?.updatedAt ?? 0;
				const cb = sb?.createdAt ?? sb?.updatedAt ?? 0;
				if (ca !== cb) return ca - cb;
				return a.localeCompare(b);
			});
			const childrenMap = /* @__PURE__ */ new Map();
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
					const ca = byId[a]?.createdAt ?? byId[a]?.updatedAt ?? 0;
					const cb = byId[b]?.createdAt ?? byId[b]?.updatedAt ?? 0;
					if (ca !== cb) return ca - cb;
					return a.localeCompare(b);
				});
			});
			const ordered = [];
			const emitted = /* @__PURE__ */ new Set();
			const dfs = (sid) => {
				if (emitted.has(sid)) return;
				emitted.add(sid);
				ordered.push(sid);
				for (const child of childrenMap.get(sid) ?? []) dfs(child);
			};
			for (const root of sortedRoots) dfs(root);
			for (const sid of memberIds) if (!emitted.has(sid)) dfs(sid);
			return {
				componentIds: ordered,
				forkFamilySet
			};
		}
		function buildDshChronoGraph(params) {
			const { sessionId, currentSnapshot, currentConversation, currentChat, listState, sessionsApi, uiConversationApi, snapshotCache, meta } = params;
			const byId = listState?.byId ?? {};
			const subagentsByParent = listState?.subagentsByParent ?? {};
			const { componentIds, forkFamilySet } = computeLinkedComponentIds({
				sessionId,
				byId,
				meta
			});
			const componentSet = new Set(componentIds);
			const primaryRootId = componentIds[0] ?? (byId[sessionId] ? findRootSessionId(sessionId, byId, meta) : sessionId);
			const pinnedSet = new Set(meta.pinnedNodeIds);
			const mergeTargetMap = /* @__PURE__ */ new Map();
			meta.mergeLinks.forEach((ml) => {
				const srcTitle = byId[ml.sourceTrackId]?.displayTitle ?? "分支";
				mergeTargetMap.set(ml.targetNodeId, {
					trackTitle: srcTitle,
					summary: ml.summary
				});
			});
			const tracks = {};
			const nodes = {};
			const nodesBySession = /* @__PURE__ */ new Map();
			let branchColorIdx = 0;
			let peerIndex = 0;
			let branchIndex = 0;
			componentIds.forEach((sid) => {
				const summary = byId[sid];
				const cached = snapshotCache.get(sid);
				const savedMeta = meta.trackMeta[sid];
				let sessionSnap;
				let convSnap;
				let chatSnap;
				if (sid === sessionId) {
					sessionSnap = currentSnapshot ?? cached?.session;
					convSnap = currentConversation ?? cached?.conversation;
					chatSnap = currentChat ?? cached?.chat;
				} else {
					try {
						sessionSnap = sessionsApi?.binding?.(sid)?.session?.getSnapshot?.() ?? cached?.session;
					} catch {
						sessionSnap = cached?.session;
					}
					try {
						const uiBinding = uiConversationApi?.binding?.(sid);
						const uiSnap = typeof uiBinding?.getSnapshot === "function" ? uiBinding.getSnapshot() : void 0;
						const uiChat = typeof uiBinding?.view === "function" ? uiBinding.view("chat") : void 0;
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
				const isSubagent = summary?.origin === "subagent";
				const isLinkedPeerRoot = !isPrimaryRoot && !hasParentInGraph && !isSubagent;
				const isManualPeer = !forkFamilySet.has(sid);
				let prefix;
				if (isPrimaryRoot) prefix = "M";
				else if (isSubagent) prefix = "A";
				else if (isLinkedPeerRoot) {
					peerIndex += 1;
					prefix = `L${peerIndex}-`;
				} else {
					branchIndex += 1;
					prefix = `B${branchIndex}-`;
				}
				let builtNodes = buildNodesForSession(sid, prefix, chatSnap, convSnap, sessionSnap, pinnedSet, mergeTargetMap);
				let waitingForFirstForkPrompt = false;
				if (hasParentInGraph && savedMeta?.forkAtSeq !== void 0 && builtNodes.length > 0) {
					const diverged = builtNodes.filter((n) => n.atSeq === void 0 || n.atSeq > savedMeta.forkAtSeq);
					if (diverged.length > 0) builtNodes = diverged.map((n, i) => ({
						...n,
						order: i + 1,
						turnLabel: `${prefix}${i + 1}`
					}));
					else {
						waitingForFirstForkPrompt = true;
						builtNodes = [];
					}
				}
				if (builtNodes.length === 0) {
					const isLoading = sessionSnap?.openState === "loading";
					const isBlank = Boolean(summary?.blank || sessionSnap?.blank);
					if (waitingForFirstForkPrompt) builtNodes = [{
						id: `${sid}:fork-starter`,
						trackId: sid,
						order: 1,
						turnLabel: "NEW",
						title: "新分支起点",
						timestamp: formatTime(summary?.updatedAt),
						status: "idle",
						userText: "已从父节点分叉并继承前缀上下文",
						aiSummary: "请直接在底部输入框发送首条消息，将自动开启本分支的第一轮对话。",
						aiFullText: "已从父节点分叉并继承前缀上下文，请直接在底部输入框发送首条消息。",
						microSteps: [],
						stats: {
							toolCount: 0,
							filesChanged: 0
						},
						placeholder: false,
						forkStarter: true
					}];
					else builtNodes = [{
						id: `${sid}:placeholder`,
						trackId: sid,
						order: 1,
						turnLabel: `${prefix}1`,
						title: isLoading ? "正在加载对话历史…" : summary?.displayTitle || (isPrimaryRoot ? "当前对话" : isLinkedPeerRoot ? "关联对话" : "分支会话"),
						timestamp: formatTime(summary?.updatedAt),
						status: isLoading || summary?.running ? "streaming" : "idle",
						userText: isBlank ? "新会话（尚未发送首条消息）" : isLoading ? "正在从 DSH 本地日志加载轮次…" : "点击此节点加载该对话完整时间线",
						aiSummary: isBlank ? "可直接在下方输入框发送消息开始对话。" : isLoading ? "历史消息加载完成后将自动按时间次序展开为点线。" : "该对话历史尚未加载到本地视口，单击圆点即可加载并同时查看。",
						aiFullText: isBlank ? "新会话，发送消息后节点将自动出现。" : "单击加载完整对话历史。",
						microSteps: [],
						stats: {
							toolCount: 0,
							filesChanged: 0
						},
						placeholder: !isBlank && !isLoading
					}];
				}
				nodesBySession.set(sid, builtNodes);
				builtNodes.forEach((n) => {
					nodes[n.id] = n;
				});
				const color = isPrimaryRoot ? "#27272a" : isSubagent ? "#64748b" : RESTRAINED_BRANCH_PALETTE[branchColorIdx++ % RESTRAINED_BRANCH_PALETTE.length];
				tracks[sid] = {
					id: sid,
					kind: isPrimaryRoot ? "main" : isSubagent ? "agent-subagent" : isLinkedPeerRoot ? "linked-peer" : "human-branch",
					title: summary?.displayTitle || (isPrimaryRoot ? "主线对话" : isLinkedPeerRoot ? "关联对话" : "分支"),
					status: savedMeta?.status ?? "active",
					parentTrackId: hasParentInGraph ? effectiveParentId : void 0,
					forkFromNodeId: hasParentInGraph ? savedMeta?.forkFromNodeId : void 0,
					color,
					collapsed: savedMeta?.collapsed ?? false,
					running: Boolean(summary?.running || sessionSnap?.running),
					hydrated: builtNodes.some((n) => !n.placeholder),
					hasMore: sessionSnap?.hasMore,
					loadingOlder: sessionSnap?.loadingOlder,
					linkedPeer: isLinkedPeerRoot || isManualPeer
				};
			});
			Object.values(tracks).forEach((t) => {
				if (t.id === primaryRootId || !t.parentTrackId) return;
				if (t.forkFromNodeId && nodes[t.forkFromNodeId]) return;
				const parentNodes = nodesBySession.get(t.parentTrackId);
				if (parentNodes && parentNodes.length > 0) tracks[t.id] = {
					...t,
					forkFromNodeId: parentNodes[Math.min(parentNodes.length - 1, Math.max(0, parentNodes.length - 2))].id
				};
			});
			componentIds.forEach((parentSid) => {
				const catalog = subagentsByParent?.[parentSid];
				if (!catalog || !("items" in catalog) || !Array.isArray(catalog.items)) return;
				const items = catalog.items;
				const parentNodes = nodesBySession.get(parentSid);
				const anchorNodeId = parentNodes && parentNodes.length > 0 ? parentNodes[parentNodes.length - 1].id : void 0;
				items.forEach((item, idx) => {
					const subId = item.sessionId ?? item.id;
					if (!subId || tracks[subId]) return;
					const subCached = snapshotCache.get(subId);
					(subCached && (subCached.chat || subCached.conversation || subCached.session) ? buildNodesForSession(subId, `S${idx + 1}-`, subCached.chat, subCached.conversation, subCached.session, pinnedSet, mergeTargetMap) : [{
						id: `${subId}:placeholder`,
						trackId: subId,
						order: 1,
						turnLabel: `S${idx + 1}`,
						title: item.title || `Subagent ${idx + 1}`,
						timestamp: "--:--",
						status: item.running ? "streaming" : "completed",
						userText: "[Agent 自动派生任务]",
						aiSummary: item.running ? "子代理正在后台执行中…" : "子代理已完成，点击可查看执行轨迹。",
						aiFullText: item.running ? "子代理正在后台执行中…" : "子代理已完成。",
						microSteps: [],
						stats: {
							toolCount: 0,
							filesChanged: 0
						},
						placeholder: true
					}]).forEach((n) => {
						nodes[n.id] = n;
					});
					tracks[subId] = {
						id: subId,
						kind: "agent-subagent",
						title: item.title || `Subagent ${idx + 1}`,
						status: "adopted",
						parentTrackId: parentSid,
						forkFromNodeId: anchorNodeId,
						color: "#64748b",
						collapsed: false,
						running: Boolean(item.running),
						hydrated: Boolean(subCached)
					};
				});
			});
			return {
				rootTrackId: primaryRootId,
				activeTrackId: sessionId,
				tracks,
				nodes,
				mergeLinks: meta.mergeLinks.filter((ml) => Boolean(nodes[ml.sourceNodeId]) && Boolean(nodes[ml.targetNodeId])),
				capabilities: {
					canSend: true,
					canFork: true,
					canStop: true,
					canMerge: true,
					canLoadOlder: true,
					canSwitchSession: true
				}
			};
		}
		// src/client/meta-store.ts
		const STORAGE_KEY = "dsh-chronobranch:meta:v1";
		function normalizeLinkGroups(raw) {
			if (!Array.isArray(raw)) return [];
			const parent = /* @__PURE__ */ new Map();
			const find = (x) => {
				let cur = x;
				while (parent.has(cur) && parent.get(cur) !== cur) cur = parent.get(cur);
				return cur;
			};
			const union = (a, b) => {
				const ra = find(a);
				const rb = find(b);
				if (ra !== rb) parent.set(rb, ra);
			};
			for (const grp of raw) {
				if (!Array.isArray(grp)) continue;
				const cleaned = grp.filter((id) => typeof id === "string" && id.trim().length > 0);
				if (cleaned.length < 2) continue;
				cleaned.forEach((id) => {
					if (!parent.has(id)) parent.set(id, id);
				});
				for (let i = 1; i < cleaned.length; i++) union(cleaned[0], cleaned[i]);
			}
			const buckets = /* @__PURE__ */ new Map();
			for (const id of parent.keys()) {
				const r = find(id);
				const list = buckets.get(r) ?? [];
				list.push(id);
				buckets.set(r, list);
			}
			return Array.from(buckets.values()).filter((g) => g.length >= 2);
		}
		function loadPersisted() {
			try {
				if (typeof window === "undefined" || !window.localStorage) return {};
				const raw = window.localStorage.getItem(STORAGE_KEY);
				if (!raw) return {};
				return JSON.parse(raw);
			} catch {
				return {};
			}
		}
		var ChronoMetaStore = class {
			snapshot;
			listeners = /* @__PURE__ */ new Set();
			constructor() {
				const saved = loadPersisted();
				this.snapshot = {
					open: false,
					trackMeta: saved.trackMeta ?? {},
					pinnedNodeIds: saved.pinnedNodeIds ?? [],
					mergeLinks: saved.mergeLinks ?? [],
					shortcuts: {
						...DEFAULT_SHORTCUTS,
						...saved.shortcuts ?? {}
					},
					linkGroups: normalizeLinkGroups(saved.linkGroups)
				};
			}
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			};
			getSnapshot = () => this.snapshot;
			setOpen(open) {
				if (this.snapshot.open === open) return;
				this.snapshot = {
					...this.snapshot,
					open
				};
				this.emit();
			}
			toggleOpen() {
				this.setOpen(!this.snapshot.open);
			}
			patchTrackMeta(trackId, patch) {
				const prev = this.snapshot.trackMeta[trackId] ?? {};
				const nextTrackMeta = {
					...this.snapshot.trackMeta,
					[trackId]: {
						...prev,
						...patch
					}
				};
				this.snapshot = {
					...this.snapshot,
					trackMeta: nextTrackMeta
				};
				this.persist();
				this.emit();
			}
			togglePin(nodeId) {
				const next = this.snapshot.pinnedNodeIds.includes(nodeId) ? this.snapshot.pinnedNodeIds.filter((id) => id !== nodeId) : [...this.snapshot.pinnedNodeIds, nodeId];
				this.snapshot = {
					...this.snapshot,
					pinnedNodeIds: next
				};
				this.persist();
				this.emit();
			}
			addMergeLink(link) {
				this.snapshot = {
					...this.snapshot,
					mergeLinks: [...this.snapshot.mergeLinks, link]
				};
				this.persist();
				this.emit();
			}
			setShortcut(action, binding) {
				this.snapshot = {
					...this.snapshot,
					shortcuts: {
						...this.snapshot.shortcuts,
						[action]: binding
					}
				};
				this.persist();
				this.emit();
			}
			resetShortcuts() {
				this.snapshot = {
					...this.snapshot,
					shortcuts: { ...DEFAULT_SHORTCUTS }
				};
				this.persist();
				this.emit();
			}
			/** Link two sessions (transitively merging their existing workspace link groups). */
			linkSessions(sessionA, sessionB) {
				if (!sessionA || !sessionB || sessionA === sessionB) return;
				const next = normalizeLinkGroups([...this.snapshot.linkGroups, [sessionA, sessionB]]);
				this.snapshot = {
					...this.snapshot,
					linkGroups: next
				};
				this.persist();
				this.emit();
			}
			/** Remove one session from its manual workspace link group (keeping remaining peers linked if ≥ 2). */
			unlinkSession(sessionId) {
				if (!sessionId) return;
				const next = this.snapshot.linkGroups.map((grp) => grp.filter((id) => id !== sessionId)).filter((grp) => grp.length >= 2);
				this.snapshot = {
					...this.snapshot,
					linkGroups: next
				};
				this.persist();
				this.emit();
			}
			persist() {
				try {
					if (typeof window === "undefined" || !window.localStorage) return;
					const payload = {
						trackMeta: { ...this.snapshot.trackMeta },
						pinnedNodeIds: [...this.snapshot.pinnedNodeIds],
						mergeLinks: [...this.snapshot.mergeLinks],
						shortcuts: { ...this.snapshot.shortcuts },
						linkGroups: this.snapshot.linkGroups.map((g) => [...g])
					};
					window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
				} catch {}
			}
			emit() {
				this.listeners.forEach((fn) => fn());
			}
		};
		// src/client/shortcut-bridge.ts
		const PROFILES_WITH_DEFAULT = [
			"desktop:windows",
			"desktop:macos",
			"desktop:linux",
			"web:windows",
			"web:macos"
		];
		function makeDefaults(binding) {
			const out = {};
			for (const profile of PROFILES_WITH_DEFAULT) out[profile] = binding;
			return out;
		}
		const ACTION_SPECS = [
			{
				action: "toggleExpand",
				commandId: "chronobranch.toggle-expand",
				label: "时间线 · 展开 / 收起完整对话",
				aliases: [
					"chronobranch",
					"timeline",
					"expand",
					"时间线",
					"展开"
				],
				defaultBinding: {
					code: "KeyO",
					modifiers: [
						"primary",
						"alt",
						"shift"
					]
				}
			},
			{
				action: "forkNode",
				commandId: "chronobranch.fork-node",
				label: "时间线 · 从选中节点拉出分支",
				aliases: [
					"chronobranch",
					"timeline",
					"fork",
					"branch",
					"时间线",
					"分叉"
				],
				defaultBinding: {
					code: "KeyB",
					modifiers: [
						"primary",
						"alt",
						"shift"
					]
				}
			},
			{
				action: "toggleMicro",
				commandId: "chronobranch.toggle-micro",
				label: "时间线 · 展开 / 收起微观小轴",
				aliases: [
					"chronobranch",
					"timeline",
					"micro",
					"时间线",
					"微观小轴"
				],
				defaultBinding: {
					code: "KeyM",
					modifiers: [
						"primary",
						"alt",
						"shift"
					]
				}
			},
			{
				action: "pinTile",
				commandId: "chronobranch.pin-tile",
				label: "时间线 · 悬挂为屏幕磁贴",
				aliases: [
					"chronobranch",
					"timeline",
					"tile",
					"pin",
					"时间线",
					"磁贴"
				],
				defaultBinding: {
					code: "KeyT",
					modifiers: [
						"primary",
						"alt",
						"shift"
					]
				}
			},
			{
				action: "zoomL1",
				commandId: "chronobranch.zoom-l1",
				label: "时间线 · 鸟瞰视图 (L1)",
				aliases: [
					"chronobranch",
					"timeline",
					"zoom",
					"时间线",
					"鸟瞰"
				],
				defaultBinding: {
					code: "Digit1",
					modifiers: [
						"primary",
						"alt",
						"shift"
					]
				}
			},
			{
				action: "zoomL2",
				commandId: "chronobranch.zoom-l2",
				label: "时间线 · 点线视图 (L2)",
				aliases: [
					"chronobranch",
					"timeline",
					"zoom",
					"时间线",
					"点线"
				],
				defaultBinding: {
					code: "Digit2",
					modifiers: [
						"primary",
						"alt",
						"shift"
					]
				}
			},
			{
				action: "zoomL3",
				commandId: "chronobranch.zoom-l3",
				label: "时间线 · 展开视图 (L3)",
				aliases: [
					"chronobranch",
					"timeline",
					"zoom",
					"时间线",
					"展开视图"
				],
				defaultBinding: {
					code: "Digit3",
					modifiers: [
						"primary",
						"alt",
						"shift"
					]
				}
			}
		];
		function formatCatalogKeys(entry) {
			if (!entry || !entry.keys || entry.keys.length === 0) return "";
			return entry.keys.join(" ").replace(/\s*\+\s*/g, "+");
		}
		const EMPTY_BINDINGS = {
			toggleMicro: "",
			forkNode: "",
			toggleExpand: "",
			pinTile: "",
			zoomL1: "",
			zoomL2: "",
			zoomL3: ""
		};
		var NativeShortcutBridge = class {
			handler = null;
			snapshot = {
				connected: false,
				bindings: EMPTY_BINDINGS
			};
			listeners = /* @__PURE__ */ new Set();
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			};
			getSnapshot = () => this.snapshot;
			setActiveHandler(handler) {
				this.handler = handler;
			}
			/**
			* Attach to DSH's `ctx.shortcuts` service and register all ChronoBranch timeline commands.
			* Returns a disposer that cleanly unregisters all commands and listeners.
			*/
			attach(shortcuts) {
				const disposers = [];
				for (const spec of ACTION_SPECS) {
					const buildCommand = (defaults) => ({
						id: spec.commandId,
						label: () => spec.label,
						aliases: spec.aliases,
						defaults,
						regions: ["page"],
						modals: [],
						resolve: (context) => {
							const activeHandler = this.handler;
							if (!activeHandler) return { status: "pass" };
							if (context.region !== "page" || context.modal !== null) return { status: "pass" };
							return {
								status: "handled",
								run: () => activeHandler(spec.action)
							};
						}
					});
					try {
						disposers.push(shortcuts.register(buildCommand(makeDefaults(spec.defaultBinding))));
					} catch (err) {
						console.warn(`[dsh-chronobranch] Default shortcut conflict for ${spec.commandId}, registering unbound:`, err);
						try {
							disposers.push(shortcuts.register(buildCommand({})));
						} catch (err2) {
							console.error(`[dsh-chronobranch] Failed to register shortcut ${spec.commandId}:`, err2);
						}
					}
				}
				const syncFromCatalog = () => {
					try {
						const rows = shortcuts.catalog.getSnapshot();
						const byId = /* @__PURE__ */ new Map();
						for (const row of rows) byId.set(row.id, row);
						const nextBindings = {
							toggleMicro: "",
							forkNode: "",
							toggleExpand: "",
							pinTile: "",
							zoomL1: "",
							zoomL2: "",
							zoomL3: ""
						};
						for (const spec of ACTION_SPECS) nextBindings[spec.action] = formatCatalogKeys(byId.get(spec.commandId));
						this.snapshot = {
							connected: true,
							bindings: nextBindings
						};
						this.emit();
					} catch {}
				};
				syncFromCatalog();
				const unsubCatalog = shortcuts.catalog.subscribe(syncFromCatalog);
				disposers.push(unsubCatalog);
				return () => {
					for (const off of disposers.reverse()) try {
						off();
					} catch {}
					this.snapshot = {
						connected: false,
						bindings: EMPTY_BINDINGS
					};
					this.emit();
				};
			}
			emit() {
				this.listeners.forEach((fn) => fn());
			}
		};
		var TileStore = class {
			snapshot = {
				tiles: [],
				focusRequest: null
			};
			zCounter = 120;
			focusSeq = 0;
			listeners = /* @__PURE__ */ new Set();
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			};
			getSnapshot = () => this.snapshot;
			setTiles(tiles) {
				this.snapshot = {
					...this.snapshot,
					tiles
				};
				this.emit();
			}
			has(nodeId) {
				return this.snapshot.tiles.some((t) => t.nodeId === nodeId);
			}
			requestFocus(sessionId, nodeId) {
				this.snapshot = {
					...this.snapshot,
					focusRequest: {
						sessionId,
						nodeId,
						seq: ++this.focusSeq
					}
				};
				this.emit();
			}
			clearFocusRequest(seq) {
				if (this.snapshot.focusRequest?.seq !== seq) return;
				this.snapshot = {
					...this.snapshot,
					focusRequest: null
				};
				this.emit();
			}
			togglePin(params) {
				const { node, trackTitle, trackColor } = params;
				const prevTiles = this.snapshot.tiles;
				if (prevTiles.some((t) => t.nodeId === node.id)) {
					this.setTiles(prevTiles.filter((t) => t.nodeId !== node.id));
					return "unpinned";
				}
				const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
				const vh = typeof window !== "undefined" ? window.innerHeight : 820;
				const pad = 18;
				const topSafe = 54;
				const bottomSafe = Math.max(280, vh - 90);
				const tileW = Math.min(380, Math.max(268, Math.floor((vw - 54) / 2)));
				const tileH = Math.min(380, Math.max(190, bottomSafe - topSafe));
				let x = Math.max(pad, vw - tileW - pad);
				let y = topSafe;
				if (prevTiles.length > 0) {
					const last = prevTiles[prevTiles.length - 1];
					const leftSlot = last.x - tileW - 10;
					if (leftSlot >= 238) {
						x = leftSlot;
						y = last.y;
					} else {
						x = Math.max(pad, Math.min(vw - tileW - pad, last.x - 28));
						y = Math.max(topSafe, Math.min(bottomSafe - tileH, last.y + 30));
					}
				}
				const record = {
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
					z: ++this.zCounter
				};
				this.setTiles([...prevTiles, record]);
				return "pinned";
			}
			/** Keep already-pinned tiles live-synced when their source node updates (e.g. streaming). */
			syncLiveNodes(nodes) {
				let changed = false;
				const next = this.snapshot.tiles.map((t) => {
					const fresh = nodes[t.nodeId];
					if (!fresh || fresh === t.node) return t;
					if (fresh.aiFullText === t.node.aiFullText && fresh.status === t.node.status && fresh.choices?.length === t.node.choices?.length) return t;
					changed = true;
					return {
						...t,
						node: fresh
					};
				});
				if (changed) this.setTiles(next);
			}
			bringToFront(tileId) {
				const z = ++this.zCounter;
				this.setTiles(this.snapshot.tiles.map((t) => t.id === tileId ? {
					...t,
					z
				} : t));
			}
			patchTile(tileId, patch) {
				this.setTiles(this.snapshot.tiles.map((t) => t.id === tileId ? {
					...t,
					...patch
				} : t));
			}
			remove(tileId) {
				this.setTiles(this.snapshot.tiles.filter((t) => t.id !== tileId));
			}
			clear() {
				if (this.snapshot.tiles.length === 0) return;
				this.setTiles([]);
			}
			arrangeSideBySide() {
				const prevTiles = this.snapshot.tiles;
				if (prevTiles.length === 0) return;
				const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
				const vh = typeof window !== "undefined" ? window.innerHeight : 820;
				const pad = 16;
				const topSafe = 54;
				const availW = Math.max(320, vw - 32);
				const availH = Math.max(240, vh - topSafe - 72);
				const count = prevTiles.length;
				const cols = Math.min(count, Math.max(1, Math.floor((availW + 10) / 278)));
				const rows = Math.ceil(count / cols);
				const cellW = Math.min(460, Math.floor((availW - 10 * (cols - 1)) / cols));
				const cellH = Math.min(460, Math.max(190, Math.floor((availH - 10 * (rows - 1)) / rows)));
				const totalRowW = cols * cellW + (cols - 1) * 10;
				const startX = Math.max(pad, vw - pad - totalRowW);
				this.setTiles(prevTiles.map((tile, idx) => {
					const col = idx % cols;
					const row = Math.floor(idx / cols);
					return {
						...tile,
						minimized: false,
						x: Math.round(startX + col * (cellW + 10)),
						y: Math.round(topSafe + row * (cellH + 10)),
						w: cellW,
						h: cellH,
						z: ++this.zCounter
					};
				}));
			}
			emit() {
				this.listeners.forEach((fn) => fn());
			}
		};
		// src/client/TileOverlay.tsx
		/**
		* Root-level DSH Native Magnetic Tile Overlay (`shell.overlay` slot).
		*
		* 100% part of DeepSeek Harness itself (zero external apps or extra browser processes):
		* - Always renders cleanly above `.cb-hud-top`, composers, and sidebars (`z-index: 450` vs isolated canvas `z-index: 1`).
		* - Persists across `对话` / `轨迹` / `时间线` tabs AND across switching sessions in the left sidebar.
		* - Locate (`定位`) switches to the source session, activates `时间线` if needed, and centers the exact turn node.
		* - Pop-out tries DSH-native Document PiP first, then DSH Electron child window (`window.open`), with clear feedback if Electron blocks child windows.
		*/
		function getDocumentPip() {
			if (typeof window === "undefined") return null;
			const pip = window.documentPictureInPicture;
			return pip && typeof pip.requestWindow === "function" ? pip : null;
		}
		function readHostTheme$1() {
			if (typeof document === "undefined") return "light";
			const body = document.body;
			const root = document.documentElement;
			if (body.hasAttribute("data-ds-dark-theme") || root.hasAttribute("data-ds-dark-theme") || body.classList.contains("dark") || root.classList.contains("dark") || body.getAttribute("data-theme") === "dark" || root.getAttribute("data-theme") === "dark") return "dark";
			return "light";
		}
		function activateTimelineTabIfPresent() {
			if (typeof document === "undefined") return;
			const tabs = document.querySelectorAll("[role=\"tablist\"] [role=\"tab\"]");
			for (const tab of Array.from(tabs)) if (tab.textContent?.trim() === "时间线") {
				if (tab.getAttribute("aria-selected") !== "true") tab.click();
				return;
			}
		}
		function hydrateDetachedTileWindow(win, tile, sourceEl, theme) {
			try {
				const doc = win.document;
				if (!doc) return false;
				doc.open();
				doc.write("<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\" /></head><body></body></html>");
				doc.close();
				doc.title = `${tile.node.turnLabel} · ${tile.node.title}`;
				const styleTag = doc.createElement("style");
				styleTag.textContent = `${CHRONOBRANCH_CSS}
html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; background: var(--cb-surface); }
.cb-pip-host { width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
.cb-pip-host .cb-tile-head { cursor: default; }
.cb-pip-host .cb-tile-body { flex: 1; overflow-y: auto; }
.cb-pip-host.cb-pip-ai-only .cb-bubble-user { display: none; }`;
				doc.head.appendChild(styleTag);
				if (theme === "dark") doc.body.setAttribute("data-ds-dark-theme", "");
				const host = doc.createElement("div");
				host.className = `cb-root cb-pip-host ${theme === "dark" ? "cb-theme-dark" : ""} ${tile.aiOnly ? "cb-pip-ai-only" : ""}`;
				host.innerHTML = sourceEl.innerHTML;
				host.querySelectorAll(".cb-resize-handle").forEach((n) => n.remove());
				const tools = host.querySelector(".cb-tile-tools");
				if (tools) {
					tools.innerHTML = "";
					const aiBtn = doc.createElement("button");
					aiBtn.className = `cb-tile-btn ${tile.aiOnly ? "cb-active" : ""}`;
					aiBtn.textContent = tile.aiOnly ? "仅AI" : "完整";
					aiBtn.addEventListener("click", () => {
						const next = host.classList.toggle("cb-pip-ai-only");
						aiBtn.classList.toggle("cb-active", next);
						aiBtn.textContent = next ? "仅AI" : "完整";
					});
					tools.appendChild(aiBtn);
				}
				host.querySelectorAll(".cb-code-copy").forEach((btn) => {
					btn.addEventListener("click", () => {
						const text = (btn.closest(".cb-code-block")?.querySelector("pre"))?.textContent ?? "";
						win.navigator.clipboard?.writeText(text).catch(() => {});
						const span = btn.querySelector("span");
						if (span) {
							const prev = span.textContent;
							span.textContent = "已复制";
							win.setTimeout(() => {
								span.textContent = prev;
							}, 1400);
						}
					});
				});
				doc.body.appendChild(host);
				return true;
			} catch {
				return false;
			}
		}
		function TileOverlay({ tileStore, sessionsApi, getUiWorkspace }) {
			const { tiles } = (0, react.useSyncExternalStore)(tileStore.subscribe, tileStore.getSnapshot);
			const [theme, setTheme] = (0, react.useState)(readHostTheme$1);
			const [snappedId, setSnappedId] = (0, react.useState)(null);
			const [activeOpId, setActiveOpId] = (0, react.useState)(null);
			const [tileHint, setTileHint] = (0, react.useState)(null);
			const hintTimerRef = (0, react.useRef)(null);
			const opRef = (0, react.useRef)(null);
			const showTileHint = (0, react.useCallback)((id, text) => {
				setTileHint({
					id,
					text
				});
				if (hintTimerRef.current) window.clearTimeout(hintTimerRef.current);
				hintTimerRef.current = window.setTimeout(() => setTileHint(null), 3200);
			}, []);
			(0, react.useEffect)(() => {
				if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;
				const sync = () => setTheme(readHostTheme$1());
				sync();
				const obs = new MutationObserver(sync);
				obs.observe(document.body, {
					attributes: true,
					attributeFilter: [
						"data-ds-dark-theme",
						"class",
						"data-theme"
					]
				});
				obs.observe(document.documentElement, {
					attributes: true,
					attributeFilter: [
						"data-ds-dark-theme",
						"class",
						"data-theme"
					]
				});
				return () => obs.disconnect();
			}, []);
			const startOp = (0, react.useCallback)((e, tile, mode) => {
				e.stopPropagation();
				e.preventDefault();
				tileStore.bringToFront(tile.id);
				opRef.current = {
					mode,
					tileId: tile.id,
					startX: e.clientX,
					startY: e.clientY,
					origX: tile.x,
					origY: tile.y,
					origW: tile.w,
					origH: tile.h
				};
				setActiveOpId(tile.id);
			}, [tileStore]);
			(0, react.useEffect)(() => {
				if (!activeOpId) return;
				const onMove = (e) => {
					const op = opRef.current;
					if (!op) return;
					const dx = e.clientX - op.startX;
					const dy = e.clientY - op.startY;
					const vw = window.innerWidth;
					const vh = window.innerHeight;
					const pad = 12;
					const minTop = 44;
					const maxBottom = Math.max(124, vh - 12);
					const snapshot = tileStore.getSnapshot().tiles;
					const tile = snapshot.find((t) => t.id === op.tileId);
					if (!tile) return;
					const others = snapshot.filter((t) => t.id !== op.tileId);
					let didSnap = false;
					if (op.mode === "drag") {
						const tileH = tile.minimized ? 38 : tile.h;
						let nx = Math.max(pad, Math.min(vw - tile.w - pad, op.origX + dx));
						let ny = Math.max(minTop, Math.min(maxBottom - tileH, op.origY + dy));
						if (Math.abs(nx - pad) <= 14) {
							nx = pad;
							didSnap = true;
						} else if (Math.abs(nx + tile.w - (vw - pad)) <= 14) {
							nx = vw - pad - tile.w;
							didSnap = true;
						}
						if (Math.abs(ny - minTop) <= 14) {
							ny = minTop;
							didSnap = true;
						} else if (Math.abs(ny + tileH - maxBottom) <= 14) {
							ny = maxBottom - tileH;
							didSnap = true;
						}
						for (const o of others) {
							const oh = o.minimized ? 38 : o.h;
							const xTargets = [
								o.x + o.w + 10,
								o.x - tile.w - 10,
								o.x,
								o.x + o.w - tile.w
							];
							for (const tx of xTargets) if (Math.abs(nx - tx) <= 14) {
								nx = tx;
								didSnap = true;
								break;
							}
							const yTargets = [
								o.y,
								o.y + oh + 10,
								o.y - tileH - 10,
								o.y + oh - tileH
							];
							for (const ty of yTargets) if (Math.abs(ny - ty) <= 14) {
								ny = ty;
								didSnap = true;
								break;
							}
						}
						tileStore.patchTile(tile.id, {
							x: Math.round(nx),
							y: Math.round(ny)
						});
					} else {
						let nw = tile.w;
						let nh = tile.h;
						if (op.mode === "resize-e" || op.mode === "resize-se") {
							nw = Math.max(268, Math.min(820, Math.min(vw - tile.x - pad, Math.round(op.origW + dx))));
							for (const o of others) if (Math.abs(nw - o.w) <= 10) {
								nw = o.w;
								didSnap = true;
								break;
							}
						}
						if (op.mode === "resize-s" || op.mode === "resize-se") {
							nh = Math.max(190, Math.min(820, Math.min(maxBottom - tile.y, Math.round(op.origH + dy))));
							for (const o of others) if (!o.minimized && Math.abs(nh - o.h) <= 10) {
								nh = o.h;
								didSnap = true;
								break;
							}
						}
						tileStore.patchTile(tile.id, {
							w: nw,
							h: nh,
							minimized: false
						});
					}
					setSnappedId(didSnap ? op.tileId : null);
				};
				const onUp = () => {
					opRef.current = null;
					setActiveOpId(null);
					setSnappedId(null);
				};
				window.addEventListener("mousemove", onMove);
				window.addEventListener("mouseup", onUp);
				return () => {
					window.removeEventListener("mousemove", onMove);
					window.removeEventListener("mouseup", onUp);
				};
			}, [activeOpId, tileStore]);
			const handleLocate = (0, react.useCallback)((tile) => {
				const sid = tile.sessionId;
				try {
					const uiWorkspace = getUiWorkspace?.();
					if (uiWorkspace && typeof uiWorkspace.openSession === "function") uiWorkspace.openSession(sid);
					else {
						const subAddr = sessionsApi.subagentAddress?.(sid);
						const listById = sessionsApi.list?.getSnapshot?.()?.byId;
						if (listById && listById[sid]) sessionsApi.open(sid);
						else if (subAddr) sessionsApi.openSubagent?.(subAddr);
						else sessionsApi.open(sid);
					}
				} catch {}
				tileStore.requestFocus(tile.sessionId, tile.nodeId);
				window.setTimeout(() => activateTimelineTabIfPresent(), 40);
				window.setTimeout(() => activateTimelineTabIfPresent(), 160);
			}, [
				sessionsApi,
				getUiWorkspace,
				tileStore
			]);
			const handlePopOut = (0, react.useCallback)(async (tile, el) => {
				const w = Math.max(320, Math.min(760, tile.w));
				const h = Math.max(260, Math.min(760, tile.h));
				const screenLeft = Math.round((window.screenX || 80) + tile.x);
				const screenTop = Math.round((window.screenY || 60) + tile.y);
				const durationText = tile.node.status === "streaming" ? "生成中…" : tile.node.stats.durationMs ? `${(tile.node.stats.durationMs / 1e3).toFixed(1)}s` : "";
				try {
					const resp = await fetch("http://127.0.0.1:47392/api/desktop-tile", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: tile.id,
							turnLabel: tile.node.turnLabel,
							title: tile.node.title,
							trackTitle: tile.trackTitle || "DSH AGENT",
							trackColor: tile.trackColor,
							timestamp: tile.node.timestamp,
							durationText,
							userText: tile.node.userText,
							aiFullText: tile.node.aiFullText || tile.node.aiSummary,
							aiSegments: tile.node.aiSegments,
							choices: tile.node.choices,
							theme,
							aiOnly: tile.aiOnly,
							x: screenLeft,
							y: screenTop,
							w,
							h
						})
					});
					if (resp.ok) {
						if ((await resp.json()).ok) {
							tileStore.remove(tile.id);
							return;
						}
					}
				} catch {}
				const pip = getDocumentPip();
				if (pip && el) try {
					if (hydrateDetachedTileWindow(await pip.requestWindow({
						width: w,
						height: h
					}), tile, el, theme)) {
						tileStore.remove(tile.id);
						return;
					}
				} catch {}
				showTileHint(tile.id, "桌面悬浮桥未连接：请完全退出并重启一次 DeepSeek Harness 桌面端后即可无缝弹出无边框置顶磁贴。");
			}, [
				theme,
				tileStore,
				showTileHint
			]);
			if (tiles.length === 0) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: `cb-overlay-host ${theme === "dark" ? "cb-theme-dark" : ""} ${activeOpId ? "cb-resizing" : ""}`,
				"data-chronobranch-tiles": "true",
				children: tiles.map((tile) => {
					const isSnapped = snappedId === tile.id;
					const isActive = activeOpId === tile.id;
					const color = theme === "dark" && tile.trackColor === "#27272a" ? "#d4d4d8" : tile.trackColor;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
						"data-cb-tile-id": tile.id,
						className: [
							"cb-tile",
							tile.minimized ? "cb-tile-minimized" : "",
							isSnapped ? "cb-tile-snapped" : "",
							isActive ? "cb-tile-active" : ""
						].filter(Boolean).join(" "),
						style: {
							left: tile.x,
							top: tile.y,
							width: tile.w,
							height: tile.minimized ? void 0 : tile.h,
							zIndex: tile.z
						},
						onMouseDown: () => tileStore.bringToFront(tile.id),
						onWheel: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "cb-tile-head",
								onMouseDown: (e) => {
									if (e.target.closest("button")) return;
									startOp(e, tile, "drag");
								},
								onDoubleClick: () => tileStore.patchTile(tile.id, { minimized: !tile.minimized }),
								title: "拖动可自由悬挂于 DSH 任意位置并自动磁吸对齐；双击折叠",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "cb-tile-id",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "cb-dot",
											style: { background: color }
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "cb-tile-turn",
											children: tile.node.turnLabel
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: "cb-tile-title",
											children: tile.node.title
										})
									]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "cb-tile-tools",
									children: [
										tiles.length >= 2 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "cb-tile-btn",
											title: "一键将全部磁贴自动吸附并排",
											onClick: (e) => {
												e.stopPropagation();
												tileStore.arrangeSideBySide();
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconArrange, {})
										}),
										!tile.minimized && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: `cb-tile-btn ${tile.aiOnly ? "cb-active" : ""}`,
											title: tile.aiOnly ? "切换为完整对话（含提问）" : "切换为仅看 AI 回复",
											onClick: (e) => {
												e.stopPropagation();
												tileStore.patchTile(tile.id, { aiOnly: !tile.aiOnly });
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: tile.aiOnly ? "仅AI" : "完整" })
										}),
										!tile.minimized && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "cb-tile-btn",
											title: "尝试以 DSH 原生独立子窗口悬浮到桌面",
											onClick: (e) => {
												e.stopPropagation();
												const tileEl = e.currentTarget.closest(".cb-tile");
												handlePopOut(tile, tileEl);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconPip, {})
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "cb-tile-btn",
											title: "跳转回该对话在时间线中的对应节点",
											onClick: (e) => {
												e.stopPropagation();
												handleLocate(tile);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconLocate, {})
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "cb-tile-btn",
											title: tile.minimized ? "展开磁贴" : "折叠为顶部条",
											onClick: (e) => {
												e.stopPropagation();
												tileStore.patchTile(tile.id, { minimized: !tile.minimized });
											},
											children: tile.minimized ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconExpand, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconMinimize, {})
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "cb-tile-btn",
											title: "取消磁贴",
											onClick: (e) => {
												e.stopPropagation();
												tileStore.remove(tile.id);
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClose, { size: "xs" })
										})
									]
								})]
							}),
							tileHint?.id === tile.id && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "cb-tile-notice",
								children: tileHint.text
							}),
							!tile.minimized && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "cb-tile-body",
									children: [!tile.aiOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "cb-bubble cb-bubble-user",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "cb-bubble-role",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "YOU" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: tile.node.timestamp })]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChronoMarkdown, { text: tile.node.userText })]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "cb-bubble cb-bubble-ai",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "cb-bubble-role",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: tile.trackTitle || "DSH AGENT" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: tile.node.stats.durationMs ? `${(tile.node.stats.durationMs / 1e3).toFixed(1)}s` : "" })]
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AssistantContentBody, { node: tile.node })]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "cb-resize-handle cb-resize-e",
									onMouseDown: (e) => startOp(e, tile, "resize-e")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "cb-resize-handle cb-resize-s",
									onMouseDown: (e) => startOp(e, tile, "resize-s")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "cb-resize-handle cb-resize-se",
									onMouseDown: (e) => startOp(e, tile, "resize-se")
								})
							] })
						]
					}, tile.id);
				})
			});
		}
		// src/client/index.tsx
		/**
		* DeepSeek Harness (DSH) Browser Client Entry for ChronoBranch.
		*
		* Registers natively into:
		* 1. `conversation.view` (`id: 'chronobranch'`, `label: '时间线'`) right beside `对话` and `轨迹`
		* 2. `conversation.input.dock` (`id: 'chronobranch-branch-dock'`) so branching strictly reuses DSH's ONE unified bottom composer
		* 3. `shell.overlay` (`id: 'chronobranch-tiles'`) for DSH-native Magnetic Tiles + frameless Windows desktop pop-out
		* 4. `ctx.shortcuts` (`@deepseek-ai/dsh-client-shortcuts`) so all timeline shortcuts live directly in DSH's native Settings -> 快捷键
		*/
		const name = "dsh-chronobranch";
		const inject = ["slots", "sessions"];
		const noopUseChat = () => void 0;
		const noopUseConversation = () => void 0;
		const noopUseWorkspaces = () => void 0;
		var ChronoErrorBoundary = class extends react.Component {
			state = { error: null };
			static getDerivedStateFromError(error) {
				return { error };
			}
			componentDidCatch(error, info) {
				console.error("[dsh-chronobranch] Render error:", error, info);
			}
			render() {
				if (this.state.error) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					"data-conversation-composer-overlay": "true",
					"data-chronobranch-view": "true",
					style: {
						padding: 24,
						background: "#f7f7f8",
						color: "#18181b",
						fontFamily: "system-ui, sans-serif",
						minHeight: 320
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 600,
							marginBottom: 8
						},
						children: "ChronoBranch 渲染遇到异常"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("pre", {
						style: {
							padding: 12,
							borderRadius: 8,
							background: "#fff",
							border: "1px solid #e4e4e7",
							fontSize: 12,
							overflow: "auto",
							whiteSpace: "pre-wrap"
						},
						children: [
							this.state.error.message,
							"\n",
							this.state.error.stack
						]
					})]
				});
				return this.props.children;
			}
		};
		function readHostTheme() {
			if (typeof document === "undefined") return "light";
			const body = document.body;
			const root = document.documentElement;
			if (body.hasAttribute("data-ds-dark-theme") || root.hasAttribute("data-ds-dark-theme") || body.classList.contains("dark") || root.classList.contains("dark") || body.getAttribute("data-theme") === "dark" || root.getAttribute("data-theme") === "dark") return "dark";
			return "light";
		}
		function useHostTheme() {
			const [theme, setTheme] = (0, react.useState)(readHostTheme);
			(0, react.useEffect)(() => {
				if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;
				const sync = () => setTheme(readHostTheme());
				sync();
				const observer = new MutationObserver(sync);
				observer.observe(document.body, {
					attributes: true,
					attributeFilter: [
						"data-ds-dark-theme",
						"class",
						"data-theme"
					]
				});
				observer.observe(document.documentElement, {
					attributes: true,
					attributeFilter: [
						"data-ds-dark-theme",
						"class",
						"data-theme"
					]
				});
				return () => observer.disconnect();
			}, []);
			return theme;
		}
		function focusNativeBottomComposer() {
			if (typeof document === "undefined") return;
			window.requestAnimationFrame(() => {
				document.querySelector("[data-composer-seat] textarea, [data-composer-seat] [contenteditable=\"true\"]")?.focus();
			});
		}
		function activateTimelineTabIfNeeded() {
			if (typeof document === "undefined") return false;
			const tabs = document.querySelectorAll("[role=\"tablist\"] [role=\"tab\"]");
			for (const tab of Array.from(tabs)) if (tab.textContent?.trim() === "时间线") {
				if (tab.getAttribute("aria-selected") !== "true") tab.click();
				return true;
			}
			return false;
		}
		/**
		* Switch DSH's active session (and therefore DSH's unified bottom composer target) to `targetSid`,
		* using DSH 0.2.x's `uiWorkspace.openSession(targetSid)` (falling back to 0.1.x `sessionsApi.open`),
		* while keeping the user seamlessly on the `时间线` tab instead of letting DSH's per-session
		* persisted view jump back to `对话`.
		*/
		function openSessionInTimeline(sessionsApi, getUiWorkspace, targetSid, focusComposer = false) {
			try {
				const uiWorkspace = getUiWorkspace?.();
				if (uiWorkspace && typeof uiWorkspace.openSession === "function") uiWorkspace.openSession(targetSid);
				else if (typeof sessionsApi?.open === "function") sessionsApi.open(targetSid);
			} catch (err) {
				console.warn("[dsh-chronobranch] openSession failed for", targetSid, err);
				try {
					if (typeof sessionsApi?.open === "function") sessionsApi.open(targetSid);
				} catch {
					return;
				}
			}
			if (typeof window === "undefined") return;
			let settled = false;
			const ensureTimeline = () => {
				if (settled) return;
				const viewEl = document.querySelector("[data-chronobranch-view=\"true\"]");
				const currentViewSession = viewEl?.getAttribute("data-chronobranch-session");
				if (viewEl && currentViewSession === targetSid) {
					settled = true;
					if (focusComposer) focusNativeBottomComposer();
					return;
				}
				if (!viewEl) activateTimelineTabIfNeeded();
				if (focusComposer) focusNativeBottomComposer();
			};
			window.requestAnimationFrame(ensureTimeline);
			window.setTimeout(ensureTimeline, 45);
			window.setTimeout(ensureTimeline, 140);
			window.setTimeout(ensureTimeline, 280);
		}
		function deriveWorkspaceLabel(cwd) {
			if (!cwd) return void 0;
			const parts = cwd.replace(/[\\/]+$/, "").split(/[\\/]/);
			return parts[parts.length - 1] || cwd;
		}
		function ChronoConversationInner(props) {
			const { sessionId, useSession, useSessions, sessionsApi, workspacesApi, uiConversationApi, getUiWorkspace, metaStore, tileStore, dockStore, shortcutBridge, snapshotCache } = props;
			const useConversationHook = typeof props.useConversation === "function" ? props.useConversation : noopUseConversation;
			const useChatHook = typeof props.useChat === "function" ? props.useChat : noopUseChat;
			const useWorkspacesHook = typeof props.useWorkspaces === "function" ? props.useWorkspaces : noopUseWorkspaces;
			const hostTheme = useHostTheme();
			const currentSnapshot = useSession((s) => s);
			const hookConversation = useConversationHook((s) => s);
			const currentChat = useChatHook((s) => s);
			const listState = useSessions((s) => s);
			const hookWorkspaces = useWorkspacesHook((s) => s);
			const meta = (0, react.useSyncExternalStore)(metaStore.subscribe, metaStore.getSnapshot);
			const tileState = (0, react.useSyncExternalStore)(tileStore.subscribe, tileStore.getSnapshot);
			const shortcutState = (0, react.useSyncExternalStore)(shortcutBridge.subscribe, shortcutBridge.getSnapshot);
			const pinnedTileNodeIds = (0, react.useMemo)(() => new Set(tileState.tiles.map((t) => t.nodeId)), [tileState.tiles]);
			const loggedDiagRef = (0, react.useRef)(/* @__PURE__ */ new Set());
			const [fallbackWorkspaces, setFallbackWorkspaces] = (0, react.useState)(void 0);
			(0, react.useEffect)(() => {
				if (hookWorkspaces || !workspacesApi?.list) {
					setFallbackWorkspaces(void 0);
					return;
				}
				const read = () => {
					try {
						setFallbackWorkspaces(workspacesApi.list.getSnapshot());
					} catch {}
				};
				read();
				return workspacesApi.list.subscribe(read);
			}, [hookWorkspaces, workspacesApi]);
			const workspacesState = hookWorkspaces ?? fallbackWorkspaces;
			const [boundConversation, setBoundConversation] = (0, react.useState)(void 0);
			(0, react.useEffect)(() => {
				if (hookConversation || !uiConversationApi?.binding) {
					setBoundConversation(void 0);
					return;
				}
				try {
					const convBinding = uiConversationApi.binding(sessionId);
					if (!convBinding) return;
					const read = () => {
						try {
							const snap = typeof convBinding.getSnapshot === "function" ? convBinding.getSnapshot() : void 0;
							const chatView = typeof convBinding.view === "function" ? convBinding.view("chat") : void 0;
							if (chatView && typeof chatView === "object") setBoundConversation({
								...snap ?? {},
								chat: chatView
							});
							else if (snap) setBoundConversation(snap);
						} catch {}
					};
					read();
					const unsub = typeof convBinding.subscribe === "function" ? convBinding.subscribe(read) : void 0;
					return () => {
						if (typeof unsub === "function") unsub();
					};
				} catch {
					return;
				}
			}, [
				sessionId,
				hookConversation,
				uiConversationApi
			]);
			const currentConversation = hookConversation ?? boundConversation;
			(0, react.useEffect)(() => {
				const hasChatData = Boolean(currentChat?.order && currentChat.order.length > 0) || Boolean(currentChat?.legacy?.nodes && currentChat.legacy.nodes.length > 0);
				const hasConvData = Boolean(currentConversation);
				const hasSessionData = currentSnapshot?.openState === "open" || Boolean(currentSnapshot?.chat?.order && currentSnapshot.chat.order.length > 0) || Boolean(currentSnapshot?.nodes && currentSnapshot.nodes.length > 0);
				if (hasChatData || hasConvData || hasSessionData) snapshotCache.set(sessionId, {
					session: currentSnapshot,
					conversation: currentConversation,
					chat: currentChat
				});
			}, [
				sessionId,
				currentSnapshot,
				currentConversation,
				currentChat,
				snapshotCache
			]);
			(0, react.useEffect)(() => {
				try {
					const maybePromise = sessionsApi?.refreshSubagents?.(sessionId);
					if (maybePromise && typeof maybePromise.catch === "function") maybePromise.catch(() => {});
				} catch {}
			}, [sessionId, sessionsApi]);
			const graph = (0, react.useMemo)(() => buildDshChronoGraph({
				sessionId,
				currentSnapshot,
				currentConversation,
				currentChat,
				listState,
				sessionsApi,
				uiConversationApi,
				snapshotCache,
				meta
			}), [
				sessionId,
				currentSnapshot,
				currentConversation,
				currentChat,
				listState,
				sessionsApi,
				uiConversationApi,
				snapshotCache,
				meta
			]);
			(0, react.useEffect)(() => {
				const activeTrack = graph.tracks[sessionId];
				const sendableTracks = Object.values(graph.tracks).filter((t) => t.kind !== "agent-subagent").map((t) => ({
					id: t.id,
					title: t.title,
					color: t.color,
					active: t.id === sessionId
				}));
				dockStore.setTimelineContext(sessionId, sendableTracks.length, activeTrack?.title ?? "", activeTrack?.color ?? "#27272a", sendableTracks);
				if (Object.values(graph.nodes).filter((n) => n.trackId === sessionId).some((n) => !n.forkStarter && !n.placeholder)) dockStore.clearForkNoticeIfMatches(sessionId);
				return () => {
					if (dockStore.getSnapshot().timelineMountedFor === sessionId) dockStore.setTimelineContext(null);
				};
			}, [
				dockStore,
				sessionId,
				graph
			]);
			const { workspaceName, workspaceSessions } = (0, react.useMemo)(() => {
				const byId = listState?.byId ?? {};
				const currentSummary = byId[sessionId];
				const { componentIds, forkFamilySet } = computeLinkedComponentIds({
					sessionId,
					byId,
					meta
				});
				const componentSet = new Set(componentIds);
				const matchedWorkspace = workspacesState?.items?.find((w) => w.sessionIds.includes(sessionId));
				const currentCwd = currentSummary?.cwd;
				const candidateIdSet = /* @__PURE__ */ new Set([sessionId, ...componentIds]);
				if (matchedWorkspace) {
					for (const sid of matchedWorkspace.sessionIds) if (byId[sid]) candidateIdSet.add(sid);
				} else if (currentCwd) {
					for (const s of Object.values(byId)) if (s && s.cwd === currentCwd) candidateIdSet.add(s.id);
				}
				const items = [];
				for (const id of candidateIdSet) {
					const summary = byId[id];
					if (!summary && id !== sessionId) continue;
					if (summary?.origin === "subagent") continue;
					const linkKind = id === sessionId ? "self" : forkFamilySet.has(id) ? "fork" : componentSet.has(id) ? "manual" : "none";
					items.push({
						id,
						title: summary?.displayTitle || "未命名对话",
						updatedAt: summary?.updatedAt,
						running: summary?.running,
						linkKind
					});
				}
				const rank = (k) => k === "self" ? 0 : k === "fork" ? 1 : k === "manual" ? 2 : 3;
				items.sort((a, b) => {
					const ra = rank(a.linkKind);
					const rb = rank(b.linkKind);
					if (ra !== rb) return ra - rb;
					return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
				});
				return {
					workspaceName: matchedWorkspace?.title ?? deriveWorkspaceLabel(currentCwd),
					workspaceSessions: items
				};
			}, [
				listState,
				sessionId,
				workspacesState,
				meta
			]);
			(0, react.useEffect)(() => {
				const activeTrack = graph.tracks[sessionId];
				const summary = listState?.byId?.[sessionId];
				if (activeTrack && !activeTrack.hydrated && !summary?.blank && currentSnapshot?.openState !== "loading" && !loggedDiagRef.current.has(sessionId)) {
					loggedDiagRef.current.add(sessionId);
					console.info("[dsh-chronobranch] diagnostic (unhydrated session):", {
						sessionId,
						propKeys: Object.keys(props),
						hasUiConversation: Boolean(uiConversationApi),
						snapshotKeys: currentSnapshot ? Object.keys(currentSnapshot) : null,
						conversationKeys: currentConversation ? Object.keys(currentConversation) : null,
						chatKeys: currentChat ? Object.keys(currentChat) : null
					});
				}
			}, [
				sessionId,
				graph,
				listState,
				currentSnapshot,
				currentConversation,
				currentChat,
				uiConversationApi,
				props
			]);
			const actions = (0, react.useMemo)(() => ({
				onSelectTrack: (trackId) => {
					const sid = trackId;
					if (sid === sessionId) {
						focusNativeBottomComposer();
						return;
					}
					if ((listState?.byId ?? sessionsApi.list?.getSnapshot?.()?.byId)?.[sid]) {
						openSessionInTimeline(sessionsApi, getUiWorkspace, sid, false);
						return;
					}
					const subAddr = sessionsApi.subagentAddress?.(sid);
					if (subAddr) {
						sessionsApi.openSubagent?.(subAddr);
						return;
					}
					openSessionInTimeline(sessionsApi, getUiWorkspace, sid, false);
				},
				onSend: async (trackId, text) => {
					const sid = trackId;
					if (sessionId !== sid && listState?.byId?.[sid]) openSessionInTimeline(sessionsApi, getUiWorkspace, sid, false);
					const binding = sessionsApi.binding?.(sid);
					if (!binding) throw new Error("目标会话尚未就绪，请稍候重试");
					if (text.startsWith("/")) {
						await binding.session.command(text);
						return;
					}
					const res = await binding.session.prompt([{
						type: "text",
						text
					}], "queue");
					if (!res.ok) throw new Error(res.error?.message || "发送消息被服务端拒绝");
				},
				onForkNode: async (sourceTrackId, sourceNode) => {
					const sourceSid = sourceTrackId;
					const childId = await sessionsApi.fork({
						sessionId: sourceSid,
						atSeq: sourceNode.atSeq,
						increaseTitle: true
					});
					metaStore.patchTrackMeta(childId, {
						status: "active",
						collapsed: false,
						forkFromNodeId: sourceNode.id,
						forkAtSeq: sourceNode.atSeq,
						forkParentId: sourceSid
					});
					dockStore.setForkNotice({
						childSessionId: childId,
						sourceSessionId: sourceSid,
						sourceTurnLabel: sourceNode.turnLabel,
						sourceTitle: sourceNode.title,
						trackColor: "#059669"
					});
					openSessionInTimeline(sessionsApi, getUiWorkspace, childId, true);
					return childId;
				},
				onForkAndSend: async (sourceTrackId, sourceNode, promptText) => {
					const sourceSid = sourceTrackId;
					const childId = await sessionsApi.fork({
						sessionId: sourceSid,
						atSeq: sourceNode.atSeq,
						increaseTitle: true
					});
					metaStore.patchTrackMeta(childId, {
						status: "active",
						collapsed: false,
						forkFromNodeId: sourceNode.id,
						forkAtSeq: sourceNode.atSeq,
						forkParentId: sourceSid
					});
					openSessionInTimeline(sessionsApi, getUiWorkspace, childId, false);
					const binding = sessionsApi.binding?.(childId);
					if (binding && promptText.trim()) {
						if (promptText.trim().startsWith("/")) await binding.session.command(promptText.trim());
						else await binding.session.prompt([{
							type: "text",
							text: promptText.trim()
						}], "queue");
					}
					return childId;
				},
				onLinkSession: (targetSessionId) => {
					metaStore.linkSessions(sessionId, targetSessionId);
				},
				onUnlinkSession: (targetSessionId) => {
					const { forkFamilySet: targetForkFamily } = computeLinkedComponentIds({
						sessionId: targetSessionId,
						byId: listState?.byId ?? {},
						meta: {
							...metaStore.getSnapshot(),
							linkGroups: []
						}
					});
					targetForkFamily.forEach((id) => {
						metaStore.unlinkSession(id);
					});
				},
				onStop: async (trackId) => {
					const binding = sessionsApi.binding?.(trackId);
					if (binding) await binding.session.cancel();
				},
				onLoadOlder: async (trackId) => {
					const binding = sessionsApi.binding?.(trackId);
					if (binding) await binding.session.loadOlder();
				},
				onSetTrackMeta: (trackId, patch) => {
					metaStore.patchTrackMeta(trackId, patch);
				},
				onTogglePin: (nodeId) => {
					metaStore.togglePin(nodeId);
				},
				onCherryPickMerge: async ({ sourceTrackId, sourceNodeId, targetTrackId, summary }) => {
					const targetSid = targetTrackId;
					if (sessionId !== targetSid && listState?.byId?.[targetSid]) openSessionInTimeline(sessionsApi, getUiWorkspace, targetSid, false);
					const binding = sessionsApi.binding?.(targetSid);
					if (!binding) throw new Error("目标会话尚未就绪");
					const promptBody = `[ChronoBranch Cherry-pick 结论回流]\n${summary}\n\n请接收以上来自探索分支的已验证结论，并将其作为主线后续工作的有效上下文。`;
					const prevSnap = binding.session.getSnapshot();
					const prevOrderLen = prevSnap.chat?.order?.length ?? prevSnap.nodes?.length ?? 0;
					const res = await binding.session.prompt([{
						type: "text",
						text: promptBody
					}], "queue");
					if (!res.ok) throw new Error(res.error?.message || "回流消息发送失败");
					const unsub = binding.session.subscribe(() => {
						const nextSnap = binding.session.getSnapshot();
						if ((nextSnap.chat?.order?.length ?? nextSnap.nodes?.length ?? 0) > prevOrderLen) {
							let addedSeq;
							if (nextSnap.chat?.order && nextSnap.chat.nodes) for (let i = nextSnap.chat.order.length - 1; i >= 0; i--) {
								const n = nextSnap.chat.nodes.get(nextSnap.chat.order[i]);
								if (n?.kind === "user") {
									addedSeq = n.data?.seq ?? n.anchorSeq;
									break;
								}
							}
							if (addedSeq === void 0 && Array.isArray(nextSnap.nodes)) addedSeq = [...nextSnap.nodes].reverse().find((n) => n.kind === "user")?.seq;
							if (addedSeq !== void 0) {
								metaStore.addMergeLink({
									id: `ml-${Date.now()}`,
									kind: "cherry-pick",
									sourceTrackId,
									sourceNodeId,
									targetTrackId,
									targetNodeId: `${targetSid}:turn:${addedSeq}`,
									label: "Cherry-pick 回流",
									summary
								});
								unsub();
							}
						}
					});
					window.setTimeout(() => unsub(), 8e3);
				}
			}), [
				sessionId,
				listState,
				sessionsApi,
				getUiWorkspace,
				metaStore,
				dockStore
			]);
			(0, react.useEffect)(() => {
				tileStore.syncLiveNodes(graph.nodes);
			}, [tileStore, graph.nodes]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChronoCanvas, {
				graph,
				actions,
				theme: hostTheme,
				useNativeComposer: true,
				shortcuts: shortcutState.connected ? shortcutState.bindings : meta.shortcuts,
				managedShortcuts: shortcutState.connected,
				onRegisterShortcutHandler: (handler) => shortcutBridge.setActiveHandler(handler),
				pinnedTileNodeIds,
				onToggleTile: (node, trackTitle, trackColor) => tileStore.togglePin({
					node,
					trackTitle,
					trackColor
				}),
				focusRequest: tileState.focusRequest,
				onFocusConsumed: (seq) => tileStore.clearFocusRequest(seq),
				workspaceName,
				workspaceSessions
			});
		}
		function ChronoConversationView(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChronoErrorBoundary, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChronoConversationInner, { ...props }) });
		}
		/**
		* Slim status dock mounted natively into DSH's `conversation.input.dock` slot
		* directly above DSH's single unified bottom composer (no duplicate input box).
		*/
		function ChronoComposerDock({ sessionId, session, dockStore, sessionsApi, getUiWorkspace }) {
			const dock = (0, react.useSyncExternalStore)(dockStore.subscribe, dockStore.getSnapshot);
			const hostTheme = useHostTheme();
			const activeSid = sessionId ?? session?.sessionId;
			if (!activeSid) return null;
			const isFreshFork = dock.forkNotice?.childSessionId === activeSid;
			const showMultiTrackTarget = !isFreshFork && dock.timelineMountedFor === activeSid && dock.trackCount > 1 && dock.tracks.length > 1;
			if (!isFreshFork && !showMultiTrackTarget) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: `cb-native-dock ${isFreshFork ? "cb-native-dock-fork" : ""} ${hostTheme === "dark" ? "cb-theme-dark" : ""}`,
				"data-chronobranch-dock": "true",
				children: isFreshFork && dock.forkNotice ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "cb-native-dock-main",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "cb-native-dock-icon",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconFork, { size: "xs" })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
						"已从 ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: dock.forkNotice.sourceTurnLabel }),
						" 分叉 · 请直接在下方输入框发送首条消息"
					] })]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: "cb-native-dock-btn",
					onClick: () => {
						const sourceId = dock.forkNotice.sourceSessionId;
						dockStore.setForkNotice(null);
						openSessionInTimeline(sessionsApi, getUiWorkspace, sourceId, false);
					},
					children: "切回原对话"
				})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "cb-native-dock-tracks",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "cb-native-dock-label",
						children: "输入目标"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "cb-native-dock-chips",
						children: dock.tracks.map((tr) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `cb-dock-track-chip ${tr.active ? "cb-active" : ""}`,
							title: tr.active ? `当前底部输入框正在发送到「${tr.title}」` : `点击切换发送目标至「${tr.title}」`,
							onClick: (e) => {
								e.stopPropagation();
								if (tr.active) {
									focusNativeBottomComposer();
									return;
								}
								openSessionInTimeline(sessionsApi, getUiWorkspace, tr.id, true);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "cb-native-dock-dot",
								style: { background: tr.color }
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "cb-dock-track-chip-text",
								children: tr.title
							})]
						}, tr.id))
					})]
				})
			});
		}
		function apply(ctx) {
			const metaStore = new ChronoMetaStore();
			const tileStore = new TileStore();
			const dockStore = new ComposerDockStore();
			const shortcutBridge = new NativeShortcutBridge();
			const snapshotCache = /* @__PURE__ */ new Map();
			ctx.effect(() => {
				const removeStyles = injectChronoStyles();
				return () => {
					removeStyles();
				};
			}, "dsh-chronobranch:styles");
			const getOptionalService = (serviceName) => {
				try {
					const getter = ctx.get;
					return typeof getter === "function" ? getter.call(ctx, serviceName) : void 0;
				} catch {
					return;
				}
			};
			const getUiWorkspace = () => getOptionalService("uiWorkspace");
			ctx.slots.inject("conversation.view", () => ctx.slots.register({
				name: "conversation.view",
				id: "chronobranch",
				order: 20,
				label: "时间线",
				inject: () => ({
					sessionsApi: ctx.sessions,
					workspacesApi: getOptionalService("workspaces"),
					uiConversationApi: getOptionalService("uiConversation"),
					getUiWorkspace,
					metaStore,
					tileStore,
					dockStore,
					shortcutBridge,
					snapshotCache
				})
			}, ChronoConversationView));
			ctx.slots.inject("conversation.input.dock", () => ctx.slots.register({
				name: "conversation.input.dock",
				id: "chronobranch-branch-dock",
				order: 5,
				inject: () => ({
					dockStore,
					sessionsApi: ctx.sessions,
					getUiWorkspace
				})
			}, ChronoComposerDock));
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "chronobranch-tiles",
				order: 40,
				inject: () => ({
					tileStore,
					sessionsApi: ctx.sessions,
					getUiWorkspace
				})
			}, TileOverlay));
			try {
				ctx.inject?.(["shortcuts"], (sCtx) => {
					sCtx.effect(() => {
						const shortcutsSvc = sCtx.get?.("shortcuts");
						if (!shortcutsSvc || typeof shortcutsSvc.register !== "function") return () => {};
						let disposed = false;
						let detach = null;
						const timer = window.setTimeout(() => {
							if (disposed) return;
							detach = shortcutBridge.attach(shortcutsSvc);
						}, 0);
						return () => {
							disposed = true;
							window.clearTimeout(timer);
							detach?.();
						};
					}, "dsh-chronobranch:shortcuts");
				});
			} catch (err) {
				console.warn("[dsh-chronobranch] Unable to attach to native shortcuts service:", err);
			}
		}
		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map