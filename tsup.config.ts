import type { Options } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';
import { ScssModulesPlugin } from 'esbuild-scss-modules-plugin';

const env = process.env.NODE_ENV;

export const tsup: Options = {
  clean: true,
  format: ['esm'],
  //minify: env === 'production',
  watch: env === 'development',
  outDir: 'dist',
  entry: ['src/integration/index.js'],
  outExtension() {
    return {
      js: `.js`,
    };
  },
  esbuildPlugins: [ScssModulesPlugin(), sassPlugin()],
  loader: {
    '.js': 'jsx',
  },
  target: 'es2020',
};
