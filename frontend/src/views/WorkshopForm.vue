<script setup>
import { ref } from 'vue'
import { useWorkshopStore } from '../store/workshopStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const workshopStore = useWorkshopStore()

const workshop = ref({
    name: '',
    groupSize: 0
})

async function create () {
  await workshopStore.create(workshop.value)
  workshop.value = { name: '', groupSize: 0 }
}
</script>

<template>
  <div class="row vh-100">

      <div class="col-md-6 d-flex flex-column card-overlay flex-grow-1">
        <div>
          <router-link to="/workshops" class="btn float-end hover-darken mt-2">
            <font-awesome-icon :icon="['fas', 'x']" />
          </router-link>
        </div>
        <div class="p-4 p-md-5 d-flex flex-column flex-grow-1 ">
        <div class="mb-3 mb-5">
          <div class="text-center">
            <h1>Workshop toevoegen</h1>
            <p>"Een Nieuwe Workshop, ,<br>Een Nieuwe Ontdekkingsreis"</p>
          </div>
        </div>
          <form @submit.prevent="create" class="flex-grow-1 d-flex flex-column mt-5">
            <div class="mb-3">
              <label for="workshop-name" class="form-label">Workshop Name</label>
              <input id="workshop-name" v-model="workshop.name" required class="form-control" />
            </div>

            <div class="mb-3">
              <label for="group-size" class="form-label">Group Size</label>
              <input id="group-size" v-model.number="workshop.groupSize" type="number" min="1" required
                class="form-control" />
            </div>

             <button type="submit" class="text-white btn btn-primary mt-auto w-100">Create Workshop</button>
          </form>
        </div>

    </div>
  </div>
</template>
