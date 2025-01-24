<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import CategorySection from '@/components/home/CategorySection.vue'
import ProductSection from '@/components/home/ProductSection.vue'

const categoryImages = {
  category1: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format',
  category2: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&auto=format',
  category3: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&auto=format',
  category4: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format',
}

const categories = [
  { image: categoryImages.category1, title: 'Ropa', description: 'Diseños contemporáneos' },
  { image: categoryImages.category2, title: 'Accesorios', description: 'Detalles únicos' },
  { image: categoryImages.category3, title: 'Calzado', description: 'Confort y estilo' },
  { image: categoryImages.category4, title: 'Colección', description: 'Piezas exclusivas' },
]

const featuredProducts = [
  {
    id: 1,
    name: 'Blazer Minimalista',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format',
    description: 'Elegancia atemporal en cada detalle',
  },
  {
    id: 2,
    name: 'Bolso Estructurado',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format',
    description: 'Diseño geométrico moderno',
  },
  {
    id: 3,
    name: 'Mocasines Clásicos',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format',
    description: 'Artesanía italiana refinada',
  },
  {
    id: 4,
    name: 'Vestido Midi',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format',
    description: 'Simplicidad sofisticada',
  },
]

const features = [
  {
    icon: 'fa-solid fa-truck-fast',
    title: 'Envío Gratuito',
    description: 'En pedidos superiores a 100€',
  },
  {
    icon: 'fa-solid fa-rotate-left',
    title: 'Devolución Fácil',
    description: '30 días de garantía',
  },
  {
    icon: 'fa-solid fa-shield',
    title: 'Compra Segura',
    description: 'Pago 100% seguro',
  },
]
</script>

<template>
  <main>
    <HeroSection
      title="Elegancia Minimalista"
      subtitle="Descubre nuestra colección 2024: donde la simplicidad encuentra la sofisticación"
      ctaText="Explorar Colección"
    />

    <!-- Características -->
    <section class="features">
      <div class="feature-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <i :class="feature.icon"></i>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <CategorySection :categories="categories" />
    <ProductSection :products="featuredProducts" />

    <!-- Nueva sección de newsletter -->
    <section class="newsletter">
      <div class="newsletter-content">
        <h2>Únete a Nuestro Mundo</h2>
        <p>Suscríbete para recibir las últimas tendencias y ofertas exclusivas</p>
        <form class="newsletter-form">
          <input type="email" placeholder="Tu correo electrónico" />
          <button type="submit">Suscribirse</button>
        </form>
      </div>
    </section>
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

/* Estilos para Features */
.features {
  padding: 4rem 2rem;
  background: var(--color-background-soft);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-card i {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.feature-card p {
  color: var(--color-text);
  font-size: 1rem;
}

/* Estilos para Newsletter */
.newsletter {
  padding: 6rem 2rem;
  background: linear-gradient(45deg, var(--color-background-soft), var(--color-background));
  text-align: center;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
}

.newsletter h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.newsletter p {
  margin-bottom: 2rem;
  color: var(--color-text);
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 50px;
  font-size: 1rem;
}

.newsletter-form button {
  padding: 1rem 2rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background: var(--color-primary-light);
}

@media (max-width: 768px) {
  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form button {
    width: 100%;
  }
}
</style>
