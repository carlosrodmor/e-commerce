<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  ctaText: string
}>()
</script>

<template>
  <section class="hero">
    <div class="hero-background">
      <div class="hero-image"></div>
      <div class="overlay"></div>
    </div>

    <div class="hero-content">
      <div class="content-wrapper">
        <span class="pre-title">Bienvenido a Minimal</span>
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>

        <div class="cta-group">
          <button class="cta-button primary">{{ ctaText }}</button>
          <button class="cta-button secondary">Ver Catálogo</button>
        </div>

        <div class="hero-features">
          <div class="feature">
            <i class="fas fa-truck-fast"></i>
            <span>Envío Gratis</span>
          </div>
          <div class="feature">
            <i class="fas fa-shield"></i>
            <span>Garantía de Calidad</span>
          </div>
          <div class="feature">
            <i class="fas fa-rotate-left"></i>
            <span>Devolución Fácil</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator">
      <span>Descubre más</span>
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 80px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  filter: saturate(0.8) brightness(0.9);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(255, 255, 255, 0.8) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content-wrapper {
  max-width: 600px;
}

.pre-title {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.9rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  display: block;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

p {
  font-size: clamp(1.1rem, 2vw, 1.8rem);
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  font-weight: 300;
  max-width: 800px;
}

.cta-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  min-width: 180px;
}

.cta-button.primary {
  background: var(--color-primary);
  color: white;
  border: none;
  box-shadow: var(--shadow-md);
}

.cta-button.primary:hover {
  background: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cta-button.secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.cta-button.secondary:hover {
  background: var(--color-primary);
  color: white;
}

.hero-features {
  display: flex;
  gap: 3rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.feature i {
  font-size: 1.2rem;
  color: var(--color-primary);
}

.feature span {
  font-size: 0.9rem;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  opacity: 0.7;
  animation: bounce 2s infinite;
  z-index: 1;
}

.scroll-indicator i {
  font-size: 1.2rem;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 2rem;
    text-align: center;
  }

  .content-wrapper {
    margin: 0 auto;
  }

  .cta-group {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-features {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .overlay {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.9) 100%
    );
  }
}
</style>
