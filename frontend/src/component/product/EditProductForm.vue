<script setup>
import { useProductStore } from '../../store/productStore.js'
import NumberInput from '../input/NumberInput.vue'
import TextInput from '../input/TextInput.vue'

const ProductStore = useProductStore()
const props = defineProps({
    productId: {
        type: Number,
        required: true
    }
})

const workshop = await ProductStore.getProduct(props.productId)

async function save () {
    const { id, ...updatedProduct } = product
    await ProductStore.updateProduct(updatedProduct, id)
}
</script>

<template>
  <div class="row box-md bg-white border-top">
    <form class="col-12">
      <text-input name="name" v-model:value="product.name" @update:value="save" placeholder="name"/>
      <number-input name="stock" v-model:value="product.groupSize" @update:value="save" placeholder="group size" />

      <a type="button" class="mt-3 mb-4 btn btn-secondary btn-lg w-50" href="/workshops">Back</a>
    </form>
  </div>
</template>