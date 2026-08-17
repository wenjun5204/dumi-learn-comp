# FormSubmitButton 提交按钮

表单提交按钮，基于 Button 封装。

## 基础用法

```tsx
import { FormSubmitButton } from '@regan-ad/base-form';

export default () => <FormSubmitButton onSubmit={() => alert('提交')} />;
```

## 自定义文案

```tsx
import { FormSubmitButton } from '@regan-ad/base-form';

export default () => <FormSubmitButton text="保存" onSubmit={() => alert('保存')} />;
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| onSubmit | `() => void` | 提交回调 | - |
| text | string | 按钮文案 | `'提交'` |
