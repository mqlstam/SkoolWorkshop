<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore.js'
import { useRouter } from 'vue-router'
import NumberInput from '../component/input/NumberInput.vue'
import TextInput from '../component/input/TextInput.vue'

const router = useRouter()
const productStore = useProductStore()

const product = ref({
    name: '',
    stock: 0,
    minStock: 0
})

const message = ref('')

const submitForm = (e) => {
    e.preventDefault()

    if (product.value.name && product.value.stock && product.value.minStock) {
        productStore.createProduct(product.value)
        message.value = ''
        router.push('/products')
    } else {
        message.value = 'All fields are required'
    }

}
</script>

<template>
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center ">
        <h1 class="mb-4 text-center">Add Product</h1>
        <div class="card col-lg-6 p-4 bg-white">
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="form-label">Name</label>
                    <TextInput v-model:value="product.name" @update:value="submitForm" placeholder="Name" />
                </div>

                <div class="mb-4">
                    <label class="form-label">Stock</label>
                    <NumberInput v-model:value="product.stock"  @update:value="submitForm" />
                </div>

                <div class="mb-4">
                    <label class="form-label">Minimum Stock</label>
                    <NumberInput v-model:value="product.minStock" @update:value="submitForm" />
                </div>

                <p class="text-danger">{{ message }}</p>

                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-primary btn-lg rounded-pill"
                        @click="router.push('/products')">Back</button>
                    <button type="submit" class="btn btn-primary btn-lg rounded-pill" >Add Product</button>
                </div>

            </form>
        </div>
    </div>
</template>

