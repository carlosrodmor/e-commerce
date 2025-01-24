<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/') // Redirigir al home después del login exitoso
  } catch (e) {
    error.value = e as string
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="handleSubmit" class="auth-form">
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
          {{ authStore.loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>

        <p class="auth-link">
          ¿No tienes cuenta?
          <RouterLink to="/register">Regístrate</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Usar los mismos estilos que RegisterView.vue */
</style>
