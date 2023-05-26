<script setup>
import { useProductStore } from '../store/productStore.js'

const productStore = useProductStore()
productStore.fetchProducts()
</script>

<template>
  <div class="bg-black">
    {{productStore.products}}
  </div>
</template>
