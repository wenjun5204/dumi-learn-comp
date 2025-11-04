/**
 * Monorepo 统一文档站点的 Dumi 配置
 *
 * 这个配置文件应该放在 docs/ 目录下，作为 .dumirc.ts
 *
 * 使用方法：
 * 1. 复制此文件到 docs/.dumirc.ts
 * 2. 根据你的项目调整配置
 * 3. 运行 pnpm docs:dev 启动开发
 */

import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  // ============================================
  // 基础配置
  // ============================================

  // 输出目录
  outputPath: '../docs-dist',

  // ============================================
  // Monorepo 重定向配置（关键）
  // ============================================
  // 自动重定向到子包的源码位置，支持热更新，无需预构建
  monorepoRedirect: {
    // 源码文件夹优先级 - Dumi 会自动扫描这些目录中的 .md 文件
    srcDir: ['src'],
    // 启用 peerDeps 重定向，避免多实例问题
    peerDeps: true,
  },

  // ============================================
  // 别名配置 - 指向各个包的源代码
  // ============================================
  alias: {
    // 基础组件库
    '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui/src'),
    '@regan-ad/base-ui-docs': path.resolve(__dirname, '../packages/base-ui/docs'),
    '@regan-ad/base-form': path.resolve(__dirname, '../packages/base-form/src'),

    // 业务组件库
    '@regan-ad/business-admin': path.resolve(__dirname, '../packages/business-admin/src'),
    '@regan-ad/business-dashboard': path.resolve(__dirname, '../packages/business-dashboard/src'),

    // 共享库
    '@regan-ad/shared': path.resolve(__dirname, '../packages/shared/src'),
  },

  // ============================================
  // API 解析配置
  // ============================================
  apiParser: {},

  resolve: {
    // 文档扫描目录 - Markdown 文档会根据目录结构解析为路由
    docDirs: ['./docs'],

    // 原子资产扫描目录 - 组件文档会被解析为路由
    // type: 'component' 会自动复数化为 'components' 作为路由前缀
    // dir 指定了扫描的目录
    atomDirs: [
      {
        type: 'component',
        dir: '../packages/base-ui/src',
      },
      {
        type: 'component',
        dir: '../packages/base-form/src',
      },
      {
        type: 'component',
        dir: '../packages/business-admin/src',
      },
      {
        type: 'component',
        dir: '../packages/business-dashboard/src',
      },
    ],

    // 配置入口文件路径，API 解析将从这里开始
    entryFile: '../src/index.ts',
  },

  // ============================================
  // 主题配置
  // ============================================
  themeConfig: {
    // 站点名称
    name: 'Regan AD 组件库',

    // 站点 Logo
    logo: 'https://example.com/logo.png',

    // 导航菜单
    nav: [
      {
        title: '首页',
        link: '/',
      },
      {
        title: '指南',
        link: '/guide',
      },
      {
        title: '组件',
        children: [
          {
            title: 'Base UI',
            link: '/components/base-ui',
          },
          {
            title: 'Base Form',
            link: '/components/base-form',
          },
          {
            title: 'Business Admin',
            link: '/components/business-admin',
          },
          {
            title: 'Business Dashboard',
            link: '/components/business-dashboard',
          },
        ],
      },
      {
        title: 'GitHub',
        link: 'https://github.com/wenjun5204/regan-ad-monorepo',
      },
    ],

    // 页脚配置
    footer: 'Copyright © 2024 Regan AD. All rights reserved.',
  },

  // ============================================
  // Webpack 配置
  // ============================================
  chainWebpack(config) {
    // 如果需要自定义 webpack 配置，在这里添加
    // 例如：添加自定义 loader、插件等

    return config;
  },

  // ============================================
  // 其他配置
  // ============================================

  // 构建配置
  hash: true,

  // 快速刷新
  fastRefresh: true,
});
