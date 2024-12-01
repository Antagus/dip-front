import React, { useState } from "react";
import "./Input.module.css"; // Подключите CSS с вышеуказанными стилями

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="input-container">
      <input
        id={id}
        type={type}
        className={`input ${isFocused || value ? "input-focused" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label
        htmlFor={id}
        className={`input-label ${
          isFocused || value ? "input-label-active" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};
