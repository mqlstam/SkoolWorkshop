<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    workshop: {
        type: Object,
        required: true
    },
    edit: {
        type: Boolean,
        default: false
    }
})

function formatDate (startDate, endDate) {
    const ds = new Date(startDate); const de = new Date(endDate)
    const pad = (num) => String(num).padStart(2, '0')
    return `${pad(ds.getDate())}-${pad(ds.getMonth() + 1)} ${pad(ds.getHours())}:${pad(ds.getMinutes())} - ${pad(de.getHours())}:${pad(de.getMinutes())}`
}
</script>

<template>
  <div class="d-flex align-items-center border-bottom hover-darken" :class="{'bg-tint-secondary': new Date(item.endDate) > new Date()}">

    <!-- image and title -->
    <font-awesome-icon :icon="['fas', 'people-robbery']" class="fa-3x img border p-3 ms-1 me-3 my-3" style="width: 3rem; height: 3rem"/>
    <span class="h5 w-50"> {{ props.workshop.name }} </span>

    <div class="ms-auto p-2" style="width: 12rem" @click.prevent>
      <div class="ms-auto d-flex align-items-center">
        <font-awesome-icon :icon="['fas', 'people-group']" class="fa-1x" style="width: 2rem"/>
        <span>
          {{ props.item.participantCount }}
        </span>
      </div>

      <div class="ms-auto d-flex align-items-center">
        <font-awesome-icon :icon="['fas', 'calendar-day']" class="fa-1x" style="width: 2rem" />
        <span>{{ formatDate(props.item.startDate, props.item.endDate) }}</span>
      </div>
    </div>
  </div>
</template>
