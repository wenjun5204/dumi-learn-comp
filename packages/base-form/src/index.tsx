import React from 'react';
import { Button } from '@regan-ad/base-ui';

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

export interface FormSubmitButtonProps {
  onSubmit?: () => void;
  text?: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  onSubmit,
  text = '提交',
}) => {
  return (
    <Button type="primary" onClick={onSubmit}>
      {text}
    </Button>
  );
};

export { FormItem as default };
