import React from "react";
import ReactDOM from "react-dom/client";

import App from "./routes";

import "app/global.css";
import { ThemeProvider } from "shared/store/ThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
