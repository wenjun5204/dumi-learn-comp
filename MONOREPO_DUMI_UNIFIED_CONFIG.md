# Monorepo 中的统一 Dumi 配置方案

## 🎯 核心问题

**在 Monorepo 中，每个子项目是否需要单独配置 Dumi？如何实现统一的 Dumi 配置和构建？**

---

## ✅ 答案

**有两种方案：**

1. **方案 A：统一文档站点**（推荐）- 一个 Dumi 配置，所有包共用
2. **方案 B：独立文档站点 + 统一配置**（可选）- 每个包有自己的 Dumi，但共用配置

---

## 🏆 推荐方案：统一文档站点

### 项目结构

```
regan-ad-monorepo/
├── docs/                          # 📚 统一文档站点
│   ├── .dumirc.ts                 # ✅ 唯一的 Dumi 配置
│   ├── docs/
│   │   ├── index.md
│   │   ├── guide.md
│   │   └── components/
│   │       ├── base-ui.md
│   │       ├── base-form.md
│   │       ├── business-admin.md
│   │       └── business-dashboard.md
│   └── package.json
│
├── packages/
│   ├── base-ui/
│   │   ├── src/
│   │   ├── docs/
│   │   │   ├── Button.md
│   │   │   ├── Input.md
│   │   │   └── Select.md
│   │   └── package.json           # ❌ 不需要 dumi dev 脚本
│   │
│   ├── base-form/
│   │   ├── src/
│   │   ├── docs/
│   │   └── package.json           # ❌ 不需要 dumi dev 脚本
│   │
│   ├── business-admin/
│   │   ├── src/
│   │   ├── docs/
│   │   └── package.json           # ❌ 不需要 dumi dev 脚本
│   │
│   ├── business-dashboard/
│   │   ├── src/
│   │   ├── docs/
│   │   └── package.json           # ❌ 不需要 dumi dev 脚本
│   │
│   └── shared/
│       ├── src/
│       └── package.json
│
├── pnpm-workspace.yaml
├── package.json                   # ✅ 根 package.json
└── tsconfig.json
```

### 配置步骤

#### 步骤 1：配置 docs/.dumirc.ts

```typescript
// docs/.dumirc.ts
import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  outputPath: '../docs-dist',

  // ============================================
  // 关键配置：monorepoRedirect
  // ============================================
  monorepoRedirect: {
    // 自动重定向到子包的 src 文件夹
    srcDir: ['src'],
    // 启用 peerDeps 重定向，避免多实例问题
    peerDeps: true,
  },

  // ============================================
  // 别名配置
  // ============================================
  alias: {
    '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui/src'),
    '@regan-ad/base-form': path.resolve(__dirname, '../packages/base-form/src'),
    '@regan-ad/business-admin': path.resolve(__dirname, '../packages/business-admin/src'),
    '@regan-ad/business-dashboard': path.resolve(__dirname, '../packages/business-dashboard/src'),
    '@regan-ad/shared': path.resolve(__dirname, '../packages/shared/src'),
  },

  apiParser: {},

  // ============================================
  // 主题配置
  // ============================================
  themeConfig: {
    name: 'Regan AD 组件库',
    nav: [
      { title: '首页', link: '/' },
      { title: '指南', link: '/guide' },
      {
        title: '组件',
        children: [
          { title: 'Base UI', link: '/components/base-ui' },
          { title: 'Base Form', link: '/components/base-form' },
          { title: 'Business Admin', link: '/components/business-admin' },
          { title: 'Business Dashboard', link: '/components/business-dashboard' },
        ],
      },
    ],
  },

  // ============================================
  // Webpack 配置
  // ============================================
  chainWebpack(config) {
    return config;
  },

  hash: true,
  fastRefresh: true,
});
```

#### 步骤 2：配置根 package.json

