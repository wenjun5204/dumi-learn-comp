# Dumi 中的 Webpack 插件配置指南

## 📚 概述

本指南展示了如何在 Dumi 中使用 `chainWebpack` 来添加和配置自定义 webpack 插件。

---

## 🎯 快速开始

### 项目结构

```
dumi-learn-comp/
├── webpack-plugins/
│   ├── demo-plugin.js           # 演示插件
│   └── asset-size-plugin.js     # 资源大小分析插件
├── .dumirc.ts                   # Dumi 配置文件
└── package.json
```

### 已配置的插件

| 插件 | 文件 | 功能 | 状态 |
|------|------|------|------|
| **DemoWebpackPlugin** | `webpack-plugins/demo-plugin.js` | 编译信息输出 | ✅ 已配置 |
| **AssetSizePlugin** | `webpack-plugins/asset-size-plugin.js` | 资源大小分析 | ✅ 已配置 |

---

## 🔧 插件详解

### 1. DemoWebpackPlugin（演示插件）

#### 功能
- 输出编译开始/完成信息
- 显示编译耗时
- 显示输出文件数量
- 监听文件变更

#### 输出示例
```
✨ [DemoPlugin] 编译开始...
✅ [DemoPlugin] 编译完成！
   总耗时: 1234ms
   输出文件数: 45
   📦 处理资源: 45 个文件
🔄 [DemoPlugin] 文件变更: src/Button/index.css
```

#### 源代码
```javascript
// webpack-plugins/demo-plugin.js
class DemoWebpackPlugin {
  constructor(options = {}) {
    this.options = {
      name: 'DemoPlugin',
      verbose: true,
      ...options,
    };
  }

  apply(compiler) {
    const pluginName = this.options.name;

    // 编译开始
    compiler.hooks.compile.tap(pluginName, () => {
      console.log('\n✨ [DemoPlugin] 编译开始...');
    });

    // 编译完成
    compiler.hooks.done.tap(pluginName, (stats) => {
      console.log('✅ [DemoPlugin] 编译完成！');
      console.log(`   总耗时: ${stats.endTime - stats.startTime}ms`);
    });

    // 文件变更
    compiler.hooks.invalid.tap(pluginName, (fileName) => {
      console.log(`🔄 [DemoPlugin] 文件变更: ${fileName}`);
    });
  }
}
```

### 2. AssetSizePlugin（资源大小分析插件）

#### 功能
- 分析所有输出资源的大小
- 按大小排序显示
- 标记超过阈值的文件
- 计算总大小

#### 输出示例
```
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

#### 源代码
```javascript
// webpack-plugins/asset-size-plugin.js
class AssetSizePlugin {
  constructor(options = {}) {
    this.options = {
      name: 'AssetSizePlugin',
      threshold: 100 * 1024, // 100KB
      verbose: true,
      ...options,
    };
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.options.name, (stats) => {
      const assets = stats.compilation.assets;
      const assetList = [];

      // 收集资源信息
      for (const [name, asset] of Object.entries(assets)) {
        const size = asset.size();
        assetList.push({
          name,
          size,
          sizeKB: (size / 1024).toFixed(2),
          isLarge: size > this.options.threshold,
        });
      }

      // 按大小排序并输出
      assetList.sort((a, b) => b.size - a.size);
      // ... 输出逻辑
    });
  }
}
```

---

## 📝 在 .dumirc.ts 中使用插件

### 基本配置

```typescript
// .dumirc.ts
import { defineConfig } from 'dumi';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// 导入自定义插件
const DemoWebpackPlugin = require('./webpack-plugins/demo-plugin');
const AssetSizePlugin = require('./webpack-plugins/asset-size-plugin');

export default defineConfig({
  outputPath: 'docs-dist',

  chainWebpack(config) {
    // 添加自定义插件
    config.plugin('demo-plugin').use(DemoWebpackPlugin, [
      {
        name: 'DemoPlugin',
        verbose: true,
      },
    ]);

    config.plugin('asset-size-plugin').use(AssetSizePlugin, [
      {
        name: 'AssetSizePlugin',
        threshold: 100 * 1024,
        verbose: true,
      },
    ]);

    return config;
  },

  themeConfig: {
    name: 'regan-ad-comp',
  },
});
```

### 完整配置示例

```typescript
// .dumirc.ts
chainWebpack(config) {
  // 1. 配置 CSS Loader
  const cssRule = config.module.rule('css');
  cssRule
    .test(/\.css$/i)
    .use('css-loader')
    .loader('css-loader')
    .end();

  // 2. 添加 MiniCssExtractPlugin
  config.plugin('mini-css-extract').use(MiniCssExtractPlugin, [
    {
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    },
  ]);

  // 3. 添加自定义插件
  config.plugin('demo-plugin').use(DemoWebpackPlugin, [
    {
      name: 'DemoPlugin',
      verbose: true,
    },
  ]);

  config.plugin('asset-size-plugin').use(AssetSizePlugin, [
    {
      name: 'AssetSizePlugin',
      threshold: 100 * 1024,
      verbose: true,
    },
  ]);

  // 4. 其他 webpack 配置
  config.output.filename('[name].[contenthash:8].js');
  config.resolve.alias.set('@components', path.resolve(__dirname, './src'));

  return config;
}
```

---

## 🚀 运行和测试

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

### 预期输出

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

### 修改文件测试热更新

```bash
# 修改 src/Button/index.css
# 观察控制台输出：
🔄 [DemoPlugin] 文件变更: src/Button/index.css
✨ [DemoPlugin] 编译开始...
✅ [DemoPlugin] 编译完成！
   总耗时: 456ms
