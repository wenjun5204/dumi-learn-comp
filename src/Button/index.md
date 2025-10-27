# Button

一个功能完整的按钮组件，支持自定义色值、大小、禁用状态等。

## 基础用法

```jsx
import Button from '@compiled/Button/index.js'

export default () => <Button>Click me</Button>
```

## 自定义颜色

```jsx
import Button from './index.tsx';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button backgroundColor="#1890ff">蓝色按钮</Button>
    <Button backgroundColor="#52c41a">绿色按钮</Button>
    <Button backgroundColor="#ff4d4f">红色按钮</Button>
    <Button backgroundColor="#faad14">橙色按钮</Button>
    <Button backgroundColor="#722ed1">紫色按钮</Button>
  </div>
)
```

## 自定义大小

```jsx
import Button from './index.tsx';

export default () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <Button size="small">小按钮</Button>
    <Button size="medium">中按钮</Button>
    <Button size="large">大按钮</Button>
  </div>
)
```

## 禁用状态

```jsx
import Button from './index.tsx';

export default () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button>正常按钮</Button>
    <Button disabled>禁用按钮</Button>
  </div>
)
```

## 组合使用

```jsx
import Button from './index.tsx';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button size="small" backgroundColor="#1890ff">小蓝按钮</Button>
    <Button size="medium" backgroundColor="#52c41a">中绿按钮</Button>
    <Button size="large" backgroundColor="#ff4d4f">大红按钮</Button>
    <Button size="large" backgroundColor="#faad14" disabled>禁用橙按钮</Button>
  </div>
)
```

## 自定义文本颜色22

```jsx
import Button from '@compiled/Button/index.js'

export default () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button backgroundColor="#000" color="#fff">黑底白字</Button>
    <Button backgroundColor="#fff" color="#000" style={{ border: '1px solid #000' }}>白底黑字</Button>
  </div>
)
```

<API id="Button"></API>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| children | 按钮文本 | ReactNode | 'Button' |
| color | 文字颜色 | string | '#ffffff' |
| size | 按钮大小 | 'small' \| 'medium' \| 'large' | 'medium' |
| backgroundColor | 背景色 | string | '#1890ff' |
| onClick | 点击事件 | (e: MouseEvent) => void | - |
| disabled | 是否禁用 | boolean | false |
| style | 自定义样式 | CSSProperties | - |
| type | 按钮类型 | 'button' \| 'submit' \| 'reset' | 'button' |
| className | 自定义类名 | string | '' |
