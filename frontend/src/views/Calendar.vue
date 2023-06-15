<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CalendarItemBlock from '../component/calendar/CalendarItemBlock.vue'
import { useCalendarStore } from '../store/calendarStore.js'
import { useWorkshopStore } from '../store/workshopStore.js'

const calendarStore = useCalendarStore()
const workshopStore = useWorkshopStore()

await Promise.all([
    calendarStore.fetch(),
    workshopStore.fetch()
])

const workshops = workshopStore.workshops
</script>

<template>
  <div class="row box-header">
    <div class="col-2 d-flex align-items-center">
      <h3 class="m-2">Calendar</h3>
    </div>

    <div class="col-10 d-flex align-items-center justify-content-end">
      <!-- action buttons -->
      <div class="btn p-3 hover-darken" @click="calendarStore.refresh()">
        <font-awesome-icon :icon="['fas', 'arrows-rotate']" class="fa-xl" />
      </div>
    </div>
  </div>

  <div class="row box bg-white border-top">

    <!-- calendar items -->
    <calendar-item-block
        v-for="item in calendarStore.calendarItems"
        :key="item.id"
        :item="item"
        :workshop="workshops.find(w => w.id === item.workshopId)" />
  </div>
</template>
