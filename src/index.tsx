import React from "react";
import ReactDOM from "react-dom/client";

import App from "./routes";

import "app/global.css";
import { ThemeProvider } from "shared/store/ThemeProvider";
import { GlobalStoreProvider } from "shared/store/GlobalProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalStoreProvider>
  </React.StrictMode>
);
