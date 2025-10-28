import { defineConfig } from 'dumi';
import * as path from 'path';
// 导入自定义 webpack 插件
const DemoWebpackPlugin = require('./webpack-plugins/demo-plugin');
const AssetSizePlugin = require('./webpack-plugins/asset-size-plugin');

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
   * ✅ 使用 chainWebpack 配置自定义 webpack
   */
  chainWebpack(config) {
    // ============================================
    // 1. 配置 CSS Loader 链
    // ============================================
    
    // ============================================
    // 3. 添加自定义 Webpack 插件
    // ============================================

    // 演示插件：输出编译信息
    config.plugin('demo-plugin').use(DemoWebpackPlugin, [
      {
        name: 'DemoPlugin',
        verbose: true,
      },
    ]);

    // 资源大小分析插件：分析输出文件大小
    config.plugin('asset-size-plugin').use(AssetSizePlugin, [
      {
        name: 'AssetSizePlugin',
        threshold: 100 * 1024, // 100KB
        verbose: true,
      },
    ]);

    return config;
  },

  themeConfig: {
    name: 'regan-ad-comp ',
  },
});
