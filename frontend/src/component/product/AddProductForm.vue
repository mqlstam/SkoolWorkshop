<script setup>
import { ref } from 'vue'
import { useProductStore } from '../../store/productStore.js'
import NumberInput from '../input/NumberInput.vue'
import TextInput from '../input/TextInput.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    productId: {
        type: Number,
        required: true
    }
})

const router = useRouter()
const productStore = useProductStore()

const product = ref({
    name: '',
    stock: 0,
    minStock: 0
})

async function create () {
        await productStore.createProduct(product.value)
        router.push('/products')    
}
</script>

<template>
    <div class="row box-md bg-white border-top">
      <form class="col-12" @submit.prevent="create">
        <text-input name="name" v-model="product.name" />
        <number-input name="stock" v-model="product.stock" />
        <number-input name="minStock" v-model="product.minStock" />

        <div class="d-flex justify-content-between mt-3">
          <a type="button" class="btn btn-secondary btn-lg w-50 me-2" href="/products">Back</a>
          <button type="submit" class="btn btn-primary btn-lg w-50" >Create Product</button>
        </div>
      </form>
    </div>
  </template>
