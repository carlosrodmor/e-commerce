<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '@/interfaces/Product'
import { productService } from '@/services/product.service'

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchProducts = async () => {
  try {
    products.value = await productService.getProducts()
  } catch (e) {
    error.value = 'Error al cargar los productos'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>

<template>
  <section class="featured-products">
    <h2>Productos Destacados</h2>

    <div v-if="loading" class="loading">Cargando productos...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="product-grid">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p class="description">{{ product.description }}</p>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <p class="stock" v-if="product.stock > 0">Stock: {{ product.stock }} unidades</p>
        <p class="stock out" v-else>Sin stock</p>
        <button class="add-to-cart" :disabled="product.stock === 0">
          {{ product.stock > 0 ? 'Añadir al Carrito' : 'Agotado' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-products {
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

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
}

.product-card {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 16px;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.product-card img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.product-card h3 {
  font-size: 1.3rem;
  color: var(--color-heading);
  margin: 1rem 0;
  font-weight: 600;
}

.description {
  color: var(--color-text);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.stock {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.stock.out {
  color: var(--color-error);
}

.add-to-cart {
  width: 100%;
  padding: 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: var(--shadow-sm);
}

.add-to-cart:hover {
  background: var(--color-primary-light);
  opacity: 1;
}

.add-to-cart:disabled {
  background: var(--color-gray-400);
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .featured-products {
    padding: 4rem 1rem;
  }

  h2 {
    font-size: 2rem;
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
