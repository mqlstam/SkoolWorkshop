<template>
  <div class="vh-100 d-flex flex-column">
    <div class="d-md-none text-center mx-0 emoijbg">
      <img src="../../public/images/Emoijachtergrond.jpg" alt="Mobile Image" class="img-fluid">
    </div>
    <div class="row justify-content-end mx-0 flex-grow-1">
      <div class="col-md-3 d-flex flex-column p-4 p-md-5 card-overlay">
        <div class="mb-3 mb-5">
          <div class="text-center">
            <h1>Workshop toevoegen</h1>
            <p>"Een Nieuwe Workshop, ,<br>Een Nieuwe Ontdekkingsreis"</p>
          </div>
        </div>
          <form @submit.prevent="submitForm" class="flex-grow-1 d-flex flex-column mt-5">
            <div class="mb-3">
              <label for="workshop-name" class="form-label">Workshop Name</label>
              <input id="workshop-name" v-model="workshop.name" required class="form-control" />
            </div>

            <div class="mb-3">
              <label for="group-size" class="form-label">Group Size</label>
              <input id="group-size" v-model.number="workshop.groupSize" type="number" min="1" required
                class="form-control" />
            </div>

            <div class="mb-3">
              <label for="image-upload" class="form-label">Upload afbeelding</label>
              <input type="file" class="form-control" id="image-upload" ref="image" accept="image/png, image/jpeg">
            </div>
             <button type="submit" class="btn btn-primary mt-auto w-100">Create Workshop</button>
          </form>

      
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWorkshopStore } from '../store/workshopStore.js'

const image = ref(null)
const workshop = useWorkshopStore()

async function submitForm () {
    try {
        console.log('submitForm function called') // Add this line
        await workshop.submitForm(image)
    } catch (error) {
        console.error('Error in submitForm: ', error)
    }
}
</script>
