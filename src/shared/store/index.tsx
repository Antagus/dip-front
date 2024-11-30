// src/shared/store/themeStore.ts
import { makeAutoObservable } from "mobx";

class ThemeStore {
  theme: "light" | "dark" = "light";

  constructor() {
    makeAutoObservable(this);
  }

  setTheme = (theme: "light" | "dark") => {
    this.theme = theme;
  };

  toggleTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
  };
}

export const themeStore = new ThemeStore();
