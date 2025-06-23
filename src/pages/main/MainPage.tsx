import axios from "axios";
import { AccountList } from "features/AccountList/ui";
import BudgetAnalysis from "features/BudgetAnalysis";
import CalendarWithEvents from "features/Calendar";
import { CategoryWidget } from "features/Category";
import FinanceAnalysis from "features/FinanceAnalysis/FinanceAnalysis";
import { NavBar } from "features/NavBar";
import { TransactionBlock } from "features/Transaction/ui/TransactionBlock";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCategories } from "shared/api/category";
import { useDevice } from "shared/hooks";
import { globalStore } from "shared/store/globalStore";
import { TabActive, Transaction } from "shared/store/type";
import { Block, Container, ResponsiveGrid, Row } from "shared/ui";
import { PhoneNavBar } from "shared/ui/PhoneNavBar.tsx/PhoneNavBar";
import { getMonthlyCategorySummarySync } from "shared/utils";

export const MainPage = observer(() => {
  const navigation = useNavigate();
  const { isAuthenticated } = globalStore;
  const { isMobile } = useDevice();

  const [transaction, setTransaction] = useState<Transaction[]>([]);

  if (!isAuthenticated) {
    navigation("/");
    return <></>;
  }

  const handleLoadAllData = async () => {
    const categories = await getUserCategories(globalStore.user?.id);

    if (categories) {
      globalStore.setAllCategories(categories);
    }
  };

  const handleLoadAllTransaction = async () => {
    if (globalStore.user && globalStore.selectedAccountId) {
      try {
        const response = await axios.get(
          `http://localhost:3222/transactions/account/${globalStore.selectedAccountId.id}`
        );
        setTransaction(response?.data);
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleLoadAllData();
  }, [globalStore.updateState, globalStore.user]);

  useEffect(() => {
    if (globalStore.selectedAccountId?.id) {
      handleLoadAllTransaction();
    }
  }, [globalStore.selectedAccountId?.id]);

  const getMainContent = (tabActive: TabActive) => {
    switch (tabActive) {
      case "Главная":
        return <TransactionBlock />;
        break;
      case "Анализ":
        return (
          <FinanceAnalysis accountId={globalStore.selectedAccountId?.id} />
        );
        break;
      // case "Календарь":
      //   return <Block>Календарь</Block>;
      //   break;
      case "Категории":
        return <CategoryWidget />;
        break;
      default:
        return (
          <BudgetAnalysis
            operations={getMonthlyCategorySummarySync(
              2025,
              6,
              transaction,
              globalStore.allUserCategories
            )}
          />
        );
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

  return (
    <>
      {!isMobile ? <NavBar /> : <PhoneNavBar />}
      <Container style={{ marginTop: isMobile ? "0px" : "60px" }}>
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
                <BudgetAnalysis
                  operations={getMonthlyCategorySummarySync(
                    2025,
                    6,
                    transaction,
                    globalStore.allUserCategories
                  )}
                />
                <CalendarWithEvents />
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
