<script setup>
import NavigationBar from './component/layout/NavigationBar.vue'
import { onErrorCaptured, ref } from 'vue'
import ErrorNotification from './component/layout/ErrorNotification.vue'

// handle exceptions from components
const message = ref('')
onErrorCaptured((error) => {
    message.value = error.message
    setTimeout(() => { message.value = '' }, 5000)
})
</script>

<template>
  <div>
    <div class="content">
      <suspense>
        <router-view/>
      </suspense>
    </div>

    <navigation-bar/>
    <error-notification :message="message" :shown="!!message" @close="message = ''"/>
  </div>
</template>
