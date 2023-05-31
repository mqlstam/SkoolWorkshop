<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()

const product = ref({
  name: '',
  stock: 0,
  minStock: 0
})

const message = ref('')

const increment = (field) => {
product.value[field] += 1;
}

const decrement = (field) => {
if(product.value[field] > 0) {
  product.value[field] -= 1;
}
}

const submitForm = (e) => {
  e.preventDefault()

  if (product.value.name && product.value.stock && product.value.minStock) {
      productStore.createProduct(product.value)
      message.value = ''
      router.push('/products')
  } else {
      message.value = 'All fields are required'
  }

  if (product.value.stock < product.value.minStock) {
      message.value = 'Stock must be higher than minimum stock'
  }
}
</script>

<template>
  <div class="vh-100 d-flex flex-column justify-content-center align-items-center ">
    <h1 class="mb-4 text-center">Add Product</h1>
    <div class="card col-lg-6 p-4 bg-white">
      <form @submit.prevent="submitForm">
        <div class="mb-4 form-floating">
          <input type="text" class="form-control form-control-lg" id="name" v-model="product.name" placeholder="Name">
          <label for="name">Name</label>
        </div>

        <div class="mb-4">
          <label class="form-label">Stock</label>
          <div class="def-number-input number-input safari_only">
            <button @click="decrement('stock')" class="minus btn btn-outline-secondary"></button>
            <input class="quantity form-control" min="0" name="quantity" type="number" v-model.number="product.stock">
            <button @click="increment('stock')" class="plus btn btn-outline-secondary"></button>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">Minimum Stock</label>
          <div class="def-number-input number-input safari_only">
            <button @click="decrement('minStock')" class="minus btn btn-outline-secondary"></button>
            <input class="quantity form-control" min="0" name="quantity" type="number" v-model.number="product.minStock">
            <button @click="increment('minStock')" class="plus btn btn-outline-secondary"></button>
          </div>
        </div>

        <p class="text-danger">{{ message }}</p>

        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary btn-lg rounded-pill" @click="router.push('/products')">Back</button>
          <button type="submit" class="btn btn-primary btn-lg rounded-pill">Add Product</button>
        </div>

      </form>
    </div>
  </div>
</template>
