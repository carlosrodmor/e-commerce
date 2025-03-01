import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/global.css' // Importamos los estilos globales
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Inicializar el auth store
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
