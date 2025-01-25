<script setup lang="ts">
import type { Product } from '@/interfaces/Product'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>

<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
      <span v-if="product.onSale" class="sale-badge">Oferta</span>
      <span v-if="product.isNewArrival" class="new-badge">Nuevo</span>
    </div>

    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>

      <div class="product-meta">
        <div class="rating">
          <span class="stars">★★★★★</span>
          <span class="rating-value">{{ product.rating }}</span>
          <span class="reviews">({{ product.reviews }})</span>
        </div>

        <p class="price">{{ formatPrice(product.price) }}</p>

        <p class="stock" :class="{ out: product.stock === 0 }">
          {{ product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado' }}
        </p>
      </div>

      <button class="add-to-cart" :disabled="product.stock === 0">
        {{ product.stock > 0 ? 'Añadir al carrito' : 'Agotado' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.product-image {
  position: relative;
  aspect-ratio: 1;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sale-badge,
.new-badge {
  position: absolute;
  top: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.sale-badge {
  right: 1rem;
  background: var(--color-error);
  color: white;
}

.new-badge {
  left: 1rem;
  background: var(--color-primary);
  color: white;
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  margin-bottom: 0.5rem;
  font-size: var(--text-lg);
}

.description {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  margin-bottom: 1rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stars {
  color: gold;
}

.price {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.stock {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.stock.out {
  color: var(--color-error);
}

.add-to-cart {
  width: 100%;
  padding: 0.75rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart:hover:not(:disabled) {
  background: var(--color-primary-light);
}

.add-to-cart:disabled {
  background: var(--color-gray-400);
  cursor: not-allowed;
}
</style>
