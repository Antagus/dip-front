import React, { ReactNode, FormEvent } from "react";
import { ValidationInput } from "../ValidationInput";

interface ValidationInputProps {
  id: string;
  label: string;
  placeholder?: string;
  typeValidation?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
  required?: boolean;
}

interface FormProps {
  onSubmit: (data: Record<string, string>) => void;
  children: ReactNode;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const [formState, setFormState] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Общая функция для валидации
  const validateField = (
    id: string,
    value: string,
    typeValidation?: string,
    required?: boolean
  ): string => {
    if (required && !value.trim()) {
      return "Это поле обязательно для заполнения";
    }

    if (typeValidation === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
      if (!emailRegex.test(value)) {
        return "Введите корректный email";
      }
    }

    if (typeValidation === "password") {
      if (value.length < 6) {
        return "Пароль должен содержать минимум 8 символов";
      }
    }

    if (typeValidation === "names") {
      const nameRegex =
        /^(?!.*\s$)(?!.*--)(?!.*\.\.)(?!.*\s\s)[а-яА-ЯёЁ]+(?:[\s.-][а-яА-ЯёЁ]+)*$/;

      if (!nameRegex.test(value)) {
        return "Поле содержит недопустимые символы";
      }
    }

    return ""; // Нет ошибок
  };

  const handleChange = (id: string, value: string) => {
    setFormState((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Убираем ошибку при изменении значения
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Проверка всех полей
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement<ValidationInputProps>(child) &&
        child.type === ValidationInput
      ) {
        const { id, typeValidation, required } = child.props;
        const value = formState[id] || "";

        // Выполняем валидацию
        const error = validateField(id, value, typeValidation, required);
        if (error) {
          newErrors[id] = error;
        }
      }
    });

    // Если есть ошибки, не отправляем данные
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Отправляем данные, если ошибок нет
    onSubmit(formState);
  };

  const renderChildren = () =>
    React.Children.map(children, (child) => {
      if (
        React.isValidElement<ValidationInputProps>(child) &&
        child.type === ValidationInput
      ) {
        const { id, typeValidation, required } = child.props;

        return React.cloneElement(child, {
          value: formState[id] || "",
          onChange: (value: string) => handleChange(id, value),
          onBlur: () => {
            const error = validateField(
              id,
              formState[id] || "",
              typeValidation,
              required
            );
            setErrors((prev) => ({ ...prev, [id]: error }));
          },
          errorMessage: errors[id],
        });
      }

      return child;
    });

  return (
    <form style={{ padding: "0px 16px 0px 16px" }} onSubmit={handleSubmit}>
      {renderChildren()}
    </form>
  );
};
