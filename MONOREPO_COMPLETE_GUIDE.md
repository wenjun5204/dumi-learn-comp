# Monorepo 完整搭建指南

## 📖 文档导航

本指南包含以下内容：

| 文档 | 内容 | 适合人群 |
|------|------|---------|
| **MONOREPO_QUICK_REFERENCE.md** | 快速参考 | 想快速上手 |
| **MONOREPO_SETUP_GUIDE.md** | 完整指南 | 想深入了解 |
| **MONOREPO_COMPLETE_GUIDE.md** | 本文件 - 总结 | 想全面掌握 |
| **monorepo-templates/** | 配置模板 | 需要配置文件 |

---

## 🎯 核心概念

### 什么是 Monorepo？

Monorepo（单一仓库）是一种项目管理方式，在一个 Git 仓库中管理多个相关的包（packages）。

**优点：**
- ✅ 代码共享方便
- ✅ 依赖管理统一
- ✅ 版本管理简化
- ✅ 跨包重构容易

**缺点：**
- ❌ 仓库体积较大
- ❌ 构建时间较长
- ❌ 权限管理复杂

### 为什么选择 pnpm？

pnpm 是 npm 的替代品，特别适合 Monorepo：

| 特性 | npm | yarn | pnpm |
|------|-----|------|------|
| **Workspace** | ❌ | ✅ | ✅ |
| **速度** | 慢 | 中 | 快 |
| **磁盘空间** | 多 | 多 | 少 |
| **依赖隔离** | 弱 | 中 | 强 |

---

## 🏗️ 项目架构

### 推荐的包结构

```
regan-ad-monorepo/
│
├── packages/                    # 所有包的目录
│   │
│   ├── shared/                  # 共享库（无依赖）
│   │   ├── src/
│   │   │   ├── utils/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── base-ui/                 # 基础 UI 组件库
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   └── index.ts
│   │   ├── docs/
│   │   ├── .dumirc.ts
│   │   ├── rollup.config.js
│   │   └── package.json
│   │
│   ├── base-form/               # 基础表单组件库
│   │   ├── src/
│   │   │   ├── Form/
│   │   │   ├── FormItem/
│   │   │   └── index.ts
│   │   ├── docs/
│   │   ├── .dumirc.ts
│   │   ├── rollup.config.js
│   │   └── package.json
│   │
│   ├── business-admin/          # 业务组件库 1
│   │   ├── src/
│   │   │   ├── AdminLayout/
│   │   │   ├── AdminTable/
│   │   │   └── index.ts
│   │   ├── docs/
│   │   ├── .dumirc.ts
│   │   ├── rollup.config.js
│   │   └── package.json
│   │
│   └── business-dashboard/      # 业务组件库 2
│       ├── src/
│       │   ├── Dashboard/
│       │   ├── Chart/
│       │   └── index.ts
│       ├── docs/
│       ├── .dumirc.ts
│       ├── rollup.config.js
│       └── package.json
│
├── docs/                        # 统一文档站点
│   ├── docs/
│   │   ├── index.md
│   │   ├── guide.md
│   │   └── components/
│   │       ├── base-ui.md
│   │       ├── base-form.md
│   │       ├── business-admin.md
│   │       └── business-dashboard.md
│   ├── .dumirc.ts
│   └── package.json
│
├── pnpm-workspace.yaml          # Workspace 配置
├── package.json                 # 根配置
├── tsconfig.json                # TypeScript 配置
├── .npmrc                        # npm 配置
└── README.md
```

### 依赖关系

```
shared（基础库，无依赖）
  ↓
base-ui（基础 UI）
base-form（基础表单）
  ↓
business-admin（业务组件）
business-dashboard（业务组件）
  ↓
docs（文档站点）
```

---

## 🚀 快速开始

### 步骤 1：初始化项目

```bash
# 使用初始化脚本（推荐）
bash monorepo-templates/init-monorepo.sh

# 或手动创建
mkdir regan-ad-monorepo
cd regan-ad-monorepo
git init
pnpm install
```

### 步骤 2：创建包的源代码

```bash
# 创建 base-ui 的 Button 组件
cat > packages/base-ui/src/Button/index.tsx << 'EOF'
import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
EOF

# 创建入口文件
cat > packages/base-ui/src/index.ts << 'EOF'
export { Button } from './Button';
export type { ButtonProps } from './Button';
EOF
```

### 步骤 3：配置 Dumi

```bash
# 创建 .dumirc.ts
cat > packages/base-ui/.dumirc.ts << 'EOF'
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'Base UI',
  },
});
EOF
```

### 步骤 4：配置 Rollup

```bash
# 创建 rollup.config.js
cat > packages/base-ui/rollup.config.js << 'EOF'
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: false,
      compilerOptions: {
        declaration: true,
        declarationDir: 'dist',
      },
    }),
  ],
};
EOF
```

### 步骤 5：启动开发

```bash
# 启动文档开发服务器
pnpm docs:dev

# 或开发特定包
pnpm --filter @regan-ad/base-ui dev
```

---

## 📚 常用命令

### 开发命令

```bash
# 开发所有包
pnpm dev

# 开发特定包
pnpm --filter @regan-ad/base-ui dev

# 开发文档
pnpm docs:dev
```

### 构建命令

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm --filter @regan-ad/base-ui build

# 构建文档
pnpm docs:build
```

### 依赖管理

```bash
# 添加依赖到特定包
pnpm --filter @regan-ad/base-ui add lodash

# 添加依赖到所有包
pnpm -r add lodash

# 删除依赖
pnpm --filter @regan-ad/base-ui remove lodash
```

### 其他命令

```bash
# 检查代码
pnpm lint

# 清理文件
pnpm clean

# 发布包
pnpm -r publish
```

---

## 🔧 配置文件详解

### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'      # 所有包
  - 'docs'            # 文档站点

pnpm:
  overrides:
    react: '^18.0.0'  # 强制版本
```

### 根 package.json

```json
{
  "name": "regan-ad-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r --parallel build",
    "docs:dev": "pnpm --filter @regan-ad/docs dev"
  }
}
```

### 包的 package.json

```json
{
  "name": "@regan-ad/base-ui",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "dependencies": {
    "@regan-ad/shared": "workspace:*"
  }
}
```

---

## 💡 最佳实践

### 1. 包的命名规范

```
✅ 好的命名：
@regan-ad/base-ui
@regan-ad/business-admin
@regan-ad/shared

❌ 避免：
@regan-ad/ui
@regan-ad/admin
@regan-ad/utils
```

### 2. 依赖管理

```
✅ 好的做法：
- 使用 workspace:* 协议
- 避免循环依赖
- 共享代码放在 shared 包

❌ 避免：
- 硬编码版本号
- 循环依赖
- 代码重复
```

### 3. 版本管理

```
✅ 推荐：
- 所有包使用相同版本
- 使用 changesets 管理版本

❌ 避免：
- 不同包不同版本
- 手动管理版本
```

### 4. 文档组织

```
✅ 好的做法：
- 每个包有自己的文档
- 统一的文档站点
- 清晰的导航结构

❌ 避免：
- 文档分散
- 文档不完整
- 导航混乱
```

---

## 🐛 常见问题

### Q1: 如何在包之间共享代码？

**A:** 将共享代码放在 `shared` 包中，其他包通过导入使用。

```typescript
// packages/shared/src/utils/format.ts
export const formatDate = (date: Date) => {
  // 实现
};

// packages/base-ui/src/Button/index.tsx
import { formatDate } from '@regan-ad/shared';
```

### Q2: 如何避免循环依赖？

**A:** 遵循依赖关系图，确保依赖是单向的。

```
✅ 好的：shared → base-ui → business-admin
❌ 坏的：base-ui → business-admin → base-ui
```

### Q3: 如何在本地测试包？

**A:** 使用 workspace 协议，pnpm 会自动链接。

```json
{
  "dependencies": {
    "@regan-ad/base-ui": "workspace:*"
  }
}
```

### Q4: 如何发布包到 npm？

**A:** 使用 `pnpm publish` 命令。

```bash
# 发布所有包
pnpm -r publish

# 发布特定包
pnpm --filter @regan-ad/base-ui publish
```

### Q5: 如何管理不同的 Node 版本？

**A:** 使用 `.nvmrc` 文件。

```bash
echo "16.0.0" > .nvmrc
nvm use
```

---

## 📈 性能优化

### 1. 使用并行构建

```bash
# 并行构建所有包
pnpm -r --parallel build

# 限制并发数
pnpm -r --parallel --concurrency 4 build
```

### 2. 使用缓存

```javascript
// rollup.config.js
export default {
  cache: true,  // 启用缓存
  // ...
};
```

### 3. 优化依赖

```bash
# 分析依赖大小
pnpm install --prod

# 删除未使用的依赖
pnpm prune
```

---

## 🎓 学习资源

### 官方文档

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Dumi 官方文档](https://d.umijs.org/)
- [Rollup 官方文档](https://rollupjs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

### 相关项目

- [Ant Design](https://github.com/ant-design/ant-design) - 使用 Monorepo
- [React](https://github.com/facebook/react) - 使用 Monorepo
- [Vue](https://github.com/vuejs/vue-next) - 使用 Monorepo

---

## 🚀 下一步

### 短期（第 1 周）

- [ ] 初始化 Monorepo 项目
- [ ] 创建基础包结构
- [ ] 配置 Dumi 和 Rollup
- [ ] 创建第一个组件

### 中期（第 2-4 周）

- [ ] 开发基础组件库
- [ ] 开发业务组件库
- [ ] 完善文档
- [ ] 添加单元测试

### 长期（第 5+ 周）

- [ ] 发布到 npm
- [ ] 建立 CI/CD 流程
- [ ] 性能优化
- [ ] 社区维护

---

## 📊 项目统计

### 包的数量

| 类型 | 数量 | 说明 |
|------|------|------|
| **基础包** | 2 | base-ui, base-form |
| **业务包** | 2 | business-admin, business-dashboard |
| **共享包** | 1 | shared |
| **文档** | 1 | docs |
| **总计** | 6 | - |

### 代码行数（预期）

| 包 | 代码行数 | 测试行数 |
|----|---------|---------|
| **base-ui** | 2000+ | 1000+ |
| **base-form** | 1500+ | 800+ |
| **business-admin** | 3000+ | 1500+ |
| **business-dashboard** | 2000+ | 1000+ |
| **shared** | 1000+ | 500+ |
| **总计** | 9500+ | 4800+ |

---

## 🎯 总结

### 核心要点

1. **Monorepo 是什么** - 在一个仓库中管理多个包
2. **为什么用 pnpm** - 快速、节省空间、依赖隔离
3. **如何组织包** - 基础包 → 业务包 → 文档
4. **如何开发** - 使用 `pnpm docs:dev` 启动开发
5. **如何构建** - 使用 `pnpm build` 构建所有包
6. **如何发布** - 使用 `pnpm -r publish` 发布

### 关键命令

```bash
pnpm dev              # 开发
pnpm build            # 构建
pnpm docs:dev         # 开发文档
pnpm docs:build       # 构建文档
pnpm lint             # 检查代码
pnpm clean            # 清理文件
pnpm -r publish       # 发布
```

### 推荐工具

- **包管理器** - pnpm 8.0+
- **运行时** - Node 16.0+
- **文档工具** - Dumi 2.4+
- **构建工具** - Rollup 3.0+
- **语言** - TypeScript 5.0+

---

## 📞 获取帮助

### 遇到问题？

1. 查看 `MONOREPO_SETUP_GUIDE.md` 的常见问题部分
2. 查看 `MONOREPO_QUICK_REFERENCE.md` 的快速参考
3. 查看官方文档
4. 提交 Issue

### 需要模板？

查看 `monorepo-templates/` 目录下的配置文件模板。

---

**最后更新：** 2024年10月28日
**推荐 pnpm 版本：** 8.0+
**推荐 Node 版本：** 16.0+
**项目状态：** ✅ 完全指南
