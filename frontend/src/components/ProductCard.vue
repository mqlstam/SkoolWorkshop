<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useProductStore } from "../store/productStore.js";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

function deleteProduct(id) {
  useProductStore().deleteProduct(id)
  location.reload()
}

</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <div class="card m-3">
        <div class="d-flex w-100">
          <div class="img border-end p-3">
            <font-awesome-icon :icon="['fas', 'inbox']" class="fa-5x"/>
          </div>
          <div class="card-body align-self-center">
            <h5>{{ props.product.name }}</h5>
            <p class="m-0">Variaties in opslag: </p>
          </div>
          <div class="d-flex align-items-center">
            <button class="m-2 btn btn-info fw-bolder">Edit</button>
            <button @click="deleteProduct(props.product.id)" class="m-2 btn btn-warning fw-bolder">X</button>
            <button class="m-2 align-self-center border-0" style="color: #f49700"><font-awesome-icon :icon="['fas', 'circle-info']" class="fa-2x"/></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
