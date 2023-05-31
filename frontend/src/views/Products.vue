<script setup>

import { useProductStore } from '../store/productStore.js'
import ProductCard from '../component/product/ProductItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const edit = ref(false)
const productStore = useProductStore()
productStore.fetchProducts()

async function remove (workshop) {
    await productStore.delete(workshop.id)
}
</script>

<template>
  <div class="row">
    <div class="col-2 d-flex align-items-center">
      <h3 class="fw-bold">Products</h3>
    </div>

    <div class="col-10 p-1">
      <!-- action buttons -->
      <button class="btn float-end p-3 hover-darken">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-2x" />
      </button>

      <button class="btn float-end p-3 hover-darken" :class="{'bg-primary': edit}" @click="edit = !edit">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-2x" />
      </button>
    </div>
  </div>

  <div class="row box-md bg-white border-top">
    <!-- product list -->
    <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
        :edit="edit"
        @delete='remove' />
  </div>
</template>
