<script setup>
import { useWorkshopStore } from '../store/workshopStore.js'

const workshop = useWorkshopStore()
</script>

<template>
  <form @submit.prevent="workshop.submitForm">
    <div>
      <label for="workshop-name">Workshop Name</label>
      <input id="workshop-name" v-model="workshop.name" required />
    </div>

    <div>
      <label for="group-size">Group Size</label>
      <input id="group-size" v-model.number="workshop.groupSize" type="number" min="1" required />
    </div>

    <button type="submit">Create Workshop</button>
  </form>
</template>
