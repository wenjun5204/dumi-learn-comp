# FormLayout 表单布局

提供表单整体布局容器，支持垂直、水平、内联三种布局模式。

## 垂直布局

```tsx
import { FormLayout, FormItem } from '@regan-ad/base-form';
import { Input } from '@regan-ad/base-ui';

export default () => (
  <FormLayout title="用户信息" onSubmit={() => alert('提交')}>
    <FormItem label="姓名">
      <Input placeholder="请输入姓名" />
    </FormItem>
    <FormItem label="邮箱">
      <Input placeholder="请输入邮箱" type="email" />
    </FormItem>
  </FormLayout>
);
```

## 内联布局

```tsx
import { FormLayout, FormItem } from '@regan-ad/base-form';
import { Input, Button } from '@regan-ad/base-ui';

export default () => (
  <FormLayout layout="inline" submitText="搜索">
    <FormItem label="关键词">
      <Input placeholder="搜索关键词" />
    </FormItem>
    <FormItem label="状态">
      <Input placeholder="状态" />
    </FormItem>
  </FormLayout>
);
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| title | string | 表单标题 | - |
| layout | `'horizontal' \| 'vertical' \| 'inline'` | 布局方式 | `'vertical'` |
| children | ReactNode | 表单内容 | - |
| onSubmit | `() => void` | 提交回调（传入则显示提交按钮） | - |
| submitText | string | 提交按钮文案 | `'提交'` |
