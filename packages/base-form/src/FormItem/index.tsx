import React from 'react';

export interface FormItemProps {
  label?: string;
  name?: string;
  children?: React.ReactNode;
}

export const FormItem: React.FC<FormItemProps> = ({ label, children }) => {
  return (
    <div className="form-item">
      {label && <label className="form-item-label">{label}</label>}
      <div className="form-item-control">{children}</div>
    </div>
  );
};

export default FormItem;
