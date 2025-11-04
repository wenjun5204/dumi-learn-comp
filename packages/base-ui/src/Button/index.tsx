import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'default' | 'dashed';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'default',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${type}`}
    >
      {children}
    </button>
  );
};

export default Button;
