<script setup>
import { useProductStore } from '../store/productStore.js'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useWorkshopItemStore } from '../store/workshopItemStore.js'
import WorkshopItemToggleBlock from '../component/workshopItem/WorkshopItemToggleBlock.vue'

const route = useRoute()
const productStore = useProductStore()
const workshopItemStore = useWorkshopItemStore()

const tasks = await Promise.all([
    workshopItemStore.byWorkshop(route.params.id),
    productStore.fetch()
])

const items = ref(tasks[0])
const query = ref('')

const filteredProducts = computed(() => {
    return productStore.search(query.value)
})

async function add (product) {
    await workshopItemStore.create({
        workshopId: Number(route.params.id),
        productId: product.id,
        quantity: 1
    })
}

async function remove (workshopItem) {
    await workshopItemStore.delete(workshopItem.id)
}
</script>

<template>
  <div class="row box-header">
    <div class="col-8 d-flex align-items-center">
      <h3 class="m-2">Manage Products</h3>
    </div>

    <div class="col-4 d-flex align-items-center justify-content-end">
      <a class="btn p-2 bg-secondary hover-darken" @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'x']" class="fa-1x" style="width: 24px"/>
      </a>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <div class="p-0 input-group align-items-end">
      <input type="text" v-model="query" placeholder="Search products..." class="form-control search p-4">
    </div>

    <!-- product list -->
    <workshop-item-toggle-block
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :exists="!!items.find(item => item.productId === product.id)"
        :edit="true"
        @add="add"
        @remove="remove(items.find(item => item.productId === product.id))" />
  </div>
</template>
