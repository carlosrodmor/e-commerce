<script setup lang="ts">
interface Category {
  image: string
  title: string
}

defineProps<{
  categories: Category[]
}>()
</script>

<template>
  <section class="categories">
    <h2>Categorías Destacadas</h2>
    <div class="category-grid">
      <div class="category-card" v-for="category in categories" :key="category.title">
        <img :src="category.image" :alt="category.title" />
        <h3>{{ category.title }}</h3>
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
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.category-card img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

.category-card h3 {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: var(--color-white);
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
</style>
