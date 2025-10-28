# chainWebpack 完整参考指南

## 📖 概述

`chainWebpack` 是 Dumi（基于 Umi）提供的一个强大的 webpack 配置修改接口。它使用 `webpack-chain` 库，提供了链式 API 来修改 webpack 配置。

---

## 🎯 基本语法

### 基本结构

```typescript
export default defineConfig({
  chainWebpack(config) {
    // 修改 webpack 配置
    // ...
    return config;
  },
});
```

### 链式调用

```typescript
config
  .module
  .rule('css')
  .test(/\.css$/i)
  .use('css-loader')
  .loader('css-loader')
  .options({ /* 选项 */ })
  .end()  // 返回到 rule
  .use('postcss-loader')
  .loader('postcss-loader')
  .end();  // 返回到 rule
```

---

## 🔧 常用操作

### 1. 修改 Module Rules（Loader）

#### 获取或创建规则

```typescript
// 获取现有规则
const cssRule = config.module.rule('css');

// 创建新规则
config.module.rule('custom').test(/\.custom$/);
```

#### 配置 Loader

```typescript
config.module
  .rule('css')
  .test(/\.css$/i)
  .use('css-loader')
  .loader('css-loader')
  .options({
    modules: {
      auto: true,
      localIdentName: '[local]_[hash:base64:5]',
    },
  })
  .end();
```

#### 清空 Loader

```typescript
// 清空所有 loader
config.module.rule('css').uses.clear();

// 删除特定 loader
config.module.rule('css').uses.delete('style-loader');
```

### 2. 添加 Webpack 插件

#### 基本用法

```typescript
config.plugin('plugin-name').use(PluginClass, [
  {
    // 插件选项
  },
]);
```

#### 完整示例

```typescript
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

config.plugin('mini-css-extract').use(MiniCssExtractPlugin, [
  {
    filename: '[name].css',
    chunkFilename: '[name].chunk.css',
  },
]);
```

#### 删除插件

```typescript
config.plugins.delete('plugin-name');
```

### 3. 修改输出配置

```typescript
config.output
  .path('./dist')
  .filename('[name].[contenthash:8].js')
  .chunkFilename('[name].[contenthash:8].chunk.js')
  .publicPath('/');
```

### 4. 修改入口

```typescript
// 设置入口
config.entry('main').add('./src/index.ts');

// 添加多个入口
config.entry('main').add('./src/index.ts');
config.entry('vendor').add('./src/vendor.ts');
```

### 5. 配置解析

```typescript
// 添加别名
config.resolve.alias.set('@components', path.resolve(__dirname, './src/components'));
config.resolve.alias.set('@utils', path.resolve(__dirname, './src/utils'));

// 配置扩展名
config.resolve.extensions.add('.ts').add('.tsx');

// 配置模块目录
config.resolve.modules.add('node_modules');
```

### 6. 修改开发服务器

```typescript
config.devServer
  .set('port', 8000)
  .set('host', 'localhost')
  .set('hot', true)
  .set('compress', true)
  .set('historyApiFallback', true);
```

### 7. 配置优化

```typescript
config.optimization
  .minimize(true)
  .splitChunks({
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: 10,
      },
    },
  });
```

---

## 📋 完整 API 参考

### Module Rules

```typescript
// 获取规则
config.module.rule('css')

// 配置规则
.test(/\.css$/i)
.include.add(path.resolve(__dirname, 'src')).end()
.exclude.add(path.resolve(__dirname, 'node_modules')).end()

// 添加 Loader
.use('css-loader')
  .loader('css-loader')
  .options({ /* 选项 */ })
  .end()

// 返回到规则
.end()

// 删除规则
config.module.rules.delete('css')
```

### Plugins

```typescript
// 添加插件
config.plugin('name').use(PluginClass, [options])

// 获取插件
config.plugin('name')

// 删除插件
config.plugins.delete('name')

// 修改插件选项
config.plugin('name').tap(options => {
  options[0].newOption = 'value';
  return options;
})
```

### Output

```typescript
config.output
  .path(path)
  .filename(filename)
  .chunkFilename(chunkFilename)
  .publicPath(publicPath)
  .library(library)
  .libraryTarget(libraryTarget)
  .sourceMapFilename(sourceMapFilename)
```

### Entry

```typescript
config.entry('name')
  .add(path)
  .add(path2)
  .delete(path)
  .clear()
```

### Resolve

```typescript
config.resolve
  .alias.set(key, value).end()
  .extensions.add(ext).end()
  .modules.add(module).end()
  .mainFields.add(field).end()
```

### DevServer

```typescript
config.devServer
  .set(key, value)
  .before(fn)
  .after(fn)
  .proxy(proxyConfig)
```

---

## 🎓 实际示例

### 示例 1：配置 CSS Loader 链

```typescript
chainWebpack(config) {
  const cssRule = config.module.rule('css');

  cssRule
    .test(/\.css$/i)
    .use('style-loader')
    .loader('style-loader')
    .end()
    .use('css-loader')
    .loader('css-loader')
    .options({
      modules: {
        auto: true,
        localIdentName: '[local]_[hash:base64:5]',
      },
    })
    .end()
    .use('postcss-loader')
    .loader('postcss-loader')
    .options({
      postcssOptions: {
        plugins: [['postcss-preset-env', {}]],
      },
    })
    .end();

  return config;
}
```

### 示例 2：添加多个插件

