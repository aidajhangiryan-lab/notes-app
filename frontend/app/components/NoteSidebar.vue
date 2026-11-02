<template>
  <form class="glass panel" autocomplete="off" @submit.prevent="handleSubmit">
    <h1>New Note</h1>

    <label for="note-title">Title</label>
    <input
      id="note-title"
      v-model="title"
      class="field"
      type="text"
      maxlength="100"
      placeholder="Give it a name..."
    />

    <label for="note-body">Note</label>
    <textarea
      id="note-body"
      v-model="body"
      class="field"
      maxlength="5000"
      placeholder="Write your thoughts..."
    ></textarea>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button type="submit" :disabled="!canSubmit">
      {{ isSaving ? "Saving..." : "Create note" }}
    </button>
  </form>
</template>

<script setup lang="ts">
const { createNote } = useNotes();

const title = ref("");
const body = ref("");
const isSaving = ref(false);
const errorMessage = ref("");

const canSubmit = computed(
  () =>
    title.value.trim() !== "" && body.value.trim() !== "" && !isSaving.value,
);

async function handleSubmit() {
  isSaving.value = true;
  errorMessage.value = "";
  try {
    await createNote({ title: title.value, body: body.value });
    title.value = "";
    body.value = "";
  } catch (e) {
    errorMessage.value = getErrorMessage(e);
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 32px;
}

h1 {
  margin: 0 0 14px;
  color: var(--color-title);
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.15;
}

label {
  margin-top: 6px;
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.error {
  margin: 0;
  color: var(--color-danger);
  font-size: 14px;
}

button {
  margin-top: 16px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: var(--color-accent);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(133, 82, 103, 0.3);
  transition: 0.2s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  background: var(--color-accent-dark);
  box-shadow: 0 10px 24px rgba(133, 82, 103, 0.4);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
