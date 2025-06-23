import { observer } from "mobx-react-lite";
import React from "react";

import { themeStore } from "shared/store";

export const ThemeSwitch = observer(() => {
  const { theme, toggleTheme } = themeStore;
  return (
    <div
      onClick={() => {
        toggleTheme();
        document.body.style.backgroundColor =
          theme === "light" ? "#2D2D2D" : "#f5f5f5";
      }}
      style={{
        padding: "5px",
        maxWidth: "52px",
        borderRadius: "16px",
        background: "#427ba4",
      }}
    >
      {theme == "light" ? "День" : "Ночь"}
    </div>
  );
});
