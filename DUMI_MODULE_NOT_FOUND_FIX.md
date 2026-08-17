# Dumi 模块找不到错误修复指南

## 🐛 错误信息

```
Module not found: Error: Can't resolve '@regan-ad/base-ui' in '/Users/liuwenjun/project/learn/dumi-learn-comp/docs/docs/components'
```

---

## 🔍 错误原因

这个错误有几个可能的原因：

1. **别名配置不正确** - `.dumirc.ts` 中的别名指向了错误的路径
2. **包没有被构建** - `packages/base-ui/src/index.ts` 不存在或没有导出
3. **路径不存在** - 别名指向的路径不存在
4. **Dumi 缓存问题** - 需要清理缓存

---

## ✅ 解决方案

### 解决方案 1：检查别名配置（最常见）

#### 检查 docs/.dumirc.ts

```typescript
// docs/.dumirc.ts
import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  outputPath: '../docs-dist',

  alias: {
    // ✅ 确保别名指向正确的路径
    '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui/src'),
    '@regan-ad/base-form': path.resolve(__dirname, '../packages/base-form/src'),
    '@regan-ad/business-admin': path.resolve(__dirname, '../packages/business-admin/src'),
    '@regan-ad/business-dashboard': path.resolve(__dirname, '../packages/business-dashboard/src'),
    '@regan-ad/shared': path.resolve(__dirname, '../packages/shared/src'),
  },

  apiParser: {},

  themeConfig: {
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

#### 验证路径

```bash
# 检查 packages/base-ui/src 是否存在
ls -la packages/base-ui/src/

# 检查 packages/base-ui/src/index.ts 是否存在
ls -la packages/base-ui/src/index.ts
```

### 解决方案 2：创建缺失的文件

如果 `packages/base-ui/src/index.ts` 不存在，创建它：

```bash
# 创建 src 目录
mkdir -p packages/base-ui/src

# 创建 index.ts
cat > packages/base-ui/src/index.ts << 'EOF'
// 导出所有组件
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Select } from './Select';
EOF
```

### 解决方案 3：创建组件文件

如果组件文件不存在，创建它们：

```bash
# 创建 Button 组件
mkdir -p packages/base-ui/src/Button
cat > packages/base-ui/src/Button/index.tsx << 'EOF'
import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'default' | 'dashed';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'default',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${type}`}
    >
      {children}
    </button>
  );
};

export default Button;
EOF

# 创建 Input 组件
mkdir -p packages/base-ui/src/Input
cat > packages/base-ui/src/Input/index.tsx << 'EOF'
import React from 'react';

export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  type = 'text'
}) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      type={type}
      className="input"
    />
  );
};

export default Input;
EOF

# 创建 Select 组件
mkdir -p packages/base-ui/src/Select
cat > packages/base-ui/src/Select/index.tsx << 'EOF'
import React from 'react';

export interface SelectProps {
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface SelectOptionProps {
  value: string | number;
  children?: React.ReactNode;
}

export const SelectOption: React.FC<SelectOptionProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export const Select: React.FC<SelectProps> & { Option: typeof SelectOption } = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  children
}) => {
  return (
    <select
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className="select"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
};

Select.Option = SelectOption;

export default Select;
EOF
```

### 解决方案 4：清理缓存并重新启动

```bash
# 清理 Dumi 缓存
rm -rf docs/.dumi
rm -rf docs/node_modules/.cache

# 清理所有缓存
pnpm clean

# 重新安装依赖
pnpm install

# 重新启动开发服务器
pnpm docs:dev
```

---

## 📋 完整的检查清单

### 1. 检查别名配置

- [ ] `docs/.dumirc.ts` 存在
- [ ] 别名配置正确指向 `packages/*/src`
- [ ] 没有拼写错误

### 2. 检查源代码文件

- [ ] `packages/base-ui/src/` 目录存在
- [ ] `packages/base-ui/src/index.ts` 存在
- [ ] `packages/base-ui/src/Button/index.tsx` 存在
- [ ] `packages/base-ui/src/Input/index.tsx` 存在
- [ ] `packages/base-ui/src/Select/index.tsx` 存在

### 3. 检查导出

- [ ] `packages/base-ui/src/index.ts` 导出了所有组件
- [ ] 每个组件都有 `export default`

### 4. 检查文档

- [ ] `packages/base-ui/docs/Button.md` 存在
- [ ] `packages/base-ui/docs/Input.md` 存在
- [ ] `packages/base-ui/docs/Select.md` 存在
- [ ] `docs/docs/components/base-ui.md` 存在

