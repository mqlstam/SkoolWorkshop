<script setup>
import { useWorkshopStore } from '../store/workshopStore.js'
import { useRoute } from 'vue-router'
import WorkshopProductItem from '../component/workshop/WorkshopProductItem.vue'

const route = useRoute()
const workshopId = route.params.id

const workshopStore = useWorkshopStore()
const workshop = await workshopStore.get(workshopId)

</script>

<template>
  <div>
    <h2>{{ workshop.name }}</h2>
    <p>Group Size: {{ workshop.groupSize }}</p>
    <div>
      <workshop-product-item
        v-for="(item, index) in workshop.items"
        :key="index"
        :product="item.product" />
    </div>
  </div>
</template>
