const { createRollupConfig } = require('../../scripts/rollup.config.factory');

module.exports = createRollupConfig({
  input: 'src/index.tsx',
  packageName: '@regan-ad/business-admin',
  external: [
    'react',
    'react-dom',
    '@regan-ad/base-ui',
    '@regan-ad/base-form',
    '@regan-ad/shared',
  ],
});
