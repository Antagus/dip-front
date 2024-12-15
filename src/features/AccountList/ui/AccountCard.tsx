import React from "react";
import { observer } from "mobx-react-lite";
import { themeStore } from "shared/store/"; // Тема (светлая/темная)
import styles from "./AccountCard.module.scss"; // Стили компонента

type AccountCardProps = {
  account: {
    id: number;
    account_name: string;
    total_balance: string;
    currency: string;
  };
  isSelected?: boolean; // Выбран ли данный аккаунт
  onClick?: (id: number) => void; // Обработчик клика
};

export const AccountCard: React.FC<AccountCardProps> = observer(
  ({ account, isSelected = false, onClick }) => {
    const { theme } = themeStore;

    const handleCardClick = () => {
      if (onClick) {
        onClick(account.id);
      }
    };

    return (
      <div
        className={`${styles.accountCard} ${
          isSelected ? styles.selected : styles.shadowed
        } ${styles[theme]}`}
        onClick={handleCardClick}
      >
        <div className={styles.colorIndicator} />
        <div className={styles.content}>
          <p className={styles.balance}>
            {Number(account.total_balance).toLocaleString("ru-RU", {
              style: "currency",
              currency: account.currency,
            })}
          </p>
          <p className={styles.accountName}>{account.account_name}</p>
        </div>
      </div>
    );
  }
);
