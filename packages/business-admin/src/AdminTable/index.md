# AdminTable 管理表格

管理后台数据表格组件，支持自定义列渲染。

## 基础用法

```tsx
import { AdminTable } from '@regan-ad/business-admin';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const data = [
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, address: '广州市天河区' },
];

export default () => (
  <AdminTable columns={columns} dataSource={data} rowKey="id" />
);
```

## 自定义渲染

```tsx
import { AdminTable } from '@regan-ad/business-admin';
import { Tag } from '@regan-ad/base-ui';

const columns = [
  { title: '订单号', dataIndex: 'orderNo' },
  { title: '金额', dataIndex: 'amount' },
  {
    title: '状态',
    dataIndex: 'status',
    render: (value: string) => {
      const color = value === '已完成' ? 'success' : value === '待支付' ? 'warning' : 'error';
      return <Tag color={color}>{value}</Tag>;
    },
  },
];

const data = [
  { id: 1, orderNo: 'DD001', amount: '¥199.00', status: '已完成' },
  { id: 2, orderNo: 'DD002', amount: '¥299.00', status: '待支付' },
  { id: 3, orderNo: 'DD003', amount: '¥99.00', status: '已取消' },
];

export default () => (
  <AdminTable columns={columns} dataSource={data} rowKey="id" />
);
```

## 空数据

```tsx
import { AdminTable } from '@regan-ad/business-admin';

export default () => (
  <AdminTable
    columns={[{ title: '姓名', dataIndex: 'name' }]}
    dataSource={[]}
  />
);
```

## API

### AdminTable

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| columns | `AdminTableColumn[]` | 列配置 | - |
| dataSource | `Record<string, any>[]` | 数据源 | `[]` |
| rowKey | string | 行唯一标识字段名 | `'id'` |
| emptyText | string | 空数据提示文案 | `'暂无数据'` |

### AdminTableColumn

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| title | string | 列标题 | - |
| dataIndex | string | 数据字段名 | - |
| width | `number \| string` | 列宽 | - |
| render | `(value, row, index) => ReactNode` | 自定义渲染函数 | - |
