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
        type: Number,
        default: 1
    },
    border: {
        type: Boolean,
        default: true
    }
})

// create a copy of the value prop to be able to edit it
// without directly changing the prop
const value = ref(props.value)
watch(() => props.value, (newValue) => {
    value.value = newValue
})

function update () {
    emit('update:value', value.value)
}
</script>

<template>
  <div class="d-flex align-items-center p-2" v-bind:class="(border)?'border-bottom':''">
    <span class="mx-3">{{ name }}</span>

    <div class="ms-auto d-flex align-items-center">
      <div role="button" @click="value = Math.max(value - 1, 0); update()" class="user-select-none">
        <font-awesome-icon
          :icon="['fas', 'minus']"
          class="p-3 mx-2 rounded-3 hover-darken"/>
      </div>

      <input type="number" class="form-control-plaintext" style="width: 2rem" v-model="value" @input="update"/>

      <div role="button" @click="value += 1; update()" class="user-select-none">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          class="p-3 mx-2 rounded-3 hover-darken"/>
      </div>
    </div>
  </div>
</template>
