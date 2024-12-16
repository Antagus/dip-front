import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { globalStore } from "shared/store/globalStore";
import { observer } from "mobx-react-lite";
import { AccountCard } from "./AccountCard";
import { Form, Modal, Row, ValidationInput } from "shared/ui";

import { IoIosAdd } from "react-icons/io";
import { AccountAddForm } from "./AccountAddForm";
import { Account } from "shared/store/type";

export const AccountList = observer(() => {
  const {
    user,
    setAccountsUser,
    accounts,
    selectedAccountId,
    setTotalAccountId,
  } = globalStore;

  const [modalVisionAdd, setModalVisionAdd] = useState(false);

  const handleClick = (id: Account) => {
    console.log(selectedAccountId);
    setTotalAccountId(id);
  };

  const getUserAccounts = useCallback(
    async (id: number | undefined | null) => {
      if (id && accounts.length === 0) {
        try {
          const response = await axios.get(
            `http://localhost:3222/accounts/user/${user?.id}`
          );
          if (response.data) {
            setAccountsUser(response.data);
          }
        } catch (err: any) {
          console.log("Возникла ошибка с соединением c БД ", err);
        }
      }
    },
    [user?.id]
  );

  useEffect(() => {
    if (user?.id && accounts.length === 0) {
      getUserAccounts(user.id);
    }
  }, [user?.id, globalStore.accounts]);

  return (
    <div className="account-list">
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <h3>Счета</h3>
        <IoIosAdd
          style={{
            width: "26px",
            height: "26px",
          }}
          onClick={() => setModalVisionAdd(true)}
        />
      </Row>
      {accounts.length !== 0 ? (
        accounts?.map((account) => {
          return (
            <Row key={account.id}>
              <AccountCard
                key={account.id}
                account={{
                  id: account.id,
                  account_name: account.account_name || "Безымянный счет",
                  total_balance: account.total_balance.toString(),
                  currency: account.currency,
                }}
                isSelected={account.id === selectedAccountId?.id}
                onClick={handleClick}
              />
            </Row>
          );
        })
      ) : (
        <Row>
          <p>Перед началом работы создайте вирутальный счет</p>
        </Row>
      )}
      <AccountAddForm
        isOpen={modalVisionAdd}
        onClose={() => setModalVisionAdd(false)}
      />
    </div>
  );
});
