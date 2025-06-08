import React from "react";
import { globalStore } from "shared/store/globalStore";
import { Row } from "shared/ui";
import styles from "./OperationItem.module.scss";

import { MdAttachMoney } from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";
import { useDevice } from "shared/hooks";

type OperationProps = {
  id: number;
  account_id: number;
  user_id: number;
  category_id: number;
  is_income: boolean;
  transaction_date: string;
  amount: string;
  transaction_name: string;
};

export const OperationItem: React.FC<OperationProps> = ({
  id,
  category_id,
  is_income,
  transaction_date,
  amount,
  transaction_name,
}) => {
  const getNameCategory = (id: Number) => {
    return globalStore.allUserCategories?.filter(
      (e) => e.id === category_id
    )[0];
  };
  

  const nameCategory =
    getNameCategory(category_id)?.category_name || "Нет категории";

  const { isMobile } = useDevice(); 

  const formatBalance = (value: string | number, currency?: string) => {
    const amount = Number(value) || 0;
    if (currency) {
      return amount.toLocaleString("ru-RU", {
        style: "currency",
        currency,
      });
    } else {
      return amount.toLocaleString("ru-RU");
    }
  };

  return (
    <Row tPadding="20px">
      
      <section className={`${styles.operationItem}`}>
        {is_income ? (
          <MdAttachMoney
            style={{ fill: "#69A63A" }}
            className={`${styles.icon}`}
          />
        ) : (
          <MdMoneyOff
            style={{ fill: "#DD6C6C" }}
            className={`${styles.icon}`}
          />
        )}

        <article className={`${styles.itemIconName}`}>
          <div>
            <p style={{ fontWeight: 600, paddingBottom: "5px" }}>{!transaction_name ? "Безымянная транзакция" : transaction_name}</p>
            <p
              className={`${styles.descriptionText}`}
              style={{ fontSize: "14px" }}
            >
              {
                !isMobile ? (
                  <p>{is_income ? "Доход" : "Трата"} по категории: {nameCategory}</p>
                ) : (
                  <p>{is_income ? "Доход" : "Трата"}: {nameCategory}</p>
                )
              }
            </p>
          </div>

          <p style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
            {is_income ? "+ " : ""}
            {
              formatBalance(amount, globalStore.selectedAccountId?.currency)
            }
 
          </p>
        </article>
      </section>
    </Row>
  );
};
