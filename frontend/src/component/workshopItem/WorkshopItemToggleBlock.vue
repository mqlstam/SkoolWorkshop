<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['add', 'remove'])
const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    exists: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
  <router-link :to="`/products/${product.id}`" class="d-flex align-items-center border-bottom hover-darken">
    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'box']" class="fa-3x img border p-3 ms-1 me-3 my-3"/>
    <span class="h5"> {{ props.product.name }} </span>

    <div class="ms-auto">
      <!-- relation toggle button -->
      <button v-if="exists" class="btn p-2 hover-darken" @click.prevent="emit('remove')">
        <font-awesome-icon :icon="['fas', 'circle-check']" class="fa-2x p-3 text-success" />
      </button>
      <button v-else class="btn p-2 hover-darken" @click.prevent="emit('add', product)">
        <font-awesome-icon :icon="['fas', 'circle-plus']" class="fa-2x p-3" />
      </button>
    </div>
  </router-link>
</template>
