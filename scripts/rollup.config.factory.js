/**
 * 共享 Rollup 配置工厂
 *
 * 参考商增前端构建工具方案设计（km.sankuai.com/collabpage/2780796931）：
 * - 库构建（组件库、工具库、插件）统一使用 Rollup
 * - 输出 ESM + CJS + UMD 多格式
 * - 通过 rollup-plugin-peer-deps-external 自动外置 peerDeps
 * - TypeScript 类型声明通过 @rollup/plugin-typescript 生成
 *
 * 用法：
 *   const { createRollupConfig } = require('../../scripts/rollup.config.factory');
 *   module.exports = createRollupConfig({
 *     input: 'src/index.ts',
 *     external: ['react', 'react-dom'],
 *   });
 */

const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('@rollup/plugin-terser');

/**
 * 创建统一的 Rollup 配置
 * @param {Object} options - 配置选项
 * @param {string} options.input - 入口文件路径，默认 'src/index.ts'
 * @param {string[]} options.external - 额外需要外部化的依赖（除 peerDeps 外）
 * @param {string} options.packageName - 包名，用于 UMD 全局变量名
 * @param {boolean} options.minify - 是否压缩输出，默认 false
 * @param {string} options.tsconfig - tsconfig.json 路径，默认 './tsconfig.json'
 * @param {boolean} options.extractCSS - 是否提取 CSS 到单独文件，默认 true
 * @returns {Object} Rollup 配置对象
 */
function createRollupConfig(options = {}) {
  const {
    input = 'src/index.ts',
    external = [],
    packageName = 'pkg',
    minify = false,
    tsconfig = './tsconfig.json',
    extractCSS = true,
  } = options;

  // 将包名转换为 camelCase 作为 UMD 全局变量名
  const umdName = packageName
    .replace(/^@/, '')
    .replace(/\/.*/, '')
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
    .replace(/^./, (c) => c.toUpperCase());

  const sharedPlugins = [
    // 自动将 peerDependencies 外部化
    peerDepsExternal(),
    // 解析 node_modules 中的模块
    resolve({
      browser: true,
    }),
    // 将 CommonJS 模块转换为 ES 模块
    commonjs(),
    // 处理 CSS/Less/SCSS
    postcss({
      extract: extractCSS,
      minimize: minify,
      use: [['less', { javascriptEnabled: true }], ['sass']],
    }),
    // TypeScript 编译 + 声明文件生成
    typescript({
      tsconfig,
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    }),
  ];

  if (minify) {
    sharedPlugins.push(terser());
  }

  // 将 external 数组转为 globals 映射（用于 UMD 格式）
  const umdGlobals = external.reduce((acc, dep) => {
    if (dep === 'react') acc[dep] = 'React';
    else if (dep === 'react-dom') acc[dep] = 'ReactDOM';
    else if (dep === 'react/jsx-runtime') acc[dep] = 'jsxRuntime';
    else {
      // 将 @scope/pkg-name → ScopePkgName
      acc[dep] = dep
        .replace(/^@/, '')
        .replace(/\/.*/, '')
        .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
        .replace(/^./, (c) => c.toUpperCase());
    }
    return acc;
  }, {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react/jsx-runtime': 'jsxRuntime',
  });

  return [
    // ESM 输出
    {
      input,
      output: {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        entryFileNames: 'index.esm.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
      plugins: sharedPlugins,
      external: [...external],
    },
    // CJS 输出
    {
      input,
      output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        entryFileNames: 'index.cjs.js',
        chunkFileNames: 'chunks/[name]-[hash].cjs.js',
        assetFileNames: 'assets/[name][extname]',
      },
      plugins: sharedPlugins,
      external: [...external],
    },
    // UMD 输出（用于 CDN 直接引用）
    {
      input,
      output: {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: umdName,
        sourcemap: true,
        exports: 'named',
        globals: umdGlobals,
      },
      plugins: sharedPlugins,
      external: [...external],
    },
  ];
}

module.exports = { createRollupConfig };
