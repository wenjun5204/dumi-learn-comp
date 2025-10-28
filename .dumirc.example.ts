/**
 * 这是一个示例配置文件，展示如何在 Dumi 中添加自定义 webpack loader
 *
 * 使用方法：
 * 1. 复制此文件的配置到你的 .dumirc.ts
 * 2. 安装所需的依赖
 * 3. 运行 npm run dev 测试
 */

import { defineConfig } from 'dumi';
import * as path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default defineConfig({
  outputPath: 'docs-dist',
  alias: {
    '@compiled': path.resolve(__dirname, './dist'),
  },
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },

  /**
   * ✅ 方式 1：使用 chainWebpack 修改 webpack 配置
   * 这是最推荐的方式，简洁且灵活
   */
  chainWebpack(config) {
    // 获取 CSS 规则
    const cssRule = config.module.rule('css');

    // 清空现有的 loader（可选，如果想完全自定义）
    // cssRule.uses.clear();

    // 添加自定义 CSS loader 链
    cssRule
      .test(/\.css$/i)
      // 第一步：使用自定义的 isomor CSS loader
      .use('isomor-css-loader')
      .loader('@wmfe/wmad-isomor-css-loader')
      .options({
        sourceDir: path.join(__dirname, './src'),
        runtimeSupport: true,
        h5Options: {
          minPixelValue: 0.01,
          minPixelIsomorValue: 0.01,
          unitPrecision: 3,
          isomorRatio: 0.5,
          pxToRemRadio: 16,
          needPxToRem: false,
          needVw: false,
        },
      })
      .end()
      // 第二步：提取 CSS 到单独文件
      .use('mini-css-extract')
      .loader(MiniCssExtractPlugin.loader)
      .end()
      // 第三步：处理 CSS 模块
      .use('css-loader')
      .loader('css-loader')
      .options({
        modules: {
          auto: true,
          localIdentName: '[local]_[hash:base64:5]',
        },
      })
      .end()
      // 第四步：PostCSS 处理
      .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        postcssOptions: {
          plugins: [
            ['postcss-preset-env', {}],
          ],
        },
      })
      .end();

    // 添加 MiniCssExtractPlugin
    config.plugin('mini-css-extract').use(MiniCssExtractPlugin, [
      {
        filename: '[name].css',
        chunkFilename: '[name].chunk.css',
      },
    ]);

    return config;
  },

  themeConfig: {
    name: 'regan-ad-comp ',
  },
});

/**
 * ============================================
 * 其他配置方式（供参考）
 * ============================================
 */

/**
 * 方式 2：使用 modifyConfig 钩子
 *
 * export default defineConfig({
 *   modifyConfig(config) {
 *     if (config.chainWebpack) {
 *       config.chainWebpack = (chain) => {
 *         chain.module
 *           .rule('css')
 *           .test(/\.css$/i)
 *           .use('custom-loader')
 *           .loader('@wmfe/wmad-isomor-css-loader')
 *           .options({
 *             sourceDir: path.join(__dirname, './src'),
 *             runtimeSupport: true,
 *           });
 *         return chain;
 *       };
 *     }
 *     return config;
 *   },
 * });
 */

/**
 * 方式 3：使用自定义插件
 *
 * const customLoaderPlugin = {
 *   name: 'custom-loader-plugin',
 *   apply: 'serve', // 仅在开发时应用
 *
 *   chainWebpack(config) {
 *     config.module
 *       .rule('css')
 *       .test(/\.css$/i)
 *       .use('isomor-css-loader')
 *       .loader('@wmfe/wmad-isomor-css-loader')
 *       .options({
 *         sourceDir: path.join(__dirname, './src'),
 *         runtimeSupport: true,
 *       });
 *     return config;
 *   },
 * };
 *
 * export default defineConfig({
 *   plugins: [customLoaderPlugin],
 * });
 */
