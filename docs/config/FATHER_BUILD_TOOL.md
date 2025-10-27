# Father 底层构建工具详解

## 🎯 直接答案

### **Father 使用 esbuild 作为底层构建工具**

Father 是一个 **"bundless/bundle" 混合构建工具**，支持两种构建模式：
- **Bundless 模式** - 使用 esbuild（默认）
- **Bundle 模式** - 使用 webpack

---

## 📊 Father 的构建工具对比

| 构建工具 | 模式 | 用途 | 性能 |
|---------|------|------|------|
| **esbuild** | Bundless | 按文件编译，保留模块结构 | ⚡⚡⚡⚡⚡ 极快 |
| **webpack** | Bundle | 打包所有文件为单个/多个包 | ⚡⚡⚡ 快 |
| **Rollup** | Bundle | 树形打包，优化输出 | ⚡⚡⚡ 快 |
| **SWC** | 转译 | 代码转译（可选） | ⚡⚡⚡⚡ 很快 |

---

## 🏗️ Father 的架构

### 整体结构

```
Father CLI
    │
    ├─ 配置解析 (.fatherrc.ts)
    │
    ├─ 构建模式选择
    │  ├─ Bundless 模式 (默认)
    │  │  └─ esbuild
    │  │     ├─ 按文件编译
    │  │     ├─ 保留模块结构
    │  │     └─ 生成 ESM + CJS
    │  │
    │  └─ Bundle 模式
    │     └─ webpack
    │        ├─ 打包所有文件
    │        ├─ 代码分割
    │        └─ 生成优化包
    │
    ├─ 代码转译
    │  ├─ TypeScript → JavaScript
    │  ├─ JSX → JavaScript
    │  └─ ES6+ → ES5 (可选)
    │
    └─ 输出
       ├─ dist/
       ├─ 类型定义 (.d.ts)
       └─ Source Map
```

---

## 🚀 Bundless 模式（默认）

### 工作原理

```
源文件 (src/)
    │
    ├─ src/Button/index.tsx
    ├─ src/Button/style.scss
    ├─ src/Foo/index.tsx
    └─ src/index.ts
    │
    ▼
esbuild 编译
    │
    ├─ 按文件编译（不打包）
    ├─ 保留模块结构
    ├─ 生成 ESM 版本
    └─ 生成 CJS 版本
    │
    ▼
输出 (dist/)
    │
    ├─ dist/Button/index.js (ESM)
    ├─ dist/Button/index.cjs (CJS)
    ├─ dist/Button/style.css
    ├─ dist/Foo/index.js (ESM)
    ├─ dist/Foo/index.cjs (CJS)
    ├─ dist/index.js (ESM)
    ├─ dist/index.cjs (CJS)
    └─ 类型定义 (.d.ts)
```

### 优势

```
✅ 编译速度极快
✅ 保留模块结构
✅ 支持 Tree Shaking
✅ 输出文件小
✅ 易于调试
✅ 支持按需加载
```

### 配置示例

```typescript
// .fatherrc.ts
import { defineConfig } from 'father';

export default defineConfig({
  // Bundless 模式（默认）
  esm: {
    output: 'dist',
    // 其他配置
  },
  cjs: {
    output: 'dist',
    // 其他配置
  },
});
```

---

## 📦 Bundle 模式

### 工作原理

```
源文件 (src/)
    │
    ├─ src/Button/index.tsx
    ├─ src/Button/style.scss
    ├─ src/Foo/index.tsx
    └─ src/index.ts
    │
    ▼
webpack 打包
    │
    ├─ 解析依赖
    ├─ 代码分割
    ├─ 优化输出
    └─ 生成单个/多个包
    │
    ▼
输出 (dist/)
    │
    ├─ dist/index.js (完整包)
    ├─ dist/index.min.js (压缩版)
    ├─ dist/index.css (合并样式)
    └─ 类型定义 (.d.ts)
```

### 优势

```
✅ 输出文件少
✅ 依赖完全打包
✅ 可以直接在浏览器使用
✅ 支持代码分割
✅ 支持压缩优化
```

### 配置示例

```typescript
// .fatherrc.ts
import { defineConfig } from 'father';

export default defineConfig({
  // Bundle 模式
  umd: {
    output: 'dist',
    // 其他配置
  },
});
```

---

