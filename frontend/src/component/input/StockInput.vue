<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute } from 'vue-router'
import NumberInput from './NumberInput.vue'
import { useProductStore } from '../../store/productStore.js'
import { ref } from 'vue'

const route = useRoute()
const productStore = useProductStore()
const productId = Number(route.params.id)

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const value = ref(props.product.stock)

async function save () {
    const { id, ...data } = props.product
    data.stock = value.value
    await productStore.update(data, id)
}
</script>

<template>
  <div class="d-flex align-items-center p-2 border-bottom">
    <span class="mx-3">Voorraad</span>
    <div class="ms-auto d-flex align-items-center">
      <number-input v-model:value="value" @update:value="save" name="" :border="false"/>
      <router-link class="d-flex align-items-center user-select-none" role="button" :to='`/products/${productId}/edit-stock`'>
        <font-awesome-icon
          :icon="['fas', 'layer-group']"
          class="p-3 mx-2 rounded-3 hover-darken"/>
      </router-link>
    </div>
  </div>
</template>
