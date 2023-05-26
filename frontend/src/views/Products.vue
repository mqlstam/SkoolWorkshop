<script setup>

import { useProductStore } from '../store/productStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const productStore = useProductStore()
productStore.fetchProducts()

</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-5" v-for="product in productStore.products" :key="product.name">
      <div class="card m-3">
        <div class="d-flex w-100">
          <div class="img border-end p-3">
            <font-awesome-icon :icon="['fas', 'inbox']" class="fa-5x"/>
          </div>
            <div class="card-body align-self-center">
              <h5>{{ product.name }}</h5>
              <p class="m-0">Variaties in opslag: </p>
            </div>
          <button class="m-2 align-self-center border-0" style="color: #f49700"><font-awesome-icon :icon="['fas', 'circle-info']" class="fa-2x"/></button>
        </div>
      </div>
    </div>
  </div>
</template>
