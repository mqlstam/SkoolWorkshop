<script setup>
import {useRoute} from 'vue-router'
import {useWorkshopStore} from '../store/workshopStore.js'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'
import {ref} from 'vue'
import WorkshopItemBlock from "../component/workshop/WorkshopItemBlock.vue";
import {useProductStore} from "../store/productStore.js";
import {useWorkshopItemStore} from "../store/workshopItemStore.js";

const route = useRoute()
const workshopStore = useWorkshopStore()
const workshopItemStore = useWorkshopItemStore()
const productStore = useProductStore()
const workshopId = Number(route.params.id)

const tasks = await Promise.all([
  workshopStore.get(workshopId),
  workshopItemStore.byWorkshop(workshopId),
  productStore.fetch(),
])

const workshop = ref(tasks[0])
const items = ref(tasks[1])
const products = productStore.getMany(items.value.map(item => item.productId))

async function save() {
  const {id, ...data} = workshop.value
  await workshopStore.update(data, id)
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
      <h3 class="m-0">Workshop Info</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="workshop.name" @update:value="save"/>
    <number-input name="Group size" v-model:value="workshop.groupSize" @update:value="save"/>
    <number-input name="Times per week" v-model:value="workshop.timesPerWeek" @update:value="save"/>
  </div>

  <!-- items -->
  <div class="row box-header mt-3">
    <div class="col-2 d-flex align-items-center">
      <h3 class="m-2">Items</h3>
    </div>

    <div class="col-10 d-flex align-items-center justify-content-end">
      <!-- action buttons -->
      <router-link class="btn p-3 hover-darken" :to="`/workshops/${workshop.id}/items`">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-xl"/>
      </router-link>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <!-- workshop items list -->
    <workshop-item-block
        v-for="item in items"
        :key="item.id"
        :workshop-item="item"
        :product="products.find(p => p.id === item.productId)"/>
  </div>
</template>
