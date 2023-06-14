<script setup>
import { useProductStore } from '../store/productStore.js'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'
import CheckboxInput from '../component/input/CheckboxInput.vue'
import { ref } from 'vue'
import ScanInput from '../component/input/ScanInput.vue'

const router = useRouter()
const productStore = useProductStore()

const product = ref({
    name: '',
    stock: 0,
    bufferStock: 0,
    reusable: false
})

async function create () {
    if (product.value.name === '') throw new Error('name is empty')
    await productStore.create(product.value)
    await router.back()
}
</script>

<template>
  <div class="row box-header">
    <div class="d-flex align-items-center m-0" style="width: min-content">
      <a class="btn p-2 bg-secondary hover-darken" @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'caret-left']" class="fa-xl" style="width: 24px"/>
      </a>
    </div>

    <div class="col d-flex align-items-center">
      <h3 class="m-0">New Product</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="product.name" />
    <number-input name="Stock" v-model:value="product.stock" />
    <number-input name="BufferStock" v-model:value="product.bufferStock" />
    <scan-input v-model:value="product.code" />
    <checkbox-input name="Reusable" v-model:value="product.reusable" />

    <button class="m-3 ms-auto btn p-2 bg-primary d-flex justify-content-center" @click="create" style="width: 10rem">
      <font-awesome-icon :icon="['fas', 'floppy-disk']" class="fa-xl" />
      <span class="h5 m-0 ms-3">Create</span>
    </button>
  </div>
</template>
