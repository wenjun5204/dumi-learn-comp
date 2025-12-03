
# Input 组件

输入框组件，用于用户输入。

## 基础用法

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => <Input placeholder="Please enter..." />;
```

## Props

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| placeholder | string | 占位符 | - |
| value | string | 输入框值 | - |
| onChange | (e) => void | 变更回调 | - |
| disabled | boolean | 是否禁用 | false |
| type | 'text' \| 'password' \| 'email' | 输入类型 | 'text' |
| size | 'large' \| 'middle' \| 'small' | 输入框大小 | 'middle' |

## 示例

### 基础输入框

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => <Input />;
```

### 密码输入框

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => <Input type="password" placeholder="Enter password" />;
```

### 禁用状态

```tsx
import { Input } from '@regan-ad/base-ui';

export default () => <Input disabled placeholder="Disabled" />;
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
