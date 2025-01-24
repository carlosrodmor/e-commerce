<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Category } from '@/interfaces/Category'
import { categoryService } from '@/services/category.service'

const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchCategories = async () => {
  try {
    categories.value = await categoryService.getCategories()
  } catch (e) {
    error.value = 'Error al cargar las categorías'
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder-image.jpg' // Imagen de respaldo
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <section class="categories">
    <h2>Categorías Destacadas</h2>

    <div v-if="loading" class="loading">Cargando categorías...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="category-grid">
      <div class="category-card" v-for="category in categories" :key="category.id">
        <img :src="category.image" :alt="category.name" @error="handleImageError" />
        <div class="category-content">
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.categories {
  padding: 6rem 2rem;
  max-width: 1300px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  color: var(--color-heading);
  position: relative;
  padding-bottom: 1rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
}

.category-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  transition: all 0.4s ease;
  box-shadow: var(--shadow-md);
  aspect-ratio: 16/9;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  position: absolute;
  top: 0;
  left: 0;
}

.category-card:hover img {
  transform: scale(1.05);
}

.category-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
}

.category-card h3 {
  color: var(--color-white);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.category-card p {
  color: var(--color-white);
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin: 0;
}

@media (max-width: 768px) {
  .categories {
    padding: 4rem 1rem;
  }

  h2 {
    font-size: 2rem;
  }

  .category-card h3 {
    font-size: 1.6rem;
  }

  .category-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.error {
  color: var(--color-error);
}
</style>
