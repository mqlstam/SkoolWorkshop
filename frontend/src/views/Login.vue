<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const password = ref('')

async function login () {
    if (await authStore.login(name.value, password.value)) {
        await router.push('/')
    } else {
        throw new Error('Invalid credentials')
    }
}
</script>

<template>
  <div class="d-flex justify-content-center mt-4">
    <div class="box bg-white p-3 mt-4 d-flex flex-column align-items-center">
      <img src="../assets/banner.png" alt="banner" class="m-5" style="width: 15rem"/>

      <div class="mb-4">
        <label class="form-label" for="name">Naam</label>
        <input type="email" id="name" class="form-control" v-model="name" @keydown.enter="login" />
      </div>

      <div class="mb-4">
        <label class="form-label" for="password">Wachtwoord</label>
        <input type="password" id="password" class="form-control" v-model="password" @keydown.enter="login" />
      </div>

      <button class="btn btn-primary my-4" style="width: 10rem" @click="login">
        Log In
      </button>
    </div>
  </div>
</template>
