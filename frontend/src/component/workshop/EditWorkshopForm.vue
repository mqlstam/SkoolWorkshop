<script setup>
import { ref } from 'vue'
import { useWorkshopStore } from '../../store/workshopStore.js'
import { useRoute } from 'vue-router'
import NumberInput from '../input/NumberInput.vue'
import TextInput from '../input/TextInput.vue'

const route = useRoute()
const workshopStore = useWorkshopStore()

const workshop = ref({
    name: '',
    groupSize: 0
})

const id = route.params.id
workshop.value = await workshopStore.get(id)

async function submitForm () {
    // Check if all fields are filled in
    await workshopStore.update({ name: workshop.value.name, groupSize: workshop.value.groupSize }, id)
}
</script>

<template>
  <div class="row box-md bg-white border-top">
    <form class="col-12">
      <TextInput name="name" v-model:value="workshop.name" @update:value="submitForm" placeholder="name"/>
      <NumberInput name="group size" v-model:value="workshop.groupSize" @update:value="submitForm" placeholder="group size" min='0'/>

      <a type="button" class="mt-3 mb-4 btn btn-secondary btn-lg w-50" href="/workshops">Back</a>
    </form>
  </div>
</template>
