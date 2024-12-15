import React, { useState } from "react";
import {
  Button,
  ComboBox,
  Form,
  Modal,
  Row,
  StickySection,
  ValidationInput,
} from "shared/ui";

type AccountModalProps = {
  isOpen: boolean; // Открыто ли модальное окно
  onClose: () => void; // Закрытие окна
};
export const AccountAddForm: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setNameAccount] = useState("");
  const options = ["USD", "RUB", "CNY", "BTC", "USDT"];
  const [selectedOption, setSelectedOption] = useState(options[1]);

  return (
    <>
      <Modal nameModal="Добавить счет" isOpen={isOpen} onClose={onClose}>
        <Row padding="20px 0px 0px 0px">Создание нового виртуального счета</Row>
        <Form padding="0px" onSubmit={(data) => console.log(data)}>
          <ValidationInput
            id="name"
            value={name}
            onChange={setNameAccount}
            typeValidation="required"
            label="Введите название счета"
            required={true}
          />
          <ComboBox
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            placeholder=""
            label="Выберите валюту счета"
          />
          <StickySection>
            <Row padding="16px 0px 0px 0px">
              <Button type="submit">Создать</Button>
            </Row>
          </StickySection>
        </Form>
      </Modal>
    </>
  );
};
