# Dumi 底层实现原理深度分析

## 📋 目录
1. [整体架构](#整体架构)
2. [自动生成 Demo 机制](#自动生成-demo-机制)
3. [热更新 (HMR) 实现](#热更新-hmr-实现)
4. [文档构建流程](#文档构建流程)
5. [核心技术栈](#核心技术栈)

---

## 整体架构

### 🏗️ Dumi 的分层架构

```
┌─────────────────────────────────────────────────────────┐
│                    Dumi CLI 入口                         │
│              (dumi dev / dumi build)                     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Umi 4.x 框架层                          │
│  (路由、插件系统、配置管理、生命周期)                    │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼──────────┐    ┌────────▼──────────┐
│  开发模式        │    │   生产构建        │
│ webpack-dev-srv │    │   webpack 5       │
│  + HMR          │    │   + 优化          │
└───────┬──────────┘    └────────┬──────────┘
        │                        │
┌───────▼────────────────────────▼──────────┐
│         Markdown 解析 & 代码提取           │
│  (remark + rehype 插件链)                 │
└───────┬────────────────────────────────────┘
        │
┌───────▼────────────────────────────────────┐
│      代码块转换为可执行的 React 组件       │
│  (AST 转换、动态导入、沙箱执行)           │
└───────┬────────────────────────────────────┘
        │
┌───────▼────────────────────────────────────┐
│         Babel 转译 & 优化                  │
│  (JSX → JS、ES6+ → ES5、Tree Shaking)     │
└───────┬────────────────────────────────────┘
        │
┌───────▼────────────────────────────────────┐
│      浏览器渲染 / 静态文件生成             │
└────────────────────────────────────────────┘
```

---

## 自动生成 Demo 机制

### 🔍 Demo 自动发现流程

#### 1. **文件扫描阶段**

```
项目根目录
  ├── src/
  │   ├── Button/
  │   │   ├── index.tsx          ← 组件源代码
  │   │   ├── index.md           ← 文档文件（包含 demo）
  │   │   └── index.css          ← 样式文件
  │   └── Foo/
  │       ├── index.tsx
  │       └── index.md
  └── docs/
      └── guide.md               ← 全局文档
```

**扫描规则：**
- 递归扫描 `src/` 目录下的所有 `.md` 文件
- 扫描 `docs/` 目录下的所有 `.md` 文件
- 根据 `.dumirc.ts` 配置的 `resolve.entryFile` 解析组件导出

#### 2. **Markdown 解析阶段**

```typescript
// 使用 remark 插件链解析 Markdown
const remarkPlugins = [
  'remark-frontmatter',      // 解析 YAML frontmatter
  'remark-gfm',              // GitHub Flavored Markdown
  'remark-directive',        // 自定义指令 (如 <API />)
];

// 使用 rehype 插件链处理 HTML AST
const rehypePlugins = [
  'rehype-autolink-headings', // 自动为标题添加链接
  'rehype-remove-comments',   // 移除注释
];
```

**解析流程：**
```
Markdown 文本
  ↓
remark 解析 → MDAST (Markdown AST)
  ↓
remark 插件处理 (提取代码块、指令等)
  ↓
remark-rehype 转换 → HAST (HTML AST)
  ↓
rehype 插件处理 (优化、增强)
  ↓
rehype-stringify 生成 HTML
```

#### 3. **代码块提取与转换**

```javascript
// 原始 Markdown 中的代码块
```jsx

export default () => <Button>Click me</Button>
```

// Dumi 的处理过程：
// 1. 识别代码块语言为 jsx
// 2. 提取代码内容
// 3. 生成唯一 ID (如 button-demo-0)
// 4. 创建虚拟模块路径
// 5. 注册到路由系统
```

**转换后的结构：**
```typescript
{
  id: 'button-demo-0',
  title: '基础用法',
  description: '一个简单的按钮示例',
  code: 'import Button from "./index.tsx";\n\nexport default () => <Button>Click me</Button>',
  language: 'jsx',
  highlightedCode: '...',  // 高亮后的代码
  component: () => import('~demos/button-demo-0'),  // 动态导入
}
```

#### 4. **虚拟模块生成**

Dumi 使用 webpack 的虚拟模块系统生成可执行的 demo：

```javascript
// .dumi/tmp/~demos/button-demo-0/index.tsx (虚拟文件)
import React from 'react';
import Button from '../../src/Button/index.tsx';

export default () => <Button>Click me</Button>
```

**关键点：**
- 虚拟模块存储在 `.dumi/tmp/` 目录
- 每个 demo 都是一个独立的 React 组件
- 支持热更新（HMR）
- 可以独立预览和调试

---

## 热更新 (HMR) 实现

### 🔥 HMR 工作流程

#### 1. **文件监听**

```
文件系统
  ↓
chokidar (文件监听库)
  ↓
检测到文件变更 (.md / .tsx / .css)
  ↓
触发 webpack 重新编译
```

#### 2. **增量编译**

```javascript
// webpack-dev-server 的增量编译策略
{
  // 只重新编译变更的模块
  cache: {
    type: 'filesystem',
    cacheDirectory: '.dumi/tmp/.webpack_cache',
  },

  // 持久化缓存
  output: {
    hashFunction: 'xxhash64',
  },
}
```

#### 3. **HMR 通信协议**

```
浏览器                          webpack-dev-server
  │                                    │
  │◄──────── WebSocket 连接 ──────────┤
  │                                    │
  │◄──── HMR 更新消息 (JSON) ─────────┤
  │  {                                 │
  │    type: 'ok',                     │
  │    modules: ['./src/Button/...'],  │
  │    hash: 'abc123...',              │
  │  }                                 │
  │                                    │
  │─── 请求更新的模块代码 ──────────►│
  │                                    │
  │◄──── 返回新的模块代码 ───────────┤
  │                                    │
  └─ 执行 module.hot.accept() 回调    │
     更新 DOM
```

#### 4. **React Fast Refresh**

Dumi 集成了 React Fast Refresh，提供更好的热更新体验：

```javascript
// 自动注入 React Fast Refresh 运行时
import RefreshRuntime from '@pmmmwh/react-refresh-webpack-plugin/lib/runtime';

// 在模块更新时保留组件状态
if (module.hot) {
  module.hot.accept('./Button.tsx', () => {
    // 组件状态被保留
    // 只更新组件代码
  });
}
```

**优势：**
- ✅ 保留组件状态（如表单输入）
- ✅ 保留 React 组件树
- ✅ 错误恢复能力强
- ✅ 支持 Hook 状态保留

#### 5. **HMR 更新流程示例**

```
修改 src/Button/index.tsx
  ↓
chokidar 检测到文件变更
  ↓
webpack 重新编译 Button 模块
  ↓
webpack-dev-server 生成更新清单
  ↓
通过 WebSocket 发送 HMR 消息
  ↓
浏览器接收消息，请求新的模块代码
  ↓
React Fast Refresh 拦截更新
  ↓
保留组件状态，更新组件代码
  ↓
浏览器 UI 实时更新（< 100ms）
```

---

## 文档构建流程

### 🏗️ `dumi build` 的完整流程

#### 1. **初始化阶段**

```javascript
// .dumirc.ts 配置加载
const config = {
  outputPath: 'docs-dist',      // 输出目录
  apiParser: {},                // API 解析配置
  resolve: {
    entryFile: './src/index.ts', // 入口文件
  },
  themeConfig: {
    name: 'regan-ad-comp',
  },
};
```

#### 2. **元数据收集**

```
扫描源文件
  ├── 提取组件导出信息
  ├── 解析 TypeScript 类型定义
  ├── 生成 API 文档
  └── 收集 demo 信息
```

**使用工具：**
- `react-docgen` - 提取 React 组件 Props
- `ts-morph` - 解析 TypeScript AST
- `doctrine` - 解析 JSDoc 注释

#### 3. **Markdown 处理**

```
遍历所有 .md 文件
  ↓
使用 remark 解析
  ↓
提取代码块 (jsx/tsx)
  ↓
生成虚拟 demo 模块
  ↓
转换为 HTML
```

#### 4. **路由生成**

```javascript
// 自动生成路由配置
const routes = [
  {
    path: '/components/button',
    component: () => import('~pages/Button__index.md'),
    title: 'Button',
  },
  {
    path: '/components/foo',
    component: () => import('~pages/Foo__index.md'),
    title: 'Foo',
  },
  {
    path: '/guide',
    component: () => import('~pages/docs__guide.md'),
    title: 'Guide',
  },
];
```

#### 5. **webpack 构建**

```javascript
// webpack 配置
{
  mode: 'production',
  entry: '.dumi/tmp/umi.ts',  // Umi 生成的入口
  output: {
    path: 'docs-dist',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].async.js',
  },
  optimization: {
    minimize: true,           // 代码压缩
    splitChunks: {
      chunks: 'all',          // 代码分割
      cacheGroups: {
        vendors: { ... },     // 第三方库
        common: { ... },      // 公共代码
      },
    },
  },
}
```

#### 6. **优化与输出**

```
webpack 构建完成
  ↓
Terser 压缩 JavaScript
  ↓
cssnano 压缩 CSS
  ↓
生成 HTML 文件
  ├── index.html
  ├── components/button/index.html
  ├── components/foo/index.html
  └── guide/index.html
  ↓
生成 sitemap.xml
  ↓
输出到 docs-dist/
```

---

## 核心技术栈

### 📦 Dumi 依赖的关键库

| 库 | 版本 | 用途 |
|---|------|------|
| **umi** | ^4.3.0 | 框架核心 |
| **webpack** | 5.x | 模块打包 |
| **webpack-dev-server** | 4.x | 开发服务器 |
| **babel** | 7.x | 代码转译 |
| **remark** | ^10.0.2 | Markdown 解析 |
| **rehype** | ^10.1.0 | HTML 处理 |
| **react-docgen** | - | Props 提取 |
| **prismjs** | ^1.29.0 | 代码高亮 |
| **rc-tabs** | ^12.10.0 | 标签页组件 |
| **rc-tree** | ^5.7.9 | 树形组件 |

### 🔌 Dumi 的插件系统

```typescript
// 插件接口
interface IPlugin {
  // 生命周期钩子
  onStart?: () => void;
  onBuild?: () => void;
  onExit?: () => void;

  // 修改配置
  modifyConfig?: (config) => config;

  // 修改路由
  modifyRoutes?: (routes) => routes;

  // 修改 Markdown
  modifyMarkdown?: (markdown) => markdown;
}
```

---

## 🎯 总结

### Dumi 的核心优势

| 功能 | 实现方式 | 优势 |
|------|---------|------|
| **自动 Demo** | AST 解析 + 虚拟模块 | 无需手动配置，自动发现 |
| **热更新** | webpack HMR + React Fast Refresh | 极快的开发体验 |
| **文档构建** | remark + webpack | 完整的静态站点生成 |
| **API 文档** | react-docgen + TypeScript | 自动生成 Props 文档 |
| **代码高亮** | prismjs | 美观的代码展示 |
| **响应式设计** | 内置主题系统 | 开箱即用的文档站点 |

### 工作流总结

```
开发阶段 (dumi dev)
  ├── 监听文件变更
  ├── 增量编译
  ├── HMR 推送更新
  └── 浏览器实时刷新

构建阶段 (dumi build)
  ├── 扫描源文件
  ├── 解析 Markdown
  ├── 生成虚拟模块
  ├── webpack 打包
  ├── 代码优化
  └── 输出静态文件
```

---

## 📚 参考资源

- [Dumi 官方文档](https://d.umijs.org)
- [Umi 框架文档](https://umijs.org)
- [Remark 插件系统](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
- [Webpack HMR 文档](https://webpack.js.org/concepts/hot-module-replacement/)
- [React Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin)
