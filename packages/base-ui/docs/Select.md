---
title: Select 组件
---

# Select 组件

选择框组件，用于选择选项。

## 基础用法

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Select an option">
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
    <Select.Option value="3">Option 3</Select.Option>
  </Select>
);
```

## Props

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| placeholder | string | 占位符 | - |
| value | string \| number | 选中值 | - |
| onChange | (value: string \| number) => void | 变更回调 | - |
| disabled | boolean | 是否禁用 | false |
| multiple | boolean | 是否多选 | false |
| size | 'large' \| 'middle' \| 'small' | 选择框大小 | 'middle' |
| options | Option[] | 选项列表 | - |
| clearable | boolean | 是否可清空 | false |

## 示例

### 基础选择框

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Select an option">
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
    <Select.Option value="3">Option 3</Select.Option>
  </Select>
);
```

### 禁用选择框

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Disabled" disabled>
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
  </Select>
);
```

### 多选

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Select options" multiple>
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
    <Select.Option value="3">Option 3</Select.Option>
  </Select>
);
```

### 可清空

```tsx
import { Select } from '@regan-ad/base-ui';

export default () => (
  <Select placeholder="Select an option" clearable>
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
    <Select.Option value="3">Option 3</Select.Option>
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
    </Select>
    <Select size="middle" placeholder="Middle">
      <Select.Option value="1">Option 1</Select.Option>
    </Select>
    <Select size="small" placeholder="Small">
      <Select.Option value="1">Option 1</Select.Option>
    </Select>
  </>
);
```

## 样式

选择框支持以下样式类：

- `.select` - 选择框基础样式
- `.select-disabled` - 禁用状态
- `.select-open` - 打开状态
- `.select-multiple` - 多选状态
