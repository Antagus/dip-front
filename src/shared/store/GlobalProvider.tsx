import React, { createContext, useContext } from "react";
import { observer } from "mobx-react-lite";
import { globalStore } from "./globalStore";

const GlobalStoreContext = createContext(globalStore);

export const GlobalStoreProvider: React.FC<{ children: React.ReactNode }> =
  observer(({ children }) => {
    return (
      <GlobalStoreContext.Provider value={globalStore}>
        {children}
      </GlobalStoreContext.Provider>
    );
  });

export const useThemeStore = () => useContext(GlobalStoreContext);
