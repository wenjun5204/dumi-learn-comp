# 自定义主题配置完成！

## ✅ 已完成的配置

你的 Dumi 项目现在已经成功配置了**自定义主题**，并且实现了**默认在右侧显示 TOC 目录导航**。

## 📁 创建的文件

```
.dumi/
└── theme/
    ├── layouts/
    │   ├── DocLayout.tsx      # ✅ 自定义文档布局 - 右侧 TOC
    │   └── GlobalLayout.tsx   # ✅ 全局布局
    ├── styles/
    │   └── toc.css            # ✅ TOC 样式
    └── README.md              # 主题文档
```

## 🎯 主要功能

### 1. **DocLayout.tsx** - 文档布局
- 使用 `useRouteMeta()` 获取页面目录数据
- 自动在右侧渲染 TOC 目录导航
- 支持 FrontMatter 配置禁用：`toc: false`
- 支持多级标题缩进显示

### 2. **响应式设计**
- 屏幕 ≥ 1200px：显示右侧 TOC
- 屏幕 < 1200px：自动隐藏 TOC

### 3. **交互效果**
- 鼠标悬停时链接变蓝（#1890ff）
- 点击导航可跳转到对应小节
- 采用 CSS 过渡效果

## 📝 使用方式

### 默认启用 TOC
```markdown
---
title: 我的文档
---

## 标题 1
内容...

### 子标题 1.1
内容...

## 标题 2
内容...
```

### 禁用某页的 TOC
```markdown
---
title: 我的文档
toc: false
---

内容...
```

## 🚀 启动开发

```bash
pnpm docs:dev
```

然后访问页面，你应该能看到右侧的 TOC 导航！

## 📌 注意事项

1. **主题路径已配置**：在 `docs/.dumirc.ts` 中已添加：
   ```typescript
   theme: path.resolve(__dirname, '../.dumi/theme')
   ```

2. **需要重启开发服务**：修改主题文件后需要重启 `pnpm docs:dev`

3. **样式可自定义**：修改 `.dumi/theme/styles/toc.css` 来调整 TOC 样式

4. **基于默认主题**：当前只覆盖了 `layouts` 部分，其他功能仍使用 Dumi 默认主题

## 🔧 进阶定制

如需更多定制（如修改导航栏、侧边栏等），可在 `.dumi/theme/` 下添加：

```
.dumi/theme/
├── layouts/
│   ├── DocLayout.tsx         # 已有
│   ├── GlobalLayout.tsx      # 已有
│   └── DemoLayout.tsx        # 可选：自定义 demo 布局
├── slots/                     # 可选：自定义插槽
│   ├── Navbar.tsx
│   └── SideMenu.tsx
└── plugin/                    # 可选：自定义插件
    └── index.ts
```

祝贺！你的自定义 Dumi 主题已经准备好了！🎉
