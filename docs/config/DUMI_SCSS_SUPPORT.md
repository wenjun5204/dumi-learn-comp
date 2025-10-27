# Dumi 对 SCSS 的支持

## ✅ 直接答案

### **是的，Dumi 完全支持 SCSS**

Dumi 基于 Umi 框架，而 Umi 内置了对 SCSS/SASS 的完整支持。

---

## 🎯 支持情况

### 支持的样式预处理器

| 预处理器 | 支持 | 说明 |
|---------|------|------|
| **CSS** | ✅ | 原生支持 |
| **SCSS/SASS** | ✅ | 完全支持 |
| **Less** | ✅ | 完全支持 |
| **PostCSS** | ✅ | 内置支持 |

### 支持的文件扩展名

```
✅ .css      - 原生 CSS
✅ .scss     - SCSS 文件
✅ .sass     - SASS 文件（缩进语法）
✅ .less     - Less 文件
```

---

## 🚀 如何使用 SCSS

### 1. **直接在组件中导入 SCSS**

```typescript
// src/Button/index.tsx
import React, { type FC } from 'react';
import './index.scss';  // ✅ 直接导入 SCSS 文件

export interface ButtonProps {
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const Button: FC<ButtonProps> = ({ children, size = 'medium' }) => {
  return (
    <button className={`regan-button regan-button--${size}`}>
      {children}
    </button>
  );
};

export default Button;
```

### 2. **编写 SCSS 文件**

```scss
// src/Button/index.scss
$primary-color: #1890ff;
$border-radius: 4px;
$transition-duration: 0.3s;

// 定义 mixin
@mixin button-size($padding, $font-size, $height) {
  padding: $padding;
  font-size: $font-size;
  height: $height;
  line-height: $height;
}

// 主样式
.regan-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all $transition-duration ease;
  font-weight: 500;
  background-color: $primary-color;
  color: #ffffff;

  // 嵌套选择器
  &:hover:not(:disabled) {
    opacity: 0.85;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    opacity: 1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  // 尺寸变体
  &--small {
    @include button-size(4px 12px, 12px, 24px);
  }

  &--medium {
    @include button-size(8px 16px, 14px, 32px);
  }

  &--large {
    @include button-size(12px 24px, 16px, 40px);
  }
}
```

### 3. **在 Demo 中使用**

```markdown
# Button

## 基础用法



## 不同尺寸

```

---

## 📦 依赖情况

### Dumi 内置的 SCSS 支持

Dumi 通过 Umi 框架内置了以下依赖：

```json
{
  "devDependencies": {
    "sass": "^1.64.1",           // SCSS 编译器
    "sass-loader": "^16.0.5",    // webpack loader
    "less": "^4.2.0",            // Less 编译器
    "less-loader": "^12.2.0"     // webpack loader
  }
}
```

**你无需手动安装这些依赖，Dumi 已经包含了！**

---

## 🔧 配置选项

### 在 .dumirc.ts 中配置 SCSS

```typescript
// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',

  // SCSS 配置
  styles: [
    // 全局 SCSS 变量
    `
      $primary-color: #1890ff;
      $border-radius: 4px;
    `,
  ],

  // 其他配置...
  themeConfig: {
    name: 'regan-ad-comp',
  },
});
```

### 配置 SCSS 模块化

```typescript
// .dumirc.ts
export default defineConfig({
  cssModule: {
    // 启用 CSS Modules
    auto: true,
    // 配置哪些文件使用 CSS Modules
    localsConvention: 'camelCase',
  },
});
```

---

## 💡 最佳实践

### 1. **使用 SCSS 变量管理主题**

```scss
// src/styles/variables.scss
// 颜色
$primary-color: #1890ff;
$success-color: #52c41a;
$error-color: #ff4d4f;
$warning-color: #faad14;

// 尺寸
$border-radius-sm: 2px;
$border-radius-md: 4px;
$border-radius-lg: 8px;

// 间距
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

// 过渡
$transition-duration: 0.3s;
$transition-timing: ease;
```

### 2. **使用 SCSS Mixin 复用样式**

```scss
// src/styles/mixins.scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin button-size($padding, $font-size, $height) {
  padding: $padding;
  font-size: $font-size;
  height: $height;
  line-height: $height;
}

@mixin hover-effect {
  transition: all $transition-duration $transition-timing;

  &:hover {
    opacity: 0.85;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
```

### 3. **在组件中导入和使用**

```scss
// src/Button/index.scss
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.regan-button {
  @include flex-center;
  border: none;
  border-radius: $border-radius-md;
  cursor: pointer;
  @include hover-effect;

  &--small {
    @include button-size(4px 12px, 12px, 24px);
  }

  &--medium {
    @include button-size(8px 16px, 14px, 32px);
  }

  &--large {
    @include button-size(12px 24px, 16px, 40px);
  }
}
```

### 4. **使用 CSS Modules（可选）**

```scss
// src/Button/index.module.scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
}

.buttonSmall {
  padding: 4px 12px;
  font-size: 12px;
}

.buttonLarge {
  padding: 12px 24px;
  font-size: 16px;
}
```

```typescript
// src/Button/index.tsx
import React from 'react';
import styles from './index.module.scss';

export default function Button({ size = 'medium' }) {
  return (
    <button className={`${styles.button} ${styles[`button${size}`]}`}>
      Click me
    </button>
  );
}
```

---

## 🎨 SCSS 特性支持

### 支持的 SCSS 特性