## 🔧 esbuild 详解

### esbuild 是什么？

esbuild 是一个用 Go 语言编写的 JavaScript 打包工具，以极快的速度著称。

### esbuild 的特点

| 特点 | 说明 |
|------|------|
| **速度** | 比 webpack 快 10-100 倍 |
| **语言** | 用 Go 编写，性能优异 |
| **功能** | 支持 TS、JSX、CSS 等 |
| **输出** | ESM、CJS、IIFE 等格式 |
| **Tree Shaking** | 原生支持 |
| **Source Map** | 完整支持 |

### esbuild 的工作流程

```
输入文件
    │
    ├─ 词法分析 (Lexing)
    ├─ 语法分析 (Parsing)
    ├─ 绑定 (Binding)
    ├─ 链接 (Linking)
    ├─ 代码生成 (Code Generation)
    └─ 输出
```

### Father 中的 esbuild 配置

```typescript
// .fatherrc.ts
export default defineConfig({
  esm: {
    output: 'dist',
    // esbuild 配置
    target: 'es2015',           // 目标环境
    format: 'esm',              // 输出格式
    splitting: true,            // 代码分割
    ignoreAnnotations: false,   // 保留注释
  },
});
```

---

## 🔄 Father 的完整构建流程

### 步骤 1：配置解析

```typescript
// .fatherrc.ts
import { defineConfig } from 'father';

export default defineConfig({
  esm: { output: 'dist' },
  cjs: { output: 'dist' },
});
```

### 步骤 2：入口扫描

```
扫描 src/ 目录
    │
    ├─ 找到所有 .ts/.tsx/.js/.jsx 文件
    ├─ 识别入口文件 (index.ts)
    └─ 识别子模块 (Button/index.ts, Foo/index.ts)
```

### 步骤 3：esbuild 编译

```
对每个文件执行：
    │
    ├─ TypeScript 编译
    ├─ JSX 转换
    ├─ 代码优化
    └─ 生成 JS 文件
```

### 步骤 4：类型定义生成

```
使用 TypeScript 编译器：
    │
    ├─ 生成 .d.ts 文件
    ├─ 保留类型信息
    └─ 输出到 dist/
```

### 步骤 5：输出

```
生成最终文件：
    │
    ├─ dist/index.js (ESM)
    ├─ dist/index.cjs (CJS)
    ├─ dist/index.d.ts (类型定义)
    ├─ dist/Button/index.js
    ├─ dist/Button/index.cjs
    ├─ dist/Button/index.d.ts
    └─ ...
```

---

## 📊 Father vs Rollup vs Webpack

### 功能对比

| 功能 | Father | Rollup | Webpack |
|------|--------|--------|---------|
| **构建速度** | ⚡⚡⚡⚡⚡ | ⚡⚡⚡ | ⚡⚡ |
| **Bundless** | ✅ | ❌ | ❌ |
| **Bundle** | ✅ | ✅ | ✅ |
| **Tree Shaking** | ✅ | ✅ | ✅ |
| **代码分割** | ✅ | ✅ | ✅ |
| **样式处理** | ✅ | ⚠️ | ✅ |
| **TypeScript** | ✅ | ✅ | ✅ |
| **配置复杂度** | 低 | 中 | 高 |
| **学习曲线** | 平缓 | 中等 | 陡峭 |

### 性能对比

```
构建速度 (相对值)
│
│  Father (esbuild)  ████████████████████ (100x)
│  Rollup            ████                 (10x)
│  Webpack           ██                   (1x)
│
└─────────────────────────────────────
```

### 使用场景

| 工具 | 最适合 |
|------|--------|
| **Father** | React 组件库、npm 包 |
| **Rollup** | JavaScript 库、通用包 |
| **Webpack** | Web 应用、复杂项目 |

---

## 🎯 Father 的最佳实践

### 1. **使用 Bundless 模式（推荐）**

```typescript
// .fatherrc.ts
import { defineConfig } from 'father';

export default defineConfig({
  // Bundless 模式 - 最快
  esm: {
    output: 'dist',
    target: 'es2015',
  },
  cjs: {
    output: 'dist',
    target: 'es2015',
  },
});
```

**优势：**
- ✅ 编译速度最快
- ✅ 输出文件小
- ✅ 支持 Tree Shaking
- ✅ 易于调试

