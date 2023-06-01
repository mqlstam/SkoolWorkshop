<script setup>
import { useWorkshopStore } from '../store/workshopStore.js'
import WorkshopItem from '../component/workshop/WorkshopItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const edit = ref(false)
const image = ref(null)
const workshop = ref({
    name: '',
    groupSize: ''
})

const workshopStore = useWorkshopStore()
workshopStore.fetch()

async function remove (workshop) {
    await workshopStore.delete(workshop.id)
}

async function submitForm () {
    try {
        console.log('submitForm function called')
        await workshopStore.add(workshop.value, image.value)
    } catch (error) {
        console.error('Error in submitForm: ', error)
    }
}
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col-2 d-flex align-items-center">
          <h3 class="fw-bold">Workshops</h3>
        </div>

        <div class="col-10 p-1">
          <!-- action buttons -->
          <router-link to="/workshops/create" class="btn float-end p-3 hover-darken">
            <font-awesome-icon :icon="['fas', 'plus']" class="fa-2x" />
          </router-link>

          <button class="btn float-end p-3 hover-darken" :class="{ 'bg-primary': edit }" @click="edit = !edit">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-2x" />
          </button>
        </div>
      </div>

      <div class="row box-md bg-white border-top">
        <!-- workshop list -->
        <workshop-item v-for="workshop in workshopStore.workshops" :key="workshop.name" :workshop="workshop" :edit="edit"
          @delete="remove" />
      </div>
    </div>

    <!-- New Form Code -->
    <div class="col d-none d-lg-block">
      <div class="vh-100 d-flex flex-column">
        <div class="d-md-none text-center mx-0 emoijbg">
          <img src="../../public/images/Emoijachtergrond.jpg" alt="Mobile Image" class="img-fluid">
        </div>
        <div class="row mx-0 flex-grow-1">
          <div class="d-flex flex-column p-4 p-md-5 card-overlay">
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
                 <button type="submit" class="submitbtn btn  btn-primary mt-auto w-100">Create Workshop</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
