<template>
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 class="mb-4 text-center">Add Product</h1>
      <div class="col-lg-8">
        <AddProductForm />
      </div>
    </div>
  </template>

<script setup>
import { useRouter } from 'vue-router'
import AddProductForm from '../component/product/AddProductForm.vue'

const router = useRouter()
</script>
