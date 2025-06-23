import React, { useMemo } from "react";
import { Transaction } from "shared/store/type";
import { OperationItem } from "..";
import { globalStore } from "shared/store/globalStore";

interface OperationListProps {
  transactions: Transaction[];
}

export const OperationList: React.FC<OperationListProps> = ({
  transactions,
}) => {
  const sorted = useMemo(
    () =>
      [...transactions]
        .sort(
          (a, b) =>
            new Date(a.transaction_date).getTime() -
            new Date(b.transaction_date).getTime()
        )
        .reverse(),
    [transactions]
  );

  // Хелперы для работы с датами
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const formatHeaderLabel = (d: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(d, today)) return "Сегодня";
    if (isSameDay(d, yesterday)) return "Вчера";

    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      weekday: "short",
    });
  };

  // 2) Группируем в [{ key, date, label, total, items }]
  const groups = useMemo(() => {
    type G = {
      key: string;
      date: Date;
      label: string;
      total: number;
      items: Transaction[];
    };
    const map: Record<string, G> = {};

    for (const tx of sorted) {
      const dt = new Date(tx.transaction_date);
      const key = dt.toDateString();
      if (!map[key]) {
        map[key] = {
          key,
          date: dt,
          label: formatHeaderLabel(dt),
          total: 0,
          items: [],
        };
      }
      map[key].items.push(tx);

      const amt =
        typeof tx.amount === "string" ? parseFloat(tx.amount) : tx.amount;
      map[key].total += tx.is_income ? amt : -amt;
    }

    // вернём в виде массива, отсортированного по дате (свежие сверху)
    return Object.values(map).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }, [sorted]);

  if (transactions.length === 0) {
    return (
      <article>
        <p style={{ padding: "20px" }}>Нет операций</p>
      </article>
    );
  }

  return (
    <article>
      {groups.map((grp) => (
        <section key={grp.key}>
          <article
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "16px 0 8px",
              padding: "0px 16px 0px 16px",
            }}
          >
            <h3 style={{ margin: 0 }}>{grp.label}</h3>
            <span
              style={{
                fontWeight: 600,
                color: grp.total >= 0 ? "#4CAF50" : "#E53935",
                display: "flex",
              }}
            >
              {grp.total >= 0 ? "+" : "-"}{" "}
              {Math.abs(grp.total).toLocaleString("ru-RU")}{" "}
              {globalStore.selectedAccountId?.currency}
            </span>
          </article>

          {grp.items.map((el) => (
            <OperationItem
              key={el.id}
              id={el.id}
              account_id={el.account_id}
              user_id={el.user_id}
              category_id={el.category_id}
              is_income={el.is_income}
              transaction_date={el.transaction_date}
              amount={el.amount}
              transaction_name={el.transaction_name}
            />
          ))}
        </section>
      ))}
    </article>
  );
};
