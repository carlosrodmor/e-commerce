<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  image: string
}

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <section class="featured-products">
    <h2>Productos Destacados</h2>
    <div class="product-grid">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p class="price">€{{ product.price }}</p>
        <button class="add-to-cart">Añadir al Carrito</button>
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

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
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

@media (max-width: 768px) {
  .featured-products {
    padding: 4rem 1rem;
  }

  h2 {
    font-size: 2rem;
  }
}
</style>
