import React, { FC, ReactNode } from "react";
import styles from "./ResponsiveGrid.module.scss";

interface ResponsiveGridProps {
  leftColumn: ReactNode;
  middleColumn: ReactNode;
  rightColumn: ReactNode;
}

export const ResponsiveGrid: FC<ResponsiveGridProps> = ({
  leftColumn,
  middleColumn,
  rightColumn,
}) => {
  return (
    <article className={styles.container}>
      <div className={styles.collumn}>{leftColumn}</div>
      <div className={styles.collumn}>{middleColumn}</div>
      <div className={styles.collumn}>{rightColumn}</div>
    </article>
  );
};
