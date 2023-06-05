<script setup>
import { useRoute } from 'vue-router'
import { useWorkshopStore } from '../store/workshopStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'

const route = useRoute()
const workshopStore = useWorkshopStore()

const workshopId = Number(route.params.id)
const workshop = await workshopStore.get(workshopId)

async function save () {
    const { id, ...data } = workshop
    await workshopStore.update(data, id)
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
      <h3 class="m-0">Workshop Info</h3>
    </div>
  </div>

  <div class="row box bg-white border-top">
    <text-input name="Name" v-model:value="workshop.name" @update:value="save" placeholder="name"/>
    <number-input name="Group size" v-model:value="workshop.groupSize" @update:value="save" placeholder="group size" />
  </div>
</template>
