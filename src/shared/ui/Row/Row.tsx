import React from "react";

type Props = {
  children?: React.ReactNode;
  tPadding?: string;
  bPadding?: string;
  lPadding?: string;
  rPadding?: string;
  gapRow?: string;
  padding?: string;
  margin?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Row: React.FC<Props> = ({
  children,
  style = {},
  tPadding = "8px",
  bPadding = "8px",
  lPadding,
  rPadding,
  gapRow = "8px",
  padding = `${tPadding} ${lPadding} ${bPadding} ${rPadding}`,
  margin,
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
        padding: padding,
        gap: gapRow,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
