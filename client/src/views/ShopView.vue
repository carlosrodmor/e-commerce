<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product } from '@/interfaces/Product'
import type { Category } from '@/interfaces/Category'
import { productService } from '@/services/product.service'
import { categoryService } from '@/services/category.service'
import SearchBar from '@/components/shop/SearchBar.vue'
import ShopFilters from '@/components/shop/ShopFilters.vue'
import ProductGrid from '@/components/shop/ProductGrid.vue'

// Estado
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Filtros
const selectedCategory = ref<string>('')
const selectedSubCategory = ref<string>('')
const priceRange = ref<{ min: number; max: number }>({ min: 0, max: 1000 })
const showInStock = ref(true)
const showNewArrivals = ref(false)
const showOnSale = ref(false)
const sortBy = ref<string>('default')
const searchQuery = ref('')

// Obtener datos
const fetchData = async () => {
  try {
    loading.value = true
    const [productsData, categoriesData] = await Promise.all([
      productService.getProducts(),
      categoryService.getCategories(),
    ])
    products.value = productsData
    categories.value = categoriesData
  } catch (e) {
    error.value = 'Error al cargar los datos'
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Productos filtrados y ordenados
const filteredAndSortedProducts = computed(() => {
  let filtered = products.value.filter((product) => {
    if (selectedCategory.value && product.category !== selectedCategory.value) return false
    if (selectedSubCategory.value && product.subCategory !== selectedSubCategory.value) return false
    if (product.price < priceRange.value.min || product.price > priceRange.value.max) return false
    if (showInStock.value && product.stock === 0) return false
    if (showNewArrivals.value && !product.isNewArrival) return false
    if (showOnSale.value && !product.onSale) return false
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }
    return true
  })

  // Ordenar productos
  switch (sortBy.value) {
    case 'price-asc':
      return filtered.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return filtered.sort((a, b) => b.price - a.price)
    case 'rating':
      return filtered.sort((a, b) => b.rating - a.rating)
    default:
      return filtered
  }
})

// Resetear filtros
const resetFilters = () => {
  selectedCategory.value = ''
  selectedSubCategory.value = ''
  priceRange.value = { min: 0, max: 1000 }
  showInStock.value = true
  showNewArrivals.value = false
  showOnSale.value = false
  sortBy.value = 'default'
  searchQuery.value = ''
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="shop-container">
    <SearchBar v-model="searchQuery" />

    <div class="shop-layout">
      <ShopFilters
        :categories="categories"
        v-model:selectedCategory="selectedCategory"
        v-model:selectedSubCategory="selectedSubCategory"
        v-model:priceRange="priceRange"
        v-model:showInStock="showInStock"
        v-model:showNewArrivals="showNewArrivals"
        v-model:showOnSale="showOnSale"
        v-model:sortBy="sortBy"
        @reset="resetFilters"
      />

      <ProductGrid :products="filteredAndSortedProducts" :loading="loading" :error="error" />
    </div>
  </div>
</template>

<style scoped>
.shop-container {
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
}

.shop-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .shop-layout {
    grid-template-columns: 1fr;
  }
}
</style>
