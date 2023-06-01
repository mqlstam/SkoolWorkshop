<script setup>
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    }
})

// create a copy of the modelValue prop to be able to edit it
// without directly changing the prop
const value = ref(props.modelValue)
watch(() => props.modelValue, (newValue) => { value.value = newValue })

const edit = ref(false)
function handleChange () {
    emit('update:modelValue', value.value)
}

function update () {
    if (value.value === '' && edit.value) value.value = props.modelValue
    edit.value = !edit.value
    if (edit.value) handleChange()
}
</script>

<template>
  <div class="d-flex align-items-center p-2 border-bottom">
    <span class="mx-3">{{name}}</span>

    <div class="ms-auto d-flex align-items-center">
      <span v-if="!edit">{{value}}</span>
      <input v-else type="text" class="form-control" v-model="value" @input="handleChange" autofocus />
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


