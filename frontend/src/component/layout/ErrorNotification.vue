<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const emit = defineEmits(['close'])
const props = defineProps({
  shown: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="alert alert-danger fixed-top m-3 d-flex align-items-center" v-if="props.shown">
    <strong>Error!</strong>
    <span class="ms-1">{{ props.message }}</span>
    <button class="btn ms-auto alert-link" @click="emit('close')">
      <font-awesome-icon :icon="['fas', 'x']" />
    </button>
  </div>
</template>
