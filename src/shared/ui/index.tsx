export { Block } from "./Block";
export { Button } from "./Button";
export { Container } from "./Container";
export { Form } from "./Form";
export { Input } from "./Input";
export { Modal } from "./Modal";
export { Row } from "./Row";
export { ThemeSwitch } from "./ThemeSwitch";
export { ValidationInput } from "./ValidationInput";
export { AdaptiveBlock } from "./AdaptiveBlock";
export { StickySection } from "./StickyContent";
export { ResponsiveGrid } from "./ResponsiveGrid";
export { ComboBox } from "./ComboBox";
export { ColorPicker } from "./ColorPicker";

export function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace(/^#/, ""), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.round(r * (1 - amount));
  g = Math.round(g * (1 - amount));
  b = Math.round(b * (1 - amount));

  const dark = (r << 16) | (g << 8) | b;
  return `#${dark.toString(16).padStart(6, "0")}`;
}

export function hexToRgba(hex: string, alpha: number): string {
  const parsed = hex.replace(/^#/, "");
  const bigint = parseInt(parsed, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
