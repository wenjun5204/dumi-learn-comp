---
title: Input 组件
---

# Input 组件

输入框组件，用于用户输入。

## 基础用法

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => <Input placeholder="Enter text" />;
```

## Props

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| placeholder | string | 占位符 | - |
| value | string | 输入值 | - |
| onChange | (value: string) => void | 变更回调 | - |
| disabled | boolean | 是否禁用 | false |
| type | string | 输入类型 | 'text' |
| size | 'large' \| 'middle' \| 'small' | 输入框大小 | 'middle' |
| maxLength | number | 最大长度 | - |
| prefix | ReactNode | 前缀 | - |
| suffix | ReactNode | 后缀 | - |

## 示例

### 基础输入框

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => <Input placeholder="Enter text" />;
```

### 禁用输入框

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => <Input placeholder="Disabled" disabled />;
```

### 不同大小

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => (
  <>
    <Input size="large" placeholder="Large" />
    <Input size="middle" placeholder="Middle" />
    <Input size="small" placeholder="Small" />
  </>
);
```

### 带前缀和后缀

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => (
  <>
    <Input prefix="$" placeholder="Price" />
    <Input suffix="@" placeholder="Email" />
  </>
);
```

### 密码输入框

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => <Input type="password" placeholder="Enter password" />;
```

## 样式

输入框支持以下样式类：

- `.input` - 输入框基础样式
- `.input-disabled` - 禁用状态
- `.input-focus` - 焦点状态
- `.input-error` - 错误状态
