import { defineConfig, type UserConfig } from 'tsdown';

const PLUGIN_ID = 'dsh-chronobranch';

const CLIENT_EXTERNALS = [
  'react',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'react-dom',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-runtime/client',
];

const hostBundle: UserConfig = {
  name: `${PLUGIN_ID}/host`,
  entry: { index: 'src/index.ts' },
  outDir: 'lib',
  format: 'esm',
  platform: 'node',
  dts: false,
  sourcemap: true,
  clean: true,
  deps: {
    neverBundle: ['@deepseek-ai/cordis'],
  },
  outputOptions: {
    entryFileNames: 'index.js',
  },
};

const clientBundle: UserConfig = {
  name: `${PLUGIN_ID}/client`,
  entry: { client: 'src/client/index.tsx' },
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  dts: false,
  sourcemap: true,
  clean: false,
  deps: {
    neverBundle: CLIENT_EXTERNALS,
  },
  outputOptions: {
    entryFileNames: 'client.js',
    banner: `window.__ModuleLoader__.load({ id: "${PLUGIN_ID}", factory: (require) => {`,
    intro: 'var module = { exports: {} }; var exports = module.exports;',
    footer: 'return module.exports; } });',
  },
};

export default defineConfig([hostBundle, clientBundle]);
