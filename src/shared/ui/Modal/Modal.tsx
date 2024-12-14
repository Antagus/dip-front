import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { themeStore } from "shared/store";

interface ModalProps {
  isOpen: boolean; // Открыто ли модальное окно
  onClose: () => void; // Закрытие окна
  children: React.ReactNode; // Содержимое окна
  nameModal: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  nameModal,
}) => {
  // Динамические стили для темы
  const themeStyles =
    themeStore.theme === "dark"
      ? {
          "--background-color": "#222",
          "--text-color": "#fff",
        }
      : {
          "--background-color": "#fff",
          "--text-color": "#000",
        };

  // Блокировка прокрутки страницы при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Блокируем прокрутку
    } else {
      document.body.style.overflow = "auto"; // Возвращаем прокрутку
    }

    return () => {
      document.body.style.overflow = "auto"; // Очистка при размонтировании
    };
  }, [isOpen]);

  // Если окно закрыто, не рендерим его
  if (!isOpen) return null;

  // Само модальное окно
  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        style={themeStyles as React.CSSProperties}
        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри окна
      >
        <div
          className={styles["name-modal"]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <h2>{nameModal}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );

  // Рендерим модальное окно в #modal-root
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
};
