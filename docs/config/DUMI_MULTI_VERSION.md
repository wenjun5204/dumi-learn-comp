# Dumi 多版本文档管理和切换方案

## 📋 概述

本文档介绍如何在 Dumi 中实现多版本文档的管理和切换，支持用户在不同版本之间灵活切换。

---

## 🎯 核心方案

### 方案对比

| 方案 | 复杂度 | 推荐度 | 说明 |
|------|--------|--------|------|
| **方案 1：分支管理** | 低 | ⭐⭐⭐⭐⭐ | 最简单，适合小项目 |
| **方案 2：目录结构** | 中 | ⭐⭐⭐⭐ | 灵活，适合中等项目 |
| **方案 3：CDN 部署** | 高 | ⭐⭐⭐ | 复杂，适合大型项目 |
| **方案 4：动态路由** | 高 | ⭐⭐ | 最复杂，不推荐 |

---

## 方案 1：分支管理（推荐）

### 原理

```
GitHub 仓库
├── main 分支
│  └─ 最新版本文档 (v2.x)
├── v1.x 分支
│  └─ v1.x 版本文档
└── v0.x 分支
   └─ v0.x 版本文档

部署
├── docs.example.com (main 分支)
├── v1.docs.example.com (v1.x 分支)
└── v0.docs.example.com (v0.x 分支)
```

### 优势

```
✅ 简单易维护
✅ 版本完全隔离
✅ 互不影响
✅ 易于回滚
✅ 支持并行开发
```

### 实现步骤

#### 步骤 1：创建版本分支

```bash
# 创建 v1.x 分支（基于当前 main）
git checkout -b v1.x
git push origin v1.x

# 创建 v0.x 分支
git checkout -b v0.x
git push origin v0.x

# 回到 main 分支继续开发
git checkout main
```

#### 步骤 2：配置 .dumirc.ts

```typescript
// main 分支 - .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'regan-ad-comp',
    // 版本信息
    versions: {
      current: '2.x',
      list: [
        { label: '2.x (latest)', value: '2.x', link: 'https://docs.example.com' },
        { label: '1.x', value: '1.x', link: 'https://v1.docs.example.com' },
        { label: '0.x', value: '0.x', link: 'https://v0.docs.example.com' },
      ],
    },
  },
});
```

```typescript
// v1.x 分支 - .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'regan-ad-comp',
    versions: {
      current: '1.x',
      list: [
        { label: '2.x (latest)', value: '2.x', link: 'https://docs.example.com' },
        { label: '1.x', value: '1.x', link: 'https://v1.docs.example.com' },
        { label: '0.x', value: '0.x', link: 'https://v0.docs.example.com' },
      ],
    },
  },
});
```

#### 步骤 3：部署配置

```yaml
# GitHub Actions 配置 (.github/workflows/deploy.yml)
name: Deploy Docs

on:
  push:
    branches:
      - main
      - v1.x
      - v0.x

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Build docs
        run: npm run docs:build

      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          if [ "${{ github.ref }}" = "refs/heads/main" ]; then
            vercel --prod --token $VERCEL_TOKEN
          elif [ "${{ github.ref }}" = "refs/heads/v1.x" ]; then
            vercel --prod --token $VERCEL_TOKEN --scope v1
          elif [ "${{ github.ref }}" = "refs/heads/v0.x" ]; then
            vercel --prod --token $VERCEL_TOKEN --scope v0
          fi
```

### 项目结构

```
regan-ad-comp/
├── main 分支
│  ├── src/
│  │  ├── Button/
│  │  │  ├── index.tsx (v2.x 实现)
│  │  │  └── index.md
│  │  └── ...
│  ├── docs/
│  ├── .dumirc.ts (v2.x 配置)
│  └── package.json (v2.x 依赖)
│
├── v1.x 分支
│  ├── src/
│  │  ├── Button/
│  │  │  ├── index.tsx (v1.x 实现)
│  │  │  └── index.md
│  │  └── ...
│  ├── docs/
│  ├── .dumirc.ts (v1.x 配置)
│  └── package.json (v1.x 依赖)
│
└── v0.x 分支
   ├── src/
   ├── docs/
   ├── .dumirc.ts (v0.x 配置)
   └── package.json (v0.x 依赖)
```

---

## 方案 2：目录结构管理

### 原理

```
单个仓库，多个版本目录

docs-src/
├── v2.x/
│  ├── src/
│  ├── docs/
│  └── .dumirc.ts
├── v1.x/
│  ├── src/
│  ├── docs/
│  └── .dumirc.ts
└── v0.x/
   ├── src/
   ├── docs/
   └── .dumirc.ts
```

### 优势

```
✅ 单个仓库管理
✅ 易于对比版本差异
✅ 共享配置
✅ 统一 CI/CD
```

### 实现步骤

#### 步骤 1：创建目录结构

