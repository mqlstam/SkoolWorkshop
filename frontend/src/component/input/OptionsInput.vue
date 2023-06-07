<script setup>

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
  options: {
    type: Array,
    default: []
  }
})

function update(event) {
  emit('update:value', event.target.value)
}
</script>

<template>
  <div class="d-flex align-items-center p-2 border-bottom">
    <span class="mx-3">{{ name }}</span>

    <div class="ms-auto d-flex align-items-center">
      <select class="form-select m-2" style="width: 12rem" :value="props.value" @change="update">
        <option v-for="option in props.options" :key="option.id" :value="option.id">
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>
