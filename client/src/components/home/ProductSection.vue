<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '@/interfaces/Product'
import { productService } from '@/services/product.service'
import ProductCard from '@/components/shop/ProductCard.vue'
import ProductSkeleton from '@/components/shop/ProductSkeleton.vue'
import { useIntersectionObserver } from '@vueuse/core'

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const retryCount = ref(0)
const maxRetries = 3
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    products.value = await productService.getFeaturedProducts()
  } catch (e) {
    if (retryCount.value < maxRetries) {
      retryCount.value++
      setTimeout(loadProducts, 1000 * retryCount.value)
    } else {
      error.value = 'Error al cargar los productos destacados'
    }
  } finally {
    loading.value = false
  }
}

// Solo cargar los productos cuando la sección sea visible
const { stop } = useIntersectionObserver(sectionRef, ([{ isIntersecting }]) => {
  if (isIntersecting && !isVisible.value) {
    isVisible.value = true
    loadProducts()
    stop()
  }
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>

<template>
  <section ref="sectionRef" class="featured-products">
    <h2 class="section-title">Productos Destacados</h2>

    <div v-if="loading" class="products-grid">
      <ProductSkeleton v-for="n in 8" :key="n" />
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
      <button @click="loadProducts" class="retry-button">Reintentar</button>
    </div>

    <div v-else class="products-grid">
      <TransitionGroup name="product-fade">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.featured-products {
  padding: 4rem 2rem;
  background: var(--bg-secondary);
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: var(--text-2xl);
  color: var(--text-primary);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1440px;
  margin: 0 auto;
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

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>
