import React, { type FC, type CSSProperties } from 'react';
import './index.css';

export interface ButtonProps {
  /** 按钮文本 */
  children?: React.ReactNode;
  /** 按钮颜色 */
  color?: string;
  /** 按钮大小: 'small' | 'medium' | 'large' */
  size?: 'small' | 'medium' | 'large';
  /** 按钮背景色 */
  backgroundColor?: string;
  /** 点击事件 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 按钮类型 */
  type?: 'button' | 'submit' | 'reset';
  /** 自定义 className */
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children = 'Button',
  color = '#ffffff',
  size = 'medium',
  backgroundColor = '#1890ff',
  onClick,
  disabled = false,
  style,
  type = 'button',
  className = '',
}) => {
  // 根据 size 获取对应的尺寸
  const sizeMap = {
    small: {
      padding: '4px 12px',
      fontSize: '12px',
      height: '24px',
      lineHeight: '24px',
    },
    medium: {
      padding: '8px 16px',
      fontSize: '14px',
      height: '32px',
      lineHeight: '32px',
    },
    large: {
      padding: '12px 24px',
      fontSize: '16px',
      height: '40px',
      lineHeight: '40px',
    },
  };

  const buttonStyle: CSSProperties = {
    ...sizeMap[size],
    color,
    backgroundColor,
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.3s ease',
    fontWeight: 500,
    ...style,
  };

  return (
    <button
      type={type}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      className={`regan-button ${className}`}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.85';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '1';
        }
      }}
    >
      {children}333
    </button>
  );
};

export default Button;
