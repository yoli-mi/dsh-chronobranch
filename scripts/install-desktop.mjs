#!/usr/bin/env node
/**
 * Mounts or unmounts dsh-chronobranch directly in DeepSeek Harness Desktop's
 * `desktop` profile (`~/.dsh/profiles/desktop/cordis.patch.yml`), preserving
 * all existing user config and plugins with an automatic backup.
 *
 * Usage:
 *   node scripts/install-desktop.mjs          # mount into desktop profile
 *   node scripts/install-desktop.mjs --remove # unmount from desktop profile
 */

import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginRoot = path.resolve(__dirname, '..');
const entryPosix = path.join(pluginRoot, 'lib', 'index.js').replace(/\\/g, '/');
const isRemove = process.argv.includes('--remove');

const desktopDir = path.join(os.homedir(), '.dsh', 'profiles', 'desktop');
const patchPath = path.join(desktopDir, 'cordis.patch.yml');
const backupPath = path.join(desktopDir, 'cordis.patch.yml.before-chronobranch.bak');

const START_MARK = '# >>> dsh-chronobranch >>>';
const END_MARK = '# <<< dsh-chronobranch <<<';

if (!existsSync(patchPath)) {
  console.error(`[dsh-chronobranch] 未找到 DSH 桌面端配置文件：${patchPath}`);
  console.error('请确认已至少启动过一次 DeepSeek Harness 桌面端。');
  process.exit(1);
}

if (!isRemove && (!existsSync(path.join(pluginRoot, 'lib', 'index.js')) || !existsSync(path.join(pluginRoot, 'lib', 'client.js')))) {
  console.error('[dsh-chronobranch] 缺少构建产物 lib/index.js 或 lib/client.js，请先执行 pnpm run build。');
  process.exit(1);
}

const raw = readFileSync(patchPath, 'utf8');
if (!existsSync(backupPath)) {
  copyFileSync(patchPath, backupPath);
  console.log(`[dsh-chronobranch] 已备份原配置至：${backupPath}`);
}

// Strip existing managed block if present
const blockRe = new RegExp(`\\r?\\n?${START_MARK}[\\s\\S]*?${END_MARK}\\r?\\n?`, 'g');
let cleaned = raw.replace(blockRe, '').trimEnd();

if (isRemove) {
  writeFileSync(patchPath, cleaned ? `${cleaned}\n` : '[]\n', 'utf8');
  console.log('[dsh-chronobranch] 已从 DSH Desktop 配置中移除。请完全退出并重启 DSH 桌面端。');
  process.exit(0);
}

// If file was an empty YAML list `[]`, replace it with our patch list
if (cleaned === '[]') {
  cleaned = '';
}

const block = [
  START_MARK,
  '- insert:',
  '    - id: chronobranch',
  `      name: "${entryPosix}"`,
  END_MARK,
].join('\n');

const nextContent = cleaned ? `${cleaned}\n\n${block}\n` : `${block}\n`;
writeFileSync(patchPath, nextContent, 'utf8');

console.log(`[dsh-chronobranch] 已成功挂载到 DSH Desktop：${patchPath}`);
console.log(`[dsh-chronobranch] 插件入口：${entryPosix}`);
console.log('[dsh-chronobranch] 请完全退出（含系统托盘）并重启 DeepSeek Harness 桌面端即可生效！');
