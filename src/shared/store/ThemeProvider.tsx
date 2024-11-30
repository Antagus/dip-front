// src/shared/store/ThemeProvider.tsx
import React, { createContext, useContext } from "react";
import { themeStore } from "./index";
import { observer } from "mobx-react-lite";

const ThemeContext = createContext(themeStore);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = observer(
  ({ children }) => {
    return (
      <ThemeContext.Provider value={themeStore}>
        {children}
      </ThemeContext.Provider>
    );
  }
);

export const useThemeStore = () => useContext(ThemeContext);
