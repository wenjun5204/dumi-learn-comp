import React from 'react';
import { Button } from '@regan-ad/base-ui';

export interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  extra?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  extra,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{title}</h2>
        {subtitle && (
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#999' }}>
            {subtitle}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {extra}
        {onRefresh && (
          <Button type="default" onClick={onRefresh}>
            刷新
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
