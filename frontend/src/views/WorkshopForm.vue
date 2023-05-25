<script setup>
import { reactive } from 'vue';

const workshop = reactive({
  name: '',
  description: '',
  // Add other fields as necessary
});

function submitForm() {
  // Handle form submission here
}
</script>


<template> 
    <form @submit.prevent="submitForm">
      <div>
        <label for="workshop-name">Workshop Name</label>
        <input id="workshop-name" v-model="workshop.name" required />
      </div>
  
      <div>
        <label for="workshop-description">Workshop Description</label>
        <input id="workshop-description" v-model="workshop.description" required />
      </div>
  
      <!-- Add other fields as necessary -->
  
      <button type="submit">Create Workshop</button>
    </form>
  </template>