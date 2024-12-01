import React from "react";

type Props = {
  children: React.ReactNode;
  padding?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Container: React.FC<Props> = ({
  children,
  style = {},
  padding = "5px 10px 5px 10px",
}) => {
  return (
    <section className="container" style={{ ...style, padding: padding }}>
      {children}
    </section>
  );
};