```typescript
chainWebpack(config) {
  // 添加 MiniCssExtractPlugin
  config.plugin('mini-css-extract').use(MiniCssExtractPlugin, [
    {
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    },
  ]);

  // 添加自定义插件
  config.plugin('demo-plugin').use(DemoWebpackPlugin, [
    {
      name: 'DemoPlugin',
      verbose: true,
    },
  ]);

  // 添加资源分析插件
  config.plugin('asset-size-plugin').use(AssetSizePlugin, [
    {
      threshold: 100 * 1024,
      verbose: true,
    },
  ]);

  return config;
}
```

### 示例 3：配置别名和扩展名

```typescript
chainWebpack(config) {
  // 添加别名
  config.resolve.alias
    .set('@components', path.resolve(__dirname, './src/components'))
    .set('@utils', path.resolve(__dirname, './src/utils'))
    .set('@styles', path.resolve(__dirname, './src/styles'));

  // 添加扩展名
  config.resolve.extensions
    .add('.ts')
    .add('.tsx')
    .add('.js')
    .add('.jsx');

  return config;
}
```

### 示例 4：修改输出配置

```typescript
chainWebpack(config) {
  config.output
    .filename('[name].[contenthash:8].js')
    .chunkFilename('[name].[contenthash:8].chunk.js')
    .publicPath('/');

  config.optimization
    .minimize(true)
    .splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });

  return config;
}
```

---

## 🔍 调试技巧

### 1. 查看当前配置

```typescript
chainWebpack(config) {
  // 输出当前配置
  console.log(config.toConfig());
  return config;
}
```

### 2. 条件配置

```typescript
chainWebpack(config) {
  if (process.env.NODE_ENV === 'development') {
    // 仅在开发时应用
    config.devtool('cheap-module-source-map');
  }

  if (process.env.NODE_ENV === 'production') {
    // 仅在生产时应用
    config.optimization.minimize(true);
  }

  return config;
}
```

### 3. 检查规则是否存在

```typescript
chainWebpack(config) {
  if (config.module.rules.has('css')) {
    // CSS 规则存在
    config.module.rule('css').use('css-loader').loader('css-loader');
  }

  return config;
}
```

---

## ⚠️ 常见错误

### 错误 1：忘记 .end()

```typescript
// ❌ 错误
config.module.rule('css')
  .use('css-loader')
  .loader('css-loader')
  .use('postcss-loader')  // 错误！应该先 .end()

// ✅ 正确
config.module.rule('css')
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .end()
```

### 错误 2：忘记返回 config

```typescript
// ❌ 错误
chainWebpack(config) {
  config.plugin('demo').use(DemoPlugin);
  // 忘记返回
}

// ✅ 正确
chainWebpack(config) {
  config.plugin('demo').use(DemoPlugin);
  return config;
}
```

### 错误 3：修改不存在的规则

```typescript
// ❌ 错误
config.module.rule('nonexistent').use('loader').loader('loader');

// ✅ 正确
if (config.module.rules.has('css')) {
  config.module.rule('css').use('loader').loader('loader');
}
```

---

## 📊 chainWebpack vs modifyConfig

| 特性 | chainWebpack | modifyConfig |
|------|-------------|-------------|
| **易用性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **灵活性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **链式 API** | ✅ | ❌ |
| **完整配置访问** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **推荐度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🎯 最佳实践

### 1. 使用有意义的名称

```typescript
// ✅ 好
config.plugin('demo-plugin').use(DemoPlugin);
config.rule('custom-css').test(/\.custom\.css$/);

// ❌ 不好
config.plugin('p1').use(DemoPlugin);
config.rule('r1').test(/\.custom\.css$/);
```

### 2. 检查规则是否存在

```typescript
// ✅ 好
if (config.module.rules.has('css')) {
  config.module.rule('css').use('loader').loader('loader');
}

// ❌ 不好
config.module.rule('css').use('loader').loader('loader');
```

### 3. 使用条件配置

```typescript
// ✅ 好
chainWebpack(config) {
  if (process.env.NODE_ENV === 'development') {
    config.devtool('cheap-module-source-map');
  }
  return config;
}

// ❌ 不好
chainWebpack(config) {
  config.devtool('cheap-module-source-map');
  return config;
}
```

### 4. 添加注释

```typescript
// ✅ 好
chainWebpack(config) {
  // 配置 CSS Loader
  config.module.rule('css').use('css-loader').loader('css-loader');

  // 添加自定义插件
  config.plugin('demo').use(DemoPlugin);

  return config;
}
```

---

## 🔗 相关资源

### 官方文档
- [webpack-chain](https://github.com/neutrinojs/webpack-chain)
- [Webpack Configuration](https://webpack.js.org/configuration/)
- [Dumi 官方文档](https://d.umijs.org/)

### 项目文件
- `.dumirc.ts` - 当前配置
- `.dumirc.webpack-plugin-example.ts` - 完整示例
- `docs/config/WEBPACK_PLUGIN_GUIDE.md` - 插件指南

---

## 🎯 总结

| 问题 | 答案 |
|------|------|
| **什么是 chainWebpack？** | Dumi 提供的 webpack 配置修改接口 |
| **如何使用？** | 在 defineConfig 中定义 chainWebpack 函数 |
| **如何添加 Loader？** | 使用 `config.module.rule().use().loader()` |
| **如何添加插件？** | 使用 `config.plugin().use()` |
| **如何修改输出？** | 使用 `config.output` |
| **如何添加别名？** | 使用 `config.resolve.alias.set()` |
| **必须返回 config 吗？** | 是的，必须返回修改后的 config |

---

**最后更新：** 2024年10月28日
**Dumi 版本：** 2.4.13
**webpack-chain 版本：** 6.x
