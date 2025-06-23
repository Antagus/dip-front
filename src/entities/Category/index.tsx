import React, { useState } from "react";
import styles from "./CategoryItem.module.scss";

import { TbCategory2 } from "react-icons/tb";
import { Category } from "shared/store/type";
import {
  Button,
  darkenColor,
  hexToRgba,
  Modal,
  Row,
  StickySection,
} from "shared/ui";
import { CgTrashEmpty } from "react-icons/cg";
import { deleteCategory } from "shared/api/category";
import { globalStore } from "shared/store/globalStore";
import { useDevice } from "shared/hooks";

type Props = { category: Category };

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const handleDeleteCategory = () => {
    deleteCategory(category.id);
    globalStore.reloadUpdateState();
  };

  const { isMobile } = useDevice();

  const [visibleWarning, setVisibleWarning] = useState(false);

  return (
    <Row className={styles.categoryItem}>
      <div
        style={{
          padding: "8px",
          background: hexToRgba(darkenColor(category.color, 0.2), 0.3),
          borderRadius: "10px",
          border: `3px solid ${darkenColor(category.color, 0.2)}`,
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxSizing: "border-box",
          minWidth: "100%",
          cursor: "pointer",
          justifyContent: "space-between",
        }}
        className="nameCategory"
      >
        <div
          className="category-item-name"
          style={{ display: "flex", gap: "16px", alignItems: "center" }}
        >
          <TbCategory2 size={"24px"} className="icon" />

          <p style={{ color: darkenColor(category.color, 1.2) }}>
            {category.categoryName}
          </p>
        </div>

        <CgTrashEmpty
          onClick={() => setVisibleWarning(true)}
          size={"16px"}
          className={`${styles.iconDelete}`}
        />
      </div>

      <Modal
        isOpen={visibleWarning}
        onClose={() => setVisibleWarning(false)}
        nameModal="Вы действительно желаете удалить категорию?"
      >
        <div
          className="content"
          style={{
            padding: isMobile ? "16px 0px 150px 0px" : "16px 0px 0px 0px",
          }}
        >
          <Row padding="10px 0px">
            <p>
              В случае удаления категории все операции к данной категории будут
              удалены.
            </p>
          </Row>
          <Row padding="10px 0px">
            <p>Вы действительно желаете удалить категорию</p>
          </Row>

          <Row padding="15px 0px">
            <div
              style={{
                padding: "8px",
                background: hexToRgba(darkenColor(category.color, 0.2), 0.3),
                borderRadius: "10px",
                border: `3px solid ${darkenColor(category.color, 0.2)}`,
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxSizing: "border-box",
                minWidth: "100%",
                cursor: "pointer",
                justifyContent: "space-between",
              }}
              className="nameCategory"
            >
              <div
                className="category-item-name"
                style={{ display: "flex", gap: "16px", alignItems: "center" }}
              >
                <TbCategory2 size={"24px"} className="icon" />

                <p style={{ color: darkenColor(category.color, 1.2) }}>
                  {category.categoryName}
                </p>
              </div>
            </div>
          </Row>
        </div>
        <StickySection>
          <Row padding="16px 0px">
            <Button onClick={handleDeleteCategory}>Подвердить</Button>
          </Row>
          <Row padding="0px 0px 16px 0px">
            <Button variant="filled" onClick={() => setVisibleWarning(false)}>
              Отменить
            </Button>
          </Row>
        </StickySection>
      </Modal>
    </Row>
  );
};
