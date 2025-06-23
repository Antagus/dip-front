import React, { useState } from "react";
import { createTransaction } from "shared/api";
import { createCategory } from "shared/api/category";
import { useDevice } from "shared/hooks";
import { globalStore } from "shared/store/globalStore";
import {
  Button,
  ComboBox,
  Form,
  Modal,
  Row,
  StickySection,
  ValidationInput,
  ColorPicker,
} from "shared/ui";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const CategoryForm: React.FC<Props> = ({ onClose, isOpen }) => {
  const { isMobile } = useDevice();
  const [nameCategory, setNameCategory] = useState("");
  const [categoryType, setCategoryType] = useState<"Расход" | "Доход">(
    "Расход"
  );
  // Выбранный цвет
  const presetColors = [
    "#FF8A80",
    "#FFD180",
    "#FFFF8D",
    "#CCFF90",
    "#80D8FF",
    "#B388FF",
    "#F8BBD0",
  ];
  const [color, setColor] = useState<string>(presetColors[0]);

  const handleSubmit = async (data: Record<string, string>) => {
    createCategory(globalStore.user, data.name, color, categoryType);
    globalStore.reloadUpdateState();
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} nameModal="Добавить категорию">
      <Form
        onSubmit={handleSubmit}
        padding={isMobile ? "16px 0px 100px 0px" : "16px 0px 0px 0px"}
      >
        <ValidationInput
          id="name"
          value={nameCategory}
          onChange={setNameCategory}
          typeValidation="required"
          label="Название категории"
          required
        />

        <Row padding="16px 0px">
          <ComboBox
            options={["Расход", "Доход"]}
            value={categoryType}
            onChange={(value) =>
              setCategoryType(value === "Расход" ? "Расход" : "Доход")
            }
            placeholder=""
            label="Тип операции"
          />
        </Row>

        <Row padding="16px 0px">
          <p>Выберите цвет категории</p>
          <ColorPicker
            id="color"
            presetColors={presetColors}
            selectedColor={color}
            allowCustom
            onChange={setColor}
          />
        </Row>

        <StickySection>
          <Row padding="16px 0px">
            <Button type="submit">Создать</Button>
          </Row>
        </StickySection>
      </Form>
    </Modal>
  );
};
