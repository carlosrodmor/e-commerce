<script setup lang="ts">
interface Props {
  modelValue: string
}

defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="Buscar productos..."
      class="search-input"
    />
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  font-size: var(--text-base);
}
</style>
