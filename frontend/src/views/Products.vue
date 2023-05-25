<script setup>
import { useProductStore } from '../store/productStore.js'

const productStore = useProductStore()
productStore.fetchProducts()
</script>

<template>

  <div class="text-bg-dark">
    {{productStore.products}}
  </div>

</template>
