<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { categoryService } from '@/services/category.service'
import type { Category } from '@/interfaces/Category'

const props = defineProps<{
  category: string
  subCategory: string
  priceRange: { min: number; max: number }
  showInStock: boolean
  showNewArrivals: boolean
  showOnSale: boolean
  sortBy: string
}>()

const emit = defineEmits<{
  'update:category': [value: string]
  'update:subCategory': [value: string]
  'update:priceRange': [value: { min: number; max: number }]
  'update:showInStock': [value: boolean]
  'update:showNewArrivals': [value: boolean]
  'update:showOnSale': [value: boolean]
  'update:sortBy': [value: string]
}>()

const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const selectedCategory = ref(props.category)
const selectedSubCategory = ref(props.subCategory)

// Cargar categorías
onMounted(async () => {
  try {
    categories.value = await categoryService.getCategories()
  } catch (e) {
    error.value = 'Error al cargar las categorías'
  } finally {
    loading.value = false
  }
})

// Observar cambios en las props
watch(
  () => props.category,
  (newValue) => {
    selectedCategory.value = newValue
  },
)

watch(
  () => props.subCategory,
  (newValue) => {
    selectedSubCategory.value = newValue
  },
)

// Manejar cambios en los filtros
const updateCategory = (value: string) => {
  selectedCategory.value = value
  selectedSubCategory.value = '' // Resetear subcategoría al cambiar categoría
  emit('update:category', value)
  emit('update:subCategory', '')
}

const updateSubCategory = (value: string) => {
  selectedSubCategory.value = value
  emit('update:subCategory', value)
}

const updatePriceRange = (value: { min: number; max: number }) => {
  emit('update:priceRange', value)
}

const resetFilters = () => {
  selectedCategory.value = ''
  selectedSubCategory.value = ''
  emit('update:category', '')
  emit('update:subCategory', '')
  emit('update:priceRange', { min: 0, max: 1000 })
  emit('update:showInStock', true)
  emit('update:showNewArrivals', false)
  emit('update:showOnSale', false)
  emit('update:sortBy', 'default')
}
</script>

<template>
  <aside class="filters">
    <h2>Filtros</h2>

    <!-- Categorías -->
    <div class="filter-section">
      <h3>Categorías</h3>
      <div class="select-wrapper">
        <select v-model="selectedCategory" @change="updateCategory($event.target.value)">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Subcategorías -->
    <div v-if="selectedCategory" class="filter-section">
      <h3>Subcategorías</h3>
      <div class="select-wrapper">
        <select v-model="selectedSubCategory" @change="updateSubCategory($event.target.value)">
          <option value="">Todas las subcategorías</option>
          <option
            v-for="subCat in categories.find((c) => c.id === selectedCategory)?.subCategories"
            :key="subCat"
            :value="subCat"
          >
            {{ subCat.charAt(0).toUpperCase() + subCat.slice(1).toLowerCase() }}
          </option>
        </select>
      </div>
    </div>

    <!-- Rango de precios -->
    <div class="filter-section">
      <h3>Rango de precio</h3>
      <div class="price-range">
        <div class="input-wrapper">
          <span class="currency">€</span>
          <input
            type="number"
            :value="props.priceRange.min"
            @input="
              updatePriceRange({
                ...props.priceRange,
                min: +($event.target as HTMLInputElement).value,
              })
            "
            min="0"
            placeholder="Min"
          />
        </div>
        <span class="separator"></span>
        <div class="input-wrapper">
          <span class="currency">€</span>
          <input
            type="number"
            :value="props.priceRange.max"
            @input="
              updatePriceRange({
                ...props.priceRange,
                max: +($event.target as HTMLInputElement).value,
              })
            "
            min="0"
            placeholder="Max"
          />
        </div>
      </div>
    </div>

    <!-- Checkboxes -->
    <div class="filter-section">
      <h3>Estado</h3>
      <div class="checkbox-group">
        <label class="checkbox">
          <input
            type="checkbox"
            :checked="props.showInStock"
            @change="emit('update:showInStock', !props.showInStock)"
          />
          <span class="checkbox-custom"></span>
          <span>En stock</span>
        </label>

        <label class="checkbox">
          <input
            type="checkbox"
            :checked="props.showNewArrivals"
            @change="emit('update:showNewArrivals', !props.showNewArrivals)"
          />
          <span class="checkbox-custom"></span>
          <span>Nuevos productos</span>
        </label>

        <label class="checkbox">
          <input
            type="checkbox"
            :checked="props.showOnSale"
            @change="emit('update:showOnSale', !props.showOnSale)"
          />
          <span class="checkbox-custom"></span>
          <span>En oferta</span>
        </label>
      </div>
    </div>

    <!-- Ordenar por -->
    <div class="filter-section">
      <h3>Ordenar por</h3>
      <div class="select-wrapper">
        <select :value="props.sortBy" @change="emit('update:sortBy', $event.target.value)">
          <option value="default">Relevancia</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>
    </div>

    <button class="reset-button" @click="resetFilters">
      <i class="fas fa-undo-alt"></i>
      <span>Resetear filtros</span>
    </button>
  </aside>
</template>

<style scoped>
.filters {
  position: sticky;
  top: 6rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  scrollbar-width: thin;
  width: 280px;
  margin-top: 1rem;
}

.filters::-webkit-scrollbar {
  width: 4px;
}

.filters::-webkit-scrollbar-track {
  background: transparent;
}

.filters::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 20px;
}

.filter-section {
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

h3 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '';
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  pointer-events: none;
  opacity: 0.5;
}

select {
  width: 100%;
  padding: 0.625rem 2rem 0.625rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

select:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary-light);
}

select option {
  padding: 0.5rem;
}

/* Añadir esta nueva regla para capitalizar las subcategorías */
.filter-section:has(h3:contains('Subcategorías')) select option {
  text-transform: capitalize;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-wrapper {
  position: relative;
  flex: 1;
}

.currency {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.input-wrapper input {
  width: 100%;
  padding: 0.625rem 0.75rem 0.625rem 1.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.input-wrapper input:hover,
.input-wrapper input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary-light);
}

.separator {
  width: 8px;
  height: 1px;
  background: var(--color-border);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  user-select: none;
}

.checkbox input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border);
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox input:checked + .checkbox-custom {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
}

.checkbox span:last-child {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.reset-button {
  width: 100%;
  padding: 0.625rem;
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.reset-button:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .filters {
    position: relative;
    top: 0;
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
