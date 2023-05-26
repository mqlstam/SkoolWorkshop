<script setup>

import {useProductStore} from "../store/productStore.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { ref } from 'vue';

let isVisible = ref(false);
let productSelected = ref(null);
let selectedVariant = ref(null);

const productStore = useProductStore()
productStore.fetchProducts()

function getVariationsInStock(product) {
  let amountInStock = 0;
  for(let i = 0; i < product.variants.length; i++) {
    if(product.variants[i].stock > product.minStock) {
      amountInStock++;
    }
  }
  return amountInStock;
}

</script>

<template>

  <div class="row justify-content-center">
    <div class="col-md-5" v-for="product in productStore.products">
      <div class="card m-3">
        <div class="d-flex w-100">
          <div class="img border-end p-3">
            <font-awesome-icon :icon="['fas', 'inbox']" class="fa-5x"/>
          </div>
            <div class="card-body align-self-center">
              <h5>{{ product.name }}</h5>
              <p class="m-0">Variaties in opslag: {{ getVariationsInStock(product) }}/{{product.variants.length}}</p>
            </div>
          <button @click="isVisible=!isVisible; productSelected=product" class="m-2 align-self-center border-0" style="color: #f49700"><font-awesome-icon :icon="['fas', 'circle-info']" class="fa-2x"/></button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isVisible">
    <div class="overlay">
      <div class="overlay-content">
        <div class="centered-rectangle col-5 h-auto p-3">
          <h3>Tabel?</h3>
          <div class="d-flex">
            <div v-for="variant in productSelected.variants">
              <button @click="selectedVariant=variant" class="btn me-4">{{ variant.variant }}</button>
            </div>
          </div>
          <div>
            <p v-if="selectedVariant">In Opslag: {{selectedVariant.stock}} / {{ productSelected.minStock }}</p>
          </div>
          <div>
            <button class="btn mt-5" @click="isVisible=false; selectedVariant = null;">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
