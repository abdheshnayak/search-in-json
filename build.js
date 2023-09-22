/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore
const { build } = require('esbuild');
const { dependencies } = require('./package.json');

const entryFile = 'src/index.ts';
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  external: Object.keys(dependencies),
  logLevel: 'info',
  minify: true,
  sourcemap: false,
};

build({
  ...shared,
  format: 'esm',
  outfile: './dist/esm/index.mjs',
  target: ['esnext', 'node20.6.0'],
});

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/cjs/index.js',
  target: ['esnext', 'node20.6.0'],
});
