# Space 间距

设置组件之间的间距。

## 基础用法

```tsx
import { Space, Button } from '@regan-ad/base-ui';

export default () => (
  <Space>
    <Button>按钮 A</Button>
    <Button type="primary">按钮 B</Button>
    <Button type="dashed">按钮 C</Button>
  </Space>
);
```

## 垂直方向

```tsx
import { Space, Button } from '@regan-ad/base-ui';

export default () => (
  <Space direction="vertical">
    <Button>按钮 A</Button>
    <Button type="primary">按钮 B</Button>
    <Button type="dashed">按钮 C</Button>
  </Space>
);
```

## 间距大小

```tsx
import { Space, Tag } from '@regan-ad/base-ui';

export default () => (
  <>
    <Space size="small">
      <Tag>Small</Tag>
      <Tag>Small</Tag>
    </Space>
    <br />
    <Space size="middle">
      <Tag>Middle</Tag>
      <Tag>Middle</Tag>
    </Space>
    <br />
    <Space size="large">
      <Tag>Large</Tag>
      <Tag>Large</Tag>
    </Space>
  </>
);
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| children | ReactNode | 内容 | - |
| direction | `'horizontal' \| 'vertical'` | 间距方向 | `'horizontal'` |
| size | `'small' \| 'middle' \| 'large'` | 间距大小 | `'middle'` |
| align | `'start' \| 'center' \| 'end'` | 对齐方式 | `'center'` |
| wrap | boolean | 是否换行 | `false` |
