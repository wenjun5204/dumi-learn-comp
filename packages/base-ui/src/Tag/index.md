# Tag 标签

用于标记、分类和选择。

## 基础用法

```tsx
import { Tag } from '@regan-ad/base-ui';

export default () => (
  <>
    <Tag>默认</Tag>
    <Tag color="success">成功</Tag>
    <Tag color="warning">警告</Tag>
    <Tag color="error">错误</Tag>
    <Tag color="info">信息</Tag>
  </>
);
```

## 可关闭

```tsx
import { Tag } from '@regan-ad/base-ui';

export default () => (
  <Tag closable onClose={() => alert('关闭了')}>
    可关闭标签
  </Tag>
);
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| children | ReactNode | 标签内容 | - |
| color | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | 标签颜色 | `'default'` |
| closable | boolean | 是否可关闭 | `false` |
| onClose | `() => void` | 关闭回调 | - |
