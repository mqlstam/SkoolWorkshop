<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'

const emit = defineEmits(['delete'])
const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    requiredStock: {
        type: Number,
        default: 0
    },
    edit: {
        type: Boolean,
        default: false
    }
})

const stockColor = computed(() => {
    if (props.product.stock < props.requiredStock) {
        return 'text-danger'
    } else if (props.product.stock < (props.requiredStock + props.product.bufferStock)) {
        return 'text-primary'
    } else {
        return 'text-success'
    }
})

</script>

<template>
  <router-link
       class="d-flex align-items-center border-bottom hover-darken"
       :class="{'bg-tint-red': stockColor === 'text-danger', 'bg-tint-primary': stockColor === 'text-primary'}"
       :to="`/products/${props.product.id}`">

    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'box']" class="fa-3x img border p-3 ms-1 me-3 my-3"/>
    <span class="h5"> {{ props.product.name }} </span>

    <div v-if="!props.edit" class="ms-auto">
      <div class="p-3 rounded-circle" :class="stockColor">
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
