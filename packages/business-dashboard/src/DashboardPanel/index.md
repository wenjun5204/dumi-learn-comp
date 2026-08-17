# DashboardPanel 数据面板

数据大屏面板容器，包含标题栏和内容区。

## 基础用法

```tsx
import { DashboardPanel } from '@regan-ad/business-dashboard';

export default () => (
  <DashboardPanel title="销售概览">
    <p>这里是面板内容区域</p>
  </DashboardPanel>
);
```

## 带导出按钮

```tsx
import { DashboardPanel } from '@regan-ad/business-dashboard';

export default () => (
  <DashboardPanel
    title="月度报表"
    onExport={() => alert('导出中...')}
  >
    <p>报表数据</p>
  </DashboardPanel>
);
```

## 嵌套数据卡片

```tsx
import { DashboardPanel, DashboardCard } from '@regan-ad/business-dashboard';

export default () => (
  <DashboardPanel title="核心指标">
    <div style={{ display: 'flex', gap: 16 }}>
      <DashboardCard title="营收" value="99,821" unit="元" color="blue" />
      <DashboardCard title="订单" value="3,201" color="green" />
      <DashboardCard title="退款" value="58" color="orange" />
    </div>
  </DashboardPanel>
);
```

## API

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| title | string | 面板标题 | - |
| children | ReactNode | 面板内容 | - |
| onExport | `() => void` | 导出回调（传入则显示导出按钮） | - |
| extra | ReactNode | 额外操作区 | - |
| bordered | boolean | 是否显示边框 | `true` |
