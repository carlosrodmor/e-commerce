<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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

// Estado de paginación
const currentPage = ref(1)
const totalPages = ref(0)
const limit = ref(12)

// Obtener datos con filtros
const fetchData = async () => {
  try {
    loading.value = true
    const [productsData, categoriesData] = await Promise.all([
      productService.getProducts({
        category: selectedCategory.value,
        subCategory: selectedSubCategory.value,
        minPrice: priceRange.value.min,
        maxPrice: priceRange.value.max,
        inStock: showInStock.value,
        isNewArrival: showNewArrivals.value,
        onSale: showOnSale.value,
        search: searchQuery.value,
        sortBy: sortBy.value,
        page: currentPage.value,
        limit: limit.value,
      }),
      categoryService.getCategories(),
    ])

    products.value = productsData.products
    totalPages.value = productsData.pagination.totalPages
    categories.value = categoriesData
  } catch (e) {
    error.value = 'Error al cargar los datos'
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Observadores para recargar datos cuando cambien los filtros
watch(
  [
    selectedCategory,
    selectedSubCategory,
    priceRange,
    showInStock,
    showNewArrivals,
    showOnSale,
    sortBy,
    searchQuery,
  ],
  () => {
    currentPage.value = 1 // Resetear a la primera página cuando cambian los filtros
    fetchData()
  },
  { deep: true }, // Necesario para observar cambios en objetos como priceRange
)

// Watch separado para la paginación para evitar reseteos innecesarios
watch(currentPage, () => {
  fetchData()
})

// Función para cambiar de página
const changePage = (page: number) => {
  currentPage.value = page
}

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
  currentPage.value = 1
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

      <ProductGrid :products="products" :loading="loading" :error="error" />
    </div>

    <!-- Paginación -->
    <div class="pagination" v-if="totalPages > 1">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
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

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 4px;
  background: var(--bg-primary);
  cursor: pointer;
}

.pagination button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
</style>
