import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router/router.js"
// Import our custom CSS
import './scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

createApp(App).use(createPinia()).use(router).mount('#app')
