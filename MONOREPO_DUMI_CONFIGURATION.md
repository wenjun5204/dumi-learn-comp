# Monorepo 中的 Dumi 配置方案

## 🎯 核心问题

**在 Monorepo 中，是否需要为每个组件包都创建单独的 Dumi 配置？**

**答案：取决于你的需求。有两种主流方案：**

1. **方案 A：统一文档站点**（推荐）- 一个 Dumi 配置，展示所有包
2. **方案 B：独立文档站点**（可选）- 每个包有自己的 Dumi 配置

---

## 📊 两种方案对比

### 方案 A：统一文档站点（推荐）

```
regan-ad-monorepo/
├── docs/                          # 统一文档站点
│   ├── .dumirc.ts                 # 唯一的 Dumi 配置
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
│   │   └── docs/                  # 只有 markdown 文件
│   │       ├── Button.md
│   │       ├── Input.md
│   │       └── ...
│   ├── base-form/
│   │   ├── src/
│   │   └── docs/                  # 只有 markdown 文件
│   │       ├── Form.md
│   │       └── ...
│   └── ...
```

**优点：**
- ✅ 配置简单，只需维护一个 .dumirc.ts
- ✅ 统一的导航和主题
- ✅ 跨包搜索和导航方便
- ✅ 构建速度快
- ✅ 用户体验一致

**缺点：**
- ❌ 所有包的文档在一个站点
- ❌ 不能独立部署单个包的文档

### 方案 B：独立文档站点

```
regan-ad-monorepo/
├── packages/
│   ├── base-ui/
│   │   ├── .dumirc.ts             # 独立配置
│   │   ├── src/
│   │   └── docs/
│   │       ├── index.md
│   │       ├── Button.md
│   │       └── ...
│   ├── base-form/
│   │   ├── .dumirc.ts             # 独立配置
│   │   ├── src/
│   │   └── docs/
│   │       ├── index.md
│   │       ├── Form.md
│   │       └── ...
│   └── ...
│
└── docs/                          # 可选：聚合文档
    ├── .dumirc.ts
    └── docs/
        └── index.md
```

**优点：**
- ✅ 每个包独立部署
- ✅ 每个包有自己的主题和配置
- ✅ 灵活性高

**缺点：**
- ❌ 配置复杂，需要维护多个 .dumirc.ts
- ❌ 构建时间长
- ❌ 用户体验不一致
- ❌ 难以跨包导航

---

## 🏆 推荐方案：统一文档站点

基于你的项目结构，**强烈推荐使用方案 A（统一文档站点）**。

### 原因

1. **项目规模** - 5 个包，适合统一管理
2. **用户体验** - 用户可以在一个站点浏览所有组件
3. **维护成本** - 只需维护一个配置文件
4. **构建效率** - 一次构建，所有文档都生成

---

## 🔧 方案 A 的实现

### 步骤 1：创建统一的 docs 目录

```bash
# 已经存在，但需要调整结构
docs/
├── .dumirc.ts                     # 统一配置
├── docs/
│   ├── index.md                   # 首页
│   ├── guide.md                   # 使用指南
│   └── components/
│       ├── base-ui.md             # base-ui 文档入口
│       ├── base-form.md           # base-form 文档入口
│       ├── business-admin.md      # business-admin 文档入口
│       └── business-dashboard.md  # business-dashboard 文档入口
└── package.json
```

### 步骤 2：配置 .dumirc.ts

```typescript
// docs/.dumirc.ts
import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  outputPath: '../docs-dist',

  // 配置别名，指向各个包的源代码
  alias: {
    '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui/src'),
    '@regan-ad/base-form': path.resolve(__dirname, '../packages/base-form/src'),
    '@regan-ad/business-admin': path.resolve(__dirname, '../packages/business-admin/src'),
    '@regan-ad/business-dashboard': path.resolve(__dirname, '../packages/business-dashboard/src'),
    '@regan-ad/shared': path.resolve(__dirname, '../packages/shared/src'),
  },

  // 配置 API 解析
  apiParser: {},

  // 配置主题
  themeConfig: {
    name: 'Regan AD 组件库',
    logo: 'https://example.com/logo.png',
    nav: [
      { title: '首页', link: '/' },
      { title: '指南', link: '/guide' },
      { title: '组件', link: '/components/base-ui' },
    ],
  },

  // 其他配置...
});
```

