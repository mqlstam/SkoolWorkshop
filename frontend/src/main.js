import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/router.js'
import './style/styles.scss'
import './icons.js'
import './service/axios.js'

// create and mount Vue application
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

// Register Service Worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  registerServiceWorker()
  askPermission()
}

function registerServiceWorker() {
  return navigator.serviceWorker
    .register('/service-worker.js')
    .then(registration => {
      console.log('Service worker successfully registered.', registration);
    })
    .catch(err => {
      console.error('Unable to register service worker.', err);
    });
}

function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error("We weren't granted permission.");
    }
  });
}

function subscribeUserToPush() {
    return navigator.serviceWorker
      .register('/service-worker.js')
      .then(function (registration) {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
          ),
        };
  
        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(function (pushSubscription) {
        console.log(
          'Received PushSubscription: ',
          JSON.stringify(pushSubscription),
        );
        return pushSubscription;
      });
  }
