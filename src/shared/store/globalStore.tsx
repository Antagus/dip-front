import { makeAutoObservable } from "mobx";
import { Account, Category, UserProps, UserPropsJSON } from "./type";

class GlobalStore {
  user: UserProps | null = null;
  isAuthenticated: boolean = false;
  accounts: Array<Account> = [];

  allUserCategories: Array<Category> = [];

  selectedAccountId: Account | null | undefined;
  updateState: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  reloadUpdateState = () => {
    this.updateState = !this.updateState;
  };

  addAccount = (account: Account) => {
    this.accounts = [...this.accounts, account];
  };

  setAccountsUser = (accounts: Array<Account>) => {
    this.accounts = accounts;
    if (this.accounts.length > 0) {
      this.selectedAccountId = this.accounts[0];
    } else {
      this.selectedAccountId = null;
    }
  };

  setTotalAccountId = (accountId: Account | null | undefined) => {
    this.selectedAccountId = accountId;
  };

  // Устанавливаем данные пользователя
  setUser(userData: UserPropsJSON) {
    if (!userData || typeof userData !== "object") {
      throw new Error("Переданы некорректные данные пользователя в setUser");
    }

    try {
      this.user = {
        id: userData.id,
        firstName: userData.first_name || null,
        lastName: userData.last_name || null,
        middleName: userData.middle_name || null,
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
