# TextArea 文本域

多行文本输入框，支持字数统计。

## 基础用法

```tsx
import { TextArea } from '@regan-ad/base-form';

export default () => <TextArea placeholder="请输入内容" />;
```

## 字数统计

```tsx
import { TextArea } from '@regan-ad/base-form';

export default () => (
  <TextArea
    placeholder="最多输入 100 字"
    showCount
    maxLength={100}
    rows={4}
  />
);
```

## 禁用状态

```tsx
import { TextArea } from '@regan-ad/base-form';

export default () => (
  <TextArea placeholder="禁用状态" disabled defaultValue="无法编辑的内容" />
);
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| placeholder | string | 占位符 | - |
| value | string | 值（受控） | - |
| defaultValue | string | 默认值（非受控） | - |
| onChange | `(value: string) => void` | 变更回调 | - |
| disabled | boolean | 是否禁用 | `false` |
| rows | number | 行数 | `4` |
| maxLength | number | 最大字数 | - |
| showCount | boolean | 是否显示字数统计 | `false` |
