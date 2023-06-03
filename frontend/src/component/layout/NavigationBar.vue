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

    <router-link to="/search"
                 class="d-flex justify-content-center align-items-center w-100"
                 :class="{'text-primary': route.meta.nav === 'search'}">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="fa-2x p-3"/>
    </router-link>

    <router-link to="/products"
                 class="d-flex justify-content-center align-items-center w-100"
                 :class="{'text-primary': route.meta.nav === 'product'}">
      <font-awesome-icon :icon="['fas', 'boxes-stacked']" class="fa-2x p-3"/>
    </router-link>
  </div>
</template>
