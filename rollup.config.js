import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

import sass from 'rollup-plugin-sass';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';
import includePaths from 'rollup-plugin-includepaths';
const path = require('path');
// import copy from 'rollup-plugin-copy';
let includePathOptions = {
  include: {},
  paths: [path.resolve(__dirname, 'src')],
  external: ['history'],
  extensions: ['.js', '.json', '.html', 'jsx'],
};
export default {
  input: pkg.source,
  inlineDynamicImports: true,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],

  plugins: [
    external(),
    sass(),
    image(),
    // replace({
    //   delimiters: ['', ''],
    //   preventAssignment: true,
    // }),

    babel({
      exclude: ['node_modules/**'],
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react', '@babel/preset-env'],
      extensions: ['.js', '.jsx'],
    }),
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    json(),
    terser(),
    del({ targets: ['dist/*'] }),
    // copy({
    //   targets: [
    //     {
    //       src: 'jsconfig.json',
    //       dest: 'dist',
    // rename: 'variables.scss',
    // },
    // {
    //   src: "src/typography.scss",
    //   dest: "build",
    //   rename: "typography.scss"
    // }
    //   ],
    // }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
