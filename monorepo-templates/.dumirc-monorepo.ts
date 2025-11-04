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

  // 文档目录
  docs: ['./docs'],

  // ============================================
  // 别名配置 - 指向各个包的源代码
  // ============================================
  alias: {
    // 基础组件库
    '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui/src'),
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
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
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

    // 侧边栏配置
    sidebar: {
      '/components/base-ui': [
        {
          title: 'Base UI 组件库',
          children: [
            {
              title: '介绍',
              link: '/components/base-ui',
            },
            {
              title: 'Button',
              link: '/components/base-ui/button',
            },
            {
              title: 'Input',
              link: '/components/base-ui/input',
            },
          ],
        },
      ],
      '/components/base-form': [
        {
          title: 'Base Form 组件库',
          children: [
            {
              title: '介绍',
              link: '/components/base-form',
            },
            {
              title: 'Form',
              link: '/components/base-form/form',
            },
            {
              title: 'FormItem',
              link: '/components/base-form/form-item',
            },
          ],
        },
      ],
      '/components/business-admin': [
        {
          title: 'Business Admin 组件库',
          children: [
            {
              title: '介绍',
              link: '/components/business-admin',
            },
            {
              title: 'AdminLayout',
              link: '/components/business-admin/admin-layout',
            },
            {
              title: 'AdminTable',
              link: '/components/business-admin/admin-table',
            },
          ],
        },
      ],
      '/components/business-dashboard': [
        {
          title: 'Business Dashboard 组件库',
          children: [
            {
              title: '介绍',
              link: '/components/business-dashboard',
            },
            {
              title: 'Dashboard',
              link: '/components/business-dashboard/dashboard',
            },
            {
              title: 'Chart',
              link: '/components/business-dashboard/chart',
            },
          ],
        },
      ],
    },

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

  // 开发服务器配置
  devServer: {
    port: 8000,
  },

  // 构建配置
  hash: true,

  // 代码分割
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },

  // 快速刷新
  fastRefresh: true,

  // 其他 Dumi 配置...
});
