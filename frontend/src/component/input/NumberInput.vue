<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    modelValue: {
        type: Number,
        default: 1
    }
})

// create a copy of the modelValue prop to be able to edit it
// without directly changing the prop
const value = ref(props.modelValue)
watch(() => props.modelValue, (newValue) => {
    value.value = newValue
})

function update () {
    emit('update:modelValue', value.value)
}
</script>

<template>
  <div class="d-flex align-items-center p-2 border-bottom">
    <span class="mx-3">{{ name }}</span>

    <div class="ms-auto d-flex align-items-center">
      <div role="button" @click="value = Math.max(value - 1, 0); update()">
        <font-awesome-icon
            :icon="['fas', 'minus']"
            class="p-3 mx-2 rounded-3 hover-darken" />
      </div>

      <input type="number" class="form-control-plaintext" style="width: 2rem" v-model="value" @input="update" />

      <div role="button" @click="value += 1; update()">
        <font-awesome-icon
            :icon="['fas', 'plus']"
            class="p-3 mx-2 rounded-3 hover-darken" />
      </div>
    </div>
  </div>
</template>

