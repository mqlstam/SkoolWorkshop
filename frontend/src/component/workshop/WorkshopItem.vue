<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

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

const router = useRouter()

const handleClick = (workshop) => {
    emit('click', workshop)
    const route = `/workshops/${workshop.id}` 
    router.push(route)
}
</script>

<template>
  <div role="button" class="d-flex align-items-center border-bottom hover-darken" @click="handleClick(props.workshop)">

    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'people-robbery']" class="fa-3x img border p-3 ms-1 me-3 my-3"/>
    <span class="h5"> {{ props.workshop.name }} </span>

    <div v-if="!props.edit" class="ms-auto">
      <!-- workshop stock status -->
      <font-awesome-icon :icon="['fas', 'check']" class="fa-1x rounded-circle p-1 m-4 bg-success text-white"
        style="width:20px;height:20px;" />
    </div>
    <div v-else class="ms-auto">
      <!-- edit mode buttons -->
      <button class="btn p-2 hover-darken" @click.stop.prevent="emit('delete', props.workshop)">
        <font-awesome-icon :icon="['fas', 'trash']"
          class="scale-up-center fa-xl rounded-circle p-3 bg-danger text-white" />
      </button>

    </div>
  </div>
</template>
