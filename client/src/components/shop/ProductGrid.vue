<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/interfaces/Product'
import ProductCard from './ProductCard.vue'

interface Props {
  products: Product[]
  loading: boolean
  error: string | null
}

const props = defineProps<Props>()

// Log para debug
console.log('Products received:', props.products)
</script>

<template>
  <main class="products-grid">
    <div v-if="loading" class="loading">Cargando productos...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="products.length === 0" class="no-results">
      No se encontraron productos con los filtros seleccionados
    </div>

    <div v-else class="products">
      <TransitionGroup name="product-fade">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </TransitionGroup>
    </div>
  </main>
</template>

<style scoped>
.products-grid {
  width: 100%;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.loading,
.error,
.no-results {
  text-align: center;
  padding: 2rem;
  font-size: var(--text-lg);
  color: var(--text-secondary);
}

.error {
  color: var(--color-error);
}

.product-fade-enter-active,
.product-fade-leave-active {
  transition: all 0.3s ease;
}

.product-fade-enter-from,
.product-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .products {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>
