<script setup>
import {useProductStore} from '../store/productStore.js'
import {useRoute} from 'vue-router'
import EditProductForm from '../component/product/ProductInfo.vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const route = useRoute()
const productId = Number(route.params.id)

const productStore = useProductStore()
const product = await productStore.get(productId)
</script>

<template>
  <div class="row">
    <div class="col-4 d-flex align-items-center">
      <h3 class="fw-bold">{{ product.name }}</h3>
    </div>
    <div class="col-8 d-flex justify-content-end align-items-center">
      <!-- action buttons -->
      <button class="btn p-3 hover-darken">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-2x"/>
      </button>
      <button class="btn p-3 hover-darken">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-2x"/>
      </button>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col">
      <EditProductForm :productId="product.id"/>
    </div>
  </div>
</template>
