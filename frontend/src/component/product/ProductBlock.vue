<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['delete'])
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
  <router-link
       class="d-flex align-items-center border-bottom hover-darken"
       :class="{'bg-tint-red': product.stock === 0}"
       :to="`/products/${props.product.id}`">

    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'box']" class="fa-3x img border p-3 ms-1 me-3 my-3"/>
    <span class="h5"> {{ props.product.name }} </span>

    <div v-if="!props.edit" class="ms-auto">
      <div class="p-3 rounded-circle" :class="{'text-danger': product.stock === 0, 'text-primary': product.stock < 10}">
        <font-awesome-icon :icon="['fas', 'warehouse']" class="fa-1x" />
        <span class="p-2">{{ props.product.stock }}</span>
      </div>
    </div>
    <div v-else class="ms-auto">
      <!-- edit mode buttons -->
      <button class="btn p-2 hover-darken" @click.prevent="emit('delete', product)">
        <font-awesome-icon :icon="['fas', 'trash']" class="scale-up-center fa-xl rounded-circle p-3 bg-danger text-white"/>
      </button>
    </div>
  </router-link>
</template>
