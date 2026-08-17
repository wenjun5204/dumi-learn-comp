import React from 'react';
import { Button } from '@regan-ad/base-ui';

export interface DashboardPanelProps {
  title?: string;
  children?: React.ReactNode;
  onExport?: () => void;
  extra?: React.ReactNode;
  bordered?: boolean;
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({
  title,
  children,
  onExport,
  extra,
  bordered = true,
}) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        boxShadow: bordered ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
        border: bordered ? '1px solid #f0f0f0' : 'none',
        overflow: 'hidden',
      }}
    >
      {(title || onExport || extra) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{title}</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {extra}
            {onExport && (
              <Button type="dashed" onClick={onExport}>
                导出
              </Button>
            )}
          </div>
        </div>
      )}
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
};

export default DashboardPanel;
