import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/tr3i.umd.js';
config.moduleName = 'tr3i';

export default config;
