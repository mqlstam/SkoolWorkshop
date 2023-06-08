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
        type: Boolean,
        default: false
    }
})

const checked = ref(props.value)
watch(() => props.value, (newValue) => {
    checked.value = newValue
})

function update () {
    emit('update:value', checked.value)
}
</script>

<template>
  <div class="d-flex align-items-center border-bottom">
    <span class="mx-3">{{ name }}</span>

    <div class="ms-auto d-flex align-items-center">
      <div role="button" @click="checked = !checked; update()">
        <font-awesome-icon
            :icon="checked ? ['fas', 'toggle-on'] : ['fas', 'toggle-off']"
            class="fa-2x p-3 mx-2 rounded-3" />
      </div>
    </div>
  </div>
</template>
