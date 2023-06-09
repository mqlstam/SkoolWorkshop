<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['click', 'delete'])
const props = defineProps({
  workshop: {
    type: Object,
    required: true
  },
  edit: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <router-link
      class="d-flex align-items-center border-bottom hover-darken"
      @click="emit('click', props.workshop)"
      :to="`/workshops/${props.workshop.id}`">

    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'people-robbery']" class="fa-3x img border p-3 ms-1 me-3 my-3"/>
    <span class="h5"> {{ props.workshop.name }} </span>

    <div v-if="!props.edit" class="ms-auto">
      <!-- workshop stock status -->
      <font-awesome-icon :icon="['fas', 'check']" class="fa-1x rounded-circle p-1 m-4 bg-success text-white" style="width:20px;height:20px;"/>
    </div>
    <div v-else class="ms-auto">
      <!-- edit mode buttons -->
      <button class="btn p-2 hover-darken" @click.prevent="emit('delete', workshop)">
        <font-awesome-icon :icon="['fas', 'trash']" class="scale-up-center fa-xl rounded-circle p-3 bg-danger text-white"/>
      </button>
    </div>
  </router-link>
</template>