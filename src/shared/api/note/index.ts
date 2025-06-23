import axios from "axios";
import { getPathAPI } from "../constant";
import { UserProps, Note as NoteProps } from "shared/store/type";

export const getUserNotes = async (
  userId: number | null | undefined
): Promise<NoteProps[] | undefined> => {
  if (userId != null) {
    try {
      const response = await axios.get<NoteProps[]>(
        getPathAPI(`/notes/user/${userId}`)
      );
      return response.data;
    } catch (err: any) {
      console.log("Ошибка при получении заметок пользователя", err);
    }
  }
  return undefined;
};

export const getNoteById = async (
  id: number | null | undefined
): Promise<NoteProps | undefined> => {
  if (id != null) {
    try {
      const response = await axios.get<NoteProps>(getPathAPI(`/notes/${id}`));
      return response.data;
    } catch (err: any) {
      console.log("Ошибка при получении заметки по ID", err);
    }
  }
  return undefined;
};

export const createNote = async (
  user: UserProps | null,
  title: string,
  description: string,
  reminderDate: Date
): Promise<NoteProps | undefined> => {
  if (user) {
    try {
      const response = await axios.post<NoteProps>(getPathAPI("/notes"), {
        userId: user.id,
        title,
        description,
        reminderDate,
      });
      return response.data;
    } catch (err: any) {
      console.log("Ошибка при создании заметки", err);
    }
  }
  return undefined;
};

export const updateNote = async (
  id: number | null | undefined,
  data: { title: string; content: string }
): Promise<NoteProps | undefined> => {
  if (id != null) {
    try {
      const response = await axios.put<NoteProps>(getPathAPI(`/notes/${id}`), {
        title: data.title,
        content: data.content,
      });
      return response.data;
    } catch (err: any) {
      console.log("Ошибка при обновлении заметки", err);
    }
  }
  return undefined;
};

export const deleteNote = async (
  noteId: number | null | undefined
): Promise<void> => {
  if (noteId != null) {
    try {
      await axios.delete(getPathAPI(`/notes/${noteId}`));
    } catch (err: any) {
      console.log("Ошибка при удалении заметки", err);
    }
  }
};
