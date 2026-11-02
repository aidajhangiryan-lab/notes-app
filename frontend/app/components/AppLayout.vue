<template>
  <div class="layout">
    <div class="bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
    </div>

    <aside class="sidebar">
      <NoteSidebar />
    </aside>

    <main class="content">
      <NoteList />
    </main>
  </div>
</template>

<style scoped>
.layout {
  position: relative;
  display: flex;
  gap: 24px;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 24px;
}

/* ---------- фон ---------- */
.bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(135deg, #fdd6de 0%, #f9bfcd 45%, #f5a8bd 100%);
}

.orb {
  position: absolute;
  border-radius: 50%;
  box-shadow:
    inset 0 20px 40px rgba(255, 255, 255, 0.75),
    inset 0 -25px 45px rgba(200, 80, 115, 0.3),
    0 25px 50px rgba(170, 60, 95, 0.2);
  backdrop-filter: blur(8px);
}

.orb-1 {
  width: 550px;
  height: 550px;
  bottom: -150px;
  left: -100px;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 228, 234, 0.95) 0%,
    rgba(248, 166, 187, 0.9) 45%,
    rgba(226, 111, 143, 0.75) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.7);
  z-index: 1;
}

.orb-2 {
  width: 700px;
  height: 700px;
  top: 10%;
  left: 25%;
  background: radial-gradient(
    circle at 40% 30%,
    rgba(255, 232, 237, 0.85) 0%,
    rgba(248, 178, 196, 0.7) 50%,
    rgba(233, 128, 155, 0.55) 100%
  );
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  z-index: 2;
}

.orb-3 {
  width: 600px;
  height: 600px;
  top: -180px;
  right: -100px;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 238, 232, 0.95) 0%,
    rgba(250, 186, 178, 0.85) 45%,
    rgba(236, 125, 135, 0.7) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.6);
  z-index: 1;
}

.orb-4 {
  width: 320px;
  height: 320px;
  bottom: 6%;
  right: 4%;
  background: radial-gradient(
    circle at 35% 30%,
    rgba(255, 228, 216, 0.95) 0%,
    rgba(251, 192, 172, 0.8) 50%,
    rgba(240, 140, 130, 0.65) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.7);
  z-index: 3;
}

/* ---------- колонки ---------- */
.sidebar,
.content {
  z-index: 5;
}

.sidebar {
  position: sticky;
  top: 24px;
  align-self: flex-start;
  width: 340px;
  flex-shrink: 0;
}

.content {
  position: relative;
  flex: 1;
  min-width: 0;
}

@media (max-width: 800px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    position: static;
    width: 100%;
  }
}
</style>
