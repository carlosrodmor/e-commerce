<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  ctaText: string
}>()
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <button class="cta-button">{{ ctaText }}</button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 90vh;
  background: linear-gradient(45deg, var(--color-gray-100), var(--color-white));
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
}

.hero-content {
  max-width: 900px;
  padding: 3rem;
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, var(--color-primary), var(--color-primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero p {
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: 2.5rem;
  font-weight: 300;
}

.cta-button {
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: var(--shadow-md);
}

.cta-button:hover {
  background: var(--color-primary-light);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
  .hero {
    height: 80vh;
  }

  .hero h1 {
    font-size: 3rem;
  }

  .hero p {
    font-size: 1.4rem;
  }
}
</style>
