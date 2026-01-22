import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { EmailIcon, PasswordIcon } from "../Icons/AuthIcons";

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  type?: "text" | "password" | "email";
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  icon,
  type = "text",
  error,
  className = "",
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`form-group ${error ? "has-error" : ""} ${className}`}>
      <label className="form-label">{label}</label>
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          className="form-input"
          aria-invalid={!!error}
          {...props}
        />
        {error && <span className="input-error">{error}</span>}
      </div>
    </div>
  );
};

export const EmailInput: React.FC<Omit<InputFieldProps, "icon" | "type">> = (props) => (
  <InputField type="email" icon={<EmailIcon />} {...props} />
);

export const PasswordInput: React.FC<Omit<InputFieldProps, "icon">> & {
  ToggleButton?: React.FC<{ isVisible: boolean; onClick: () => void }>;
} = ({ type = "password", ...props }) => <InputField type={type} icon={<PasswordIcon />} {...props} />;
