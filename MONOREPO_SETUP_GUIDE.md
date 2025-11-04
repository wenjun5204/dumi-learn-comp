# Monorepo 项目搭建完整指南

## 📋 目录

1. [项目结构设计](#项目结构设计)
2. [快速开始](#快速开始)
3. [详细配置](#详细配置)
4. [工作流程](#工作流程)
5. [常见问题](#常见问题)

---

## 🏗️ 项目结构设计

### 推荐的 Monorepo 结构

```
regan-ad-monorepo/
├── packages/
│   ├── base-ui/                          # 基础组件库 1
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   └── index.ts
│   │   ├── docs/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── rollup.config.js
│   │
│   ├── base-form/                        # 基础组件库 2
│   │   ├── src/
│   │   │   ├── Form/
│   │   │   ├── FormItem/
│   │   │   └── index.ts
│   │   ├── docs/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── rollup.config.js
│   │
│   ├── business-admin/                   # 业务组件库 1
│   │   ├── src/
│   │   │   ├── AdminLayout/
│   │   │   ├── AdminTable/
│   │   │   └── index.ts
│   │   ├── docs/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── rollup.config.js
│   │
│   ├── business-dashboard/               # 业务组件库 2
│   │   ├── src/
│   │   │   ├── Dashboard/
│   │   │   ├── Chart/
│   │   │   └── index.ts
│   │   ├── docs/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── rollup.config.js
│   │
│   └── shared/                           # 共享工具库
│       ├── src/
│       │   ├── utils/
│       │   ├── hooks/
│       │   ├── types/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── docs/                                 # 文档站点（Dumi）
│   ├── .dumirc.ts
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
├── pnpm-workspace.yaml                   # pnpm workspace 配置
├── package.json                          # 根 package.json
├── tsconfig.json                         # 根 tsconfig.json
├── .npmrc                                # npm 配置
└── README.md
```

---

## 🚀 快速开始

### 步骤 1：初始化 Monorepo

```bash
# 创建项目目录
mkdir regan-ad-monorepo
cd regan-ad-monorepo

# 初始化 git
git init

# 创建 pnpm-workspace.yaml
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
  - 'docs'
EOF

# 创建根 package.json
cat > package.json << 'EOF'
{
  "name": "regan-ad-monorepo",
  "version": "1.0.0",
  "description": "Regan AD 组件库 Monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r --parallel build",
    "docs:dev": "pnpm --filter docs dev",
    "docs:build": "pnpm --filter docs build",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test",
    "clean": "pnpm -r clean && rm -rf node_modules"
  },
  "devDependencies": {
    "pnpm": "^10.15.1"
  }
}
EOF
```

### 步骤 2：创建包目录结构

```bash
# 创建基础组件库
mkdir -p packages/base-ui/src
mkdir -p packages/base-ui/docs

mkdir -p packages/base-form/src
mkdir -p packages/base-form/docs

# 创建业务组件库
mkdir -p packages/business-admin/src
mkdir -p packages/business-admin/docs

mkdir -p packages/business-dashboard/src
mkdir -p packages/business-dashboard/docs

# 创建共享库
mkdir -p packages/shared/src

# 创建文档站点
mkdir -p docs/docs/components
```

### 步骤 3：安装依赖

```bash
# 安装 pnpm（如果还没有）
npm install -g pnpm

# 安装所有依赖
pnpm install
```

---

## 🔧 详细配置

### 1. pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'docs'

# 可选：配置 pnpm 行为
pnpm:
  overrides:
    react: '^18.0.0'
    react-dom: '^18.0.0'
```

### 2. 根 package.json

```json
{
  "name": "regan-ad-monorepo",
  "version": "1.0.0",
  "description": "Regan AD 组件库 Monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r --parallel build",
    "docs:dev": "pnpm --filter docs dev",
    "docs:build": "pnpm --filter docs build",
    "lint": "pnpm -r lint",
    "test": "pnpm -r test",
    "clean": "pnpm -r clean && rm -rf node_modules",
    "publish": "pnpm -r publish"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

### 3. 基础组件库 package.json（packages/base-ui/package.json）

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
    "dev": "dumi dev",
    "build": "rollup -c",
    "build:watch": "rollup -c -w",
    "docs:build": "dumi build",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  },
  "devDependencies": {
    "@regan-ad/shared": "workspace:*",
    "dumi": "^2.4.13",
    "rollup": "^3.29.5",
    "@rollup/plugin-typescript": "^12.1.4",
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3"
  }
}
```

### 4. 业务组件库 package.json（packages/business-admin/package.json）

```json
{
  "name": "@regan-ad/business-admin",
  "version": "1.0.0",
  "description": "管理后台业务组件库",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "dumi dev",
    "build": "rollup -c",
    "build:watch": "rollup -c -w",
    "docs:build": "dumi build",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  },
  "dependencies": {
    "@regan-ad/base-ui": "workspace:*",
    "@regan-ad/base-form": "workspace:*",
    "@regan-ad/shared": "workspace:*"
  },
  "devDependencies": {
    "dumi": "^2.4.13",
    "rollup": "^3.29.5",
    "@rollup/plugin-typescript": "^12.1.4",
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3"
  }
}
```

### 5. 共享库 package.json（packages/shared/package.json）

```json
{
  "name": "@regan-ad/shared",
  "version": "1.0.0",
  "description": "共享工具库",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "rollup -c",
    "build:watch": "rollup -c -w",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "devDependencies": {
    "rollup": "^3.29.5",
    "@rollup/plugin-typescript": "^12.1.4",
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3"
  }
}
```

### 6. 文档站点 package.json（docs/package.json）

```json
{
  "name": "@regan-ad/docs",
  "version": "1.0.0",
  "description": "组件库文档站点",
  "private": true,
  "scripts": {
    "dev": "dumi dev",
    "build": "dumi build",
    "preview": "dumi preview",
    "lint": "eslint . --ext .ts,.tsx"
  },
  "dependencies": {
    "@regan-ad/base-ui": "workspace:*",
    "@regan-ad/base-form": "workspace:*",
    "@regan-ad/business-admin": "workspace:*",
    "@regan-ad/business-dashboard": "workspace:*",
    "@regan-ad/shared": "workspace:*"
  },
  "devDependencies": {
    "dumi": "^2.4.13",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

---

## 📚 工作流程

### 开发流程

#### 1. 开发单个包

```bash
# 开发 base-ui 包
cd packages/base-ui
pnpm dev

# 或从根目录
pnpm --filter @regan-ad/base-ui dev
```

#### 2. 开发文档站点

```bash
# 开发文档（会自动加载所有包）
pnpm docs:dev

# 或
cd docs
pnpm dev
```

#### 3. 构建所有包

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @regan-ad/base-ui build

# 构建文档
pnpm docs:build
```

### 包之间的依赖

#### 在业务组件库中使用基础组件库

```typescript
// packages/business-admin/src/AdminLayout/index.tsx
import { Button, Input } from '@regan-ad/base-ui';
import { Form } from '@regan-ad/base-form';
import { useLocalStorage } from '@regan-ad/shared';

export const AdminLayout = () => {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Enter text" />
    </div>
  );
};
```

#### 在文档中使用所有包

```typescript
// docs/.dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  alias: {
    '@regan-ad/base-ui': require.resolve('../packages/base-ui/src'),
    '@regan-ad/base-form': require.resolve('../packages/base-form/src'),
    '@regan-ad/business-admin': require.resolve('../packages/business-admin/src'),
    '@regan-ad/business-dashboard': require.resolve('../packages/business-dashboard/src'),
    '@regan-ad/shared': require.resolve('../packages/shared/src'),
  },
  themeConfig: {
    name: 'Regan AD 组件库',
  },
});
```

---

## 🎯 常见操作

### 添加新包

```bash
# 1. 创建包目录
mkdir -p packages/new-package/src
mkdir -p packages/new-package/docs

# 2. 创建 package.json
cat > packages/new-package/package.json << 'EOF'
{
  "name": "@regan-ad/new-package",
  "version": "1.0.0",
  "description": "新包描述",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "dumi dev",
    "build": "rollup -c",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  },
  "devDependencies": {
    "@regan-ad/shared": "workspace:*",
    "dumi": "^2.4.13",
    "rollup": "^3.29.5"
  }
}
EOF

