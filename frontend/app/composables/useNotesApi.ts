import type { Note, NotePayload } from "~/types/note";

export const useNotesApi = () => {
  const baseURL = useRuntimeConfig().public.apiBase;

  return {
    getAll: () => $fetch<Note[]>("/notes", { baseURL }),

    create: (payload: NotePayload) =>
      $fetch<Note>("/notes", { baseURL, method: "POST", body: payload }),

    update: (id: string, payload: NotePayload) =>
      $fetch<Note>(`/notes/${id}`, { baseURL, method: "PATCH", body: payload }),

    remove: (id: string) =>
      $fetch<void>(`/notes/${id}`, { baseURL, method: "DELETE" }),
  };
};