### 5. 清理缓存

- [ ] 删除 `docs/.dumi` 目录
- [ ] 删除 `docs/node_modules/.cache` 目录
- [ ] 重新启动开发服务器

---

## 🚀 快速修复步骤

### 步骤 1：验证别名配置

```bash
# 检查 .dumirc.ts 中的别名
cat docs/.dumirc.ts | grep -A 10 "alias:"
```

### 步骤 2：验证源代码文件

```bash
# 检查 packages/base-ui/src 是否存在
ls -la packages/base-ui/src/

# 检查 index.ts 是否存在
ls -la packages/base-ui/src/index.ts

# 检查组件文件是否存在
ls -la packages/base-ui/src/Button/index.tsx
ls -la packages/base-ui/src/Input/index.tsx
ls -la packages/base-ui/src/Select/index.tsx
```

### 步骤 3：清理缓存

```bash
# 清理 Dumi 缓存
rm -rf docs/.dumi
rm -rf docs/node_modules/.cache

# 清理所有缓存
pnpm clean

# 重新安装依赖
pnpm install
```

### 步骤 4：重新启动

```bash
pnpm docs:dev
```

---

## 📊 常见错误和解决方案

### 错误 1：别名路径错误

```typescript
// ❌ 错误
alias: {
  '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui'),  // 缺少 /src
}

// ✅ 正确
alias: {
  '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui/src'),
}
```

### 错误 2：源代码文件不存在

```bash
# ❌ 错误：packages/base-ui/src 不存在
# ✅ 正确：创建 packages/base-ui/src 目录和文件
mkdir -p packages/base-ui/src
touch packages/base-ui/src/index.ts
```

### 错误 3：没有导出组件

```typescript
// ❌ 错误：packages/base-ui/src/index.ts 是空的
// ✅ 正确：导出所有组件
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Select } from './Select';
```

### 错误 4：缓存问题

```bash
# ❌ 错误：没有清理缓存
# ✅ 正确：清理缓存并重新启动
rm -rf docs/.dumi
rm -rf docs/node_modules/.cache
pnpm docs:dev
```

---

## 🎯 完整的项目结构

```
packages/base-ui/
├── src/
│   ├── Button/
│   │   ├── index.tsx
│   │   └── index.css
│   ├── Input/
│   │   ├── index.tsx
│   │   └── index.css
│   ├── Select/
│   │   ├── index.tsx
│   │   └── index.css
│   └── index.ts                    # ✅ 导出所有组件
├── docs/
│   ├── Button.md
│   ├── Input.md
│   └── Select.md
└── package.json

docs/
├── .dumirc.ts                      # ✅ 配置别名
└── docs/
    └── components/
        └── base-ui.md              # ✅ 关联组件文档
```

---

## 💡 常见问题

### Q1: 为什么还是找不到模块？

**A:** 检查以下几点：
1. 别名路径是否正确
2. 源代码文件是否存在
3. 是否正确导出了组件
4. 是否清理了缓存

### Q2: 如何验证别名配置？

**A:** 在 `.dumirc.ts` 中添加日志：

```typescript
export default defineConfig({
  alias: {
    '@regan-ad/base-ui': path.resolve(__dirname, '../packages/base-ui/src'),
  },

  chainWebpack(config) {
    console.log('Alias:', config.resolve.alias);
    return config;
  },
});
```

### Q3: 如何调试模块解析问题？

**A:** 使用 Webpack 的调试模式：

```bash
# 启用详细日志
DEBUG=* pnpm docs:dev
```

---

## ✅ 验证修复

修复后，运行以下命令验证：

```bash
# 1. 启动开发服务器
pnpm docs:dev

# 2. 打开浏览器
# http://localhost:8000/components/base-ui

# 3. 检查是否有错误信息
# 应该看到 Button、Input、Select 组件的文档
```

---

## 🎉 总结

### 常见原因

1. ❌ 别名配置不正确
2. ❌ 源代码文件不存在
3. ❌ 没有正确导出组件
4. ❌ 缓存问题

### 解决方案

1. ✅ 检查别名配置
2. ✅ 创建源代码文件
3. ✅ 正确导出组件
4. ✅ 清理缓存并重新启动

---

**最后更新：** 2024年10月28日
**Dumi 版本：** 2.4.21
**项目状态：** ✅ 错误修复指南已准备
