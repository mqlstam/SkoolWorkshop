<script setup>
import { useProductStore } from '../store/productStore.js'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'
import CheckboxInput from '../component/input/CheckboxInput.vue'
import { ref } from 'vue'
import {StreamBarcodeReader} from "vue-barcode-reader";

const router = useRouter()
const productStore = useProductStore()

const showScanner = ref(false)

const product = ref({
    name: '',
    stock: 0,
    reusable: false
})

async function create () {
    if (product.value.name === '') throw new Error('name is empty')
    if(product.value.code === '') delete product.value ['code']
    await productStore.create(product.value)
    await router.back()
}

function onDecode(result) {
    if(productStore.findCode(result)) {
      throw Error('Product already exists')
    } else {
      product.value.code = result.toString()
      showScanner.value = false
    }
}

function generateCode() {
  const code = Math.floor(Math.random() * 1000000)
  if(productStore.findCode(code)) {
    generateCode()
  } else {
    product.value.code = code.toString()
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
      <h3 class="m-0">New Product</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="product.name" />
    <number-input name="Stock" v-model:value="product.stock" />
    <checkbox-input name="Reusable" v-model:value="product.reusable" />
    <number-input name="Minimum Stock" v-model:value="product.minStock" />
    <div type="button" class="d-flex align-items-center p-2 border-bottom">
      <span class="mx-3">Add Code: {{ product.code }}</span>
      <div class="justify-content-center">
        <div v-if="showScanner" class="d-flex justify-content-center align-items-center">
          <div class="position-absolute d-flex flex-column">
            <stream-barcode-reader @decode="onDecode" class="ps-3 pe-3"/>
          </div>
        </div>
      </div>

      <div class="ms-auto d-flex align-items-center">
        <div class="d-flex align-items-center" role="button" @click="showScanner = !showScanner">
          Scan
          <font-awesome-icon
            :icon="['fas', 'qrcode']"
            class="p-3 mx-2 rounded-3 hover-darken" />
        </div>

        <div class="ps-3 d-flex align-items-center" role="button" @click="generateCode">
          Generate
          <font-awesome-icon
            :icon="['fas', 'plus']"
            class="p-3 mx-2 rounded-3 hover-darken" />
        </div>
      </div>
    </div>

    <button class="m-3 ms-auto btn p-2 bg-primary d-flex justify-content-center" @click="create" style="width: 10rem">
      <font-awesome-icon :icon="['fas', 'floppy-disk']" class="fa-xl" />
      <span class="h5 m-0 ms-3">Create</span>
    </button>
  </div>
</template>
