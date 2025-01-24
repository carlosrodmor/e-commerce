<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
/* Aquí puedes agregar estilos globales si los necesitas */
#app {
  padding-top: 80px; /* Altura de la navbar */
}
</style>
