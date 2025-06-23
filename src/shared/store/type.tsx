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

export enum MenuActive {
  Main,
  Calendar,
  Category,
  Analysis,
}

export type Note = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  creation_date: Date;
  reminder_date: Date;
};

export type UserPropsJSON = {
  user: {
    id: number;
    first_name?: string;
    last_name?: string;
    middle_name?: string | null;
    full_name?: string;
    email: string;
    date_of_birth?: string | null;
    registration_date?: string | null;
    account_type: number;
  };
};

export type Account = {
  id: number;
  account_name: string;
  total_balance: number | string;
  currency: string;
};

export type Category = {
  id: number;
  categoryName: string;
  image: string;
  userId: number;
  color: string;
  categoryType: string;
};

export type Transaction = {
  id: number;
  account_id: number;
  user_id: number;
  category_id: number;
  is_income: boolean;
  transaction_date: string;
  amount: string;
  transaction_name: string;
};
