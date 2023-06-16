<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../store/authStore.js'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

async function logout () {
    await authStore.logout()
    await router.push('/login')
}
</script>

<template>
  <div class="navigation-bar">
    <img src="../../assets/logo.png" alt="logo" class="d-none d-sm-block px-3 py-3 border-bottom" style="height: 4rem" />

    <router-link to="/workshops"
                 class="d-flex justify-content-center align-items-center w-100"
                 :class="{'text-primary': route.meta.nav === 'workshop'}">
      <font-awesome-icon :icon="['fas', 'people-group']" class="fa-2x p-3"/>
    </router-link>

    <router-link to="/scan/edit-stock"
                 class="d-flex d-sm-none justify-content-center align-items-center bg-primary rounded-circle"
                 style="height: 4rem; width: 4rem; margin-top: -1rem">
      <font-awesome-icon :icon="['fas', 'qrcode']" class="fa-2x p-3"/>
    </router-link>

    <router-link to="/products"
                 class="d-flex justify-content-center align-items-center w-100"
                 :class="{'text-primary': route.meta.nav === 'product'}">
      <font-awesome-icon :icon="['fas', 'boxes-stacked']" class="fa-2x p-3"/>
    </router-link>

    <router-link to="/calendar"
                 class="d-none d-sm-flex justify-content-center align-items-center w-100"
                 :class="{'text-primary': route.meta.nav === 'calendar'}">
      <font-awesome-icon :icon="['fas', 'calendar-day']" class="fa-2x p-3"/>
    </router-link>

    <router-link to="/users"
                 v-if="authStore.data.role === 'admin'"
                 class="d-none d-sm-flex justify-content-center align-items-center w-100"
                 :class="{'text-primary': route.meta.nav === 'user'}">
      <font-awesome-icon :icon="['fas', 'user-gear']" class="fa-2x p-3"/>
    </router-link>

    <button class="btn mt-auto d-none d-sm-flex justify-content-center align-items-center w-100" @click="logout">
      <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="fa-xl p-3"/>
    </button>
  </div>
</template>
