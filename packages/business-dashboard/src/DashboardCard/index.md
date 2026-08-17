# DashboardCard 数据卡片

用于展示关键指标的数据卡片。

## 基础用法

```tsx
import { DashboardCard } from '@regan-ad/business-dashboard';

export default () => (
  <DashboardCard title="总营收" value="128,392" unit="元" />
);
```

## 带趋势

```tsx
import { DashboardCard } from '@regan-ad/business-dashboard';

export default () => (
  <>
    <DashboardCard
      title="日活用户"
      value="32,841"
      trend="up"
      trendValue="12.5%"
    />
    <DashboardCard
      title="流失用户"
      value="1,203"
      trend="down"
      trendValue="8.3%"
    />
  </>
);
```

## 不同颜色

```tsx
import { DashboardCard } from '@regan-ad/business-dashboard';

export default () => (
  <>
    <DashboardCard title="默认" value="100" color="default" />
    <DashboardCard title="蓝色" value="200" color="blue" />
    <DashboardCard title="绿色" value="300" color="green" />
    <DashboardCard title="橙色" value="400" color="orange" />
    <DashboardCard title="红色" value="500" color="red" />
  </>
);
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| title | string | 标题 | - |
| value | `string \| number` | 数值 | - |
| unit | string | 单位 | - |
| trend | `'up' \| 'down'` | 趋势方向 | - |
| trendValue | string | 趋势值 | - |
| color | `'default' \| 'blue' \| 'green' \| 'orange' \| 'red'` | 卡片颜色 | `'default'` |
