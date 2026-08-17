import React from 'react';
import { Button } from '@regan-ad/base-ui';

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

export default FormSubmitButton;
