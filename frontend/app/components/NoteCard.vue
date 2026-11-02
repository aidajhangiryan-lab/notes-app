<template>
  <article class="note-card" :class="{ 'menu-open': showMenu }">
    <div class="note-header">
      <div class="note-heading">
        <h3 class="note-title">{{ note.title }}</h3>
        <span class="note-date" :title="createdText"
          >Updated {{ updatedText }}</span
        >
      </div>

      <div ref="menuWrap" class="menu-wrap">
        <button
          class="menu-button"
          aria-label="Actions"
          @click="showMenu = !showMenu"
        >
          ⋮
        </button>

        <div v-if="showMenu" class="note-menu">
          <button @click="openModal('update')">Update</button>
          <button @click="openModal('delete')">Delete</button>
        </div>
      </div>
    </div>

    <p class="note-body">{{ note.body }}</p>

    <Teleport to="body">
      <NoteUpdateModal
        v-if="modal === 'update'"
        :note="note"
        @close="modal = null"
      />
      <NoteDeleteModal
        v-if="modal === 'delete'"
        :note="note"
        @close="modal = null"
      />
    </Teleport>
  </article>
</template>

<script setup lang="ts">
import type { Note } from "~/types/note";

const props = defineProps<{ note: Note }>();

const showMenu = ref(false);
const modal = ref<"update" | "delete" | null>(null);
const menuWrap = ref<HTMLElement | null>(null);

const updatedText = computed(() =>
  new Date(props.note.updatedAt).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }),
);

const createdText = computed(
  () => `Created ${new Date(props.note.createdAt).toLocaleString("en-GB")}`,
);

function openModal(type: "update" | "delete") {
  modal.value = type;
  showMenu.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (!menuWrap.value?.contains(event.target as Node)) {
    showMenu.value = false;
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside),
);
</script>

<style scoped>
.note-card {
  position: relative;
  padding: 18px 20px 20px 30px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(133, 82, 103, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.note-card::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 8px;
  background: linear-gradient(180deg, #f4a9bd, #e07a99);
  border-radius: 16px 0 0 16px;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(133, 82, 103, 0.14);
}

.note-card.menu-open {
  z-index: 10;
}

.note-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.note-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  min-width: 0;
}

.note-title {
  margin: 0;
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 600;
  line-height: 1.2;
}

.note-date {
  color: var(--color-muted);
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-style: italic;
  white-space: nowrap;
}

.menu-wrap {
  position: relative;
  flex-shrink: 0;
}

.menu-button {
  padding: 2px 6px;
  border: none;
  background: transparent;
  color: var(--color-accent);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.menu-button:hover {
  color: var(--color-accent-dark);
}

.note-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 20;
  width: 140px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(133, 82, 103, 0.18);
}

.note-menu button {
  display: block;
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: #ffffff;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
}

.note-menu button:hover {
  background: #fff1f5;
}

.note-body {
  margin: 10px 0 0;
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
