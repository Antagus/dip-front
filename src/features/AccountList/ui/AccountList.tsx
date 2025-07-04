import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { globalStore } from "shared/store/globalStore";
import { observer } from "mobx-react-lite";
import { AccountCard } from "./AccountCard";
import { Form, Modal, Row, ValidationInput } from "shared/ui";

import { IoIosAdd } from "react-icons/io";
import { AccountAddForm } from "./AccountAddForm";
import { Account } from "shared/store/type";
import { getAccount } from "shared/api";

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
    setTotalAccountId(id);
  };

  const getUserAccounts = useCallback(
    async (id: number | undefined | null) => {
      const crAccount = getAccount(id);
      if (crAccount) {
        setAccountsUser(await crAccount);
      }
    },
    [user?.id]
  );

  useEffect(() => {
    if (!user?.id) return;
    getUserAccounts(user.id);
  }, [user?.id, globalStore.updateState, getUserAccounts]);

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
