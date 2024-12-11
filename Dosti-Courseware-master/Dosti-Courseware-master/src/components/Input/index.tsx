import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="form-input">
      {label && <label className="form-input__label">{label}</label>}
      <input className={`form-input__field ${className || ''} ${error ? 'form-input__field--error' : ''}`} {...props} />
      {error && <span className="form-input__error">{error}</span>}
    </div>
  );
};

export default FormInput;
