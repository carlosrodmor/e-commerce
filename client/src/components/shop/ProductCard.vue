<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/interfaces/Product'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const imageLoaded = ref(false)
const imageError = ref(false)

const handleImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  imageError.value = true
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}
</script>

<template>
  <div class="product-card">
    <div class="image-container">
      <!-- Placeholder mientras carga -->
      <div v-show="!imageLoaded" class="image-placeholder"></div>

      <!-- Imagen con lazy loading -->
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        @load="handleImageLoad"
        @error="handleImageError"
        :class="{ 'image-loaded': imageLoaded }"
      />

      <!-- Badges -->
      <div class="badges">
        <span v-if="product.onSale" class="badge sale">Oferta</span>
        <span v-if="product.isNewArrival" class="badge new">Nuevo</span>
      </div>

      <!-- Fallback si hay error -->
      <div v-if="imageError" class="image-error">
        <i class="fas fa-image"></i>
      </div>
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

.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-border) 0%,
    var(--color-border-hover) 50%,
    var(--color-border) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

img.image-loaded {
  opacity: 1;
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border);
  color: var(--color-text);
  font-size: 2rem;
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

.badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: white;
}

.badge.sale {
  background: var(--color-error);
}

.badge.new {
  background: var(--color-primary);
}
</style>
