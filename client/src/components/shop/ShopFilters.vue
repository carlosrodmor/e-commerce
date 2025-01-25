<script setup lang="ts">
import { computed } from 'vue'
import type { Category } from '@/interfaces/Category'

interface Props {
  categories: Category[]
  selectedCategory: string
  selectedSubCategory: string
  priceRange: { min: number; max: number }
  showInStock: boolean
  showNewArrivals: boolean
  showOnSale: boolean
  sortBy: string
}

interface Emits {
  (e: 'update:selectedCategory', value: string): void
  (e: 'update:selectedSubCategory', value: string): void
  (e: 'update:priceRange', value: { min: number; max: number }): void
  (e: 'update:showInStock', value: boolean): void
  (e: 'update:showNewArrivals', value: boolean): void
  (e: 'update:showOnSale', value: boolean): void
  (e: 'update:sortBy', value: string): void
  (e: 'reset'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const availableSubCategories = computed(() => {
  const category = props.categories.find((c) => c.id === props.selectedCategory)
  return category ? category.subCategories : []
})

const resetFilters = () => {
  emit('reset')
}
</script>

<template>
  <aside class="filters-panel">
    <h2>Filtros</h2>

    <!-- Categorías -->
    <div class="filter-section">
      <h3>Categorías</h3>
      <select
        :value="selectedCategory"
        @input="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
        class="select-filter"
      >
        <option value="">Todas las categorías</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Subcategorías -->
    <div class="filter-section" v-if="selectedCategory">
      <h3>Subcategorías</h3>
      <select
        :value="selectedSubCategory"
        @input="$emit('update:selectedSubCategory', ($event.target as HTMLSelectElement).value)"
        class="select-filter"
      >
        <option value="">Todas las subcategorías</option>
        <option v-for="subCat in availableSubCategories" :key="subCat" :value="subCat">
          {{ subCat }}
        </option>
      </select>
    </div>

    <!-- Rango de precio -->
    <div class="filter-section">
      <h3>Precio</h3>
      <div class="price-range">
        <input
          type="number"
          :value="priceRange.min"
          @input="
            emit('update:priceRange', {
              min: Number(($event.target as HTMLInputElement).value),
              max: priceRange.max,
            })
          "
          class="price-input"
          min="0"
        />
        <span>-</span>
        <input
          type="number"
          :value="priceRange.max"
          @input="
            emit('update:priceRange', {
              min: priceRange.min,
              max: Number(($event.target as HTMLInputElement).value),
            })
          "
          class="price-input"
          min="0"
        />
      </div>
    </div>

    <!-- Checkboxes -->
    <div class="filter-section">
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="showInStock"
          @input="$emit('update:showInStock', ($event.target as HTMLInputElement).checked)"
        />
        Solo productos en stock
      </label>
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="showNewArrivals"
          @input="$emit('update:showNewArrivals', ($event.target as HTMLInputElement).checked)"
        />
        Nuevos productos
      </label>
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="showOnSale"
          @input="$emit('update:showOnSale', ($event.target as HTMLInputElement).checked)"
        />
        En oferta
      </label>
    </div>

    <!-- Ordenar por -->
    <div class="filter-section">
      <h3>Ordenar por</h3>
      <select
        :value="sortBy"
        @input="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
        class="select-filter"
      >
        <option value="default">Relevancia</option>
        <option value="price-asc">Precio: Menor a mayor</option>
        <option value="price-desc">Precio: Mayor a menor</option>
        <option value="rating">Mejor valorados</option>
      </select>
    </div>

    <!-- Botón resetear -->
    <button @click="resetFilters" class="reset-button">Resetear filtros</button>
  </aside>
</template>

<style scoped>
.filters-panel {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h3 {
  margin-bottom: 0.5rem;
  font-size: var(--text-base);
  color: var(--text-primary);
}

.select-filter {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 6px;
  background: var(--bg-primary);
}

.price-range {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.price-input {
  width: 100px;
  padding: 0.5rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 6px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.reset-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background: var(--color-primary-light);
}
</style>
