This is a guide example.


## 优化特点 
### cdn 引入
- 直接在webpack 中 直接将依赖编译体积比较大的库、 采用cdn 引入 减少打包体积
- 首屏性能优化
### 代码分割
- 路由懒加载 （更细粒度的代码维度、 减小初始加载包体积：只加载首屏必需的组件代码，其他组件按需加载）
- 动态import 如使用react lazy 函数

### 打包分析
- 打包体积分析 （包体积分析工具 webpack-budle-analyzer） 
- 打包速度分析

### babel 插件 配置
- babel-plugin-import 配置用于实现按需加载，进一步优化打包体积


