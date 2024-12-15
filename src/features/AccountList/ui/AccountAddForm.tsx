import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
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

type AccountModalProps = {
  isOpen: boolean; // Открыто ли модальное окно
  onClose: () => void; // Закрытие окна
};
export const AccountAddForm: React.FC<AccountModalProps> = observer(
  ({ isOpen, onClose }) => {
    const [name, setNameAccount] = useState("");
    const options = ["USD", "RUB", "EUR", "BTC", "ETH"];
    const [selectedOption, setSelectedOption] = useState(options[1]);

    const handleSubmit = async (data: Record<string, string>) => {
      if (globalStore.user && globalStore.accounts.length <= 15) {
        try {
          console.log(data);
          const response = await axios.post("http://localhost:3222/accounts/", {
            ownerId: globalStore.user.id,
            accountName: data?.name || "Безымянный счет",
            totalBalance: 0,
            currency: selectedOption,
          });
          globalStore.accounts = [];
          onClose();
        } catch (err: any) {
          console.log(err);
        }
      }
    };

    return (
      <>
        <Modal nameModal="Добавить счет" isOpen={isOpen} onClose={onClose}>
          <Row padding="20px 0px 0px 0px">
            Создание нового виртуального счета
          </Row>
          <Form padding="0px" onSubmit={handleSubmit}>
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
  }
);
