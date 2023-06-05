<script setup>
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { useRouter } from 'vue-router'
import ErrorNotification from '../../App.vue'
import { ref } from 'vue'

const router = useRouter()
const message = ref('')

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
        throw Error('Product not found')
    }
}
</script>

<template>
    <div class="row p-0" style="width: 300px; height: 300px;">
      <stream-barcode-reader @decode="onDecode" size="300px" />
    </div>
  <div>
    <error-notification :message="message" :shown="!!message" @close="message = ''"/>
  </div>
</template>
