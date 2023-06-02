<script setup>
import { useWorkshopStore } from '../store/workshopStore.js'
import WorkshopItem from '../component/workshop/WorkshopItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const edit = ref(false)
const workshopStore = useWorkshopStore()
workshopStore.fetch()

async function remove (workshop) {
    await workshopStore.delete(workshop.id)
}
</script>

<template>
  <div class="row">
    <div class="col-2 d-flex align-items-center">
      <h3 class="fw-bold">Workshops</h3>
    </div>

    <div class="col-10 p-1">
      <!-- action buttons -->
      <router-link to="/workshops/new" class="btn float-end p-3 hover-darken">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-2x" />
      </router-link>

      <button class="btn float-end p-3 hover-darken" :class="{'bg-primary': edit}" @click="edit = !edit">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-2x" />
      </button>
    </div>
  </div>

  <div class="row box-md bg-white border-top">
    <!-- workshop list -->
    <workshop-item
        v-for="workshop in workshopStore.workshops"
        :key="workshop.name"
        :workshop="workshop"
        :edit="edit"
        @delete="remove" />
  </div>
</template>
