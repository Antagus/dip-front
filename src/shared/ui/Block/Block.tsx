import React from "react";
import { themeStore } from "shared/store";

type PropsBlock = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Block: React.FC<PropsBlock> = ({ children, style }) => {
  return (
    <article style={style} className={`block ${themeStore.theme}-block-theme`}>
      {children}
    </article>
  );
};
