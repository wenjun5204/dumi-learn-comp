import React from 'react';
import { Button } from '@regan-ad/base-ui';

export interface DashboardCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  unit = '',
}) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-title">{title}</div>
      <div className="dashboard-card-value">
        {value}
        {unit && <span className="dashboard-card-unit">{unit}</span>}
      </div>
    </div>
  );
};

export interface DashboardPanelProps {
  title?: string;
  children?: React.ReactNode;
  onExport?: () => void;
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({
  title,
  children,
  onExport,
}) => {
  return (
    <div className="dashboard-panel">
      {title && (
        <div className="dashboard-panel-header">
          <h3>{title}</h3>
          {onExport && (
            <Button type="dashed" onClick={onExport}>
              导出
            </Button>
          )}
        </div>
      )}
      <div className="dashboard-panel-body">{children}</div>
    </div>
  );
};

export { DashboardCard as default };
