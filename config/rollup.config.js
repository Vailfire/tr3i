import babel from 'rollup-plugin-babel';

export default {
  entry: 'modules/index.js',
  sourceMap: true,
  plugins: [babel()]
};
