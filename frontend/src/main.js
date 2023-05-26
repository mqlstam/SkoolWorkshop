import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/router.js'
import './style/styles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInbox, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
library.add(faInbox)
library.add(faCircleInfo)

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
