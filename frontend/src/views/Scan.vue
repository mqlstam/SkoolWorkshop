<script setup>
import { useProductStore } from '../store/productStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import router from '../router/router.js'

const productStore = useProductStore()
productStore.fetch()

function onDecode (result) {
    const product = productStore.findCode(result)
    if (product) {
        router.push('/products/' + product.id)
    } else {
        throw Error('unknown product')
    }
}
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
      <stream-barcode-reader @decode="onDecode" class="ps-3 pe-3"/>
    </div>
  </div>
</template>
