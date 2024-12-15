import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { themeStore } from "shared/store/"; // Тема (светлая/темная)
import styles from "./AccountCard.module.scss"; // Стили компонента
import { FaCreditCard } from "react-icons/fa6";
import { CgTrashEmpty } from "react-icons/cg";
import axios from "axios";
import { globalStore } from "shared/store/globalStore";
import { Button, Modal, Row, StickySection } from "shared/ui";

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
    const [visibleWarning, setVisibleWarning] = useState(false);

    const handleCardClick = () => {
      if (onClick) {
        onClick(account.id);
      }
    };

    const handleDeleteAccount = async () => {
      try {
        await axios.delete(`http://localhost:3222/accounts/${account.id}`);
        globalStore.accounts = [];
        globalStore.setTotalAccountId(0);
      } catch (err: any) {
        console.log(err);
      }
    };

    return (
      <div
        className={`${styles.accountCard} ${
          isSelected ? styles.selected : styles.shadowed
        } ${styles[theme]}`}
        onClick={handleCardClick}
      >
        <div className={`${styles.flexD}`}>
          <FaCreditCard style={{ width: "22px", height: "22px" }} />
          <div className={styles.content}>
            <p className={styles.balance}>
              {Number(account.total_balance).toLocaleString("ru-RU", {
                style: "currency",
                currency: account.currency,
              })}
            </p>
            <p className={styles.accountName}>
              {account.account_name.slice(0, 25)}
            </p>
          </div>
        </div>

        <CgTrashEmpty
          onClick={() => setVisibleWarning(true)}
          className={`${styles.iconDelete}`}
        />

        <Modal
          nameModal="Вы действительно хотите удалить счет?"
          isOpen={visibleWarning}
          onClose={() => setVisibleWarning(false)}
        >
          <Row padding="10px 0px">
            <p>
              В случае удаления счета все операции и категории привязанные к
              данному счету будут удалены.
            </p>
          </Row>
          <Row padding="10px 0px">
            <p>Вы действительно желаете удалить счет</p>
          </Row>

          <Row padding="10px 0px">
            <div
              className={`${styles.accountCard} ${styles.shadowed} ${styles[theme]}`}
              onClick={() => ""}
            >
              <div className={`${styles.flexD}`}>
                <FaCreditCard style={{ width: "22px", height: "22px" }} />
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
            </div>
          </Row>

          <StickySection>
            <Row padding="16px 0px">
              <Button onClick={handleDeleteAccount}>Подвердить</Button>
            </Row>
            <Row padding="0px 0px 16px 0px">
              <Button variant="filled" onClick={handleDeleteAccount}>
                Отменить
              </Button>
            </Row>
          </StickySection>
        </Modal>
      </div>
    );
  }
);