# 3. 安装依赖
pnpm install
```

### 在包之间添加依赖

```bash
# 在 business-admin 中添加 base-ui 依赖
pnpm --filter @regan-ad/business-admin add @regan-ad/base-ui

# 或手动编辑 package.json，使用 workspace:* 协议
```

### 发布包到 npm

```bash
# 1. 更新版本
pnpm -r version

# 2. 发布所有包
pnpm -r publish

# 3. 或发布特定包
pnpm --filter @regan-ad/base-ui publish
```

---

## 📊 包的分类和职责

### 基础组件库（Base Packages）

| 包名 | 职责 | 依赖 |
|------|------|------|
| **base-ui** | 基础 UI 组件（Button、Input 等） | shared |
| **base-form** | 表单相关组件（Form、FormItem 等） | base-ui, shared |

### 业务组件库（Business Packages）

| 包名 | 职责 | 依赖 |
|------|------|------|
| **business-admin** | 管理后台组件 | base-ui, base-form, shared |
| **business-dashboard** | 数据大屏组件 | base-ui, shared |

### 共享库（Shared Package）

| 包名 | 职责 | 依赖 |
|------|------|------|
| **shared** | 工具函数、Hooks、类型定义 | 无 |

---

## 🔍 常见问题

### Q1: 如何在开发时同时修改多个包？

**A:** 使用 `pnpm -r --parallel dev` 命令，所有包会同时进入开发模式。

### Q2: 包之间的循环依赖怎么处理？

**A:** 避免循环依赖。如果必须共享代码，将其提取到 `shared` 包中。

```
✅ 好的依赖关系：
shared → base-ui → business-admin
shared → base-form → business-admin

