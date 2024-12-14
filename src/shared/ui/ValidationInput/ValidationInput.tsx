import React, { useState } from "react";
import { Input } from "../Input/Input";
import styles from "./ValidationInput.module.scss";

type ValidationType = "email" | "password" | "required" | "names";

interface ValidationInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  typeValidation: ValidationType; // Тип валидации
  errorMessage?: string; // Кастомное сообщение об ошибке
}

export const ValidationInput: React.FC<ValidationInputProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  typeValidation,
  errorMessage,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string): string | null => {
    switch (typeValidation) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
        return emailRegex.test(value)
          ? null
          : errorMessage || "Введите корректный email";
      case "password":
        return value.length >= 8
          ? null
          : errorMessage || "Пароль должен содержать минимум 8 символов";
      case "required":
        return value.trim()
          ? null
          : errorMessage || "Это поле обязательно для заполнения";
      case "names":
        const fioRegex =
          /^(?!.*\s$)(?!.*--)(?!.*\.\.)(?!.*\s\s)[а-яА-ЯёЁ]+(?:[\s.-][а-яА-ЯёЁ]+)*$/;
        return fioRegex.test(value)
          ? null
          : errorMessage || "Заполните поле корректно";
      default:
        return null;
    }
  };

  // Ограничение вводимых символов
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedCharacters = getAllowedCharacters(typeValidation);
    if (!allowedCharacters.test(e.key)) {
      e.preventDefault(); // Блокируем символ, который не входит в допустимый список
    }
  };

  const getAllowedCharacters = (typeValidation: ValidationType): RegExp => {
    switch (typeValidation) {
      case "email":
        return /^[a-zA-Z0-9@._-]$/;
      case "password":
        return /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]$/;
      case "required":
        return /^[a-zA-Z0-9 ]$/;
      case "names":
        return /^[а-яА-ЯёЁ.\s-]$/;
      default:
        return /.*/;
    }
  };

  const handleBlur = () => {
    const validationError = validate(value);
    setError(validationError);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (error) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  };

  return (
    <section className={styles.validationInputContainer}>
      <Input
        id={id}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        type={type}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </section>
  );
};
