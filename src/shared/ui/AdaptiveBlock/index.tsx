import { observer } from "mobx-react-lite";
import React from "react";
import { themeStore } from "shared/store";

type PropsBlock = {
  children?: React.ReactNode;
  padding?: string;
} & React.HTMLAttributes<HTMLElement>;

export const AdaptiveBlock: React.FC<PropsBlock> = observer(
  ({ children, padding = "10px 0px 10px 0px", style, ...rest }) => {
    return (
      <article
        style={{ padding, ...style }}
        className={`adaptive-block ${themeStore.theme}-block-theme`}
        {...rest}
      >
        {children}
      </article>
    );
  }
);
