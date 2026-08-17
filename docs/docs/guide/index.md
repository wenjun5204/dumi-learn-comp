# 构建工具方案设计

> 参考文档：[商增前端构建工具方案调研](https://km.sankuai.com/collabpage/2780796931)

## 1. 方案概述

### 1.1 项目背景

本 Monorepo 包含组件库、工具库等多种类型的包，需要一套统一的构建流程来降低维护成本，确保各包构建产物格式一致、依赖编排正确、构建高效可缓存。

### 1.2 技术选型

| 维度 | 方案 | 说明 |
| --- | --- | --- |
| **库构建**（组件库、工具库） | Rollup | Tree Shaking 内置、包体积小、多格式输出（ESM/CJS/UMD） |
| **文档构建** | Dumi (Webpack) | 组件文档站点，基于 Webpack 构建 |
| **依赖编排** | Turborepo | 自动分析包依赖关系，按拓扑顺序并行构建，支持构建缓存 |
| **包管理** | pnpm workspace | Monorepo 包管理，支持 `workspace:*` 协议 |

### 1.3 包依赖关系

```
@regan-ad/shared (无依赖)
├── @regan-ad/base-ui (依赖 shared)
│   ├── @regan-ad/base-form (依赖 base-ui, shared)
│   │   └── @regan-ad/business-admin (依赖 base-ui, base-form, shared)
│   └── @regan-ad/business-dashboard (依赖 base-ui, shared)
└── @regan-ad/docs (依赖所有包)
```

Turbo 会自动分析上述依赖关系，确保构建顺序正确：
- `shared` 先构建完成
- `base-ui` 在 `shared` 之后构建
- `base-form` 和 `business-dashboard` 无相互依赖，**并行构建**
- `business-admin` 在 `base-form` 之后构建
- `docs` 最后构建

## 2. 构建配置

### 2.1 共享 Rollup 配置工厂

位于 `scripts/rollup.config.factory.js`，所有库包统一引用，避免重复配置。

**核心能力：**
- 多格式输出：ESM (`index.esm.js`) + CJS (`index.cjs.js`) + UMD (`index.umd.js`)
- TypeScript 编译 + `.d.ts` 类型声明生成
- CSS/Less/SCSS 处理（`rollup-plugin-postcss`）
- peerDependencies 自动外部化（`rollup-plugin-peer-deps-external`）
- UMD globals 自动映射
- 可选压缩（`@rollup/plugin-terser`）

**用法示例：**

```js
// packages/base-ui/rollup.config.js
const { createRollupConfig } = require('../../scripts/rollup.config.factory');

module.exports = createRollupConfig({
  input: 'src/index.ts',
  packageName: '@regan-ad/base-ui',
  external: ['react', 'react-dom', '@regan-ad/shared'],
});
```

**配置参数：**

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `input` | string | `'src/index.ts'` | 入口文件路径 |
| `external` | string[] | `[]` | 额外外部化依赖（peerDeps 自动外部化） |
| `packageName` | string | `'pkg'` | 包名，用于生成 UMD 全局变量名 |
| `minify` | boolean | `false` | 是否压缩输出 |
| `tsconfig` | string | `'./tsconfig.json'` | tsconfig 路径 |
| `extractCSS` | boolean | `true` | 是否提取 CSS 到单独文件 |

### 2.2 各包构建产物

每个库包构建后产出以下文件：

```
dist/
├── index.esm.js       # ESM 格式（import/export）
├── index.esm.js.map   # ESM sourcemap
├── index.cjs.js       # CJS 格式（require/module.exports）
├── index.cjs.js.map   # CJS sourcemap
├── index.umd.js       # UMD 格式（CDN 直接引用）
├── index.umd.js.map   # UMD sourcemap
├── index.d.ts         # TypeScript 类型声明
└── *.css              # 提取的 CSS（如有）
```

### 2.3 package.json 字段规范

每个库包的 `package.json` 遵循以下字段规范：

```json
{
  "main": "dist/index.cjs.js",      // CJS 入口
  "module": "dist/index.esm.js",    // ESM 入口（支持 Tree Shaking）
  "types": "dist/index.d.ts",       // TypeScript 类型声明
  "sideEffects": false,             // 工具库：无副作用，全量 Tree Shaking
  "sideEffects": ["*.css"],         // 组件库：CSS 文件标记副作用
  "files": ["dist"]                 // npm 发布只包含 dist
}
```

## 3. Turbo 依赖编排

### 3.1 turbo.json 配置

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "docs-dist/**", "../docs-dist/**"]
    },
    "build:watch": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}
