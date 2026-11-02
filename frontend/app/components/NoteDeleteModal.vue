<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>Delete Note</h2>
        <button class="close-button" @click="emit('close')">×</button>
      </div>

      <p class="delete-text">
        Are you sure you want to delete <strong>{{ note.title }}</strong
        >?
      </p>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="modal-actions">
        <button class="cancel-button" @click="emit('close')">Cancel</button>
        <button
          class="delete-button"
          :disabled="isDeleting"
          @click="handleDelete"
        >
          {{ isDeleting ? "Deleting..." : "Delete" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "~/types/note";

const props = defineProps<{ note: Note }>();
const emit = defineEmits<{ close: [] }>();

const { deleteNote } = useNotes();

const isDeleting = ref(false);
const errorMessage = ref("");

async function handleDelete() {
  isDeleting.value = true;
  errorMessage.value = "";
  try {
    await deleteNote(props.note._id);
  } catch (e) {
    errorMessage.value = getErrorMessage(e);
    isDeleting.value = false;
  }
}
</script>

<style scoped>
.delete-text {
  margin: 0;
  color: var(--color-text);
  line-height: 1.6;
}

.delete-text strong {
  color: var(--color-accent);
}

.error {
  margin: 12px 0 0;
  color: var(--color-danger);
  font-size: 14px;
}
</style>
