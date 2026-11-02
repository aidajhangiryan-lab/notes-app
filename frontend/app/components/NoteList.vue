<template>
  <section class="glass panel">
    <h2>My Notes</h2>

    <p v-if="loading" class="state">Loading...</p>
    <p v-else-if="error" class="state">{{ error }}</p>
    <p v-else-if="!notes.length" class="state">
      No notes yet. Write your first one!
    </p>

    <div v-else class="list">
      <NoteCard v-for="note in notes" :key="note._id" :note="note" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { notes, loading, error, fetchNotes } = useNotes();

onMounted(fetchNotes);
</script>

<style scoped>
.panel {
  padding: 28px 32px 32px;
}

h2 {
  margin: 0 0 24px;
  color: var(--color-title);
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.15;
}

.state {
  margin: 0;
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-style: italic;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 600px) {
  .panel {
    padding: 20px;
  }

  h2 {
    font-size: 1.8rem;
  }
}
</style>
