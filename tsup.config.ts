import { Options } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';
import { ScssModulesPlugin } from 'esbuild-scss-modules-plugin';
import inlineImage from 'esbuild-plugin-inline-image';

const env = process.env.NODE_ENV;

export const tsup: Options = {
  clean: true,
  format: ['esm'],
  minify: env === 'production',
  outDir: 'dist',
  entry: ['src/integration/index.js'],
  outExtension() {
    return {
      js: `.js`,
    };
  },
  esbuildPlugins: [
    inlineImage({ limit: -1 }),
    ScssModulesPlugin({ localsConvention: 'dashes' }),
    sassPlugin({ type: 'style' }),
  ],
  loader: {
    '.js': 'jsx',
  },
  target: 'es2020',
};
