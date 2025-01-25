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
            {{ subCat }}
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
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
}

.filter-section {
  margin-bottom: 2rem;
}

h2 {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

h3 {
  font-size: var(--text-sm);
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '▼';
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
  font-size: 0.8rem;
}

select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--text-sm);
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

select:hover {
  border-color: var(--color-primary);
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
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--text-sm);
  transition: border-color 0.2s ease;
}

.input-wrapper input:hover,
.input-wrapper input:focus {
  border-color: var(--color-primary);
}

.separator {
  width: 12px;
  height: 2px;
  background: var(--color-border);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.checkbox input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
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
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
}

.checkbox span:last-child {
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.reset-button {
  width: 100%;
  padding: 0.75rem;
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
  font-size: var(--text-sm);
}

.reset-button:hover {
  background: var(--color-primary);
  color: white;
}

@media (max-width: 768px) {
  .filters {
    padding: 1.5rem;
  }

  .filter-section {
    margin-bottom: 1.5rem;
  }
}
</style>
