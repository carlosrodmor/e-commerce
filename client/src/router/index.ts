import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      children: [
        {
          path: '',
          components: {
            hero: () => import('@/components/home/HeroSection.vue'),
            categories: () => import('@/components/home/CategorySection.vue'),
            products: () => import('@/components/home/ProductSection.vue'),
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { public: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { public: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/views/ShopView.vue'),
      meta: { public: true },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isPublic = to.meta.public
  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = !!authStore.token

  if (requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    return next('/')
  }

  next()
})

export default router
