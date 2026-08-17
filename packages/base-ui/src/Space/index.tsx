import React from 'react';

export interface SpaceProps {
  children?: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'middle' | 'large';
  align?: 'start' | 'center' | 'end';
  wrap?: boolean;
}

const sizeMap = {
  small: '8px',
  middle: '16px',
  large: '24px',
};

export const Space: React.FC<SpaceProps> = ({
  children,
  direction = 'horizontal',
  size = 'middle',
  align = 'center',
  wrap = false,
}) => {
  const gap = sizeMap[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap',
      }}
    >
      {children}
    </div>
  );
};

export default Space;
