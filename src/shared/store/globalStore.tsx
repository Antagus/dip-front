import { makeAutoObservable } from "mobx";

type UserProps = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  email: string | null;
  dateOfBirth: string | null;
  registrationDate: string | null;
  accountType: number | null;
};

type UserPropsJSON = {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  email: string;
  date_of_birth?: string | null;
  registration_date?: string | null;
  account_type: number;
};

class GlobalStore {
  user: UserProps | null = null;
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

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
