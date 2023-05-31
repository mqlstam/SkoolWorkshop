<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'

const emit = defineEmits(['update:value'])
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        default: ''
    }
})

// create a copy of the value prop to be able to edit it
// without directly changing the prop
const value = ref(props.value)
watch(() => props.value, (newValue) => { value.value = newValue })

const edit = ref(false)
function update () {
    if (edit.value) emit('update:value', value.value)
    edit.value = !edit.value
}
</script>

<template>
  <div class="d-flex align-items-center p-2 border-bottom">
    <span class="mx-3">{{name}}</span>

    <div class="ms-auto d-flex align-items-center">
      <span v-if="!edit">{{value}}</span>
      <input v-else type="text" class="form-control" v-model="value" autofocus />
      <div role="button" @click="update">
        <font-awesome-icon
            :icon="['fas', 'pen']"
            class="p-3 mx-2 rounded-3 hover-darken"
            :class="{'bg-secondary': edit}" />
      </div>
    </div>
  </div>
</template>

<style>
/* hide number input arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}
</style>