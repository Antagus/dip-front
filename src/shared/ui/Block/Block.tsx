import { observer } from "mobx-react-lite";
import React from "react";
import { themeStore } from "shared/store";

type PropsBlock = {
  children?: React.ReactNode;
  padding?: string; // Добавляем padding в свойства
} & React.HTMLAttributes<HTMLElement>;

export const Block: React.FC<PropsBlock> = observer(
  ({ children, padding = "20px", style, ...rest }) => {
    return (
      <article
        style={{ padding, ...style }}
        className={`block ${themeStore.theme}-block-theme`}
        {...rest}
      >
        {children}
      </article>
    );
  }
);