| 特性 | 支持 | 说明 |
|------|------|------|
| **变量** | ✅ | `$variable: value;` |
| **嵌套** | ✅ | 嵌套选择器 |
| **Mixin** | ✅ | `@mixin name { ... }` |
| **继承** | ✅ | `@extend .class;` |
| **函数** | ✅ | `@function name() { ... }` |
| **循环** | ✅ | `@for, @each, @while` |
| **条件** | ✅ | `@if, @else` |
| **导入** | ✅ | `@import 'file.scss';` |
| **Partials** | ✅ | `_partial.scss` |
| **Maps** | ✅ | `$map: (key: value);` |

---

## 🔥 热更新支持

### SCSS 文件的热更新

当你修改 SCSS 文件时，Dumi 会自动检测并更新：

```
修改 src/Button/index.scss
    ↓
Dumi 检测到变更
    ↓
SCSS 编译器重新编译
    ↓
webpack 更新样式
    ↓
HMR 推送更新
    ↓
浏览器实时刷新样式 ✅
```

**完全支持热更新，无需任何配置！**

---

## 📊 对比：CSS vs SCSS

### 使用 CSS

```css
/* src/Button/index.css */
.regan-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  background-color: #1890ff;
  color: #ffffff;
}

.regan-button:hover:not(:disabled) {
  opacity: 0.85;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.regan-button--small {
  padding: 4px 12px;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
}

.regan-button--medium {
  padding: 8px 16px;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
}

.regan-button--large {
  padding: 12px 24px;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
}
```

### 使用 SCSS

```scss
// src/Button/index.scss
$primary-color: #1890ff;
$border-radius: 4px;
$transition-duration: 0.3s;

@mixin button-size($padding, $font-size, $height) {
  padding: $padding;
  font-size: $font-size;
  height: $height;
  line-height: $height;
}

.regan-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all $transition-duration ease;
  font-weight: 500;
  background-color: $primary-color;
  color: #ffffff;

  &:hover:not(:disabled) {
    opacity: 0.85;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &--small {
    @include button-size(4px 12px, 12px, 24px);
  }

  &--medium {
    @include button-size(8px 16px, 14px, 32px);
  }

  &--large {
    @include button-size(12px 24px, 16px, 40px);
  }
}
```

**SCSS 的优势：**
- ✅ 代码更简洁
- ✅ 变量管理更方便
- ✅ Mixin 复用代码
- ✅ 嵌套选择器更清晰
- ✅ 易于维护

---

## 🚀 迁移指南

### 从 CSS 迁移到 SCSS

#### 步骤 1：重命名文件

```bash
# 将 CSS 文件改为 SCSS
mv src/Button/index.css src/Button/index.scss
```

#### 步骤 2：更新导入

```typescript
// src/Button/index.tsx
// 之前
import './index.css';

// 之后
import './index.scss';
```

#### 步骤 3：转换为 SCSS 语法

```scss
// 添加变量
$primary-color: #1890ff;
$border-radius: 4px;

// 使用嵌套
.regan-button {
  border-radius: $border-radius;
  background-color: $primary-color;

  &:hover {
    opacity: 0.85;
  }
}
```

#### 步骤 4：测试

```bash
npm run dev
# 访问 http://localhost:8000 查看效果
```

---

## ⚠️ 常见问题

### Q1: 需要安装 sass 吗？
**A:** 不需要。Dumi 已经内置了 sass 和 sass-loader。

### Q2: SCSS 文件会被打包到 npm 包中吗？
**A:** 不会。你的构建系统（rollup）会编译 SCSS 为 CSS，然后打包。

### Q3: 可以在 Demo 中使用 SCSS 吗？
**A:** 可以。Demo 中导入的组件会自动应用 SCSS 样式。

### Q4: SCSS 变量可以在 JavaScript 中访问吗？
**A:** 可以，使用 CSS Modules 或 CSS-in-JS 方案。

### Q5: 支持 SCSS 的 @import 吗？
**A:** 支持。可以导入其他 SCSS 文件。

---

## 📚 完整示例

### 项目结构

```
src/
├── styles/
│   ├── variables.scss      # 全局变量
│   ├── mixins.scss         # 全局 mixin
│   └── reset.scss          # 重置样式
├── Button/
│   ├── index.tsx           # 组件代码
│   ├── index.scss          # 组件样式
│   └── index.md            # 组件文档
└── index.ts                # 导出
```

### 完整的 SCSS 文件

```scss
// src/styles/variables.scss
$primary-color: #1890ff;
$success-color: #52c41a;
$error-color: #ff4d4f;
$border-radius: 4px;
$transition-duration: 0.3s;

// src/styles/mixins.scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin button-size($padding, $font-size, $height) {
  padding: $padding;
  font-size: $font-size;
  height: $height;
  line-height: $height;
}

// src/Button/index.scss
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.regan-button {
  @include flex-center;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all $transition-duration ease;
  font-weight: 500;
  background-color: $primary-color;
  color: #ffffff;

  &:hover:not(:disabled) {
    opacity: 0.85;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    opacity: 1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--small {
    @include button-size(4px 12px, 12px, 24px);
  }

  &--medium {
    @include button-size(8px 16px, 14px, 32px);
  }

  &--large {
    @include button-size(12px 24px, 16px, 40px);
  }
}
```

---

## 🎯 总结

| 问题 | 答案 |
|------|------|
| **Dumi 支持 SCSS 吗？** | ✅ 完全支持 |
| **需要额外配置吗？** | ❌ 无需配置 |
| **需要安装依赖吗？** | ❌ 已内置 |
| **支持热更新吗？** | ✅ 完全支持 |
| **支持 SCSS 特性吗？** | ✅ 全部支持 |
| **可以在 Demo 中使用吗？** | ✅ 可以 |

---

**最后更新：** 2024年10月25日
**Dumi 版本：** 2.4.21
