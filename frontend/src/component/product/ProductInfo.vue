<script setup>
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
const product = await productStore.get(props.productId)

async function save () {
    const { id, ...updatedProduct } = product
    await productStore.update(updatedProduct, id)
}
</script>

<template>
  <div class="row box-md bg-white border-top">
    <form class="col-12">
      <text-input name="Name" v-model:value="product.name" @update:value="save"/>
      <number-input name="Stock" v-model:value="product.stock" @update:value="save"  />
      <number-input name="Minimum Stock" v-model:value="product.minStock" @update:value="save"/>

      <a @click="router.back()" type="button" class="mt-3 mb-4 btn btn-secondary btn-lg w-50">Back</a>
    </form>
  </div>
</template>
