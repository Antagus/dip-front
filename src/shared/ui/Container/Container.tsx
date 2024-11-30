import React from "react";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Container: React.FC<Props> = ({ children, style }) => {
  return (
    <section className="container" style={style}>
      {children}
    </section>
  );
};
