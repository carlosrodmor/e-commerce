<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1>Mi Perfil</h1>
      <div class="profile-info">
        <div class="info-group">
          <label>Nombre</label>
          <p>{{ authStore.user?.name }}</p>
        </div>
        <div class="info-group">
          <label>Email</label>
          <p>{{ authStore.user?.email }}</p>
        </div>
        <div class="info-group">
          <label>Rol</label>
          <p>{{ authStore.user?.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
}

h1 {
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-group label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.info-group p {
  font-size: var(--text-base);
  color: var(--text-primary);
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin: 0;
}
</style>
