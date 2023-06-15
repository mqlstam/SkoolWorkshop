<script setup>
import { useProductStore } from '../store/productStore.js'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import CheckboxInput from '../component/input/CheckboxInput.vue'
import ScanInput from '../component/input/ScanInput.vue'
import VueQrcode from 'vue-qrcode'
import { ref } from 'vue'

const route = useRoute()
const productStore = useProductStore()

const productId = Number(route.params.id)
const product = ref(await productStore.get(productId))

async function save () {
    const { id, ...data } = product.value
    await productStore.update(data, id)
}

function printQr () {
    const prtContent = document.getElementById('qrCode')
    const winPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
    winPrint.document.write(prtContent.innerHTML)
    winPrint.document.close()
    winPrint.focus()
    winPrint.print()
    winPrint.close()
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
    <div class="d-flex align-items-center p-2 border-bottom">
      <span class="mx-3">Voorraad</span>
      <div class="ms-auto d-flex align-items-center">
        <span>{{product.stock}}</span>
        <router-link class="d-flex align-items-center user-select-none" role="button" :to='`/products/${productId}/edit-stock`'>
          <font-awesome-icon
            :icon="['fas', 'layer-group']"
            class="p-3 mx-2 rounded-3 hover-darken"/>
        </router-link>
      </div>
    </div>
    <scan-input v-model:value="product.code" @update:value="save"/>
    <checkbox-input name="Reusable" v-model:value="product.reusable" @update:value="save"/>

    <div class="d-flex align-items-center p-2 border-bottom">
      <span class="mx-3">Print QR</span>
      <div class="ms-auto d-flex align-items-center">
        <div class="d-flex align-items-center user-select-none" role="button" @click="printQr()">
          <font-awesome-icon
            :icon="['fas', 'print']"
            class="p-3 mx-2 rounded-3 hover-darken"/>
        </div>
      </div>
    </div>

    <div id="qrCode" style="display: none">
      <vue-qrcode
        v-if="product.code"
        :value="product.code"
        type="image/png"
        width="250"
        />
    </div>
  </div>
</template>
