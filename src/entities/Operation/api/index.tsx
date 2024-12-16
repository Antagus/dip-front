import axios from "axios";
import { Transaction } from "shared/store/type";

export const getTransactionsByAccount = async (
  accountId: number
): Promise<Transaction[]> => {
  const response = await axios.get(
    `http://localhost:3222/transactions/account/${accountId}`
  );
  return response.data;
};
