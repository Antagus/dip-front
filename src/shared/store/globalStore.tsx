import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  Account,
  Category,
  MenuActive,
  TabActive,
  UserProps,
  UserPropsJSON,
} from "./type";
import { getUserCategories } from "shared/api/category";
import axios from "axios";

class GlobalStore {
  user: UserProps | null = null;
  isAuthenticated: boolean = false;
  accounts: Array<Account> = [];
  menuTotalTab: TabActive = "Главная";
  allUserCategories: Array<Category> = [];

  selectedAccountId: Account | null | undefined;
  updateState: boolean = false;

  constructor() {
    makeAutoObservable(this);

    // reaction(
    //   () => this.user?.id,
    //   (userId) => {
    //     if (userId) this.loadCategories(userId);
    //   }
    // );

    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const parsed: UserPropsJSON = JSON.parse(saved);
        console.log("SAVED", parsed);

        runInAction(() => {
          this.setUser(parsed);
        });
      } catch {
        localStorage.removeItem("user");
      }
    }
  }

  async loadCategories(userId: number) {
    try {
      const cats = await getUserCategories(userId);
      runInAction(() => {
        this.allUserCategories = cats ?? [];
      });
    } catch (e) {
      console.error("Ошибка загрузки категорий", e);
    }
  }

  reloadUpdateState = () => {
    console.log("Обновление глобального состояния");
    this.updateState = !this.updateState;
  };

  setTotalMenuTab = (totalTab: TabActive) => {
    this.menuTotalTab = totalTab;
  };

  addAccount = (account: Account) => {
    this.accounts = [...this.accounts, account];
  };

  setAccountsUser = (accounts: Array<Account>) => {
    this.accounts = accounts;
  };

  setTotalAccountId = (accountId: Account | null | undefined) => {
    this.selectedAccountId = accountId;
  };

  setAllCategories = (categoryes: Category[]) => {
    this.allUserCategories = categoryes;
  };

  // Устанавливаем данные пользователя
  setUser(data: UserPropsJSON) {
    if (!data || typeof data !== "object") {
      throw new Error("Переданы некорректные данные пользователя в setUser");
    }
    const userData = data.user;
    const splitedName = data.user.full_name?.split(" ") || [];

    try {
      this.user = {
        id: userData.id,
        firstName: splitedName[0] || null,
        lastName: splitedName[1] || null,
        middleName: splitedName[2] || null,
        email: userData.email || null,
        dateOfBirth: userData.date_of_birth || null,
        registrationDate: userData.registration_date || null,
        accountType: userData.account_type || null,
      };

      this.isAuthenticated = true;
    } catch (error) {
      console.error("Ошибка при установке пользователя:", error);
      this.clearUser();
    }
  }

  clearUser() {
    this.user = null;
    this.isAuthenticated = false;
    console.log("Данные пользователя успешно сброшены");
  }

  isAdmin(): boolean {
    return this.user?.accountType === 1;
  }

  hasUser(): boolean {
    return this.user !== null;
  }

  logout() {
    this.clearUser();
    console.log("Пользователь вышел из системы");
  }
}

export const globalStore = new GlobalStore();