```

**关键配置说明：**

| 字段 | 说明 |
| --- | --- |
| `dependsOn: ["^build"]` | `^` 表示先构建依赖包，即当前包的 `build` 依赖其 dependencies 的 `build` 完成 |
| `outputs` | 声明构建产物路径，用于 Turbo 缓存命中判断 |
| `cache: false` | `dev`、`build:watch`、`clean` 不缓存 |
| `persistent: true` | `dev`、`build:watch` 是长驻进程 |

### 3.2 构建脚本

根 `package.json` 提供以下脚本：

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "build:libs": "turbo build --filter=\"./packages/**\"",
    "build:shared": "turbo build --filter=@regan-ad/shared",
    "build:ui": "turbo build --filter=@regan-ad/base-ui",
    "build:form": "turbo build --filter=@regan-ad/base-form",
    "build:admin": "turbo build --filter=@regan-ad/business-admin",
    "build:dashboard": "turbo build --filter=@regan-ad/business-dashboard",
    "docs:dev": "turbo dev --filter=@regan-ad/docs",
    "docs:build": "turbo build --filter=@regan-ad/docs",
    "lint": "turbo lint",
    "clean": "turbo clean && rm -rf .turbo",
    "clean:all": "turbo clean && rm -rf .turbo node_modules"
  }
}
```

### 3.3 Turbo 核心能力

#### 依赖拓扑排序

Turbo 自动分析 `package.json` 中的 `dependencies` 字段，构建依赖图，确保：
- 被依赖的包先构建
- 无相互依赖的包**并行构建**（如 `base-form` 和 `business-dashboard`）

#### 构建缓存

Turbo 会缓存构建产物（基于输入文件的 hash），第二次执行 `turbo build` 时：
- 未修改的包直接命中缓存，跳过构建
- 修改了源码的包才会重新构建
- 缓存存储在 `.turbo` 目录，可配置远程缓存共享给 CI

#### 过滤构建

通过 `--filter` 精确控制构建范围：

```bash
# 构建单个包（含其依赖）
turbo build --filter=@regan-ad/base-ui

# 构建所有库包（不含 docs）
turbo build --filter="./packages/**"

# 构建某个包及其下游依赖
turbo build --filter=@regan-ad/shared...

# 构建发生变更的包
turbo build --filter=...[HEAD^1]
```

## 4. 构建流程

### 4.1 全量构建

```bash
pnpm build
```

执行流程：
1. Turbo 分析依赖图，生成构建任务 DAG
2. 按拓扑顺序执行：`shared` → `base-ui` → (`base-form` ‖ `business-dashboard`) → `business-admin` → `docs`
3. 无依赖的包并行执行，有依赖的包等待上游完成
4. 构建产物缓存到 `.turbo/cache`

### 4.2 增量构建

修改某个包的源码后，再次执行 `pnpm build`：
- 只有被修改的包及其下游依赖会重新构建
- 其他包命中缓存，直接跳过

### 4.3 单包构建

```bash
# 只构建 shared（Turbo 会自动先构建其依赖，shared 无依赖所以直接构建）
pnpm build:shared

# 构建 base-ui（Turbo 会自动先构建 shared，再构建 base-ui）
pnpm build:ui

# 构建 base-form（Turbo 会自动先构建 shared → base-ui → base-form）
pnpm build:form
```

### 4.4 构建产物验证

每个库包构建后应包含以下文件：

| 文件 | 格式 | 用途 |
| --- | --- | --- |
| `index.esm.js` | ESM | 现代打包工具（Webpack/Vite/Rollup）引用 |
| `index.cjs.js` | CJS | Node.js 环境引用 |
| `index.umd.js` | UMD | 浏览器 CDN 直接引用 |
| `index.d.ts` | TypeScript | 类型声明 |
| `*.js.map` | Sourcemap | 调试映射 |

## 5. 目录结构

```
dumi-learn-comp/
├── turbo.json                    # Turbo 任务编排配置
├── package.json                  # 根 package.json（turbo + 脚本）
├── scripts/
│   └── rollup.config.factory.js  # 共享 Rollup 配置工厂
├── packages/
│   ├── shared/                   # 共享工具库（无依赖）
│   │   ├── src/index.ts
│   │   ├── rollup.config.js      # 引用共享配置工厂
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── base-ui/                  # 基础 UI 组件库（依赖 shared）
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── Button/index.tsx
│   │   │   ├── Input/index.tsx
│   │   │   └── Select/index.tsx
│   │   ├── rollup.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── base-form/                # 基础表单组件库（依赖 base-ui, shared）
│   │   ├── src/index.tsx
│   │   ├── rollup.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── business-admin/           # 管理后台业务组件库（依赖 base-ui, base-form, shared）
│   │   ├── src/index.tsx
│   │   ├── rollup.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── business-dashboard/       # 数据大屏业务组件库（依赖 base-ui, shared）
│   │   ├── src/index.tsx
│   │   ├── rollup.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── ...
├── docs/                         # 文档站点（依赖所有包）
│   ├── .dumirc.ts
│   └── package.json
└── webpack-plugins/              # Webpack 插件（原生 webpack plugin）
    ├── asset-size-plugin.js
    └── demo-plugin.js
```
