import axios from "axios";
import { getPathAPI } from "shared/api/constant";
import { Transaction } from "shared/store/type";

export const getTransactionsByAccount = async (
  accountId: number
): Promise<Transaction[]> => {
  const response = await axios.get(
    getPathAPI(`/transactions/account/${accountId}`)
  );
  return response.data;
};
