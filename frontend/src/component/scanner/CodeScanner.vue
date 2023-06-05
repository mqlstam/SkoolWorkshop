<script setup>
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    products: {
        type: Array,
        required: true
    }
})

function onDecode (result) {
    const product = props.products.find(product => product.code === result)
    if (product) {
        router.push('/products/' + product.id)
    } else {
        throw Error('unknown product')
    }
}
</script>

<template>
  <div>
    <stream-barcode-reader @decode="onDecode"/>
  </div>
</template>
