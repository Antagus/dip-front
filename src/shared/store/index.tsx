// src/shared/store/themeStore.ts
import { makeAutoObservable } from "mobx";
import { TabActive, ThemeStatus } from "./type";

class ThemeStore {
  theme: ThemeStatus = "light";
  currentTabActive: TabActive = "Главная";

  constructor() {
    makeAutoObservable(this);
  }

  setTheme = (theme: ThemeStatus) => {
    this.theme = theme;
  };

  changeTotalTabActive = (changeTotalTabActive: TabActive) => {
    this.currentTabActive = changeTotalTabActive;
  };

  toggleTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
  };
}

export const themeStore = new ThemeStore();
