import React from 'react';

export interface DashboardCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'default' | 'blue' | 'green' | 'orange' | 'red';
}

const colorStyles: Record<NonNullable<DashboardCardProps['color']>, React.CSSProperties> = {
  default: { background: '#fff', color: '#333' },
  blue: { background: '#e6f7ff', color: '#1890ff' },
  green: { background: '#f6ffed', color: '#52c41a' },
  orange: { background: '#fff7e6', color: '#fa8c16' },
  red: { background: '#fff1f0', color: '#ff4d4f' },
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  unit = '',
  trend,
  trendValue,
  color = 'default',
}) => {
  return (
    <div
      style={{
        ...colorStyles[color],
        padding: '20px 24px',
        borderRadius: 8,
        minWidth: 200,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>
        {value}
        {unit && (
          <span style={{ fontSize: 14, fontWeight: 400, marginLeft: 4 }}>{unit}</span>
        )}
      </div>
      {trend && trendValue && (
        <div
          style={{
            fontSize: 12,
            marginTop: 8,
            color: trend === 'up' ? '#52c41a' : '#ff4d4f',
          }}
        >
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
