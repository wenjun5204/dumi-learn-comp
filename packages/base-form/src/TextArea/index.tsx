import React, { useState } from 'react';

export interface TextAreaProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled = false,
  rows = 4,
  maxLength,
  showCount = false,
}) => {
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');

  const currentVal = value ?? innerValue;
  const count = currentVal.length;

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <textarea
        placeholder={placeholder}
        value={currentVal}
        onChange={(e) => {
          const val = e.target.value;
          setInnerValue(val);
          onChange?.(val);
        }}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          fontSize: 14,
          resize: 'vertical',
          outline: 'none',
          lineHeight: 1.5,
          boxSizing: 'border-box',
        }}
      />
      {showCount && (
        <span
          style={{
            position: 'absolute',
            bottom: 8,
            right: 12,
            fontSize: 12,
            color: '#999',
          }}
        >
          {count}
          {maxLength ? `/${maxLength}` : ''}
        </span>
      )}
    </div>
  );
};

export default TextArea;
