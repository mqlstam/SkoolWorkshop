<script setup>
import { reactive } from 'vue'

const workshop = reactive({
    name: '',
    groupSize: null
})

async function submitForm () {
    const response = await fetch('/api/workshops', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workshop)
    })

    if (!response.ok) {
        const message = await response.text()
        console.error(`Error creating workshop: ${message}`)
        return
    }

    const createdWorkshop = await response.json()

    // Clear the form
    workshop.name = ''
    workshop.groupSize = ''

    // Here you could also add any code to handle the created workshop
    console.log(`Created workshop: ${JSON.stringify(createdWorkshop)}`)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="workshop-name">Workshop Name</label>
      <input id="workshop-name" v-model="workshop.name" required />
    </div>

    <div>
      <label for="group-size">Group Size</label>
      <input id="group-size" v-model="workshop.groupSize" type="number" min="1" required />
    </div>
    <!-- Add other fields as necessary -->

    <button type="submit">Create Workshop</button>
  </form>
</template>
