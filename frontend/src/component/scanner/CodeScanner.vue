<script setup>
import {StreamBarcodeReader} from "vue-barcode-reader"

function onDecode(result) {
  console.log(result)
}
</script>

<template>
  <div class="scannerPopUp position-absolute centered-rectangle w-auto h-auto mt-4 border-5">
    <div class="row w-50">
      <stream-barcode-reader @decode="onDecode" size="100px"></stream-barcode-reader>
    </div>
  </div>
</template>