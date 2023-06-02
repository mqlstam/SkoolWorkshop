<script setup>
import { ref } from 'vue'
import { useProductStore } from '../../store/productStore.js'
import NumberInput from '../input/NumberInput.vue'
import TextInput from '../input/TextInput.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()

const product = ref({
    name: '',
    stock: 0,
    minStock: 0
})

async function create () {
    await productStore.create(product.value)
    await router.push('/products')
}
</script>

<template>
    <div class="row box-md bg-white border-top">
      <form class="col-12" @submit.prevent="create">
        <text-input name="Name" v-model:value="product.name" />
        <number-input name="Stock" v-model:value="product.stock" />
        <number-input name="Minimum Stock" v-model:value="product.minStock" />

        <div class="d-flex justify-content-between mt-3">
          <a @click="router.back()" type="button" class="mt-3 mb-4 btn btn-secondary btn-lg w-50">Back</a>
          <button type="submit" class="btn btn-primary btn-lg w-50">Create Product</button>
        </div>
      </form>
    </div>
  </template>
