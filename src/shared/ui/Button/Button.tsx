import React from "react";
import { themeStore } from "shared/store";
import { observer } from "mobx-react-lite";

type Variant = "usual" | "filled" | "disabled";

type Props = {
  textButton?: string;
  variant?: Variant;
  children?: React.ReactNode;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = observer(
  ({
    textButton,
    variant = "usual",
    children,
    style,
    isLoading = false,
    disabled,
    ...rest
  }) => {
    // Определяем стили через Record
    const BUTTON_VARIANTS: Record<Variant, string> = {
      usual: "btn-usual",
      filled:
        themeStore.theme === "light" ? "btn-filled-lt" : "btn-filled-dark",
      disabled: "btn-disabled",
    };

    // Формируем класс кнопки
    const buttonClass = [
      "btn btn-shadow-dark",
      BUTTON_VARIANTS[variant],
      isLoading ? "btn-loading" : "",
    ]
      .filter(Boolean)
      .join(" ");

    // Содержимое кнопки
    const content = isLoading ? (
      <span className="spinner" aria-hidden="true"></span>
    ) : (
      children || textButton
    );

    return (
      <button
        className={buttonClass}
        style={style}
        disabled={isLoading || disabled}
        {...rest}
        aria-label={textButton}
        aria-busy={isLoading}
      >
        {content}
      </button>
    );
  }
);
