<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { ref } from 'vue'
import { useProductStore } from '../../store/productStore.js'

const emit = defineEmits(['update:value'])
const props = defineProps({
    value: {
        type: String,
        required: false
    }
})

const productStore = useProductStore()
const showScanner = ref(false)

function onDecode (result) {
    emit('update:value', result)
    showScanner.value = false
}

function generateCode () {
    const code = Math.floor(Math.random() * 1000000)
    if (productStore.findCode(code)) {
        generateCode()
    } else {
        emit('update:value', code.toString())
    }
}
</script>

<template>
  <div type="button" class="d-flex align-items-center p-2 border-bottom">
    <span class="mx-3">Code: {{ props.value }}</span>

    <div class="ms-auto d-flex align-items-center">
      <div class="d-flex align-items-center user-select-none" role="button" @click="showScanner = !showScanner">
        Scan
        <font-awesome-icon
          :icon="['fas', 'qrcode']"
          class="p-3 mx-2 rounded-3 hover-darken"/>
      </div>

      <div class="ps-3 d-flex align-items-center user-select-none" role="button" @click="generateCode">
        Generate
        <font-awesome-icon
          :icon="['fas', 'plus']"
          class="p-3 mx-2 rounded-3 hover-darken"/>
      </div>
    </div>
  </div>
  <div v-if="showScanner" class="p-0">
        <div class=" w-100">
          <stream-barcode-reader @decode="onDecode"/>
        </div>
  </div>

</template>
