import React, { useState } from "react";
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
    transaction ? transaction?.name : ""
  );
  const options = ["Доход", "Расход"];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      nameModal={transaction ? "Изменение транзакции" : "Добавление транзакции"}
    >
      <Form onSubmit={(data) => console.log(data)} padding="16px 0px">
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
        <Row padding="16px 0px">
          <ComboBox
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
            placeholder=""
            label="Тип операция"
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
