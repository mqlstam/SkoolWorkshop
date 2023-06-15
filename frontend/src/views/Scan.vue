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
    <div class="row box-header">
    <div class="d-flex align-items-center m-0" style="width: min-content">
      <a class="btn p-2 bg-secondary hover-darken" @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'caret-left']" class="fa-xl" style="width: 24px"/>
      </a>
    </div>

    <div class="col d-flex align-items-center">
      <h3 class="m-0">Scan A QR / Barcode</h3>
    </div>
  </div>

  <div class="row box bg-white border-top ">

    <stream-barcode-reader @decode="onDecode" class="p-0 mb-n2"/>
  </div>

</template>
