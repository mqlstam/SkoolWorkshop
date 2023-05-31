<script setup>
  import {useRoute} from "vue-router";
  import {useWorkshopStore} from "../store/workshopStore.js";
  import EditWorkshopForm from "../component/workshop/EditWorkshopForm.vue";

  const route = useRoute()
  const workshopId = route.params.id

  const workshopStore = useWorkshopStore()
  const workshop = await workshopStore.get(workshopId)
</script>

<template>
    <div class="col- d-flex  justify-content-sm-start justify-content-center">
      <h3 class="fw-bold">{{ workshop.name }}</h3>
    </div>
    <edit-workshop-form :workshop="workshop"/>
</template>