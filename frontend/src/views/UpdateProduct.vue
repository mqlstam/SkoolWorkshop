<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore.js'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import EditProductForm from '../component/product/EditProductForm.vue'



const rout = useRoute()
const router = useRouter()

const productStore = useProductStore()


const productId = rout.params.id
const product  = ref(await productStore.getProduct(productId))
console.log(product.value)
const message = ref('')
async function submitForm(e) {
    e.preventDefault()
    // Check if all fields are filled in
    if (product.value.name && product.value.stock && product.value.minStock) {
        console.log(product.value)
        await productStore.updateProduct(product.value, productId)
        message.value = ''
    } else {
        message.value = 'All fields are required'
    }
}
</script>

<template>
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center ">
        <h1 class="mb-4 text-center">Update Product</h1>
        <div class="card col-lg-6 p-4 bg-white">
            <form @submit.prevent="submitForm">
                <EditProductForm :productId="product.id"/>
                <p class="text-danger">{{ message }}</p>

            </form>
        </div>
    </div>
</template>