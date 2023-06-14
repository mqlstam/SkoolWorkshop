<script setup>
import { useProductStore } from '../store/productStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import router from '../router/router.js'
import {ref} from "vue";

const productStore = useProductStore()
productStore.fetch()

const showPopUp = ref(false)
let productFound = ref(null)

function onDecode (result) {
    const product = productStore.findCode(result)
    if (product) {
      productFound = product
      showPopUp.value = true
    } else {
        throw Error('unknown product')
    }
}

async function update () {
  const { id, ...data } = productFound
  await productStore.update(data, id)
}
</script>

<template>
  <div class="d-flex justify-content-center" v-if="!showPopUp">
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

  <div class="popup-container box text-center " v-if="showPopUp">
    <div class="btn float-end hover-darken" @click="showPopUp = !showPopUp">
      <font-awesome-icon :icon="['fas', 'x']"/>
    </div>
    <h3 class="pb-3 ms-4">{{ productFound.name }}</h3>
    <div class="d-flex justify-content-center align-items-center pb-3">
      <div class="me-5 iconDivMin">
        <p class="mb-0">10</p>
        <font-awesome-icon :icon="['fas', 'minus']" class="icon fa-2x p-0 rounded-3 hover-darken user-select-none" @click="productFound.stock = Math.max(productFound.stock - 10, 0); update()"/>
      </div>
      <div class="me-5 iconDivMin">
        <p class="mb-0">1</p>
        <font-awesome-icon :icon="['fas', 'minus']" class="icon fa-2x p-0 rounded-3 hover-darken user-select-none" @click="productFound.stock = Math.max(productFound.stock - 1, 0); update()"/>
      </div>
      <input type="number" class="form-control-plaintext" style="width: 2rem" v-model="productFound.stock" @input="update" />
      <div class="ms-5 iconDivMax">
        <p class="mb-0">1</p>
        <font-awesome-icon :icon="['fas', 'plus']" class="icon fa-2x p-0 rounded-3 hover-darken user-select-none" @click="productFound.stock = Math.max(productFound.stock + 1, 0); update()"/>
      </div>
      <div class="ms-5 iconDivMax">
        <p class="mb-0">10</p>
        <font-awesome-icon :icon="['fas', 'plus']" class="icon fa-2x p-0 rounded-3 hover-darken user-select-none" @click="productFound.stock = Math.max(productFound.stock + 10, 0); update()"/>
      </div>
    </div>
  </div>
</template>