❌ 避免：
base-ui → business-admin → base-ui
```

### Q3: 如何在本地测试包的发布？

**A:** 使用 `npm link` 或 `pnpm link`：

```bash
# 在包目录中
cd packages/base-ui
pnpm link --global

# 在使用包的项目中
pnpm link --global @regan-ad/base-ui
```

### Q4: 如何管理版本号？

**A:** 使用 `pnpm version` 或 `changesets`：

```bash
# 手动更新版本
pnpm -r version

# 或使用 changesets（推荐）
pnpm add -D @changesets/cli
pnpm changeset
pnpm changeset version
```

### Q5: 文档站点如何同时展示所有包的文档？

**A:** 在文档中创建对应的 markdown 文件，并在 `.dumirc.ts` 中配置别名。

---

## 📈 性能优化

### 1. 使用 pnpm 的并行构建

```bash
# 并行构建所有包
pnpm -r --parallel build

# 限制并发数
pnpm -r --parallel --concurrency 4 build
```

### 2. 使用 workspace 协议

```json
{
  "dependencies": {
    "@regan-ad/base-ui": "workspace:*"
  }
}
```

### 3. 共享 node_modules

pnpm 默认使用符号链接，节省磁盘空间。

---

## 🎓 最佳实践

### 1. 包的命名规范

```
@regan-ad/base-ui          # 基础包
@regan-ad/base-form        # 基础包
@regan-ad/business-admin   # 业务包
@regan-ad/shared           # 共享包
```

### 2. 版本管理

```json
{
  "version": "1.0.0"  // 所有包使用相同版本
}
```

### 3. 依赖管理

```
shared（无依赖）
  ↓
base-ui, base-form（依赖 shared）
  ↓
business-admin, business-dashboard（依赖 base-* 和 shared）
```

### 4. 文档组织

```
docs/
├── docs/
│   ├── index.md              # 首页
│   ├── guide.md              # 使用指南
│   └── components/
│       ├── base-ui.md        # base-ui 文档
│       ├── base-form.md      # base-form 文档
│       ├── business-admin.md # business-admin 文档
│       └── business-dashboard.md
```

---

## 🚀 下一步

1. **创建项目结构** - 按照上面的结构创建目录
2. **配置 pnpm workspace** - 创建 `pnpm-workspace.yaml`
3. **创建 package.json** - 为每个包创建配置
4. **安装依赖** - 运行 `pnpm install`
5. **开发包** - 开始开发各个包
6. **构建和发布** - 构建并发布到 npm

---

**最后更新：** 2024年10月28日
**推荐 pnpm 版本：** 8.0+
**推荐 Node 版本：** 16.0+
