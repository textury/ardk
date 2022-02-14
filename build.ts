import { build } from 'esbuild';
import { nodeBuiltIns } from 'esbuild-node-builtins';

const runBuild = async () => {
  // Build to browser js
  build({
    plugins: [nodeBuiltIns()],
    entryPoints: ['./src/blockweave.ts'],
    minify: false,
    bundle: true,
    platform: 'browser',
    target: ['es2019'],
    outfile: './dist/blockweave-web.js',
    sourcemap: 'external',
    define: {
      'process.env.NODE_DEBUG': 'false',
      'process.env.NODE_ENV': 'production',
      'process.env.DEBUG': 'false',
      'global': 'window',
      'process.cwd': 'String',
      '_smartweave_1.LoggerFactory.INST': '{"create": "function() {}"}',
      '__filename': 'String',
    }
  }).catch((e) => {
    console.log(e);
    process.exit(1);
  });

  // Minified version
  build({
    plugins: [nodeBuiltIns()],
    entryPoints: ['./src/blockweave.ts'],
    minify: true,
    bundle: true,
    platform: 'browser',
    target: ['es2019'],
    outfile: './dist/blockweave-web.min.js',
    sourcemap: 'external',
    define: {
      'process.env.NODE_DEBUG': 'false',
      'process.env.NODE_ENV': 'production',
      'process.env.DEBUG': 'false',
      'global': 'window',
      'process.cwd': 'String',
      '_smartweave_1.LoggerFactory.INST': '{"create": "function() {}"}',
      '__filename': 'String',
    }
  }).catch((e) => {
    console.log(e);
    process.exit(1)
  });

  // Build to frontend frameworks 
  build({
    plugins: [nodeBuiltIns()],
    entryPoints: ['./src/blockweave.ts'],
    minify: false,
    bundle: true,
    platform: 'browser',
    target: ['es2019'],
    format: 'esm', // to allow import support
    splitting: true,
    outdir: './web',
    sourcemap: 'external',
    define: {
      'process.env.NODE_DEBUG': 'false',
      'process.env.NODE_ENV': 'production',
      'process.env.DEBUG': 'false',
      'global': 'window',
      'process.cwd': 'String',
      '_smartweave_1.LoggerFactory.INST': '{"create": "function() {}"}',
      '__filename': 'String',
    }
  }).catch((e) => {
    console.log(e);
    process.exit(1);
  });
};

runBuild();