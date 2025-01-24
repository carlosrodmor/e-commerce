<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import CategorySection from '@/components/CategorySection.vue'
import ProductSection from '@/components/ProductSection.vue'

const categoryImages = {
  category1: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format',
  category2: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format',
  category3: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format',
}

const categories = [
  { image: categoryImages.category1, title: 'Ropa' },
  { image: categoryImages.category2, title: 'Accesorios' },
  { image: categoryImages.category3, title: 'Calzado' },
]

const featuredProducts = [
  {
    id: 1,
    name: 'Camisa Minimalista',
    price: 59.99,
    image: '@/assets/product1.jpg',
  },
  {
    id: 2,
    name: 'Bolso Elegante',
    price: 89.99,
    image: '@/assets/product2.jpg',
  },
  {
    id: 3,
    name: 'Zapatos Clásicos',
    price: 129.99,
    image: '@/assets/product3.jpg',
  },
]
</script>

<template>
  <main>
    <HeroSection
      title="Descubre el Estilo"
      subtitle="Colección 2024: Minimalismo y Elegancia"
      ctaText="Explorar Colección"
    />
    <CategorySection :categories="categories" />
    <ProductSection :products="featuredProducts" />
  </main>
</template>

<style scoped>
/* Estilos generales */
main {
  max-width: 1440px;
  margin: 0 auto;
}

/* Sección Hero */
.hero {
  height: 90vh;
  background: linear-gradient(45deg, var(--color-background-soft), var(--color-background));
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
  background: linear-gradient(45deg, var(--color-heading), #42b883);
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
  background: linear-gradient(45deg, #42b883, #347474);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(66, 184, 131, 0.2);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.3);
}

/* Secciones Categorías y Productos */
.categories,
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
  background: linear-gradient(45deg, #42b883, #347474);
  border-radius: 2px;
}

/* Grid de Categorías */
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
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
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
  color: white;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Grid de Productos */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
}

.product-card {
  padding: 1.5rem;
  background: var(--color-background-soft);
  border-radius: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
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
  color: #42b883;
  margin-bottom: 1.5rem;
}

.add-to-cart {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #42b883, #347474);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
}

.add-to-cart:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Responsive */
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

  .categories,
  .featured-products {
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
