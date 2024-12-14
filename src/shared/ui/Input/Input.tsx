import React, { useState } from "react";
import styles from "./Input.module.scss";
import { themeStore } from "shared/store";
import { observer } from "mobx-react-lite";

interface InputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Добавлено onKeyPress
  type?: string;
}

export const Input: React.FC<InputProps> = observer(
  ({
    id,
    label,
    placeholder,
    value = "",
    onBlur,
    onChange,
    onKeyPress,
    type = "text",
    ...rest
  }) => {
    const [isFocused, setIsFocused] = useState(false);

    const themeClass = themeStore.theme === "dark" ? styles.dark : styles.light;

    return (
      <div className={`${styles.inputContainer} ${themeClass}`}>
        <input
          id={id}
          type={type}
          className={`${styles.input} ${
            isFocused || value ? styles.inputFocused : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => {
            setIsFocused(false);
            onBlur && onBlur();
          }}
          onFocus={() => setIsFocused(true)}
          onKeyPress={onKeyPress}
          {...rest}
        />
        {label && (
          <label
            htmlFor={id}
            className={`${styles.inputLabel} ${
              isFocused || value ? styles.inputLabelActive : ""
            }`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
