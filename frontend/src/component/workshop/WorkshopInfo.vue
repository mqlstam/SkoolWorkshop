<script setup>
import { useWorkshopStore } from '../../store/workshopStore.js'
import NumberInput from '../input/NumberInput.vue'
import TextInput from '../input/TextInput.vue'
import {useRouter} from "vue-router";

const props = defineProps({
    workshopId: {
        type: Number,
        required: true
    }
})

const router = useRouter()
const workshopStore = useWorkshopStore()
const workshop = await workshopStore.get(props.workshopId)

async function save () {
    const { id, ...updatedWorkshop } = workshop
    await workshopStore.update(updatedWorkshop, id)
}
</script>

<template>
  <div class="row box-md bg-white border-top">
    <form class="col-12">
      <text-input name="name" v-model:value="workshop.name" @update:value="save" placeholder="name"/>
      <number-input name="group size" v-model:value="workshop.groupSize" @update:value="save" placeholder="group size" />

      <a @click="router.back()" type="button" class="mt-3 mb-4 btn btn-secondary btn-lg w-50">Back</a>
    </form>
  </div>
</template>
