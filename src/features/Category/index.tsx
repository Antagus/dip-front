import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Block, Row } from "shared/ui";
import styled from "styled-components";
import { CategoryForm } from "./CategoryForm";
import { Category } from "shared/store/type";
import { getUserCategories } from "shared/api/category";
import { globalStore } from "shared/store/globalStore";
import { CategoryItem } from "entities/Category/index";
import { observer } from "mobx-react-lite";

type SubActiveProps = {
  isActive: boolean;
};

export const CategoryWidget = observer(() => {
  const [typeCategory, setTypeCategory] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const handleLoadData = async () => {
    const loadedCategory = await getUserCategories(globalStore.user?.id);
    if (loadedCategory) {
      setCategories(loadedCategory);
    }
  };

  useEffect(() => {
    handleLoadData();
  }, [globalStore.updateState]);

  const SubActiveTypeCategory = styled.p<SubActiveProps>`
    cursor: pointer;
    outline: hidden;
    color: ${(props) => (props.isActive ? "#007bff" : "")};
    font-weight: 600;
    margin-right: 16px;
  `;

  const filterType = typeCategory ? "Доход" : "Расход";

  return (
    <Block>
      <article>
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Категории</h3>
          <IoIosAdd
            onClick={() => setOpenAddModal(true)}
            style={{ width: "32px", height: "32px", cursor: "pointer" }}
          />
        </Row>
      </article>

      <Row bPadding="6px" style={{ borderBottom: "1px solid gray" }}>
        <SubActiveTypeCategory
          isActive={typeCategory}
          onClick={() => setTypeCategory(true)}
        >
          Доход
        </SubActiveTypeCategory>
        <SubActiveTypeCategory
          isActive={!typeCategory}
          onClick={() => setTypeCategory(false)}
        >
          Расход
        </SubActiveTypeCategory>
      </Row>

      <section style={{ marginTop: "16px" }} className="list-category">
        {categories.filter((cat) => cat.categoryType === filterType).length >
        0 ? (
          categories
            .filter((cat) => cat.categoryType === filterType)
            .map((el) => <CategoryItem key={el.id} category={el} />)
        ) : (
          <p style={{ padding: "16px", color: "#666", textAlign: "center" }}>
            У вас ещё нет категорий {typeCategory ? "дохода" : "расхода"}.
          </p>
        )}
      </section>

      <CategoryForm
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </Block>
  );
});
