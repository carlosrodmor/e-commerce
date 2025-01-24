<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="logo">
        <h1>MINIMAL</h1>
      </RouterLink>

      <button class="menu-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen">
        <span class="sr-only">Menu</span>
        <div class="hamburger" :class="{ 'is-active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <RouterLink to="/" class="nav-link">Inicio</RouterLink>
        <RouterLink to="/shop" class="nav-link">Tienda</RouterLink>
        <RouterLink to="/collections" class="nav-link">Colecciones</RouterLink>
        <RouterLink to="/about" class="nav-link">Nosotros</RouterLink>
      </div>

      <div class="nav-actions">
        <button class="icon-button">
          <span class="sr-only">Buscar</span>
          <i class="fas fa-search"></i>
        </button>
        <button class="icon-button">
          <span class="sr-only">Carrito</span>
          <i class="fas fa-shopping-bag"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: var(--bg-primary);
  z-index: 1000;
  border-bottom: 1px solid var(--color-gray-100);
}

.navbar-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  text-decoration: none;
  border: none;
}

.logo h1 {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  color: var(--color-primary);
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
  margin: 0 2rem;
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  padding: 0.5rem 0;
  border: none;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  gap: 1rem;
}

.icon-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.icon-button:hover {
  color: var(--color-primary-light);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.hamburger {
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s ease;
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    padding: 2rem;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    border-bottom: 1px solid var(--color-gray-100);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-links.is-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
}
</style>
