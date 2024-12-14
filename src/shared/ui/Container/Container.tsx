import React from "react";

type Props = {
  children: React.ReactNode;
  padding?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Container: React.FC<Props> = ({
  children,
  style = {},
  padding = "0px 0px 0px 0px",
}) => {
  return (
    <section className="container" style={{ ...style, padding: padding }}>
      {children}
    </section>
  );
};
