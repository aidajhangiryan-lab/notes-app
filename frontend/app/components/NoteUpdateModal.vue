<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <form class="modal" autocomplete="off" @submit.prevent="handleSave">
      <div class="modal-header">
        <h2>Update Note</h2>
        <button type="button" class="close-button" @click="emit('close')">
          ×
        </button>
      </div>

      <div class="form-group">
        <label for="update-title">Title</label>
        <input
          id="update-title"
          v-model="title"
          class="field"
          type="text"
          maxlength="100"
        />
      </div>

      <div class="form-group">
        <label for="update-body">Body</label>
        <textarea
          id="update-body"
          v-model="body"
          class="field"
          maxlength="5000"
        ></textarea>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="modal-actions">
        <button type="button" class="cancel-button" @click="emit('close')">
          Cancel
        </button>
        <button type="submit" class="save-button" :disabled="!canSave">
          {{ isSaving ? "Saving..." : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "~/types/note";

const props = defineProps<{ note: Note }>();
const emit = defineEmits<{ close: [] }>();

const { updateNote } = useNotes();

const title = ref(props.note.title);
const body = ref(props.note.body);
const isSaving = ref(false);
const errorMessage = ref("");

const canSave = computed(
  () =>
    title.value.trim() !== "" && body.value.trim() !== "" && !isSaving.value,
);

async function handleSave() {
  isSaving.value = true;
  errorMessage.value = "";
  try {
    await updateNote(props.note._id, { title: title.value, body: body.value });
    emit("close");
  } catch (e) {
    errorMessage.value = getErrorMessage(e);
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.error {
  margin: 0;
  color: var(--color-danger);
  font-size: 14px;
}
</style>
