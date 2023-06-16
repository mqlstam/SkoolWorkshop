<script setup>
import { useProductStore } from '../store/productStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import router from '../router/router.js'
import { useRoute } from 'vue-router'

const productStore = useProductStore()
productStore.fetch()

const route = useRoute()
const action = route.params.action

function onDecode (result) {
    const product = productStore.findCode(result)
    if (product) {
        if (action === 'to-product') {
            router.push('/products/' + product.id)
        } else {
            router.push('/products/' + product.id + '/edit-stock')
        }
    } else {
        throw Error('unknown product')
    }
}
</script>

<template>
  <div class="d-flex justify-content-center">
    <h2 class="pt-4">Scan QR/Barcode</h2>
    <div class="position-absolute d-flex flex-column">
      <div class="position-relative pe-3">
        <div type="button" class="btn float-end hover-darken mt-4 mb-4" @click="router.back">
          <font-awesome-icon :icon="['fas', 'x']"/>
        </div>
      </div>
      <stream-barcode-reader @decode="onDecode" class="ps-3 pe-3"/>
    </div>
  </div>
</template>
