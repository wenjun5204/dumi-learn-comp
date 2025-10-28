# Webpack 插件快速开始指南

## 📦 已配置的插件

你的项目已经配置了两个示例 webpack 插件。

### 文件结构

```
webpack-plugins/
├── demo-plugin.js           ✅ 演示插件
└── asset-size-plugin.js     ✅ 资源大小分析插件
```

---

## 🚀 快速开始

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 查看插件输出

在终端中你会看到：

```
✨ [DemoPlugin] 编译开始...
✅ [DemoPlugin] 编译完成！
   总耗时: 1234ms
   输出文件数: 45
   📦 处理资源: 45 个文件

📊 [AssetSizePlugin] 资源大小分析:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  main.abc12345.js                                 250.50 KB
✅ vendor.def67890.js                               120.30 KB
✅ styles.ghi11111.css                               45.20 KB
✅ runtime.jkl22222.js                               12.10 KB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 总大小: 428.10 KB
⚠️  超过阈值 (100 KB) 的文件: 2 个
```

### 3. 修改文件测试热更新

```bash
# 修改任何 CSS 或 TypeScript 文件
# 观察控制台输出文件变更信息
🔄 [DemoPlugin] 文件变更: src/Button/index.css
```

---

## 📝 配置位置

### .dumirc.ts

```typescript
chainWebpack(config) {
  // 添加演示插件
  config.plugin('demo-plugin').use(DemoWebpackPlugin, [
    {
      name: 'DemoPlugin',
      verbose: true,
    },
  ]);

  // 添加资源大小分析插件
  config.plugin('asset-size-plugin').use(AssetSizePlugin, [
    {
      name: 'AssetSizePlugin',
      threshold: 100 * 1024, // 100KB
      verbose: true,
    },
  ]);

  return config;
}
```

---

## 🎯 插件说明

### DemoWebpackPlugin

**功能：** 输出编译信息

**输出内容：**
- ✨ 编译开始
- ✅ 编译完成
- 📦 处理资源数量
- 🔄 文件变更监听
- ❌ 编译错误

**配置选项：**
```typescript
{
  name: 'DemoPlugin',      // 插件名称
  verbose: true,           // 是否输出详细日志
}
```

### AssetSizePlugin

**功能：** 分析输出资源大小

**输出内容：**
- 📊 所有资源列表（按大小排序）
- 📈 总大小统计
- ⚠️ 超过阈值的文件数量

**配置选项：**
```typescript
{
  name: 'AssetSizePlugin',
  threshold: 100 * 1024,   // 文件大小阈值（字节）
  verbose: true,           // 是否输出详细日志
}
```

---

## 🔧 常见操作

### 禁用某个插件

在 `.dumirc.ts` 中注释掉相应的 `config.plugin()` 调用：

```typescript
// config.plugin('demo-plugin').use(DemoWebpackPlugin, [...]);
```

### 修改插件配置

```typescript
config.plugin('asset-size-plugin').use(AssetSizePlugin, [
  {
    name: 'AssetSizePlugin',
    threshold: 50 * 1024,  // 改为 50KB
    verbose: true,
  },
]);
```

### 添加新插件

1. 在 `webpack-plugins/` 目录创建新文件
2. 在 `.dumirc.ts` 中导入
3. 使用 `config.plugin()` 添加

```typescript
// 1. 创建插件
// webpack-plugins/my-plugin.js
class MyPlugin {
  apply(compiler) {
    // 插件逻辑
  }
}
module.exports = MyPlugin;

// 2. 导入
const MyPlugin = require('./webpack-plugins/my-plugin');

// 3. 添加
config.plugin('my-plugin').use(MyPlugin, [{ /* 选项 */ }]);
```

---

## 📚 详细文档

查看完整文档：`docs/config/WEBPACK_PLUGIN_GUIDE.md`

---

## 🎓 学习资源

### 官方文档
- [Webpack Plugin API](https://webpack.js.org/api/plugins/)
- [webpack-chain](https://github.com/neutrinojs/webpack-chain)

### 项目文件
- `.dumirc.webpack-plugin-example.ts` - 完整配置示例
- `webpack-plugins/demo-plugin.js` - 演示插件源代码
- `webpack-plugins/asset-size-plugin.js` - 资源分析插件源代码

---

## ✅ 检查清单

- [ ] 已启动 `npm run dev`
- [ ] 已在终端看到插件输出
- [ ] 已修改文件测试热更新
- [ ] 已查看 `docs/config/WEBPACK_PLUGIN_GUIDE.md`
- [ ] 已理解 chainWebpack 的使用方式

---

**快速链接：**
- 📖 [完整指南](./docs/config/WEBPACK_PLUGIN_GUIDE.md)
- 🔌 [演示插件](./webpack-plugins/demo-plugin.js)
- 📊 [资源分析插件](./webpack-plugins/asset-size-plugin.js)
- ⚙️ [配置示例](./dumirc.webpack-plugin-example.ts)

---

**最后更新：** 2024年10月28日
