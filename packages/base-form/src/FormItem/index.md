# FormItem 表单项

表单中的单项容器，包含标签和控件。

## 基础用法

```tsx
import { FormItem } from '@regan-ad/base-form';
import { Input } from '@regan-ad/base-ui';

export default () => (
  <FormItem label="用户名">
    <Input placeholder="请输入用户名" />
  </FormItem>
);
```

## 无标签

```tsx
import { FormItem } from '@regan-ad/base-form';
import { Input } from '@regan-ad/base-ui';

export default () => (
  <FormItem>
    <Input placeholder="无标签表单项" />
  </FormItem>
);
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| label | string | 标签文本 | - |
| name | string | 字段名 | - |
| children | ReactNode | 表单控件 | - |
