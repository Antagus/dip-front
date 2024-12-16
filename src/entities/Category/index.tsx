import React from "react";
import styles from "./CategoryItem.module.scss";

import { TbCategory2 } from "react-icons/tb";

type CaterogyProps = {
  id: number;
  category_name: string;
};

export const CaterogyItem: React.FC<CaterogyProps> = ({
  id,
  category_name,
}) => {
  return (
    <section className={`${styles.categoryItem}`}>
      <TbCategory2 className="icon" />
      <p>{category_name}</p>
    </section>
  );
};
