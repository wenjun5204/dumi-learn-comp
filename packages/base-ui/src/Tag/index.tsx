import React from 'react';

export interface TagProps {
  children?: React.ReactNode;
  color?: 'default' | 'success' | 'warning' | 'error' | 'info';
  closable?: boolean;
  onClose?: () => void;
}

const colorMap: Record<NonNullable<TagProps['color']>, string> = {
  default: 'tag-default',
  success: 'tag-success',
  warning: 'tag-warning',
  error: 'tag-error',
  info: 'tag-info',
};

export const Tag: React.FC<TagProps> = ({
  children,
  color = 'default',
  closable = false,
  onClose,
}) => {
  return (
    <span className={`tag ${colorMap[color]}`}>
      {children}
      {closable && (
        <button className="tag-close" onClick={onClose} type="button">
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;
