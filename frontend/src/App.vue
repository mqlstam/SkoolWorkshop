<script setup>
import NavigationBar from './component/layout/NavigationBar.vue'
</script>

<template>
  <div>
    <suspense>
      <router-view/>
    </suspense>

    <navigation-bar />
  </div>
</template>
