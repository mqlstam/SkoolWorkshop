<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {StreamBarcodeReader} from "vue-barcode-reader";
import { useProductStore } from "../store/productStore.js";
import {useRouter} from "vue-router";

const productStore = useProductStore()
productStore.fetch()

const router = useRouter()
const productName = router.currentRoute.value.params.name


function onDecode(result, productId) {
    if(productStore.findCode(result)) {
      throw Error('Product already exists')
    } else {
      console.log(result)
      productStore.addCode(productId, result)
      router.push(`/products/new/add-code/${productName}`)
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