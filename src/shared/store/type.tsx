export type TabActive = "Главная" | "Календарь" | "Анализ" | "Категории";
export type ThemeStatus = "light" | "dark";

export type UserProps = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  email: string | null;
  dateOfBirth: string | null;
  registrationDate: string | null;
  accountType: number | null;
};

export type UserPropsJSON = {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  email: string;
  date_of_birth?: string | null;
  registration_date?: string | null;
  account_type: number;
};

export type Account = {
  id: number;
  account_name: string;
  total_balance: number;
  currency: string;
};
