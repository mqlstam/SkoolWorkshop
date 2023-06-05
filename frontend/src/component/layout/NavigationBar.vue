<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="navigation-bar">
    <img src="../../assets/logo.png" alt="logo" class="d-none d-sm-block px-3 py-3 border-bottom" style="height: 4rem" />

    <router-link to="/workshops"
                 class="d-flex justify-content-center align-items-center w-100"
                 :class="{'text-primary': route.meta.nav === 'workshop'}">
      <font-awesome-icon :icon="['fas', 'people-group']" class="fa-2x p-3"/>
    </router-link>

    <router-link to="/scan"
                 class="d-flex d-sm-none justify-content-center align-items-center bg-primary rounded-circle"
                 :class="{'text-primary': route.meta.nav === 'scan'}"
                 style="height: 4rem; width: 4rem; margin-top: -1rem">
      <font-awesome-icon :icon="['fas', 'qrcode']" class="fa-2x p-3"/>
    </router-link>

    <router-link to="/products"
                 class="d-flex justify-content-center align-items-center w-100"
                 :class="{'text-primary': route.meta.nav === 'product'}">
      <font-awesome-icon :icon="['fas', 'boxes-stacked']" class="fa-2x p-3"/>
    </router-link>
  </div>
</template>
