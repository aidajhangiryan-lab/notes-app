import type { Note, NotePayload } from "~/types/note";

export const useNotes = () => {
  const api = useNotesApi();

  const notes = useState<Note[]>("notes", () => []);
  const loading = useState<boolean>("notes-loading", () => true);
  const error = useState<string>("notes-error", () => "");

  async function fetchNotes() {
    loading.value = true;
    error.value = "";
    try {
      notes.value = await api.getAll();
    } catch {
      error.value = "Cant find your notes";
    } finally {
      loading.value = false;
    }
  }

  async function createNote(payload: NotePayload) {
    const created = await api.create(payload);
    notes.value.unshift(created);
  }

  async function updateNote(id: string, payload: NotePayload) {
    const updated = await api.update(id, payload);
    const index = notes.value.findIndex((n) => n._id === id);
    if (index !== -1) notes.value[index] = updated;
  }

  async function deleteNote(id: string) {
    await api.remove(id);
    notes.value = notes.value.filter((n) => n._id !== id);
  }

  return {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
};