```json
{
  "name": "regan-ad-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r --parallel build",
    "docs:dev": "pnpm --filter @regan-ad/docs dev",
    "docs:build": "pnpm --filter @regan-ad/docs build",
    "docs:preview": "pnpm --filter @regan-ad/docs preview",
    "lint": "pnpm -r lint",
    "clean": "pnpm -r clean && rm -rf node_modules"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### 步骤 3：配置 docs/package.json

```json
{
  "name": "@regan-ad/docs",
  "version": "1.0.0",
  "description": "Regan AD 组件库文档站点",
  "private": true,
  "scripts": {
    "dev": "dumi dev",
    "build": "dumi build",
    "preview": "dumi preview"
  },
  "dependencies": {
    "@regan-ad/base-ui": "workspace:*",
    "@regan-ad/base-form": "workspace:*",
    "@regan-ad/business-admin": "workspace:*",
    "@regan-ad/business-dashboard": "workspace:*",
    "@regan-ad/shared": "workspace:*",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "dumi": "^2.4.13"
  }
}
```

#### 步骤 4：配置各个包的 package.json

```json
{
  "name": "@regan-ad/base-ui",
  "version": "1.0.0",
  "description": "基础 UI 组件库",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "rollup -c",
    "build:watch": "rollup -c -w",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@rollup/plugin-typescript": "^12.1.4",
    "rollup": "^3.29.5"
  }
}
```

---

## 🔄 工作流程

### 开发流程

```bash
# 1. 启动统一文档开发服务器
pnpm docs:dev

# 2. 编辑组件代码
# 编辑 packages/base-ui/src/Button/index.tsx

# 3. 编辑组件文档
# 编辑 packages/base-ui/docs/Button.md

# 4. 文档自动热更新
# 浏览器自动刷新，无需预构建
```

### 构建流程

```bash
# 1. 构建所有包
pnpm build

# 2. 构建文档
pnpm docs:build

# 3. 输出到 docs-dist/
```

---

## 🎯 monorepoRedirect 配置详解

### 配置 1：基础配置（推荐）

```typescript
monorepoRedirect: {
  srcDir: ['src'],
  peerDeps: true,
}
```

**作用：**
- ✅ 自动重定向到子包的 `src` 文件夹
- ✅ 支持热更新，无需预构建
- ✅ 避免多实例问题

### 配置 2：多源文件夹

```typescript
monorepoRedirect: {
  srcDir: ['libs', 'src'],  // 优先查找 libs，再查找 src
  peerDeps: true,
}
```

### 配置 3：排除某些包

```typescript
monorepoRedirect: {
  srcDir: ['src'],
  exclude: [/^@scope\/.+/],  // 不重定向 @scope/* 的包
  peerDeps: true,
}
```

### 配置 4：根项目配置

```typescript
monorepoRedirect: {
  srcDir: ['src'],
  peerDeps: true,
  useRootProject: true,  // 项目在 monorepo 根目录
}
```

---

## 📊 方案对比

### 方案 A：统一文档站点（推荐）

```
优点：
✅ 配置简单（1 个 .dumirc.ts）
✅ 维护容易
✅ 用户体验一致
✅ 构建速度快
✅ 跨包导航方便
✅ 支持热更新
✅ 无需预构建

缺点：
❌ 不能独立部署

推荐度：⭐⭐⭐⭐⭐
```

### 方案 B：独立文档站点

```
优点：
✅ 每个包独立部署
✅ 灵活性高

缺点：
❌ 配置复杂（5+ 个 .dumirc.ts）
❌ 维护困难
❌ 用户体验不一致
❌ 构建速度慢
❌ 跨包导航困难
❌ 需要预构建