### 步骤 3：组织文档结构

#### docs/docs/index.md（首页）

```markdown
---
title: Regan AD 组件库
---

# Regan AD 组件库

欢迎使用 Regan AD 组件库！

## 包含的组件库

- [Base UI](./components/base-ui) - 基础 UI 组件
- [Base Form](./components/base-form) - 基础表单组件
- [Business Admin](./components/business-admin) - 管理后台组件
- [Business Dashboard](./components/business-dashboard) - 数据大屏组件
```

#### docs/docs/components/base-ui.md

```markdown
---
title: Base UI
---

# Base UI 组件库

基础 UI 组件库，包含 Button、Input、Select 等基础组件。

## 安装

\`\`\`bash
npm install @regan-ad/base-ui
\`\`\`

## 使用

\`\`\`tsx
import { Button } from '@regan-ad/base-ui';

export default () => <Button>Click me</Button>;
\`\`\`

## 组件列表

- Button - 按钮组件
- Input - 输入框组件
- Select - 选择框组件
- ...
```

#### packages/base-ui/docs/Button.md

```markdown
---
title: Button
---

# Button 组件

按钮组件，用于触发操作。

## 基础用法

\`\`\`tsx
import { Button } from '@regan-ad/base-ui';

export default () => <Button>Click me</Button>;
\`\`\`

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| children | ReactNode | 按钮文本 |
| onClick | () => void | 点击回调 |
```

### 步骤 4：配置 package.json

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

### 步骤 5：启动开发

```bash
# 从根目录
pnpm docs:dev

# 或从 docs 目录
cd docs
pnpm dev
```

---

## 📁 文档组织最佳实践

### 推荐的文档结构

```
docs/
├── docs/
│   ├── index.md                    # 首页
│   ├── guide.md                    # 使用指南
│   ├── faq.md                      # 常见问题
│   ├── changelog.md                # 更新日志
│   └── components/
│       ├── base-ui.md              # base-ui 文档入口
│       ├── base-form.md            # base-form 文档入口
│       ├── business-admin.md       # business-admin 文档入口
│       └── business-dashboard.md   # business-dashboard 文档入口
│
└── packages/
    ├── base-ui/
    │   └── docs/
    │       ├── Button.md           # 组件文档
    │       ├── Input.md
    │       ├── Select.md
    │       └── ...
    ├── base-form/
    │   └── docs/
    │       ├── Form.md
    │       ├── FormItem.md
    │       └── ...
    └── ...
```

### 文档链接方式

#### 方式 1：在 docs/docs/components/base-ui.md 中引用

```markdown
# Base UI 组件库

## Button 组件

<code src="../../packages/base-ui/docs/Button.md" />

## Input 组件

<code src="../../packages/base-ui/docs/Input.md" />
```

#### 方式 2：使用 Dumi 的虚拟模块

```markdown
# Base UI 组件库

## Button 组件

<code src="@regan-ad/base-ui/docs/Button.md" />
```

---

## 🎯 各个包的配置

### 基础包（base-ui, base-form）

**不需要 .dumirc.ts**

```
packages/base-ui/
├── src/
│   ├── Button/
│   │   ├── index.tsx
│   │   └── index.css
│   └── index.ts
├── docs/
│   ├── Button.md
│   ├── Input.md
│   └── ...
└── package.json
```

### 业务包（business-admin, business-dashboard）

**不需要 .dumirc.ts**

```
packages/business-admin/
├── src/
│   ├── AdminLayout/
│   │   ├── index.tsx
│   │   └── index.css
│   └── index.ts
├── docs/
│   ├── AdminLayout.md
│   ├── AdminTable.md
│   └── ...
└── package.json
```

### 共享库（shared）

**不需要文档**

