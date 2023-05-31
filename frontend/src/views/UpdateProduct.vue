<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore.js'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'


const rout = useRoute()
const router = useRouter()

const productStore = useProductStore()
const product = ref({
    name: '',
    stock: '',
    minStock: ''
})

const increment = (field) => {
product.value[field] += 1;
}

const decrement = (field) => {
if(product.value[field] > 0) {
  product.value[field] -= 1;
}
}

const id = rout.params.id
product.value = await productStore.getProduct(id)
console.log(product.value)
const message = ref('')
async function submitForm (e) {
    e.preventDefault()
    // Check if all fields are filled in
    if (product.value.name && product.value.stock && product.value.minStock) {
        console.log(product.value)
        await productStore.updateProduct(product.value, id)
        message.value = ''
    } else {
        message.value = 'All fields are required'
    }
}
</script>

<template>
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 class="mb-4 text-center">Update Product</h1>
      <div class="card col-lg-6 p-4">
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
            <button type="submit" class="btn btn-primary btn-lg rounded-pill">Update Product</button>
          </div>
  
        </form>
      </div>
    </div>
  </template>