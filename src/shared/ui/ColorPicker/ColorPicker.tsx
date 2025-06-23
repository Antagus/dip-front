import React from "react";
import styles from "./ColorPicker.module.css";

type ColorPickerProps = {
  id?: string;
  presetColors: string[];
  selectedColor: string;
  allowCustom?: boolean;
  onChange: (color: string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  id,
  presetColors,
  selectedColor,
  allowCustom = false,
  onChange,
}) => {
  const inputId = id || "color-picker-input";

  const handlePresetClick = (color: string) => {
    onChange(color);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.swatches}>
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            className={`${styles.swatch} ${
              color === selectedColor ? styles.selected : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handlePresetClick(color)}
            aria-label={color}
          />
        ))}

        {allowCustom && (
          <label
            htmlFor={inputId}
            className={styles.customLabel}
            aria-label="Выбрать свой цвет"
          >
            <div
              className={styles.customSwatch}
              style={{ backgroundColor: selectedColor }}
            />
            <input
              id={inputId}
              type="color"
              value={selectedColor}
              onChange={handleCustomChange}
              className={styles.colorInput}
            />
          </label>
        )}
      </div>
    </div>
  );
};
