import React, { useState } from "react";
import { createTransaction } from "shared/api";
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
} from "shared/ui";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const CategoryForm: React.FC<Props> = ({ onClose, isOpen }) => {
  const { isMobile } = useDevice();

  const handleSumbitTransaction = async (data: Record<string, string>) => {
    globalStore.reloadUpdateState();
    onClose();
  };

  const [nameCategory, setNameCategory] = useState("");

  return (
    <Modal onClose={onClose} isOpen={isOpen} nameModal={"Добавить категорию"}>
      <Form
        onSubmit={(data) => handleSumbitTransaction(data)}
        padding={isMobile ? "16px 0px 100px 0px" : "16px 0px 0px 0px"}
      >
        <ValidationInput
          id="name"
          value={nameCategory}
          onChange={setNameCategory}
          typeValidation="required"
          label="Введите название категории"
          required={true}
        />

        <StickySection>
          <Row padding="16px 0px">
            <Button type="submit">Создать</Button>
          </Row>
        </StickySection>
      </Form>
    </Modal>
  );
};
