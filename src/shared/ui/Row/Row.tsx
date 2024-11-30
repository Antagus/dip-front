import React from "react";

type Props = {
  children: React.ReactNode;
  tPadding?: string;
  bPadding?: string;
  lPadding?: string;
  rPadding?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Row: React.FC<Props> = ({
  children,
  style = {},
  tPadding,
  bPadding,
  lPadding,
  rPadding,
  ...props
}) => {
  return (
    <div
      className="row"
      style={{
        ...style,
        paddingTop: tPadding,
        paddingBottom: bPadding,
        paddingLeft: lPadding,
        paddingRight: rPadding,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
