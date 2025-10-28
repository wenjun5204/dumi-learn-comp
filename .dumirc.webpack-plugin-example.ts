/**
 * Dumi 配置示例：集成自定义 Webpack 插件
 *
 * 这个文件展示了如何在 Dumi 中使用 chainWebpack 来添加自定义 webpack 插件
 *
 * 使用方法：
 * 1. 查看本文件了解如何配置
 * 2. 复制相关配置到你的 .dumirc.ts
 * 3. 运行 npm run dev 测试
 */

import { defineConfig } from 'dumi';
import * as path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// 导入自定义插件
const DemoWebpackPlugin = require('./webpack-plugins/demo-plugin');
const AssetSizePlugin = require('./webpack-plugins/asset-size-plugin');

export default defineConfig({
  outputPath: 'docs-dist',
  alias: {
    '@compiled': path.resolve(__dirname, './dist'),
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },

  /**
   * ✅ 使用 chainWebpack 配置 webpack
   * 这是在 Dumi 中添加自定义 webpack 插件的主要方式
   */
  chainWebpack(config) {
    // ============================================
    // 1. 配置 CSS Loader 链
    // ============================================
    const cssRule = config.module.rule('css');

    cssRule
      .test(/\.css$/i)
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
      .use('mini-css-extract')
      .loader(MiniCssExtractPlugin.loader)
      .end()
      .use('css-loader')
      .loader('css-loader')
      .options({
        modules: {
          auto: true,
          localIdentName: '[local]_[hash:base64:5]',
        },
      })
      .end()
      .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        postcssOptions: {
          plugins: [['postcss-preset-env', {}]],
        },
      })
      .end();

    // ============================================
    // 2. 添加 MiniCssExtractPlugin
    // ============================================
    config.plugin('mini-css-extract').use(MiniCssExtractPlugin, [
      {
        filename: '[name].css',
        chunkFilename: '[name].chunk.css',
      },
    ]);

    // ============================================
    // 3. 添加自定义 Webpack 插件
    // ============================================

    // 方式 1：添加演示插件
    config.plugin('demo-plugin').use(DemoWebpackPlugin, [
      {
        name: 'DemoPlugin',
        verbose: true, // 是否输出详细日志
      },
    ]);

    // 方式 2：添加资源大小分析插件
    config.plugin('asset-size-plugin').use(AssetSizePlugin, [
      {
        name: 'AssetSizePlugin',
        threshold: 100 * 1024, // 100KB 阈值
        verbose: true,
      },
    ]);

    // ============================================
    // 4. 其他 webpack 配置示例
    // ============================================

    // 修改输出配置
    config.output
      .filename('[name].[contenthash:8].js')
      .chunkFilename('[name].[contenthash:8].chunk.js');

    // 添加别名
    config.resolve.alias.set('@components', path.resolve(__dirname, './src'));

    // 修改开发服务器配置
    config.devServer.set('port', 8000);
    config.devServer.set('hot', true);

    return config;
  },

  themeConfig: {
    name: 'regan-ad-comp',
  },
});

/**
 * ============================================
 * 其他配置方式参考
 * ============================================
 */

/**
 * 方式 2：使用 modifyConfig 钩子
 *
 * export default defineConfig({
 *   modifyConfig(config) {
 *     if (config.chainWebpack) {
 *       config.chainWebpack = (chain) => {
 *         // 添加插件
 *         chain.plugin('demo-plugin').use(DemoWebpackPlugin, [{ verbose: true }]);
 *         return chain;
 *       };
 *     }
 *     return config;
 *   },
 * });
 */

/**
 * 方式 3：使用自定义 Dumi 插件
 *
 * const webpackPluginWrapper = {
 *   name: 'webpack-plugin-wrapper',
 *   apply: 'serve', // 仅在开发时应用
 *
 *   chainWebpack(config) {
 *     config.plugin('demo-plugin').use(DemoWebpackPlugin, [{ verbose: true }]);
 *     return config;
 *   },
 * };
 *
 * export default defineConfig({
 *   plugins: [webpackPluginWrapper],
 * });
 */
