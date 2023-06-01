<script setup>
import { useRoute } from 'vue-router'
import { useWorkshopStore } from '../store/workshopStore.js'
import WorkshopInfo from '../component/workshop/WorkshopInfo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const route = useRoute()
const workshopId = Number(route.params.id)

const workshopStore = useWorkshopStore()
const workshop = await workshopStore.get(workshopId)
</script>

<template>
  <div class="row">
    <div class="col-4 d-flex align-items-center">
      <h3 class="fw-bold">{{workshop.name}}</h3>
    </div>

    <div class="col-8 p-1">
      <!-- action buttons -->
      <button class="btn float-end p-3 hover-darken">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-2x" />
      </button>

      <button class="btn float-end p-3 hover-darken">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-2x" />
      </button>
    </div>
  </div>
  <workshop-info :workshopId="workshop.id"/>
</template>
