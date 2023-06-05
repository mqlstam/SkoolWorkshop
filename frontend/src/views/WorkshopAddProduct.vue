<script setup>
import { useProductStore } from '../store/productStore.js'
import { useWorkshopStore } from '../store/workshopStore.js'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const route = useRoute()
const edit = ref(false)
const productStore = useProductStore()
productStore.fetch()

const workshopStore = useWorkshopStore();
const workshopId = Number(route.params.id)
const productsNotInWorkshop = ref([]);
const productsInWorkshop = ref([]);

(async () => {
    productsNotInWorkshop.value = await workshopStore.fetchProductsNotInWorkshop(workshopId);
})();

const search = ref('')
const filteredProducts = computed(() => {
    if (search.value) {
        return productsNotInWorkshop.value.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()))
    } else {
        return productsNotInWorkshop.value;
    }
});

const addProductToWorkshop = async (product) => {
    await workshopStore.addProduct(workshopId, product.id, 1);  // Assuming you want to add one product at a time
    productsInWorkshop.value.push(product);
    const index = productsNotInWorkshop.value.indexOf(product);
    if (index > -1) {
        productsNotInWorkshop.value.splice(index, 1);
    }
}

const handleStockClick = (product) => {
    console.log('Stock button clicked for', product.name);
    addProductToWorkshop(product);
}
</script>



<template>
  <div class="row box-header">
    <div class="col-2 d-flex align-items-center">
      <h3 class="m-2"> AddProducts</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <input type="text" v-model="search" placeholder="Search products..." class="form-control search p-4">

    <!-- product list -->
    <div v-for="product in filteredProducts" :key="product.id" class="d-flex align-items-center border-bottom hover-darken">
      <font-awesome-icon :icon="['fas', 'box']" class="fa-3x img border p-3 ms-1 me-3 my-3 text-dark"></font-awesome-icon>
      <span class="h5">{{ product.name }}</span>
  
      <div class="ms-auto">
        <!-- product stock status -->
        <button v-if=" !productsInWorkshop.includes(product)" class="btn btn-sm p-1 hover-darken" @click="handleStockClick(product)">
          <font-awesome-icon :icon="['fas', 'plus']" class="fa-1x m-2" style="width:20px;height:20px;"></font-awesome-icon>
        </button>
        <font-awesome-icon v-else :icon="['fas', 'check']" class="fa-1x m-2 text-success" style="width:20px;height:20px;"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>
