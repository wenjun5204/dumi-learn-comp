# Dumi 底层实现原理 - 快速总结

## 🎯 核心概念

### Dumi 是什么？
Dumi 是一个**文档生成框架**，专门为 React 组件库设计。它能够：
- 📝 自动扫描和生成组件 Demo
- 🔥 提供极速的热更新开发体验
- 📦 构建完整的静态文档网站
- 📚 自动生成 API 文档

---

## 🏗️ 三大核心机制

### 1️⃣ **自动 Demo 生成机制**

**原理：** 通过 AST 解析 Markdown 中的代码块，自动转换为可执行的 React 组件

```
Markdown 代码块
    ↓
Remark 解析 (生成 AST)
    ↓
提取 jsx/tsx 代码块
    ↓
生成虚拟模块 (.dumi/tmp/~demos/xxx)
    ↓
Webpack 编译
    ↓
浏览器执行 (可交互的 Demo)
```

**关键技术：**
- `remark` - Markdown 解析器
- `rehype` - HTML 处理器
- 虚拟模块系统 - webpack 的虚拟文件系统
- AST 转换 - 代码块到组件的转换

**优势：**
- ✅ 无需手动配置 Demo
- ✅ 代码块自动成为可运行的示例
- ✅ 支持热更新
- ✅ 代码和文档同步

---

### 2️⃣ **热更新 (HMR) 实现机制**

**原理：** 基于 webpack-dev-server 的 HMR + React Fast Refresh

```
文件变更
    ↓
Chokidar 监听
    ↓
Webpack 增量编译
    ↓
生成更新清单
    ↓
WebSocket 推送到浏览器
    ↓
React Fast Refresh 拦截
    ↓
保留组件状态，更新代码
    ↓
浏览器 UI 实时更新 (< 100ms)
```

**关键技术：**
- `webpack-dev-server` - 开发服务器
- `webpack HMR` - 模块热替换
- `React Fast Refresh` - React 组件热更新
- `chokidar` - 文件监听

**优势：**
- ✅ 极快的更新速度 (< 100ms)
- ✅ 保留组件状态
- ✅ 保留 Hook 状态
- ✅ 错误恢复能力强

---

### 3️⃣ **文档构建机制**

**原理：** 完整的静态站点生成流程

```
扫描源文件
    ↓
解析 Markdown + TypeScript
    ↓
提取 API 文档
    ↓
生成虚拟模块
    ↓
Webpack 生产构建
    ↓
代码优化 (压缩、分割)
    ↓
生成静态 HTML 文件
    ↓
输出到 docs-dist/
```

**关键技术：**
- `remark` + `rehype` - Markdown 处理
- `react-docgen` - Props 提取
- `TypeScript` - 类型解析
- `webpack` - 模块打包
- `Terser` - 代码压缩

**优势：**
- ✅ 完整的静态网站
- ✅ 自动 API 文档
- ✅ 代码分割优化
- ✅ SEO 友好

---

## 🔄 工作流程对比

### `dumi dev` (开发模式)

```
启动 webpack-dev-server
    ↓
监听文件变更
    ↓
增量编译
    ↓
HMR 推送更新
    ↓
浏览器实时刷新
```

**特点：**
- 快速编译
- 实时预览
- 保留状态
- 支持调试

### `dumi build` (生产构建)

```
扫描所有源文件
    ↓
完整编译
    ↓
代码优化
    ↓
生成静态文件
    ↓
输出 docs-dist/
```

**特点：**
- 完整构建
- 代码优化
- 静态输出
- 可部署

---

## 📊 技术栈详解

### 核心依赖

| 库 | 用途 | 版本 |
|---|------|------|
| **umi** | 框架核心 | ^4.3.0 |
| **webpack** | 模块打包 | 5.x |
| **webpack-dev-server** | 开发服务器 | 4.x |
| **babel** | 代码转译 | 7.x |
| **remark** | Markdown 解析 | ^10.0.2 |
| **rehype** | HTML 处理 | ^10.1.0 |
| **react-docgen** | Props 提取 | - |
| **prismjs** | 代码高亮 | ^1.29.0 |

### 插件系统

```typescript
// Dumi 的插件接口
interface IPlugin {
  onStart?: () => void;           // 启动时
  onBuild?: () => void;           // 构建时
  modifyConfig?: (config) => config;  // 修改配置
  modifyRoutes?: (routes) => routes;  // 修改路由
  modifyMarkdown?: (md) => md;    // 修改 Markdown
}
```

---

## 🎨 虚拟模块系统

Dumi 使用 webpack 的虚拟模块系统生成临时文件：

