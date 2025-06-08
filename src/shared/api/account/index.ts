import axios from "axios";
import { getPathAPI } from "../constant";
import { UserProps } from "shared/store/type";

export const deleteAccount = async (accountId: number | null | undefined) => {
  try {
    await axios.delete(getPathAPI(`/accounts/${accountId}`));
  } catch (err: any) {
    console.log(err);
  }
};

export const getAccount = async (id: number | undefined | null) => {
  if (id) {
    try {
      const response = await axios.get(getPathAPI(`/accounts/user/${id}`));
      return response.data;
    } catch (err: any) {
      console.log("Возникла ошибка с соединением c БД ", err);
    }
  }
  return undefined;
};

export const createAccount = async (
  user: UserProps | null,
  lengthAccounsts: number,
  data: Record<string, string>,
  currency: string
) => {
  if (user && lengthAccounsts <= 10) {
    try {
      await axios.post(getPathAPI("/accounts/"), {
        ownerId: user.id,
        accountName: data?.name || "Безымянный счет",
        totalBalance: 0,
        currency: currency,
      });
    } catch (err: any) {
      console.log(err);
    }
  }
};
