<script setup>
import CodeScanner from '../component/scanner/CodeScanner.vue'
import {useProductStore} from '../store/productStore.js'
import {onErrorCaptured, ref} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const productStore = useProductStore()
productStore.fetch()

const message = ref('')
onErrorCaptured((error) => {
  message.value = error.message
  setTimeout(() => {
    message.value = ''
  }, 5000)
})
</script>

<template>
  <div class="d-flex justify-content-center">
    <h2 class="pt-4">Scan A QR / Barcode</h2>
    <div class="position-absolute d-flex flex-column">
      <div class="position-relative pe-3">
        <router-link to="/workshops" class="btn float-end hover-darken mt-4 mb-4">
          <font-awesome-icon :icon="['fas', 'x']"/>
        </router-link>
      </div>
      <code-scanner :products="productStore.products" class="ps-3 pe-3"/>
    </div>
  </div>

</template>
