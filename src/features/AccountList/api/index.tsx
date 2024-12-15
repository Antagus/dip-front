import axios from "axios";
import { globalStore } from "shared/store/globalStore";

export const getUserAccounts = async (id: number) => {
  const { setAccountsUser } = globalStore;
  try {
    const responce = await axios.get(
      `http://localhost:3222/accounts/user/${2}`
    );
    setAccountsUser(responce.data);
  } catch (err: any) {
    console.log("Возникла ошибка с соединением c БД ");
  }
};
