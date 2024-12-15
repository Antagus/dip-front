import React, { useState } from "react";
import styles from "./ComboBox.module.scss";

type ComboBoxProps = {
  options: string[];
  value?: string; // Управляемое значение
  onChange?: (value: string) => void; // Callback для обновления значения
  placeholder?: string;
  label?: string;
};

export const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  value: controlledValue,
  onChange,
  placeholder = "Выберите значение",
  label,
}) => {
  const [internalValue, setInternalValue] = useState<string>(""); // Внутреннее состояние
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const value = controlledValue ?? internalValue; // Используем управляемое или внутреннее значение

  const handleSelect = (option: string) => {
    console.log("handleSelect called with:", option); // Проверка вызова
    setInternalValue(option); // Обновляем внутреннее состояние
    onChange?.(option); // Вызываем callback, если он передан
    setIsOpen(false); // Закрываем список
    setIsFocused(true); // Устанавливаем фокус для label
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = () => setIsOpen(false);

  return (
    <div
      className={`${styles.comboBoxContainer} ${
        isFocused ? styles.inputFocused : ""
      }`}
      onBlur={closeDropdown} // Закрытие списка при потере фокуса
    >
      {label && (
        <label
          className={`${styles.comboBoxLabel} ${
            isFocused || value ? styles.inputLabelActive : ""
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={styles.comboBoxInput}
        tabIndex={0}
        onClick={toggleDropdown} // Открытие/закрытие списка
        onFocus={() => setIsFocused(true)}
        style={{ border: "1px solid black" }}
      >
        {value || <span className={styles.placeholder}>{placeholder}</span>}
        <span className={styles.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <ul className={styles.comboBoxOptions}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`${styles.option} ${
                value === option ? styles.selectedOption : ""
              }`}
              onMouseDown={(e) => e.preventDefault()} // Предотвращение потери фокуса
              onClick={() => handleSelect(option)} // Выбор элемента
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
