# 可选的解决方案
RollupError: Node tried to load your configuration file as CommonJS even though it is likely an ES module

## 推荐方案 
将配置文件直接改为commonJs方案

其他可选方案
方案2：使用 .mjs 扩展名
sh


Apply
mv rollup.config.js rollup.config.mjs
方案3：在 package.json 中设置 type: module
json


Apply
{
  "type": "module"
}
方案4：使用 --bundleConfigAsCjs 标志
sh


Apply
rollup -c --bundleConfigAsCjs