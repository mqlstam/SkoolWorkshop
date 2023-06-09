<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['click', 'delete'])
const props = defineProps({
    user: {
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
       @click="emit('click', props.user)"
       :to="`/users/${props.user.id}`">

    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'user']" class="fa-3x img border p-3 ms-1 me-3 my-3" style="width: 3rem; height: 3rem"/>
    <span class="h5"> {{ props.user.name }} </span>

    <div v-if="props.edit" class="ms-auto">
      <!-- edit mode buttons -->
      <button class="btn p-2 hover-darken" v-if="user.role !== 'admin'" @click.prevent="emit('delete', user)">
        <font-awesome-icon :icon="['fas', 'trash']" class="scale-up-center fa-xl rounded-circle p-3 bg-danger text-white"/>
      </button>
    </div>
  </router-link>
</template>
