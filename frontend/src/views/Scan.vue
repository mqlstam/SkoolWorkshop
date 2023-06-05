<script setup>
import CodeScanner from '../component/scanner/CodeScanner.vue'
import { useProductStore } from '../store/productStore.js'
import { onErrorCaptured, ref } from 'vue'

const productStore = useProductStore()
productStore.fetch()

const message = ref('')
onErrorCaptured((error) => {
    message.value = error.message
    setTimeout(() => { message.value = '' }, 5000)
})
</script>

<template>
  <code-scanner :products="productStore.products"/>
</template>
