<script setup>
import { useRouter } from 'vue-router'
import { useWorkshopStore } from '../store/workshopStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import { ref } from 'vue'

const router = useRouter()
const workshopStore = useWorkshopStore()

const workshop = ref({
    name: ''
})

async function create () {
    if (workshop.value.name === '') throw new Error('name is empty')
    await workshopStore.create(workshop.value)
    await router.back()
}
</script>

<template>
  <div class="row box-header">
    <div class="d-flex align-items-center m-0" style="width: min-content">
      <a class="btn p-2 bg-secondary hover-darken" @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'caret-left']" class="fa-xl" style="width: 24px" />
      </a>
    </div>

    <div class="col d-flex align-items-center">
      <h3 class="m-0">Nieuwe Workshop</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="workshop.name" />

    <button class="m-3 ms-auto btn p-2 bg-primary d-flex justify-content-center" @click="create" style="width: 10rem">
      <font-awesome-icon :icon="['fas', 'floppy-disk']" class="fa-xl" />
      <span class="h5 m-0 ms-3">aanmaken</span>
    </button>
  </div>
</template>
