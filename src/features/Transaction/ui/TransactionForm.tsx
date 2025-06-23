import React, { useState, useEffect } from "react";
import { createTransaction } from "shared/api";
import { getUserCategories } from "shared/api/category";
import { useDevice } from "shared/hooks";
import { globalStore } from "shared/store/globalStore";
import { Transaction, Category } from "shared/store/type";
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
  const { isMobile } = useDevice();
  const [nameTransaction, setNameTransaction] = useState(
    transaction?.transaction_name || ""
  );
  const [amount, setAmount] = useState<string>(
    transaction?.amount.toString() || ""
  );
  // Тип операции: true=доход, false=расход
  const [isIncome, setIsIncome] = useState(
    transaction ? transaction.is_income : true
  );
  // Загруженные категории
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Подгружаем категории для пользователя
  useEffect(() => {
    const load = async () => {
      const cats = await getUserCategories(globalStore.user?.id);
      if (cats) setCategories(cats);
    };
    load();
  }, []);

  const filtered = categories.filter((cat) =>
    isIncome ? cat.categoryType === "Доход" : cat.categoryType === "Расход"
  );

  const handleSubmit = async (data: Record<string, string>) => {
    await createTransaction(
      globalStore.selectedAccountId?.id,
      data.name,
      data.amount,
      globalStore.user?.id,
      isIncome,
      filtered.find((c) => c.categoryName === selectedCategory)?.id || 0
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
        onSubmit={(data) => {
          handleSubmit(data);
        }}
        padding={isMobile ? "16px 0px 100px 0px" : "16px 0px 0px 0px"}
      >
        <ValidationInput
          id="name"
          value={nameTransaction}
          onChange={setNameTransaction}
          typeValidation="required"
          label="Название операции"
          required
        />
        <ValidationInput
          id="amount"
          value={amount}
          onChange={setAmount}
          typeValidation="number"
          label="Сумма операции"
          required
        />

        <Row padding="6px 0px">
          <ComboBox
            options={["Доход", "Расход"]}
            value={isIncome ? "Доход" : "Расход"}
            onChange={(v) => setIsIncome(v === "Доход")}
            placeholder=""
            label="Тип операции"
          />
        </Row>

        <Row padding="6px 0px">
          <ComboBox
            options={filtered.map((c) => c.categoryName)}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder=""
            label="Категория"
          />
        </Row>

        <StickySection>
          <Row padding="16px 0px">
            <Button type="submit">
              {transaction ? "Сохранить" : "Создать"}
            </Button>
          </Row>
        </StickySection>
      </Form>
    </Modal>
  );
};
