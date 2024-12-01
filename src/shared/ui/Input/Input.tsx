import React, { useState } from "react";
import styles from "./Input.module.css";
import { themeStore } from "shared/store";

interface InputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
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

  const themeStyles =
    themeStore.theme === "dark"
      ? {
          "--background-color": "#222",
          "--text-color": "#fff",
          "--border-color": "#444",
          "--focus-color": "#427ba4",
        }
      : {
          "--background-color": "#fff",
          "--text-color": "#000",
          "--border-color": "#ccc",
          "--focus-color": "#0056b3",
        };

  return (
    <div
      style={themeStyles as React.CSSProperties}
      className={styles["input-container"]}
    >
      <input
        id={id}
        type={type}
        className={`${styles.input} ${
          isFocused || value ? styles["input-focused"] : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label
        htmlFor={id}
        className={`${styles["input-label"]} ${
          isFocused || value ? styles["input-label-active"] : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};
