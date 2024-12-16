import React from "react";
import { globalStore } from "shared/store/globalStore";
import { Row } from "shared/ui";
import styles from "./OperationItem.module.scss";

import { MdAttachMoney } from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";

type OperationProps = {
  id: number;
  account_id: number;
  user_id: number;
  category_id: number;
  is_income: boolean;
  transaction_date: string;
  amount: string;
  name: string;
};

export const OperationItem: React.FC<OperationProps> = ({
  id,
  category_id,
  is_income,
  transaction_date,
  amount,
  name,
}) => {
  const getNameCategory = (id: Number) => {
    return globalStore.allUserCategories?.filter(
      (e) => e.id === category_id
    )[0];
  };

  const nameCategory =
    getNameCategory(category_id)?.category_name || "Нет категории";

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
            <p style={{ fontWeight: 600 }}>{name}</p>
            <p
              className={`${styles.descriptionText}`}
              style={{ fontSize: "14px" }}
            >
              {is_income ? "Доход" : "Трата"} по категории: {nameCategory}
            </p>
          </div>

          <p style={{ fontWeight: 600 }}>
            {is_income ? "+ " : ""}
            {Number(amount).toLocaleString("ru-RU", {
              style: "currency",
              currency: globalStore.selectedAccountId?.currency,
            })}
          </p>
        </article>
      </section>
    </Row>
  );
};
