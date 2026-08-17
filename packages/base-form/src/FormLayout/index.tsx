import React from 'react';
import { FormItem } from '../FormItem';
import { FormSubmitButton } from '../FormSubmitButton';

export interface FormLayoutProps {
  title?: string;
  layout?: 'horizontal' | 'vertical' | 'inline';
  children?: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  layout = 'vertical',
  children,
  onSubmit,
  submitText = '提交',
}) => {
  return (
    <div
      style={{
        display: layout === 'inline' ? 'flex' : 'block',
        flexDirection: layout === 'inline' ? 'row' : 'column',
        gap: layout === 'inline' ? 16 : 0,
        alignItems: layout === 'inline' ? 'flex-end' : 'stretch',
        flexWrap: layout === 'inline' ? 'wrap' : 'nowrap',
      }}
    >
      {title && (
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
          {title}
        </h3>
      )}
      {children}
      {onSubmit && (
        <FormItem>
          <FormSubmitButton onSubmit={onSubmit} text={submitText} />
        </FormItem>
      )}
    </div>
  );
};

export default FormLayout;
