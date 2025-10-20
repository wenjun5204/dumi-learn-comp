# Foo

This is an example component.

```jsx
import { Foo } from 'regan-ad-comp ';

export default () => <Foo title="Hello dumi!" />
```


优化

包预置

对于加载成功率要求高的页面、直接将业务包预制到APP中、避免网络因素导致失败

包预下载

在APP启动时会下载首页及二级页面需要的包、业务需要进行预下载的包进行自定义

增量更新

包大小优化

通过treeShaking npm包大小分析

图片优化

使用类似阿里云oss的方式对图片进行宽度高度的限制

图片预下载

跨端性能列表

数据缓存

先进入页面、然后进行接口查询看是否进行了数据更新

接口预请求方案

端上可以直接在打开webview动作发起的时候进行前置接口预请求

纯html 的页面可以将请求前置、放置到Head中 与js资源进行并行加载

服务端渲染 ssr

CSR流程：HTML → JS → 数据请求 → 渲染 SSR流程：HTML(含数据) + JS并行加载