```

---

## 🎓 创建自定义插件

### 基本模板

```javascript
// webpack-plugins/my-plugin.js
class MyPlugin {
  constructor(options = {}) {
    this.options = {
      name: 'MyPlugin',
      ...options,
    };
  }

  apply(compiler) {
    const pluginName = this.options.name;

    // 编译开始
    compiler.hooks.compile.tap(pluginName, () => {
      console.log(`[${pluginName}] 编译开始`);
    });

    // 编译完成
    compiler.hooks.done.tap(pluginName, (stats) => {
      console.log(`[${pluginName}] 编译完成`);
    });

    // 处理错误
    compiler.hooks.failed.tap(pluginName, (error) => {
      console.error(`[${pluginName}] 错误:`, error.message);
    });
  }
}

module.exports = MyPlugin;
```

### 在 .dumirc.ts 中使用

```typescript
const MyPlugin = require('./webpack-plugins/my-plugin');

export default defineConfig({
  chainWebpack(config) {
    config.plugin('my-plugin').use(MyPlugin, [
      {
        name: 'MyPlugin',
        // 其他选项
      },
    ]);
    return config;
  },
});
```

---

## 📚 Webpack 插件 Hooks 参考

### 常用 Hooks

| Hook | 触发时机 | 用途 |
|------|---------|------|
| **compile** | 编译开始 | 初始化、日志 |
| **done** | 编译完成 | 分析结果、报告 |
| **invalid** | 文件变更 | 监听变更 |
| **failed** | 编译失败 | 错误处理 |
| **compilation** | 创建编译对象 | 访问编译信息 |

### Hook 使用示例

```javascript
// 同步 Hook
compiler.hooks.compile.tap('PluginName', () => {
  console.log('编译开始');
});

// 异步 Hook
compiler.hooks.done.tapPromise('PluginName', async (stats) => {
  // 异步操作
  await someAsyncTask();
});

// 瀑布流 Hook
compiler.hooks.compilation.tapAsync('PluginName', (compilation, callback) => {
  // 处理编译
  callback();
});
```

---

## 🔍 调试技巧

### 1. 启用详细日志

```typescript
config.plugin('demo-plugin').use(DemoWebpackPlugin, [
  {
    name: 'DemoPlugin',
    verbose: true,  // 启用详细输出
  },
]);
```

### 2. 访问编译信息

```javascript
compiler.hooks.done.tap('DebugPlugin', (stats) => {
  console.log('编译统计:', {
    startTime: stats.startTime,
    endTime: stats.endTime,
    duration: stats.endTime - stats.startTime,
    hasErrors: stats.hasErrors(),
    hasWarnings: stats.hasWarnings(),
  });
});
```

### 3. 访问资源信息

```javascript
compiler.hooks.done.tap('DebugPlugin', (stats) => {
  const assets = stats.compilation.assets;
  for (const [name, asset] of Object.entries(assets)) {
    console.log(`${name}: ${asset.size()} bytes`);
  }
});
```

---

## 🎯 常见问题

### Q1: 插件在 dumi build 中也会运行吗？

**A:** 是的。如果你想只在开发时运行，可以检查环境变量：

```javascript
apply(compiler) {
  if (process.env.NODE_ENV === 'development') {
    // 仅在开发时运行
  }
}
```

### Q2: 如何禁用某个插件？

**A:** 注释掉或删除相应的 `config.plugin()` 调用：

```typescript
// config.plugin('demo-plugin').use(DemoWebpackPlugin, [...]);
```

### Q3: 插件的执行顺序重要吗？

**A:** 通常不重要，但如果插件之间有依赖关系，需要注意顺序。

### Q4: 如何在插件中访问 Dumi 配置？

**A:** 通过 compiler 的 options：

```javascript
apply(compiler) {
  const dumiConfig = compiler.options; // Dumi 配置
}
```

---

## 📊 插件对比

| 插件 | 功能 | 复杂度 | 推荐度 |
|------|------|--------|--------|
| **DemoWebpackPlugin** | 编译信息输出 | 低 | ⭐⭐⭐⭐⭐ |
| **AssetSizePlugin** | 资源大小分析 | 中 | ⭐⭐⭐⭐ |
| **自定义插件** | 自定义功能 | 高 | ⭐⭐⭐ |

---

## 🔗 相关资源

### 官方文档
- [Webpack Plugin API](https://webpack.js.org/api/plugins/)
- [webpack-chain](https://github.com/neutrinojs/webpack-chain)
- [Dumi 官方文档](https://d.umijs.org/)

### 参考文件
- `.dumirc.webpack-plugin-example.ts` - 完整配置示例
- `webpack-plugins/demo-plugin.js` - 演示插件源代码
- `webpack-plugins/asset-size-plugin.js` - 资源分析插件源代码

---

## 🎯 总结

| 问题 | 答案 |
|------|------|
| **如何添加 webpack 插件？** | 使用 `chainWebpack` 和 `config.plugin()` |
| **插件文件放在哪里？** | `webpack-plugins/` 目录 |
| **如何导入插件？** | `const Plugin = require('./webpack-plugins/...')` |
| **如何配置插件选项？** | 通过 `.use()` 的第二个参数 |
| **如何调试插件？** | 使用 `console.log` 和 `verbose` 选项 |
| **当前已配置的插件** | DemoWebpackPlugin、AssetSizePlugin |

---

**最后更新：** 2024年10月28日
**Dumi 版本：** 2.4.13
**Webpack 版本：** 5.x
