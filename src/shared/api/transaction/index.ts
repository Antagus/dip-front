import axios from "axios";
import { ADDRESS_SERVER, PORT_SERVER } from "../constant";

export const createTransaction = async (
  accountId: number | null | undefined,
  name: string,
  amount: string,
  userId: number | null | undefined,
  isIncome: boolean = true,
  categoryId: number
) => {
  try {
    if (accountId && userId)
      await axios.post(
        `http://${ADDRESS_SERVER}:${PORT_SERVER}/transactions/`,
        {
          accountId: accountId,
          name: name,
          amount: amount,
          userId: userId,
          isIncome: isIncome,
          categoryId: categoryId,
        }
      );
  } catch (err: any) {
    console.log(err);
  }
};