```
packages/shared/
├── src/
│   ├── utils/
│   ├── hooks/
│   ├── types/
│   └── index.ts
└── package.json
```

---

## 🔄 工作流程

### 开发流程

```bash
# 1. 启动文档开发服务器
pnpm docs:dev

# 2. 编辑组件代码
# 编辑 packages/base-ui/src/Button/index.tsx

# 3. 编辑组件文档
# 编辑 packages/base-ui/docs/Button.md

# 4. 文档自动热更新
# 浏览器自动刷新
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

## 💡 高级配置

### 配置 1：为不同的包使用不同的主题

```typescript
// docs/.dumirc.ts
export default defineConfig({
  themeConfig: {
    name: 'Regan AD 组件库',
    // 为不同的路由使用不同的主题
    nav: [
      {
        title: 'Base UI',
        link: '/components/base-ui',
      },
      {
        title: 'Business Admin',
        link: '/components/business-admin',
      },
    ],
  },
});
```

### 配置 2：为不同的包配置不同的 API 解析

```typescript
// docs/.dumirc.ts
export default defineConfig({
  apiParser: {
    // 为 base-ui 配置 API 解析
    '@regan-ad/base-ui': {
      entryFile: '../packages/base-ui/src/index.ts',
    },
    // 为 base-form 配置 API 解析
    '@regan-ad/base-form': {
      entryFile: '../packages/base-form/src/index.ts',
    },
  },
});
```

### 配置 3：为不同的包配置不同的 Webpack 配置

```typescript
// docs/.dumirc.ts
export default defineConfig({
  chainWebpack(config) {
    // 为 base-ui 配置特殊的 loader
    config.module
      .rule('base-ui-css')
      .test(/\.css$/)
      .include.add(path.resolve(__dirname, '../packages/base-ui'))
      .end()
      .use('css-loader')
      .loader('css-loader');

    return config;
  },
});
```

---

## 🚀 快速开始

### 步骤 1：调整文档结构

```bash
# 创建统一的文档目录
mkdir -p docs/docs/components

# 创建文档入口文件
touch docs/docs/index.md
touch docs/docs/guide.md
touch docs/docs/components/base-ui.md
touch docs/docs/components/base-form.md
touch docs/docs/components/business-admin.md
touch docs/docs/components/business-dashboard.md
```

### 步骤 2：创建 .dumirc.ts

```bash
# 复制配置文件
cp monorepo-templates/.dumirc.ts docs/.dumirc.ts
```

### 步骤 3：启动开发

```bash
pnpm docs:dev
```

---

## 📊 方案对比总结

| 特性 | 统一文档（推荐） | 独立文档 |
|------|-----------------|---------|
| **配置数量** | 1 个 | 5+ 个 |
| **维护成本** | 低 | 高 |
| **构建速度** | 快 | 慢 |
| **用户体验** | 一致 | 不一致 |
| **跨包导航** | 容易 | 困难 |
| **独立部署** | 不支持 | 支持 |
| **灵活性** | 中等 | 高 |
| **推荐度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🎯 总结

### 你应该选择方案 A（统一文档站点）

**原因：**
1. ✅ 配置简单 - 只需一个 .dumirc.ts
2. ✅ 维护容易 - 统一管理所有文档
3. ✅ 用户体验好 - 统一的导航和主题
4. ✅ 构建快速 - 一次构建完成
5. ✅ 跨包导航 - 用户可以轻松浏览所有组件

### 配置步骤

1. 在 `docs/` 目录创建 `.dumirc.ts`
2. 配置别名指向各个包的源代码
3. 在 `docs/docs/` 中创建文档入口文件
4. 在各个包的 `docs/` 目录中创建组件文档
5. 运行 `pnpm docs:dev` 启动开发

### 不需要做的事

❌ 不需要在每个包中创建 `.dumirc.ts`
❌ 不需要为每个包单独配置 Dumi
❌ 不需要为每个包单独构建文档

---

**最后更新：** 2024年10月28日
**推荐方案：** 统一文档站点（方案 A）
**项目状态：** ✅ 推荐配置已准备
