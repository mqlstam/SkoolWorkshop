import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router/router.js"
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
library.add(faInbox)
library.add(faCircleInfo)

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
