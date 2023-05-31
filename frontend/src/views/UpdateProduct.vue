<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore.js'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import NumberInput from '../component/input/NumberInput.vue'
import TextInput from '../component/input/TextInput.vue'


const rout = useRoute()
const router = useRouter()

const productStore = useProductStore()
const product = ref({
    name: '',
    stock: '',
    minStock: ''
})

const id = rout.params.id
product.value = await productStore.getProduct(id)
console.log(product.value)
const message = ref('')
async function submitForm(e) {
    e.preventDefault()
    // Check if all fields are filled in
    if (product.value.name && product.value.stock && product.value.minStock) {
        console.log(product.value)
        await productStore.updateProduct(product.value, id)
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
                <div class="mb-4">
                    <label class="form-label">Name</label>
                    <TextInput v-model:value="product.name" @update:value="submitForm" placeholder="Name" />
                </div>

                <div class="mb-4">
                    <label class="form-label">Stock</label>
                    <NumberInput v-model:value="product.stock" @update:value="submitForm"/>
                </div>

                <div class="mb-4">
                    <label class="form-label">Minimum Stock</label>
                    <NumberInput v-model:value="product.minStock" @update:value="submitForm"/>
                </div>

                <p class="text-danger">{{ message }}</p>

                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-primary btn-lg rounded-pill"
                        @click="router.push('/products')">Back</button>
                </div>

            </form>
        </div>
    </div>
</template>