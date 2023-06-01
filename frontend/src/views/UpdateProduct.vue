<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore.js'
import { useRoute, useRouter } from 'vue-router'

import EditProductForm from '../component/product/EditProductForm.vue'

const rout = useRoute()
const router = useRouter()

const productStore = useProductStore()

const productId = rout.params.id
const product = ref(await productStore.getProduct(productId))
console.log(product.value)
const message = ref('')
async function submitForm (e) {
    e.preventDefault()
    // Check if all fields are filled in
    if (product.value.name && product.value.stock && product.value.minStock) {
        console.log(product.value)
        await productStore.updateProduct(product.value, productId)
        message.value = ''
    } else {
        message.value = 'All fields are required'
    }
}
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
