const { createRollupConfig } = require('../../scripts/rollup.config.factory');

module.exports = createRollupConfig({
  input: 'src/index.ts',
  packageName: '@regan-ad/shared',
  external: [],
});
