/**
 * 资源大小分析插件
 * 用于分析和报告 webpack 构建输出的资源大小
 */

class AssetSizePlugin {
  constructor(options = {}) {
    this.options = {
      name: 'AssetSizePlugin',
      threshold: 100 * 1024, // 100KB 阈值
      verbose: true,
      ...options,
    };
  }

  apply(compiler) {
    const pluginName = this.options.name;
    const threshold = this.options.threshold;

    compiler.hooks.done.tap(pluginName, (stats) => {
      const assets = stats.compilation.assets;
      const assetList = [];

      // 收集所有资源信息
      for (const [name, asset] of Object.entries(assets)) {
        const size = asset.size();
        assetList.push({
          name,
          size,
          sizeKB: (size / 1024).toFixed(2),
          isLarge: size > threshold,
        });
      }

      // 按大小排序
      assetList.sort((a, b) => b.size - a.size);

      if (this.options.verbose) {
        console.log('\n📊 [AssetSizePlugin] 资源大小分析:');
        console.log('━'.repeat(60));

        let totalSize = 0;
        assetList.forEach((asset) => {
          totalSize += asset.size;
          const icon = asset.isLarge ? '⚠️ ' : '✅';
          const sizeStr = asset.sizeKB.padStart(10);
          console.log(`${icon} ${asset.name.padEnd(40)} ${sizeStr} KB`);
        });

        console.log('━'.repeat(60));
        console.log(`📈 总大小: ${(totalSize / 1024).toFixed(2)} KB`);
        console.log(`⚠️  超过阈值 (${(threshold / 1024).toFixed(0)} KB) 的文件: ${assetList.filter((a) => a.isLarge).length} 个`);
        console.log('');
      }
    });
  }
}

module.exports = AssetSizePlugin;
