import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/router.js'
import './style/styles.scss'
import './icons.js'
import './service/axios.js'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
