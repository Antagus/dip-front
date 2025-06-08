import axios from "axios";
import { getPathAPI } from "../constant";
import { UserProps } from "shared/store/type";
import { Category as CategoryProps } from "shared/store/type";

export const getUserCategories = async (
  userId: number | null | undefined
): Promise<CategoryProps[] | undefined> => {
  if (userId != null) {
    try {
      const response = await axios.get<CategoryProps[]>(
        getPathAPI(`/categories/user/${userId}`)
      );
      return response.data;
    } catch (err: any) {
      console.log("Ошибка при получении категорий пользователя", err);
    }
  }
  return undefined;
};

export const getCategoryById = async (
  id: number | null | undefined
): Promise<CategoryProps | undefined> => {
  if (id != null) {
    try {
      const response = await axios.get<CategoryProps>(
        getPathAPI(`/categories/${id}`)
      );
      return response.data;
    } catch (err: any) {
      console.log("Ошибка при получении категории по ID", err);
    }
  }
  return undefined;
};

export const createCategory = async (
  user: UserProps | null,
  data: { name: string; image: string }
): Promise<CategoryProps | undefined> => {
  if (user) {
    try {
      const response = await axios.post<CategoryProps>(
        getPathAPI("/categories"),
        {
          userId: user.id,
          categoryName: data.name,
          image: data.image,
        }
      );
      return response.data;
    } catch (err: any) {
      console.log("Ошибка при создании категории", err);
    }
  }
  return undefined;
};

export const updateCategory = async (
  id: number | null | undefined,
  data: { name: string; image: string }
): Promise<CategoryProps | undefined> => {
  if (id != null) {
    try {
      const response = await axios.put<CategoryProps>(
        getPathAPI(`/categories/${id}`),
        {
          categoryName: data.name,
          image: data.image,
        }
      );
      return response.data;
    } catch (err: any) {
      console.log("Ошибка при обновлении категории", err);
    }
  }
  return undefined;
};

export const deleteCategory = async (
  categoryId: number | null | undefined
): Promise<void> => {
  if (categoryId != null) {
    try {
      await axios.delete(getPathAPI(`/categories/${categoryId}`));
    } catch (err: any) {
      console.log("Ошибка при удалении категории", err);
    }
  }
};
