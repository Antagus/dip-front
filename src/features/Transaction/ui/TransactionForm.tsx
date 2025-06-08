import axios from "axios";
import React, { useState } from "react";
import { createTransaction } from "shared/api";
import { useDevice } from "shared/hooks";
import { globalStore } from "shared/store/globalStore";
import { Transaction } from "shared/store/type";
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
  transaction?: Transaction;
  onClose: () => void;
  isOpen: boolean;
};

export const TransactionForm: React.FC<Props> = ({
  transaction,
  onClose,
  isOpen,
}) => {
  const [nameTransaction, setNameTransaction] = useState(
    transaction ? transaction?.transaction_name : ""
  );
  const { isMobile } = useDevice();
  const options = ["Доход", "Расход"];
  const optionsCategoryE = [
    "Нет категории",
    "Заработная плата",
    "Инвестиции",
    "Прочие поступления",
  ];
  const optionsCategoryD = ["Нет категории", "Продукты", "Транспорт"];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedOptionE, setSelectedOptionE] = useState(optionsCategoryE[0]);
  const [selectedOptionD, setSelectedOptionD] = useState(optionsCategoryD[0]);

  const handleSumbitTransaction = async (data: Record<string, string>) => {
    createTransaction(
      globalStore?.selectedAccountId?.id,
      data.name,
      data.amount,
      globalStore.user?.id,
      selectedOption === "Доход",
      1
    );

    globalStore.reloadUpdateState();
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      nameModal={transaction ? "Изменение транзакции" : "Добавление транзакции"}
    >
      <Form
        onSubmit={(data) => handleSumbitTransaction(data)}
        padding={isMobile ? "16px 0px 100px 0px" : "16px 0px 0px 0px"}
      >
        <ValidationInput
          id="name"
          value={nameTransaction}
          onChange={setNameTransaction}
          typeValidation="required"
          label="Введите название операции"
          required={true}
        />
        <ValidationInput
          id="amount"
          value={nameTransaction}
          onChange={setNameTransaction}
          typeValidation="number"
          label="Сумма операции"
          required={true}
        />
        <Row padding="16px 0px 0px 0px">
          <ComboBox
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            placeholder=""
            label="Тип операция"
          />
        </Row>

        <Row padding="0px 0px 0px 0px">
          <ComboBox
            options={
              selectedOption === "Доход" ? optionsCategoryE : optionsCategoryD
            }
            value={
              selectedOption === "Доход" ? selectedOptionE : selectedOptionD
            }
            onChange={
              selectedOption === "Доход"
                ? setSelectedOptionE
                : setSelectedOptionD
            }
            placeholder=""
            label="Выберите категорию"
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
