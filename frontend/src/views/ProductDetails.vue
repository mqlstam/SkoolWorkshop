<script setup>
import { useProductStore } from '../store/productStore.js'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'
import CheckboxInput from '../component/input/CheckboxInput.vue'
import ScanInput from '../component/input/ScanInput.vue'
import { ref } from 'vue'

const route = useRoute()
const productStore = useProductStore()

const productId = Number(route.params.id)
const product = ref(await productStore.get(productId))

async function save () {
    const { id, ...data } = product.value
    if (data.code === '') delete data.code
    await productStore.update(data, id)
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
      <h3 class="m-0">Product Info</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="product.name" @update:value="save"/>
    <number-input name="Stock" v-model:value="product.stock" @update:value="save"/>
    <checkbox-input name="Reusable" v-model:value="product.reusable" @update:value="save"/>
    <scan-input v-model:value="product.code" @update:value="save"/>
  </div>
</template>
