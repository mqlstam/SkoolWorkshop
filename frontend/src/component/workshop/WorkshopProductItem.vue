<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['click', 'delete'])
const props = defineProps({
    product: {
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

  <div class="d-flex align-items-center border-bottom hover-darken" @click="emit('click', props.product)">

    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'inbox']" class="fa-3x img border p-3 ms-1 me-3 my-3"/>
    <span class="h5"> {{ props.product.name }} </span>

    <div v-if="!props.edit" class="ms-auto">
      <!-- product stock status -->
      <font-awesome-icon :icon="['fas', 'check']" class="fa-1x rounded-circle p-1 m-4 bg-success text-white" style="width:20px;height:20px;"/>
    </div>
    <div v-else class="ms-auto">
      <!-- edit mode buttons -->
      <button class="btn p-2 hover-darken" @click.prevent="emit('delete', product)">
        <font-awesome-icon :icon="['fas', 'trash']" class="scale-up-center fa-xl rounded-circle p-3 bg-danger text-white"/>
      </button>
    </div>
  </div>
</template>
