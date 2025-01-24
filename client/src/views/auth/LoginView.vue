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
      password: password.value,
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
      <p class="auth-subtitle">Bienvenido de nuevo</p>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-group">
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="tu@email.com"
              :disabled="authStore.loading"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="********"
              :disabled="authStore.loading"
            />
          </div>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" />
            <span>Recordarme</span>
          </label>
          <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>

        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>

        <button type="submit" class="auth-button" :disabled="authStore.loading">
          <i class="fas fa-sign-in-alt"></i>
          {{ authStore.loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>

        <div class="divider">
          <span>o</span>
        </div>

        <div class="social-login">
          <button type="button" class="social-button google">
            <i class="fab fa-google"></i>
            Continuar con Google
          </button>
        </div>

        <p class="auth-link">
          ¿No tienes cuenta?
          <RouterLink to="/register">Regístrate aquí</RouterLink>
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
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-size: 2rem;
}

.auth-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1rem;
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
  font-weight: 500;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group i {
  position: absolute;
  left: 1rem;
  color: var(--text-secondary);
}

.input-group input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  font-size: var(--text-base);
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-lighter);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-sm);
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.forgot-password {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  border: none;
}

.forgot-password:hover {
  text-decoration: underline;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.auth-button:hover:not(:disabled) {
  background: var(--color-primary-light);
  transform: translateY(-1px);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: var(--color-error);
  font-size: var(--text-sm);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-error-light, #fee2e2);
  border-radius: 8px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin: 1rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--color-gray-200);
}

.divider span {
  padding: 0 1rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  background: white;
  color: var(--text-primary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-button:hover {
  background: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.social-button.google i {
  color: #ea4335;
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
  border: none;
}

.auth-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 2rem;
  }

  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
