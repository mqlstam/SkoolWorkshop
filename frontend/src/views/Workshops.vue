<script setup>
import { useWorkshopStore } from '../store/workshopStore.js'
import WorkshopItem from '../component/workshop/WorkshopItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, computed } from 'vue'

const edit = ref(false)
const workshopStore = useWorkshopStore()
workshopStore.fetch()

const search = ref('')
const filteredWorkshops = computed(() => workshopStore.search(search.value))

async function remove (workshop) {
    await workshopStore.delete(workshop.id)
}
</script>

<template>
  <div class="row box-header">
    <div class="col-2 d-flex align-items-center">
      <h3 class="m-2">Workshops</h3>
    </div>

    <div class="col-10 d-flex align-items-center justify-content-end">
      <!-- action buttons -->
      <router-link class="btn p-2 hover-darken" to="/workshops/new">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-xl"/>
      </router-link>

      <button class="btn p-2 hover-darken" :class="{ 'bg-primary': edit }" @click="edit = !edit">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-xl"/>
      </button>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <input type="text" v-model="search" placeholder="Search workshops..." class="form-control search p-4">

    <!-- workshop list -->
    <WorkshopItem v-for="workshop in filteredWorkshops"
                  :key="workshop.id"
                  :workshop="workshop"
                  :edit="edit"
                  @delete="remove"/>
  </div>
</template>
