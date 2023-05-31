<script setup>
  import { ref } from 'vue'
  import { useWorkshopStore } from "../../store/workshopStore.js";
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const workshopStore = useWorkshopStore()

  const workshop = ref({
    name: '',
    groupSize: 0
  })

  const id = route.params.id
  workshop.value = await workshopStore.get(id)

  console.log(workshop.value)
  const errorMessage = ref('')
  const successMessage = ref('')
  const shake = ref(false)

  async function submitForm (e) {
    e.preventDefault()
    // Check if all fields are filled in
    if (workshop.value.name && workshop.value.groupSize) {
      console.log(workshop.value)
      await workshopStore.update({name: workshop.value.name, groupSize: workshop.value.groupSize}, id)
      errorMessage.value = ''
      successMessage.value = `${workshop.value.name} has been updated`
    } else {
      shake.value = true
      errorMessage.value = 'All fields are required'
      successMessage.value = ''
    }
  }
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h1 class="mb-4 text-center">Update Workshop</h1>
    <form class="col-lg-6" @submit.prevent="submitForm">
      <div class="mb-4">
        <input type="text" class="form-control form-control-lg" id="name" v-model="workshop.name" placeholder="name">
      </div>

      <div class="mb-4">
        <input type="number" class="form-control form-control-lg" id="group-size" v-model="workshop.groupSize" placeholder="group size"
               min="0">
      </div>

      <!-- Display validation message -->
      <p v-if="errorMessage.value !== ''" class="text-danger" :class="shake ? 'shake-horizontal' : ''">{{ errorMessage }}</p>
      <p v-if="successMessage !== ''" class="text-success">{{ successMessage }}</p>

      <button type="submit" class="btn btn-primary btn-lg w-50" @click="shake = false">Update</button>
      <a type="button" class="btn btn-secondary btn-lg w-50" href="/workshops">Back</a>
    </form>
  </div>
</template>