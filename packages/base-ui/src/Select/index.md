

# Select 组件

选择框组件，用于选择选项。

## 基础用法

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Please select...">
    <Select.Option value="option1">Option 1</Select.Option>
    <Select.Option value="option2">Option 2</Select.Option>
    <Select.Option value="option3">Option 3</Select.Option>
  </Select>
);
```

## Props

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| placeholder | string | 占位符 | - |
| value | string | 选中值 | - |
| onChange | (value) => void | 变更回调 | - |
| disabled | boolean | 是否禁用 | false |
| multiple | boolean | 多选 | false |
| size | 'large' \| 'middle' \| 'small' | 选择框大小 | 'middle' |

## 示例

### 基础选择框

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Please select...">
    <Select.Option value="option1">Option 1</Select.Option>
    <Select.Option value="option2">Option 2</Select.Option>
    <Select.Option value="option3">Option 3</Select.Option>
  </Select>
);
```

### 多选

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Please select..." multiple>
    <Select.Option value="option1">Option 1</Select.Option>
    <Select.Option value="option2">Option 2</Select.Option>
    <Select.Option value="option3">Option 3</Select.Option>
  </Select>
);
```

### 禁用状态

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Disabled" disabled>
    <Select.Option value="option1">Option 1</Select.Option>
    <Select.Option value="option2">Option 2</Select.Option>
  </Select>
);
```

### 不同大小

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <>
    <Select size="large" placeholder="Large">
      <Select.Option value="1">Option 1</Select.Option>
      <Select.Option value="2">Option 2</Select.Option>
    </Select>
    <Select size="middle" placeholder="Middle">
      <Select.Option value="1">Option 1</Select.Option>
      <Select.Option value="2">Option 2</Select.Option>
    </Select>
    <Select size="small" placeholder="Small">
      <Select.Option value="1">Option 1</Select.Option>
      <Select.Option value="2">Option 2</Select.Option>
    </Select>
  </>
);
