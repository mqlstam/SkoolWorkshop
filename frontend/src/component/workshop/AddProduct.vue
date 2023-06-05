<script setup>
import { ref } from 'vue'
import { useWorkshopStore } from '../../store/workshopStore.js'
import { useProductStore } from '../../store/productStore.js'
import NumberInput from '../input/NumberInput.vue'

const props = defineProps({
    workshopId: {
        type: Number,
        required: true
    }
})

const workshopStore = useWorkshopStore()
const productStore = useProductStore()

const selectedProductId = ref(null)
let quantity = 1

const addedProducts = ref([])

async function addProduct () {
    if (!selectedProductId.value) {
        alert('No product selected!')
        return
    }
    const product = productStore.products.find(product => product.id === selectedProductId.value)
    if (!product) {
        alert('Invalid product!')
        return
    }
    await workshopStore.addProduct(props.workshopId, selectedProductId.value, quantity)
    addedProducts.value.push({ ...product, quantity })
    selectedProductId.value = null
    quantity = 1
}

async function fetchProducts () {
    await productStore.fetch()
}
fetchProducts()
</script>

<template>
  <div class="row mt-5">
    <h2>Add a Product</h2>
    <form class="col-12">
      <label for="product">Product:</label>
      <select id="product" v-model="selectedProductId" class="form-select w-100">
        <option disabled value="">Please select a product</option>
        <option v-for="product in productStore.products" :key="product.id">
          {{ product.name }}
        </option>
      </select>
      <NumberInput name="quantity" v-model:value="quantity" placeholder="Quantity"/>
      <button @click="addProduct" type="button" class="btn btn-primary">Add Product</button>
    </form>
    <div class="mt-3">
      <span v-for="(product, index) in addedProducts" :key="index" class="badge bg-primary me-2">
        {{ product.name }} - {{ product.quantity }}
        <button type="button" class="btn-close" aria-label="Close"></button>
      </span>
    </div>
  </div>
</template>
