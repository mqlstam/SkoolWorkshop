<script setup>
import { ref } from 'vue'
import { useWorkshopStore } from '../store/workshopStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const workshopStore = useWorkshopStore()

const workshop = ref({
    name: '',
    groupSize: null
})
const imageRef = ref(null)

const postWorkshop = async () => {
    const imageFile = imageRef.value?.files[0]
    try {
        await workshopStore.post(workshop.value, imageFile)
        // clear form fields after successful submission
        workshop.value = {
            name: '',
            groupSize: null
        }
    } catch (error) {
        console.error('Error in postWorkshop: ', error)
    }
}
</script>
<template>
  <div class="vh-100 d-flex flex-column">
    <div class="d-md-none text-center mx-0 emoijbg">
      <img src="../../public/images/Emoijachtergrond.jpg" alt="Mobile Image" class="img-fluid w-100">
    </div>
    <div class="row justify-content-center mx-0 flex-grow-1">

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
          <form @submit.prevent="postWorkshop" enctype="multipart/form-data" class="flex-grow-1 d-flex flex-column mt-5">
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
              <input type="file" class="form-control" id="image-upload" ref="imageRef" accept="image/png, image/jpeg">
            </div>
             <button type="submit" class="submitbtn btn btn-primary mt-auto w-100">Create Workshop</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