### 2. **配置多个输出格式**

```typescript
export default defineConfig({
  // ESM 格式
  esm: {
    output: 'dist',
  },
  // CommonJS 格式
  cjs: {
    output: 'dist',
  },
  // UMD 格式（可选）
  umd: {
    output: 'dist',
    name: 'ReganAdComp',
  },
});
```

### 3. **处理样式文件**

```typescript
export default defineConfig({
  esm: {
    output: 'dist',
    // 样式处理
    cssModules: true,
    less: true,
    sass: true,
  },
});
```

### 4. **生成类型定义**

```typescript
export default defineConfig({
  esm: {
    output: 'dist',
    // 自动生成 .d.ts
    declaration: true,
    declarationDir: 'dist',
  },
});
```

---

## 🔍 Father 的配置选项

### 核心配置

```typescript
export default defineConfig({
  // 输出目录
  esm: {
    output: 'dist',

    // 目标环境
    target: 'es2015',

    // 输出格式
    format: 'esm',

    // 代码分割
    splitting: true,

    // 类型定义
    declaration: true,
    declarationDir: 'dist',

    // Source Map
    sourcemap: true,

    // 忽略注释
    ignoreAnnotations: false,
  },

  // CommonJS 配置
  cjs: {
    output: 'dist',
    target: 'es2015',
  },

  // UMD 配置
  umd: {
    output: 'dist',
    name: 'ReganAdComp',
  },
});
```

---

## 📈 构建性能对比

### 编译时间（相对值）

```
项目规模：100 个组件

Father (esbuild):    ~2s    ⚡⚡⚡⚡⚡
Rollup:              ~10s   ⚡⚡⚡
Webpack:             ~20s   ⚡⚡
```

### 输出文件大小

```
相同的组件库

Father (Bundless):   ~500KB  ✅ 最小
Rollup (Bundle):     ~800KB  ⚠️ 中等
Webpack (Bundle):    ~1MB    ❌ 较大
```

---

## 🚀 Father 的优势

### 为什么选择 Father？

```
✅ 极快的构建速度
   └─ 基于 esbuild，比 webpack 快 10-100 倍

✅ Bundless 模式
   └─ 保留模块结构，支持 Tree Shaking

✅ 开箱即用
   └─ 无需复杂配置

✅ 完整的功能
   └─ 支持 TS、JSX、CSS、SCSS 等

✅ 专为组件库设计
   └─ 与 Dumi 无缝集成

✅ 生态完善
   └─ Umi 官方维护
```

---

## 🔗 Father 与 Dumi 的关系

### 工作流程

```
开发阶段
    │
    ├─ npm run dev
    │  └─ Dumi 启动文档开发服务器
    │     └─ webpack-dev-server + HMR
    │
    └─ 实时预览和调试

构建阶段
    │
    ├─ npm run build
    │  └─ Father 构建组件库
    │     └─ esbuild 编译
    │
    └─ 生成 dist/ 文件

文档构建
    │
    ├─ npm run docs:build
    │  └─ Dumi 构建文档网站
    │     └─ webpack 打包
    │
    └─ 生成 docs-dist/ 文件
```

### 职责分离

```
Father 的职责
├─ 编译组件源代码
├─ 生成 npm 包
├─ 输出 dist/ 文件
└─ 不涉及文档

Dumi 的职责
├─ 生成文档网站
├─ 提供热更新
├─ 自动生成 Demo
└─ 不涉及组件打包
```

---

## 💡 总结

### Father 的底层构建工具

| 模式 | 工具 | 特点 |
|------|------|------|
| **Bundless（默认）** | esbuild | 极快、保留模块结构 |
| **Bundle** | webpack | 完整打包、优化输出 |

### 为什么使用 Father？

```
✅ 最快的构建速度
✅ 最小的输出文件
✅ 最简单的配置
✅ 最好的开发体验
```

### 与其他工具的对比

```
Father  > Rollup > Webpack
(速度)

Father  > Rollup > Webpack
(易用性)

Webpack > Rollup > Father
(功能复杂度)
```

---

## 📚 参考资源

- [Father 官方文档](https://github.com/umijs/father)
- [esbuild 官方文档](https://esbuild.github.io/)
- [Umi 官方文档](https://umijs.org)

---

**最后更新：** 2024年10月25日
**Father 版本：** 4.6.7
