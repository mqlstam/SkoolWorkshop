<script setup>
import { useUserStore } from '../store/userStore.js'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import { ref } from 'vue'
import PasswordInput from '../component/input/PasswordInput.vue'
import OptionsInput from '../component/input/OptionsInput.vue'

const router = useRouter()
const userStore = useUserStore()
const roles = [
    { id: 'admin', name: 'admin' },
    { id: 'user', name: 'user' },
    { id: 'intern', name: 'intern' }
]

const user = ref({
    name: '',
    password: '',
    role: 'user'
})

async function create () {
    if (user.value.name === '') throw new Error('name is empty')
    if (user.value.password === '') throw new Error('password is empty')
    await userStore.create(user.value)
    await router.back()
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
      <h3 class="m-0">Nieuwe gebruiker</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="user.name" />
    <password-input name="Password" v-model:value="user.password" :empty="true" />
    <options-input name="Role" v-model:value="user.role" :options="roles" />

    <button class="m-3 ms-auto btn p-2 bg-primary d-flex justify-content-center" @click="create" style="width: 10rem">
      <font-awesome-icon :icon="['fas', 'floppy-disk']" class="fa-xl"/>
      <span class="h5 m-0 ms-3">Registreren</span>
    </button>
  </div>
</template>
