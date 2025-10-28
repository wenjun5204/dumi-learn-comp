/**
 * 演示 Webpack 插件
 * 这是一个简单的示例插件，用于演示如何在 Dumi 中使用自定义 webpack 插件
 */

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

    // 1. 在编译开始时触发
    compiler.hooks.compile.tap(pluginName, () => {
      if (this.options.verbose) {
        console.log('\n✨ [DemoPlugin] 编译开始...');
      }
    });

    // 2. 在编译完成时触发
    compiler.hooks.done.tap(pluginName, (stats) => {
      if (this.options.verbose) {
        console.log('✅ [DemoPlugin] 编译完成！');
        console.log(`   总耗时: ${stats.endTime - stats.startTime}ms`);
        console.log(`   输出文件数: ${Object.keys(stats.compilation.assets).length}`);
      }
    });

    // 3. 在生成资源时触发
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // 在优化资源阶段
      compilation.hooks.optimizeAssets.tapPromise(
        pluginName,
        async (assets) => {
          if (this.options.verbose) {
            console.log(`   📦 处理资源: ${Object.keys(assets).length} 个文件`);
          }
        }
      );
    });

    // 4. 处理错误
    compiler.hooks.failed.tap(pluginName, (error) => {
      console.error(`❌ [DemoPlugin] 编译失败:`, error.message);
    });

    // 5. 处理无效
    compiler.hooks.invalid.tap(pluginName, (fileName, changeTime) => {
      if (this.options.verbose) {
        console.log(`🔄 [DemoPlugin] 文件变更: ${fileName}`);
      }
    });
  }
}

module.exports = DemoWebpackPlugin;
