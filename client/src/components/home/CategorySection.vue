<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useIntersectionObserver } from '@vueuse/core'
import type { Category } from '@/interfaces/Category'
import { categoryService } from '@/services/category.service'

const router = useRouter()
const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const categoryImages = {
  Muebles: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
  Iluminación: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
  Decoración: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80',
  Cocina: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=500&q=80',
  Baño: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&q=80',
}

const navigateToCategory = (categoryId: string) => {
  router.push({
    name: 'shop',
    query: { category: categoryId },
  })
}

const loadCategories = async () => {
  try {
    loading.value = true
    categories.value = await categoryService.getCategories()
  } catch (e) {
    error.value = 'Error al cargar las categorías'
  } finally {
    loading.value = false
  }
}

// Usar intersection observer para carga lazy
useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting && !isVisible.value) {
    isVisible.value = true
    loadCategories()
  }
})
</script>

<template>
  <section ref="sectionRef" class="categories-section">
    <h2 class="section-title">Nuestras Categorías</h2>

    <div v-if="loading && isVisible" class="categories-grid">
      <div v-for="n in 5" :key="n" class="category-skeleton">
        <div class="image-skeleton"></div>
        <div class="content-skeleton">
          <div class="title-skeleton"></div>
          <div class="subtitle-skeleton"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="isVisible" class="categories-grid">
      <TransitionGroup name="category-fade">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-card"
          @click="navigateToCategory(category.id)"
        >
          <div class="category-image">
            <img
              :src="categoryImages[category.name as keyof typeof categoryImages]"
              :alt="category.name"
              loading="lazy"
            />
          </div>
          <h3>{{ category.name }}</h3>
          <p>{{ category.subCategories.length }} subcategorías</p>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.categories-section {
  padding: 4rem 2rem;
  min-height: 400px; /* Altura mínima para evitar saltos */
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: var(--text-2xl);
  color: var(--text-primary);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1440px;
  margin: 0 auto;
}

/* Skeleton styles */
.category-skeleton {
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  height: 300px;
}

.image-skeleton {
  width: 100%;
  height: 200px;
  background: linear-gradient(
    90deg,
    var(--color-border) 0%,
    var(--color-border-hover) 50%,
    var(--color-border) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.content-skeleton {
  padding: 1rem;
}

.title-skeleton {
  height: 24px;
  width: 70%;
  background: var(--color-border);
  margin-bottom: 0.5rem;
  animation: shimmer 1.5s infinite;
}

.subtitle-skeleton {
  height: 16px;
  width: 40%;
  background: var(--color-border);
  animation: shimmer 1.5s infinite;
}

/* Animations */
.category-fade-enter-active,
.category-fade-leave-active {
  transition: all 0.3s ease;
}

.category-fade-enter-from,
.category-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.category-card {
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-4px);
}

.category-image {
  aspect-ratio: 16/9;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-card h3 {
  padding: 1rem;
  margin: 0;
  font-size: var(--text-lg);
  color: var(--text-primary);
}

.category-card p {
  padding: 0 1rem 1rem;
  margin: 0;
  color: var(--text-secondary);
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.error {
  color: var(--color-error);
}
</style>
