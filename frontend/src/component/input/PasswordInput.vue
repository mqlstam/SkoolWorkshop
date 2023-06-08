<script setup>
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['update:value'])
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        default: ''
    },
    empty: {
        type: Boolean,
        default: false
    }
})

// create a copy of the value prop to be able to edit it
// without directly changing the prop
const value = ref(props.value)
watch(() => props.value, (newValue) => {
    value.value = newValue
})

const edit = ref(props.empty)

function update () {
    if (!edit.value) {
        edit.value = true
        return
    }

    if (!value.value) value.value = props.value
    if (value.value) {
        emit('update:value', value.value)
        edit.value = false
    }
}
</script>

<template>
  <div class="d-flex align-items-center p-2 border-bottom">
    <span class="mx-3">{{ name }}</span>

    <div class="ms-auto d-flex align-items-center">
      <span v-if="!edit" class="h4">•••••••</span>
      <input v-else type="text" class="form-control" v-model="value" @keydown.enter="update" @focusout="update" autofocus/>
      <div role="button" @click="update">
        <font-awesome-icon
            :icon="['fas', 'pen']"
            class="p-3 mx-2 rounded-3 hover-darken"
            :class="{'bg-secondary': edit}"/>
      </div>
    </div>
  </div>
</template>
