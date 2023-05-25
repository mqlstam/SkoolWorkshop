import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router/router.js"
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'

createApp(App).use(createPinia()).use(router).mount('#app')
