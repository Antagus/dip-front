import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Block, Row } from "shared/ui";
import styled from "styled-components";
import { CategoryForm } from "./CategoryForm";

type SubActiveProps = {
  isActive: boolean;
};

export const CategoryWidget = () => {
  const [typeCategory, setTypeCategory] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const SubActiveTypeCategory = styled.p<SubActiveProps>`
    cursor: pointer;
    outline: hidden;
    color: ${(props) => (props.isActive ? "#007bff" : "")};
    font-weight: 600;
    margin-right: 16px;
  `;

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

      <Row>ITEM LIST</Row>

      <CategoryForm
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </Block>
  );
};
