import React from 'react';

export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  type = 'text'
}) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      type={type}
      className="input"
    />
  );
};

export default Input;
