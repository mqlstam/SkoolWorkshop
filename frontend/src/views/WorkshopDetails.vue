<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useWorkshopStore } from '../store/workshopStore.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TextInput from '../component/input/TextInput.vue'
import NumberInput from '../component/input/NumberInput.vue'
import WorkshopProductItem from '../component/workshop/WorkshopProductItem.vue'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const workshopStore = useWorkshopStore()
const edit = ref(false)
const workshopId = Number(route.params.id)
const workshop = ref(await workshopStore.get(workshopId))


async function removeProduct(item) {
    await workshopStore.removeProduct(workshopId ,item.id);
    workshop.value = await workshopStore.get(workshopId);
  }

async function save () {
    const { id, ...data } = workshop.value
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
    <text-input name="Name" v-model:value="workshop.name" @update:value="save" />
    <number-input name="Group size" v-model:value="workshop.groupSize" @update:value="save" />
    <number-input name="Times per week" v-model:value="workshop.timesPerWeek" @update:value="save" />
  </div>

  <div class="d-flex justify-content-between align-items-center">
    <h4 class="ml-3 mt-3">Workshop Items:</h4>
    <div>
      <!-- updated class here -->
      <button class="btn py-1 px-2 fs-5 ml-3 mt-3 me-2 hover-darken" :class="{ edit}" @click="edit = !edit">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="fa-xl"/>
      </button>
      <button class="btn btn-primary py-1 px-2 fs-5 ml-3 mt-3" @click="router.push(rout)">Add Product</button>
    </div>
  </div>

  <div class="row box bg-white border-top mt-3">
    <WorkshopProductItem
        v-for="(item, index) in workshop.items"
        :key="index"
        :product="item.product"
        :edit="edit"
        @delete="removeProduct"/>
  </div>
</template>
