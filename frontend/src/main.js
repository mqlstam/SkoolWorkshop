import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router/router.js"
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
import WorkshopForm from './views/WorkshopForm.vue';

const app = createApp(App).use(createPinia()).use(router);
app.component('workshop-form', WorkshopForm);
app.mount('#app');
