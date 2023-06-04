<script setup>
import NavigationBar from './component/layout/NavigationBar.vue'
</script>

<template>
  <div>
    <div class="content">
      <suspense>
        <router-view/>
      </suspense>
    </div>

    <navigation-bar/>
  </div>
</template>
