import axios from "axios";
import { OperationList } from "entities/Operation/ui/OperationList";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { globalStore } from "shared/store/globalStore";
import { Transaction } from "shared/store/type";
import { Block, Button, Row, StickySection } from "shared/ui";
import { IoIosAdd } from "react-icons/io";
import { TransactionForm } from "./TransactionForm";
import { getPathAPI } from "shared/api/constant";

export const TransactionBlock = observer(() => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [totalActiveTab, setTotalActiveTab] = useState("Все операции");
  const [visibleModal, setVisibleModal] = useState(false);

  const handleLoadAllTransaction = async () => {
    if (globalStore.user && globalStore.selectedAccountId) {
      try {
        const response = await axios.get(
          getPathAPI(
            `/transactions/account/${globalStore.selectedAccountId.id}`
          )
        );
        setTransactions(response?.data);
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  const filterTransactions = (filter: string) => {
    if (filter === "Все операции") {
      setFilteredTransactions(transactions);
    } else if (filter === "Расходы") {
      setFilteredTransactions(transactions.filter((t) => !t.is_income));
    } else if (filter === "Доходы") {
      setFilteredTransactions(transactions.filter((t) => t.is_income));
    }
    console.log(filteredTransactions);
  };

  useEffect(() => {
    filterTransactions(totalActiveTab);
  }, [totalActiveTab, transactions]);

  useEffect(() => {
    handleLoadAllTransaction();
  }, [globalStore?.selectedAccountId, globalStore.updateState]);

  return (
    <Block>
      <article>
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Операции</h3>
          <IoIosAdd
            style={{ width: "32px", height: "32px", cursor: "pointer" }}
            onClick={() => setVisibleModal(true)}
          />
        </Row>
        <Row>
          <p
            onClick={() => setTotalActiveTab("Все операции")}
            style={{
              cursor: "pointer",
              fontWeight: totalActiveTab === "Все операции" ? "bold" : "normal",
            }}
          >
            Все операции
          </p>
          <p
            onClick={() => setTotalActiveTab("Расходы")}
            style={{
              cursor: "pointer",
              fontWeight: totalActiveTab === "Расходы" ? "bold" : "normal",
            }}
          >
            Расходы
          </p>
          <p
            onClick={() => setTotalActiveTab("Доходы")}
            style={{
              cursor: "pointer",
              fontWeight: totalActiveTab === "Доходы" ? "bold" : "normal",
            }}
          >
            Доходы
          </p>
        </Row>
        <hr />
      </article>

      <OperationList transactions={filteredTransactions} />
      <TransactionForm
        onClose={() => setVisibleModal(false)}
        isOpen={visibleModal}
      />
    </Block>
  );
});