推荐度：⭐⭐⭐
```

---

## 🚀 快速开始

### 步骤 1：更新 docs/.dumirc.ts

```typescript
import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  outputPath: '../docs-dist',

  // 关键配置
  monorepoRedirect: {
    srcDir: ['src'],
    peerDeps: true,
  },

  alias: {
    '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui/src'),
    '@regan-ad/base-form': path.resolve(__dirname, '../packages/base-form/src'),
    '@regan-ad/business-admin': path.resolve(__dirname, '../packages/business-admin/src'),
    '@regan-ad/business-dashboard': path.resolve(__dirname, '../packages/business-dashboard/src'),
    '@regan-ad/shared': path.resolve(__dirname, '../packages/shared/src'),
  },

  apiParser: {},

  themeConfig: {
    name: 'Regan AD 组件库',
    nav: [
      { title: '首页', link: '/' },
      { title: '指南', link: '/guide' },
      { title: '组件', link: '/components/base-ui' },
    ],
  },

  chainWebpack(config) {
    return config;
  },

  hash: true,
  fastRefresh: true,
});
```

### 步骤 2：更新根 package.json

```json
{
  "scripts": {
    "docs:dev": "pnpm --filter @regan-ad/docs dev",
    "docs:build": "pnpm --filter @regan-ad/docs build"
  }
}
```

### 步骤 3：启动开发

```bash
pnpm docs:dev
```

### 步骤 4：构建文档

```bash
pnpm docs:build
```

---

## 💡 常见问题

### Q1: 每个包还需要 dumi dev 吗？

**A:** 不需要。使用统一文档站点时，只需在 `docs/` 目录运行 `dumi dev`。

```json
// ❌ 不需要在每个包中配置
{
  "scripts": {
    "dev": "dumi dev"  // 删除这个
  }
}

// ✅ 只在 docs/ 中配置
{
  "scripts": {
    "dev": "dumi dev"
  }
}
```

### Q2: 如何支持热更新？

**A:** 使用 `monorepoRedirect` 配置：

```typescript
monorepoRedirect: {
  srcDir: ['src'],
  peerDeps: true,
}
```

这样修改子包代码时，文档会自动热更新，无需预构建。

### Q3: 如何避免多实例问题？

**A:** 启用 `peerDeps` 选项：

```typescript
monorepoRedirect: {
  srcDir: ['src'],
  peerDeps: true,  // 自动重定向 peerDependencies
}
```

### Q4: 如何构建所有文档？

**A:** 使用根 package.json 中的脚本：

```bash
# 构建所有包
pnpm build

# 构建文档
pnpm docs:build
```

### Q5: 如何在文档中引用组件？

**A:** 直接使用别名：

```markdown
\`\`\`tsx
import { Button } from '@regan-ad/base-ui';

export default () => <Button>Click me</Button>;
\`\`\`
```

---

## 📋 检查清单

- [ ] `docs/.dumirc.ts` 配置了 `monorepoRedirect`
- [ ] `docs/.dumirc.ts` 配置了 `alias`
- [ ] `docs/package.json` 有 `dev` 和 `build` 脚本
- [ ] 根 `package.json` 有 `docs:dev` 和 `docs:build` 脚本
- [ ] 各个包的 `package.json` 没有 `dumi dev` 脚本
- [ ] 运行 `pnpm docs:dev` 能正常启动
- [ ] 修改子包代码时文档能热更新

---

## 🎉 总结

### 推荐方案

**使用统一文档站点 + monorepoRedirect**

### 配置要点

1. ✅ 在 `docs/.dumirc.ts` 中配置 `monorepoRedirect`
2. ✅ 配置 `alias` 指向各个包的源代码
3. ✅ 在根 `package.json` 中配置 `docs:dev` 和 `docs:build` 脚本
4. ✅ 各个包的 `package.json` 中不需要 `dumi dev` 脚本

### 优势

- ✅ 配置简单
- ✅ 维护容易
- ✅ 支持热更新
- ✅ 无需预构建
- ✅ 避免多实例问题

---

**最后更新：** 2024年10月28日
**Dumi 版本：** 2.4.13+
**项目状态：** ✅ 统一配置方案已准备
