<script setup>
import { useProductStore } from '../store/productStore.js'
import ProductItem from '../component/product/ProductItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, computed } from 'vue'

const edit = ref(false)
const productStore = useProductStore()
productStore.fetch()
const search = ref('')

const filteredProducts = computed(() => {
    return productStore.search(search.value)
})

async function remove (product) {
    await productStore.delete(product.id)
}
</script>

<template>
  <div class="row">
    <div class="col-2 d-flex align-items-center">
      <h3 class="fw-bold">Products</h3>
    </div>

    <div class="col-10 p-1">
      <!-- action buttons -->
      <router-link class="btn float-end p-3 hover-darken" to="/products/new">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-2x" />
      </router-link>

      <button
        class="btn float-end p-3 hover-darken"
        :class="{'bg-primary': edit}"
        @click="edit = !edit"
      >
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-2x" />
      </button>
    </div>
  </div>

  <div class="row box-md bg-white border-top">
    <input type="text" v-model="search" placeholder="Search products..." class="form-control search p-4">

    <!-- product list -->
    <ProductItem
  v-for="product in filteredProducts"
  :key="product.id"

      :product="product"
      :edit="edit"
      @delete="remove" />
  </div>
</template>
