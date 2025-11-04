#!/bin/bash

# Monorepo 初始化脚本
# 用法: bash init-monorepo.sh

set -e

echo "🚀 开始初始化 Monorepo 项目..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm 未安装，正在安装...${NC}"
    npm install -g pnpm
fi

echo -e "${BLUE}📦 pnpm 版本: $(pnpm --version)${NC}"
echo ""

# 创建目录结构
echo -e "${BLUE}📁 创建目录结构...${NC}"

mkdir -p packages/base-ui/src
mkdir -p packages/base-ui/docs

mkdir -p packages/base-form/src
mkdir -p packages/base-form/docs

mkdir -p packages/business-admin/src
mkdir -p packages/business-admin/docs

mkdir -p packages/business-dashboard/src
mkdir -p packages/business-dashboard/docs

mkdir -p packages/shared/src

mkdir -p docs/docs/components

echo -e "${GREEN}✅ 目录结构创建完成${NC}"
echo ""

# 创建 pnpm-workspace.yaml
echo -e "${BLUE}⚙️  创建 pnpm-workspace.yaml...${NC}"
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
  - 'docs'

pnpm:
  overrides:
    react: '^18.0.0'
    react-dom: '^18.0.0'
    typescript: '^5.0.0'
EOF
echo -e "${GREEN}✅ pnpm-workspace.yaml 创建完成${NC}"
echo ""

# 创建根 package.json
echo -e "${BLUE}⚙️  创建根 package.json...${NC}"
cat > package.json << 'EOF'
{
  "name": "regan-ad-monorepo",
  "version": "1.0.0",
  "description": "Regan AD 组件库 Monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r --parallel build",
    "docs:dev": "pnpm --filter @regan-ad/docs dev",
    "docs:build": "pnpm --filter @regan-ad/docs build",
    "lint": "pnpm -r lint",
    "clean": "pnpm -r clean && rm -rf node_modules"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@10.15.1"
}
EOF
echo -e "${GREEN}✅ 根 package.json 创建完成${NC}"
echo ""

# 创建 base-ui package.json
echo -e "${BLUE}⚙️  创建 packages/base-ui/package.json...${NC}"
cat > packages/base-ui/package.json << 'EOF'
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
  "dependencies": {
    "@regan-ad/shared": "workspace:*"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@rollup/plugin-typescript": "^12.1.4",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "dumi": "^2.4.13",
    "rollup": "^3.29.5"
  }
}
EOF
echo -e "${GREEN}✅ packages/base-ui/package.json 创建完成${NC}"
echo ""

# 创建 base-form package.json
echo -e "${BLUE}⚙️  创建 packages/base-form/package.json...${NC}"
cat > packages/base-form/package.json << 'EOF'
{
  "name": "@regan-ad/base-form",
  "version": "1.0.0",
  "description": "基础表单组件库",
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
    "@regan-ad/shared": "workspace:*"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@rollup/plugin-typescript": "^12.1.4",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "dumi": "^2.4.13",
    "rollup": "^3.29.5"
  }
}
EOF
echo -e "${GREEN}✅ packages/base-form/package.json 创建完成${NC}"
echo ""

# 创建 business-admin package.json
echo -e "${BLUE}⚙️  创建 packages/business-admin/package.json...${NC}"
cat > packages/business-admin/package.json << 'EOF'
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
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@rollup/plugin-typescript": "^12.1.4",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "dumi": "^2.4.13",
    "rollup": "^3.29.5"
  }
}
EOF
echo -e "${GREEN}✅ packages/business-admin/package.json 创建完成${NC}"
echo ""

# 创建 business-dashboard package.json
echo -e "${BLUE}⚙️  创建 packages/business-dashboard/package.json...${NC}"
cat > packages/business-dashboard/package.json << 'EOF'
{
  "name": "@regan-ad/business-dashboard",
  "version": "1.0.0",
  "description": "数据大屏业务组件库",
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
    "@regan-ad/shared": "workspace:*"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@rollup/plugin-typescript": "^12.1.4",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "dumi": "^2.4.13",
    "rollup": "^3.29.5"
  }
}
EOF
echo -e "${GREEN}✅ packages/business-dashboard/package.json 创建完成${NC}"
echo ""

# 创建 shared package.json
echo -e "${BLUE}⚙️  创建 packages/shared/package.json...${NC}"
cat > packages/shared/package.json << 'EOF'
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
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@rollup/plugin-typescript": "^12.1.4",
    "rollup": "^3.29.5"
  }
}
EOF
echo -e "${GREEN}✅ packages/shared/package.json 创建完成${NC}"
echo ""

# 创建 docs package.json
echo -e "${BLUE}⚙️  创建 docs/package.json...${NC}"
cat > docs/package.json << 'EOF'
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
    "@regan-ad/shared": "workspace:*",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "dumi": "^2.4.13"
  }
}
EOF
echo -e "${GREEN}✅ docs/package.json 创建完成${NC}"
echo ""

# 创建 .npmrc
echo -e "${BLUE}⚙️  创建 .npmrc...${NC}"
cat > .npmrc << 'EOF'
shamefully-hoist=true
strict-peer-dependencies=false
EOF
echo -e "${GREEN}✅ .npmrc 创建完成${NC}"
echo ""

# 创建 .gitignore
echo -e "${BLUE}⚙️  创建 .gitignore...${NC}"
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnpm-debug.log*

# Build
dist/
docs-dist/
.dumi/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
.env
.env.local
EOF
echo -e "${GREEN}✅ .gitignore 创建完成${NC}"
echo ""

# 安装依赖
echo -e "${BLUE}📦 安装依赖...${NC}"
pnpm install

echo ""
echo -e "${GREEN}✅ Monorepo 初始化完成！${NC}"
echo ""
echo -e "${BLUE}📚 下一步：${NC}"
echo "1. 创建各个包的源代码"
echo "2. 创建 .dumirc.ts 配置文件"
echo "3. 创建 rollup.config.js 配置文件"
echo "4. 运行 pnpm docs:dev 启动文档开发服务器"
echo ""
echo -e "${BLUE}常用命令：${NC}"
echo "  pnpm dev              - 开发所有包"
echo "  pnpm build            - 构建所有包"
echo "  pnpm docs:dev         - 开发文档"
echo "  pnpm docs:build       - 构建文档"
echo "  pnpm lint             - 检查代码"
echo "  pnpm clean            - 清理构建文件"
echo ""
