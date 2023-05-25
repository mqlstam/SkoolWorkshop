import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/router.js'
import './style/styles.scss'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
