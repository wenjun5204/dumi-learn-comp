import React from 'react';

export interface AdminTableColumn {
  title: string;
  dataIndex: string;
  width?: number | string;
  render?: (value: any, row: Record<string, unknown>, index: number) => React.ReactNode;
}

export interface AdminTableProps {
  columns: AdminTableColumn[];
  dataSource: Array<Record<string, unknown>>;
  rowKey?: string;
  emptyText?: string;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  dataSource,
  rowKey = 'id',
  emptyText = '暂无数据',
}) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 14,
        }}
      >
        <thead>
          <tr style={{ background: '#fafafa' }}>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 500,
                  borderBottom: '1px solid #f0f0f0',
                  width: col.width,
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: '32px 16px',
                  textAlign: 'center',
                  color: '#999',
                }}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            dataSource.map((row, rowIndex) => (
              <tr
                key={String(row[rowKey] ?? rowIndex)}
                style={{ transition: 'background 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fafafa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '';
                }}
              >
                {columns.map((col, colIndex) => {
                  const value = row[col.dataIndex];
                  return (
                    <td
                      key={colIndex}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {col.render
                        ? col.render(value, row, rowIndex)
                        : String(value ?? '')}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
