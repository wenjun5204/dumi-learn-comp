import React from 'react';

export interface SelectProps {
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface SelectOptionProps {
  value: string | number;
  children?: React.ReactNode;
}

export const SelectOption: React.FC<SelectOptionProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export const Select: React.FC<SelectProps> & { Option: typeof SelectOption } = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  children
}) => {
  return (
    <select
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className="select"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
};

Select.Option = SelectOption;

export default Select;