```bash
mkdir -p docs-src/{v2.x,v1.x,v0.x}

# 复制源文件到各版本目录
cp -r src docs-src/v2.x/
cp -r src docs-src/v1.x/
cp -r src docs-src/v0.x/
```

#### 步骤 2：配置 .dumirc.ts

```typescript
// docs-src/v2.x/.dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: '../../docs-dist/v2.x',
  themeConfig: {
    name: 'regan-ad-comp v2.x',
    versions: {
      current: '2.x',
      list: [
        { label: '2.x (latest)', value: '2.x', link: '/v2.x' },
        { label: '1.x', value: '1.x', link: '/v1.x' },
        { label: '0.x', value: '0.x', link: '/v0.x' },
      ],
    },
  },
});
```

#### 步骤 3：构建脚本

```json
{
  "scripts": {
    "docs:build": "npm run docs:build:v2 && npm run docs:build:v1 && npm run docs:build:v0",
    "docs:build:v2": "cd docs-src/v2.x && dumi build",
    "docs:build:v1": "cd docs-src/v1.x && dumi build",
    "docs:build:v0": "cd docs-src/v0.x && dumi build",
    "docs:dev": "cd docs-src/v2.x && dumi dev"
  }
}
```

#### 步骤 4：部署配置

```yaml
# .github/workflows/deploy.yml
name: Deploy Multi-Version Docs

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Build all versions
        run: npm run docs:build

      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod --token $VERCEL_TOKEN
```

---

## 方案 3：CDN 部署

### 原理

```
构建所有版本
    │
    ├─ v2.x 文档 → docs-dist/v2.x/
    ├─ v1.x 文档 → docs-dist/v1.x/
    └─ v0.x 文档 → docs-dist/v0.x/
    │
    ▼
上传到 CDN
    │
    ├─ cdn.example.com/docs/v2.x/
    ├─ cdn.example.com/docs/v1.x/
    └─ cdn.example.com/docs/v0.x/
    │
    ▼
主站点动态加载
    │
    └─ 根据用户选择加载对应版本
```

### 实现步骤

#### 步骤 1：创建版本选择器组件

```typescript
// src/components/VersionSelector.tsx
import React, { useState, useEffect } from 'react';

interface Version {
  label: string;
  value: string;
  link: string;
}

interface VersionSelectorProps {
  versions: Version[];
  current: string;
}

export const VersionSelector: React.FC<VersionSelectorProps> = ({
  versions,
  current,
}) => {
  const [selectedVersion, setSelectedVersion] = useState(current);

  const handleVersionChange = (version: string) => {
    const selectedVersionObj = versions.find((v) => v.value === version);
    if (selectedVersionObj) {
      window.location.href = selectedVersionObj.link;
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <label>
        版本：
        <select
          value={selectedVersion}
          onChange={(e) => handleVersionChange(e.target.value)}
          style={{ marginLeft: '8px' }}
        >
          {versions.map((version) => (
            <option key={version.value} value={version.value}>
              {version.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default VersionSelector;
```

#### 步骤 2：集成到主题

```typescript
// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'regan-ad-comp',
    versions: {
      current: '2.x',
      list: [
        { label: '2.x (latest)', value: '2.x', link: 'https://docs.example.com' },
        { label: '1.x', value: '1.x', link: 'https://v1.docs.example.com' },
        { label: '0.x', value: '0.x', link: 'https://v0.docs.example.com' },
      ],
    },
  },

  // 自定义主题
  theme: {
    '@c-primary': '#1890ff',
  },
});
```

#### 步骤 3：构建脚本

```bash
#!/bin/bash
# scripts/build-all-versions.sh

# 构建 v2.x
npm run docs:build

# 构建 v1.x
git checkout v1.x
npm install
npm run docs:build
mv docs-dist docs-dist-v1

# 构建 v0.x
git checkout v0.x
npm install
npm run docs:build
mv docs-dist docs-dist-v0

# 回到 main
git checkout main

# 合并所有版本
mkdir -p final-dist
cp -r docs-dist/* final-dist/
cp -r docs-dist-v1/* final-dist/v1.x/
cp -r docs-dist-v0/* final-dist/v0.x/

# 上传到 CDN
aws s3 sync final-dist s3://my-bucket/docs/
```

---

## 🎨 自定义版本选择器

### 在导航栏中添加版本选择

```typescript
// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',

  // 自定义导航
  navs: [
    null, // 自动生成的导航
    {
      title: '版本',
      children: [
        { title: '2.x (latest)', link: 'https://docs.example.com' },
        { title: '1.x', link: 'https://v1.docs.example.com' },
        { title: '0.x', link: 'https://v0.docs.example.com' },
      ],
    },
  ],

  themeConfig: {
    name: 'regan-ad-comp',
  },
});
```

### 在页面顶部显示版本信息

```typescript
// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',

  // 自定义 HTML
  html: {
    head: `
      <script>
        // 版本提示
        if (window.location.hostname === 'v1.docs.example.com') {
          console.warn('You are viewing v1.x documentation. Latest version: https://docs.example.com');
        }
      </script>
    `,
  },

  themeConfig: {
    name: 'regan-ad-comp',
  },
});
```

