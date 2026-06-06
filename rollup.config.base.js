const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

function createPackageConfig(packageDir) {
  const packageJson = require(path.join(packageDir, 'package.json'));
  const deps = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ];

  return [
    {
      input: path.join(packageDir, 'src/index.ts'),
      output: [
        {
          file: path.join(packageDir, packageJson.module || 'dist/index.esm.js'),
          format: 'esm',
          sourcemap: false,
        },
        {
          file: path.join(packageDir, packageJson.main || 'dist/index.js'),
          format: 'cjs',
          sourcemap: false,
          exports: 'named',
        },
      ],
      plugins: [
        resolve({
          browser: true,
        }),
        commonjs(),
        typescript({
          tsconfig: path.join(packageDir, 'tsconfig.json'),
          declaration: true,
          declarationDir: path.join(packageDir, 'dist'),
          rootDir: path.join(packageDir, 'src'),
          sourceMap: false,
          declarationMap: false,
        }),
      ],
      external: (id) => deps.some((dep) => id === dep || id.startsWith(`${dep}/`)),
    },
  ];
}

module.exports = createPackageConfig;
