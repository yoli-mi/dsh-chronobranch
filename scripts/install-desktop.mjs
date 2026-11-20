#!/usr/bin/env node
/**
 * Mounts or unmounts `dsh-chronobranch` as a first-class bundle package inside
 * DeepSeek Harness Desktop's `desktop` profile (`~/.dsh/profiles/desktop/`):
 *
 * - Links `node_modules/dsh-chronobranch` -> this plugin directory (junction on Windows, symlink on POSIX)
 * - Registers `"dsh-chronobranch"` in `package.json` (`dependencies` + `dsh.profile.bundles`)
 * - Cleans up any legacy raw-path entry in `cordis.patch.yml` without disturbing other user settings
 *
 * This lets DSH's Settings -> 插件 & Sidebar -> 插件 display proper localized title,
 * description, version, icon, README detail view, and enable/disable controls.
 *
 * Usage:
 *   node scripts/install-desktop.mjs          # mount into desktop profile
 *   node scripts/install-desktop.mjs --remove # unmount from desktop profile
 */

import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginRoot = path.resolve(__dirname, '..');
const pluginRootPosix = pluginRoot.replace(/\\/g, '/');
const isRemove = process.argv.includes('--remove');

const PKG_NAME = 'dsh-chronobranch';
const desktopDir = path.join(os.homedir(), '.dsh', 'profiles', 'desktop');
const profilePkgPath = path.join(desktopDir, 'package.json');
const patchPath = path.join(desktopDir, 'cordis.patch.yml');
const nodeModulesDir = path.join(desktopDir, 'node_modules');
const linkTargetPath = path.join(nodeModulesDir, PKG_NAME);

if (!existsSync(profilePkgPath)) {
  console.error(`[dsh-chronobranch] 未找到 DSH 桌面端 profile 配置：${profilePkgPath}`);
  console.error('请确认已至少启动过一次 DeepSeek Harness 桌面端。');
  process.exit(1);
}

if (
  !isRemove &&
  (!existsSync(path.join(pluginRoot, 'lib', 'index.js')) || !existsSync(path.join(pluginRoot, 'lib', 'client.js')))
) {
  console.error('[dsh-chronobranch] 缺少构建产物 lib/index.js 或 lib/client.js，请先执行 pnpm run build。');
  process.exit(1);
}

/**
 * Safely strip any legacy raw-path chronobranch insert from `cordis.patch.yml`
 * while preserving EVERY other entry (including `ui-theme`, `locale`, etc.).
 */
function cleanLegacyPatchEntry() {
  if (!existsSync(patchPath)) return;
  const raw = readFileSync(patchPath, 'utf8');
  if (!raw.includes('chronobranch')) return;

  const backupPath = path.join(desktopDir, 'cordis.patch.yml.before-chronobranch-bundle.bak');
  if (!existsSync(backupPath)) {
    copyFileSync(patchPath, backupPath);
  }

  // Remove only the marker comment lines and the specific `- insert:\n    - id: chronobranch\n      name: "..."` entry
  let cleaned = raw
    .replace(/^\s*# >>> dsh-chronobranch >>>\r?\n?/gm, '')
    .replace(/^\s*# <<< dsh-chronobranch <<<\r?\n?/gm, '')
    .replace(
      /- insert:\r?\n\s+- id:\s*chronobranch\r?\n\s+name:\s*["']?[^\r\n]*dsh-chronobranch[^\r\n]*["']?\r?\n?/g,
      '',
    )
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();

  writeFileSync(patchPath, cleaned ? `${cleaned}\n` : '[]\n', 'utf8');
  console.log('[dsh-chronobranch] 已清理 cordis.patch.yml 中的旧版原始路径挂载条目（保留其余用户配置）。');
}

function removeLinkIfPresent() {
  try {
    lstatSync(linkTargetPath);
    rmSync(linkTargetPath, { recursive: true, force: true });
  } catch {
    // Not present
  }
}

cleanLegacyPatchEntry();

const profilePkg = JSON.parse(readFileSync(profilePkgPath, 'utf8'));
profilePkg.dependencies = profilePkg.dependencies ?? {};
profilePkg.dsh = profilePkg.dsh ?? {};
profilePkg.dsh.profile = profilePkg.dsh.profile ?? {};
const bundles = Array.isArray(profilePkg.dsh.profile.bundles) ? [...profilePkg.dsh.profile.bundles] : [];

if (isRemove) {
  delete profilePkg.dependencies[PKG_NAME];
  profilePkg.dsh.profile.bundles = bundles.filter((b) => b !== PKG_NAME);
  writeFileSync(profilePkgPath, `${JSON.stringify(profilePkg, null, 2)}\n`, 'utf8');
  removeLinkIfPresent();
  console.log('[dsh-chronobranch] 已从 DSH Desktop profile 中完整卸载。请完全退出并重启 DSH 桌面端。');
  process.exit(0);
}

// Register as a first-class bundle in ~/.dsh/profiles/desktop/package.json
profilePkg.dependencies[PKG_NAME] = `link:${pluginRootPosix}`;
if (!bundles.includes(PKG_NAME)) {
  bundles.push(PKG_NAME);
}
profilePkg.dsh.profile.bundles = bundles;
writeFileSync(profilePkgPath, `${JSON.stringify(profilePkg, null, 2)}\n`, 'utf8');

// Link into ~/.dsh/profiles/desktop/node_modules/dsh-chronobranch
mkdirSync(nodeModulesDir, { recursive: true });
removeLinkIfPresent();
symlinkSync(pluginRoot, linkTargetPath, process.platform === 'win32' ? 'junction' : 'dir');

console.log(`[dsh-chronobranch] 已以标准插件包形式挂载到 DSH Desktop：${profilePkgPath}`);
console.log(`[dsh-chronobranch] 模块软链：${linkTargetPath} -> ${pluginRoot}`);
console.log('[dsh-chronobranch] 请完全退出（含系统托盘）并重启 DeepSeek Harness 桌面端，即可在「插件」与「设置」中看到完整名称、简介与图标！');
