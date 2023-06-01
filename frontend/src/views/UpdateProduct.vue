<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore.js'
import { useRoute } from 'vue-router'

import EditProductForm from '../component/product/EditProductForm.vue'

const rout = useRoute()

const productStore = useProductStore()

const productId = rout.params.id
const product = ref(await productStore.getProduct(productId))
console.log(product.value)
</script>

<template>
    <div class="container">
      <div class="row">
        <div class="col-4 d-flex align-items-center">
          <h3 class="fw-bold">{{product.name}}</h3>
        </div>
        <div class="col-8 d-flex justify-content-end align-items-center">
          <!-- action buttons -->
          <button class="btn p-3 hover-darken" @click="redirectToCreate">
            <font-awesome-icon :icon="['fas', 'plus']" class="fa-2x" />
          </button>
          <button class="btn p-3 hover-darken" :class="{'bg-primary': edit}" @click="edit = !edit">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-2x" />
          </button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <EditProductForm :productId="product.id" />
        </div>
      </div>
    </div>
  </template>
