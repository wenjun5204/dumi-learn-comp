

# Button 组件

按钮组件，用于触发操作。

## 基础用法

```tsx
import { Button } from '@regan-ad/base-ui';

export default () => <Button>Click me</Button>;
```

## Props

<API id="Button"></API>

## 示例

### 主要按钮

```tsx
import { Button } from '@regan-ad/base-ui';

export default () => <Button type="primary">Primary</Button>;
```

### 虚线按钮

```tsx
import { Button } from '@regan-ad/base-ui';

export default () => <Button type="dashed">Dashed</Button>;
```

### 禁用按钮

```tsx
import { Button } from '@regan-ad/base-ui';

export default () => <Button disabled>Disabled</Button>;
```

### 加载中

```tsx
import { Button } from '@regan-ad/base-ui';

export default () => <Button loading>Loading</Button>;
```

### 不同大小

```tsx
import { Button } from '@regan-ad/base-ui';

export default () => (
  <>
    <Button size="large">Large</Button>
    <Button size="middle">Middle</Button>
    <Button size="small">Small</Button>
  </>
);
```

## 样式

按钮支持以下样式类：

- `.btn` - 按钮基础样式
- `.btn-primary` - 主要按钮
- `.btn-dashed` - 虚线按钮
- `.btn-disabled` - 禁用状态
- `.btn-loading` - 加载状态
