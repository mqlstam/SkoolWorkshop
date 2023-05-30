<script setup>

import { useProductStore } from '../store/productStore.js'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()
productStore.fetchProducts()

</script>

<template>
  <ProductCard
      v-for="product in productStore.products"
      :key="product.id"
      :product="product">
  </ProductCard>
</template>
