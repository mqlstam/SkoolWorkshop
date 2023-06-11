<script setup>
import { useWorkshopStore } from '../store/workshopStore.js'
import WorkshopBlock from '../component/workshop/WorkshopBlock.vue'
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
      <router-link class="btn p-3 hover-darken" to="/workshops/new">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-xl"/>
      </router-link>

      <button class="btn p-3 hover-darken" :class="{ 'bg-primary': edit }" @click="edit = !edit">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-xl"/>
      </button>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <!-- workshop list -->
    <div class="p-0 input-group align-items-end">
      <input type="text" v-model="search" placeholder="Search workshops..." class="form-control search p-4">
      <router-link to="/scan"
                   class="d-flex justify-content-center align-items-center bg-primary h-100"
                   style="height: 3rem; width: 5rem; margin-top: -1rem">
        <font-awesome-icon :icon="['fas', 'qrcode']" class="fa-2x"/>
      </router-link>
    </div>

    <workshop-block v-for="workshop in filteredWorkshops"
                  :key="workshop.id"
                  :workshop="workshop"
                  :edit="edit"
                  @delete="remove"/>
  </div>
</template>
