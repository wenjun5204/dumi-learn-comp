import React from 'react';
import { Button } from '@regan-ad/base-ui';

export interface AdminTableProps {
  columns: Array<{ title: string; dataIndex: string }>;
  dataSource: Array<Record<string, unknown>>;
  rowKey?: string;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  dataSource,
  rowKey = 'id',
}) => {
  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row, i) => (
            <tr key={String(row[rowKey] ?? i)}>
              {columns.map((col, j) => (
                <td key={j}>{String(row[col.dataIndex] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export interface AdminHeaderProps {
  title: string;
  onRefresh?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onRefresh }) => {
  return (
    <div className="admin-header">
      <h2>{title}</h2>
      {onRefresh && (
        <Button type="default" onClick={onRefresh}>
          刷新
        </Button>
      )}
    </div>
  );
};

export { AdminTable as default };
