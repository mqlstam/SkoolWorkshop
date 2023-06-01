<script setup>
import { useProductStore } from '../../store/productStore.js'
import NumberInput from '../input/NumberInput.vue'
import TextInput from '../input/TextInput.vue'

const props = defineProps({
    productId: {
        type: Number,
        required: true
    }
})

const ProductStore = useProductStore()
const product = await ProductStore.getProduct(props.productId)

async function save () {
    const { id, ...updatedProduct } = product
    await ProductStore.updateProduct(updatedProduct, id)
}
</script>

<template>
  <div class="row box-md bg-white border-top">
    <form class="col-12">
      <text-input name="name" v-model:modelValue="product.name" @update:modelValue="save"/>
      <number-input name="stock" v-model:modelValue="product.stock" @update:modelValue="save"  />
      <number-input name="minStock" v-model:modelValue="product.minStock" @update:modelValue="save"/>

      <a type="button" class="mt-3 mb-4 btn btn-secondary btn-lg w-50" href="/products">Back</a>
    </form>
  </div>
</template>