```
.dumi/tmp/
├── core/              # 核心配置
├── dumi/              # 主题和布局
├── ~demos/            # Demo 虚拟模块
│   ├── button-demo-0/
│   ├── button-demo-1/
│   └── foo-demo-0/
├── ~pages/            # 页面虚拟模块
│   ├── Button__index.md.tsx
│   ├── Foo__index.md.tsx
│   └── docs__guide.md.tsx
└── umi.ts             # Umi 入口
```

**优势：**
- 无需物理文件
- 动态生成
- 支持热更新
- 自动清理

---

## 🚀 性能优化

### 开发阶段优化

```
增量编译
├─ 只编译变更模块
├─ 复用缓存
└─ 快速反馈

HMR 优化
├─ 模块级更新
├─ 状态保留
└─ 错误恢复
```

### 构建阶段优化

```
代码分割
├─ 路由级分割
├─ Demo 独立加载
└─ 第三方库分离

代码压缩
├─ Terser 压缩 JS
├─ cssnano 压缩 CSS
└─ 图片优化

缓存策略
├─ 持久化缓存
├─ contenthash
└─ 浏览器缓存
```

---

## 📝 Markdown 处理流程

### 代码块识别



### 处理步骤

1. **识别** - 识别为 jsx 代码块
2. **提取** - 提取代码内容
3. **生成 ID** - 生成唯一标识 (button-demo-0)
4. **创建虚拟模块** - 在 .dumi/tmp/~demos/ 中创建
5. **编译** - webpack 编译虚拟模块
6. **注册路由** - 注册到路由系统
7. **渲染** - 浏览器加载并渲染

---

## 🔌 扩展机制

### 自定义插件

```typescript
// 自定义 Dumi 插件
export default {
  plugins: [
    {
      name: 'my-plugin',
      apply: 'serve',  // 仅在开发时应用

      // 修改 Markdown
      modifyMarkdown(md) {
        return md.replace(/xxx/g, 'yyy');
      },

      // 修改路由
      modifyRoutes(routes) {
        return [...routes, { path: '/custom', ... }];
      },
    },
  ],
};
```

---

## 💡 关键特性解析

### 1. 自动 API 文档

```typescript
// 使用 react-docgen 自动提取
export interface ButtonProps {
  /** 按钮文本 */
  children?: React.ReactNode;
  /** 按钮颜色 */
  color?: string;
}

// 自动生成 API 表格
```

### 2. 代码高亮

```javascript
// 使用 prismjs 进行代码高亮
const highlightedCode = Prism.highlight(
  code,
  Prism.languages.jsx,
  'jsx'
);
```

### 3. 响应式设计

```typescript
// 内置响应式主题
const theme = {
  breakpoints: {
    mobile: 576,
    tablet: 768,
    desktop: 992,
  },
};
```

---

## 🎯 总结

### Dumi 的核心优势

| 功能 | 实现方式 | 优势 |
|------|---------|------|
| **自动 Demo** | AST 解析 + 虚拟模块 | 无需配置，自动发现 |
| **热更新** | webpack HMR + React Fast Refresh | 极快的开发体验 |
| **文档构建** | remark + webpack | 完整的静态网站 |
| **API 文档** | react-docgen + TypeScript | 自动生成 Props 文档 |
| **代码高亮** | prismjs | 美观的代码展示 |
| **响应式** | 内置主题系统 | 开箱即用 |

### 适用场景

✅ **最适合：**
- React 组件库文档
- 设计系统文档
- 开源项目文档

⚠️ **不太适合：**
- 非 React 项目
- 需要高度定制的文档
- 静态博客（用 Next.js 更好）

---

## 📚 进阶学习

### 推荐阅读

1. [Dumi 官方文档](https://d.umijs.org)
2. [Umi 框架文档](https://umijs.org)
3. [Remark 插件开发](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
4. [Webpack HMR 原理](https://webpack.js.org/concepts/hot-module-replacement/)
5. [React Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin)

### 常见问题

**Q: 为什么 Demo 会自动更新？**
A: 因为 Dumi 使用 webpack HMR + React Fast Refresh，监听文件变更并实时推送更新。

**Q: 虚拟模块是什么？**
A: 虚拟模块是 webpack 的一个特性，允许在内存中生成模块而不需要物理文件。

**Q: 如何自定义主题？**
A: 通过 `.dumirc.ts` 的 `themeConfig` 配置，或创建自定义主题包。

**Q: 支持哪些 Markdown 扩展？**
A: 支持 GFM、frontmatter、自定义指令等。

---

## 🎓 学习路径

```
初级
├─ 理解 Dumi 的基本概念
├─ 学会编写 Markdown 文档
└─ 掌握基本配置

中级
├─ 理解虚拟模块系统
├─ 学会自定义主题
└─ 掌握插件开发

高级
├─ 深入 webpack 原理
├─ 理解 HMR 机制
└─ 开发高级插件
```

---

**最后更新：** 2024年10月25日
**Dumi 版本：** 2.4.21
**Umi 版本：** 4.4.12
