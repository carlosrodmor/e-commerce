<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    router.push('/') // Redirigir al home después del registro exitoso
  } catch (e) {
    error.value = e as string
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Registro</h1>
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            placeholder="Tu nombre"
            :disabled="authStore.loading"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="tu@email.com"
            :disabled="authStore.loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="********"
            :disabled="authStore.loading"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="auth-button" :disabled="authStore.loading">
          {{ authStore.loading ? 'Registrando...' : 'Registrarse' }}
        </button>

        <p class="auth-link">
          ¿Ya tienes cuenta?
          <RouterLink to="/login">Inicia sesión</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-secondary);
}

.auth-card {
  background: var(--bg-primary);
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-lg);
}

.auth-card h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  font-size: var(--text-base);
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-lighter);
}

.auth-button {
  background: var(--color-primary);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-button:hover:not(:disabled) {
  background: var(--color-primary-light);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: var(--color-error);
  font-size: var(--text-sm);
  text-align: center;
}

.auth-link {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.auth-link a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-medium);
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>
