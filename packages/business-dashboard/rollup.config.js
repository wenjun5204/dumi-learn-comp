const { createRollupConfig } = require('../../scripts/rollup.config.factory');

module.exports = createRollupConfig({
  input: 'src/index.tsx',
  packageName: '@regan-ad/business-dashboard',
  external: [
    'react',
    'react-dom',
    '@regan-ad/base-ui',
    '@regan-ad/shared',
  ],
});
