import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface LoginData {
  email: string
  password: string
}

interface RegisterData extends LoginData {
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Cargar token del localStorage al iniciar
  const initializeAuth = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  const register = async (data: RegisterData) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Error en el registro')
      }

      token.value = result.data.token
      user.value = result.data.user
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('user', JSON.stringify(result.data.user))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error en el registro'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const login = async (data: LoginData) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Error en el inicio de sesión')
      }

      token.value = result.data.token
      user.value = result.data.user
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('user', JSON.stringify(result.data.user))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error en el inicio de sesión'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    initializeAuth
  }
})
