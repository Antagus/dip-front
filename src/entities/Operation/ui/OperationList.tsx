import React from "react";
import { Transaction } from "shared/store/type";
import { OperationItem } from "..";

interface OperationListProps {
  transactions: Transaction[];
}

export const OperationList: React.FC<OperationListProps> = ({
  transactions,
}) => {
  return (
    <article>
      {transactions.map((el) => (
        <OperationItem
          key={el.id}
          id={el.id}
          account_id={el.account_id}
          user_id={el.user_id}
          category_id={el.category_id}
          is_income={el.is_income}
          transaction_date={el.transaction_date}
          amount={el.amount}
          name={el.name}
        />
      ))}
    </article>
  );
};
