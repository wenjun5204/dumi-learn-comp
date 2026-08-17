# AdminHeader 管理头部

管理后台页面头部组件，包含标题、副标题和操作区。

## 基础用法

```tsx
import { AdminHeader } from '@regan-ad/business-admin';

export default () => (
  <AdminHeader title="用户管理" subtitle="管理系统用户列表" />
);
```

## 带刷新按钮

```tsx
import { AdminHeader } from '@regan-ad/business-admin';

export default () => (
  <AdminHeader
    title="订单列表"
    subtitle="查看所有订单信息"
    onRefresh={() => alert('刷新')}
  />
);
```

## 带额外操作

```tsx
import { AdminHeader } from '@regan-ad/business-admin';
import { Button } from '@regan-ad/base-ui';

export default () => (
  <AdminHeader
    title="商品管理"
    extra={<Button type="primary">新增商品</Button>}
  />
);
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| title | string | 标题 | - |
| subtitle | string | 副标题 | - |
| onRefresh | `() => void` | 刷新回调（传入则显示刷新按钮） | - |
| extra | ReactNode | 额外操作区 | - |