---

## 📊 版本管理最佳实践

### 1. **版本命名规范**

```
v2.x - 最新版本（main 分支）
v1.x - 上一个主版本
v0.x - 历史版本

或者

latest - 最新版本
stable - 稳定版本
beta - 测试版本
```

### 2. **文档更新策略**

```
main 分支（v2.x）
├─ 新功能文档
├─ 最新 API 文档
└─ 最新示例

v1.x 分支
├─ 仅修复文档错误
├─ 不添加新功能
└─ 保持稳定

v0.x 分支
├─ 仅关键修复
├─ 不推荐使用
└─ 逐步淘汰
```

### 3. **版本切换提示**

```typescript
// docs/index.md
# 欢迎使用 regan-ad-comp

> 📌 **当前版本：v2.x**
>
> 如需查看其他版本文档：
> - [v1.x 文档](https://v1.docs.example.com)
> - [v0.x 文档](https://v0.docs.example.com)
```

### 4. **版本对比页面**

```markdown
# 版本对比

## v2.x vs v1.x

| 功能 | v2.x | v1.x |
|------|------|------|
| Button 组件 | ✅ | ✅ |
| 新增 Tabs 组件 | ✅ | ❌ |
| TypeScript 支持 | ✅ | ⚠️ |
| 性能优化 | ✅ | ❌ |

## 升级指南

从 v1.x 升级到 v2.x：

1. 更新依赖
2. 查看 Breaking Changes
3. 更新代码
4. 测试
```

---

## 🚀 完整示例

### 项目结构

```
regan-ad-comp/
├── .github/
│  └── workflows/
│     └── deploy.yml
├── docs/
│  ├── index.md
│  ├── guide.md
│  └── changelog.md
├── src/
│  ├── Button/
│  ├── Foo/
│  └── index.ts
├── .dumirc.ts
├── package.json
└── README.md
```

### .dumirc.ts 配置

```typescript
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',

  // 导航配置
  navs: [
    { title: '指南', link: '/guide' },
    { title: '组件', link: '/components' },
    { title: '更新日志', link: '/changelog' },
    null,
    {
      title: '版本',
      children: [
        { title: '2.x (latest)', link: 'https://docs.example.com' },
        { title: '1.x', link: 'https://v1.docs.example.com' },
        { title: '0.x', link: 'https://v0.docs.example.com' },
      ],
    },
  ],

  // 主题配置
  themeConfig: {
    name: 'regan-ad-comp',
    logo: 'https://example.com/logo.png',
    socialLinks: {
      github: 'https://github.com/example/regan-ad-comp',
    },
  },

  // 版本信息
  define: {
    'process.env.VERSION': '2.x',
  },
});
```

### package.json 脚本

```json
{
  "scripts": {
    "dev": "dumi dev",
    "docs:build": "dumi build",
    "docs:preview": "dumi preview",
    "docs:deploy": "npm run docs:build && npm run docs:upload",
    "docs:upload": "aws s3 sync docs-dist s3://my-bucket/docs/"
  }
}
```

### GitHub Actions 部署

```yaml
name: Deploy Docs

on:
  push:
    branches:
      - main
      - v1.x
      - v0.x

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build docs
        run: npm run docs:build

      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          if [ "${{ github.ref }}" = "refs/heads/main" ]; then
            vercel --prod --token $VERCEL_TOKEN
          elif [ "${{ github.ref }}" = "refs/heads/v1.x" ]; then
            vercel --prod --token $VERCEL_TOKEN --scope v1
          elif [ "${{ github.ref }}" = "refs/heads/v0.x" ]; then
            vercel --prod --token $VERCEL_TOKEN --scope v0
          fi
```

---

## 📊 方案对比总结

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| **分支管理** | 简单、隔离 | 多个仓库副本 | 小到中型项目 |
| **目录结构** | 单仓库、灵活 | 配置复杂 | 中到大型项目 |
| **CDN 部署** | 高效、可扩展 | 最复杂 | 大型项目、高流量 |
| **动态路由** | 灵活 | 难以维护 | 不推荐 |

---

## 🎯 推荐方案

### 对于你的项目

**推荐使用：方案 1（分支管理）**

原因：
- ✅ 简单易维护
- ✅ 版本完全隔离
- ✅ 易于回滚
- ✅ 适合中小型项目

实现步骤：
1. 创建 v1.x 分支
2. 配置版本信息
3. 设置 GitHub Actions 自动部署
4. 配置子域名或路径路由

---

## 📚 参考资源

- [Dumi 官方文档](https://d.umijs.org)
- [Umi 路由配置](https://umijs.org/docs/guides/routes)
- [Vercel 部署指南](https://vercel.com/docs)

---

**最后更新：** 2024年10月25日
**Dumi 版本：** 2.4.21
