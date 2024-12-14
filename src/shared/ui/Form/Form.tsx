import React, { ReactNode, FormEvent } from "react";
import { ValidationInput } from "../ValidationInput";

interface ValidationInputProps {
  id: string;
  label: string;
  placeholder?: string;
  typeValidation: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
}

interface FormProps {
  onSubmit: (data: Record<string, string>) => void; // Коллбэк для отправки формы
  children: ReactNode; // Дочерние компоненты
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const [formState, setFormState] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setFormState((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Убираем ошибку при корректном вводе
  };

  const handleBlur = (
    id: string,
    value: string,
    typeValidation: string,
    errorMessage?: string
  ) => {
    let error = "";
    if (!value.trim()) {
      error = "Это поле обязательно для заполнения";
    }
    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement<ValidationInputProps>(child) &&
        child.type === ValidationInput
      ) {
        const { id } = child.props;
        const value = formState[id] || "";

        if (!value.trim()) {
          newErrors[id] = "Это поле обязательно для заполнения";
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(formState);
    onSubmit(formState);
  };

  const renderChildren = () =>
    React.Children.map(children, (child) => {
      if (
        React.isValidElement<ValidationInputProps>(child) &&
        child.type === ValidationInput
      ) {
        const { id, typeValidation, errorMessage } = child.props;
        return React.cloneElement(child, {
          value: formState[id] || "",
          onChange: (value: string) => handleChange(id, value),
          onBlur: () => handleBlur(id, formState[id] || "", typeValidation),
          errorMessage: errors[id],
        } as ValidationInputProps); // Явное указание типа
      }

      if (
        React.isValidElement<
          React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
          >
        >(child) &&
        typeof child.type === "string" &&
        child.type === "Button"
      ) {
        return React.cloneElement(child, {
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            if (child.props.type === "submit") {
              handleSubmit(e as unknown as FormEvent);
            }
            if (child.props.onClick) {
              child.props.onClick(e);
            }
          },
        } as React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>);
      }

      return child; // Возвращаем любые другие компоненты без изменений
    });

  return <form onSubmit={handleSubmit}>{renderChildren()}</form>;
};
