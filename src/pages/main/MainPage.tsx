import { AccountList } from "features/AccountList/ui";
import BudgetAnalysis, { Operation } from "features/BudgetAnalysis";
import CalendarWithEvents from "features/Calendar";
import { CategoryWidget } from "features/Category";
import { NavBar } from "features/NavBar";
import { TransactionBlock } from "features/Transaction/ui/TransactionBlock";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDevice } from "shared/hooks";
import { globalStore } from "shared/store/globalStore";
import { TabActive } from "shared/store/type";
import { Block, Container, ResponsiveGrid, Row } from "shared/ui";

export const MainPage = observer(() => {
  const navigation = useNavigate();
  const { isAuthenticated } = globalStore;
  const { isMobile } = useDevice();

  if (!isAuthenticated) {
    navigation("/");
    return <></>;
  }

  const getMainContent = (tabActive: TabActive) => {
    switch (tabActive) {
      case "Главная":
        return <TransactionBlock />;
        break;
      case "Анализ":
        return <Block>Анализ</Block>;
        break;
      case "Календарь":
        return <Block>Календарь</Block>;
        break;
      case "Категории":
        return <CategoryWidget />;
        break;
      default:
        return <BudgetAnalysis operations={sampleOperations} />;
        break;
    }
  };

  const AccountBlock = () => {
    return (
      <Block>
        <AccountList />
      </Block>
    );
  };

  const sampleOperations: Operation[] = [
    { id: "1", type: "expense", category: "Зарплаты", amount: 143280 },
    {
      id: "2",
      type: "expense",
      category: "Подписки на ресурсы",
      amount: 81440,
    },
    { id: "3", type: "expense", category: "Сырье", amount: 23430 },
    { id: "4", type: "expense", category: "Перевозка грузов", amount: 22440 },
    {
      id: "5",
      type: "expense",
      category: "Аренда помещений",
      amount: 51999.99,
    },
    { id: "6", type: "expense", category: "Остальное", amount: 32000 },
    { id: "7", type: "income", category: "Продажи", amount: 250000 },
    { id: "8", type: "income", category: "Инвестиции", amount: 50000 },
    { id: "9", type: "income", category: "Возврат налогов", amount: 12000 },
    { id: "10", type: "income", category: "Прочие поступления", amount: 8000 },
  ];
  return (
    <>
      <NavBar />

      <Container style={{ marginTop: "60px" }}>
        <ResponsiveGrid
          leftColumn={<AccountBlock />}
          middleColumn={getMainContent(globalStore.menuTotalTab)}
          rightColumn={
            !isMobile ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <BudgetAnalysis operations={sampleOperations} />
                <CalendarWithEvents events={[]} />
              </div>
            ) : (
              <TransactionBlock />
            )
          }
        />
      </Container>
    </>
  );
});
