# Dumi 自定义主题 - TOC 导航配置完成总结

## 🎉 配置已完成！

你的 Dumi 文档站现在已经成功实现了**自定义主题**，并且所有文档页面**默认在右侧显示 TOC 目录导航**。

---

## 📁 创建的文件结构

```
dumi-learn-comp/
├── .dumi/
│   └── theme/
│       ├── layouts/
│       │   ├── DocLayout.tsx      ✅ 自定义文档布局（关键文件）
│       │   └── GlobalLayout.tsx   ✅ 全局布局
│       ├── styles/
│       │   └── toc.css            ✅ TOC 样式表
│       └── README.md              📖 主题说明文档
│
├── docs/
│   └── .dumirc.ts                 ✅ 已更新：添加 theme 配置
│
├── THEME_CONFIG.md                📖 使用说明文档
└── ...
```

---

## 🔑 核心配置

### 1. **docs/.dumirc.ts** - 已更新
```typescript
export default defineConfig({
  // 指定自定义主题路径
  theme: path.resolve(__dirname, '../.dumi/theme'),
  
  // ... 其他配置
});
```

### 2. **.dumi/theme/layouts/DocLayout.tsx** - 关键组件
```typescript
import { useRouteMeta } from 'dumi';

export default function DocLayout({ children }) {
  const { frontmatter, toc } = useRouteMeta();
  
  // 默认显示 TOC（可通过 frontmatter.toc 控制）
  const showToc = frontmatter.toc !== false;
  
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>{children}</div>
      {showToc && toc && <TOCNavigation items={toc} />}
    </div>
  );
}
```

---

## ✨ 功能特性

### ✅ 默认行为
- 所有文档**默认在右侧显示 TOC** 目录导航
- 自动抓取所有标题（h1-h6）生成目录
- 支持多级标题缩进显示

### ✅ 可控制显示
在 Markdown FrontMatter 中添加 `toc: false` 来禁用某页的 TOC：

```markdown
---
title: 不需要 TOC 的文档
toc: false
---

内容...
```

### ✅ 交互效果
- 鼠标悬停时链接变蓝（#1890ff）
- 点击目录项跳转到对应小节
- 平滑过渡动画

### ✅ 响应式设计
- 宽屏（≥ 1200px）：显示右侧 TOC
- 窄屏（< 1200px）：自动隐藏 TOC

---

## 🚀 使用方式

### 启动开发服务
```bash
cd /Users/liuwenjun/project/learn/dumi-learn-comp
pnpm docs:dev
```

然后访问文档页面，你应该能看到**右侧的 TOC 导航**！

### 文档编写示例

**创建带 TOC 的文档（默认）：**
```markdown
---
title: 我的组件文档
---

## 介绍

这是一个很棒的组件。

### 特性

- 特性 1
- 特性 2

## 使用方法

```typescript
import { MyComponent } from '@mylib/components';

export default () => <MyComponent />;
```

### 基础用法

...

## API 文档

...
```

**禁用 TOC 的文档：**
```markdown
---
title: 首页
toc: false
---

首页内容...
```

---

## 🎨 样式自定义

TOC 样式定义在 `.dumi/theme/styles/toc.css` 中，可修改以下部分：

```css
/* 修改 TOC 容器宽度 */
.dumi-doc-toc {
  width: 250px;  /* 改为你需要的宽度 */
}

/* 修改链接颜色 */
.dumi-doc-toc-link:hover {
  color: #1890ff;  /* 改为你喜欢的颜色 */
}

/* 修改响应式断点 */
@media (max-width: 1200px) {
  /* 改为你需要的断点 */
}
```

---

## 🔧 常见修改

### 改变 TOC 标题文本
编辑 `.dumi/theme/layouts/DocLayout.tsx`：

```typescript
<div style={{ fontWeight: 600, marginBottom: '12px', paddingLeft: '8px' }}>
  On this page  {/* 改成你需要的文本，如 '目录' */}
</div>
```

### 改变 TOC 宽度
编辑 `.dumi/theme/layouts/DocLayout.tsx` 中的 `style={{ width: '250px' }}`

### 改变 TOC 位置（左右）
修改 DocLayout 中 flex 容器的排列顺序

---

## 📌 重要提示

1. ✅ 主题配置已完成，无需额外操作
2. ⚠️ 修改主题文件后需要**重启** `pnpm docs:dev`
3. ⚠️ 确保 Node.js 版本 ≥ 18（已设置 nvm default 18）
4. 🎯 Dumi 默认主题的其他功能（导航栏、侧边栏等）保持不变

---

## 📚 更多资源

- **Dumi 官方文档**：https://d.umijs.org/theme
- **自定义主题详细指南**：https://d.umijs.org/theme/default
- **主题 API 文档**：https://d.umijs.org/theme/api

---

## 🎓 下一步建议

1. 测试文档页面，确认 TOC 正常显示
2. 根据需要调整样式（颜色、宽度、间距）
3. 在文档中使用 `toc: false` 来禁用不需要的页面
4. 考虑添加更多自定义，如：
   - 自定义 GlobalLayout（配置 ConfigProvider、主题切换等）
   - 自定义 slots（修改导航栏、侧边栏等）
   - 添加插件（自定义编译行为）

---

**祝贺！你的 Dumi 文档站已经完全配置好了！🎉**
