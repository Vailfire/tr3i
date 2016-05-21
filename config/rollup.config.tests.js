import babel from 'rollup-plugin-babel';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  entry: '**/tests/*.js',
  plugins: [babel(), multiEntry()],
  format: 'es6',
  intro: 'require("source-map-support").install();',
  dest: 'build/tests-bundle.js',
  sourceMap: true,
};
