/**
 * Host loader entry for dsh-chronobranch.
 *
 * Runs inside DSH Desktop's Node.js host process:
 * - Spawns a single hidden Windows WPF STA dispatcher lazily on first desktop-tile pop-out
 *   (ZERO external browser, ZERO Edge, ZERO taskbar icon — 100% frameless rounded card
 *    with `ShowInTaskbar = false` and `Topmost = true`, staying on the desktop even when
 *    DSH Desktop is minimized!).
 * - Exposes a loopback-only endpoint (`127.0.0.1:47392`) for the DSH renderer client.
 * - Cleans up cleanly when DSH Desktop exits or unloads the plugin.
 */

import { spawn, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import http, { type IncomingMessage, type ServerResponse } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import type { Context } from '@deepseek-ai/cordis';
import { WPF_TILE_HOST_PS } from './host/wpf-tile-script';

export const name = 'dsh-chronobranch';

const TILE_HOST = '127.0.0.1';
const TILE_PORT = 47392;

class WpfDesktopTileBridge {
  private proc: ChildProcess | null = null;
  private scriptPath: string | null = null;

  private ensureScript(): string {
    const p = path.join(os.tmpdir(), 'dsh-chronobranch-wpf-tile-host.ps1');
    if (this.scriptPath === p && fs.existsSync(p)) return p;
    // UTF-8 BOM is required so Windows PowerShell 5.1 decodes Chinese UI labels as UTF-8 instead of GBK
    fs.writeFileSync(p, `\uFEFF${WPF_TILE_HOST_PS}`, 'utf8');
    this.scriptPath = p;
    return p;
  }

  private ensureProcess(): ChildProcess | null {
    if (process.platform !== 'win32') return null;
    if (this.proc && !this.proc.killed && this.proc.exitCode === null) {
      return this.proc;
    }
    const script = this.ensureScript();
    const child = spawn(
      'powershell.exe',
      ['-STA', '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-WindowStyle', 'Hidden', '-File', script],
      { windowsHide: true, stdio: ['pipe', 'ignore', 'pipe'] },
    );
    child.stderr?.on('data', (buf: Buffer) => {
      const msg = buf.toString('utf8').trim();
      if (msg) console.error('[dsh-chronobranch/wpf]', msg);
    });
    child.on('exit', () => {
      if (this.proc === child) this.proc = null;
    });
    this.proc = child;
    return child;
  }

  sendCommand(cmd: Record<string, unknown>): boolean {
    const child = this.ensureProcess();
    if (!child?.stdin || !child.stdin.writable) return false;
    const b64 = Buffer.from(JSON.stringify(cmd), 'utf8').toString('base64');
    child.stdin.write(`${b64}\n`);
    return true;
  }

  dispose(): void {
    const child = this.proc;
    this.proc = null;
    if (!child) return;
    try {
      const b64 = Buffer.from(JSON.stringify({ op: 'quit' }), 'utf8').toString('base64');
      if (child.stdin?.writable) {
        child.stdin.write(`${b64}\n`);
        child.stdin.end();
      }
    } catch {
      // Ignore shutdown write errors
    }
    setTimeout(() => {
      try {
        if (child.exitCode === null && !child.killed) child.kill();
      } catch {
        // Ignore
      }
    }, 600);
  }
}

function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > 4 * 1024 * 1024) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? (JSON.parse(raw) as Record<string, unknown>) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(body));
}

export function apply(ctx: Context): void {
  const bridge = new WpfDesktopTileBridge();

  ctx.effect(() => {
    const server = http.createServer(async (req, res) => {
      const method = req.method ?? 'GET';
      const urlObj = new URL(req.url ?? '/', `http://${TILE_HOST}:${TILE_PORT}`);

      if (method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end();
        return;
      }

      if (method === 'GET' && urlObj.pathname === '/health') {
        sendJson(res, 200, { ok: true, platform: process.platform });
        return;
      }

      if (method === 'POST' && urlObj.pathname === '/api/desktop-tile') {
        try {
          const data = await readJsonBody(req);
          const ok = bridge.sendCommand({ ...data, op: 'show' });
          sendJson(res, 200, { ok });
        } catch (err) {
          sendJson(res, 400, { ok: false, error: err instanceof Error ? err.message : String(err) });
        }
        return;
      }

      if (method === 'POST' && urlObj.pathname === '/api/desktop-tile/close') {
        try {
          const data = await readJsonBody(req);
          const ok = bridge.sendCommand({ op: 'close', id: String(data.id ?? '') });
          sendJson(res, 200, { ok });
        } catch {
          sendJson(res, 400, { ok: false });
        }
        return;
      }

      res.writeHead(404);
      res.end();
    });

    server.on('error', () => {
      // Gracefully ignore EADDRINUSE if another host instance already serves desktop tiles
    });

    server.listen(TILE_PORT, TILE_HOST);

    return () => {
      try {
        server.close();
      } catch {
        // Ignore
      }
      bridge.dispose();
    };
  }, 'dsh-chronobranch:wpf-desktop-tiles');
}
